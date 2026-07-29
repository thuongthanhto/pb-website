# Đa ngôn ngữ (vi / en)

Site chạy 2 ngôn ngữ: tiếng Việt (mặc định) và tiếng Anh.

## Chiến lược URL

Locale mặc định **không có prefix**, để mọi URL đã được Google index giữ nguyên:

| Trang     | Tiếng Việt  | Tiếng Anh      |
| --------- | ----------- | -------------- |
| Trang chủ | `/`         | `/en`          |
| Album     | `/albums`   | `/en/albums`   |
| Bảng giá  | `/pricing`  | `/en/pricing`  |
| Liên hệ   | `/contact`  | `/en/contact`  |

Về mặt filesystem thì mọi route nằm trong `src/app/[locale]/`. [`src/middleware.js`](../src/middleware.js) làm phần ghép nối:

1. `/vi/...` → **redirect 308** về `/...` (chỉ tồn tại một URL canonical cho mỗi trang).
2. `/...` (không prefix) → **rewrite** sang `/vi/...`, URL trên thanh địa chỉ không đổi.
3. `/en/...` → đi thẳng vào `[locale] = 'en'`.

Matcher của middleware bỏ qua `_next/`, `api/` và mọi path có phần mở rộng, nên `/sitemap.xml`, `/robots.txt`, `/cover.webp`… không bị rewrite.

## Nội dung

Toàn bộ chuỗi nằm trong 2 file JSON có **cấu trúc key giống hệt nhau**:

- [`src/i18n/dictionaries/vi.json`](../src/i18n/dictionaries/vi.json)
- [`src/i18n/dictionaries/en.json`](../src/i18n/dictionaries/en.json)

Thiếu key ở một bên sẽ làm component crash lúc render, nên khi thêm chuỗi mới **phải thêm ở cả 2 file** (kể cả độ dài của array — code map theo index).

### Đọc dictionary

**Server component** — nhận `locale` qua props và đọc trực tiếp, không cần context:

```jsx
import { normalizeLocale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'

export function PricingCTA({ locale }) {
  const t = getDictionary(normalizeLocale(locale)).pricing.cta
  return <h2>{t.title}</h2>
}
```

`page.js` lấy locale từ `params.locale` rồi truyền xuống.

**Client component** — dùng hook, dictionary được `[locale]/layout.js` bơm xuống qua `I18nProvider`:

```jsx
'use client'
import { useI18n } from '@/i18n/I18nProvider'

export function Footer() {
  const { dict, path } = useI18n() // path() tự thêm prefix locale
  return <Link href={path('/albums')}>{dict.common.nav.albums}</Link>
}
```

### Link nội bộ

Đừng hardcode `href="/albums"` — sẽ nhảy về tiếng Việt khi đang ở `/en`. Dùng:

- server component: `localePath(locale, '/albums')`
- client component: `path('/albums')` từ `useI18n()`

### Placeholder

Chuỗi có `{tên}` thì thay bằng `interpolate`:

```js
interpolate(t.meta.description, { count: 180, folders: 'Studio, Ngoại cảnh' })
```

## Những gì KHÔNG nằm trong dictionary

Cố tình để ở code, vì không phải nội dung dịch — và nếu đặt trong dictionary thì 2 bản dịch rất dễ lệch nhau:

- URL ảnh, icon, avatar (`SERVICE_ICONS`, `TESTIMONIAL_AVATARS`, `MEMBER_PHOTOS`, `SHOT_SOURCES`) — ghép với dictionary **theo index**, nên thêm/bớt phần tử phải sửa cả 2 nơi.
- Gói nào được highlight ở bảng giá (`FEATURED_INDEX`), số sao của review.
- Số điện thoại, link Instagram/Facebook, email.

## Album filter

`AlbumsSection` giữ **key folder của R2** (`studio`, `V&K`, `LindaNgo&PhongDat`…) trong state và trong query `?category=`, không giữ nhãn hiển thị. Nhờ vậy link `?category=studio&photo=...` share được giữa 2 ngôn ngữ, và folder mới thêm trên R2 vẫn hoạt động (hiện tạm key thô cho tới khi thêm nhãn vào `albums.filters.folders`).

## SEO

- `canonical` + `hreflang` (`vi-VN`, `en`, `x-default`) sinh bởi `localizedAlternates()` trong [`src/lib/seo-metadata.ts`](../src/lib/seo-metadata.ts).
- `og:locale` / `og:locale:alternate` sinh bởi `openGraphLocales()`.
- `sitemap.xml` xuất mỗi trang một entry cho từng ngôn ngữ, kèm `xhtml:link` alternates.
- `<html lang>` lấy từ `localeMeta[locale].htmlLang`.

## Thêm một ngôn ngữ mới

1. Thêm code vào `locales` + `localeMeta` trong [`src/i18n/config.js`](../src/i18n/config.js).
2. Tạo `src/i18n/dictionaries/<code>.json` (copy từ `vi.json` rồi dịch, giữ nguyên toàn bộ key).
3. Khai báo trong `dictionaries` map ở [`src/i18n/dictionaries.js`](../src/i18n/dictionaries.js).
4. Thêm nhãn `common.language.<code>` + `common.language.<code>Short` vào **tất cả** dictionary (language switcher đọc theo `locales`).
5. Thêm `siteConfig.siteNameByLocale.<code>` trong `seo-metadata.ts`.

Font đã subset sẵn `latin` + `vietnamese`; ngôn ngữ dùng bộ chữ khác cần thêm subset trong `[locale]/layout.js`.

## Lưu ý

Trang 404 (`app/[locale]/not-found.js`) trả đúng status 404 và thẻ `noindex`, nhưng Next 14 render not-found boundary trong shell `__next_error__` riêng — body không được SSR, nội dung hiện sau khi hydrate. Vì vậy component này **không dùng `useI18n()`** mà tự suy locale từ `usePathname()`.
