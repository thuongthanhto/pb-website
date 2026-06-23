'use client'

// Hiệu ứng rơi: tuyết (snow) hoặc hoa anh đào (petals) rơi nhẹ nhàng từ trên xuống.
// Phủ toàn màn hình, cố định, không nhận tương tác chuột.
// Các hạt khai báo tĩnh (seed cố định) để tránh lệch hydrate server/client.
//
// Mỗi hạt gồm 3 lớp lồng nhau, mỗi lớp một chu kỳ riêng (lệch nhau) nên
// đường bay không lặp đồng bộ -> trông ngẫu nhiên:
//   .falling-col  -> rơi dọc (translateY), thời lượng = fall
//   .falling-sway -> dạt ngang qua lại (translateX), thời lượng = swayDur (độc lập)
//   .leaf (svg)   -> xoay/lật, thời lượng = spin

const SEEDS = [
  { left: 4, size: 22, fall: 11, delay: 0, opacity: 0.9, sway: 40, swayDur: 4.3, spin: 9 },
  { left: 11, size: 14, fall: 14, delay: 2.4, opacity: 0.7, sway: 55, swayDur: 6.1, spin: 12 },
  { left: 17, size: 28, fall: 9, delay: 1.1, opacity: 0.85, sway: 32, swayDur: 3.7, spin: 7 },
  { left: 23, size: 17, fall: 13, delay: 4.2, opacity: 0.6, sway: 48, swayDur: 5.3, spin: 11 },
  { left: 29, size: 25, fall: 10, delay: 0.7, opacity: 0.95, sway: 38, swayDur: 4.9, spin: 8 },
  { left: 34, size: 13, fall: 15, delay: 3.3, opacity: 0.55, sway: 60, swayDur: 6.7, spin: 13 },
  { left: 40, size: 20, fall: 12, delay: 1.8, opacity: 0.8, sway: 44, swayDur: 3.4, spin: 10 },
  { left: 46, size: 29, fall: 8, delay: 5.1, opacity: 0.9, sway: 30, swayDur: 5.8, spin: 6 },
  { left: 51, size: 15, fall: 14, delay: 2.1, opacity: 0.65, sway: 58, swayDur: 4.1, spin: 12 },
  { left: 57, size: 24, fall: 11, delay: 0.4, opacity: 0.85, sway: 42, swayDur: 6.3, spin: 9 },
  { left: 63, size: 14, fall: 16, delay: 3.8, opacity: 0.6, sway: 36, swayDur: 3.9, spin: 14 },
  { left: 68, size: 27, fall: 9, delay: 1.5, opacity: 0.92, sway: 50, swayDur: 5.1, spin: 7 },
  { left: 74, size: 18, fall: 13, delay: 4.7, opacity: 0.7, sway: 46, swayDur: 4.6, spin: 11 },
  { left: 80, size: 22, fall: 10, delay: 0.9, opacity: 0.88, sway: 40, swayDur: 6.5, spin: 8 },
  { left: 85, size: 13, fall: 15, delay: 2.7, opacity: 0.5, sway: 56, swayDur: 3.6, spin: 13 },
  { left: 91, size: 25, fall: 12, delay: 1.3, opacity: 0.9, sway: 34, swayDur: 5.6, spin: 9 },
  { left: 96, size: 16, fall: 14, delay: 3.1, opacity: 0.68, sway: 52, swayDur: 4.4, spin: 12 },
  { left: 7, size: 20, fall: 12, delay: 5.6, opacity: 0.78, sway: 48, swayDur: 6.9, spin: 10 },
  { left: 20, size: 15, fall: 15, delay: 2.9, opacity: 0.62, sway: 54, swayDur: 3.8, spin: 13 },
  { left: 37, size: 28, fall: 9, delay: 0.2, opacity: 0.95, sway: 32, swayDur: 5.4, spin: 6 },
  { left: 54, size: 14, fall: 16, delay: 4.4, opacity: 0.58, sway: 42, swayDur: 4.7, spin: 14 },
  { left: 71, size: 24, fall: 11, delay: 1.0, opacity: 0.86, sway: 50, swayDur: 6.2, spin: 8 },
  { left: 88, size: 18, fall: 13, delay: 3.6, opacity: 0.72, sway: 46, swayDur: 3.5, spin: 11 },
  { left: 14, size: 27, fall: 10, delay: 2.2, opacity: 0.9, sway: 38, swayDur: 5.9, spin: 7 },
  { left: 44, size: 13, fall: 15, delay: 0.6, opacity: 0.52, sway: 58, swayDur: 4.2, spin: 13 },
  { left: 61, size: 22, fall: 12, delay: 4.9, opacity: 0.82, sway: 44, swayDur: 6.6, spin: 9 },
  { left: 78, size: 15, fall: 14, delay: 1.7, opacity: 0.66, sway: 52, swayDur: 3.3, spin: 12 },
  { left: 99, size: 25, fall: 9, delay: 3.4, opacity: 0.88, sway: 36, swayDur: 5.7, spin: 8 },
]

// Bảng màu hoa (hồng/đào, hợp tông primary của studio).
const FLOWER_COLORS = ['#ffb3c1', '#ff8fab', '#ffd6dd', '#ff6b6b', '#ffc2d1']

// Một cánh hoa hướng lên, gốc ở tâm (12,12), khía nhẹ ở đỉnh.
const PETAL = 'M12 12 C9 9 8 4.5 10 2 C10.8 1 11.4 1.6 12 3.2 C12.6 1.6 13.2 1 14 2 C16 4.5 15 9 12 12 Z'
// 5 cánh xoay đều quanh tâm -> bông hoa anh đào.
const ANGLES = [0, 72, 144, 216, 288]

function Blossom({ color }) {
  return (
    <svg className="leaf" viewBox="0 0 24 24" width="100%" height="100%">
      <g>
        {ANGLES.map((a) => (
          <path key={a} d={PETAL} fill={color} transform={`rotate(${a} 12 12)`} />
        ))}
      </g>
      <circle cx="12" cy="12" r="2" fill="#fff3b0" />
    </svg>
  )
}

// Một nhánh tuyết hướng lên: trục chính + 2 cặp nhánh con.
const FLAKE_ARM = 'M12 12 L12 2 M12 4.6 L9.6 2.2 M12 4.6 L14.4 2.2 M12 7.5 L10.2 5.7 M12 7.5 L13.8 5.7'
// 6 nhánh xoay đều quanh tâm -> bông tuyết.
const FLAKE_ANGLES = [0, 60, 120, 180, 240, 300]

function Snowflake() {
  return (
    <svg
      className="leaf"
      viewBox="0 0 24 24"
      width="100%"
      height="100%"
      fill="none"
      stroke="#ffffff"
      strokeWidth="1.1"
      strokeLinecap="round"
    >
      {FLAKE_ANGLES.map((a) => (
        <path key={a} d={FLAKE_ARM} transform={`rotate(${a} 12 12)`} />
      ))}
      <circle cx="12" cy="12" r="1.1" fill="#ffffff" stroke="none" />
    </svg>
  )
}

export default function FallingEffect({ variant = 'petals', count = 28 }) {
  const isSnow = variant === 'snow'
  const seeds = SEEDS.slice(0, Math.min(count, SEEDS.length))

  return (
    <div
      aria-hidden="true"
      className="falling-bg pointer-events-none fixed inset-0 z-30 overflow-hidden"
    >
      {seeds.map((s, i) => (
        <span
          key={i}
          className="falling-col"
          style={{
            left: `${s.left}%`,
            '--fall-duration': `${s.fall}s`,
            '--fall-delay': `${s.delay}s`,
          }}
        >
          <span
            className="falling-sway"
            style={{
              '--sway-x': `${s.sway}px`,
              '--sway-duration': `${s.swayDur}s`,
              '--sway-delay': `${(s.delay % 2).toFixed(2)}s`,
            }}
          >
            <span
              className={`falling-leaf${isSnow ? ' is-snow' : ''}`}
              style={{
                width: isSnow ? Math.round(s.size * 0.7) : s.size,
                height: isSnow ? Math.round(s.size * 0.7) : s.size,
                opacity: s.opacity,
                '--spin-duration': `${s.spin}s`,
                // Mỗi hạt lật quanh một trục 3D riêng -> không đồng bộ.
                '--ax': (i % 3) * 0.4 + 0.3,
                '--ay': ((i + 1) % 2) * 0.6 + 0.4,
                '--az': (i % 4) * 0.3,
              }}
            >
              {isSnow ? (
                <Snowflake />
              ) : (
                <Blossom color={FLOWER_COLORS[i % FLOWER_COLORS.length]} />
              )}
            </span>
          </span>
        </span>
      ))}
    </div>
  )
}
