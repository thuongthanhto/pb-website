// Icon dùng chung — thay cho Material Symbols web font (~4MB) và @iconify runtime.
// react-icons chỉ bundle đúng những icon được import (tree-shaken -> vài KB).
import {
  MdArrowForward,
  MdChevronRight,
  MdChevronLeft,
  MdFormatQuote,
  MdStar,
  MdStarHalf,
  MdStarBorder,
  MdFullscreen,
  MdCheckCircle,
  MdStars,
  MdCalendarToday,
  MdClose,
  MdZoomIn,
  MdFavorite,
  MdFace,
  MdCelebration,
  MdPhone,
  MdEmail,
} from 'react-icons/md';
import { FaInstagram, FaFacebookF } from 'react-icons/fa';

const ICONS = {
  arrow_forward: MdArrowForward,
  chevron_right: MdChevronRight,
  chevron_left: MdChevronLeft,
  format_quote: MdFormatQuote,
  star: MdStar,
  star_half: MdStarHalf,
  star_outline: MdStarBorder,
  fullscreen: MdFullscreen,
  check_circle: MdCheckCircle,
  stars: MdStars,
  calendar_today: MdCalendarToday,
  close: MdClose,
  zoom_in: MdZoomIn,
  favorite: MdFavorite,
  face: MdFace,
  celebration: MdCelebration,
  phone: MdPhone,
  email: MdEmail,
  // Tương thích tên cũ kiểu iconify (ContactSection / Footer)
  'mdi:instagram': FaInstagram,
  'mdi:facebook': FaFacebookF,
  'mdi:phone': MdPhone,
  'mdi:email': MdEmail,
};

/**
 * <Icon name="arrow_forward" className="text-[18px] text-primary" />
 * react-icons mặc định size = 1em & fill = currentColor, nên class text-[..]/text-color
 * áp trực tiếp như span material-symbols cũ.
 */
export function Icon({ name, className, ...props }) {
  const Cmp = ICONS[name];
  if (!Cmp) return null;
  return <Cmp className={className} aria-hidden {...props} />;
}
