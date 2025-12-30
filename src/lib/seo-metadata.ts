import { Metadata } from 'next';

export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  author?: string;
  publishedTime?: string;
}

const siteConfig = {
  siteName: 'PB Studio - Nhiếp Ảnh Chuyên Nghiệp',
  siteUrl: 'https://phatbo.info',
  defaultImage: '/logo.png',
  locale: 'vi_VN',
  author: 'Phat Bo',
};

/**
 * Generate comprehensive SEO metadata for pages
 */
export function generateSEOMetadata(config: SEOConfig): Metadata {
  const {
    title,
    description,
    keywords = [],
    image = siteConfig.defaultImage,
    url = siteConfig.siteUrl,
    type = 'website',
    author = siteConfig.author,
    publishedTime,
  } = config;

  const fullTitle = `${title} | ${siteConfig.siteName}`;
  const imageUrl = image.startsWith('http') ? image : `${siteConfig.siteUrl}${image}`;
  const fullUrl = url.startsWith('http') ? url : `${siteConfig.siteUrl}${url}`;

  return {
    title: fullTitle,
    description,
    keywords: keywords.length > 0 ? keywords.join(', ') : undefined,
    authors: [{ name: author }],
    creator: author,
    publisher: siteConfig.siteName,

    // Open Graph
    openGraph: {
      type,
      locale: siteConfig.locale,
      url: fullUrl,
      siteName: siteConfig.siteName,
      title: fullTitle,
      description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
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

    // Additional metadata
    alternates: {
      canonical: fullUrl,
    },

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
 * Generate metadata for an album/folder page
 */
export function generateAlbumMetadata(
  folderName: string,
  imageCount: number,
  description?: string
): Metadata {
  return generateSEOMetadata({
    title: `Album ${folderName}`,
    description: description || `Xem bộ sưu tập ${folderName} với ${imageCount} ảnh chuyên nghiệp`,
    keywords: ['album', 'photography', folderName, 'nhiếp ảnh', 'ảnh đẹp'],
    url: `/albums?folder=${encodeURIComponent(folderName)}`,
  });
}

/**
 * Generate structured data for image gallery
 */
export function generateImageGalleryStructuredData(images: any[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    name: 'PB Studio Photo Gallery',
    description: 'Professional photography portfolio',
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

