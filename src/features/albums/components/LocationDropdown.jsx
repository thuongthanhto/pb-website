'use client';

import { useEffect, useId, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { Icon } from '@/components/Icon';
import { useOverlayFlag } from '@/components/useOverlayFlag';
import { useI18n } from '@/i18n/I18nProvider';
import { CITIES, LOCATIONS, getLocationName, getLocationSlugsInUse } from '@/data/locations';

const ALL = 'all';
// Danh sách ngắn thì lướt là thấy, chỉ hiện ô tìm khi địa điểm đủ nhiều.
const SEARCH_THRESHOLD = 8;

// Bỏ dấu để gõ "da lat" vẫn ra "Đà Lạt".
const fold = (text) => text.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/gi, 'd').toLowerCase();

/**
 * Bộ lọc địa điểm dạng dropdown: một nút duy nhất, mở ra danh sách nhóm theo
 * thành phố kèm số ảnh. Khác hàng pill của album, số địa điểm có thể lên tới
 * vài chục nên không xếp thành tab được.
 *
 * A11y: dùng mẫu disclosure (nút + aria-expanded/aria-controls, lựa chọn là
 * button thường có aria-pressed) thay vì listbox — listbox đòi điều hướng
 * bằng phím mũi tên mà ô tìm kiếm + link trong panel không hợp.
 */
export function LocationDropdown({ images = [], active = ALL, onChange }) {
  const { dict, locale, path } = useI18n();
  const t = dict.albums.filters;
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const rootRef = useRef(null);
  const searchRef = useRef(null);
  const triggerRef = useRef(null);
  const panelRef = useRef(null);
  const panelId = useId();

  // Dropdown mở thì ẩn nút nổi Zalo / Đặt lịch để không che panel.
  useOverlayFlag(open);

  const slugs = useMemo(() => getLocationSlugsInUse(images), [images]);

  const counts = useMemo(() => {
    const map = {};
    for (const img of images) {
      if (img.locationSlug) map[img.locationSlug] = (map[img.locationSlug] || 0) + 1;
    }
    return map;
  }, [images]);

  const groups = useMemo(() => {
    const q = fold(query.trim());
    const matched = slugs.filter(
      (slug) =>
        !q ||
        fold(LOCATIONS[slug].name.vi).includes(q) ||
        fold(LOCATIONS[slug].name.en).includes(q),
    );
    return Object.keys(CITIES)
      .map((city) => ({
        city,
        slugs: matched.filter((slug) => LOCATIONS[slug].city === city),
      }))
      .filter((group) => group.slugs.length > 0);
  }, [slugs, query]);

  // Đóng khi click ra ngoài hoặc bấm Esc.
  useEffect(() => {
    if (!open) return;
    const onPointer = (e) => {
      if (!rootRef.current?.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener('pointerdown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  // Mở ra thì đưa focus vào panel (ô tìm nếu có, không thì lựa chọn đầu tiên).
  useEffect(() => {
    if (open) (searchRef.current ?? panelRef.current?.querySelector('button'))?.focus();
    else setQuery('');
  }, [open]);

  if (slugs.length === 0) return null;

  const current = Object.hasOwn(LOCATIONS, active) ? active : ALL;
  const select = (slug) => {
    onChange(slug);
    setOpen(false);
    triggerRef.current?.focus();
  };

  const optionClass = (selected) =>
    `flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
      selected
        ? 'bg-primary/10 text-primary font-bold'
        : 'text-text-secondary hover:bg-surface-raised hover:text-text-main font-semibold'
    }`;

  return (
    <div ref={rootRef} className="relative flex justify-center pt-2">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        className={`flex h-10 items-center gap-2 rounded-full px-5 transition-all whitespace-nowrap ${
          current !== ALL
            ? 'bg-primary text-on-primary font-bold hover:shadow-lg hover:shadow-primary/30'
            : 'bg-surface border border-border hover:border-primary/40 hover:bg-surface-raised text-text-secondary hover:text-text-main font-semibold'
        }`}
      >
        <Icon name="place" className="text-[18px]" />
        <span>
          {t.locationButton}: {current === ALL ? t.allLocations : getLocationName(current, locale)}
        </span>
        <Icon
          name="expand_more"
          className={`text-[20px] transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div
          ref={panelRef}
          id={panelId}
          role="region"
          aria-label={t.locationsLabel}
          className="absolute top-full z-50 mt-2 w-[min(340px,calc(100vw-32px))] rounded-2xl border border-border bg-surface p-2 shadow-xl"
        >
          {slugs.length > SEARCH_THRESHOLD && (
            <div className="relative mb-2">
              <Icon
                name="search"
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-text-muted"
              />
              <input
                ref={searchRef}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t.searchLocations}
                className="h-10 w-full rounded-lg border border-border bg-surface-sunken pl-9 pr-3 text-sm text-text-main placeholder:text-text-muted focus:border-primary/60 focus:outline-none"
              />
            </div>
          )}

          <div className="max-h-[min(60vh,420px)] overflow-y-auto">
            {!query && (
              <button
                type="button"
                aria-pressed={current === ALL}
                onClick={() => select(ALL)}
                className={optionClass(current === ALL)}
              >
                <span className="flex-1">{t.allLocations}</span>
                {current === ALL && <Icon name="check" className="text-[18px]" />}
              </button>
            )}

            {groups.map(({ city, slugs: citySlugs }) => (
              // Mỗi thành phố là một khối: kẻ ngang ngăn cách các khối, địa điểm
              // con thụt vào trong và có đường kẻ dọc bên trái để thấy rõ nhóm.
              <div
                key={city}
                role="group"
                aria-label={CITIES[city][locale]}
                className="mt-2 border-t border-border pt-2"
              >
                <p className="flex items-center gap-1.5 px-3 pb-1.5 pt-1 text-xs font-bold uppercase tracking-wider text-text-muted">
                  <Icon name="place" className="text-[14px]" />
                  {CITIES[city][locale]}
                </p>
                <div className="ml-[18px] flex flex-col gap-0.5 border-l-2 border-border pl-2">
                  {citySlugs.map((slug) => (
                    <button
                      key={slug}
                      type="button"
                      aria-pressed={current === slug}
                      onClick={() => select(slug)}
                      className={optionClass(current === slug)}
                    >
                      <span className="flex-1">{getLocationName(slug, locale)}</span>
                      <span className="text-xs tabular-nums text-text-muted">{counts[slug]}</span>
                      {current === slug && <Icon name="check" className="text-[18px]" />}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            {groups.length === 0 && (
              <p className="px-3 py-4 text-center text-sm text-text-muted">{t.noLocationMatch}</p>
            )}
          </div>

          {/* Lối sang trang tổng hợp địa điểm (có mô tả, bản đồ từng nơi). */}
          <div className="mt-2 border-t border-border pt-2">
            <Link
              href={path('/dia-diem')}
              className="flex w-full items-center justify-center rounded-lg px-3 py-2 text-sm font-semibold text-primary hover:bg-surface-raised transition-colors"
            >
              {t.viewAllLocations}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
