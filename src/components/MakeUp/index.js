import Image from "next/image";
import { PhotoView } from "react-photo-view";

/* eslint-disable @next/next/no-img-element */
const MakeUp = () => {
  const makeupImages = [
    { src: "/images/makeup/01.jpg", width: 312, height: 522, alt: "Elegant bridal makeup with pearl accessories" },
    { src: "/images/makeup/02.jpg", width: 312, height: 463, alt: "Sophisticated bridal look with crystal necklace" },
    { src: "/images/makeup/03.jpg", width: 312, height: 430, alt: "Natural bridal makeup with elegant updo" },
    { src: "/images/makeup/04.jpg", width: 312, height: 469, alt: "Classic bridal style with pearl earrings" },
    { src: "/images/makeup/05.jpg", width: 312, height: 411, alt: "Timeless bridal beauty with soft curls" },
    { src: "/images/makeup/06.jpg", width: 312, height: 489, alt: "Modern bridal makeup with sleek styling" },
  ];

  return (
    <div className="px-4 md:px-8 lg:px-16">
      {/* Equal grid layout like Studio/Reportage sections */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-6">
        {makeupImages.map((image, index) => (
          <div key={index} className="group cursor-pointer">
            <PhotoView src={image.src}>
              <div className="relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 aspect-[4/5]">
                <Image
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 33vw"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                />
                {/* Overlay effect */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 rounded-lg"></div>

                {/* View icon on hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white bg-opacity-90 rounded-full p-3 transform scale-75 group-hover:scale-100 transition-transform duration-300">
                    <svg
                      className="w-6 h-6 text-gray-800"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </PhotoView>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MakeUp;
