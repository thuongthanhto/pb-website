/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Trang /albums phải đo kích thước thật của ~180 ảnh trên R2 trước khi render.
  // Mặc định Next chỉ cho mỗi trang 60s rồi SIGTERM worker — và từ khi có i18n
  // thì số trang cần prerender nhân đôi (vi + en), nên rất dễ chạm ngưỡng.
  staticPageGenerationTimeout: 300,
  images: {
    formats: ['image/avif', 'image/webp'],
    // Ít bề rộng -> ít biến thể cần tối ưu (Vercel Hobby giới hạn số ảnh
    // nguồn được tối ưu / tháng, mỗi bề rộng + định dạng là một lần xử lý).
    // 256/384 cho ô lưới mobile & desktop, 640–1920 cho ảnh rộng hơn;
    // 64/128 cho logo (56px, 2x).
    deviceSizes: [640, 828, 1080, 1200, 1920],
    imageSizes: [64, 128, 256, 384],
    // Ảnh trên R2 không bị ghi đè tại chỗ (đổi ảnh = đổi key) -> cache 1 năm.
    minimumCacheTTL: 31536000,
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
