'use client'

// Hiệu ứng nền: các đốm sáng (bokeh) mờ trôi nhẹ nhàng, lung linh.
// Đặt fixed phía sau toàn bộ nội dung, không nhận tương tác chuột.
// Các đốm được khai báo tĩnh để tránh lệch hydrate giữa server và client.

const DOTS = [
  { size: 220, left: '8%', top: '12%', color: 'var(--primary)', opacity: 0.18, duration: 26, delay: 0 },
  { size: 140, left: '78%', top: '8%', color: '#ffd6d6', opacity: 0.14, duration: 32, delay: 3 },
  { size: 300, left: '60%', top: '55%', color: 'var(--primary)', opacity: 0.12, duration: 38, delay: 1 },
  { size: 90, left: '22%', top: '70%', color: '#ffffff', opacity: 0.1, duration: 22, delay: 5 },
  { size: 180, left: '40%', top: '30%', color: '#ff9aa2', opacity: 0.13, duration: 30, delay: 2 },
  { size: 120, left: '90%', top: '60%', color: 'var(--primary)', opacity: 0.15, duration: 28, delay: 6 },
  { size: 70, left: '12%', top: '45%', color: '#ffffff', opacity: 0.12, duration: 20, delay: 4 },
  { size: 160, left: '50%', top: '85%', color: '#ffd6d6', opacity: 0.12, duration: 34, delay: 1.5 },
  { size: 100, left: '70%', top: '32%', color: '#ffffff', opacity: 0.1, duration: 24, delay: 7 },
  { size: 240, left: '30%', top: '5%', color: '#ff9aa2', opacity: 0.1, duration: 36, delay: 2.5 },
  { size: 80, left: '85%', top: '88%', color: 'var(--primary)', opacity: 0.14, duration: 21, delay: 3.5 },
  { size: 130, left: '5%', top: '85%', color: '#ffffff', opacity: 0.1, duration: 29, delay: 5.5 },
]

export default function BokehBackground() {
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
            background: `radial-gradient(circle, ${d.color} 0%, transparent 70%)`,
            opacity: d.opacity,
            animationDuration: `${d.duration}s`,
            animationDelay: `${d.delay}s`,
          }}
        />
      ))}
    </div>
  )
}
