import { AlbumsHero, AlbumsSection } from '@/features/albums/components'
import { getAllImages } from '@/lib/r2-albums'
import { generateSEOMetadata, generateImageGalleryStructuredData } from '@/lib/seo-metadata'

export async function generateMetadata() {
  const images = await getAllImages();
  const totalImages = images.length;
  const folders = [...new Set(images.map(img => img.folder))];

  return generateSEOMetadata({
    title: 'Album & Portfolio',
    description: `Xem bộ sưu tập ${totalImages} ảnh chuyên nghiệp của chúng tôi. Bao gồm ${folders.join(', ')}. Từ tiệc cưới, chân dung, sự kiện đến thương mại.`,
    keywords: [
      'album ảnh',
      'portfolio nhiếp ảnh',
      'ảnh cưới',
      'ảnh chân dung',
      'nhiếp ảnh chuyên nghiệp',
      'studio ảnh',
      ...folders,
    ],
    url: '/albums',
  });
}

export default async function AlbumsPage() {
  // Fetch all images from photos/ folder
  const images = await getAllImages();

  // Generate structured data for SEO
  const structuredData = generateImageGalleryStructuredData(images);

  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <main className="flex-1 flex flex-col items-center w-full bg-white">
        {/* Hero Section */}
        <AlbumsHero />

        {/* Filter Buttons, Portfolio Grid, and FloatingCTA */}
        <AlbumsSection images={images} />
      </main>
    </>
  )
}
