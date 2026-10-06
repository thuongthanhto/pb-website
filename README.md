# PhatBo Photography

Website portfolio của studio nhiếp ảnh **PhatBo Photography** — _Ghi dấu khoảnh khắc · Lưu giữ ký ức._

Xây dựng bằng [Next.js 14](https://nextjs.org/) (App Router), đa ngôn ngữ (Việt / Anh), tối ưu SEO và lưu trữ ảnh trên [Cloudflare R2](https://developers.cloudflare.com/r2/).

## Tính năng

- **Portfolio ảnh** — gallery albums tự đo kích thước ảnh thật trên R2 để dựng layout masonry cân đối (xem [docs/r2-auto-layout-gallery.md](docs/r2-auto-layout-gallery.md)).
- **Đa ngôn ngữ (i18n)** — tiếng Việt (mặc định, không prefix URL) và tiếng Anh (dưới `/en`), có hreflang cho các thị trường nói tiếng Anh. Chi tiết: [docs/i18n-multi-language.md](docs/i18n-multi-language.md).
- **SEO** — metadata động, `sitemap.js`, `robots.js`, structured data (JSON-LD) và `next-seo`.
- **Light / Dark theme** — chuyển giao diện sáng/tối, ghi nhớ lựa chọn người dùng ([docs/theming.md](docs/theming.md)).
- **Tối ưu ảnh** — phục vụ AVIF/WebP qua `next/image` ([docs/webp-image-optimization.md](docs/webp-image-optimization.md)).
- **Analytics** — Vercel Analytics và Speed Insights.

## Công nghệ

| Hạng mục | Lựa chọn |
| --- | --- |
| Framework | Next.js 14 (App Router) |
| UI | React 18, Tailwind CSS v4 |
| Gallery / slider | Swiper |
| Lưu trữ ảnh | Cloudflare R2 (truy cập qua AWS S3 SDK) |
| Xử lý ảnh | `sharp`, `image-size` |
| SEO | `next-seo`, structured data |
| Deploy | Vercel |

## Cấu trúc thư mục

```
src/
├── app/[locale]/        # Route App Router (albums, pricing, contact, ...)
│   ├── robots.js
│   └── sitemap.js
├── components/          # Component dùng chung (Lightbox, ThemeToggle, ...)
├── features/            # Component theo từng trang (home, albums, pricing, contact, layout)
├── i18n/                # Cấu hình đa ngôn ngữ + từ điển vi/en
├── lib/                 # Tiện ích R2, metadata, SEO
├── styles/              # globals.css (Tailwind)
└── middleware.js        # Xử lý routing theo locale
docs/                    # Tài liệu kỹ thuật chi tiết
```

## Bắt đầu

### Yêu cầu

- Node.js 18 trở lên
- Một bucket [Cloudflare R2](https://developers.cloudflare.com/r2/) để lưu ảnh

### Cài đặt

```bash
npm install
```

### Biến môi trường

Tạo file `.env.local` ở thư mục gốc:

```bash
R2_ACCOUNT_ID=           # Account ID của Cloudflare R2
R2_ACCESS_KEY_ID=        # Access key
R2_SECRET_ACCESS_KEY=    # Secret key
R2_BUCKET_NAME=          # Tên bucket
R2_PUBLIC_DOMAIN=        # Domain public của bucket (server)

# Domain public hiển thị phía client
NEXT_PUBLIC_R2_DOMAIN=
```

### Chạy môi trường phát triển

```bash
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000) để xem kết quả.

## Scripts

| Lệnh | Mô tả |
| --- | --- |
| `npm run dev` | Chạy server phát triển |
| `npm run build` | Build cho production |
| `npm run start` | Chạy bản build production |
| `npm run lint` | Kiểm tra lint với ESLint |

## Tài liệu

Tài liệu kỹ thuật chi tiết nằm trong thư mục [`docs/`](docs/):

- [i18n-multi-language.md](docs/i18n-multi-language.md) — chiến lược đa ngôn ngữ & routing theo locale
- [r2-auto-layout-gallery.md](docs/r2-auto-layout-gallery.md) — gallery tự dựng layout từ ảnh trên R2
- [seo-keyword-research.md](docs/seo-keyword-research.md) — nghiên cứu từ khóa SEO
- [theming.md](docs/theming.md) — hệ thống light/dark theme
- [webp-image-optimization.md](docs/webp-image-optimization.md) — tối ưu ảnh WebP/AVIF
- [haggle-pricing.md](docs/haggle-pricing.md) — logic bảng giá

## Triển khai

Dự án được triển khai trên [Vercel](https://vercel.com/). Cấu hình các biến môi trường R2 trong phần Project Settings trước khi deploy.
