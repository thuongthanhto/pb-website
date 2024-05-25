import Image from "next/image";
import { PhotoView } from "react-photo-view";

/* eslint-disable @next/next/no-img-element */
const Reportage = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="grid gap-4">
        <div className="cursor-pointer">
          <PhotoView src="/images/reportage/05.jpg">
            <Image
              className="h-auto max-w-full rounded-lg"
              src="/images/reportage/05.jpg"
              alt=""
              width={310}
              height={465}
            />
          </PhotoView>
        </div>
        <div className="cursor-pointer">
          <PhotoView src="/images/reportage/09.jpg">
            <Image
              className="h-auto max-w-full rounded-lg"
              src="/images/reportage/09.jpg"
              alt=""
              width={310}
              height={207}
            />
          </PhotoView>
        </div>
        <div className="cursor-pointer">
          <PhotoView src="/images/reportage/03.jpg">
            <Image
              className="h-auto max-w-full rounded-lg"
              src="/images/reportage/03.jpg"
              alt=""
              width={310}
              height={465}
            />
          </PhotoView>
        </div>
      </div>
      <div className="grid gap-4">
        <div className="cursor-pointer">
          <PhotoView src="/images/reportage/04.jpg">
            <Image
              className="h-auto max-w-full rounded-lg"
              src="/images/reportage/04.jpg"
              alt=""
              width={310}
              height={465}
            />
          </PhotoView>
        </div>
        <div className="cursor-pointer">
          <PhotoView src="/images/reportage/01.jpg">
            <Image
              className="h-auto max-w-full rounded-lg"
              src="/images/reportage/01.jpg"
              alt=""
              width={310}
              height={465}
            />
          </PhotoView>
        </div>
        <div className="cursor-pointer">
          <PhotoView src="/images/reportage/06.jpg">
            <Image
              className="h-auto max-w-full rounded-lg"
              src="/images/reportage/06.jpg"
              alt=""
              width={310}
              height={207}
            />
          </PhotoView>
        </div>
      </div>
      <div className="grid gap-4">
        <div className="cursor-pointer">
          <PhotoView src="/images/reportage/07.jpg">
            <Image
              className="h-auto max-w-full rounded-lg"
              src="/images/reportage/07.jpg"
              alt=""
              width={310}
              height={207}
            />
          </PhotoView>
        </div>
        <div className="cursor-pointer">
          <PhotoView src="/images/reportage/08.jpg">
            <Image
              className="h-auto max-w-full rounded-lg"
              src="/images/reportage/08.jpg"
              alt=""
              width={310}
              height={465}
            />
          </PhotoView>
        </div>
        <div className="cursor-pointer">
          <PhotoView src="/images/reportage/02.jpg">
            <Image
              className="h-auto max-w-full rounded-lg"
              src="/images/reportage/02.jpg"
              alt=""
              width={310}
              height={465}
            />
          </PhotoView>
        </div>
      </div>
      <div className="grid gap-4">
        <div className="cursor-pointer">
          <PhotoView src="/images/reportage/10.jpg">
            <Image
              className="h-auto max-w-full rounded-lg"
              src="/images/reportage/10.jpg"
              alt=""
              width={310}
              height={465}
            />
          </PhotoView>
        </div>
        <div className="cursor-pointer">
          <PhotoView src="/images/reportage/11.jpg">
            <Image
              className="h-auto max-w-full rounded-lg"
              src="/images/reportage/11.jpg"
              alt=""
              width={310}
              height={465}
            />
          </PhotoView>
        </div>
        <div className="cursor-pointer">
          <PhotoView src="/images/reportage/12.jpg">
            <Image
              className="h-auto max-w-full rounded-lg"
              src="/images/reportage/12.jpg"
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

export default Reportage;
