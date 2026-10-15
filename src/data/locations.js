// Danh sách địa điểm chụp. Slug là định danh ổn định: dùng trong URL
// (/dia-diem/<slug>, ?location=<slug>) và trong photos/metadata.json
// (field `locationSlug`), nên đừng đổi slug sau khi đã public.
//
// Chỉ ghi thông tin đã kiểm chứng từ nguồn chính thức của địa điểm.
// Field tuỳ chọn: address, website, geo {lat, lng}, bestTime {vi, en}, permit {vi, en}
// (phí / quy định chụp — nên ghi kèm ngày cập nhật vì hay thay đổi).
//
// Địa điểm dạng "nhóm" (Studio, Outdoor, Phóng sự...) không phải một nơi cụ
// thể nên mẫu tiêu đề mặc định "Chụp ảnh cưới tại {name}" đọc rất gượng. Khai
// thêm để ghi đè: title {vi, en} (title trang + Google), metaDescription
// {vi, en}, galleryTitle {vi, en} (heading phía trên lưới ảnh).
//
// coverPosition (tuỳ chọn): CSS object-position cho ảnh bìa trên thẻ địa điểm.
// Ảnh bìa đa số là ảnh dọc bị crop vào khung 4:3 (chỉ còn ~1/2 chiều cao), nên
// chỉnh theo vị trí mặt trong ảnh bìa hiện tại. Mặc định '50% 30%'. Đổi ảnh
// bìa (featured) thì nhớ xem lại giá trị này.

export const LOCATIONS = {
  'grand-mercure-da-lat': {
    name: { vi: 'Grand Mercure Đà Lạt', en: 'Grand Mercure Dalat' },
    city: 'da-lat',
    coverPosition: '50% 50%',
    type: 'khach-san',
    address: '03 Nguyễn Du, phường Lâm Viên - Đà Lạt, Lâm Đồng',
    website: 'https://www.grandmercuredalat.com',
    description: {
      vi: 'Resort mang kiến trúc khu phố Pháp của Đà Lạt, với 12 biệt thự, khu vườn xanh và hồ bơi ngoài trời. Khuôn viên có sẵn nhiều góc tổ chức tiệc cưới như Lavender Garden, La Fontaine Garden và ballroom Le Soleil.',
      en: 'A resort inspired by Dalat’s French quarter, with 12 villas, lush gardens and an outdoor pool. Its grounds host weddings across spaces such as the Lavender Garden, La Fontaine Garden and the Le Soleil ballroom.',
    },
  },
  // Khu vực chụp streetstyle chứ không phải một venue cụ thể.
  'streetstyle-quan-2': {
    name: { vi: 'Streetstyle Quận 2', en: 'Saigon Street Style – District 2' },
    city: 'sai-gon',
    coverPosition: '50% 5%',
    type: 'ngoai-canh',
    // Mẫu mặc định ra title tiếng Anh > 60 ký tự -> Google cắt mất brand.
    title: {
      vi: 'Chụp Pre-Wedding Streetstyle Quận 2 | PhatBo',
      en: 'Saigon Street Style Pre-Wedding – District 2 | PhatBo',
    },
    address: 'Quận 2 (nay thuộc TP. Thủ Đức), TP. Hồ Chí Minh',
    description: {
      vi: 'Bộ ảnh pre-wedding phong cách streetstyle giữa phố Sài Gòn ở khu Quận 2: thang cuốn, kính, bê tông và nắng xiên qua các toà nhà — hiện đại, cá tính, đậm chất thành thị.',
      en: 'Street-style pre-wedding shoots around Saigon’s District 2: escalators, glass, concrete and slanting light between buildings — modern, bold and unmistakably urban.',
    },
  },
  // Gộp chung mọi studio (studio thuê ngoài, nhiều nơi) -> không có địa chỉ,
  // trang không hiện địa chỉ / bản đồ.
  studio: {
    name: { vi: 'Studio Sài Gòn', en: 'Saigon Studio' },
    city: 'sai-gon',
    coverPosition: '50% 0%',
    type: 'studio',
    title: {
      vi: 'Chụp Ảnh Cưới Studio Sài Gòn | PhatBo',
      en: 'Saigon Studio Wedding Photography | PhatBo',
    },
    metaDescription: {
      vi: '{count} ảnh pre-wedding studio thật của PhatBo Photography tại Sài Gòn: phông nền tối giản, ánh sáng có chủ đích, cảm xúc tự nhiên.',
      en: '{count} real studio pre-wedding photos by PhatBo Photography in Saigon: minimal backdrops, deliberate lighting, natural emotion.',
    },
    galleryTitle: { vi: 'Ảnh cưới chụp studio', en: 'Studio wedding photos' },
    description: {
      vi: 'Ảnh pre-wedding chụp trong studio: phông nền tối giản, ánh sáng có chủ đích, để cảm xúc và trang phục của cô dâu chú rể là nhân vật chính.',
      en: 'Studio pre-wedding portraits: minimal backdrops and deliberate lighting, letting the couple’s emotion and styling take centre stage.',
    },
  },
  // Gộp chung nhiều buổi chụp ngoại cảnh (phố trung tâm, quán cà phê, vườn
  // cây...) chứ không phải một địa điểm cụ thể.
  'pre-wedding-outdoor': {
    name: { vi: 'Pre-Wedding Outdoor', en: 'Pre-Wedding Outdoor' },
    city: 'sai-gon',
    coverPosition: '50% 0%',
    type: 'ngoai-canh',
    title: {
      vi: 'Chụp Pre-Wedding Ngoại Cảnh Sài Gòn | PhatBo',
      en: 'Outdoor Pre-Wedding Photos in Saigon | PhatBo',
    },
    metaDescription: {
      vi: '{count} ảnh pre-wedding ngoại cảnh thật ở Sài Gòn: phố trung tâm, quán cà phê, hẻm cũ và vườn xanh. Tự nhiên, đời thường, đầy cảm xúc.',
      en: '{count} real outdoor pre-wedding photos around Saigon: downtown streets, cafés, old alleys and gardens. Natural, candid and full of feeling.',
    },
    galleryTitle: { vi: 'Ảnh pre-wedding ngoại cảnh', en: 'Outdoor pre-wedding photos' },
    description: {
      vi: 'Ảnh pre-wedding ngoại cảnh giữa Sài Gòn: phố trung tâm quanh Nhà hát Thành phố, quán cà phê, những con hẻm cũ và các khu vườn xanh — tự nhiên, đời thường và đầy cảm xúc.',
      en: 'Outdoor pre-wedding shoots around Saigon: downtown streets by the Opera House, cafés, old alleys and lush gardens — natural, candid and full of feeling.',
    },
  },
  // Gộp các đám cưới chụp phóng sự (sáng chuẩn bị, lễ gia tiên, lễ & tiệc).
  'phong-su-cuoi': {
    name: { vi: 'Phóng sự cưới', en: 'Wedding Photojournalism' },
    city: 'sai-gon',
    coverPosition: '50% 0%',
    type: 'phong-su',
    title: {
      vi: 'Phóng Sự Cưới TP.HCM – Ảnh Ngày Cưới Thật | PhatBo',
      en: 'Wedding Photojournalism in Saigon | PhatBo',
    },
    metaDescription: {
      vi: '{count} ảnh phóng sự ngày cưới thật: cô dâu chuẩn bị, lễ gia tiên, lễ cưới và tiệc tối. Ghi lại khoảnh khắc thật, không dàn dựng.',
      en: '{count} real wedding-day photos: getting ready, family ceremony, vows and reception. Genuine moments, never staged.',
    },
    galleryTitle: { vi: 'Ảnh phóng sự ngày cưới', en: 'Wedding-day photos' },
    description: {
      vi: 'Phóng sự trọn ngày cưới: từ buổi sáng cô dâu chuẩn bị, lễ gia tiên bên gia đình, đến lễ cưới và tiệc tối — ghi lại khoảnh khắc thật, không dàn dựng.',
      en: 'Full wedding-day coverage: from the bride getting ready and the family tea ceremony to the vows and the evening reception — real moments, never staged.',
    },
  },
  'the-anam-cam-ranh': {
    name: { vi: 'The Anam Cam Ranh', en: 'The Anam Cam Ranh' },
    city: 'bien',
    type: 'resort',
    address: 'Bãi Dài, Bắc bán đảo Cam Ranh, Khánh Hòa',
    website: 'https://www.theanam.com/cam-ranh',
    description: {
      vi: 'Resort biển ở Bãi Dài, Cam Ranh, mang phong cách Đông Dương hoài cổ kết hợp tiện nghi sang trọng hiện đại. Khuôn viên có các biệt thự, nhà hàng Làng Việt theo kiến trúc nhà làng truyền thống và Beach Club rợp bóng dừa sát biển.',
      en: 'A beachfront resort on Long Beach, Cam Ranh, blending nostalgic Indochine charm with modern luxury. Its grounds include villas, the Lang Viet restaurant modelled on traditional Vietnamese village houses, and a palm-shaded oceanfront Beach Club.',
    },
  },
}

// Gắn địa điểm cho cả một thư mục R2 (photos/<folder>/...), để không phải
// khai từng ảnh trong metadata.json.
// Album chụp ở nhiều nơi thì chia thư mục con đặt tên đúng bằng slug:
// photos/<album>/<slug>/<file> — không cần khai ở đây.
// Thứ tự ưu tiên: metadata.json theo ảnh > thư mục con > FOLDER_LOCATIONS.
// TODO: điền khi biết thư mục nào chụp ở đâu, vd { 'V&K': 'grand-mercure-da-lat' }
export const FOLDER_LOCATIONS = {
  'LindaNgo&PhongDat': 'the-anam-cam-ranh',
  studio: 'studio',
  outdoor: 'pre-wedding-outdoor',
  'V&K': 'phong-su-cuoi',
  'T&K': 'phong-su-cuoi',
}

export const CITIES = {
  'sai-gon': { vi: 'Sài Gòn', en: 'Saigon' },
  'da-lat': { vi: 'Đà Lạt', en: 'Dalat' },
  bien: { vi: 'Biển & Resort', en: 'Beach & Resort' },
}

// Object.hasOwn: slug đến từ URL / metadata.json, tránh khớp nhầm key của
// prototype như 'constructor', 'toString'.
export function getLocation(slug) {
  return slug && Object.hasOwn(LOCATIONS, slug) ? LOCATIONS[slug] : null
}

export function getLocationName(slug, locale = 'vi') {
  const location = getLocation(slug)
  return location ? location.name[locale] ?? location.name.vi : slug
}

/** Slug địa điểm có ít nhất một ảnh, theo thứ tự trong LOCATIONS. */
export function getLocationSlugsInUse(images = []) {
  const used = new Set(images.map((img) => img.locationSlug).filter(Boolean))
  return Object.keys(LOCATIONS).filter((slug) => used.has(slug))
}

/**
 * Thẻ địa điểm cho trang /dia-diem: số ảnh + ảnh bìa (ảnh featured, không có
 * thì ảnh mới nhất), theo thứ tự trong LOCATIONS.
 */
export function getLocationCards(images = []) {
  return getLocationSlugsInUse(images).map((slug) => {
    const photos = images.filter((img) => img.locationSlug === slug)
    return {
      slug,
      location: LOCATIONS[slug],
      count: photos.length,
      cover: photos.find((img) => img.featured) ?? photos[0],
    }
  })
}

export function googleMapsUrl(location) {
  const query = `${location.name.en}, ${location.address}`
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`
}
