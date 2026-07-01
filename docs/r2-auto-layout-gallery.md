# R2 Image Gallery — Auto Layout không giật

Hướng dẫn tái sử dụng cách **load ảnh từ Cloudflare R2** và render **masonry auto-layout mượt (không giật khi load / khi scroll)** cho các web khác.

Stack tham chiếu: **Next.js (App Router) + Tailwind + framer-motion + AWS SDK S3 (R2)**. Nguyên lý áp dụng được cho mọi framework.

---

## 1. Vấn đề cần giải quyết

Gallery ảnh thường bị giật ở 3 chỗ:

1. **Lúc ảnh load xong** — trước khi tải, trình duyệt không biết chiều cao ảnh → ô ảnh cao ~0 → khi load xong nhảy phắt lên đúng chiều cao → cả layout xô đẩy.
2. **CSS multi-column (`columns-*`) rebalance** — mỗi khi thêm ảnh (infinite scroll), CSS tự chia lại ảnh giữa các cột để cân chiều cao → ảnh **đang hiển thị bị nhảy cột**.
3. **Animation xung đột** — container trượt lên trong khi ảnh tự zoom/blur → cảm giác "giật giật".

Giải pháp gồm 3 trụ cột:

| Vấn đề | Cách xử lý |
|---|---|
| Không biết chiều cao ảnh | **Đo `width/height` ở server**, gắn `aspect-ratio` để **reserve chỗ trước khi load** |
| Reflow khi append | Bỏ CSS `columns`, dùng **fixed-column masonry** phân bổ bằng JS (greedy, ổn định thứ tự) |
| Animation gượng | Một chuyển động duy nhất: fade + trôi nhẹ, easing mượt |

---

## 2. Kiến trúc tổng thể

```
R2 bucket (photos/<folder>/<file>.jpg)
        │
        ▼
[Server] list objects  ──►  đo dimensions (đọc ~256KB header)  ──►  cache
        │                                                            │
        └────────────►  mỗi ảnh: { key, width, height, aspectRatio } ┘
        ▼
[Client] PortfolioGrid
   ├─ reserve chỗ bằng aspect-ratio  (hết giật lúc load)
   ├─ fixed-column masonry (greedy)  (hết giật lúc scroll)
   └─ animation fade + trôi nhẹ      (êm)
```

---

## 3. Bước 1 — Kết nối R2 & list ảnh (server)

```ts
// lib/r2.ts
import { S3Client } from "@aws-sdk/client-s3";

export const r2Client = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});
```

```ts
// lib/gallery.ts
import { r2Client } from "./r2";
import { ListObjectsV2Command } from "@aws-sdk/client-s3";

const isImage = (key: string) => /\.(jpe?g|png|gif|webp|avif)$/i.test(key);

async function listPhotos() {
  const res = await r2Client.send(
    new ListObjectsV2Command({
      Bucket: process.env.R2_BUCKET_NAME,
      Prefix: "photos/",
    })
  );
  return (res.Contents || []).filter((o) => isImage(o.Key!));
}
```

> **Lưu ý:** `ListObjectsV2` trả tối đa 1000 object/lần. Nếu nhiều hơn, lặp theo `ContinuationToken`.

---

## 4. Bước 2 — Đo kích thước ảnh + cache (mấu chốt)

R2/S3 **không trả** width/height trong listing. Ta đọc **vài KB header** của mỗi ảnh (đủ để lấy kích thước, **không tải cả file**) bằng `image-size`.

```bash
npm install image-size
```

```ts
// lib/gallery.ts (tiếp)
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { imageSize } from "image-size";

// Cache theo (key + size) để instance server "ấm" không đo lại mỗi lần revalidate.
const dimensionCache = new Map<string, { width: number; height: number }>();

// 256KB dư sức chứa header JPEG kèm EXIF/thumbnail. Không đủ thì fallback tỉ lệ mặc định.
const HEADER_BYTES = 262144;

async function getDimensions(key: string, size?: number) {
  const cacheKey = `${key}:${size ?? 0}`;
  const hit = dimensionCache.get(cacheKey);
  if (hit) return hit;

  try {
    const res = await r2Client.send(
      new GetObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key: key,
        Range: `bytes=0-${HEADER_BYTES - 1}`, // chỉ tải header!
      })
    );
    const bytes = await res.Body?.transformToByteArray();
    if (!bytes) return null;

    const { width, height } = imageSize(bytes);
    if (width && height) {
      const dims = { width, height };
      dimensionCache.set(cacheKey, dims);
      return dims;
    }
  } catch {
    /* header quá nhỏ / định dạng lạ / lỗi fetch -> fallback */
  }
  return null;
}

// Chạy song song nhưng giới hạn số kết nối, tránh mở hàng trăm request cùng lúc.
async function mapWithConcurrency<T, R>(
  items: T[],
  limit: number,
  fn: (item: T) => Promise<R>
): Promise<R[]> {
  const results = new Array<R>(items.length);
  let cursor = 0;
  const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (cursor < items.length) {
      const i = cursor++;
      results[i] = await fn(items[i]);
    }
  });
  await Promise.all(workers);
  return results;
}
```

Gộp lại thành hàm chính:

```ts
export async function getAllImages() {
  const files = await listPhotos();

  const images = files.map((f) => ({
    id: f.Key!,
    key: f.Key!,
    fileName: f.Key!.split("/").pop()!,
    size: f.Size,
    lastModified: f.LastModified,
  }));

  // Đo kích thước thật để client reserve đúng chỗ
  await mapWithConcurrency(images, 12, async (img: any) => {
    const dims = await getDimensions(img.key, img.size);
    if (dims) {
      img.width = dims.width;
      img.height = dims.height;
      img.aspectRatio = dims.width / dims.height;
    }
  });

  return images;
}
```

**Tại sao đọc header thay vì tải cả ảnh?** Kích thước ảnh nằm ở đầu file (marker SOF của JPEG, IHDR của PNG...). Range request `bytes=0-262143` chỉ tốn ~256KB/ảnh thay vì vài MB.

---

## 5. Bước 3 — Caching tầng trang (ISR)

Để không đo lại mỗi request, dùng ISR của Next:

```js
// app/albums/page.js
export const revalidate = 60; // build lại tối đa 60s/lần, chạy nền

export default async function AlbumsPage() {
  const images = await getAllImages();
  return <AlbumsSection images={images} />;
}
```

- User luôn nhận HTML **đã cache tức thì**; việc đo ảnh chạy **nền** khi revalidate.
- Kết hợp `dimensionCache` (module-level) → chỉ ảnh **mới** mới bị đo lại.
- Lần build lạnh đầu tiên (hoặc sau khi upload ảnh mới) sẽ tốn công đo → chấp nhận được vì chạy nền.

---

## 6. Bước 4 — Reserve chỗ bằng `aspect-ratio` (hết giật lúc load)

Ô ảnh phải có chiều cao **xác định trước khi ảnh tải xong**. Có `width/height` rồi thì set `aspect-ratio`:

```jsx
const ratio =
  image.width && image.height ? `${image.width} / ${image.height}` : "3 / 4";

<div className="w-full bg-stone-800 overflow-hidden" style={{ aspectRatio: ratio }}>
  <img
    src={url}
    className="w-full h-full object-cover"
    loading="lazy"
  />
</div>
```

Vì `aspect-ratio` suy ra chiều cao từ chiều rộng cột (đã biết), tile có chiều cao đúng **ngay từ paint đầu tiên** → ảnh load xong chỉ **fade vào chỗ có sẵn**, không đẩy layout.

---

## 7. Bước 5 — Fixed-column masonry (hết giật lúc scroll)

**Đừng dùng CSS `columns-*`** cho infinite scroll — nó chia lại ảnh giữa các cột mỗi khi thêm ảnh → nhảy loạn.

Thay bằng: tự chia ảnh vào **các cột cố định** bằng JS, thuật toán **greedy** (bỏ ảnh vào cột đang thấp nhất). Greedy **ổn định theo thứ tự**: cột của ảnh thứ `i` chỉ phụ thuộc các ảnh `0..i-1`, nên **thêm ảnh mới không làm ảnh cũ đổi chỗ**.

```jsx
// Chia ảnh vào N cột theo chiều cao — ổn định khi append
function distributeIntoColumns(images, cols) {
  const columns = Array.from({ length: cols }, () => []);
  const heights = new Array(cols).fill(0);

  images.forEach((image, index) => {
    const ar = image.width && image.height ? image.width / image.height : 3 / 4;
    const tileHeight = 1 / ar; // chiều cao tương đối (cột cùng bề rộng)
    let shortest = 0;
    for (let c = 1; c < cols; c++) {
      if (heights[c] < heights[shortest]) shortest = c;
    }
    columns[shortest].push({ image, index });
    heights[shortest] += tileHeight;
  });

  return columns;
}
```

Số cột theo breakpoint — khởi tạo bằng hằng số để **SSR và client render đầu khớp nhau** (tránh hydration mismatch), rồi chỉnh trong `useEffect`:

```jsx
function useMasonryColumns() {
  const [cols, setCols] = useState(3); // giá trị SSR ổn định

  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth;
      if (w >= 1280) return 4;
      if (w >= 1024) return 3;
      return 2;
    };
    const update = () => setCols(compute());
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return cols;
}
```

Render bằng **flexbox** (không phải CSS columns):

```jsx
const cols = useMasonryColumns();
const columns = useMemo(() => distributeIntoColumns(images, cols), [images, cols]);

// sm+ : masonry cột cố định — ảnh mới chỉ nối vào đáy cột, không xáo trộn
<div className="hidden sm:flex gap-6">
  {columns.map((column, ci) => (
    <div key={ci} className="flex-1 min-w-0 flex flex-col gap-6">
      {column.map(({ image, index }) => (
        <PhotoTile key={image.id} image={image} index={index} /* ... */ />
      ))}
    </div>
  ))}
</div>
```

**Mobile** thì đơn giản hơn — lưới vuông đều, CSS grid **không bao giờ** reflow khi append:

```jsx
<div className="grid grid-cols-3 gap-1 sm:hidden">
  {images.map((image, index) => (
    <PhotoTile key={image.id} image={image} index={index} square /* ... */ />
  ))}
</div>
```

> Cả 2 nhánh đều nằm trong DOM nhưng nhánh bị `hidden` (display:none) sẽ **không tải ảnh** (ảnh `loading="lazy"` chỉ tải khi hiển thị) → không tốn băng thông thừa.

---

## 8. Bước 6 — Animation êm

Một chuyển động duy nhất khi tile lọt vào viewport: **fade + trôi lên nhẹ**, easing ease-out dài. Đừng cho ảnh tự zoom/scale lúc load (xung đột với chuyển động container).

```jsx
<motion.div
  initial={{ opacity: 0, y: 10 }}          // trôi nhẹ 10px, không phải 24px
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.1 }}
  transition={{
    opacity: { duration: 0.8, delay: (index % 4) * 0.05, ease: "easeOut" },
    y: { duration: 0.9, delay: (index % 4) * 0.05, ease: [0.16, 1, 0.3, 1] },
  }}
>
  <img
    className={`w-full h-full object-cover transition-[opacity,filter,transform]
      duration-700 ease-out group-hover:scale-105
      ${loaded ? "opacity-100 blur-0" : "opacity-0 blur-sm"}`}
    onLoad={() => setLoaded(true)}
  />
</motion.div>
```

Mẹo:
- `y: 10` thay vì `24` → trôi nhẹ, không "giật lên".
- Tách easing cho `opacity` và `y` để chuyển động lắng lại tự nhiên.
- Blur-up: `blur-sm → blur-0` khi load; **scale chỉ dùng cho hover**, không dùng cho lúc load.
- Ảnh trong cache có thể `complete` ngay khi mount → xử lý trong `useEffect` kẻo `onLoad` không bắn:

```jsx
useEffect(() => {
  if (imgRef.current?.complete) setLoaded(true);
}, []);
```

---

## 9. Checklist khi áp dụng sang web khác

- [ ] Set env: `R2_ACCOUNT_ID`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `R2_BUCKET_NAME`, `NEXT_PUBLIC_R2_DOMAIN` (public domain/`*.r2.dev` để render `<img src>`).
- [ ] Bucket cho phép đọc public (hoặc dùng signed URL) cho domain hiển thị ảnh.
- [ ] `image-size` đã cài; range request `bytes=0-262143`.
- [ ] Có `dimensionCache` + `revalidate` để không đo lại mỗi request.
- [ ] Bỏ `columns-*`, dùng fixed-column masonry (greedy) — bắt buộc nếu có infinite scroll.
- [ ] `useState(hằng số)` cho số cột để tránh hydration mismatch, chỉnh trong `useEffect`.
- [ ] Mọi tile có `aspect-ratio` trước khi ảnh load.
- [ ] `loading="lazy"` trên `<img>`; nhánh layout ẩn không tải ảnh.

## 10. Các đánh đổi cần biết

- **Egress khi đo:** mỗi ảnh mới tốn ~256KB header lúc revalidate. Với gallery vài trăm ảnh là chấp nhận được và có cache. Muốn zero-cost lúc render thì **lưu sẵn `width/height` vào file metadata.json** (chạy script 1 lần sau mỗi lần upload) rồi đọc từ đó.
- **Thứ tự đọc:** greedy masonry đọc theo *từng cột dọc*, không phải trái→phải từng hàng. Đây là hành vi masonry chuẩn, đổi lại các cột cân chiều cao.
- **Đổi số cột khi resize:** layout sắp lại 1 lần (hiếm, do người dùng chủ động) — không phải giật lúc scroll.
- **Progressive JPEG / EXIF thumbnail lớn:** hiếm khi kích thước nằm ngoài 256KB; nếu gặp, tăng `HEADER_BYTES` hoặc để fallback `3/4`.

---

*Tài liệu này mô tả đúng cơ chế đang chạy trong `src/lib/r2-albums.ts` và `src/features/albums/components/PortfolioGrid.jsx` của dự án.*
