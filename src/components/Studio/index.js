import Image from "next/image";

/* eslint-disable @next/next/no-img-element */
const Studio = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="grid gap-4">
        <div>
          <Image
            className="h-auto max-w-full rounded-lg"
            src="/images/studio/05.png"
            alt=""
            width={310}
            height={465}
          />
        </div>
        <div>
          <Image
            className="h-auto max-w-full rounded-lg"
            src="/images/studio/08.jpg"
            alt=""
            width={310}
            height={465}
          />
        </div>
        <div>
          <Image
            className="h-auto max-w-full rounded-lg"
            src="/images/studio/03.jpg"
            alt=""
            width={310}
            height={207}
          />
        </div>
      </div>
      <div className="grid gap-4">
        <div>
          <Image
            className="h-auto max-w-full rounded-lg"
            src="/images/studio/04.jpg"
            alt=""
            width={310}
            height={207}
          />
        </div>
        <div>
          <Image
            className="h-auto max-w-full rounded-lg"
            src="/images/studio/01.jpg"
            alt=""
            width={310}
            height={465}

          />
        </div>
        <div>
          <Image
            className="h-auto max-w-full rounded-lg"
            src="/images/studio/11.jpg"
            alt=""
            width={310}
            height={465}
          />
        </div>
      </div>
      <div className="grid gap-4">
        <div>
          <Image
            className="h-auto max-w-full rounded-lg"
            src="/images/studio/07.jpg"
            alt=""
            width={310}
            height={465}
          />
        </div>
        <div>
          <Image
            className="h-auto max-w-full rounded-lg"
            src="/images/studio/02.jpg"
            alt=""
            width={310}
            height={207}
          />
        </div>
        <div>
          <Image
            className="h-auto max-w-full rounded-lg"
            src="/images/studio/09.jpg"
            alt=""
            width={310}
            height={465}
          />
        </div>
      </div>
      <div className="grid gap-4">
        <div>
          <Image
            className="h-auto max-w-full rounded-lg"
            src="/images/studio/10.jpg"
            alt=""
            width={310}
            height={465}
          />
        </div>
        <div>
          <Image
            className="h-auto max-w-full rounded-lg"
            src="/images/studio/12.jpg"
            alt=""
            width={310}
            height={465}
          />
        </div>
        <div>
          <Image
            className="h-auto max-w-full rounded-lg"
            src="/images/studio/06.jpg"
            alt=""
            width={310}
            height={207}
          />
        </div>
      </div>
    </div>
  );
};

export default Studio;
