'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { track } from '@vercel/analytics'
import { Icon } from '@/components/Icon'
import { useDialog } from '@/components/useDialog'
import { CONTACT } from '@/lib/contact'

const DEAL_TTL_HOURS = 48
const STORAGE_PREFIX = 'pb-haggle-v1:'
const PRICE_STEP = 100_000

// Studio nhả lại 40% khoảng cách giữa giá khách trả và giá niêm yết -> giá chốt
// luôn cao hơn mức khách ra và không bao giờ thủng sàn.
const CONCESSION = 0.4

// Vị trí tương đối của lời trả giá trong khoảng [sàn, niêm yết] quyết định
// studio phản ứng thế nào. Tính theo vị trí (không theo % giá) để mọi mức sàn
// đều có đủ 3 vùng.
const ZONE_ACCEPT = 0.8
const ZONE_COUNTER = 0.3

const roundToStep = (n) => Math.round(n / PRICE_STEP) * PRICE_STEP

function formatPrice(value, locale, suffix) {
  const nf = new Intl.NumberFormat(locale === 'en' ? 'en-US' : 'vi-VN')
  return `${nf.format(value)}${suffix}`
}

function fill(template, values) {
  return Object.entries(values).reduce(
    (out, [key, value]) => out.split(`{${key}}`).join(value),
    template
  )
}

/**
 * "Bấm để trả giá" — mặc cả có luật ngay trên bảng giá.
 *
 * Luật: sàn giảm giá phụ thuộc ngày chụp (ngày trống thì sàn sâu hơn), nên đây
 * là bán capacity trống chứ không phải phá giá. Khách tự kéo ra con số, studio
 * counter-offer lại, rồi mở Messenger với lời nhắn đã copy sẵn -> vào chat là
 * đã có số trên bàn thay vì "giá bao nhiêu ạ".
 */
export function HaggleButton({ t, locale, storageKey, packageName, basePrice, floors, gifts }) {
  const [open, setOpen] = useState(false)
  const [stage, setStage] = useState('slot')
  const [slot, setSlot] = useState(null)
  const [offer, setOffer] = useState(basePrice)
  const [deal, setDeal] = useState(null)
  const [copied, setCopied] = useState(null)
  const [mounted, setMounted] = useState(false)
  const timers = useRef([])

  // Card bọc ngoài là <Reveal>, mà Reveal đặt will-change: transform -> card trở
  // thành containing block cho position:fixed. Không portal ra body thì modal bị
  // nhốt trong card (đè lên viền, không phủ hết màn hình).
  useEffect(() => setMounted(true), [])

  const key = `${STORAGE_PREFIX}${storageKey}`

  const later = useCallback((fn, ms) => {
    const id = setTimeout(fn, ms)
    timers.current.push(id)
  }, [])

  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  // Deal đã chốt nằm ở localStorage -> đọc sau khi mount để không lệch hydration.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(key)
      if (!raw) return
      const saved = JSON.parse(raw)
      if (!saved?.expiresAt || saved.expiresAt < Date.now() || saved.base !== basePrice) {
        window.localStorage.removeItem(key)
        return
      }
      setDeal(saved)
    } catch {
      // localStorage bị chặn (private mode) -> coi như chưa có deal nào.
    }
  }, [key, basePrice])

  const closePanel = useCallback(() => setOpen(false), [])
  const dialogRef = useDialog(open, closePanel)

  const floorRatio = floors[slot?.id] ?? floors.unsure
  const floorPrice = roundToStep(basePrice * floorRatio)
  const atFloor = offer <= floorPrice

  const openPanel = () => {
    setOpen(true)
    setCopied(null)
    setStage(deal ? 'result' : 'slot')
    track('haggle_open', { pkg: storageKey, hasDeal: !!deal })
  }

  const chooseSlot = (option) => {
    setSlot(option)
    setOffer(basePrice)
    setStage('offer')
  }

  const submitOffer = () => {
    setStage('thinking')
    track('haggle_offer', {
      pkg: storageKey,
      slot: slot?.id ?? 'unsure',
      ratio: Math.round((offer / basePrice) * 100),
    })

    later(() => {
      const span = basePrice - floorPrice
      const position = span > 0 ? (offer - floorPrice) / span : 1
      const zone = position >= ZONE_ACCEPT ? 'accept' : position >= ZONE_COUNTER ? 'counter' : 'gift'
      const final = zone === 'accept' ? offer : roundToStep(offer + (basePrice - offer) * CONCESSION)

      const next = {
        zone,
        offer,
        final,
        base: basePrice,
        slot: slot?.id ?? 'unsure',
        slotLabel: slot?.label ?? '',
        // Bốc ngẫu nhiên cho có chút hên xui. Random nằm trong handler (client,
        // sau tương tác) nên không đụng tới SSR/hydration.
        gift: zone === 'gift' ? gifts[Math.floor(Math.random() * gifts.length)] : null,
        expiresAt: Date.now() + DEAL_TTL_HOURS * 3600 * 1000,
      }

      setDeal(next)
      setStage('result')
      try {
        window.localStorage.setItem(key, JSON.stringify(next))
      } catch {
        // Không lưu được thì deal chỉ sống trong phiên này, không sao.
      }
      track('haggle_deal', { pkg: storageKey, zone, final })
    }, 1100)
  }

  const restart = () => {
    setDeal(null)
    setSlot(null)
    setOffer(basePrice)
    setStage('slot')
    try {
      window.localStorage.removeItem(key)
    } catch {
      // ignore
    }
  }

  // Copy chạy đồng bộ trong gesture rồi để thẻ <a> tự mở tab — Messenger không
  // hỗ trợ điền sẵn nội dung nên khách dán vào là nhanh nhất.
  const handleChot = (channel) => {
    const message = fill(t.message, {
      package: packageName,
      offer: formatPrice(deal.offer, locale, t.currency),
      counter: formatPrice(deal.final, locale, t.currency),
      gift: deal.gift ? fill(t.messageGift, { gift: deal.gift }) : '',
      slot: deal.slotLabel,
    })
    // Clipboard API chỉ tồn tại trên HTTPS và có thể bị từ chối quyền. Trước đây
    // báo "đã copy" vô điều kiện -> khách dán ra rỗng, vào chat lại hỏi giá từ đầu,
    // mất sạch giá trị của việc trả giá. Giờ chỉ báo khi promise resolve thật.
    if (navigator.clipboard?.writeText) {
      navigator.clipboard
        .writeText(message)
        .then(() => {
          setCopied(true)
          later(() => setCopied(null), 4000)
        })
        .catch(() => setCopied(false))
    } else {
      setCopied(false)
    }
    track('haggle_close', { pkg: storageKey, channel, final: deal.final })
  }

  const hoursLeft = deal ? Math.max(1, Math.ceil((deal.expiresAt - Date.now()) / 3600000)) : 0
  const resultCopy = deal ? t.result[deal.zone] : null

  return (
    <>
      <button
        type="button"
        onClick={openPanel}
        className="group w-full flex items-center justify-center gap-2 text-sm font-semibold text-text-secondary hover:text-primary transition-colors py-1"
      >
        <Icon name="handshake" className="text-[18px] transition-transform group-hover:-rotate-6" />
        {deal
          ? fill(t.dealBadge, { price: formatPrice(deal.final, locale, t.currency) })
          : t.trigger}
        <span className="text-xs font-normal text-text-muted group-hover:text-primary/70">
          {deal ? fill(t.expiresIn, { hours: hoursLeft }) : t.triggerHint}
        </span>
      </button>

      {open && mounted && createPortal(
        <div
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm p-0 sm:p-6"
          onClick={closePanel}
          role="dialog"
          aria-modal="true"
          aria-label={t.trigger}
        >
          <div
            ref={dialogRef}
            tabIndex={-1}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full sm:max-w-md max-h-[92vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl border border-border bg-background p-6 sm:p-8 shadow-2xl"
          >
            <button
              type="button"
              onClick={closePanel}
              aria-label={t.close}
              className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full text-text-secondary hover:bg-surface-raised hover:text-text-main transition"
            >
              <Icon name="close" className="text-[20px]" />
            </button>

            <p className="text-xs font-bold uppercase tracking-wider text-primary mb-1">
              {packageName}
            </p>

            {stage === 'slot' && (
              <>
                <h3 className="text-xl font-extrabold text-text-main mb-2">{t.slot.title}</h3>
                <p className="text-sm text-text-secondary mb-6">{t.slot.subtitle}</p>
                <div className="flex flex-col gap-3">
                  {t.slot.options.map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => chooseSlot(option)}
                      className="flex items-center justify-between gap-3 rounded-xl border border-border bg-surface/50 px-4 py-3.5 text-left transition hover:border-primary hover:bg-surface"
                    >
                      <span>
                        <span className="block text-sm font-bold text-text-main">{option.label}</span>
                        <span className="block text-xs text-text-secondary mt-0.5">{option.note}</span>
                      </span>
                      <Icon name="chevron_right" className="text-[20px] text-text-muted shrink-0" />
                    </button>
                  ))}
                </div>
              </>
            )}

            {stage === 'offer' && (
              <>
                <h3 className="text-xl font-extrabold text-text-main mb-2">{t.offer.title}</h3>
                <p className="text-sm text-text-secondary mb-6">{t.offer.hint}</p>

                <div className="flex items-baseline justify-between mb-2">
                  <span className="text-xs uppercase tracking-wide text-text-muted">
                    {t.offer.yourOffer}
                  </span>
                  <span className="text-xs text-text-muted line-through tabular-nums">
                    {formatPrice(basePrice, locale, t.currency)}
                  </span>
                </div>
                <p className="text-4xl font-extrabold tabular-nums tracking-tighter text-primary mb-4">
                  {formatPrice(offer, locale, t.currency)}
                </p>

                <input
                  type="range"
                  min={floorPrice}
                  max={basePrice}
                  step={PRICE_STEP}
                  value={offer}
                  onChange={(e) => setOffer(Number(e.target.value))}
                  aria-label={t.offer.yourOffer}
                  className="w-full accent-primary cursor-pointer"
                />
                <p
                  className={`text-xs mt-3 min-h-[1.5rem] transition-colors ${
                    atFloor ? 'text-primary font-semibold' : 'text-text-muted'
                  }`}
                >
                  {atFloor ? t.offer.floorReached : t.offer.dragMore}
                </p>

                <button
                  type="button"
                  onClick={submitOffer}
                  disabled={offer >= basePrice}
                  className="w-full mt-4 flex items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-base font-bold text-on-primary transition hover:bg-primary-dark hover:shadow-xl hover:shadow-primary/30 disabled:bg-surface-raised disabled:text-text-muted disabled:shadow-none"
                >
                  <Icon name="local_offer" className="text-[18px]" />
                  {t.offer.submit}
                </button>
                <button
                  type="button"
                  onClick={() => setStage('slot')}
                  className="w-full mt-3 flex items-center justify-center gap-1.5 text-sm font-medium text-text-muted hover:text-text-main transition"
                >
                  <Icon name="arrow_back" className="text-[16px]" />
                  {t.offer.back}
                </button>
              </>
            )}

            {stage === 'thinking' && (
              <div className="flex flex-col items-center justify-center gap-4 py-14">
                <span className="flex gap-1.5">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="h-2.5 w-2.5 rounded-full bg-primary animate-bounce"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </span>
                <p className="text-sm font-medium text-text-secondary">{t.thinking}</p>
              </div>
            )}

            {stage === 'result' && deal && (
              <>
                <h3 className="text-xl font-extrabold text-text-main mb-2">{resultCopy.title}</h3>
                <p className="text-sm text-text-secondary mb-5">{resultCopy.body}</p>

                <div className="rounded-2xl border border-primary/40 bg-primary/5 p-5 text-center">
                  <p className="text-xs uppercase tracking-wide text-text-secondary mb-1">
                    {t.result.finalLabel}
                  </p>
                  <p className="text-4xl font-extrabold tabular-nums tracking-tighter text-primary">
                    {formatPrice(deal.final, locale, t.currency)}
                  </p>
                  {deal.final < deal.base && (
                    <p className="mt-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                      {fill(t.result.saved, {
                        amount: formatPrice(deal.base - deal.final, locale, t.currency),
                      })}
                    </p>
                  )}
                  {deal.gift && (
                    <p className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-surface/70 px-3 py-2.5 text-sm font-semibold text-text-main">
                      <Icon name="redeem" className="text-[18px] text-primary shrink-0" />
                      {deal.gift}
                    </p>
                  )}
                </div>

                <p className="mt-4 flex items-start gap-1.5 text-xs text-text-muted">
                  <Icon name="bolt" className="text-[14px] text-primary shrink-0 mt-0.5" />
                  {fill(t.result.validNote, { hours: hoursLeft })}
                </p>

                <a
                  href={`${CONTACT.messenger}?ref=haggle-${storageKey}-${deal.final}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleChot('messenger')}
                  className="w-full mt-5 flex items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-base font-bold text-on-primary transition hover:bg-primary-dark hover:shadow-xl hover:shadow-primary/30"
                >
                  <Icon name="mdi:facebook" className="text-[18px]" />
                  {t.result.cta}
                </a>
                <a
                  href={CONTACT.zalo}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleChot('zalo')}
                  className="w-full mt-2.5 flex items-center justify-center gap-2 rounded-xl border border-border bg-surface/60 py-3 text-sm font-bold text-text-main transition hover:border-primary hover:text-text-main"
                >
                  <Icon name="zalo" className="text-[18px]" />
                  {t.result.ctaZalo}
                </a>
                {copied === true && (
                  <p className="mt-3 text-center text-xs font-medium text-emerald-700 dark:text-emerald-400">
                    {t.result.copied}
                  </p>
                )}
                {copied === false && (
                  <p className="mt-3 text-center text-xs font-medium text-amber-700 dark:text-amber-400">
                    {fill(t.result.copyFailed, {
                      price: formatPrice(deal.final, locale, t.currency),
                    })}
                  </p>
                )}
                <button
                  type="button"
                  onClick={restart}
                  className="w-full mt-3 text-sm font-medium text-text-muted hover:text-text-main transition"
                >
                  {t.result.retry}
                </button>
              </>
            )}
          </div>
        </div>,
        document.body
      )}
    </>
  )
}
