import Link from 'next/link';
import { Reveal } from '@/components/motion/Reveal';
import { Icon } from '@/components/Icon';
import { BehindScenesGallery } from './BehindScenesGallery';

const STATS = [
  { value: '500+', label: 'Buổi chụp đã thực hiện' },
  { value: '15 năm', label: 'Kinh nghiệm trong nghề' },
  { value: 'Gu ảnh sang trọng', label: 'Chi tiết từng bức ảnh' },
];

export function BehindScenesSection() {
  return (
    <div
      className="w-full py-10 md:py-24 border-t border-stone-800"
      id="behind-the-scenes"
    >
      <div className="max-w-[1280px] mx-auto px-4 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,440px)_1fr] gap-8 lg:gap-14 items-center">
          {/* Nội dung */}
          <Reveal className="flex flex-col gap-5 md:gap-6 order-1">
            <h2 className="text-primary font-bold tracking-widest uppercase text-xs md:text-sm bg-primary/5 px-3 py-1 rounded-full self-start">
              Hậu Trường
            </h2>
            <h3 className="text-stone-100 text-2xl md:text-5xl font-bold leading-tight">
              Sự tận tâm phía sau <br className="hidden md:block" />
              mỗi khung hình
            </h3>
            <p className="text-text-secondary text-base md:text-lg leading-relaxed max-w-[520px]">
              Một bức ảnh đẹp không đến từ may mắn. Đó là cả ekip chuẩn bị ánh
              sáng, canh từng góc máy và chỉ đạo tạo dáng để bạn luôn tự tin,
              tự nhiên nhất trước ống kính.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 md:gap-5 mt-2">
              {STATS.map((stat, idx) => (
                <Reveal
                  key={idx}
                  delay={idx * 0.1}
                  className="flex flex-col gap-1 rounded-2xl border border-stone-800 bg-stone-800/50 p-3 md:p-5"
                >
                  <span className="text-primary text-lg md:text-2xl font-black leading-tight text-balance">
                    {stat.value}
                  </span>
                  <span className="text-text-secondary text-[11px] md:text-sm leading-snug">
                    {stat.label}
                  </span>
                </Reveal>
              ))}
            </div>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center self-start rounded-full h-12 md:h-14 px-7 md:px-8 mt-2 bg-primary hover:bg-primary-dark transition-all text-white text-base md:text-lg font-bold shadow-xl shadow-primary/20 hover:scale-105 active:scale-95"
            >
              Đặt lịch ngay
              <Icon name="arrow_forward" className="text-[20px] ml-1" />
            </Link>
          </Reveal>

          {/* Dải ảnh hậu trường (client component: click mở full 9:16) */}
          <BehindScenesGallery />
        </div>
      </div>
    </div>
  );
}
