import { siteConfig, siteName, type Locale } from './seo-metadata';
// @ts-expect-error — config i18n là JS thuần, project không bật allowJs types
import { localeMeta, localePath } from '@/i18n/config';

/**
 * JSON-LD cho site. Đây là phần Google dùng để hiểu đây là studio ảnh cưới ở
 * TP.HCM, bán gói giá bao nhiêu, phục vụ nước nào — và là điều kiện để hiện
 * rich result (giá, FAQ, đánh giá) trên trang kết quả.
 *
 * Mọi con số/thông tin ở đây phải là thật; đừng thêm aggregateRating giả vì
 * Google phạt review schema không có review thật trên trang.
 */

const CONTACT = {
  phone: '+84909383332',
  instagram: 'https://www.instagram.com/scryer_bo',
  facebook: 'https://www.facebook.com/PhatBo0905',
  email: 'phatchay95@gmail.com',
};

/** Thị trường studio nhận khách — khớp với hreflang en-SG/en-MY/en-US. */
const AREA_SERVED = [
  { '@type': 'Country', name: 'Vietnam' },
  { '@type': 'Country', name: 'Singapore' },
  { '@type': 'Country', name: 'Malaysia' },
  { '@type': 'Country', name: 'United States' },
  { '@type': 'Country', name: 'Australia' },
];

const abs = (path: string) => `${siteConfig.siteUrl}${path === '/' ? '' : path}`;

/** @id dùng chung để các node JSON-LD trỏ về cùng một thực thể doanh nghiệp. */
export const businessId = `${siteConfig.siteUrl}/#business`;

export function localBusinessSchema(locale: Locale) {
  const isVi = locale === 'vi';
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'ProfessionalService'],
    '@id': businessId,
    name: 'PhatBo Photography',
    alternateName: siteName(locale),
    description: isVi
      ? 'Studio chụp ảnh cưới, phóng sự cưới và chân dung tại TP.HCM. Pre-Wedding studio, streetstyle Sài Gòn, quay phóng sự cưới.'
      : 'Wedding, pre-wedding and portrait photography studio in Saigon, Vietnam. Studio and street-style pre-wedding shoots, wedding photojournalism and cinematic films.',
    url: abs(localePath(locale, '/')),
    image: abs(siteConfig.defaultImage),
    logo: abs('/logo-pb.png'),
    telephone: CONTACT.phone,
    email: CONTACT.email,
    priceRange: '12.000.000₫ - 19.000.000₫',
    currenciesAccepted: 'VND',
    inLanguage: [localeMeta.vi.hrefLang, localeMeta.en.hrefLang],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Ho Chi Minh City',
      addressRegion: 'Ho Chi Minh City',
      addressCountry: 'VN',
    },
    areaServed: AREA_SERVED,
    knowsLanguage: ['vi', 'en'],
    founder: { '@type': 'Person', name: siteConfig.author },
    sameAs: [CONTACT.instagram, CONTACT.facebook],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: CONTACT.phone,
      contactType: 'sales',
      availableLanguage: ['Vietnamese', 'English'],
      areaServed: ['VN', 'SG', 'MY', 'US', 'AU'],
    },
  };
}

export function webSiteSchema(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteConfig.siteUrl}/#website`,
    url: abs(localePath(locale, '/')),
    name: siteName(locale),
    inLanguage: localeMeta[locale].hrefLang,
    publisher: { '@id': businessId },
  };
}

/**
 * Danh mục gói chụp + giá. Giá đọc từ dictionary nên bản vi/en luôn khớp với
 * những gì hiển thị trên trang (Google đối chiếu 2 thứ này).
 */
export function serviceOfferSchema(
  locale: Locale,
  packages: { name: string; price: string; description: string }[]
) {
  const isVi = locale === 'vi';
  return {
    '@context': 'https://schema.org',
    '@type': 'OfferCatalog',
    name: isVi
      ? 'Bảng giá chụp ảnh cưới PhatBo Photography'
      : 'PhatBo Photography wedding packages',
    url: abs(localePath(locale, '/pricing')),
    provider: { '@id': businessId },
    inLanguage: localeMeta[locale].hrefLang,
    itemListElement: packages.map((pkg, index) => ({
      '@type': 'Offer',
      position: index + 1,
      name: pkg.name,
      description: pkg.description,
      price: vndAmount(pkg.price),
      priceCurrency: 'VND',
      availability: 'https://schema.org/InStock',
      areaServed: AREA_SERVED,
      seller: { '@id': businessId },
      itemOffered: {
        '@type': 'Service',
        name: pkg.name,
        serviceType: isVi ? 'Chụp ảnh cưới' : 'Wedding photography',
        provider: { '@id': businessId },
      },
    })),
  };
}

/** '15.000.000đ' | '15,000,000 VND' -> '15000000' */
function vndAmount(price: string) {
  return price.replace(/[^\d]/g, '');
}

export function faqSchema(
  locale: Locale,
  items: { question: string; answer: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: localeMeta[locale].hrefLang,
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}

export function breadcrumbSchema(
  locale: Locale,
  trail: { name: string; path: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: abs(localePath(locale, item.path)),
    })),
  };
}

/** Gộp nhiều schema vào một thẻ <script> duy nhất. */
export function jsonLd(...nodes: unknown[]) {
  return JSON.stringify(nodes.length === 1 ? nodes[0] : nodes);
}
