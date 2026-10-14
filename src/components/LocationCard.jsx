import Link from 'next/link'
import { localePath } from '@/i18n/config'

const publicDomain =
  process.env.NEXT_PUBLIC_R2_DOMAIN ||
  'https://pub-4e35e8513e3c44399e73dd02c4b4447d.r2.dev'

/**
 * Thẻ một địa điểm (ảnh bìa + tên + số ảnh), dùng ở trang /dia-diem và mục
 * "Địa điểm khác" cuối trang /dia-diem/<slug>.
 * `countLabel` là chuỗi đã dịch sẵn, vd "12 ảnh".
 */
export function LocationCard({ slug, location, cover, locale, countLabel }) {
  return (
    <Link
      href={localePath(locale, `/dia-diem/${slug}`)}
      className="group overflow-hidden rounded-2xl bg-surface border border-border hover:border-primary/40 shadow-sm hover:shadow-xl transition-all"
    >
      <div className="aspect-[4/3] overflow-hidden bg-surface-raised">
        {cover && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={`${publicDomain}/${cover.key}`}
            alt={location.name[locale]}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
      </div>
      <div className="p-4">
        <h3 className="font-bold text-text-main group-hover:text-primary transition-colors">
          {location.name[locale]}
        </h3>
        <p className="text-sm text-text-muted">{countLabel}</p>
      </div>
    </Link>
  )
}
