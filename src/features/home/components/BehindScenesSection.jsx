import Link from 'next/link';
import Image from 'next/image';
import { Reveal } from '@/components/motion/Reveal';

// Ảnh tác nghiệp (hậu trường) — đặt trong /public/work
const SHOTS = [
  {
    src: '/work/work01.jpeg',
    caption: 'Set up ánh sáng tại studio',
    span: 'md:col-span-2 md:row-span-2', // ảnh lớn
  },
  {
    src: '/work/work02.jpeg',
    caption: 'Ekip tác nghiệp tại hiện trường',
    span: '',
  },
  {
    src: '/work/work03.jpeg',
    caption: 'Canh khung & chỉ đạo tạo dáng',
    span: '',
  },
  {
    src: '/work/work04.jpeg',
    caption: 'Hậu kỳ & chọn ảnh cùng khách',
    span: 'md:col-span-2', // ảnh ngang trải rộng
  },
];

const STATS = [
  { value: '500+', label: 'Buổi chụp đã thực hiện' },
  { value: '15 năm', label: 'Kinh nghiệm trong nghề' },
  { value: 'Gu ảnh sang trọng', label: 'Chi tiết từng bức ảnh' },
];

export function BehindScenesSection() {
  return (
    <div
      className="w-full py-10 md:py-24 border-t border-slate-800"
      id="behind-the-scenes"
    >
      <div className="max-w-[1280px] mx-auto px-4 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">
          {/* Nội dung */}
          <Reveal className="flex flex-col gap-5 md:gap-6 order-1">
            <h2 className="text-primary font-bold tracking-widest uppercase text-xs md:text-sm bg-primary/5 px-3 py-1 rounded-full self-start">
              Hậu Trường
            </h2>
            <h3 className="text-slate-100 text-2xl md:text-5xl font-bold leading-tight">
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
                  className="flex flex-col gap-1 rounded-2xl border border-slate-800 bg-slate-800/50 p-3 md:p-5"
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
              <span className="material-symbols-outlined text-[20px] ml-1">
                arrow_forward
              </span>
            </Link>
          </Reveal>

          {/* Collage ảnh tác nghiệp */}
          <Reveal
            delay={0.15}
            className="order-2 grid grid-cols-2 md:grid-cols-3 auto-rows-[140px] md:auto-rows-[150px] gap-3 md:gap-4"
          >
            {SHOTS.map((shot, idx) => (
              <div
                key={idx}
                className={`group relative overflow-hidden rounded-2xl shadow-md ${shot.span}`}
              >
                <Image
                  src={shot.src}
                  alt={shot.caption}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  quality={80}
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />
                <p className="absolute bottom-0 left-0 right-0 p-3 md:p-4 text-white text-xs md:text-sm font-semibold translate-y-1 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  {shot.caption}
                </p>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </div>
  );
}
