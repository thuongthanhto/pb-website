export function PortfolioGrid({
  images = [],
  selectedFolder = 'Tất cả',
  onImageClick = () => {},
}) {
  // Generate random height classes for variety in masonry layout
  const heightClasses = [
    'h-[300px]',
    'h-[350px]',
    'h-[400px]',
    'h-[450px]',
    'h-[500px]',
  ]
  const publicDomain =
    process.env.NEXT_PUBLIC_R2_DOMAIN ||
    'https://pub-4e35e8513e3c44399e73dd02c4b4447d.r2.dev'

  // No filtering needed here - AlbumsSection already filters the images
  if (!images || images.length === 0) {
    return (
      <div className="w-full max-w-[1440px] px-4 md:px-10 pb-24 mx-auto">
        <p className="text-gray-500 text-center">Không tìm thấy ảnh nào.</p>
      </div>
    )
  }

  return (
    <div className="w-full max-w-[1440px] px-4 md:px-10 pb-24 mx-auto">
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
        {images.map((image, idx) => {
          const height = heightClasses[idx % heightClasses.length]
          const imageUrl = `${publicDomain}/${image.key}`

          return (
            <div
              key={image.id}
              onClick={() => onImageClick(image)}
              className="break-inside-avoid group relative rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-shadow duration-300"
            >
              <div className={`w-full ${height} bg-gray-200 relative`}>
                <img
                  src={imageUrl}
                  alt={image.fileName}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
