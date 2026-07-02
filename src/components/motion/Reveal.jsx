'use client';

import { useRef, useEffect, useState, createElement } from 'react';

/**
 * Reveal — fade + trượt nhẹ khi cuộn tới (chỉ chạy 1 lần).
 * Trước đây dùng framer-motion; nay dùng IntersectionObserver + CSS transition
 * để bỏ hẳn dependency framer-motion (giảm ~mấy chục KB JS mỗi trang).
 *
 * Props giữ nguyên API cũ: as, delay, y, duration, once, className.
 */
export function Reveal({
  children,
  as = 'div',
  delay = 0,
  y = 24,
  duration = 0.6,
  once = true,
  className,
  style,
  ...props
}) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          if (once) io.disconnect();
        } else if (!once) {
          setShown(false);
        }
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once]);

  return createElement(
    as,
    {
      ref,
      className,
      style: {
        ...style,
        opacity: shown ? 1 : 0,
        transform: shown ? 'none' : `translateY(${y}px)`,
        transition: `opacity ${duration}s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform ${duration}s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
        willChange: 'opacity, transform',
      },
      ...props,
    },
    children
  );
}
