# Tối ưu ảnh WebP/AVIF — cơ chế đang áp dụng

Ghi lại **chính xác** cách dự án đang tối ưu ảnh, chỗ nào đã áp dụng, chỗ nào chưa, và cách mở rộng. Tái sử dụng được cho web Next.js khác.

> **TL;DR:** Không có script tự convert WebP. Dự án dựa vào **Next.js Image Optimizer** (tự đổi sang AVIF/WebP theo trình duyệt) ở những component dùng `<Image>`; phần **gallery album đang dùng `<img>` thô nên KHÔNG được tối ưu** (xem mục 5).

---

## 1. Cấu hình gốc

```js
// next.config.js
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'], // thứ tự = độ ưu tiên
    remotePatterns: [
      { protocol: 'https', hostname: '**.r2.dev' },
      { protocol: 'https', hostname: '**.r2.cloudflarestorage.com' },
    ],
  },
};
module.exports = nextConfig;
```

Hai dòng quan trọng:

- **`formats`** — Next sẽ re-encode ảnh sang **AVIF** (ưu tiên vì đứng trước), fallback **WebP**, rồi mới tới định dạng gốc — tùy trình duyệt hỗ trợ.
- **`remotePatterns`** — whitelist host được phép tối ưu. Bắt buộc khi ảnh nằm trên domain ngoài (ở đây là R2), nếu không `<Image>` sẽ báo lỗi.

---

## 2. "Thuật toán" thật ra là gì?

Next **không** convert sẵn file WebP trong repo. Nó tối ưu **on-demand** (theo yêu cầu) khi có request:

```
<Image src="https://xxx.r2.dev/photos/a.jpg" width=800 sizes="..." quality=80 />
        │
        ▼
Trình duyệt tải:  /_next/image?url=<encoded>&w=800&q=80
        │
        ▼
[Next Image Optimizer]
   1. Đọc header `Accept` của trình duyệt  (vd: image/avif,image/webp,*/*)
   2. Fetch ảnh gốc từ R2
   3. Resize xuống đúng `w` cần (theo `sizes` + deviceSizes)
   4. Re-encode sang AVIF (nếu Accept hỗ trợ) → else WebP → else gốc
   5. Cache kết quả (theo url+w+q) và trả về
```

Các yếu tố điều khiển kết quả:

| Tham số | Tác dụng |
|---|---|
| `Accept` header (tự động) | Quyết định AVIF vs WebP vs gốc |
| `sizes` | Cho trình duyệt biết ảnh rộng bao nhiêu ở mỗi breakpoint → chọn đúng `w` trong `srcset` → **không tải ảnh to thừa** |
| `width`/`height` hoặc `fill` | Kích thước bố cục + tránh layout shift |
| `quality` (mặc định 75) | Mức nén; 80–90 cho ảnh cần nét |
| `priority` | Tải sớm (preload), tắt lazy — dùng cho ảnh trên màn hình đầu |
| `deviceSizes`/`imageSizes` (config) | Tập bề rộng Next được phép sinh ra trong `srcset` |

**Ăn tiền nhất là `sizes`.** Đó mới là thứ giảm dung lượng nhiều nhất (không tải ảnh 1920px cho ô 200px), còn WebP/AVIF là lớp nén thêm.

---

## 3. Đang áp dụng ở đâu (dùng `<Image>`)

Những chỗ này **được tối ưu tự động** (AVIF/WebP + resize):

- `src/features/home/components/BehindScenesGallery.jsx`
- `src/features/home/components/AlbumsSwiper.jsx`
- `src/features/layout/header/components/Header.jsx`

Ví dụ thật (thẻ story 9:16, có `fill` + `sizes` + `quality`):

```jsx
import Image from 'next/image';

<div className="relative aspect-[9/16]">
  <Image
    src={shot.src}
    alt={shot.caption}
    fill
    sizes="(max-width: 768px) 72vw, 22vw"  // ô nhỏ trên desktop -> tải bản nhỏ
    quality={80}
    className="object-cover"
  />
</div>
```

Và bản full trong lightbox — nét hơn, ưu tiên tải:

```jsx
<Image
  src={SHOTS[openIdx].src}
  fill
  sizes="(max-width: 640px) 90vw, 480px"
  quality={90}
  priority
  className="object-contain"
/>
```

---

## 4. Tối ưu "thủ công" — hero cover

Ảnh nền hero là file **đã convert sẵn WebP** đặt tĩnh, dùng làm CSS background (không qua `<Image>`):

```jsx
// src/app/page.js
<div style={{ backgroundImage: "url('/cover.webp')" }} /> // ~55KB
```

Dùng khi ảnh là **background CSS** (Next Optimizer chỉ chạy cho `<img>` của `<Image>`, không chạy cho `background-image`). Với ảnh nền cố định → convert sẵn `.webp` là gọn nhất.

> Convert nhanh bằng CLI: `cwebp -q 80 cover.jpg -o cover.webp` (hoặc Squoosh).

---

## 5. Chỗ CHƯA được tối ưu (quan trọng)

Các component sau dùng `<img>` **thô**, trỏ thẳng file gốc trên R2 → **không AVIF/WebP, không resize**:

- `src/features/albums/components/PortfolioGrid.jsx`  ← chính là gallery masonry
- `src/features/albums/components/ImageViewer.jsx`
- `src/features/layout/footer/components/Footer.jsx`

```jsx
// PortfolioGrid.jsx — ảnh tải nguyên gốc từ R2
<img src={`${publicDomain}/${image.key}`} loading="lazy" className="object-cover" />
```

**Vì sao đang để vậy (đánh đổi có chủ đích):**

| | `<img>` thô từ R2 (hiện tại) | `<Image>` Next Optimizer |
|---|---|---|
| Định dạng | Gốc (JPEG…) | AVIF/WebP tự động |
| Resize theo ô | ❌ tải nguyên gốc | ✅ đúng kích thước |
| Chi phí | Rẻ — CDN R2 phục vụ thẳng | Tốn compute optimizer (Vercel tính phí/giới hạn) |
| Layout jank | Đã tự xử bằng `aspect-ratio` đo ở server | Có sẵn width/height |

Gallery có thể **rất nhiều ảnh** → nếu bật optimizer cho tất cả sẽ tốn hạn mức transform. Đó là lý do để `<img>` thô. Nhưng cái giá là **user tải ảnh gốc nặng**.

---

## 6. Cách mở rộng WebP cho gallery (nếu muốn)

Chọn 1 trong 3 hướng, từ nhẹ tới bài bản:

### Hướng A — Dùng `<Image>` cho gallery
Đổi `<img>` → `<Image fill sizes=... />` (host R2 đã whitelist trong `remotePatterns`). Được AVIF/WebP + resize ngay.
- ✅ Ít code, tận dụng hạ tầng sẵn có.
- ⚠️ Tốn hạn mức Image Optimization của Vercel nếu nhiều ảnh/nhiều traffic.

### Hướng B — Cloudflare Image Resizing / Transformations (hợp với R2 nhất)
Ảnh vốn nằm trên Cloudflare R2 → dùng luôn Cloudflare biến đổi ảnh qua URL:
```
/cdn-cgi/image/width=600,format=auto,quality=80/https://xxx.r2.dev/photos/a.jpg
```
`format=auto` = Cloudflare tự trả AVIF/WebP theo trình duyệt, resize tại edge.
- ✅ Nén + resize tại edge Cloudflare, không tốn optimizer của Next/Vercel.
- ⚠️ Cần bật tính năng (có thể phát sinh phí Cloudflare), ảnh phục vụ qua zone Cloudflare.

### Hướng C — Convert sẵn khi upload (pre-generate)
Khi upload lên R2, sinh sẵn các bản `.webp` nhiều kích thước (dùng `sharp`) và lưu cạnh bản gốc; client chọn bản phù hợp qua `<picture>`/`srcset`.
- ✅ Zero chi phí runtime, kiểm soát tuyệt đối.
- ⚠️ Phải có bước build/upload; tốn dung lượng lưu nhiều biến thể.

**Gợi ý:** dự án này ảnh nằm trên R2 → **Hướng B** thường tối ưu nhất; nếu muốn nhanh gọn thì **Hướng A** cho vài ảnh quan trọng.

---

## 7. Checklist áp dụng sang web khác

- [ ] `next.config.js`: `images.formats = ['image/avif','image/webp']`.
- [ ] Ảnh remote → khai báo `remotePatterns` (bắt buộc, cũng là bảo mật).
- [ ] Dùng `<Image>` thay `<img>` cho ảnh nội dung; **luôn đặt `sizes`** đúng theo layout (giảm dung lượng nhiều nhất).
- [ ] `quality` 75–80 cho ảnh thường, 90 cho ảnh cần nét (lightbox/hero).
- [ ] Ảnh màn hình đầu: thêm `priority`.
- [ ] Ảnh **background CSS**: convert sẵn `.webp` (optimizer không đụng tới background).
- [ ] Gallery nhiều ảnh: cân nhắc chi phí optimizer → chọn Cloudflare Transformations (B) hoặc pre-generate (C) thay vì bật optimizer cho tất cả.
- [ ] Self-host (không Vercel): cài `sharp` để optimizer chạy; hoặc dùng `output: 'export'` thì optimizer TẮT → phải tự lo WebP.

---

## 8. Đánh đổi cần nhớ

- **AVIF nén tốt hơn WebP** nhưng **encode chậm/nặng CPU hơn** → lần optimize đầu của mỗi ảnh sẽ lâu hơn (sau đó được cache).
- Next Optimizer **cache theo `url+w+q`**; đổi `quality`/`sizes` là sinh biến thể mới.
- `sizes` sai (vd để `100vw` cho ô nhỏ) → tải ảnh to thừa dù đã WebP → **mất phần lớn lợi ích**.
- Trên Vercel, Image Optimization có **hạn mức/tính phí** theo số ảnh nguồn được tối ưu — gallery lớn dễ đụng trần.

---

*Doc mô tả đúng cấu hình trong `next.config.js` và cách dùng ảnh hiện tại (`<Image>` ở home/header, `<img>` thô ở albums). Mục 6 là đề xuất mở rộng, chưa được triển khai trong repo.*
