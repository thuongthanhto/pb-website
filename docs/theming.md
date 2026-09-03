# Giao diện sáng/tối (theme)

## Cách hoạt động

- `<html data-theme="dark|light">` quyết định toàn bộ màu. Server luôn render
  `dark`; script đồng bộ trong `<head>` (`themeInitScript`) đọc `localStorage`
  và gắn lại attribute **trước khi trang vẽ** nên không bị nháy theme.
- Token màu khai báo ở `src/styles/globals.css`: `@theme inline` map
  `--color-*` (Tailwind) sang `--*` (biến theme), rồi mỗi theme ghi đè bộ `--*`.
  Thêm màu mới = thêm 1 dòng ở `@theme inline` + 1 dòng ở **cả hai** khối theme.
- Đọc/đổi theme trong client component: `useTheme()` từ
  `@/components/ThemeProvider` → `{ theme, isDark, setTheme, toggleTheme }`.
- Mặc định là `dark`. Muốn theo hệ điều hành cho khách mới thì thêm nhánh
  `matchMedia('(prefers-color-scheme: light)')` trong `themeInitScript`.

## Luật vàng

**Component không được dùng màu tuyệt đối.** Không `bg-stone-800`,
không `text-white`, không `#hex`. Chỉ dùng token dưới đây.

| Token | Dùng cho |
|---|---|
| `bg-background` | nền trang, nền header/drawer |
| `bg-surface` | nền thẻ, panel, input |
| `bg-surface-raised` | nút phụ, nền hover, thẻ nổi trên surface |
| `bg-surface-strong` | bậc cao nhất — hover của nút phụ đã là `surface-raised` |
| `bg-surface-sunken` | vùng lõm, nền phụ tối/nhạt hơn trang |
| `bg-accent` / `text-accent` | sắc cam phụ (chỉ dùng ở gradient tiêu đề AlbumsHero) |
| `border-border` | đường kẻ mảnh mặc định |
| `border-border-strong` | kẻ đậm hơn, divider nổi |
| `text-text-main` | chữ chính, tiêu đề |
| `text-text-secondary` | chữ phụ, mô tả |
| `text-text-muted` | nhãn nhỏ, caption, chữ mờ |
| `bg-primary` / `text-primary` | màu thương hiệu (coral) |
| `bg-primary-dark` | hover của nút primary |
| `text-on-primary` | chữ/icon **nằm trên** nền primary (thay `text-white`) |

Thân modal/drawer dùng `bg-background`, **không** phải `bg-surface` — để thẻ con
bên trong còn dùng được `bg-surface/50` mà vẫn nổi. Ở theme sáng `surface` là
`#ffffff`, panel trắng + thẻ trắng mờ thì thẻ tàng hình.

## Bảng quy đổi màu cũ → token

| Cũ | Mới |
|---|---|
| `bg-stone-900`, `bg-stone-950` | `bg-background` (nền trang) hoặc `bg-surface-sunken` (vùng lõm) |
| `bg-stone-800` | `bg-surface` |
| `bg-stone-800/50`, `/60`, `/90` | `bg-surface/50`, `/60`, `/90` |
| `bg-stone-700`, `bg-stone-600` | `bg-surface-raised` |
| `border-stone-800`, `border-stone-700` | `border-border` |
| `border-stone-600` | `border-border-strong` |
| `text-stone-100`, `text-stone-200` | `text-text-main` |
| `text-stone-300`, `text-stone-400` | `text-text-secondary` |
| `text-stone-500`, `text-stone-600` | `text-text-muted` |
| `text-white` **trên nền primary** | `text-on-primary` |
| `text-white` **trên nền surface/stone** | `text-text-main` |

## NGOẠI LỆ — giữ nguyên màu tuyệt đối

Ba trường hợp này **không token hoá**, sửa là hỏng:

1. **Scrim và chữ đè trên ẢNH.** Ảnh không đổi theo theme, nên lớp phủ phải
   luôn tối và chữ phải luôn trắng. Giữ y nguyên `from-black/80`,
   `via-black/10`, `to-transparent`, `text-white`, `bg-white/15`,
   `ring-white/30` khi chúng nằm **trên `<Image>`/ảnh nền**.
   Ví dụ đúng: caption ảnh trong `BehindScenesGallery`, overlay hover trong
   `PortfolioGrid`, hero có ảnh nền trong `PricingHero` / `AboutHero`.
2. **Backdrop của modal/drawer** (`bg-black/50`, `bg-black/80`): tối ở cả hai
   theme là chuẩn chung, giữ nguyên.
3. **Màu mang nghĩa trạng thái** (`text-emerald-400` = thành công,
   `text-yellow-400`/`text-amber-400` = sao đánh giá): giữ nguyên. Nếu ở theme
   sáng bị chìm thì đổi sang sắc đậm hơn cùng hệ (vd `text-emerald-600`) bằng
   biến thể `dark:` — `dark:text-emerald-400 text-emerald-600`.

## Tự kiểm trước khi xong

```bash
# Còn màu cứng nào không nằm trong 3 ngoại lệ trên?
grep -noE "(text|bg|border|ring|from|via|to)-(white|black|stone|gray|zinc|neutral)[a-z0-9/-]*" <file>
```

Rồi soi bằng mắt ở **cả hai** theme: chữ phải đọc được, viền phải thấy được,
nút primary vẫn nổi trên nền.
