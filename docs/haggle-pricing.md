# "Bấm để trả giá" — luật mặc cả trên bảng giá

Nút phụ dưới CTA của mỗi gói Pre-Wedding. Khách tự ra giá, studio counter-offer
lại, rồi mở Messenger/Zalo với lời nhắn đã copy sẵn.

## Tại sao làm

Khách đi coi studio kèo nào cũng xin bớt — chuyện đó xảy ra dù web có nút này
hay không. Nút này **kéo cuộc mặc cả về sân mình, với luật do mình đặt**: có sàn
cứng, có lý do để giữ giá (ngày chụp), và kết thúc bằng một con số cụ thể trên
bàn thay vì tin nhắn "giá bao nhiêu ạ".

Giảm giá vô tội vạ thì hại thương hiệu cao cấp. Nên trục mặc cả ở đây **không
phải tiền mà là ngày chụp**: ngày trống thì nhả sâu, cuối tuần mùa cưới thì gần
như không nhúc nhích. Về bản chất là bán capacity còn dư, giống vé máy bay.

## Luồng

1. **Chọn ngày chụp** → quyết định sàn giảm giá.
2. **Kéo slider ra giá** → slider chặn cứng ở sàn, không kéo thì không gửi được.
3. **Studio phản hồi** (delay 1,1s cho có cảm giác "đi hỏi sếp") theo 3 vùng.
4. **Chốt** → copy lời nhắn + mở Messenger hoặc Zalo.

Deal lưu `localStorage` 48h. Hết hạn tự xoá; giá gói đổi cũng tự xoá.

## Các nút vặn

| Hằng số | File | Mặc định | Ý nghĩa |
|---|---|---|---|
| `HAGGLE_INDEXES` | `PricingCards.jsx` | `[0, 1]` | Gói nào được trả giá. 2 gói phóng sự 12tr đã sát đáy nên không mở. |
| `HAGGLE_FLOORS` | `PricingCards.jsx` | `.85 / .90 / .94` | Sàn theo ngày thường / chưa chốt / cuối tuần. |
| `CONCESSION` | `HaggleButton.jsx` | `0.4` | Studio **lấy lại** 40% khoảng cách giữa giá khách ra và giá niêm yết. Khách giữ được 60% mức giảm đã xin. |
| `ZONE_ACCEPT` | `HaggleButton.jsx` | `0.8` | Trả giá cao hơn mốc này → đồng ý ngay, đúng giá khách ra. |
| `ZONE_COUNTER` | `HaggleButton.jsx` | `0.3` | Dưới mốc này → counter-offer **kèm quà**. |
| `DEAL_TTL_HOURS` | `HaggleButton.jsx` | `48` | Deal sống bao lâu. |
| `PRICE_STEP` | `HaggleButton.jsx` | `100_000` | Bước slider và mức làm tròn. |

Hai mốc vùng tính theo **vị trí tương đối trong khoảng [sàn, niêm yết]**, không
theo % giá — nhờ vậy sàn nào cũng đủ cả 3 vùng, kể cả sàn cuối tuần rất nông.

## Con số thực tế

Sinh từ chính công thức trong code:

### Gói 15.000.000đ

| Ngày chụp | Sàn slider | Đồng ý ngay từ | Có quà nếu dưới | Chốt thấp nhất |
|---|---|---|---|---|
| Ngày thường | 12.800.000 | 14.560.000 | 13.460.000 | **13.700.000** (−8,7%) |
| Chưa chốt | 13.500.000 | 14.700.000 | 13.950.000 | **14.100.000** (−6,0%) |
| Cuối tuần | 14.100.000 | 14.820.000 | 14.370.000 | **14.500.000** (−3,3%) |

### Gói 19.000.000đ

| Ngày chụp | Sàn slider | Đồng ý ngay từ | Có quà nếu dưới | Chốt thấp nhất |
|---|---|---|---|---|
| Ngày thường | 16.200.000 | 18.440.000 | 17.040.000 | **17.300.000** (−8,9%) |
| Chưa chốt | 17.100.000 | 18.620.000 | 17.670.000 | **17.900.000** (−5,8%) |
| Cuối tuần | 17.900.000 | 18.780.000 | 18.230.000 | **18.300.000** (−3,7%) |

**Mức giảm tối đa tuyệt đối là 8,9%** — không có đường nào ra giá thấp hơn.

## Quà tặng

Nằm ở `pricing.haggle.gifts` trong dictionary, **bốc ngẫu nhiên** mỗi lần chốt.
Chỉ bung ở vùng trả giá sát sàn — ai cũng có thì hết thiêng.

Random chạy trong handler phía client sau tương tác, không đụng SSR/hydration.

## Nội dung

Toàn bộ chữ nằm ở `pricing.haggle` trong `vi.json` / `en.json`. Chuỗi có
placeholder: `{price}`, `{hours}`, `{amount}`, và lời nhắn gửi đi dùng
`{package}` `{offer}` `{counter}` `{gift}` `{slot}`.

Giá gốc **không khai lại trong code** — parse thẳng từ `pkg.price` của dictionary
(`"15.000.000đ"` → `15000000`), nên sửa giá một chỗ là xong. Parse hỏng thì nút
tự ẩn thay vì hiện số sai.

## Ràng buộc kỹ thuật cần nhớ

- **Modal phải render qua `createPortal`.** Card bọc ngoài là `<Reveal>`; trong
  lúc còn animate nó có `will-change: transform`, biến card thành containing
  block cho `position: fixed`. Không portal thì modal bị nhốt trong card.
- **Copy clipboard cần HTTPS.** `navigator.clipboard` không tồn tại trên http;
  `writeText()` còn có thể bị từ chối quyền. Chỉ báo "đã copy" khi promise
  resolve, hỏng thì hiện lời nhắc đọc số cho khách.
- **Messenger và Zalo đều không cho điền sẵn nội dung** — bắt buộc phải copy rồi
  để khách dán.
- Khoá `localStorage` theo **số thứ tự gói**; đổi thứ tự gói mà giá trùng nhau
  thì deal cũ có thể dính nhầm. Hiện 4 gói có 2 mức giá khác nhau ở nhóm được
  trả giá nên chưa va.

## Đo đạc

4 event Vercel Analytics, đọc như một cái phễu:

| Event | Kèm theo |
|---|---|
| `haggle_open` | `pkg`, `hasDeal` |
| `haggle_offer` | `pkg`, `slot`, `ratio` (% giá khách trả) |
| `haggle_deal` | `pkg`, `zone`, `final` |
| `haggle_close` | `pkg`, `channel` (messenger/zalo), `final` |

`ratio` là thứ đáng tiền nhất: nó cho biết **khách thật sự định giá studio bao
nhiêu**, thứ mà không bảng khảo sát nào hỏi ra được.
