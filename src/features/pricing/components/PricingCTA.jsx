export function PricingCTA() {
  return (
    <section className="w-full px-4 lg:px-40 py-20 flex justify-center bg-slate-900 border-t border-slate-800">
      <div className="w-full max-w-[800px] text-center flex flex-col items-center gap-6">
        <h2 className="text-3xl lg:text-4xl font-extrabold text-text-main">Vẫn chưa tìm thấy gói phù hợp?</h2>
        <p className="text-text-secondary text-lg font-medium max-w-2xl">
          Chúng tôi luôn sẵn sàng lắng nghe và thiết kế gói chụp riêng theo nhu cầu và ngân sách của bạn.
        </p>
        <button className="mt-4 flex min-w-[200px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-14 px-10 bg-primary text-white text-base font-bold leading-normal tracking-wide shadow-xl shadow-primary/20 hover:bg-primary-dark hover:scale-105 transition-all">
          <span className="truncate">Liên hệ tư vấn riêng</span>
        </button>
      </div>
    </section>
  )
}
