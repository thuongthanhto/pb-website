/**
 * Kênh liên hệ dùng chung cho cả UI lẫn structured data.
 * Đổi số/link ở đây là đổi toàn site — trước đây `tel:` bị chép tay ở 5 file.
 */
export const CONTACT = {
  phone: '+84909383332',
  phoneDisplay: '0909 383 332',
  /** Zalo dùng chung số hotline. */
  zalo: 'https://zalo.me/0909383332',
  /** Link chat thẳng vào fanpage (khác với link fanpage bên dưới). */
  messenger: 'https://m.me/PhatBo0905',
  facebook: 'https://www.facebook.com/PhatBo0905',
  instagram: 'https://www.instagram.com/scryer_bo',
  email: 'phatchay95@gmail.com',
} as const;

export const telHref = `tel:${CONTACT.phone}`;
export const mailtoHref = `mailto:${CONTACT.email}`;
