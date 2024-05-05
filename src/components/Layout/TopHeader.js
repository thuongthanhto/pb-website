import Image from 'next/image';

const TopHeader = () => {
  return (
    <header className="bg-black">
      <div className="container mx-auto h-[70px] flex justify-center items-center">
        <Image src="/logo.png" alt="logo" width={200} height={55} />
      </div>
    </header>
  );
};

export default TopHeader;
