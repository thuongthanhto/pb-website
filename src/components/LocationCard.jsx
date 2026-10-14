import Link from 'next/link'
import Image from 'next/image'
import { localePath } from '@/i18n/config'

const publicDomain =
  process.env.NEXT_PUBLIC_R2_DOMAIN ||
  'https://pub-4e35e8513e3c44399e73dd02c4b4447d.r2.dev'

/**
 * Lưới thẻ địa điểm dùng chung cho /dia-diem và mục "Địa điểm khác".
 * Dùng flex-wrap + justify-center thay vì grid: hàng cuối thiếu thẻ (vd 5 thẻ
 * trên lưới 3 cột) sẽ nằm giữa thay vì dồn trái để lại 1/3–2/3 hàng trống.
 * Mobile 2 thẻ/hàng, lg 3 thẻ/hàng.
 */
export function LocationCardGrid({ children }) {
  return (
    <div className="flex flex-wrap justify-center gap-3 sm:gap-6 [&>*]:w-[calc((100%-0.75rem)/2)] sm:[&>*]:w-[calc((100%-1.5rem)/2)] lg:[&>*]:w-[calc((100%-3rem)/3)]">
      {children}
    </div>
  )
}

/**
 * Thẻ một địa điểm (ảnh bìa + tên + số ảnh), dùng ở trang /dia-diem và mục
 * "Địa điểm khác" cuối trang /dia-diem/<slug>.
 * `countLabel` là chuỗi đã dịch sẵn, vd "12 ảnh".
 * `cityLabel` (tuỳ chọn) hiện tên thành phố nhỏ phía trên tên địa điểm.
 * `headingLevel` để giữ thứ tự heading đúng theo trang dùng thẻ (h2 / h3).
 * `priority` cho vài thẻ đầu khi lưới nằm ngay màn hình đầu (trang /dia-diem).
 */
export function LocationCard({
  slug,
  location,
  cover,
  locale,
  countLabel,
  cityLabel,
  headingLevel = 3,
  priority = false,
}) {
  const Heading = headingLevel === 2 ? 'h2' : 'h3'

  return (
    <Link
      href={localePath(locale, `/dia-diem/${slug}`)}
      className="group flex flex-col overflow-hidden rounded-xl sm:rounded-2xl bg-surface border border-border hover:border-primary/40 shadow-sm hover:shadow-xl transition-all"
    >
      <div className="relative aspect-[4/5] sm:aspect-[4/3] overflow-hidden bg-surface-raised">
        {cover && (
          // Ảnh bìa qua next/image (bản thu nhỏ). `sizes` khớp LocationCardGrid:
          // 2 thẻ/hàng tới lg, 3 thẻ/hàng từ lg, container tối đa 1280px.
          <Image
            src={`${publicDomain}/${cover.key}`}
            alt={location.name[locale]}
            fill
            sizes="(max-width: 1023px) 50vw, (max-width: 1279px) 33vw, 384px"
            quality={75}
            priority={priority}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
      </div>
      <div className="p-3 sm:p-4">
        {cityLabel && (
          <p className="mb-0.5 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-primary">
            {cityLabel}
          </p>
        )}
        <Heading className="text-sm sm:text-base font-bold leading-snug text-text-main group-hover:text-primary transition-colors">
          {location.name[locale]}
        </Heading>
        <p className="text-xs sm:text-sm text-text-muted">{countLabel}</p>
      </div>
    </Link>
  )
}
