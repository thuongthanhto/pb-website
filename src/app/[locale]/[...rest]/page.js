import { notFound } from 'next/navigation'

// Route tĩnh luôn được ưu tiên hơn catch-all, nên file này chỉ nhận những URL
// không khớp route nào. Gọi notFound() để Next render app/[locale]/not-found.js
// (có header/footer + đúng ngôn ngữ) thay vì trang 404 mặc định của Next.
export default function CatchAllNotFound() {
  notFound()
}
