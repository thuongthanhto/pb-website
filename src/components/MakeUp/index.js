import Image from "next/image";
import { PhotoView } from "react-photo-view";

/* eslint-disable @next/next/no-img-element */
const MakeUp = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      <div className="cursor-pointer flex justify-center items-center">
        <PhotoView src="/images/makeup/01.jpg">
          <Image
            className="h-auto w-full rounded-lg"
            src="/images/makeup/01.jpg"
            alt=""
            width={312}
            height={522}
          />
        </PhotoView>
      </div>
      <div className="cursor-pointer flex justify-center items-center">
        <PhotoView src="/images/makeup/02.jpg">
          <Image
            className="h-auto w-full rounded-lg"
            src="/images/makeup/02.jpg"
            alt=""
            width={312}
            height={463}
          />
        </PhotoView>
      </div>
      <div className="cursor-pointer flex justify-center items-center">
        <PhotoView src="/images/makeup/03.jpg">
          <Image
            className="h-auto w-full rounded-lg"
            src="/images/makeup/03.jpg"
            alt=""
            width={312}
            height={430}
          />
        </PhotoView>
      </div>
      <div className="cursor-pointer flex justify-center items-center">
        <PhotoView src="/images/makeup/04.jpg">
          <Image
            className="h-auto w-full rounded-lg"
            src="/images/makeup/04.jpg"
            alt=""
            width={312}
            height={469}
          />
        </PhotoView>
      </div>
      <div className="cursor-pointer flex justify-center items-center">
        <PhotoView src="/images/makeup/05.jpg">
          <Image
            className="h-auto w-full rounded-lg"
            src="/images/makeup/05.jpg"
            alt=""
            width={312}
            height={411}
          />
        </PhotoView>
      </div>
      <div className="cursor-pointer flex justify-center items-center">
        <PhotoView src="/images/makeup/06.jpg">
          <Image
            className="h-auto w-full rounded-lg"
            src="/images/makeup/06.jpg"
            alt=""
            width={312}
            height={489}
          />
        </PhotoView>
      </div>
    </div>
  );
};

export default MakeUp;
