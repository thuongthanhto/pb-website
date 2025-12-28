import { AlbumsHero, AlbumsSection } from '@/features/albums/components'
import { getAllImages } from '@/lib/r2-albums'

export const metadata = {
  title: 'Album & Portfolio - Studio Lens',
  description: 'Xem bộ sưu tập ảnh chuyên nghiệp của chúng tôi. Từ tiệc cưới, chân dung, sự kiện đến thương mại.',
}

export default async function AlbumsPage() {
  // Fetch all images from photos/ folder
  const images = await getAllImages()
  return (
    <main className="flex-1 flex flex-col items-center w-full bg-white">
        {/* Hero Section */}
        <AlbumsHero />

        {/* Filter Buttons, Portfolio Grid, and FloatingCTA */}
        <AlbumsSection images={images} />
    </main>
  )
}
