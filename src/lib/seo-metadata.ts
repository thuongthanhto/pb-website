import { Metadata } from 'next';
// @ts-expect-error — config i18n là JS thuần, project không bật allowJs types
import { locales, localeMeta, localePath, defaultLocale } from '@/i18n/config';

export type Locale = 'vi' | 'en';

export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  /** Path trung tính, KHÔNG có prefix locale (ví dụ '/albums'). */
  url?: string;
  type?: 'website' | 'article';
  author?: string;
  publishedTime?: string;
  locale?: Locale;
}

export const siteConfig = {
  siteName: 'PhatBo Photography - Nhiếp Ảnh Chuyên Nghiệp',
  siteNameByLocale: {
    vi: 'PhatBo Photography - Nhiếp Ảnh Chuyên Nghiệp',
    en: 'PhatBo Photography - Professional Photography Studio',
  } as Record<Locale, string>,
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://phatbo.photography',
  defaultImage: '/cover.webp',
  author: 'Phat Bo',
};

export function siteName(locale: Locale = defaultLocale as Locale) {
  return siteConfig.siteNameByLocale[locale] ?? siteConfig.siteNameByLocale.vi;
}

/**
 * canonical + hreflang cho một path trung tính.
 * Google cần cả cụm này để hiểu 2 URL là bản dịch của nhau chứ không phải
 * nội dung trùng lặp.
 */
export function localizedAlternates(locale: Locale, path = '/') {
  const languages: Record<string, string> = {};
  for (const code of locales as Locale[]) {
    const target = localePath(code, path);
    languages[localeMeta[code].hrefLang] = target;
    // Thêm hreflang theo thị trường (en-SG, en-MY, en-US...) cùng trỏ về bản
    // tiếng Anh — báo cho Google biết trang này phục vụ các nước đó.
    for (const extra of localeMeta[code].extraHrefLangs ?? []) {
      languages[extra] = target;
    }
  }
  languages['x-default'] = localePath(defaultLocale, path);

  return {
    canonical: localePath(locale, path),
    languages,
  };
}

/** og:locale tương ứng + danh sách alternate locale cho Open Graph. */
export function openGraphLocales(locale: Locale) {
  return {
    locale: localeMeta[locale].ogLocale,
    alternateLocale: (locales as Locale[])
      .filter((code) => code !== locale)
      .map((code) => localeMeta[code].ogLocale),
  };
}

/**
 * Ảnh OG mặc định, dùng lại cho các page tự khai `openGraph` — Next thay thế
 * cả object openGraph của layout cha chứ không merge sâu, nên page nào override
 * cũng phải tự khai lại images.
 */
export const defaultOgImages = [
  {
    url: siteConfig.defaultImage,
    width: 1600,
    height: 814,
    alt: siteConfig.siteName,
  },
];

/**
 * Generate comprehensive SEO metadata for pages
 */
export function generateSEOMetadata(config: SEOConfig): Metadata {
  const {
    title,
    description,
    keywords = [],
    image = siteConfig.defaultImage,
    url = '/',
    type = 'website',
    author = siteConfig.author,
    publishedTime,
    locale = defaultLocale as Locale,
  } = config;

  const brand = siteName(locale);
  // Title lấy nguyên từ dictionary — mỗi trang đã tự viết title hoàn chỉnh (đã
  // gồm thương hiệu, giữ dưới 60 ký tự). Ghép thêm brand ở đây sẽ ra title kiểu
  // "... | PhatBo Photography | PhatBo Photography - Nhiếp Ảnh Chuyên Nghiệp".
  const fullTitle = title;
  const imageUrl = image.startsWith('http') ? image : `${siteConfig.siteUrl}${image}`;
  const path = url.startsWith('http') ? url.replace(siteConfig.siteUrl, '') || '/' : url;

  return {
    metadataBase: new URL(siteConfig.siteUrl),
    title: fullTitle,
    description,
    keywords: keywords.length > 0 ? keywords.join(', ') : undefined,
    authors: [{ name: author }],
    creator: author,
    publisher: brand,

    // Open Graph
    openGraph: {
      type,
      ...openGraphLocales(locale),
      url: localePath(locale, path),
      siteName: brand,
      title: fullTitle,
      description,
      images: [
        {
          url: imageUrl,
          width: 1600,
          height: 814,
          alt: title,
        },
      ],
      ...(publishedTime && { publishedTime }),
    },

    // Twitter
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [imageUrl],
      creator: `@${author}`,
    },

    // canonical + hreflang
    alternates: localizedAlternates(locale, path),

    // Robots
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

/**
 * Generate structured data for image gallery
 */
export function generateImageGalleryStructuredData(
  images: any[],
  locale: Locale = defaultLocale as Locale
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    inLanguage: localeMeta[locale].hrefLang,
    name: 'PhatBo Photography Photo Gallery',
    description: 'Professional photography portfolio',
    url: `${siteConfig.siteUrl}${localePath(locale, '/albums')}`,
    author: {
      '@type': 'Person',
      name: siteConfig.author,
    },
    image: images.slice(0, 10).map((img) => ({
      '@type': 'ImageObject',
      contentUrl: `${process.env.NEXT_PUBLIC_R2_DOMAIN}/${img.key}`,
      name: img.title || img.fileName,
      description: img.description || '',
      datePublished: img.date || img.lastModified,
      author: {
        '@type': 'Person',
        name: img.photographer || siteConfig.author,
      },
      ...(img.location && {
        contentLocation: {
          '@type': 'Place',
          name: img.location,
        },
      }),
    })),
  };
}

/**
 * Generate breadcrumb structured data
 */
export function generateBreadcrumbStructuredData(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteConfig.siteUrl}${item.url}`,
    })),
  };
}

