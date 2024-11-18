import Image from "next/image";
import { PhotoView } from "react-photo-view";

/* eslint-disable @next/next/no-img-element */
const Studio = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="grid gap-4">
        <div className="cursor-pointer">
          <PhotoView src="/images/studio/05.png">
            <Image
              className="h-auto max-w-full rounded-lg"
              src="/images/studio/05.png"
              alt=""
              width={310}
              height={465}
            />
          </PhotoView>
        </div>
        <div className="cursor-pointer">
          <PhotoView src="/images/studio/08.jpg">
            <Image
              className="h-auto max-w-full rounded-lg"
              src="/images/studio/08.jpg"
              alt=""
              width={310}
              height={465}
            />
          </PhotoView>
        </div>
        <div className="cursor-pointer">
          <PhotoView src="/images/studio/03.jpg">
            <Image
              className="h-auto max-w-full rounded-lg"
              src="/images/studio/03.jpg"
              alt=""
              width={310}
              height={207}
            />
          </PhotoView>
        </div>
      </div>
      <div className="grid gap-4">
        <div className="cursor-pointer">
          <PhotoView src="/images/studio/04.jpg">
            <Image
              className="h-auto max-w-full rounded-lg"
              src="/images/studio/04.jpg"
              alt=""
              width={310}
              height={207}
            />
          </PhotoView>
        </div>
        <div className="cursor-pointer">
          <PhotoView src="/images/studio/01.jpg">
            <Image
              className="h-auto max-w-full rounded-lg"
              src="/images/studio/01.jpg"
              alt=""
              width={310}
              height={465}
            />
          </PhotoView>
        </div>
        <div className="cursor-pointer">
          <PhotoView src="/images/studio/11.jpg">
            <Image
              className="h-auto max-w-full rounded-lg"
              src="/images/studio/11.jpg"
              alt=""
              width={310}
              height={465}
            />
          </PhotoView>
        </div>
      </div>
      <div className="grid gap-4">
        <div className="cursor-pointer">
          <PhotoView src="/images/studio/07.jpg">
            <Image
              className="h-auto max-w-full rounded-lg"
              src="/images/studio/07.jpg"
              alt=""
              width={310}
              height={465}
            />
          </PhotoView>
        </div>
        <div className="cursor-pointer">
          <PhotoView src="/images/studio/02.JPG">
            <Image
              className="h-auto max-w-full rounded-lg"
              src="/images/studio/02.jpg"
              alt=""
              width={310}
              height={207}
            />
          </PhotoView>
        </div>
        <div className="cursor-pointer">
          <PhotoView src="/images/studio/09.jpg">
            <Image
              className="h-auto max-w-full rounded-lg"
              src="/images/studio/09.jpg"
              alt=""
              width={310}
              height={465}
            />
          </PhotoView>
        </div>
      </div>
      <div className="grid gap-4">
        <div className="cursor-pointer">
          <PhotoView src="/images/studio/10.jpg">
            <Image
              className="h-auto max-w-full rounded-lg"
              src="/images/studio/10.jpg"
              alt=""
              width={310}
              height={465}
            />
          </PhotoView>
        </div>
        <div className="cursor-pointer">
          <PhotoView src="/images/studio/12.jpg">
            <Image
              className="h-auto max-w-full rounded-lg"
              src="/images/studio/12.jpg"
              alt=""
              width={310}
              height={465}
            />
          </PhotoView>
        </div>
        <div className="cursor-pointer">
          <PhotoView src="/images/studio/06.jpg">
            <Image
              className="h-auto max-w-full rounded-lg"
              src="/images/studio/06.jpg"
              alt=""
              width={310}
              height={207}
            />
          </PhotoView>
        </div>
      </div>
    </div>
  );
};

export default Studio;
