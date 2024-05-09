import Image from "next/image";

/* eslint-disable @next/next/no-img-element */
const MakeUp = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      <div>
        <Image
          className="h-auto max-w-full rounded-lg"
          src="/images/makeup/01.jpg"
          alt=""
          width={312}
          height={522}
        />
      </div>
      <div>
        <Image
          className="h-auto max-w-full rounded-lg"
          src="/images/makeup/02.jpg"
          alt=""
          width={312}
          height={463}
        />
      </div>
      <div>
        <Image
          className="h-auto max-w-full rounded-lg"
          src="/images/makeup/03.jpg"
          alt=""
          width={312}
          height={430}
        />
      </div>
      <div>
        <Image
          className="h-auto max-w-full rounded-lg"
          src="/images/makeup/04.jpg"
          alt=""
          width={312}
          height={469}
        />
      </div>
      <div>
        <Image
          className="h-auto max-w-full rounded-lg"
          src="/images/makeup/05.jpg"
          alt=""
          width={312}
          height={411}
        />
      </div>
      <div>
        <Image
          className="h-auto max-w-full rounded-lg"
          src="/images/makeup/06.jpg"
          alt=""
          width={312}
          height={489}
        />
      </div>
    </div>
  );
};

export default MakeUp;
