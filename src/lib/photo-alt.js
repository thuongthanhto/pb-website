import { getLocationName } from '@/data/locations'

/**
 * Tên địa điểm hiển thị của một ảnh theo ngôn ngữ: ưu tiên slug trong
 * locations.js (đã dịch), không có thì lấy chuỗi `location` tự do trong
 * metadata.json.
 */
export function photoLocationName(img, locale) {
  if (img?.locationSlug) return getLocationName(img.locationSlug, locale)
  return img?.location || ''
}

/**
 * Alt text mô tả cho ảnh gallery (dùng chung cho lưới ảnh, lightbox và JSON-LD)
 * thay cho tên file kiểu "DSC05346.webp" — vô nghĩa với screen reader lẫn
 * Google Images.
 *
 * `t` là dict.albums của ngôn ngữ đang xem — truyền vào thay vì import
 * dictionaries ở đây, để bundle client của gallery không kéo theo cả 2 file JSON.
 */
export function photoAlt(img, locale, t) {
  const location = photoLocationName(img, locale)
  return location ? t.photoAlt.replace('{location}', location) : t.photoAltGeneric
}
