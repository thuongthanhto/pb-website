'use client';

import { motion } from 'framer-motion';

/**
 * Reveal — fade + trượt nhẹ khi cuộn tới (chỉ chạy 1 lần).
 * Dùng bọc bất kỳ section/element nào cần xuất hiện mượt khi vào viewport.
 *
 * Props:
 *  - as: tag/element render ('div' mặc định)
 *  - delay: trễ (giây) để tạo hiệu ứng lần lượt
 *  - y: khoảng trượt lên (px), mặc định 24
 *  - duration: thời lượng (giây)
 *  - once: chỉ chạy 1 lần (mặc định true)
 */
export function Reveal({
  children,
  as = 'div',
  delay = 0,
  y = 24,
  duration = 0.6,
  once = true,
  className,
  ...props
}) {
  const MotionTag = motion[as] ?? motion.div;

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.2 }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    >
      {children}
    </MotionTag>
  );
}
