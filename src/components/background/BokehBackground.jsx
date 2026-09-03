'use client'

// Hiệu ứng nền: các đốm sáng (bokeh) mờ trôi nhẹ nhàng, lung linh.
// Đặt fixed phía sau toàn bộ nội dung, không nhận tương tác chuột.
// Các đốm được khai báo tĩnh để tránh lệch hydrate giữa server và client.

import { useTheme } from '@/components/ThemeProvider'

// Mỗi đốm chỉ khai báo "tông" (tone), màu thật lấy từ TONES theo theme.
// 4 tông: primary (coral thương hiệu), blush (hồng nhạt), rose (hồng đậm),
// glow (điểm sáng trung tính).
const DOTS = [
  { size: 220, left: '8%', top: '12%', tone: 'primary', opacity: 0.18, duration: 26, delay: 0 },
  { size: 140, left: '78%', top: '8%', tone: 'blush', opacity: 0.14, duration: 32, delay: 3 },
  { size: 300, left: '60%', top: '55%', tone: 'primary', opacity: 0.12, duration: 38, delay: 1 },
  { size: 90, left: '22%', top: '70%', tone: 'glow', opacity: 0.1, duration: 22, delay: 5 },
  { size: 180, left: '40%', top: '30%', tone: 'rose', opacity: 0.13, duration: 30, delay: 2 },
  { size: 120, left: '90%', top: '60%', tone: 'primary', opacity: 0.15, duration: 28, delay: 6 },
  { size: 70, left: '12%', top: '45%', tone: 'glow', opacity: 0.12, duration: 20, delay: 4 },
  { size: 160, left: '50%', top: '85%', tone: 'blush', opacity: 0.12, duration: 34, delay: 1.5 },
  { size: 100, left: '70%', top: '32%', tone: 'glow', opacity: 0.1, duration: 24, delay: 7 },
  { size: 240, left: '30%', top: '5%', tone: 'rose', opacity: 0.1, duration: 36, delay: 2.5 },
  { size: 80, left: '85%', top: '88%', tone: 'primary', opacity: 0.14, duration: 21, delay: 3.5 },
  { size: 130, left: '5%', top: '85%', tone: 'glow', opacity: 0.1, duration: 29, delay: 5.5 },
]

// Đốm bokeh là màu "ánh sáng", không phải màu chrome UI, nên không có token
// tương ứng trong globals.css -> chọn palette theo theme bằng useTheme().
//
// dark: giữ y nguyên bộ màu cũ (trắng/hồng nhạt sáng lên trên nền tối).
// light: nền là #faf7f5, đốm trắng/hồng nhạt sẽ tàng hình hoặc làm nền đục,
//        nên đổi hết sang sắc coral/cam ấm đậm hơn — thấy được mà vẫn sạch.
const TONES = {
  dark: {
    primary: 'var(--primary)', // #ff6b6b
    blush: '#ffd6d6',
    rose: '#ff9aa2',
    glow: '#ffffff',
  },
  light: {
    primary: 'var(--primary)', // #d64545
    blush: '#f0a08c',
    rose: '#e2705f',
    glow: '#ffb38f', // thay điểm sáng trắng bằng nắng ấm
  },
}

// Ở theme sáng, cùng độ mờ sẽ làm nền bị đục/bẩn -> hạ xuống còn ~55%.
// Theme tối giữ nguyên hệ số 1 để không đổi cảm giác thị giác hiện tại.
const OPACITY_SCALE = { dark: 1, light: 0.55 }

export default function BokehBackground() {
  const { isDark } = useTheme()
  const key = isDark ? 'dark' : 'light'
  const tones = TONES[key]
  const opacityScale = OPACITY_SCALE[key]

  return (
    <div
      aria-hidden="true"
      className="bokeh-bg pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {DOTS.map((d, i) => (
        <span
          key={i}
          className="bokeh-dot"
          style={{
            width: d.size,
            height: d.size,
            left: d.left,
            top: d.top,
            background: `radial-gradient(circle, ${tones[d.tone]} 0%, transparent 70%)`,
            opacity: d.opacity * opacityScale,
            animationDuration: `${d.duration}s`,
            animationDelay: `${d.delay}s`,
          }}
        />
      ))}
    </div>
  )
}
