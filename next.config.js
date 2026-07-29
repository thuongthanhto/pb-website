/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Trang /albums phải đo kích thước thật của ~180 ảnh trên R2 trước khi render.
  // Mặc định Next chỉ cho mỗi trang 60s rồi SIGTERM worker — và từ khi có i18n
  // thì số trang cần prerender nhân đôi (vi + en), nên rất dễ chạm ngưỡng.
  staticPageGenerationTimeout: 300,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.r2.dev',
      },
      {
        protocol: 'https',
        hostname: '**.r2.cloudflarestorage.com',
      },
    ],
  },
}

module.exports = nextConfig
