export function ComparisonTable() {
  return (
    <>
      <section className="w-full pt-10 pb-4 flex justify-center">
        <div className="w-full max-w-[1280px] px-4 md:px-10 text-center">
          <h2 className="text-text-main text-2xl lg:text-3xl font-bold leading-tight">
            So sánh chi tiết các gói Pre-Wedding
          </h2>
          <p className="text-text-secondary mt-2 text-sm lg:text-base">
            Thông tin kỹ thuật chi tiết giữa 2 gói chụp ảnh cưới phổ biến nhất
          </p>
        </div>
      </section>
      <section className="w-full pb-16 flex justify-center">
        <div className="w-full max-w-[1280px] px-4 md:px-10">
          <div className="w-full overflow-x-auto rounded-2xl border border-border-light bg-stone-800 shadow-lg">
            <table className="w-full min-w-[800px] text-left border-collapse">
              <thead>
                <tr className="bg-stone-900 border-b border-border-light">
                  <th className="p-6 text-base font-bold text-text-main w-1/3">Tính năng</th>
                  <th className="p-6 text-base font-bold text-text-secondary w-1/3">Pre-Wedding Studio</th>
                  <th className="p-6 text-base font-bold text-primary w-1/3 bg-primary/10">
                    Pre-Wedding Studio &amp; Street
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-light">
                <tr className="hover:bg-stone-700/30 transition-colors">
                  <td className="p-5 px-6 text-text-main font-medium text-sm">Trang phục</td>
                  <td className="p-5 px-6 text-text-secondary text-sm">2 váy chụp Luxury, 2 Vest</td>
                  <td className="p-5 px-6 text-text-main font-bold text-sm bg-primary/10">
                    2 váy chụp Luxury, 2 Vest
                  </td>
                </tr>
                <tr className="hover:bg-stone-700/30 transition-colors">
                  <td className="p-5 px-6 text-text-main font-medium text-sm">Địa điểm chụp</td>
                  <td className="p-5 px-6 text-text-secondary text-sm">Studio (Indoor)</td>
                  <td className="p-5 px-6 text-text-main font-bold text-sm bg-primary/10">
                    Studio + Streetstyle Sài Gòn
                  </td>
                </tr>
                <tr className="hover:bg-stone-700/30 transition-colors">
                  <td className="p-5 px-6 text-text-main font-medium text-sm">Số lượng Layouts</td>
                  <td className="p-5 px-6 text-text-secondary text-sm">2 Layouts</td>
                  <td className="p-5 px-6 text-text-main font-bold text-sm bg-primary/10">
                    3 Layouts (Indoor &amp; Outdoor)
                  </td>
                </tr>
                <tr className="hover:bg-stone-700/30 transition-colors">
                  <td className="p-5 px-6 text-text-main font-medium text-sm">Số lượng ảnh Retouch</td>
                  <td className="p-5 px-6 text-text-secondary text-sm">30 ảnh</td>
                  <td className="p-5 px-6 text-text-main font-bold text-sm bg-primary/10">35 ảnh</td>
                </tr>
                <tr className="hover:bg-stone-700/30 transition-colors">
                  <td className="p-5 px-6 text-text-main font-medium text-sm">Album Photobook</td>
                  <td className="p-5 px-6 text-text-secondary text-sm">Size 30x30 (30 trang)</td>
                  <td className="p-5 px-6 text-text-main font-bold text-sm bg-primary/10">Size 30x30 (30 trang)</td>
                </tr>
                <tr className="hover:bg-stone-700/30 transition-colors">
                  <td className="p-5 px-6 text-text-main font-medium text-sm">Ảnh phóng lớn</td>
                  <td className="p-5 px-6 text-text-secondary text-sm">2 ảnh 60x90</td>
                  <td className="p-5 px-6 text-text-main font-bold text-sm bg-primary/10">2 ảnh 60x90</td>
                </tr>
                <tr className="hover:bg-stone-700/30 transition-colors">
                  <td className="p-5 px-6 text-text-main font-medium text-sm">Dịch vụ đi kèm</td>
                  <td className="p-5 px-6 text-text-secondary text-sm">Hoa tươi, Makeup &amp; Hair, Slide chiếu</td>
                  <td className="p-5 px-6 text-text-main font-bold text-sm bg-primary/10">
                    Hoa tươi, Makeup &amp; Hair, Slide chiếu
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  )
}
