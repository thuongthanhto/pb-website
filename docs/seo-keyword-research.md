# Nghiên cứu keyword & marketing — chụp ảnh cưới

Tài liệu do một agent sinh ra: **gemma4:12b** (ollama, local) làm phần suy luận, **SearXNG** (`localhost:8888`) làm phần tra cứu web thật.

## Dữ liệu này đến từ đâu

Khác với việc hỏi thẳng một LLM, **mọi keyword trong tài liệu này đều là cụm người thật đã gõ vào Google** — lấy từ Google autocomplete qua SearXNG, chứ không phải model tự nghĩ ra. Agent chỉ được phép phân loại các cụm đó.

- **486 lượt gọi autocomplete** → thu keyword thật
- **19 truy vấn SERP** → soi đối thủ, tiêu đề đang xếp hạng, mức giá
- **3 vòng agentic**: sau mỗi vòng agent tự đọc lại những gì đã thu được, tự nhận ra lỗ hổng rồi tự chọn tiền tố/truy vấn cho vòng sau
- **728 keyword** được phân loại (đã lọc bỏ 91 cụm lệch địa bàn — Hà Nội, Đà Nẵng, Vũng Tàu…)

**Vẫn còn thiếu:** autocomplete cho biết người ta *gõ gì*, không cho biết *bao nhiêu người gõ*. Không có search volume, CPC hay độ khó từ khoá — muốn số đó thì phải dùng Google Keyword Planner / Ahrefs / Semrush. Cột *Ưu tiên* là suy luận của agent, không phải dữ liệu.

### Agent tự lập luận gì qua các vòng

**Vòng 1.** Dữ liệu hiện tại cho thấy sự thiếu hụt các cụm từ mang tính 'định vị cao cấp' (luxury) và 'phong cách cinematic' vốn là thế mạnh của studio. Ngoài ra, cần khai thác sâu hơn nhóm khách hàng doanh nghiệp/chân dung chuyên nghiệp và nhu cầu cụ thể về quay phim cưới thay vì chỉ chụp ảnh.

**Vòng 2.** Dữ liệu cho thấy khách hàng quan tâm mạnh đến báo giá cụ thể và các gói kết hợp (studio + street). Cần khai thác sâu hơn nhóm khách ngoại quốc (English keywords), dịch vụ quay phim 4K và sự kiện doanh nghiệp để lấp đầy phân khúc cao cấp.

**Vòng 3.** Dữ liệu cho thấy khách hàng tìm kiếm rất nhiều về 'báo giá' và các từ khóa mang tính chất 'uy tín', 'đẹp' kết hợp với dịch vụ cụ thể. Cần khai thác sâu hơn vào ý định so sánh giữa 'phóng sự' và 'truyền thống', các yêu cầu kỹ thuật cho quay phim (2K/4K), và tập trung vào phân khúc doanh nhân cao cấp để loại bỏ nhóm khách tìm 'giá rẻ'.

## Keyword thật, nhóm theo trang cần nhắm

Phân bổ: `/`: 5 · `/albums`: 158 · `/pricing`: 187 · `/contact`: 45 · `Blog (chưa có — cần tạo)`: 120 · `Trang mới (chưa có)`: 213

### /

| Keyword | Intent | Giai đoạn | Ưu tiên | Ghi chú |
|---|---|---|---|---|
| wedding photographer uy tín tphcm | thương mại | cân nhắc | cao | Đúng dịch vụ, đúng địa bàn và đúng phân khúc mục tiêu. |
| wedding photographer uy tín tại tphcm | thương mại | cân nhắc | cao | Đúng dịch vụ, đúng địa bàn và đúng phân khúc mục tiêu. |
| wedding photographer ở đâu tphcm | thương mại | cân nhắc | cao | Đúng dịch vụ, đúng địa bàn và đúng phân khúc mục tiêu. |
| wedding photographer vietnam | thương mại | cân nhắc | thấp | Phạm vi tìm kiếm quá rộng, không tập trung vào TP.HCM. |
| wedding photographer ở đâu uy tín | thương mại | cân nhắc | thấp | Không xác định cụ thể địa bàn TP.HCM. |

### /albums

158 keyword, sắp theo ưu tiên. 30 cụm đầu:

| Keyword | Intent | Giai đoạn | Ưu tiên | Ghi chú |
|---|---|---|---|---|
| chụp hình cưới ngoại cảnh sài gòn | thương mại | cân nhắc | cao | Khách hàng tìm kiếm bối cảnh streetstyle Sài Gòn là thế mạnh của studio. |
| chụp hình cưới uy tín tphcm | thương mại | cân nhắc | cao | Khách hàng tìm kiếm đơn vị uy tín tại TP.HCM cho dịch vụ trọng tâm. |
| chụp phóng sự cưới reviews | thương mại | cân nhắc | cao | Khách hàng tìm kiếm đánh giá và cảm hứng từ các sản phẩm thực tế. |
| chụp phóng sự cưới đẹp tphcm | thương mại | cân nhắc | cao | Đúng dịch vụ và địa bàn mục tiêu tại TP.HCM. |
| chụp phóng sự cưới ở đâu đẹp | thương mại | cân nhắc | cao | Đúng dịch vụ và địa bàn mục tiêu tại TP.HCM. |
| chụp ảnh cưới bao nhiêu sài gòn đẹp | thương mại | cân nhắc | cao | Khách hàng tìm kiếm mẫu ảnh đẹp tại địa bàn mục tiêu. |
| chụp ảnh cưới ngoại cảnh sài gòn | thương mại | cân nhắc | cao | Khớp dịch vụ Street & Studio tại TPHCM với gu cinematic. |
| chụp ảnh cưới ngoại cảnh tphcm | thương mại | cân nhắc | cao | Khớp dịch vụ Street & Studio tại TPHCM với gu cinematic. |
| chụp ảnh cưới ngoại cảnh uy tín hcm | thương mại | cân nhắc | cao | Khách hàng tìm kiếm đơn vị chuyên nghiệp tại TPHCM. |
| chụp ảnh cưới ngoại cảnh uy tín tphcm | thương mại | cân nhắc | cao | Khách hàng tìm kiếm đơn vị chuyên nghiệp tại TPHCM. |
| chụp ảnh cưới ngoại cảnh uy tín tại tphcm | thương mại | cân nhắc | cao | Khách hàng tìm kiếm đơn vị chuyên nghiệp tại TPHCM. |
| chụp ảnh cưới studio | thương mại | cân nhắc | cao | Khớp dịch vụ Pre-Wedding Studio tại TPHCM. |
| chụp ảnh cưới studio sài gòn | thương mại | cân nhắc | cao | Khách hàng tìm kiếm dịch vụ studio tại đúng địa bàn mục tiêu. |
| chụp ảnh cưới studio tphcm | thương mại | cân nhắc | cao | Khách hàng tìm kiếm dịch vụ studio tại đúng địa bàn mục tiêu. |
| chụp ảnh cưới studio đẹp ở sài gòn | thương mại | cân nhắc | cao | Khách hàng tìm kiếm dịch vụ studio đẹp tại địa bàn mục tiêu. |
| chụp ảnh cưới studio ở đâu tphcm | thương mại | cân nhắc | cao | Khách hàng tìm kiếm địa điểm dịch vụ tại TP.HCM. |
| chụp ảnh cưới studio ở đâu tốt | thương mại | cân nhắc | cao | Khách hàng tìm kiếm đơn vị uy tín cho dịch vụ studio. |
| chụp ảnh cưới studio ở đâu đẹp | thương mại | cân nhắc | cao | Khách hàng tìm kiếm đơn vị có thẩm mỹ cho dịch vụ studio. |
| chụp ảnh cưới sài gòn | thương mại | cân nhắc | cao | Khách hàng tìm kiếm dịch vụ tại địa bàn mục tiêu. |
| chụp ảnh cưới sài gòn uy tín nhất | thương mại | cân nhắc | cao | Khách hàng tìm kiếm đơn vị uy tín tại địa bàn mục tiêu. |
| chụp ảnh cưới sài gòn voz | thương mại | cân nhắc | cao | Khách hàng tìm kiếm đánh giá từ cộng đồng tại địa bàn mục tiêu. |
| chụp ảnh cưới sài gòn đẹp | thương mại | cân nhắc | cao | Khách hàng tìm kiếm dịch vụ có thẩm mỹ tại địa bàn mục tiêu. |
| chụp ảnh cưới sài gòn địa điểm | thương mại | cân nhắc | cao | Khách hàng tìm kiếm địa điểm thực hiện tại Sài Gòn. |
| chụp ảnh cưới sài gòn ở đâu tốt | thương mại | cân nhắc | cao | Khách hàng tìm kiếm đơn vị uy tín tại địa bàn mục tiêu. |
| chụp ảnh cưới sài gòn ở đâu uy tín | thương mại | cân nhắc | cao | Khách hàng tìm kiếm đơn vị uy tín tại địa bàn mục tiêu. |
| chụp ảnh cưới sài gòn ở đâu đẹp | thương mại | cân nhắc | cao | Khách hàng tìm kiếm đơn vị có thẩm mỹ tại địa bàn mục tiêu. |
| chụp ảnh cưới tp hcm | thương mại | cân nhắc | cao | Khách hàng tìm kiếm dịch vụ tại địa bàn mục tiêu. |
| chụp ảnh cưới tphcm | thương mại | cân nhắc | cao | Khách hàng tìm kiếm dịch vụ tại địa bàn mục tiêu. |
| chụp ảnh cưới tphcm ở đâu tốt | thương mại | cân nhắc | cao | Khách hàng đang tìm kiếm đơn vị chất lượng tại TP.HCM. |
| chụp ảnh cưới tphcm ở đâu đẹp | thương mại | cân nhắc | cao | Khách hàng tìm kiếm cảm hứng và chất lượng thẩm mỹ tại TP.HCM. |

<details><summary>128 keyword còn lại cho trang này</summary>

| Keyword | Intent | Giai đoạn | Ưu tiên | Ghi chú |
|---|---|---|---|---|
| chụp ảnh cưới tphcm ở đâu đẹp hcm | thương mại | cân nhắc | cao | Khách hàng tìm kiếm cảm hứng và chất lượng thẩm mỹ tại TP.HCM. |
| chụp ảnh cưới tphcm ở đâu đẹp nhất | thương mại | cân nhắc | cao | Khách hàng tìm kiếm đơn vị có gu thẩm mỹ cao tại TP.HCM. |
| chụp ảnh cưới tphcm ở đâu đẹp nhất việt nam | thương mại | cân nhắc | cao | Khách hàng tìm kiếm đơn vị có chất lượng cao nhất tại TP.HCM. |
| chụp ảnh cưới tại sài gòn | thương mại | cân nhắc | cao | Khách hàng tìm kiếm dịch vụ chụp ảnh tại Sài Gòn. |
| chụp ảnh cưới uy tín tại tphcm | thương mại | cân nhắc | cao | Khách hàng tìm kiếm đơn vị uy tín tại TP.HCM. |
| chụp ảnh cưới đẹp nhất sài gòn | thương mại | cân nhắc | cao | Khách hàng tìm kiếm thẩm mỹ cao tại Sài Gòn. |
| chụp ảnh cưới đẹp sài gòn | thương mại | cân nhắc | cao | Khách hàng tìm kiếm dịch vụ tại Sài Gòn. |
| chụp ảnh cưới đẹp tphcm | thương mại | cân nhắc | cao | Khách hàng tìm kiếm dịch vụ tại TP.HCM. |
| chụp ảnh cưới đẹp ở tphcm | thương mại | cân nhắc | cao | Khách hàng tìm kiếm dịch vụ tại TP.HCM. |
| chụp ảnh cưới ở studio nào đẹp tphcm | thương mại | cân nhắc | cao | Khách hàng tìm kiếm studio tại TP.HCM. |
| chụp ảnh cưới ở sài gòn | thương mại | cân nhắc | cao | Khách hàng tìm kiếm dịch vụ tại Sài Gòn. |
| chụp ảnh cưới ở tp hcm | thương mại | cân nhắc | cao | Khách hàng tìm kiếm dịch vụ tại TP.HCM. |
| chụp ảnh kỷ niệm ngày cưới tphcm | consideration | cân nhắc | cao | Khách hàng tìm cảm hứng cho ảnh cưới tại TP.HCM. |
| chụp ảnh tiệc cưới tphcm | thương mại | cân nhắc | cao | Đúng dịch vụ cưới tại TP.HCM, cần xem portfolio để đánh giá gu. |
| concept chụp ảnh cưới studio đẹp | thông tin | cân nhắc | cao | Tìm kiếm cảm hứng cho gói Pre-Wedding Studio tại TP.HCM. |
| các studio chụp ảnh cưới đẹp ở sài gòn | thương mại | cân nhắc | cao | Khách hàng đang tìm kiếm các đơn vị uy tín tại TP.HCM. |
| desi wedding sài gòn studio chụp ảnh cưới cao cấp | giao dịch | quyết định | cao | Khách hàng tìm studio cao cấp tại Sài Gòn cho đám cưới. |
| giá chụp ảnh cưới ở đâu đẹp | thương mại | cân nhắc | cao | Người dùng đang tìm kiếm địa điểm và phong cách thẩm mỹ cho ảnh cưới. |
| luxury wedding photography vietnam | thương mại | cân nhắc | cao | Đúng phân khúc cao cấp và phong cách sang trọng của studio. |
| màu phóng sự cưới đẹp | thông tin | cân nhắc | cao | Tìm kiếm cảm hứng về màu sắc và phong cách cinematic. |
| những studio chụp ảnh cưới đẹp ở tphcm | thương mại | cân nhắc | cao | Tìm kiếm studio tại địa phương với gu thẩm mỹ cao. |
| nơi chụp ảnh cưới đẹp ở tphcm | thương mại | cân nhắc | cao | Cụm từ tìm kiếm dịch vụ tại địa phương. |
| phim trường chụp hình cưới đẹp ở tphcm | thương mại | cân nhắc | cao | Khách hàng tìm kiếm bối cảnh và mẫu ảnh tại TP.HCM. |
| phim trường chụp ảnh cưới tphcm | thương mại | cân nhắc | cao | Khách hàng tìm kiếm bối cảnh và mẫu ảnh tại TP.HCM. |
| phim trường chụp ảnh cưới đẹp ở sài gòn | thương mại | cân nhắc | cao | Khách hàng tìm kiếm bối cảnh và mẫu ảnh tại Sài Gòn. |
| phóng sự cưới 2023 | thương mại | cân nhắc | cao | Tìm kiếm cảm hứng phóng sự cưới mới nhất. |
| phóng sự cưới hay | thương mại | cân nhắc | cao | Tìm kiếm cảm hứng và mẫu phóng sự đẹp. |
| phóng sự cưới hay nhất | thương mại | cân nhắc | cao | Tìm kiếm cảm hứng và mẫu phóng sự đẹp. |
| phóng sự cưới mới nhất | thương mại | cân nhắc | cao | Tìm kiếm cảm hứng và mẫu phóng sự đẹp. |
| pre wedding saigon | thương mại | cân nhắc | cao | Đúng dịch vụ, đúng địa bàn và phù hợp phong cách streetstyle Sài Gòn. |
| pre wedding shoot saigon | thương mại | cân nhắc | cao | Đúng dịch vụ, đúng địa bàn và phù hợp phong cách streetstyle Sài Gòn. |
| pre wedding studio | thương mại | cân nhắc | cao | Đúng dịch vụ Studio tại khu vực mục tiêu. |
| pre wedding sài gòn | thương mại | cân nhắc | cao | Đúng dịch vụ, đúng địa bàn và phù hợp phong cách streetstyle Sài Gòn. |
| pre wedding tphcm 2024 | thương mại | cân nhắc | cao | Đúng dịch vụ, đúng địa bàn và cập nhật xu hướng năm hiện tại. |
| pre wedding uy tín sài gòn | thương mại | cân nhắc | cao | Đúng dịch vụ, đúng địa bàn và hướng đến phân khúc trung-cao. |
| pre wedding uy tín tphcm | thương mại | cân nhắc | cao | Đúng dịch vụ, đúng địa bàn và hướng đến phân khúc trung-cao. |
| pre wedding uy tín tại tphcm | thương mại | cân nhắc | cao | Đúng dịch vụ, đúng địa bàn và hướng đến phân khúc trung-cao. |
| pre wedding ở đâu sài gòn | thương mại | cân nhắc | cao | Đúng dịch vụ studio tại Sài Gòn cho phân khúc trung-cao. |
| pre wedding ở đâu tphcm | thương mại | cân nhắc | cao | Đúng dịch vụ studio tại TP.HCM cho phân khúc trung-cao. |
| pre-wedding shoot sài gòn | thương mại | cân nhắc | cao | Đúng dịch vụ studio tại Sài Gòn cho phân khúc trung-cao. |
| quay phim chụp hình cưới | thương mại | cân nhắc | cao | Đúng dịch vụ quay và chụp cưới tại khu vực mục tiêu. |
| quay phim cưới tphcm | thương mại | cân nhắc | cao | Đúng dịch vụ quay phóng sự tại TP.HCM. |
| quay phim cưới tphcm 2024 | thương mại | cân nhắc | cao | Đúng dịch vụ quay phóng sự tại TP.HCM cho năm hiện tại. |
| quay phim đám cưới tphcm 2024 | thương mại | cân nhắc | cao | Đúng dịch vụ quay phóng sự, đúng địa bàn và có yếu tố thời điểm. |
| quay phim đám cưới uy tín tại tphcm | thương mại | cân nhắc | cao | Tìm kiếm đơn vị uy tín tại TP.HCM cho dịch vụ quay phóng sự. |
| quay phim đám cưới ở đâu tphcm | thương mại | cân nhắc | cao | Tìm kiếm địa điểm cung cấp dịch vụ quay tại TP.HCM. |
| quay phóng sự cưới tphcm | thương mại | cân nhắc | cao | Đúng dịch vụ quay phóng sự và đúng địa bàn TP.HCM. |
| studio chụp ảnh cưới nổi tiếng sài gòn | thương mại | cân nhắc | cao | Đúng dịch vụ, đúng địa bàn và phân khúc cao cấp. |
| studio chụp ảnh cưới tphcm | giao dịch | quyết định | cao | Đúng dịch vụ và đúng địa bàn mục tiêu. |
| studio chụp ảnh cưới tại tphcm | giao dịch | quyết định | cao | Đúng dịch vụ và đúng địa bàn mục tiêu. |
| studio chụp ảnh cưới uy tín ở tphcm | giao dịch | quyết định | cao | Đúng dịch vụ, địa bàn và thể hiện sự tin cậy. |
| studio chụp ảnh cưới đẹp nhất hcm | giao dịch | quyết định | cao | Đúng dịch vụ, địa bàn và phân khúc cao cấp. |
| studio chụp ảnh cưới đẹp nhất tphcm | giao dịch | quyết định | cao | Đúng dịch vụ, địa bàn và phân khúc cao cấp. |
| studio chụp ảnh cưới đẹp sài gòn | giao dịch | quyết định | cao | Đúng dịch vụ, địa bàn và phân khúc cao cấp. |
| studio chụp ảnh cưới đẹp tphcm | giao dịch | quyết định | cao | Đúng dịch vụ, địa bàn và phân khúc cao cấp. |
| studio chụp ảnh cưới đẹp ở sài gòn | giao dịch | quyết định | cao | Đúng dịch vụ, địa bàn và phân khúc cao cấp. |
| studio chụp ảnh cưới đẹp ở tphcm | thương mại | cân nhắc | cao | Khách hàng tìm kiếm studio cưới tại TP.HCM với gu thẩm mỹ cao. |
| studio chụp ảnh cưới ở sài gòn | thương mại | cân nhắc | cao | Khách hàng tìm kiếm studio cưới tại Sài Gòn với gu thẩm mỹ cao. |
| studio chụp ảnh cưới ở tphcm | thương mại | cân nhắc | cao | Khách hàng tìm kiếm studio cưới tại TP.HCM với gu thẩm mỹ cao. |
| studio chụp ảnh cưới ở đâu tphcm | thương mại | consider1ation | cao | Khách hàng tìm kiếm studio cưới tại TP.HCM với gu thẩm mỹ cao. |
| studio chụp ảnh cưới ở đâu đẹp tphcm | thương mại | cân nhắc | cao | Khách hàng tìm kiếm studio cưới tại TP.HCM với gu thẩm mỹ cao. |
| sài gòn chụp ảnh cưới ở đâu đẹp | thương mại | cân nhắc | cao | Khách hàng tìm kiếm studio cưới tại Sài Gòn với gu thẩm mỹ cao. |
| tiệm chụp ảnh cưới đẹp ở sài gòn | thương mại | cân nhắc | cao | Khách hàng tìm kiếm studio cưới tại Sài Gòn với gu thẩm mỹ cao. |
| top studio chụp ảnh cưới đẹp ở tphcm | thương mại | cân nhắc | cao | Khách hàng tìm kiếm studio cưới tại TP.HCM với gu thẩm mỹ cao. |
| vietnam pre wedding photographer | thương mại | cân nhắc | cao | Đúng dịch vụ trọng tâm của studio tại thị trường mục tiêu. |
| vietnam pre wedding photographers | thương mại | cân nhắc | cao | Đúng dịch vụ trọng tâm của studio tại thị trường mục tiêu. |
| vietnam wedding photographer | thương mại | cân nhắc | cao | Đúng dịch vụ trọng tâm của studio tại thị trường mục tiêu. |
| vietnam wedding photographer uy tín tphcm | thương mại | cân nhắc | cao | Đúng dịch vụ, đúng địa bàn và phân khúc mục tiêu. |
| vietnam wedding photographer đẹp việt nam | thương mại | cân nhắc | cao | Đúng dịch vụ và hướng tới phân khúc cao cấp. |
| vietnam wedding photographer ở đâu tphcm | thương mại | cân nhắc | cao | Đúng dịch vụ và đúng địa bàn mục tiêu tại TP.HCM. |
| vietnam wedding photographer ở đâu uy tín | thương mại | considerience | cao | Đúng dịch vụ và hướng tới phân khúc trung-cao. |
| vietnam wedding photography | thương mại | cân nhắc | cao | Đúng dịch vụ trọng tâm của studio. |
| vietnamese wedding photographer | thương mại | cân nhắc | cao | Đúng dịch vụ trọng tâm của studio. |
| wedding photo studio | thương mại | cân nhắc | cao | Đúng dịch vụ và phân khúc trung-cao. |
| wedding photographer | thương mại | cân nhắc | cao | Đúng dịch vụ trọng tâm của studio. |
| ảnh phóng sự cưới đẹp | thương mại | cân nhắc | cao | Đúng dịch vụ Phóng Sự Cưới, đúng phân khúc và địa bàn mục tiêu. |
| bảng giá chụp ảnh cưới đẹp 2024 | thương mại | cân nhắc | trung bình | Cụm từ tìm kiếm cảm hứng và chất lượng hình ảnh. |
| bảng giá chụp ảnh cưới đẹp nhất | thương mại | cân nhắc | trung bình | Cụm từ tìm kiếm cảm hứng và chất lượng hình ảnh. |
| chụp ảnh chân dung nghệ thuật | thương mại | cân nhắc | trung bình | Khách hàng tìm kiếm cảm hứng và phong cách nghệ thuật. |
| chụp ảnh cưới ở đâu đẹp | thông tin | nhận biết | trung bình | Người dùng đang tìm kiếm cảm hứng và mẫu ảnh đẹp. |
| chụp ảnh cưới ở đâu đẹp nhất | thông tin | nhận biết | trung bình | Người dùng tìm kiếm cảm hứng và mẫu ảnh đẹp. |
| chụp ảnh cưới ở đâu đẹp nhất việt nam | thông tin | nhận biết | trung bình | Người dùng tìm kiếm cảm hứng và mẫu ảnh đẹp. |
| great pre wedding review | thông tin | cân nhắc | trung bình | Người dùng tìm kiếm đánh giá và cảm hứng cho ảnh cưới. |
| phóng sự cưới đẹp | thông tin | nhận biết | trung bình | Người dùng đang tìm kiếm cảm hứng từ các bộ ảnh đẹp. |
| phóng sự cưới đẹp 2024 | thông tin | nhận biết | trung bình | Người dùng tìm kiếm xu hướng ảnh cưới mới nhất. |
| portrait photography for wedding | thương mại | cân nhắc | trung bình | Cụm từ tìm kiếm ảnh chân dung cho đám cưới. |
| pre wedding album | thương mại | cân nhắc | trung bình | Người dùng tìm kiếm mẫu album ảnh cưới trước đám cưới. |
| pre wedding book | thương mại | cân nhắc | trung bình | Người dùng tìm kiếm sách ảnh cưới trước đám cưới. |
| pre wedding photo | thông tin | nhận biết | trung bình | Người dùng tìm kiếm hình ảnh mẫu. |
| pre wedding đẹp nhất | thông tin | cân nhắc | trung bình | Người dùng tìm kiếm mẫu ảnh đẹp để tham khảo phong cách. |
| quay phim cưới truyền thống | thương mại | cân nhắc | trung bình | Cụm từ hướng đến phong cách cụ thể, cần xem portfolio để đánh giá. |
| quay phim đám cưới review phim | thông tin | cân nhắc | trung bình | Cụm từ tìm kiếm mẫu/cảm hứng qua các sản phẩm đã thực hiện. |
| quay phim đám cưới reviews | thông tin | cân nhắc | trung bình | Cụm từ tìm kiếm mẫu/cảm hứng qua các sản phẩm đã thực hiện. |
| share màu phóng sự cưới đẹp | thông tin | cân nhắc | trung bình | Người dùng tìm cảm hứng về màu sắc và phong cách ảnh phóng sự. |
| shooting hcm | thương mại | cân nhắc | trung bình | Cụm từ rộng cho dịch vụ chụp ảnh tại TP.HCM. |
| studio chụp hình cưới | thương mại | cân nhắc | trung bình | Cụm từ chung cho dịch vụ chụp ảnh cưới. |
| studio chụp hình đẹp | thương mại | cân nhắc | trung bình | Cụm từ chung cho dịch vụ chụp ảnh. |
| studio chụp hình đẹp ở sài gòn | thương mại | cân nhắc | trung bình | Cụm từ tìm kiếm dịch vụ tại khu vực Sài Gòn. |
| studio chụp ảnh cưới đẹp | thương mại | cân nhắc | trung bình | Cụm từ chung, chưa giới hạn địa lý. |
| studio chụp ảnh cưới ở đâu đẹp | thương mại | cân nhắc | trung bình | Cụm từ rộng, chưa xác định rõ địa điểm cụ thể. |
| studio portrait photography saigon | thương mại | cân nhắc | trung bình | Khách hàng ngoại quốc hoặc tìm kiếm chân dung tại Sài Gòn. |
| studio sài gòn | thương mại | cân nhắc | trung bình | Cụm từ rộng, bao gồm nhiều loại hình dịch vụ khác nhau. |
| studio tại hcm | thương mại | cân nhắc | trung bình | Cụm từ rộng, chưa xác định rõ dịch vụ cụ thể. |
| studio tại tphcm | thương mại | cân nhắc | trung bình | Cụm từ rộng, chưa xác định rõ dịch vụ cụ thể. |
| top phim trường chụp ảnh cưới đẹp tphcm | thương mại | cân nhắc | trung bình | Khách hàng tìm kiếm bối cảnh, có thể dẫn về portfolio. |
| wedding photography vietnam | thương mại | cân nhắc | trung bình | Người dùng tìm kiếm dịch vụ tại Việt Nam nói chung. |
| wedding photography vietnam đẹp không | thông tin | cân nhắc | trung bình | Người dùng tìm kiếm bằng chứng về chất lượng thẩm mỹ. |
| wedding photography vietnam đẹp nhất | thương mại | cân nhắc | trung bình | Người dùng tìm kiếm đơn vị có chất lượng thẩm mỹ tốt nhất. |
| chụp ảnh cưới đẹp bắc ninh | thương mại | cân nhắc | thấp | Sai địa bàn mục tiêu (Bắc Ninh). |
| chụp ảnh cưới đẹp ở vinh | thương mại | cân nhắc | thấp | Sai địa bàn mục tiêu (Vinh). |
| pre wedding mood board | thông tin | nhận biết | thấp | Người dùng tìm kiếm cảm hứng hình ảnh. |
| pre wedding photography vietnam | thông tin | nhận biết | thấp | Cụm từ rộng, mang tính chất tìm kiếm cảm hứng chung tại Việt Nam. |
| pre wedding photoshoot | thông tin | nhận biết | thấp | Cụm từ chung không xác định địa điểm cụ thể. |
| pre wedding shoot | thông tin | nhận biết | thấp | Cụm từ chung, chưa xác định địa điểm hoặc phân khúc. |
| pre wedding shooting | thông tin | nhận biết | thấp | Cụm từ chung, chưa xác định địa điểm cụ thể. |
| pre wedding vietnam | thông tin | nhận biết | thấp | Cụm từ rộng, khách hàng đang tìm kiếm cảm hứng chung tại Việt Nam. |
| quay phim đám cưới đẹp nhất | thông tin | nhận biết | thấp | Cụm từ tìm kiếm cảm hứng chung không giới hạn địa điểm. |
| quay phim đám cưới đẹp nhất thế giới | thông tin | nhận biết | thấp | Cụm từ tìm kiếm cảm hứng toàn cầu. |
| quay phóng sự đám cưới | thương mại | cân nhắc | thấp | Cụm từ chung về dịch vụ quay không kèm địa danh. |
| studio shoot | thương mại | cân nhắc | thấp | Cụm từ quá chung chung, không định vị rõ dịch vụ cưới. |
| studio shooting | thương mại | cân nhắc | thấp | Cụm từ quá chung chung, không định vị rõ dịch vụ cưới. |
| vietnam destination wedding photographer | thương mại | cân nhắc | thấp | Cụm từ tìm kiếm rộng cho khách quốc tế, cần portfolio để thể hiện năng lực. |
| wedding photographer đẹp việt nam | thông tin | nhận biết | thấp | Người dùng tìm kiếm cảm hứng qua hình ảnh đẹp. |
| wedding photographers | thông tin | nhận biết | thấp | Cụm từ chung chung, người dùng đang tìm kiếm ý tưởng. |
| wedding photography | thông tin | nhận biết | thấp | Cụm từ chung về dịch vụ, cần hiển thị portfolio. |
| wedding photography inspiration | thông tin | nhận biết | thấp | Người dùng tìm kiếm ý tưởng và hình ảnh mẫu. |
| wedding photography inspo | thông tin | nhận biết | thấp | Người dùng tìm kiếm ý tưởng và hình ảnh mẫu. |
| wedding photography instagram | thông tin | nhận biết | thấp | Người dùng tìm kiếm cảm hứng qua nền tảng mạng xã hội. |

</details>

### /pricing

187 keyword, sắp theo ưu tiên. 30 cụm đầu:

| Keyword | Intent | Giai đoạn | Ưu tiên | Ghi chú |
|---|---|---|---|---|
| Phóng Sự Cưới Sài Gòn, Đường Số 4, Gò Vấp, Hồ Chí Minh | giao dịch | quyết định | cao | Khớp dịch vụ Phóng Sự Cưới tại TP.HCM. |
| báo giá phóng sự cưới | giao dịch | quyết định | cao | Khớp dịch vụ Phóng Sự Cưới tại TP.HCM. |
| báo giá quay chụp phóng sự cưới | giao dịch | quyết định | cao | Khớp dịch vụ Phóng Sự Cưới tại TP.HCM. |
| báo giá quay phim cưới 2k 4k | giao dịch | quyết định | cao | Khớp dịch vụ Quay Phóng Sự với tùy chọn 4K. |
| báo giá quay phim cưới 4k tphcm | giao dịch | quyết định | cao | Khớp dịch vụ Quay Phóng Sự tại TP.HCM. |
| báo giá quay phim cưới 4k tại tphcm | giao dịch | quyết định | cao | Khớp dịch vụ Quay Phóng Sự tại TP.HCM. |
| báo giá quay phim cưới bao nhiêu tiền | giao dịch | quyết định | cao | Khách hàng đang tìm hiểu chi phí dịch vụ quay cưới. |
| báo giá quay phim cưới hỏi | giao dịch | quyết định | cao | Khớp dịch vụ Quay Phóng Sự tại TP.HCM. |
| báo giá quay phim cưới hỏi trọn gói | giao dịch | quyết định | cao | Khớp dịch vụ Quay Phóng Sự tại TP.HCM. |
| báo giá quay phim cưới phóng sự | giao dịch | quyết định | cao | Khớp dịch vụ Quay Phóng Sự tại TP.HCM. |
| báo giá quay phim cưới tphcm | giao dịch | quyết định | cao | Khớp dịch vụ Quay Phóng Sự tại TP.HCM. |
| báo giá quay phim cưới trọn gói | giao dịch | quyết định | cao | Khớp dịch vụ Quay Phóng Sự tại TP.HCM. |
| bảng giá chụp phóng sự cưới | giao dịch | quyết định | cao | Đúng dịch vụ Phóng Sự Cưới tại TP.HCM. |
| bảng giá chụp ảnh cưới studio | giao dịch | quyết định | cao | Đúng dịch vụ Studio tại TP.HCM. |
| bảng giá chụp ảnh cưới tphcm 2024 | giao dịch | quyết định | cao | Đúng dịch vụ và địa bàn mục tiêu. |
| bảng giá chụp ảnh cưới trọn gói | giao dịch | quyết định | cao | Đúng dịch vụ trọn gói tại TP.HCM. |
| bảng giá chụp ảnh cưới tại studio | giao dịch | quyết định | cao | Đúng dịch vụ Studio tại TP.HCM. |
| bảng giá chụp ảnh cưới uy tín sài gòn | giao dịch | quyết định | cao | Đúng dịch vụ và địa bàn mục tiêu. |
| bảng giá chụp ảnh cưới uy tín tphcm | giao dịch | quyết định | cao | Đúng dịch vụ và địa bàn mục tiêu. |
| bảng giá chụp ảnh cưới uy tín tại tphcm | giao dịch | quyết định | cao | Đúng dịch vụ và địa bàn mục tiêu. |
| bảng giá chụp ảnh cưới đẹp tại tphcm | giao dịch | quyết định | cao | Khách hàng tìm kiếm báo giá cụ thể cho dịch vụ trọng tâm tại địa bàn mục tiêu. |
| bảng giá chụp ảnh cưới đẹp ở tphcm | giao dịch | quyết định | cao | Khách hàng tìm kiếm báo giá cụ thể cho dịch vụ trọng tâm tại địa bàn mục tiêu. |
| bảng giá chụp ảnh cưới ở đâu tphcm | giao dịch | quyết định | cao | Khách hàng tìm kiếm báo giá cụ thể cho dịch vụ trọng tâm tại địa bàn mục tiêu. |
| bảng giá chụp ảnh phóng sự cưới | giao dịch | quyết định | cao | Khách hàng tìm báo giá cho dịch vụ Phóng Sự Cưới mà studio cung cấp. |
| bảng giá quay phóng sự cưới | giao dịch | quyết định | cao | Khách hàng tìm báo giá cho dịch vụ Quay Phóng Sự mà studio cung cấp. |
| chụp phóng sự cưới bao nhiêu tiền | giao dịch | quyết định | cao | Cụm từ tìm kiếm trực tiếp về giá của dịch vụ trọng tâm. |
| chụp phóng sự cưới giá | giao dịch | quyết định | cao | Cụm từ tìm kiếm trực tiếp về giá của dịch vụ trọng tâm. |
| chụp phóng sự cưới giá bao nhiêu | giao dịch | quyết định | cao | Cụm từ tìm kiếm trực tiếp về giá của dịch vụ trọng tâm. |
| chụp phóng sự cưới hcm | thương mại | cân nhắc | cao | Đúng dịch vụ và địa bàn mục tiêu tại TP.HCM. |
| chụp phóng sự cưới sài gòn | thương mại | cân nhắc | cao | Đúng dịch vụ và địa bàn mục tiêu tại TP.HCM. |

<details><summary>157 keyword còn lại cho trang này</summary>

| Keyword | Intent | Giai đoạn | Ưu tiên | Ghi chú |
|---|---|---|---|---|
| chụp phóng sự cưới tphcm | thương mại | cân nhắc | cao | Đúng dịch vụ và địa bàn mục tiêu tại TP.HCM. |
| chụp phóng sự cưới uy tín tphcm | thương mại | cân nhắc | cao | Đúng dịch vụ và địa bàn mục tiêu tại TP.HCM. |
| chụp phóng sự cưới uy tín tại tphcm | thương mại | cân nhắc | cao | Đúng dịch vụ và địa bàn mục tiêu tại TP.HCM. |
| chụp phóng sự cưới ở đâu tphcm | thương mại | cân nhắc | cao | Đúng dịch vụ và địa bàn mục tiêu tại TP.HCM. |
| chụp phóng sự cưới ở đâu tốt | thương mại | cân nhắc | cao | Đúng dịch vụ và địa bàn mục tiêu tại TP.HCM. |
| chụp phóng sự đám cưới | thương mại | cân nhắc | cao | Đúng dịch vụ trọng tâm của studio. |
| chụp ảnh cưới bao nhiêu sài gòn bảng giá | giao dịch | quyết định | cao | Khách hàng tìm kiếm báo giá dịch vụ tại đúng địa bàn mục tiêu. |
| chụp ảnh cưới bao nhiêu uy tín tphcm | thương mại | cân nhắc | cao | Khách hàng tìm kiếm sự uy tín tại TP.HCM phù hợp với định vị studio. |
| chụp ảnh cưới bao nhiêu uy tín tại tphcm | thương mại | cân nhắc | cao | Khách hàng tìm kiếm sự uy tín tại TP.HCM phù hợp với định vị studio. |
| chụp ảnh cưới bao nhiêu uy tín ở sài gòn | thương mại | cân nhắc | cao | Khách hàng tìm kiếm sự uy tín tại Sài Gòn phù hợp với định vị studio. |
| chụp ảnh cưới bao nhiêu uy tín ở tphcm | thương mại | cân nhắc | cao | Khách hàng tìm kiếm sự uy tín tại TP.HCM phù hợp với định vị studio. |
| chụp ảnh cưới bao nhiêu đẹp nhất sài gòn | thương mại | cân nhắc | cao | Khách hàng tìm kiếm chất lượng và giá tại Sài Gòn phù hợp với định vị studio. |
| chụp ảnh cưới bao nhiêu đẹp ở tphcm | thương mại | cân nhắc | cao | Khách hàng tìm kiếm chất lượng và giá tại TP.HCM phù hợp với định vị studio. |
| chụp ảnh cưới bao nhiêu ở đâu tphcm | thương mại | cân nhắc | cao | Khách hàng tìm kiếm giá và địa điểm tại TP.HCM phù hợp với định vị studio. |
| chụp ảnh cưới bao nhiêu ở đâu đẹp hcm | thương mại | cân nhắc | cao | Khách hàng tìm kiếm giá và chất lượng tại HCM phù hợp với định vị studio. |
| chụp ảnh cưới phim trường giá bao nhiêu | thương mại | cân nhắc | cao | Khớp dịch vụ Pre-Wedding Studio tại TPHCM. |
| chụp ảnh cưới studio bao nhiêu tiền | thương mại | cân nhắc | cao | Khách hàng quan tâm đến chi phí dịch vụ Studio. |
| chụp ảnh cưới studio giá | thương mại | cân nhắc | cao | Khách hàng quan tâm đến chi phí dịch vụ Studio. |
| chụp ảnh cưới studio giá bao nhiêu | thương mại | cân nhắc | cao | Khách hàng quan tâm đến chi phí dịch vụ Studio. |
| chụp ảnh cưới sài gòn bảng giá | giao dịch | quyết định | cao | Khách hàng tìm kiếm thông tin chi phí cụ thể. |
| chụp ảnh cưới trọn gói tphcm | thương mại | cân nhắc | cao | Khách hàng tìm kiếm dịch vụ trọn gói tại TP.HCM. |
| chụp ảnh cưới trọn gói tại tphcm | thương mại | cân nhắc | cao | Khách hàng tìm kiếm dịch vụ trọn gói tại TP.HCM. |
| chụp ảnh phóng sự cưới giá bao nhiêu | giao dịch | quyết định | cao | Cụm từ chứa yếu tố giá cho dịch vụ cốt lõi của studio. |
| chụp ảnh phóng sự cưới tphcm | consideration | cân nhắc | cao | Cụm từ mục tiêu cho dịch vụ phóng sự cưới tại TP.HCM. |
| chụp ảnh tiệc tất niên giá bao nhiêu | giao dịch | quyết định | cao | Người dùng đang tìm kiếm thông tin báo giá cụ thể. |
| dịch vụ quay phim phóng sự cưới | giao dịch | quyết định | cao | Từ khóa trực tiếp cho gói Quay Phóng Sự của studio. |
| dịch vụ quay phim đám cưới | giao dịch | quyết định | cao | Từ khóa trực tiếp cho gói Quay Phóng Sự của studio. |
| giá chụp hình cưới sài gòn | giao dịch | quyết định | cao | Khách hàng đang tìm hiểu báo giá cho dịch vụ cưới tại TP.HCM. |
| giá chụp ảnh cưới hcm | thương mại | cân nhắc | cao | Đúng dịch vụ, đúng địa bàn và mục tiêu phân khúc trung-cao. |
| giá chụp ảnh cưới ngoại cảnh sài gòn | thương mại | cân nhắc | cao | Đúng dịch vụ Street & Studio và đúng địa bàn mục tiêu. |
| giá chụp ảnh cưới phim trường | thương mại | cân nhắc | cao | Đúng dịch vụ Pre-Wedding Studio tại TP.HCM. |
| giá chụp ảnh cưới review studio | thương mại | cân nhắc | cao | Cụm từ đánh vào khách hàng tìm kiếm dịch vụ Studio tại TP.HCM. |
| giá chụp ảnh cưới studio tphcm | thương mại | cân nhắc | cao | Đúng dịch vụ Studio và đúng địa bàn mục tiêu. |
| giá chụp ảnh cưới sài gòn | thương mại | cân nhắc | cao | Đúng dịch vụ và đúng địa bàn mục tiêu. |
| giá chụp ảnh cưới tphcm | thương mại | cân nhắc | cao | Đúng dịch vụ và đúng địa bàn mục tiêu. |
| giá chụp ảnh cưới trong nhà | thương mại | cân nhắc | cao | Cụm từ tương ứng với dịch vụ Pre-Wedding Studio. |
| giá chụp ảnh cưới uy tín hcm | thương mại | cân nhắc | cao | Đúng dịch vụ, đúng địa bàn và phân khúc cao cấp. |
| giá chụp ảnh cưới uy tín tphcm | thương mại | cân nhắc | cao | Đúng dịch vụ, đúng địa bàn và phân khúc cao cấp. |
| giá chụp ảnh cưới uy tín tại tphcm | thương mại | cân nhắc | cao | Đúng dịch vụ, đúng địa bàn và phân khúc cao cấp. |
| giá chụp ảnh cưới ở studio | thương mại | cân nhắc | cao | Đúng dịch vụ Studio tại TP.HCM. |
| giá chụp ảnh cưới ở đâu tphcm | thương mại | cân nhắc | cao | Đúng dịch vụ và đúng địa bàn mục tiêu. |
| giá quay phim chụp hình đám cưới | giao dịch | quyết định | cao | Cụm từ khóa trực diện về báo giá dịch vụ cưới tại TP.HCM. |
| giá quay phim phóng sự | giao dịch | quyết định | cao | Dịch vụ Quay Phóng Sự là sản phẩm chính của studio. |
| giá quay phim phóng sự cưới | giao dịch | quyết định | cao | Dịch vụ Quay Phóng Sự là sản phẩm chính của studio. |
| giá quay phóng sự đám cưới | giao dịch | quyết định | cao | Dịch vụ Quay Phóng Sự là sản phẩm chính của studio. |
| giá thuê quay phóng sự cưới | giao dịch | quyết định | cao | Dịch vụ Quay Phóng Sự là sản phẩm chính của studio. |
| gói chụp ảnh cưới bao nhiêu tiền | giao dịch | quyết định | cao | Cụm từ khóa trực tiếp về báo giá dịch vụ cưới. |
| gói chụp ảnh cưới gồm những gì | thông tin | cân nhắc | cao | Người dùng tìm hiểu chi tiết các hạng mục trong gói dịch vụ. |
| gói chụp ảnh cưới ngoại cảnh | giao dịch | quyết định | cao | Gói Studio & Street đáp ứng nhu cầu ngoại cảnh tại Sài Gòn. |
| gói chụp ảnh cưới studio | giao dịch | quyết định | cao | Gói Pre-Wedding Studio là sản phẩm chính của studio. |
| gói chụp ảnh cưới studio giá bao nhiêu | giao dịch | quyết định | cao | Cụm từ khóa trực tiếp về báo giá dịch vụ studio. |
| gói chụp ảnh cưới sài gòn | giao dịch | quyết định | cao | Cụm từ khóa mục tiêu tại địa bàn TP.HCM. |
| gói quay phim đám cưới | giao dịch | quyết định | cao | Dịch vụ Quay Phóng Sự là sản phẩm chính của studio. |
| mẫu báo giá quay phim | giao dịch | quyết định | cao | Cụm từ tìm kiếm trực tiếp về báo giá dịch vụ quay. |
| phóng sự cưới bao nhiêu tiền | giao dịch | quyết định | cao | Khách hàng đang trực tiếp hỏi về giá dịch vụ. |
| phóng sự cưới giá | giao dịch | quyết định | cao | Khách hàng đang trực tiếp hỏi về giá dịch vụ. |
| phóng sự cưới giá bao nhiêu | giao dịch | quyết định | cao | Khách hàng đang trực tiếp hỏi về giá dịch vụ. |
| phóng sự cưới hcm | thương mại | cân nhắc | cao | Dịch vụ phóng sự tại khu vực TP.HCM. |
| phóng sự cưới sài gòn | thương mại | cân nhắc | cao | Dịch vụ phóng sự tại khu vực Sài Gòn. |
| phóng sự cưới tphcm | thương mại | cân nhắc | cao | Dịch vụ phóng sự tại khu vực TP.HCM. |
| phóng sự cưới uy tín tại tphcm | thương mại | cân nhắc | cao | Khách hàng mục tiêu đang tìm kiếm dịch vụ phóng sự cưới cụ thể tại TP.HCM. |
| phóng sự cưới đám hỏi | thương mại | cân nhắc | cao | Khách hàng tìm kiếm dịch vụ phóng sự cho lễ đám hỏi. |
| phóng sự cưới ở đâu tphcm | thương mại | cân nhắc | cao | Khách hàng đang tìm kiếm địa chỉ cung cấp dịch vụ tại TP.HCM. |
| phóng sự đám hỏi | thương mại | cân nhắc | cao | Khách hàng tìm kiếm dịch vụ phóng sự cho lễ đính hôn. |
| pre wedding photography saigon giá bao nhiêu | thương mại | cân nhắc | cao | Từ khóa đúng dịch vụ, địa điểm và nhu cầu báo giá. |
| quay chụp phóng sự cưới giá | giao dịch | quyết định | cao | Cụm từ trực diện về báo giá dịch vụ phóng sự tại TP.HCM. |
| quay phim cưới 2k 4k tphcm | giao dịch | quyết định | cao | Đúng dịch vụ quay phóng sự chất lượng cao tại TP.HCM. |
| studio chụp ảnh cưới cao cấp tphcm | thương mại | quyết định | cao | Đúng dịch vụ, đúng địa bàn và đúng phân khúc trung-cao. |
| thuê quay phim đám cưới | giao dịch | quyết định | cao | Dịch vụ Quay Phóng Sự là dịch vụ chính của studio. |
| wedding photography saigon luxury | thương mại | cân nhắc | cao | Đúng dịch vụ, đúng địa điểm và đúng phân khúc cao cấp. |
| wedding photography vietnam đẹp tphcm | thương mại | cân nhắc | cao | Đúng dịch vụ, đúng địa điểm và mục tiêu thẩm mỹ cao. |
| báo giá quay phim chụp ảnh | giao dịch | quyết định | trung bình | Từ khóa chung về báo giá dịch vụ quay chụp. |
| báo giá quay phim cưới truyền thống | giao dịch | quyết định | trung bình | Từ khóa về dịch vụ cưới truyền thống. |
| báo giá quay phim cưới vợ | giao dịch | quyết định | trung bình | Từ khóa tìm kiếm báo giá dịch vụ đám cưới. |
| bảng giá chụp ảnh cưới giá bao nhiêu | thương mại | cân nhắc | trung bình | Cụm từ tìm kiếm chung về chi phí dịch vụ cưới. |
| bảng giá chụp ảnh cưới ngoại cảnh | thương mại | cân nhắc | trung bình | Liên quan đến gói Pre-Wedding Studio & Street. |
| bảng giá chụp ảnh cưới ở đâu đẹp | giao dịch | quyết định | trung bình | Cụm từ chứa yếu tố địa điểm không xác định cụ thể tại TP.HCM. |
| bảng giá chụp ảnh profile | giao dịch | quyết định | trung bình | Dịch vụ có sẵn nhưng chưa xác định rõ địa bàn TP.HCM. |
| chụp album ảnh cưới giá bao nhiêu | giao dịch | quyết định | trung bình | Cụm từ hỏi về chi phí nhưng không kèm yếu tố địa phương. |
| chụp bộ ảnh cưới bao nhiêu tiền | giao dịch | quyết định | trung bình | Cụm từ hỏi về chi phí nhưng không kèm yếu tố địa phương. |
| chụp ảnh chân dung giá bao nhiêu | thương mại | quyết định | trung bình | Cụm từ tìm kiếm về báo giá dịch vụ. |
| chụp ảnh cưới bao nhiêu tiền | giao dịch | quyết định | trung bình | Khách hàng tìm kiếm báo giá dịch vụ. |
| chụp ảnh cưới bao nhiêu đẹp nhất | thương mại | cân nhắc | trung bình | Cụm từ tìm kiếm về giá và chất lượng nhưng chưa giới hạn địa điểm. |
| chụp ảnh cưới bao nhiêu ở đâu là đẹp nhất | thương mại | cân nhắc | trung bình | Cụm từ tìm kiếm về giá và chất lượng nhưng chưa giới hạn địa điểm. |
| chụp ảnh cưới bao nhiêu ở đâu thì đẹp | thương mại | cân nhắc | trung bình | Cụm từ tìm kiếm về giá và chất lượng nhưng chưa giới hạn địa điểm. |
| chụp ảnh cưới bao nhiêu ở đâu đẹp | thương mại | cân nhắc | trung bình | Cụm từ tìm kiếm về giá và chất lượng nhưng chưa giới hạn địa điểm. |
| chụp ảnh cưới bao nhiêu ở đâu đẹp nhất | thương mại | cân nhắc | trung bình | Cụm từ tìm kiếm về giá và chất lượng nhưng chưa giới hạn địa điểm. |
| chụp ảnh cưới bao nhiêu ở đâu đẹp nhất việt nam | thương mại | cân nhắc | trung bình | Cụm từ tìm kiếm về giá và chất lượng nhưng phạm vi rộng hơn TP.HCM. |
| chụp ảnh cưới giá bao nhiêu | thương mại | cân nhắc | trung bình | Cụm từ tìm kiếm về báo giá chung không giới hạn địa điểm. |
| chụp ảnh cưới giá tầm bao nhiêu | thương mại | cân nhắc | trung bình | Cụm từ tìm kiếm về báo giá chung không giới hạn địa điểm. |
| chụp ảnh cưới giáp nhất | thương mại | cân nhắc | trung bình | Cụm từ tìm kiếm về giá và chất lượng nhưng không giới hạn địa điểm. |
| chụp ảnh cưới ngoại cảnh giá bao nhiêu | thương mại | cân nhắc | trung bình | Người dùng đang tham khảo mức giá cho dịch vụ ngoại cảnh. |
| giá chụp ảnh chân dung nghệ thuật | giao dịch | quyết định | trung bình | Từ khóa về giá cho dịch vụ chân dung. |
| giá chụp ảnh chân dung đen trắng | giao dịch | quyết định | trung bình | Từ khóa về giá cho dịch vụ chân dung. |
| giá chụp ảnh cưới ngoại cảnh | thương mại | cân nhắc | trung bình | Cụm từ rộng, chưa xác định rõ địa điểm cụ thể. |
| giá chụp ảnh cưới reviews | thương mại | cân nhắc | trung bình | Cụm từ chung chung, chưa xác định rõ địa điểm. |
| giá chụp ảnh cưới trọn gói | thương mại | cân nhắc | trung bình | Cụm từ rộng, chưa xác định rõ địa điểm. |
| giá chụp ảnh cưới ở đâu tốt | thương mại | cân nhắc | trung bình | Cụm từ rộng, chưa xác định rõ địa điểm. |
| pre wedding film | thương mại | cân nhắc | trung bình | Người dùng tìm kiếm dịch vụ quay phim trước đám cưới. |
| pre wedding giá bao nhiêu | thương mại | cân nhắc | trung bình | Người dùng đang tìm hiểu về chi phí dịch vụ. |
| pre wedding giá bao nhiều | thương mại | cân nhắc | trung bình | Người dùng đang tìm hiểu về chi phí dịch vụ. |
| pre wedding giá vé | thương mại | cân nhắc | trung bình | Người dùng đang tìm hiểu về chi phí dịch vụ. |
| pre wedding package | thương mại | cân nhắc | trung bình | Người dùng tìm kiếm các gói dịch vụ cụ thể. |
| quay phim ngày cưới giá | giao dịch | quyết định | trung bình | Cụm từ khóa trực tiếp hỏi về báo giá dịch vụ. |
| quay phim đám cưới bao nhiêu tiền | giao dịch | quyết định | trung bình | Cụm từ trực tiếp hỏi về chi phí. |
| quay phim đám cưới giá bao nhiêu | giao dịch | quyết định | trung bình | Cụm từ trực tiếp hỏi về chi phí. |
| thợ chụp ảnh cưới giá bao nhiêu | giao dịch | quyết định | trung bình | Khách hàng đang tìm hiểu báo giá dịch vụ. |
| wedding photography packages | thương mại | cân nhắc | trung bình | Người dùng tìm kiếm các gói dịch vụ và báo giá. |
| wedding photography studio | thương mại | cân nhắc | trung bình | Người dùng tìm kiếm dịch vụ chụp ảnh tại studio. |
| wedding photography vietnam đẹp giá bao nhiêu | thương mại | cân nhắc | trung bình | Người dùng quan tâm đến chất lượng và chi phí. |
| bảng giá chụp ảnh cưới giá rẻ | giao dịch | quyết định | thấp | Phân khúc giá rẻ không phù hợp với định vị của studio. |
| bảng giá chụp ảnh cưới giá rẻ tphcm | giao dịch | quyết định | thấp | Phân khúc giá rẻ không phù hợp với định vị của studio. |
| chụp hình cưới giá rẻ tại tphcm | giao dịch | quyết định | thấp | Từ khóa 'giá rẻ' không phù hợp với phân khúc trung-cao của studio. |
| chụp hình phóng sự cưới giá rẻ | giao dịch | quyết định | thấp | Từ khóa 'giá rẻ' không phù hợp với phân khúc trung-cao của studio. |
| chụp ảnh chân dung giá rẻ | giao dịch | quyết định | thấp | Không phù hợp với định vị không đánh giá rẻ của studio. |
| chụp ảnh chân dung giá rẻ tphcm | giao dịch | quyết định | thấp | Không phù hợp với định vị không đánh giá rẻ của studio. |
| chụp ảnh cưới bao nhiêu tphcm giá rẻ | thương mại | cân nhắc | thấp | Từ khóa chứa 'giá rẻ' không phù hợp với phân khúc trung-cao của studio. |
| chụp ảnh cưới giá rẻ | thương mại | cân nhắc | thấp | Từ khóa 'giá rẻ' không phù hợp với phân khúc trung-cao của studio. |
| chụp ảnh cưới giá rẻ tphcm | thương mại | cân nhắc | thấp | Từ khóa 'giá rẻ' không phù hợp với phân khúc trung-quan của studio. |
| chụp ảnh cưới ngoại cảnh tphcm giá rẻ | giao dịch | quyết định | thấp | Từ khóa 'giá rẻ' không phù hợp phân khúc trung-cao của studio. |
| chụp ảnh cưới rạch giá | giao dịch | quyết định | thấp | Từ khóa 'rẻ' không phù hợp phân khúc trung-cao. |
| chụp ảnh cưới rẻ đẹp ở sài gòn | giao dịch | quyết định | thấp | Từ khóa 'rẻ' không phù hợp phân khúc trung-cc. |
| chụp ảnh cưới studio giá rẻ | giao dịch | quyết định | thấp | Từ khóa 'giá rẻ' không phù hợp phân khúc trung-cao. |
| chụp ảnh cưới studio giá rẻ tphcm | giao dịch | quyết định | thấp | Từ khóa 'giá rẻ' không phù hợp phân khúc trung-cao. |
| chụp ảnh cưới sài gòn uy tín giá rẻ | giao dịch | quyết định | thấp | Từ khóa chứa 'giá rẻ' không phù hợp phân khúc trung-cao. |
| chụp ảnh cưới sài gòn ở đâu rẻ | giao dịch | quyết định | thấp | Từ khóa chứa 'rẻ' không phù hợp phân khúc trung-cao. |
| chụp ảnh cưới tphcm giá rẻ | giao dịch | quyết định | thấp | Từ khóa chứa 'giá rẻ' không phù hợp phân khúc trung-cao. |
| chụp ảnh cưới trọn gói giá bao nhiêu | thương mại | cân nhắc | thấp | Cụm từ hỏi về giá chung, chưa giới hạn địa điểm. |
| chụp ảnh cưới tầm bao nhiêu tiền | thương mại | cân nhắc | thấp | Cụm từ hỏi về giá chung, chưa giới hạn địa điểm. |
| chụp ảnh cổng cưới bao nhiêu tiền | giao dịch | quyết định | thấp | Dịch vụ trang trí cổng không nằm trong danh mục dịch vụ của studio. |
| chụp ảnh sự kiện giá | giao dịch | quyết định | thấp | Cụm từ tập trung vào báo giá. |
| chụp ảnh sự kiện giá bao nhiêu | giao dịch | quyết định | thấp | Cụm từ tập trung vào báo giá. |
| chụp ảnh sự kiện giá rẻ | giao dịch | quyết định | thấp | Không phù hợp với phân khúc trung-cao của studio. |
| chụp ảnh tiệc tất niên giá rẻ | giao dịch | quyết định | thấp | Phân khúc khách hàng không phù hợp với định vị trung-cao. |
| combo chụp ảnh cưới bao nhiêu tiền | giao dịch | quyết định | thấp | Chứa từ 'rẻ' hoặc hỏi chung về giá không xác định phân khúc cao cấp. |
| giá chụp ảnh chân dung gạo nâu | giao dịch | quyết định | thấp | Cụm từ chứa tên đối thủ hoặc phong cách cụ thể không nằm trong định vị. |
| giá chụp ảnh cưới 2023 | thương mại | cân nhắc | thấp | Cụm từ chứa năm cũ không còn phù hợp với mục tiêu hiện tại. |
| giá chụp ảnh cưới triệu cường studio | điều hướng | quyết định | thấp | Tìm kiếm tên đối thủ cụ thể. |
| giá quay phim cưới truyền thống | giao dịch | quyết định | thấp | Phong cách truyền thống không phải định vị chính của studio. |
| pre wedding giá rẻ | thương mại | cân nhắc | thấp | Phân khúc giá rẻ không phù hợp với định vị trung-cao của studio. |
| pre wedding photography saigon giá rẻ | thương mại | cân nhắc | thấp | Phân khúc giá rẻ không phù hợp với định vị trung-cao của studio. |
| quay phim 4k giá rẻ | giao dịch | quyết định | thấp | Không phù hợp với định vị phân khúc trung-cao của studio. |
| quay phim tiệc cưới giá rẻ | giao dịch | quyết định | thấp | Cụm từ chứa 'giá rẻ' không phù hợp với định vị phân khúc trung-cao. |
| quay phim đám cưới giá rẻ | giao dịch | quyết định | thấp | Cụm từ chứa 'giá rẻ' không phù hợp với định vị phân khúc trung-cao. |
| quay phim đám cưới sài gòn đi bao nhiêu | giao dịch | quyết định | thấp | Cụm từ chứa 'bao nhiêu' tập trung vào báo giá nhưng không xác định rõ phân khúc cao cấp. |
| quay phóng sự cưới giá bao nhiêu | giao dịch | quyết định | thấp | Cụm từ tập trung vào báo giá dịch vụ quay. |
| quay phóng sự đám cưới bao nhiêu tiền | giao dịch | quyết định | thấp | Cụm từ tập trung vào báo giá dịch vụ quay. |
| studio chụp ảnh cưới giá rẻ | thương mại | quyết định | thấp | Không phù hợp với định vị phân khúc trung-cao của studio. |
| studio chụp ảnh cưới rẻ đẹp ở tphcm | giao dịch | quyết định | thấp | Từ khóa 'rẻ' không phù hợp với định vị phân khúc trung-cao. |
| studio chụp ảnh cưới đẹp giá rẻ ở tphcm | giao dịch | quyết định | thấp | Từ khóa 'giá rẻ' không phù hợp với định vị phân khúc trung-cao. |
| studio sài gòn giá rẻ | thương mại | cân nhắc | thấp | Không phù hợp với định vị phân khúc trung-cao của studio. |
| wedding photographer cost | giao dịch | quyết định | thấp | Cụm từ tập trung vào chi phí và báo giá. |
| wedding photographer giá bao nhiêu | giao dịch | quyết định | thấp | Cụm từ tập trung vào chi phí và báo giá. |
| wedding photographer giá bao nhiều | thương mại | cân nhắc | thấp | Cụm từ hỏi về giá chung không xác định phân khúc cao cấp. |
| wedding photographer giá rẻ | thương mại | cân nhắc | thấp | Từ khóa 'giá rẻ' không phù hợp với định vị phân khúc trung-cao của studio. |
| wedding photographer giá rẻ tphcm | thương mại | cân nhắc | thấp | Từ khóa 'giá rẻ' không phù hợp với định vị phân khúc trung-cao của studio. |
| wedding photographer prices | thương mại | cân nhắc | thấp | Cụm từ hỏi về giá chung không xác định phân khúc cao cấp. |

</details>

### /contact

45 keyword, sắp theo ưu tiên. 30 cụm đầu:

| Keyword | Intent | Giai đoạn | Ưu tiên | Ghi chú |
|---|---|---|---|---|
| phóng sự cưới uy tín hiện nay | thương mại | cân nhắc | cao | Khách hàng tìm kiếm đơn vị uy tín để liên hệ. |
| phóng sự cưới uy tín tphcm | thương mại | cân nhắc | cao | Khách hàng tìm kiếm đơn vị uy tín tại TP.HCM. |
| pre wedding photography saigon center | điều hướng | quyết định | cao | Từ khóa đúng dịch vụ, địa điểm và đối tượng mục tiêu. |
| pre wedding photography saigon review công ty | thương mại | cân nhắc | cao | Người dùng tìm kiếm đánh giá uy tín tại Sài Gòn. |
| pre wedding photography saigon reviews | thương mại | cân nhắc | cao | Người dùng tìm kiếm đánh giá uy tín tại Sài Gòn. |
| pre wedding photography saigon uy tín chất lượng | thương mại | cân nhắc | cao | Từ khóa đúng dịch vụ, địa điểm và tiêu chuẩn chất lượng. |
| pre wedding photography saigon uy tín không | thương mại | cân nhắc | cao | Người dùng tìm kiếm sự đảm bảo về chất lượng tại Sài Gòn. |
| pre wedding photography saigon uy tín ko | thương mại | cân nhắc | cao | Người dùng tìm kiếm sự đảm bảo về chất lượng tại Sài Gòn. |
| pre wedding photography saigon đẹp không | thương mại | cân nhắc | cao | Người dùng tìm kiếm chất lượng nghệ thuật tại Sài Gòn. |
| pre wedding photography saigon đẹp lắm | thương mại | cân nhắc | cao | Người dùng tìm kiếm chất lượng nghệ thuật tại Sài Gòn. |
| pre wedding photography saigon đẹp nhất | thương mại | cân nhắc | cao | Người dùng tìm kiếm đơn vị xuất sắc nhất tại Sài Gòn. |
| pre wedding photography saigon đẹp trai | thương mại | cân nhắc | cao | Người dùng tìm kiếm chất lượng nghệ thuật tại Sài Gòn. |
| wedding photography vietnam ở đâu tphcm | điều hướng | quyết định | cao | Người dùng tìm địa chỉ cụ thể tại TP.HCM. |
| chụp ảnh chân dung reviews | thương mại | cân nhắc | trung bình | Khách hàng tìm kiếm đánh giá thực tế từ khách cũ. |
| Aloha studio, Hồ Văn Huê, Đức Nhuận, Hồ Chí Minh | điều hướng | quyết định | thấp | Tìm kiếm đối thủ cạnh tranh trực tiếp tại địa phương. |
| Aloha studio, Hồ Văn Huê, Đức Nhuận, Sài Gòn | điều hướng | quyết định | thấp | Tìm kiếm đối thủ cạnh tranh trực tiếp tại địa phương. |
| Dich vụ quay phim sự kiện - Sài Gòn Việt, Đường Lũy Bán Bích, Tân Sơn Nhì, Hồ Chí Minh | điều hướng | quyết định | thấp | Tìm kiếm đối thủ cạnh tranh trực tiếp tại địa phương. |
| HB Studio - Chụp ảnh Profile, Sinh Nhật &amp; Chụp Hình Thẻ Passport, Visa - Thủ Đức, Đường số 9, Phước Long, Hồ Chí Minh | điều hướng | quyết định | thấp | Tìm kiếm đối thủ cạnh tranh trực tiếp tại địa phương. |
| HB Studio - Chụp ảnh Profile, Sinh Nhật &amp; Chụp Hình Thẻ Passport, Visa - Thủ Đức, Đường số 9, Phước Long, Sài Gòn | điều hướng | quyết định | thấp | Tìm kiếm đối thủ cạnh tranh trực tiếp tại địa phương. |
| HY WEDDING PHOTOGRAPHY, Bàn Cờ, Hồ Chí Minh, Vietnam | điều hướng | quyết định | thấp | Tìm kiếm đối thủ cạnh tranh trực tiếp tại địa phương. |
| HY WEDDING PHOTOGRAPHY, Bàn Cờ, Sài Gòn, Vietnam | điều hướng | quyết định | thấp | Tìm kiếm đối thủ cạnh tranh trực tiếp tại địa phương. |
| MABOO Studio - chụp ảnh gia đình, ảnh bầu và ảnh cưới, Lake View, Quận 2, An Khánh, Hồ Chí Minh | điều hướng | quyết định | thấp | Tìm kiếm đối thủ cạnh tranh trực tiếp tại địa phương. |
| MABOO Studio - chụp ảnh gia đình, ảnh bầu và ảnh cưới, Lake View, Quận 2, An Khánh, Sài Gòn | điều hướng | quyết định | thấp | Tìm kiếm đối thủ cạnh tranh trực tiếp tại địa phương. |
| The Nate Presents | Wedding Photography, Đường Lê Đức Thọ, Gò Vấp, Hồ Chí Minh, Vietnam | điều hướng | quyết định | thấp | Tìm kiếm đối thủ cạnh tranh trực tiếp tại địa phương. |
| The Nate Presents | Wedding Photography, Đường Lê Đức Thọ, Gò Vấp, Sài Gòn, Vietnam | điều hướng | quyết định | thấp | Tìm kiếm đối thủ cạnh tranh trực tiếp tại địa phương. |
| Thien Tong Photography | Vietnam Elopement Destination Intimate Wedding Photography, Đường Trần Huy Liệu, Cầu Kiệu, Hồ Chí Minh | điều hướng | quyết định | thấp | Tìm kiếm đối thủ cạnh tranh trực tiếp tại địa phương. |
| Thien Tong Photography | Vietnam Elopement Destination Intimate Wedding Photography, Đường Trần Huy Liệu, Cầu Kiệu, Hồ Chí Minh, Vietnam | điều hướng | quyết định | thấp | Tìm kiếm đối thủ cạnh tranh trực tiếp tại địa phương. |
| Thien Tong Photography | Vietnam Elopement Destination Intimate Wedding Photography, Đường Trần Huy Liệu, Cầu Kiệu, Sài Gòn | điều hướng | quyết định | thấp | Tìm kiếm đối thủ cạnh tranh trực tiếp tại địa phương. |
| Thien Tong Photography | Vietnam Elopement Destination Intimate Wedding Photography, Đường Trần Huy Liệu, Cầu Kiệu, Sài Gòn, Vietnam | điều hướng | quyết định | thấp | Tìm kiếm đối thủ cạnh tranh trực tiếp tại địa phương. |
| TuArt Wedding - Studio chụp hình cưới đẹp Hồ Chí Minh, Hồ Văn Huê, Đức Nhuận, Sài Gòn | điều hướng | quyết định | thấp | Tìm kiếm đối thủ cạnh tranh trực tiếp tại địa phương. |

<details><summary>15 keyword còn lại cho trang này</summary>

| Keyword | Intent | Giai đoạn | Ưu tiên | Ghi chú |
|---|---|---|---|---|
| giá chụp ảnh profile gạo nâu | điều hướng | quyết định | thấp | Từ khóa thương hiệu của đối thủ cạnh tranh. |
| gói chụp ảnh cưới harmony | điều hướng | quyết định | thấp | Từ khóa thương hiệu của đối thủ cạnh tranh. |
| photo7 studio wedding photographer reviews | điều hướng | quyết định | thấp | Tìm kiếm đánh giá của đối thủ cạnh tranh. |
| pre wedding photography saigontourist | điều hướng | quyết định | thấp | Người dùng tìm kiếm một đơn vị cụ thể không phải PhatBo. |
| pre wedding photoshoot singapore | điều hướng | quyết định | thấp | Địa điểm không thuộc phạm vi phục vụ tại TP.HCM. |
| quay phim cưới đẹp gia huy | điều hướng | quyết định | thấp | Tìm kiếm tên thương hiệu đối thủ cụ thể. |
| salim chụp ảnh cưới ở đâu | điều hướng | quyết định | thấp | Tìm kiếm thương hiệu đối thủ cụ thể. |
| shooting star studio | điều hướng | quyết định | thấp | Tìm kiếm thương hiệu đối thủ cụ thể. |
| storyteller wedding photographer reviews | điều hướng | quyết định | thấp | Tìm kiếm thương hiệu đối thủ cụ thể. |
| studio chụp ảnh cưới đẹp trọn gói tphcm sansan bridal | điều hướng | quyết định | thấp | Tìm kiếm tên đối thủ cụ thể. |
| the wedverse wedding photographer reviews | điều hướng | cân nhắc | thấp | Tìm kiếm đối thủ cạnh tranh trực tiếp. |
| wedding photographers near me | điều hướng | quyết định | thấp | Cụm từ dựa trên vị trí, cần chuyển hướng về liên hệ ngay. |
| wedding photography invoice | giao dịch | quyết định | thấp | Người dùng tìm kiếm hóa đơn hoặc thông tin thanh toán. |
| Ảnh, Maboo studio, Đường Lê Đức Thọ, An Nhơn, Hồ Chí Minh | điều hướng | quyết định | thấp | Người dùng tìm kiếm một đối thủ cụ thể trên bản đồ hoặc thông tin liên hệ. |
| Ảnh, Maboo studio, Đường Lê Đức Thọ, An Nhơn, Sài Gòn | điều hướng | quyết định | thấp | Người dùng tìm kiếm một đối thủ cụ thể trên bản đồ hoặc thông tin liên hệ. |

</details>

### Blog (chưa có — cần tạo)

120 keyword, sắp theo ưu tiên. 30 cụm đầu:

| Keyword | Intent | Giai đoạn | Ưu tiên | Ghi chú |
|---|---|---|---|---|
| review chụp ảnh cưới sài gòn | thương mại | cân nhắc | cao | Cụm từ tìm kiếm đánh giá các đơn vị tại TP.HCM. |
| review các studio chụp ảnh cưới đẹp ở sài gòn | thương mại | cân nhắc | cao | Cụm từ tìm kiếm đánh giá các đơn vị tại TP.HCM. |
| review studio chụp ảnh cưới tphcm | thương mại | cân nhắc | cao | Cụm từ tìm kiếm đánh giá các đơn vị tại TP.HCM. |
| chụp phóng sự cưới là sao | thông tin | nhận biết | trung bình | Người dùng cần kiến thức cơ bản về loại hình chụp ảnh. |
| chụp phóng sự cưới và chụp truyền thống | thông tin | nhận biết | trung bình | Người dùng đang tìm hiểu sự khác biệt giữa các phong cách. |
| chụp phóng sự đám cưới là gì | thông tin | nhận biết | trung bình | Người dùng cần kiến thức cơ bản về loại hình chụp ảnh. |
| chụp ảnh cưới bao nhiêu concept | thông tin | nhận biết | trung bình | Cụm từ tìm kiếm ý tưởng và kiến thức về dịch vụ cưới. |
| chụp ảnh cưới bao nhiêu review 2024 | thông tin | cân nhắc | trung bình | Khách hàng đang tìm kiếm đánh giá và tham khảo thông tin. |
| chụp ảnh cưới bao nhiêu review chỗ | thông tin | cân nhắc | trung bình | Khách hàng đang tìm kiếm đánh giá và tham khảo thông tin. |
| chụp ảnh cưới bao nhiêu review là đẹp | thông tin | cân nhắc | trung bình | Khách hàng đang tìm kiếm đánh giá và tham khảo thông tin. |
| chụp ảnh cưới bao nhiêu review phim | thông tin | cân nhắc | trung bình | Khách hàng tìm kiếm thông tin về dịch vụ quay phóng sự. |
| chụp ảnh cưới bao nhiêu review studio | thông tin | cân nhắc | trung bình | Khách hàng đang tìm kiếm đánh giá và tham khảo thông tin. |
| chụp ảnh cưới bao nhiêu reviews | thông tin | cân nhắc | trung bình | Khách hàng đang tìm kiếm đánh giá và tham khảo thông tin. |
| chụp ảnh cưới bao nhiêu sài gòn địa điểm | thông tin | nhận biết | trung bình | Khách hàng tìm kiếm thông tin về bối cảnh/địa điểm. |
| chụp ảnh cưới cinematic là gì | thông tin | nhận biết | trung bình | Cụm từ hỏi kiến thức về phong cách cinematic mà studio đang theo đuổi. |
| chụp ảnh cưới luxury là gì | thông tin | nhận biết | trung bình | Cụm từ hỏi kiến thức về phong cách luxury mà studio đang hướng tới. |
| các kiểu chụp ảnh cưới ngoại cảnh đẹp | thông tin | nhận biết | trung bình | Cần nội dung gợi ý cảm hứng cho khách hàng trước khi chọn gói. |
| cách chụp ảnh profile đẹp | thông tin | nhận biết | trung bình | Thu hút khách hàng tiềm năng cho dịch vụ chân dung doanh nhân. |
| giá chụp ảnh cưới review phim | thương mại | cân nhắc | trung bình | Cụm từ liên quan đến phong cách cinematic mà studio đang định vị. |
| những phim trường chụp ảnh cưới đẹp ở tphcm | thông tin | cân nhắc | trung bình | Cần nội dung tư vấn bối cảnh cho khách hàng tại TP.HCM. |
| nên chụp ảnh cưới ở đâu | thông tin | nhận biết | trung bình | Cần nội dung tư vấn để dẫn dắt khách hàng. |
| phim cưới vợ cho cha quay ở đâu | thông tin | cân nhắc | trung bình | Cần nội dung tư vấn về các gói quay đặc biệt. |
| quay phim truyền thống và phóng sự | thông tin | cân nhắc | trung bình | Cụm từ so sánh, cần nội dung tư vấn để khách hàng chọn lựa. |
| review studio chụp ảnh cưới đẹp ở tphcm | thông tin | cân nhắc | trung bình | Cần nội dung đánh giá tại địa phương để thu hút khách hàng đang cân nhắc. |
| so sánh chụp ảnh phóng sự và truyền thống | thông tin | cân nhắc | trung bình | Người dùng đang tìm hiểu kiến thức trước khi quyết định loại hình chụp. |
| wedding photography vietnam review công ty | thông tin | cân nhắc | trung bình | Người dùng tìm kiếm đánh giá và uy tín của đơn vị. |
| wedding photography vietnam reviews | thông tin | cân nhắc | trung bình | Người dùng tìm kiếm đánh giá và uy tín của đơn vị. |
| wedding photography vietnam uy tín không | thông tin | cân nhắc | trung bình | Người dùng tìm kiếm sự đảm bảo về chất lượng dịch vụ. |
| ashley spagnolo wedding photographer reviews | thông tin | cân nhắc | thấp | Tìm kiếm đánh giá từ khách hàng khác. |
| bayley william wedding photographer reviews | thông tin | cân nhắc | thấp | Tìm kiếm đánh giá từ khách hàng khác. |

<details><summary>90 keyword còn lại cho trang này</summary>

| Keyword | Intent | Giai đoạn | Ưu tiên | Ghi chú |
|---|---|---|---|---|
| best wedding photographer reviews | thông tin | cân nhắc | thấp | Người dùng đang tìm kiếm đánh giá và ý kiến từ bên thứ ba. |
| best wedding photographer reviews examples | thông tin | cân nhắc | thấp | Người dùng tìm kiếm ví dụ về đánh giá để tham khảo. |
| bảng giá chụp ảnh cưới review công ty | thương mại | cân nhắc | thấp | Cụm từ tìm kiếm đánh giá và uy tín thương hiệu. |
| bảng giá chụp ảnh cưới review studio | thương mại | cân nhắc | thấp | Cụm từ tìm kiếm đánh giá và uy tín thương hiệu. |
| bảng giá chụp ảnh cưới reviews | thương mại | cân nhắc | thấp | Cụm từ tìm kiếm đánh giá và uy tín thương hiệu. |
| chụp phóng sự cưới tiếng anh là gì | thông tin | nhận biết | thấp | Cụm từ mang tính tra cứu ngôn ngữ, không trực tiếp chuyển đổi. |
| chụp ảnh chân dung bằng iphone | thông tin | nhận biết | thấp | Người dùng tìm kiếm giải pháp tự thực hiện, không thuê studio. |
| chụp ảnh chân dung linkedin là gì | thông tin | nhận biết | thấp | Cụm từ tìm kiếm thông tin khái niệm. |
| chụp ảnh chân dung là như thế nào | thông tin | nhận biết | thấp | Cụm từ tìm kiếm thông tin khái niệm. |
| chụp ảnh chân dung trên điện thoại | thông tin | nhận biết | thấp | Người dùng tìm kiếm giải pháp tự thực hiện. |
| chụp ảnh chân dung với hoa | thông tin | nhận biết | thấp | Cụm từ mang tính tìm kiếm ý tưởng và cảm hứng sáng tạo. |
| chụp ảnh chân dung đẹp bằng iphone | thông tin | nhận biết | thấp | Đối tượng tìm kiếm giải pháp tự chụp, không thuộc phân khúc dịch vụ cao cấp của studio. |
| chụp ảnh chân dung đẹp bằng điện thoại | thông tin | nhận biết | thấp | Đối tượng tìm kiếm giải pháp tự chụp, không thuộc phân khúc dịch vụ cao cấp của studio. |
| chụp ảnh chân dung ở đâu đẹp | thông tin | nhận biết | thấp | Cụm từ tìm kiếm thông tin chung, chưa xác định địa bàn cụ thể. |
| chụp ảnh cưới bao nhiêu sài gòn xưa | thông tin | nhận biết | thấp | Cụm từ tìm kiếm một phong cách cụ thể không phải thế mạnh chính của studio. |
| chụp ảnh cưới mất bao nhiêu thời gian | thông tin | nhận biết | thấp | Người dùng đang tìm hiểu thông tin chung về quy trình. |
| chụp ảnh cưới ngoại cảnh là gì | thông tin | nhận biết | thấp | Người dùng đang tìm hiểu khái niệm cơ bản. |
| chụp ảnh cưới ngoại cảnh review studio | thông tin | cân nhắc | thấp | Người dùng đang tìm kiếm đánh giá từ bên thứ ba. |
| chụp ảnh cưới ngoại cảnh review địa điểm | thông tin | cân nhắc | thấp | Người dùng đang tìm kiếm cảm hứng về bối cảnh. |
| chụp ảnh cưới ngoại cảnh reviews | thông tin | cân nhắc | thấp | Người dùng tìm kiếm đánh giá chung về dịch vụ. |
| chụp ảnh cưới studio phong cách hàn quốc | thông tin | cân nhắc | thấp | Người dùng tìm kiếm cảm hứng về một phong cách cụ thể. |
| chụp ảnh cưới trước bao nhiêu ngày | thông tin | nhận biết | thấp | Khách hàng tìm kiếm thông tin quy trình, chưa chọn đơn vị. |
| chụp ảnh cưới ở đâu voz | thông tin | nhận biết | thấp | Người dùng tìm kiếm thảo luận trên diễn đàn, chưa có ý định đặt dịch vụ cụ thể. |
| chụp ảnh profile là gì | thông tin | nhận biết | thấp | Người dùng đang tìm hiểu khái niệm cơ bản. |
| chụp ảnh sự kiện như thế nào | thông tin | nhận biết | thấp | Người dùng đang tìm hiểu cách thức thực hiện. |
| chụp ảnh tiệc tất niên background | thông tin | nhận biết | thấp | Người dùng đang tìm kiếm ý tưởng/hình ảnh nền. |
| chụp ảnh tiệc tất niên canva | thông tin | nhận biết | thấp | Người dùng tìm công cụ tự thiết kế, không phải thuê dịch vụ. |
| chụp ảnh tiệc tất niên hội tay vịn | thông tin | nhận biết | thấp | Cụm từ mang tính chất nội dung/vui vẻ, không trực diện dịch vụ. |
| chụp ảnh tiệc tất niên phông | thông tin | nhận biết | thấp | Người dùng tìm kiếm mẫu thiết kế phông. |
| chụp ảnh tiệc tất niên png | thông tin | nhận biết | thấp | Người dùng tìm file đồ họa để tự thiết kế. |
| cinematic wedding video download | thông tin | nhận biết | thấp | Người dùng tìm tài liệu/phần mềm, không phải thuê dịch vụ. |
| cinematic wedding video editing | thông tin | nhận biết | thấp | Tìm kiếm kiến thức về hậu kỳ. |
| cinematic wedding video marathi | thông tin | nhận biết | thấp | Thị trường không phải mục tiêu (ngôn ngữ khác). |
| cinematic wedding video prices india | thương mại | cân nhắc | thấp | Thị trường không phải mục tiêu. |
| cinematic wedding video songs | thông tin | nhận biết | thấp | Tìm kiếm tài nguyên âm nhạc. |
| cinematic wedding video template free download | thông tin | nhận biết | thấp | Người dùng tìm công cụ miễn phí. |
| cách chụp ảnh chân dung chuyên nghiệp | thông tin | nhận biết | thấp | Từ khóa mang tính kiến thức chung, không trực tiếp bán dịch vụ. |
| cách chụp ảnh chân dung đẹp | thông tin | nhận biết | thấp | Từ khóa kiến thức chung, không trực tiếp bán dịch vụ. |
| indian wedding photographer reviews examples | thông tin | nhận biết | thấp | Đối tượng khách quốc tế nhưng chưa phải trọng tâm chính. |
| phim ngày mai mai cưới quay ở đâu | thông tin | cân nhắc | thấp | Tìm kiếm nội dung cụ thể của một bộ phim/trào lưu. |
| phim phóng sự cưới là gì | thông tin | nhận biết | thấp | Người dùng đang tìm hiểu khái niệm cơ bản. |
| phóng sự cưới là gì | thông tin | nhận biết | thấp | Người dùng đang tìm hiểu khái niệm cơ bản. |
| phóng sự cưới tiếng anh là gì | thông tin | nhận biết | thấp | Người dùng tìm kiếm thông tin ngôn ngữ. |
| phóng sự cưới voz | thông tin | nhận biết | thấp | Cụm từ tìm kiếm mang tính chất tham khảo cộng đồng, không trực diện vào dịch vụ. |
| phóng sự cưới và truyền thống | thông tin | nhận biết | thấp | Người dùng đang tìm hiểu về sự khác biệt giữa các phong cách quay chụp. |
| phóng sự đám cưới là gì | thông tin | nhận biết | thấp | Người dùng đang tìm hiểu khái niệm cơ bản. |
| portrait photography for beginners | thông tin | nhận biết | thấp | Cụm từ dành cho người mới bắt đầu, không phải khách hàng mục tiêu. |
| pre wedding là gì | thông tin | nhận biết | thấp | Người dùng đang tìm hiểu khái niệm cơ bản. |
| pre wedding movie review | thông tin | nhận biết | thấp | Người dùng tìm kiếm nội dung giải trí hoặc tham khảo. |
| pre wedding movie review in telugu | thông tin | nhận biết | thấp | Từ khóa không thuộc đối tượng khách hàng mục tiêu. |
| pre wedding quotes | thông tin | nhận biết | thấp | Người dùng tìm nội dung chữ cho đám cưới, không phải dịch vụ ảnh. |
| pre wedding shoot dresses | thông tin | nhận biết | thấp | Người dùng đang tìm kiếm thông tin về trang phục. |
| pre wedding shoot movie review | thông tin | nhận biết | thấp | Người dùng tìm kiếm nội dung giải trí/phim ảnh. |
| pre wedding shoot review | thông tin | cân nhắc | thấp | Người dùng tìm đánh giá, trải nghiệm thực tế. |
| pre wedding show movie review | thông tin | nhận biết | thấp | Người dùng tìm nội dung giải trí/phim ảnh. |
| pre wedding show review | thông tin | nhận biết | thấp | Người dùng tìm đánh giá, trải nghiệm thực tế. |
| pre wedding show review 123telugu | điều hướng | quyết định | thấp | Từ khóa liên quan đến nội dung phim ảnh không liên quan đến dịch vụ. |
| pre wedding show review in telugu | điều hướng | quyết định | thấp | Từ khóa liên quan đến nội dung phim ảnh không liên quan đến dịch vụ. |
| pre wedding đẹp là gì | thông tin | nhận biết | thấp | Người dùng đang tìm hiểu kiến thức cơ bản. |
| quay phim 4k | thông tin | nhận biết | thấp | Cụm từ quá rộng, không giới hạn cho dịch vụ cưới. |
| quay phim 4k iphone | thông tin | nhận biết | thấp | Không liên quan đến dịch vụ chuyên nghiệp của studio. |
| quay phim 4k là gì | thông tin | nhận biết | thấp | Người dùng tìm hiểu khái niệm kỹ thuật. |
| quay phim 4k và full hd | thông tin | nhận biết | thấp | Người dùng tìm hiểu kiến thức kỹ thuật. |
| quay phim cưới review phim | thông tin | nhận biết | thấp | Người dùng tìm kiếm nội dung giải trí hoặc tham khảo. |
| quay phim cưới reviews | thông tin | nhận biết | thấp | Người dùng tìm kiếm nội dung giải trí hoặc tham khảo. |
| quay phim phóng sự cưới là gì | thông tin | nhận biết | thấp | Cụm từ hỏi kiến thức, cần nội dung blog để giải thích. |
| quay phim phóng sự là gì | thông tin | nhận biết | thấp | Cụm từ hỏi kiến thức chung về kỹ thuật. |
| quay phim đám cưới sài gòn đi mấy giờ | thông tin | cân nhắc | thấp | Cụm từ hỏi về quy trình/thời gian biểu của buổi quay. |
| quay phim đám cưới truyền thống | thông tin | nhận biết | thấp | Cụm từ tìm hiểu về loại hình dịch vụ chung. |
| quay phóng sự cưới bằng điện thoại | thông tin | nhận biết | thấp | Cụm từ tìm kiếm giải pháp giá rẻ/cá nhân, không thuộc phân khúc cao cấp. |
| quay phóng sự như thế nào | thông tin | nhận biết | thấp | Cụm từ tìm hiểu kiến thức về dịch vụ. |
| review phóng sự cưới | thông tin | cân nhắc | thấp | Cụm từ tìm kiếm đánh giá dịch vụ quay. |
| review studio chụp ảnh cưới đẹp | thông tin | cân nhắc | thấp | Người dùng đang tìm kiếm đánh giá chung, chưa xác định địa điểm cụ thể. |
| top máy ảnh chụp chân dung đẹp giá rẻ | thông tin | nhận biết | thấp | Cụm từ 'giá rẻ' và nội dung về thiết bị không thuộc dịch vụ chính. |
| vietnam wedding photographer reviewer | thông tin | cân nhắc | thấp | Người dùng đang tìm kiếm đánh giá từ bên thứ ba. |
| vietnam wedding photographer reviews | thông tin | cân nhắc | thấp | Người dùng đang tìm kiếm đánh giá từ bên thứ ba. |
| vietnam wedding photographer uy tín không | thông tin | cân nhắc | thấp | Người dùng đang cân nhắc về độ tin cậy của dịch vụ. |
| wedding film 4k download | thông tin | nhận biết | thấp | Người dùng tìm nội dung miễn phí/tải về, không phải khách hàng mục tiêu. |
| wedding film 4k free | thông tin | nhận biết | thấp | Người dùng tìm nội dung miễn phí, không phải khách hàng mục tiêu. |
| wedding film 4k free download | thông tin | nhận biết | thấp | Người dùng tìm nội dung miễn phí, không phải khách hàng mục tiêu. |
| wedding film 4k wallpaper | thông tin | nhận biết | thấp | Người dùng tìm hình nền, không phải khách hàng mục tiêu. |
| wedding photographer reviews examples | thông tin | nhận biết | thấp | Người dùng tìm kiếm ví dụ về đánh giá. |
| wedding photographer salary | thông tin | nhận biết | thấp | Đối tượng tìm kiếm là người làm nghề, không phải khách hàng thuê dịch vụ. |
| địa điểm chụp ảnh cưới ngoại cảnh sài gòn | thông tin | cân nhắc | thấp | Người dùng đang tìm kiếm ý tưởng bối cảnh thay vì chọn đơn vị cụ thể. |
| địa điểm chụp ảnh cưới sài gòn | thông tin | cân nhắc | thấp | Người dùng đang tìm kiếm ý tưởng bối cảnh thay vì chọn đơn vị cụ thể. |
| địa điểm chụp ảnh cưới tphcm | thông tin | cân nhắc | thấp | Người dùng đang tìm kiếm ý tưởng bối cảnh thay vì chọn đơn vị cụ thể. |
| địa điểm chụp ảnh cưới đẹp ở sài gòn | thông tin | cân nhắc | thấp | Người dùng đang tìm kiếm ý tưởng bối cảnh thay vì chọn đơn vị cụ thể. |
| quay phóng sự đám cưới là gì | thông tin | nhận biết | thớp | Cụm từ tìm hiểu khái niệm dịch vụ. |
| review chụp ảnh cưới | thông tin | cân nhắc | thớp | Cụm từ tìm kiếm đánh giá chung. |
| review studio chụp ảnh cưới | thông tin | cân nhắc | thớp | Cụm từ tìm kiếm đánh giá chung. |

</details>

### Trang mới (chưa có)

213 keyword, sắp theo ưu tiên. 30 cụm đầu:

| Keyword | Intent | Giai đoạn | Ưu tiên | Ghi chú |
|---|---|---|---|---|
| Chụp ảnh Profile chuyên nghiệp, Nguyễn Đình Chiểu, Bàn Cờ, Hồ Chí Minh | giao dịch | quyết định | cao | Khớp dịch vụ chân dung doanh nhân tại TP.HCM. |
| Dịch Vụ Quay Phim Sự Kiện | Chụp Hình Event - Hội Thảo - Hội Nghị, Khu Phố 2a, Tân Thới Hiệp, Hồ Chí Minh | giao dịch | quyết định | cao | Khớp dịch vụ chụp sự kiện/tất niên tại TP.HCM. |
| Dịch vụ chụp hình Sự kiện - Hội nghị - Khai trương Sài Gòn, Đường Cây Keo, Phú Thạnh, Hồ Chí Minh | giao dịch | quyết định | cao | Khớp dịch vụ chụp sự kiện/tất niên tại TP.HCM. |
| chụp hình profile doanh nhân | thương mại | cân nhắc | cao | Đúng dịch vụ chân dung doanh nhân mục tiêu của studio. |
| chụp hình sự kiện tphcm | thương mại | cân nhắc | cao | Đúng dịch vụ sự kiện tại khu vực TP.HCM. |
| chụp phóng sự cưới review công ty | thương mại | cân nhắc | cao | Cần trang dịch vụ chuyên biệt cho khách hàng doanh nghiệp. |
| chụp profile chuyên nghiệp | thương mại | cân nhắc | cao | Đúng dịch vụ chân dung doanh nhân phân khúc trung cao. |
| chụp profile doanh nghiệp | thương mại | cân nhắc | cao | Đúng dịch vụ sự kiện công ty/tất niên của studio. |
| chụp profile doanh nhân | thương mại | cân nhắc | cao | Đúng dịch vụ chân dung chuyên nghiệp cho đối tượng mục tiêu. |
| chụp ảnh chân dung cho lãnh đạo doanh nghiệp | thương mại | cân nhắc | cao | Đúng đối tượng khách hàng cao cấp tại TP.HCM. |
| chụp ảnh chân dung chuyên nghiệp | thương mại | cân nhắc | cao | Đúng dịch vụ chân dung cao cấp tại Sài Gòn. |
| chụp ảnh chân dung nghề nghiệp | thương mại | cân nhắc | cao | Đúng dịch vụ chân dung chuyên nghiệp cho doanh nhân. |
| chụp ảnh chân dung review công ty | thương mại | cân nhắc | cao | Đúng dịch vụ sự kiện/hình ảnh cho doanh nghiệp. |
| chụp ảnh chân dung studio | thương mại | cân nhắc | cao | Đúng dịch vụ tại studio ở Sài Gòn. |
| chụp ảnh chân dung sài gòn | thương mại | cân nhắc | cao | Đúng dịch vụ và địa bàn mục tiêu. |
| chụp ảnh chân dung uy tín hcm | thương mại | cân nhắc | cao | Đúng dịch vụ và địa bàn mục tiêu. |
| chụp ảnh chân dung uy tín tphcm | thương mại | cân nhắc | cao | Đúng dịch vụ và địa bàn mục tiêu. |
| chụp ảnh chân dung uy tín tại tphcm | thương mại | cân nhắc | cao | Khách hàng tìm kiếm dịch vụ chân dung chuyên nghiệp tại đúng địa bàn mục tiêu. |
| chụp ảnh chân dung đẹp tphcm | thương mại | cân nhắc | cao | Khách hàng tìm dịch vụ chuyên nghiệp tại đúng địa bàn mục tiêu. |
| chụp ảnh chân dung ở sài gòn | thương mại | cân nhắc | cao | Khách hàng tìm dịch vụ chuyên nghiệp tại đúng địa bàn mục tiêu. |
| chụp ảnh chân dung ở tphcm | thương mại | cân nhắc | cao | Khách hàng tìm dịch vụ chuyên nghiệp tại đúng địa bàn mục tiêu. |
| chụp ảnh chân dung ở đâu đẹp tphcm | thương mại | cân nhắc | cao | Khách hàng tìm dịch vụ chuyên nghiệp tại đúng địa bàn mục tiêu. |
| chụp ảnh doanh nhân chuyên nghiệp | thương mại | cân nhắc | cao | Đúng dịch vụ chân dung doanh nhân và phân khúc trung-cao. |
| chụp ảnh doanh nhân hcm | thương mại | cân nhắc | cao | Đúng dịch vụ chân dung và đúng địa bàn TP.HCM. |
| chụp ảnh doanh nhân nam | thương mại | cân nhắc | cao | Đúng dịch vụ chân dung và phân khúc khách hàng mục tiêu. |
| chụp ảnh doanh nhân nữ | thương mại | cân nhắc | cao | Đúng dịch vụ chân dung và phân khúc khách hàng mục tiêu. |
| chụp ảnh doanh nhân review công ty | thương mại | cân nhắc | cao | Đúng dịch vụ chân dung và phân khúc khách hàng mục tiêu. |
| chụp ảnh doanh nhân review phim | thương mại | cân nhắc | cao | Đúng dịch vụ chân dung và phân khúc khách hàng mục tiêu. |
| chụp ảnh doanh nhân review đẹp | thương mại | cân nhắc | cao | Đúng dịch vụ chân dung và phân khúc khách hàng mục tiêu. |
| chụp ảnh doanh nhân reviews | thương mại | cân nhắc | cao | Đúng dịch vụ chân dung và phân khúc khách hàng mục tiêu. |

<details><summary>183 keyword còn lại cho trang này</summary>

| Keyword | Intent | Giai đoạn | Ưu tiên | Ghi chú |
|---|---|---|---|---|
| chụp ảnh doanh nhân thủ đức | thương mại | cân nhắc | cao | Đúng dịch vụ chân dung và nằm trong khu vực TP.HCM. |
| chụp ảnh doanh nhân tphcm | thương mại | cân nhắc | cao | Đúng dịch vụ chân dung và đúng địa bàn TP.HCM. |
| chụp ảnh doanh nhân uy tín hcm | thương mại | cân nhắc | cao | Đúng dịch vụ chân dung và đúng địa bàn TP.HCM. |
| chụp ảnh doanh nhân uy tín tphcm | thương mại | cân nhắc | cao | Đúng dịch vụ chân dung và đúng địa bàn TP.HCM. |
| chụp ảnh doanh nhân uy tín tại tphcm | thương mại | cân nhắc | cao | Đúng dịch vụ chân dung và đúng địa bàn TP.HCM. |
| chụp ảnh doanh nhân đẹp | thương mại | cân nhắc | cao | Đúng dịch vụ chân dung và phân khúc khách hàng mục tiêu. |
| chụp ảnh doanh nhân ở đâu | thương mại | cân nhắc | cao | Đúng dịch vụ chân dung và phân khúc khách hàng mục tiêu. |
| chụp ảnh doanh nhân ở đâu tphcm | thương mại | cân nhắc | cao | Đúng dịch vụ chân dung và đúng địa bàn TP.HCM. |
| chụp ảnh doanh nhân ở đâu đẹp tphcm | consideration | cân nhắc | cao | Đúng dịch vụ chân dung, đúng địa bàn TP.HCM và phân khúc trung-cao. |
| chụp ảnh profile nam | thương mại | cân nhắc | cao | Đúng dịch vụ chân dung doanh nhân tại TP.HCM. |
| chụp ảnh profile nữ | thương mại | cân nhắc | cao | Đúng dịch vụ chân dung doanh nhân tại TP.HCM. |
| chụp ảnh profile tphcm | thương mại | cân nhắc | cao | Đúng dịch vụ chân dung và đúng địa bàn TP.HCM. |
| chụp ảnh profile uy tín hcm | thương mại | cân nhắc | cao | Đúng dịch vụ chân dung và đúng địa bàn TP.HCM. |
| chụp ảnh profile uy tín tphcm | thương mại | cân nhắc | cao | Đúng dịch vụ chân dung và đúng địa bàn TP.HCM. |
| chụp ảnh profile uy tín tại tphcm | thương mại | cân nhắc | cao | Đúng dịch vụ chân dung và đúng địa bàn TP.HCM. |
| chụp ảnh profile ở đâu | thương mại | cân nhắc | cao | Người dùng đang tìm địa điểm cung cấp dịch vụ chân dung. |
| chụp ảnh quay phim đám cưới | thương mại | cân nhắc | cao | Đúng dịch vụ quay phóng sự tại TP.HCM. |
| chụp ảnh sự kiện công ty tphcm | thương mại | cân nhắc | cao | Đúng dịch vụ sự kiện và đúng địa bàn TP.HCM. |
| chụp ảnh sự kiện hcm | thương mại | cân nhắc | cao | Đúng dịch vụ sự kiện và đúng địa bàn TP.HCM. |
| chụp ảnh sự kiện tphcm | thương mại | cân nhắc | cao | Đúng dịch vụ sự kiện và đúng địa bàn TP.HCM. |
| chụp ảnh sự kiện uy tín tphcm | thương mại | cân nhắc | cao | Đúng dịch vụ sự kiện và địa bàn TP.HCM của studio. |
| chụp ảnh sự kiện uy tín tại tphcm | thương mại | cân nhắc | cao | Đúng dịch vụ sự kiện và địa bàn TP.HCM của studio. |
| chụp ảnh tiệc tất niên 2024 | thương mại | cân nhắc | cao | Đúng dịch vụ sự kiện công ty tại thời điểm hiện tại. |
| chụp ảnh tiệc tất niên cuối năm | thương mại | cân nhắc | cao | Đúng dịch vụ sự kiện công ty tại TP.HCM. |
| chụp ảnh tiệc tất niên công ty | thương mại | cân nhắc | cao | Đúng dịch vụ sự kiện công ty của studio. |
| chụp ảnh tiệc tất niên review công ty | thông tin | cân nhắc | cao | Người dùng tìm kiếm đánh giá từ các đơn vị uy tín. |
| chụp ảnh tiệc tất niên reviews | thông tin | cân nhắc | cao | Người dùng tìm kiếm đánh giá từ các đơn vị uy tín. |
| chụp ảnh tiệc tất niên sài gòn 2024 | thương mại | cân nhắc | cao | Đúng dịch vụ sự kiện tại Sài Gòn/TP.HCM. |
| chụp ảnh tiệc tất niên sài gòn đẹp | thương mại | cân nhắc | cao | Đúng dịch vụ sự kiện tại Sài Gòn/TP.HCM. |
| chụp ảnh tiệc tất niên tphcm 2024 | thương mại | cân nhắc | cao | Đúng dịch vụ sự kiện tại TP.HCM. |
| chụp ảnh tiệc tất niên uy tín nhất | thương mại | cân nhắc | cao | Người dùng tìm kiếm đơn vị chuyên nghiệp. |
| chụp ảnh tiệc tất niên uy tín tphcm | thương mại | cân nhắc | cao | Đúng dịch vụ sự kiện tại TP.HCM. |
| chụp ảnh tiệc tất niên uy tín tại tphcm | thương mại | cân nhắc | cao | Đúng dịch vụ sự kiện tại TP.HCM. |
| cinematic wedding videographer | thương mại | cân nhắc | cao | Đúng dịch vụ quay phim phóng sự và phong cách cinematic của studio. |
| cinematic wedding videographer near me | thông tin | nhận biết | cao | Cụm từ tìm kiếm về kỹ thuật quay phim phóng sự. |
| corporate headshots | thương mại | cân nhắc | cao | Phù hợp dịch vụ chân dung doanh nhân cho phân khúc cao cấp. |
| corporate headshots near me | giao dịch | quyết định | cao | Khách hàng đang tìm địa điểm cụ thể tại TP.HCM cho ảnh doanh nhân. |
| corporate headshots women | thương mại | cân nhắc | cao | Nhắm đến đối tượng nữ giới trong phân khúc doanh nhân. |
| corporate portrait photography hcm | giao dịch | quyết định | cao | Từ khóa trực diện dịch vụ chân dung doanh nhân tại TP.HCM. |
| dịch vụ chụp sự kiện uy tín | giao dịch | quyết định | cao | Phù hợp dịch vụ chụp sự kiện công ty của studio. |
| dịch vụ chụp ảnh doanh nhân | giao dịch | quyết định | cao | Từ khóa trực tiếp cho dịch vụ chân dung doanh nhân. |
| dịch vụ quay chụp sự kiện | giao dịch | quyết định | cao | Từ khóa trực tiếp cho dịch vụ sự kiện công ty. |
| dịch vụ quay sự kiện | giao dịch | quyết định | cao | Từ khóa trực tiếp cho dịch vụ quay sự kiện công ty. |
| dịch vụ quay video sự kiện | giao dịch | quyết định | cao | Từ khóa trực tiếp cho dịch vụ quay sự kiện công ty. |
| event photography sài gòn 2024 | giao dịch | quyết định | cao | Từ khóa trực tiếp cho dịch vụ sự kiện tại TP.HCM. |
| máy quay phim đám cưới | thương mại | cân nhắc | cao | Cần trang riêng để giới thiệu dịch vụ Quay Phóng Sự. |
| phim cưới phóng sự đẹp 2024 | thương mại | cân nhắc | cao | Cụm từ tìm kiếm dịch vụ quay phóng sự chất lượng. |
| phim cưới phóng sự đẹp thuyết minh | thương mại | cân nhắc | cao | Cụm từ tìm kiếm dịch vụ quay phóng sự chất lượng. |
| phim cưới phóng sự đẹp trai | thương mại | cân nhắc | cao | Cụm từ tìm kiếm dịch vụ quay phóng sự chất lượng. |
| phim cưới đẹp | thương mại | cân nhắc | cao | Cụm từ tìm kiếm dịch vụ quay phóng sự chất lượng. |
| phim phong su cuoi | thương mại | cân nhắc | cao | Cụm từ tìm kiếm dịch vụ quay phóng sự chất lượng. |
| phim phóng sự cưới | thương mại | cân nhắc | cao | Dịch vụ quay phóng sự là sản phẩm cốt lõi của studio. |
| phóng sự cưới công giáo | thương mại | cân nhắc | cao | Phân khúc khách hàng mục tiêu cụ thể tại TP.HCM. |
| phóng sự cưới phỏng vấn | thương mại | cân nhắc | cao | Dịch vụ phóng sự chuyên sâu cho khách hàng cao cấp. |
| quay phim cưới uy tín tphcm | thương mại | cân nhắc | cao | Đúng dịch vụ quay phóng sự, đúng địa bàn TP.HCM và phân khúc trung-cao. |
| quay phim cưới uy tín tại tphcm | thương mại | cân nhắc | cao | Đúng dịch vụ quay phóng sự, đúng địa bàn TP.HCM và phân khúc trung-cao. |
| quay phim cưới đẹp ở sài gòn | thương mại | cân nhắc | cao | Đúng dịch vụ quay phóng sự, đúng địa bàn Sài Gòn và phân khúc trung-cao. |
| quay phim phóng sự cưới | thương mại | cân nhắc | cao | Đúng dịch vụ quay phóng sự, đúng phân khúc trung-cao. |
| quay phim đám cưới phóng sự | thương mại | cân nhắc | cao | Đúng dịch vụ quay phóng sự, đúng phân khúc trung-cao. |
| quay phim đám cưới sài gòn 2024 | thương mại | cân nhắc | cao | Đúng dịch vụ quay phóng sự, đúng địa bàn Sài Gòn và thời điểm hiện tại. |
| studio chụp hình profile chuyên nghiệp sài gòn | thương mại | cân nhắc | cao | Khớp với dịch vụ chân dung doanh nhân tại Sài Gòn. |
| studio chụp ảnh chân dung đẹp ở tphcm | thương mại | cân nhắc | cao | Khớp với dịch vụ chân dung tại TP.HCM. |
| studio chụp ảnh cưới thủ đức | giao dịch | quyết định | cao | Thuộc khu vực TP.HCM, phục vụ khách hàng địa phương. |
| báo giá chụp ảnh sự kiện | giao dịch | quyết định | trung bình | Từ khóa về báo giá dịch vụ sự kiện doanh nghiệp. |
| báo giá quay phim chụp hình sự kiện | giao dịch | quyết định | trung bình | Từ khóa về báo giá dịch vụ sự kiện doanh nghiệp. |
| báo giá quay phim chụp ảnh sự kiện | giao dịch | quyết định | trung bình | Từ khóa về báo giá dịch vụ sự kiện doanh nghiệp. |
| báo giá quay phim doanh nghiệp | giao dịch | quyết định | trung bình | Từ khóa về dịch vụ quay phim cho doanh nghiệp. |
| bảng giá chụp ảnh chân dung | giao dịch | quyết định | trung bình | Dịch vụ chân dung có sẵn nhưng cần trang riêng để lọc khách. |
| chụp chân dung chuyên nghiệp | thương mại | cân nhắc | trung bình | Dịch vụ có sẵn nhưng cần trang đích riêng để thể hiện phong cách. |
| chụp hình chân dung chuyên nghiệp | thương mại | cân nhắc | trung bình | Dịch vụ có sẵn nhưng cần trang đích riêng để thể hiện phong cách. |
| chụp hình chân dung chuyên nghiệp cho doanh nhân | thương mại | cân nhắc | trung bình | Dịch vụ có sẵn nhưng cần trang đích riêng để thể hiện phong cách. |
| chụp hình chân dung doanh nhân | thương mại | cân nhắc | trung bình | Dịch vụ có sẵn nhưng cần trang đích riêng để thể hiện phong cách. |
| chụp hình doanh nghiệp | thương mại | cân nhắc | trung bình | Dịch vụ có sẵn nhưng cần trang đích riêng để thể hiện phong cách. |
| chụp hình doanh nhân nam | thương mại | cân nhắc | trung bình | Dịch vụ có sẵn nhưng cần trang đích riêng để thể hiện phong cách. |
| chụp hình doanh nhân nữ | thương mại | cân nhắc | trung bình | Dịch vụ có sẵn nhưng cần trang đích riêng để thể hiện phong cách. |
| chụp hình kiểu doanh nhân | thương mại | cân nhắc | trung bình | Dịch vụ có sẵn nhưng cần trang đích riêng để thể hiện phong cách. |
| chụp hình profile doanh nghiệp | thương mại | cân nhắc | trung bình | Dịch vụ có sẵn nhưng cần trang đích riêng để thể hiện phong cách. |
| chụp ảnh chân dung đẹp nam | thông tin | nhận biết | trung bình | Cụm từ tìm kiếm dịch vụ chân dung nam nhưng chưa xác định địa điểm. |
| chụp ảnh doanh nhân ở đâu đẹp | consideration | cân nhắc | trung bình | Cần trang chuyên biệt cho dịch vụ chân dung doanh nhân để thể hiện gu sang trọng. |
| chụp ảnh profile chuyên nghiệp | consideration | cân nhắc | trung bình | Cần trang riêng để phân tách dịch vụ chân dung khỏi mảng cưới. |
| chụp ảnh profile cv | consideration | cân nhắc | trung bình | Cụm từ cụ thể cho dịch vụ chân dung cá nhân. |
| chụp ảnh profile cá nhân | consideration | cân nhắc | trung bình | Cụm từ chung cho dịch vụ chân dung cá nhân. |
| chụp ảnh profile cá nhân chuyên nghiệp | consideration | cân nhắc | trung bình | Cụm từ tìm kiếm dịch vụ chân dung chất lượng. |
| chụp ảnh profile cá nhân tphcm | consideration | cân nhắc | trung bình | Cụm từ dịch vụ chân dung tại địa phương. |
| chụp ảnh profile công ty | consideration | cân nhắc | trung bình | Cụm từ cho dịch vụ chân dung doanh nghiệp/công ty. |
| chụp ảnh profile công ty chuyên nghiệp | consideration | cân nhắc | trung bình | Cụm từ tìm kiếm dịch vụ chân dung doanh nghiệp chất lượng. |
| chụp ảnh profile doanh nghiệp | consideration | cân nhắc | trung bình | Cụm từ cho dịch vụ chân dung doanh nghiệp. |
| chụp ảnh profile doanh nhân | consideration | cân nhắc | trung bình | Cụm từ cho dịch vụ chân dung lãnh đạo. |
| chụp ảnh profile gò vấp | consideration | cân nhắc | trung bình | Cụm từ dịch vụ chân dung tại quận thuộc TP.HCM. |
| chụp ảnh profile hcm | consideration | cân nhắc | trung bình | Cụm từ dịch vụ chân dung tại TP.HCM. |
| chụp ảnh profile hồ chí minh | consideration | cân nhắc | trung bình | Cụm từ dịch vụ chân dung tại TP.HCM. |
| chụp ảnh sự kiện ở đâu đẹp | thông tin | nhận biết | trung bình | Người dùng đang tìm kiếm địa điểm/đơn vị uy tín. |
| giá chụp ảnh doanh nhân | giao dịch | quyết định | trung bình | Dịch vụ chân dung doanh nhân có sẵn nhưng cần trang đích riêng để chuyển đổi. |
| giá chụp ảnh profile cá nhân | giao dịch | quyết định | trung bình | Dịch vụ chân dung cá nhân có sẵn nhưng cần trang đích riêng để chuyển đổi. |
| giá chụp ảnh profile công ty | giao dịch | quyết định | trung bình | Dịch vụ chụp hình công ty có sẵn nhưng cần trang đích riêng để chuyển đổi. |
| giá thuê chụp ảnh sự kiện | giao dịch | quyết định | trung bình | Dịch vụ sự kiện có sẵn nhưng cần trang đích riêng để chuyển đổi. |
| gói quay chụp sự kiện công ty tphcm | giao dịch | quyết định | trung bình | Dịch vụ sự kiện tại TP.HCM cần trang đích riêng để chuyển đổi. |
| portrait photography for business | thương mại | cân nhắc | trung bình | Dịch vụ chân dung doanh nhân có trong danh mục dịch vụ của studio. |
| portrait photography for men | thương mại | cân nhắc | trung bình | Dịch vụ chân dung nam giới có thể thu hút khách hàng doanh nhân. |
| quay phim cưới trọn gói | thương mại | cân nhắc | trung bình | Cụm từ khóa dịch vụ quay phim chung, cần trang đích riêng để giới thiệu gói trọn gói. |
| quay phim ngày cưới | thương mại | cân nhắc | trung bình | Cụm từ khóa dịch vụ quay phim chung. |
| quay phim phóng sự doanh nghiệp | thương mại | cân nhắc | trung bình | Dịch vụ quay sự kiện/doanh nghiệp có trong danh mục dịch vụ của studio. |
| quay phim đám cưới | thương mại | cân nhắc | trung bình | Cụm từ dịch vụ quay phim chung. |
| studio chụp ảnh profile đẹp | thương mại | cân nhắc | trung bình | Dịch vụ chân dung doanh nhân/LinkedIn phù hợp phân khúc trung-cao. |
| báo giá dịch vụ quay phim | giao dịch | quyết định | thấp | Từ khóa chung về dịch vụ quay phim chưa rõ loại hình. |
| báo giá máy quay phim | giao dịch | quyết định | thấp | Người dùng tìm báo giá thiết bị, không phải dịch vụ của studio. |
| báo giá quay phim quảng cáo | thương mại | cân nhắc | thấp | Dịch vụ quảng cáo không phải trọng tâm chính của studio. |
| báo giá quay phim sự kiện | thương mại | cân nhắc | thấp | Dịch vụ sự kiện chung không tập trung vào phân khúc cưới. |
| báo giá quay phim sự kiện công ty | thương mại | cân nhắc | thấp | Dịch vụ doanh nghiệp không thuộc phân khúc cưới cao cấp. |
| báo giá thuê thiết bị quay phim | giao dịch | quyết định | thấp | Studio không cung cấp dịch vụ cho thuê thiết bị. |
| chụp hình sự kiện giá rẻ | thương mại | cân nhắc | thấp | Từ khóa 'giá rẻ' không phù hợp với phân khúc trung-cao của PhatBo. |
| chụp ảnh chân dung 4x6 | giao dịch | quyết định | thấp | Dịch vụ phổ thông, không thuộc phân khúc cao cấp của studio. |
| chụp ảnh chân dung hộ chiếu | giao dịch | quyết định | thấp | Dịch vụ phổ thông, không thuộc phân khúc cao cấp. |
| chụp ảnh doanh nhân giá rẻ | giao dịch | quyết định | thấp | Từ khóa 'giá rẻ' không phù hợp với định vị phân khúc trung-cao của studio. |
| chụp ảnh profile cá nhân giá rẻ | giao dịch | quyết định | thấp | Chứa từ khóa 'giá rẻ' không phù hợp với định vị phân khúc trung-cao. |
| chụp ảnh profile doanh nhân hà đông | consideration | cân nhắc | thấp | Sai địa bàn mục tiêu (Hà Đông không thuộc TP.HCM). |
| chụp ảnh profile gigamall | điều hướng | quyết định | thấp | Cụm từ liên quan đến địa điểm cụ thể không phải trọng tâm của studio. |
| chụp ảnh profile giá rẻ | giao dịch | quyết định | thấp | Chứa từ khóa 'giá rẻ' không phù hợp với định vị phân khúc trung-cao. |
| chụp ảnh profile giáo viên | consideration | cân nhắc | thấp | Đối tượng khách hàng cụ thể, không phải trọng tâm chính của studio. |
| chụp ảnh profile review công ty | thương mại | cân nhắc | thấp | Từ khóa có chứa 'review' không phù hợp định vị sang trọng. |
| chụp ảnh profile review phim | thương mại | cân nhắc | thấp | Không thuộc dịch vụ trọng tâm của studio. |
| chụp ảnh sự kiện lấy ngay | thương mại | cân nhắc | thấp | Dịch vụ lấy ngay không phải thế mạnh của studio. |
| chụp ảnh sự kiện review công ty | thương mại | cân nhắc | thấp | Từ không phù hợp định vị sang trọng. |
| chụp ảnh sự kiện review phim | thương mại | cân nhắc | thấp | Không thuộc dịch vụ trọng tâm của studio. |
| chụp ảnh sự kiện reviews | thương mại | cân nhắc | thấp | Từ không phù hợp định vị sang trọng. |
| chụp ảnh tiệc tất niên đẹp | thông tin | nhận biết | thấp | Cụm từ chung về dịch vụ sự kiện doanh nghiệp. |
| chụp ảnh tiệc tất niên đẹp nhất | thông tin | nhận biết | thấp | Cụm từ tìm kiếm cảm hứng cho sự kiện doanh nghiệp. |
| chụp ảnh tiệc tất niên ở đâu tphcm | thương mại | cân nhắc | thấp | Tìm kiếm địa điểm dịch vụ sự kiện tại TP.HCM. |
| chụp ảnh tiệc tất niên ở đâu đẹp | thương mại | cân nhắc | thấp | Tìm kiếm địa điểm dịch vụ sự kiện chất lượng. |
| corporate headshot background | thông tin | nhận biết | thấp | Tìm kiếm thông tin về bối cảnh ảnh chân dung doanh nghiệp. |
| corporate headshot examples | thông tin | nhận biết | thấp | Tìm kiếm mẫu ảnh chân dung doanh nhân. |
| corporate headshot photography | thương mại | cân nhắc | thấp | Cụm từ dịch vụ chụp ảnh chân dung doanh nghiệp. |
| corporate headshot poses | thông tin | nhận biết | thấp | Tìm kiếm tư thế tạo dáng cho ảnh chân dung. |
| corporate headshot pricing | giao dịch | quyết định | thấp | Hỏi về báo giá dịch vụ chân dung doanh nhân. |
| corporate headshot prompt | thông tin | nhận biết | thấp | Tìm kiếm hướng dẫn cho người mẫu/người chụp. |
| corporate headshot singapore | thương mại | cân nhắc | thấp | Thị trường không phải mục tiêu. |
| giá chụp ảnh cưới gia đình | thương mại | cân nhắc | thấp | Dịch vụ chụp ảnh gia đình không nằm trong danh mục chính của studio. |
| giá chụp ảnh cưới review công ty | thương mại | cân nhắc | thấp | Dịch vụ sự kiện doanh nghiệp không phải trọng tâm chính của studio. |
| gạo nâu profile chụp ảnh profile cá nhân doanh nghiệp | điều hướng | quyết định | thấp | Tìm kiếm tên thương hiệu đối thủ cụ thể. |
| hayday phóng sự cưới giá | giao dịch | quyết định | thấp | Tìm kiếm thương hiệu đối thủ cụ thể. |
| jasmine wedding photography vietnam | điều hướng | quyết định | thấp | Tìm kiếm thương hiệu đối thủ cụ thể. |
| máy ảnh chụp chân dung giá rẻ | thương mại | cân nhắc | thấp | Từ khóa 'giá rẻ' không thuộc phân khúc trung-cao của studio. |
| máy ảnh chụp chân dung đẹp giá rẻ | thương mại | cân nhắc | thấp | Từ khóa 'giá rẻ' không thuộc phân khúc trung-cao của studio. |
| máy ảnh chụp sự kiện giá rẻ | thương mại | cân nhắc | thấp | Từ khóa 'giá rẻ' không thuộc phân khúc trung-của studio. |
| portrait photography for artists | thương mại | cân nhắc | thấp | Đối tượng khách hàng không thuộc phân khúc cưới chính. |
| portrait photography for cabin crew | thương mại | cân nhắc | thấp | Đối tượng khách hàng ngách, không phải trọng tâm chính. |
| portrait photography for cabin crew application | thương mại | cân nhắc | thấp | Cụm từ tìm kiếm cụ thể cho mục đích xin việc của tiếp viên. |
| portrait photography for riyadh air | thương mại | cân nhắc | thấp | Cụm từ tìm kiếm quá cụ thể cho một hãng hàng không. |
| portrait photography for vietnam visa | thương mại | cân nhắc | thấp | Dịch vụ ảnh làm visa không thuộc phân khúc cao cấp. |
| portrait photography for wedding guests | thương mại | cân nhắc | thấp | Dịch vụ dành cho khách mời, không phải trọng tâm của studio. |
| quay phim cưới sài gòn phần 2 | điều hướng | nhận biết | thấp | Cụm từ mang tính chất tìm kiếm nội dung cụ thể trên mạng xã hội. |
| quay phim cưới sài gòn tập 1 | điều hướng | nhận biết | thấp | Cụm từ mang tính chất tìm kiếm nội dung cụ thể trên mạng xã hội. |
| quay phim cưới sài gòn tập 2 | điều hướng | nhận biết | thấp | Cụm từ mang tính chất tìm kiếm nội dung cụ thể trên mạng xã hội. |
| quay phim đám cưới sài gòn xưa | thương mại | cân nhắc | thấp | Phong cách 'xưa' không phù hợp với định vị gu sang trọng, cinematic của studio. |
| review chụp ảnh cưới tuart | điều hướng | cân nhắc | thấp | Cụm từ tìm kiếm đối thủ cụ thể. |
| rạp cưới đẹp tphcm | thông tin | nhận biết | thấp | Dịch vụ trang trí rạp không nằm trong danh mục dịch vụ chính của studio. |
| studio chụp hình gia đình | thương mại | cân nhắc | thấp | Dịch vụ không nằm trong gói dịch vụ chính của studio. |
| studio chụp hình gò vấp | thương mại | considerience | thấp | Tìm kiếm theo địa phương cụ thể không phải trọng tâm chính. |
| studio chụp hình quận 7 | thương mại | cân nhắc | thấp | Tìm kiếm theo địa phương cụ thể. |
| studio chụp hình sinh nhật | thương mại | cân nhắc | thấp | Dịch vụ không nằm trong gói dịch vụ chính của studio. |
| studio chụp hình tốt nghiệp | thương mại | cân nhắc | thấp | Dịch vụ không nằm trong gói dịch vụ chính của studio. |
| studio chụp ảnh bầu tại sài gòn | thương mại | cân nhắc | thấp | Dịch vụ không nằm trong gói dịch vụ chính của studio. |
| studio chụp ảnh cưới ninh bình | giao dịch | quyết định | thấp | Sai địa bàn mục tiêu của studio. |
| studio chụp ảnh cưới rạch giá | giao dịch | quyết định | thấp | Sai địa bàn mục tiêu của studio. |
| studio chụp ảnh cưới đẹp ở buôn ma thuột | giao dịch | quyết định | thấp | Sai địa bàn mục tiêu của studio. |
| studio chụp ảnh cưới đẹp ở bến tre | giao dịch | quyết định | thấp | Sai địa bàn mục tiêu của studio. |
| studio chụp ảnh cưới đẹp ở gia lai | giao dịch | quyết định | thấp | Sai địa bàn mục tiêu của studio. |
| studio chụp ảnh cưới đẹp ở ninh bình | giao dịch | quyết định | thấp | Sai địa bàn mục tiêu của studio. |
| studio chụp ảnh cưới đẹp ở rạch giá | giao dịch | quyết định | thấp | Sai địa bàn mục tiêu của studio. |
| studio chụp ảnh cưới đẹp ở thái bình | giao dịch | quyết định | thấp | Sai địa bàn mục tiêu của studio. |
| tạo dáng chụp hình doanh nhân | thông tin | nhận biết | thấp | Dịch vụ chân dung doanh nhân chưa có trang riêng và cần nội dung hướng dẫn. |
| wedding photographer london | điều hướng | nhận biết | thấp | Địa điểm không nằm tại TP.HCM. |
| wedding photographer melbourne | điều hướng | nhận biết | thấp | Địa điểm không nằm tại TP.HCM. |
| wedding photographer reviews | thông tin | cân nhắc | thấp | Người dùng tìm kiếm đánh giá để tham khảo trước khi chọn. |
| wedding photographer sydney | điều hướng | nhận biết | thấp | Địa điểm không nằm tại TP.HCM. |
| wedding photography in chennai | điều hướng | nhận biết | thấp | Địa điểm không nằm tại TP.HCM. |
| wedding photography in coimbatore | điều hướng | quyết định | thấp | Sai địa điểm mục tiêu (Coimbatore, Ấn Độ). |
| wedding photography in hyderabad | điều hướng | quyết định | thấp | Sai địa điểm mục tiêu (Hyderabad, Ấn Độ). |
| wedding photography in kerala | điều hướng | quyết định | thấp | Sai địa điểm mục tiêu (Kerala, Ấn Độ). |
| wedding photography in kolkata | điều hướng | quyết định | thấp | Sai địa điểm mục tiêu (Kolkata, Ấn Độ). |
| wedding photography in madurai | điều hướng | quyết định | thấp | Sai địa điểm mục tiêu (Madurai, Ấn Độ). |
| Ánh Nguyệt Bridal - Wedding - Photography, Bình Minh, Đồng Nai, Vietnam | điều hướng | quyết định | thấp | Tìm kiếm đối thủ cạnh tranh ở địa phương khác. |
| wedding photographer sài gòn tuyển dụng | thông tin | nhận biết | thớp | Đối tượng tìm kiếm là người tìm việc, không phải khách hàng. |

</details>

## Bối cảnh cạnh tranh (từ SERP thật)

### Mặt bằng giá

- Thị trường có sự phân hóa mạnh với các dịch vụ chụp ảnh chân dung doanh nhân/sự kiện từ 1.200.000đ (abv.edu.vn) đến 10.000.000VND (lavenderstudio.com.vn).
- Các gói chụp ảnh cưới/phóng sự có mức giá thấp bắt đầu từ 1.800.000vnđ (alohastudio.vn) và 2.000.000 vnđ (tonywedding.vn, tiemchupanh.com).
- Phân khúc trung cấp xuất hiện với các gói chụp phóng sự/quay phim từ 4.500.000 đ (aocuoileman.com) đến 10.900.000đ (septemberstudios.vn).
- Các gói cao cấp và dịch vụ chuyên sâu có mức giá từ 11.200.000đ (codystudio.vn) đến 15.900.000Đ (tonywedding.vn) và 20 triệu (tuonglamphotos.com).
- Giá của PhatBo (12tr - 19tr) nằm ở phân khúc cao cấp, tập trung vào chất lượng sản phẩm thay vì cạnh tranh về giá rẻ.
- PhatBo định vị vượt qua nhóm 'giá rẻ' và 'phổ thông', đối đầu trực tiếp với các studio cung cấp dịch vụ trọn gói chuyên nghiệp.

### Giá đối thủ bóc trực tiếp từ SERP (50 mức)

Đây là con số **thật, có trong tiêu đề/mô tả trang đối thủ** — không phải model suy đoán. Đã lọc bỏ giá thiết bị, tin tuyển dụng và dịch vụ không liên quan (26 mục).

| Mức giá | Quy ra VND | Domain | Tiêu đề trang |
|---|---:|---|---|
| 500.000đ | 500,000đ | kyyeudanang.com | Báo giá chụp ảnh quay phim sự kiện Event TeamBuilding |
| 700.000 đ | 700,000đ | kyyeudanang.com | Báo giá chụp ảnh quay phim sự kiện Event TeamBuilding |
| 1,2 triệu | 1,200,000đ | abv.edu.vn | Dịch vụ chụp ảnh profile doanh nghiệp chuyên nghiệp chỉ 1,2 triệu |
| 1.499.000 đ | 1,499,000đ | 9xwedding.com | Báo giá gói chụp ảnh doanh nhân, chụp Profile tại Quận 9, TP Thủ ... |
| 1,5tr | 1,500,000đ | abv.edu.vn | Dịch vụ quay phim chụp ảnh: quay phim 1,5tr - Điện ảnh ABV |
| 1.500.000 đ | 1,500,000đ | kyyeudanang.com | Báo giá chụp ảnh quay phim sự kiện Event TeamBuilding |
| 1.500.000 VNĐ | 1,500,000đ | lavenderstudio.com.vn | Báo giá quay phim chụp hình sự kiện uy tín - Lavender Advertising |
| 1.500.000VND | 1,500,000đ | lavenderstudio.com.vn | [Bật mí] Giá dịch vụ chụp hình chân dung doanh nhân chuyên ... |
| 1.500.000 VND | 1,500,000đ | amstudio.vn | Báo giá chụp ảnh doanh nhân chuyên nghiệp nhất Hà Nội - AMStudio |
| 1.800.000vnđ | 1,800,000đ | alohastudio.vn | Chụp hình đám hỏi, đám cưới, giá rẻ 2018 - Aloha Studio |
| 1.800.000 VNĐ | 1,800,000đ | lavender.com.vn | Báo giá dịch vụ chụp ảnh quay phim sự kiện ở TP HCM hiện nay |
| 2.000.000 vnđ | 2,000,000đ | tabistudio.com | Địa chỉ quay phim cưới có tâm nhất tại Sài Gòn - Tabi Studio |
| 2 Triệu | 2,000,000đ | rabbitmedia.vn | Quay phim chụp ảnh sự kiện trọn gói, chuyên nghiệp tốt nhất |
| 2.000.000 VND | 2,000,000đ | tonywedding.vn | BẢNG GIÁ CHỤP ẢNH CƯỚI PHIM TRƯỜNG TPHCM – SÀI GÒN ... |
| 2.000.000 VNĐ | 2,000,000đ | mocevent.vn | Báo giá dịch vụ - Mộc Event |
| 2.000.000 VNĐ | 2,000,000đ | tiemchupanh.com | Chụp ảnh phóng sự cưới / Giá 2.000.000 VNĐ - TCA Group |
| 2.500.000 VNĐ | 2,500,000đ | lavenderstudio.com.vn | Báo Giá Chụp Hình Doanh Nhân Chuyên Nghiệp |
| 2,5 triệu | 2,500,000đ | abv.edu.vn | Dịch vụ quay phim chụp ảnh: quay phim 1,5tr - Điện ảnh ABV |
| 2.500.000đ | 2,500,000đ | goldenbeeltd.vn | Dịch vụ Media trọn gói - Quay video theo yêu cầu - Golden Bee |
| 2.500.000đ | 2,500,000đ | artevent.com.vn | [Bảng Báo Giá] Media - Quay phim, chụp hình, Flycam Sự Kiện |
| 2,5 triệu | 2,500,000đ | lavenderstudio.com.vn | Dịch vụ chụp hình doanh nhân nam chuyên nghiệp tại Hồ Chí Minh |
| 3 Triệu | 3,000,000đ | rabbitmedia.vn | Quay phim chụp ảnh sự kiện trọn gói, chuyên nghiệp tốt nhất |
| 3.400.000 VNĐ | 3,400,000đ | 35mmstudio.vn | Pricing – 35mm Photography |
| 3,5tr | 3,500,000đ | abv.edu.vn | Dịch vụ quay phim chụp ảnh: quay phim 1,5tr - Điện ảnh ABV |
| 3.500.000 VNĐ | 3,500,000đ | lavenderstudio.com.vn | Báo giá quay phim chụp hình sự kiện uy tín - Lavender Advertising |
| 3.800.000đ | 3,800,000đ | gaonauchupanh.vn | Gạo Nâu Chụp Ảnh — Studio chân dung HN & TP HCM / 5.0 |
| 4.500.000 đ | 4,500,000đ | aocuoileman.com | CHỤP PHÓNG SỰ - QUAY PHÓNG SỰ / Áo cưới Lê Mẫn |
| 5.000.000 đ | 5,000,000đ | aocuoileman.com | CHỤP PHÓNG SỰ - QUAY PHÓNG SỰ / Áo cưới Lê Mẫn |
| 5.000.000đ | 5,000,000đ | prosmediavn.com | Bảng Giá Quay Chụp Sự Kiện TPHCM – Trọn Gói, Chuyên Nghiệp ... |
| 5.200.000 đ | 5,200,000đ | kyyeudanang.com | Báo giá chụp ảnh quay phim sự kiện Event TeamBuilding |
| 5.990.000 VNĐ | 5,990,000đ | alohastudio.vn | Chụp Ảnh Cưới Phim Trường Đẹp - Giá Rẻ tại Tp.HCM - Aloha Studio |
| 6.000.000 VNĐ | 6,000,000đ | prosmediavn.com | Báo giá quay chụp sự kiện cuối năm – Dịch vụ chuyên nghiệp, giá ... |
| 7.000.000 đ | 7,000,000đ | lavender.com.vn | Báo giá dịch vụ chụp ảnh quay phim sự kiện ở TP HCM hiện nay |
| 7.500.000 VNĐ | 7,500,000đ | lavenderstudio.com.vn | Báo giá quay phim chụp hình quảng cáo chuyên nghiệp |
| 7.900.000 đ | 7,900,000đ | ahihistudio.vn | Ahihi Studio / Studio chụp hình cưới đẹp giá rẻ TPHCM |
| 8.9tr | 8,900,000đ | septemberstudios.vn | Chụp Ảnh Cưới Đẹp TP.HCM – Trọn Gói Từ 8.9tr / September |
| 8.9tr | 8,900,000đ | voz.vn | Sắp cưới vợ lần đầu, cần tư vấn tiệm chụp hình cưới, dịch vụ trang ... |
| 9.9tr | 9,900,000đ | voz.vn | Sắp cưới vợ lần đầu, cần tư vấn tiệm chụp hình cưới, dịch vụ trang ... |
| 9.9 triệu | 9,900,000đ | septemberstudios.vn | Bảng Giá Chụp Ảnh Cưới Trọn Gói 8.9 – 14.9tr - September Studio |
| 10.000.000VND | 10,000,000đ | lavenderstudio.com.vn | [Bật mí] Giá dịch vụ chụp hình chân dung doanh nhân chuyên ... |
| 10.9tr | 10,900,000đ | voz.vn | Sắp cưới vợ lần đầu, cần tư vấn tiệm chụp hình cưới, dịch vụ trang ... |
| 10.9 triệu | 10,900,000đ | septemberstudios.vn | Bảng Giá Chụp Ảnh Cưới Trọn Gói 8.9 – 14.9tr - September Studio |
| 11.200.000đ | 11,200,000đ | codystudio.vn | Bảng giá chụp & quay phóng sự cưới TP.HCM 2026 - Cody Studio |
| 11.9tr | 11,900,000đ | voz.vn | Sắp cưới vợ lần đầu, cần tư vấn tiệm chụp hình cưới, dịch vụ trang ... |
| 12.900.000Đ | 12,900,000đ | tonywedding.vn | BẢNG GIÁ CHỤP ẢNH CƯỚI PHIM TRƯỜNG TPHCM – SÀI GÒN ... |
| 14 triệu | 14,000,000đ | galaroyale.com.vn | The Knot Saigon - The Event Hall - Gala Royale |
| 14.9 triệu | 14,900,000đ | septemberstudios.vn | Chụp Ảnh Cưới Đẹp TP.HCM – Trọn Gói Từ 8.9tr / September |
| 15.000.000 VNĐ | 15,000,000đ | lavender.com.vn | Báo giá dịch vụ chụp ảnh quay phim sự kiện ở TP HCM hiện nay |
| 15.900.000Đ | 15,900,000đ | tonywedding.vn | BẢNG GIÁ CHỤP ẢNH CƯỚI NGOẠI CẢNH TPHCM - Tony Wedding |
| 20 triệu | 20,000,000đ | tuonglamphotos.com | Quay phóng sự cưới - dịch vụ được yêu thích nhất |

### Studio cạnh tranh trực tiếp

| Domain | Đọc được gì từ SERP | Tín hiệu giá |
|---|---|---|
| septemberstudios.vn | Đối thủ trực tiếp nhất ở phân khúc cưới trọn gói, có sự tương đồng về mức giá với các gói của PhatBo. | 8.9 - 14.9 triệu |
| tonywedding.vn | Cạnh tranh trực tiếp ở phân khúc chụp ảnh cưới ngoại cảnh và studio cao cấp tại TP.HCM. | 12.900.000Đ - 15.900.000Đ |
| codystudio.vn | Đối thủ trực tiếp ở dịch vụ phóng sự cưới, mức giá sát với gói Phóng Sự của PhatBo (12tr). | 11.200.000đ |
| tuonglamphotos.com | Đối thủ ở phân khúc cao cấp hơn, tập trung vào dịch vụ quay phóng sự cưới chuyên sâu. | 20 triệu |

### Trang tổng hợp "Top studio" — cơ hội xin được liệt kê

- **voz.vn** — Diễn đàn lớn nơi người dùng tìm kiếm tư vấn thực tế cho các gói từ 8.9tr đến 11.9tr; cơ hội để tiếp cận khách hàng đang cân nhắc giữa chất lượng và giá cả.

### Mô-típ tiêu đề của trang đang top

- Báo giá chụp ảnh quay phim sự kiện...
- Dịch vụ chụp ảnh/quay phim... chuyên nghiệp
- Bảng giá chụp & quay phóng sự cưới TP.HCM
- Chụp Ảnh Cưới Đẹp TP.HCM – Trọn Gói Từ...
- Bản báo giá dịch vụ chụp ảnh quay phim...

### Khoảng trống có thể chen vào

- Thiếu nội dung tập trung vào 'Streetstyle Sài Gòn' - một yếu tố định vị độc đáo của PhatBo so với các đối thủ thuần studio.
- Chưa khai thác mạnh từ khóa 'Phóng sự cưới' (Wedding Reportage) ở phân khúc cao cấp để cạnh tranh với Cody hoặc Tuong Lam.
- Cơ hội chiếm lĩnh từ khóa 'Cinematic' cho dịch vụ quay phóng sự thay vì chỉ dùng từ 'Quay phim' chung chung như các đối thủ.
- Thiếu nội dung chuyên sâu về chân dung doanh nhân/profile cao cấp (luxury) để tách biệt khỏi nhóm giá rẻ của Lavender hay ABC.

## Làm ngay trong 2 tuần

| Việc | Keyword / trang | Vì sao bây giờ |
|---|---|---|
| Tối ưu hóa thẻ Title & Meta Description cho trang /pricing chứa các từ khóa 'báo giá' và 'phóng sự cưới' | /pricing | Đánh vào ý định tìm kiếm trực tiếp về giá của khách hàng đang cân nhắc ngân sách. |
| Tạo trang đích (Landing Page) cho dịch vụ Chụp ảnh chân dung doanh nhân/CV dựa trên nội dung hiện có | chụp hình profile doanh nhân, chụp ảnh chân dung chuyên nghiệp | Lấp đầy khoảng trống cạnh tranh và khai thác phân khúc khách hàng doanh nghiệp. |
| Cài đặt Google Business Profile cho studio tại Sài Gòn | chụp hình cưới uy tín tphcm, chụp phóng sự cưới sài gòn | Thiết lập sự hiện diện địa phương để cạnh tranh với các đối thủ trong khu vực. |
| Thêm từ khóa 'cinematic' và 'streetstyle Sài Gòn' vào mô tả dịch vụ trên trang chủ | / | Khác biệt hóa thương hiệu so với các đối thủ đang thống trị bởi tiêu đề chung chung. |
| Tạo mục 'Báo giá quay phim cưới 4k' trên trang dịch vụ quay | /pricing | Đón đầu lượng tìm kiếm lớn cho các từ khóa báo giá cụ thể. |

## Kế hoạch nội dung

| Nội dung | Format | Keyword nhắm | Giai đoạn |
|---|---|---|---|
| Báo giá chụp ảnh phóng sự cưới tại Sài Gòn - Trọn gói & Chất lượng | Service Page | bảng giá chụp ảnh phóng sự cưới | Consideration |
| Dịch vụ Chụp hình Profile Doanh nhân & LinkedIn chuyên nghiệp tại TP.HCM | Landing Page | chụp hình profile doanh nhân | Consideration |
| Báo giá quay phim cưới 4k tại TPHCM - Trọn gói từ A-Z | Service Page | báo giá quay phim cưới 4k tphcm | Consideration |
| Chụp ảnh chân dung chuyên nghiệp cho lãnh đạo doanh nghiệp | Landing Page | chụp ảnh chân dung cho lãnh đạo doanh nghiệp | Consideration |
| Bảng giá chụp ảnh cưới uy tín tại TPHCM năm 2024 | Blog/Guide | bảng giá chụp ảnh cưới uy tín tphcm | Awareness |
| Báo giá quay phim cưới phóng sự và dịch vụ trọn gói | Service Page | báo giá quay phim cưới phóng sự | Consideration |
| Chụp ảnh chân dung studio cho hồ sơ năng lực doanh nghiệp | Landing Page | chụp ảnh chân dung studio | Consideration |
| Cẩm nang chọn dịch vụ chụp hình sự kiện và hội thảo tại Sài Gòn | Blog/Guide | Dịch Vụ Quay Phim Sự Kiện / Chụp Hình Event - Hội Thảo - Hội Nghị, Hồ Chí Minh | Awareness |

## Playbook kênh

### Instagram (@scryer_bo)

- **Vì sao phù hợp:** Kênh chính để thể hiện gu thẩm mỹ cao và phong cách cinematic.
- **Đăng gì:** Hình ảnh portfolio chất lượng cao, Reels quay cảnh hậu trường (behind the scenes) mang tính nghệ thuật.
- **Tần suất:** 3-5 posts/week
- **Việc đầu tiên:** Cập nhật highlight cho từng dịch vụ: Studio, Street, Phóng sự.

### Facebook (/PhatBo0905)

- **Vì sao phù hợp:** Kênh tương tác trực tiếp và chạy quảng cáo mục tiêu tại TP.HCM.
- **Đăng gì:** Chia sẻ feedback khách hàng, album ảnh cưới thực tế, thông tin báo giá rõ ràng.
- **Tần suất:** Daily
- **Việc đầu tiên:** Cập nhật ảnh bìa và thông tin liên hệ nổi bật.

### Google Business Profile

- **Vì sao phù hợp:** Kênh quan trọng nhất để tiếp cận khách hàng tìm kiếm dịch vụ tại địa phương.
- **Đăng gì:** Cập nhật ảnh dự án mới, phản hồi đánh giá của khách hàng.
- **Tần suất:** Weekly updates
- **Việc đầu tiên:** Xác minh vị trí và cập nhật hình ảnh thực tế tại studio.

## Định vị giá

- Nhấn mạnh vào chất lượng 'Premium' và 15 năm kinh nghiệm để biện minh cho mức giá cao hơn mặt bằng chung (15tr-19tr so với các đối thủ từ 8.9tr).
- Sử dụng cụm từ 'Trọn gói' và 'Không giới hạn file' khi nói về gói Phóng sự (12tr) để tạo giá trị vượt trội.
- Phân tách rõ ràng giữa dịch vụ 'Cưới' (cao cấp) và 'Chân dung doanh nghiệp' (chuyên nghiệp/tinh gọn) để định vị đúng phân khúc khách hàng.

## Local SEO (TP.HCM)

- Thiết lập Google Business Profile với từ khóa 'Chụp ảnh phóng sự cưới Sài Gòn' và 'Chụp ảnh chân dung chuyên nghiệp'.
- Tối ưu hóa Schema LocalBusiness trên website để hiển thị thông tin studio tại TP.HCM.
- Xây dựng hệ thống backlink từ các trang địa phương hoặc blog review dịch vụ tại TP.HCM.
- Tận dụng các từ khóa kèm tên đường/quận (như Tân Thới Hiệp, Gò Vấp) trong nội dung mô tả dịch vụ.

## Xin lên các trang "Top studio"

- Liên hệ các trang như kalina.com.vn, tierra.vn để gửi portfolio và đề xuất đưa vào danh sách 'Top Studio Chụp Ảnh Cưới Uy Tín'.
- Gửi hồ sơ năng lực cho faceinch.com để tham gia vào các bài viết về dịch vụ chụp ảnh chân dung doanh nhân.
- Kết nối với các trang tin tức đám cưới để xin được liệt kê trong các bài tổng hợp 'Báo giá chụp ảnh cưới trọn gói'.

## Sửa gì trên web để tăng liên hệ

- Tạo các nút CTA trực tiếp đến WhatsApp hoặc Zalo cho mỗi gói giá cụ thể.
- Thêm mục FAQ trên trang /pricing để giải đáp các thắc mắc về 'Báo giá' và 'Quy trình'.
- Thiết kế landing page riêng cho dịch vụ Chụp ảnh chân dung để tách biệt với khách hàng cưới.
- Tích hợp nút gọi trực tiếp từ hotline 0909383332 trên mọi trang báo giá.

## Keyword tiếng Anh cho khách Singapore / Malaysia / Mỹ

Harvest riêng bằng autocomplete tiếng Anh (`language=en-US`). Đây là cách khách nước ngoài thật sự tìm: họ không gõ "wedding photographer Vietnam" trước, mà gõ **"overseas / abroad / destination pre-wedding"** rồi mới chọn điểm đến. Nên nhóm từ khoá đó mới là cửa vào.

### Nhóm "chụp ở nước ngoài" — cửa vào chính (86 cụm)

- affordable pre wedding photoshoot singapore
- asia wedding photographer
- best place for pre wedding photoshoot in malaysia
- best pre wedding photoshoot in malaysia
- best pre wedding photoshoot singapore
- destination wedding packages vietnam
- destination wedding photographer
- destination wedding photographer asia costs
- destination wedding photographer asia packages
- destination wedding photographer asia price list
- destination wedding photographer asia prices
- destination wedding photographer asia reviews
- destination wedding photographer asian
- destination wedding planner vietnam
- destination wedding venues in vietnam
- destination wedding vietnam best place
- destination wedding vietnam best places
- destination wedding vietnam best time
- destination wedding vietnam cost
- destination wedding vietnam price list
- destination wedding vietnam prices
- destination wedding vietnam reviews
- indian destination wedding in vietnam
- indian pre wedding photoshoot malaysia
- indian pre wedding photoshoot package malaysia
- indian pre wedding photoshoot singapore
- indoor pre wedding photoshoot singapore
- malaysia pre wedding overseas best time
- malaysia pre wedding overseas costs
- malaysia pre wedding overseas packages
- malaysia pre wedding overseas price list
- malaysia pre wedding overseas prices
- malaysia pre wedding overseas reviews
- malaysia pre wedding overseas tour
- malaysia pre wedding photoshoot
- overseas pre wedding photoshoot best ideas
- overseas pre wedding photoshoot costs
- overseas pre wedding photoshoot packages
- overseas pre wedding photoshoot prices
- overseas pre wedding photoshoot reviews
- overseas pre wedding photoshoot singapore
- overseas wedding shoot
- pre wedding in singapore
- pre wedding photoshoot abroad best time
- pre wedding photoshoot abroad costs
- pre wedding photoshoot abroad packages
- pre wedding photoshoot abroad packages vietnam
- pre wedding photoshoot abroad prices
- pre wedding photoshoot abroad reviews
- pre wedding photoshoot ideas malaysia
- pre wedding photoshoot location malaysia
- pre wedding photoshoot malaysia costs
- pre wedding photoshoot malaysia from singapore package
- pre wedding photoshoot malaysia price
- pre wedding photoshoot malaysia reviews
- pre wedding photoshoot overseas costs
- pre wedding photoshoot overseas packages
- pre wedding photoshoot overseas price list
- pre wedding photoshoot overseas prices
- pre wedding photoshoot overseas reviews
- pre wedding photoshoot package malaysia
- pre wedding photoshoot package malaysia price
- pre wedding photoshoot package price singapore
- pre wedding photoshoot singapore
- pre wedding photoshoot singapore costs
- pre wedding photoshoot singapore location
- pre wedding photoshoot singapore package
- pre wedding photoshoot singapore price
- pre wedding photoshoot singapore reviews
- pre wedding photoshoot studio malaysia
- pre wedding photoshoot studio singapore
- singapore couple pre wedding overseas best time
- singapore couple pre wedding overseas costs
- singapore couple pre wedding overseas packages
- singapore couple pre wedding overseas photos
- singapore couple pre wedding overseas price list
- singapore couple pre wedding overseas prices
- singapore couple pre wedding overseas reviews
- singapore couple pre wedding overseas tour
- singapore pre wedding
- singapore pre wedding shoot
- singapore wedding photoshoot
- vietnam destination wedding photographer
- wedding photographer saigon from singapore malay
- wedding photography package vietnam from singapore price
- wedding photography singapore

### Nhóm gắn thẳng Vietnam / Saigon (156 cụm)

- Ho Chi Minh Photographer - Duong Le, Bến Vân Đồn, Khanh Hoi, Ho Chi Minh
- Ho Chi Minh Photographer - Duong Le, Bến Vân Đồn, Khanh Hoi, Ho Chi Minh City
- best wedding photographer vietnam
- cheese media vietnam wedding videographer &amp; photographer da nang reviews
- cinematic wedding film vietnam costs
- cinematic wedding film vietnam packages
- cinematic wedding film vietnam price list
- cinematic wedding film vietnam prices
- cinematic wedding film vietnam reviews
- cinematic wedding film vietnamese
- couple photoshoot vietnam best time
- couple photoshoot vietnam costs
- couple photoshoot vietnam packages
- couple photoshoot vietnam price list
- couple photoshoot vietnam prices
- couple photoshoot vietnam reviews
- elopement vietnam
- engagement photo saigon vietnam
- ho chi minh city photographer best practices
- ho chi minh city photographer costs
- ho chi minh city photographer packages
- ho chi minh city photographer price list
- ho chi minh city photographer prices
- ho chi minh city photographer reviewer
- ho chi minh city photographer reviews
- ho chi minh city photography
- ho chi minh city photography tour
- ho chi minh pre wedding photographer
- ho chi minh wedding planner
- jasmin wedding vietnam elopement photographer
- photographer ho chi minh
- photographer ho chi minh city
- photography saigon
- pre wedding photoshoot vietnam best time
- pre wedding photoshoot vietnam costs
- pre wedding photoshoot vietnam packages
- pre wedding photoshoot vietnam price
- pre wedding photoshoot vietnam reviews
- pre wedding shoot vietnam package best price
- pre wedding shoot vietnam package costs
- pre wedding shoot vietnam package package price
- pre wedding shoot vietnam package packages
- pre wedding shoot vietnam package price list
- pre wedding shoot vietnam package prices
- pre wedding shoot vietnam package reviews
- pre wedding vietnam
- prewedding di vietnam
- prewedding vietnam best western
- prewedding vietnam packages
- prewedding vietnam price list
- prewedding vietnam prices
- prewedding vietnam reviews
- professional photographer ho chi minh city
- professional photographer saigon
- saigon execution photographer
- saigon family photographer
- saigon imaging photography tours
- saigon photographer best selling
- saigon photographer costs
- saigon photographer packages
- saigon photographer price list
- saigon photographer prices
- saigon photographer reviewer
- saigon photographer reviews
- saigon photography tour
- saigon wedding photographer
- saigon wedding photography
- sapa vietnam elopement
- street style pre wedding itinerary vietnam
- videographer vietnam
- vietnam elopement best practices
- vietnam elopement best selling
- vietnam elopement costs
- vietnam elopement packages for couples
- vietnam elopement photographer
- vietnam elopement price list
- vietnam elopement prices
- vietnam elopement reviews
- vietnam elopement wedding
- vietnam engagement photoshoot costs
- vietnam engagement photoshoot packages
- vietnam engagement photoshoot prices
- vietnam engagement photoshoot reviews
- vietnam honeymoon photographer costs
- vietnam honeymoon photographer packages
- vietnam honeymoon photographer price list
- vietnam honeymoon photographer prices
- vietnam honeymoon photographer reviews
- vietnam honeymoon photographers
- vietnam pre wedding
- vietnam pre wedding bestellen
- vietnam pre wedding costs
- vietnam pre wedding location
- vietnam pre wedding package price best price
- vietnam pre wedding package price best time
- vietnam pre wedding package price packages
- vietnam pre wedding package price price list
- vietnam pre wedding package price pricecharting
- vietnam pre wedding package price prices
- vietnam pre wedding package price reviews
- vietnam pre wedding photo
- vietnam pre wedding photo shoot
- vietnam pre wedding photographer
- vietnam pre wedding photography
- vietnam pre wedding photography package
- vietnam pre wedding photography package price
- vietnam pre wedding photoshoot
- vietnam pre wedding reviews
- vietnam pre wedding shoot
- vietnam pre wedding shoot package
- vietnam pre wedding shoot price
- vietnam pre wedding studio
- vietnam prewedding
- vietnam waterfall elopement
- vietnam wedding academy
- vietnam wedding cost
- vietnam wedding photo
- vietnam wedding photographer
- vietnam wedding photographer costs
- vietnam wedding photographer packages
- vietnam wedding photographer price list
- vietnam wedding photographer prices
- vietnam wedding photographer reviews
- vietnam wedding photographers
- vietnam wedding photoshoot
- vietnam wedding video
- vietnam wedding videographer best practices
- vietnam wedding videographer best songs
- vietnam wedding videographer costs
- vietnam wedding videographer packages
- vietnam wedding videographer price list
- vietnam wedding videographer prices
- vietnam wedding videographer reviews
- wedding photo ho chi minh
- wedding photographer ho chi minh
- wedding photographer ho chi minh best buy
- wedding photographer ho chi minh costs
- wedding photographer ho chi minh package tour
- wedding photographer ho chi minh packages
- wedding photographer ho chi minh price list
- wedding photographer ho chi minh prices
- wedding photographer ho chi minh reviews
- wedding photographer saigon costa
- wedding photographer saigon packages
- wedding photographer saigon price list
- wedding photographer saigon prices
- wedding photographer saigon reviews
- wedding photography package vietnam best practices
- wedding photography package vietnam best price
- wedding photography package vietnam costs
- wedding photography package vietnam packages
- wedding photography package vietnam reviews
- wedding photos saigon
- wedding photoshoot ho chi minh
- wedding planner vietnam
- wedding studio saigon

**Đã áp lên site:** `vietnam wedding photographer`, `wedding photographer saigon`, `destination wedding vietnam`, `pre wedding photoshoot vietnam`, `vietnam pre wedding package price`, `destination wedding vietnam cost`, `overseas pre wedding photoshoot packages` — vào title/description/keywords của 4 trang `/en`, H1, FAQ và JSON-LD `areaServed`.

## Kế hoạch theo từng trang

### `/`

- **Keyword chính:** Bảng Giá Chụp Ảnh Cưới Uy Tín TPHCM
- **Keyword phụ:** chụp hình cưới uy tín tphcm, bảng giá chụp ảnh cưới trọn gói, chụp hình cưới ngoại cảnh sài gòn
- **Title tag:** Bảng Giá Chụp Ảnh Cưới Uy Tín TPHCM | PhatBo Photography *(56 ký tự)*
- **Meta description:** PhatBo Photography cung cấp dịch vụ chụp ảnh cưới uy tín TPHCM với phong cách cinematic sang trọng. Xem ngay bảng giá chụp ảnh cưới trọn gói và bộ sưu tập đẹp. *(159 ký tự)*
- **Cần sửa:**
  - Cập nhật từ trang chủ thành trung tâm nội dung về báo giá
  - Bổ sung các cụm từ 'uy tín' và 'trọn gói' vào mô tả
  - Nhấn mạnh phong cách cinematic cho phân khúc cao cấp

### `/albums`

- **Keyword chính:** Chụp Hình Cưới Uy Tín TPHCM
- **Keyword phụ:** chụp hình cưới ngoại cảnh sài gòn, bảng giá chụp ảnh cưới đẹp tại tphcm
- **Title tag:** Portfolio Chụp Hình Cưới Uy Tín TPHCM - PhatBo *(46 ký tự)*
- **Meta description:** Khám phá bộ sưu tập hơn 180 ảnh cưới nghệ thuật, phong cách streetstyle Sài Gòn và cinematic tại PhatBo Photography. Đội ngũ 15 năm kinh nghiệm. *(144 ký tự)*
- **Cần sửa:**
  - Tối ưu tiêu đề chứa từ khóa 'uy tín' và 'tphcm'
  - Lồng ghép yếu tố số lượng ảnh (180) để tăng độ tin cậy
  - Nhấn mạnh phong cách streetstyle đặc trưng của studio

### `/pricing`

- **Keyword chính:** Báo Giá Chụp Ảnh Cưới Trọn Gói TPHCM
- **Keyword phụ:** bảng giá chụp ảnh cưới tphcm 2024, bảng giá chụp ảnh cưới đẹp ở tphcm, bảng giá chụp ảnh cưới uy tín sài gòn
- **Title tag:** Báo Giá Chụp Ảnh Cưới Trọn Gói TPHCM - PhatBo Photography *(57 ký tự)*
- **Meta description:** Xem bảng giá chụp ảnh cưới trọn gói tại TPHCM. Các gói Studio, Street & Phóng sự cưới chuyên nghiệp với đội ngũ 15 năm kinh nghiệm từ PhatBo. *(141 ký tự)*
- **Cần sửa:**
  - Thay thế tiêu đề chung bằng cụm 'Báo Giá' để đánh đúng mục đích tìm kiếm
  - Cập nhật năm 2024 vào từ khóa phụ
  - Liệt kê rõ các loại hình: Studio, Street, Phóng sự

### `/contact`

- **Keyword chính:** Chụp Hình Cưới Uy Tín TPHCM
- **Keyword phụ:** chụp hình cưới uy tín tphcm, báo giá chụp ảnh cưới uy tín sài gòn
- **Title tag:** Liên Hệ Chụp Hình Cưới Uy Tín TPHCM - PhatBo Photography *(56 ký tự)*
- **Meta description:** Kết nối với PhatBo Photography để nhận tư vấn về dịch vụ chụp hình cưới uy tín TPHCM, báo giá trọn gói và đặt lịch quay chụp phóng sự chuyên nghiệp. *(148 ký tự)*
- **Cần sửa:**
  - Chèn từ khóa 'uy tín' vào tiêu đề trang liên hệ
  - Bổ sung cụm từ 'báo giá' để thu hút khách hàng đang cân nhắc chi phí

### Trang nên tạo thêm

| Path | Mục đích | Keyword chính | Vì sao bây giờ |
|---|---|---|---|
| `/phong-su-cuoi` | Landing page chuyên sâu cho dịch vụ phóng sự cưới và quay phim. | Báo Giá Quay Phim Cưới Trọn Gói | Tối ưu cho nhóm từ khóa 'báo giá', 'phóng sự' đang có lượng tìm kiếm cao. |
| `/chan-dung-doanh-nhan` | Landing page chuyên về chân dung doanh nhân và hồ sơ cá nhân. | Chụp Hình Profile Doanh Nhân | Khai thác phân khúc khách hàng B2B và dịch vụ bổ trợ (CV, LinkedIn). |
| `/su-kien` | Landing page cho dịch vụ quay phim sự kiện và hội thảo. | Dịch Vụ Quay Phim Sự Kiện | Tận dụng từ khóa cụ thể về địa điểm và loại hình sự kiện tại TP.HCM. |

<details><summary>Keyword thật nhưng lệch địa bàn — đã lọc bỏ (91)</summary>

Đây là cụm người ta thật sự gõ, nhưng nhắm tỉnh/thành khác. Giữ lại đây để tham khảo nếu sau này studio nhận chụp ngoài TP.HCM.

- Chụp Phóng Sự Cưới - Tuong Lam Photos Bình Dương, Đại lộ Bình Dương, Phú Lợi, Hồ Chí Minh
- Chụp Phóng Sự Cưới - Tuong Lam Photos Bình Dương, Đại lộ Bình Dương, Phú Lợi, Sài Gòn
- Tony Wedding - Chụp ảnh cưới Bình Dương, Thích Quảng Đức, Thủ Dầu Một, Sài Gòn
- bảng giá chụp ảnh cưới hải phòng
- bảng giá chụp ảnh cưới tại huế
- bảng giá chụp ảnh cưới uy tín hà nội
- bảng giá chụp ảnh cưới uy tín tại hà nội
- bảng giá chụp ảnh cưới uy tín ở hà nội
- bảng giá chụp ảnh cưới ở nha trang
- chụp phóng sự cưới cần thơ
- chụp phóng sự cưới hà nội
- chụp phóng sự cưới đà lạt
- chụp phóng sự cưới đà nẵng
- chụp ảnh chân dung linkedin hà nội
- chụp ảnh chân dung đẹp tại đà nẵng
- chụp ảnh chân dung đẹp ở hà nội
- chụp ảnh chân dung đẹp ở hải phòng
- chụp ảnh cưới bao nhiêu uy tín hà nội
- chụp ảnh cưới bao nhiêu uy tín tại hà nội
- chụp ảnh cưới bao nhiêu uy tín ở hà nội
- chụp ảnh cưới bao nhiêu đẹp nhất hà nội
- chụp ảnh cưới bao nhiêu ở đâu hà nội
- chụp ảnh cưới bao nhiêu ở đâu đẹp hà nội
- chụp ảnh cưới bình dương
- chụp ảnh cưới giá rẻ hà nội
- chụp ảnh cưới ngoại cảnh cần thơ
- chụp ảnh cưới ngoại cảnh hà nội
- chụp ảnh cưới ngoại cảnh nha trang
- chụp ảnh cưới ngoại cảnh uy tín hà nội
- chụp ảnh cưới ngoại cảnh uy tín tại hà nội
- chụp ảnh cưới ngoại cảnh uy tín ở hà nội
- chụp ảnh cưới ngoại cảnh vũng tàu
- chụp ảnh cưới ngoại cảnh đà lạt
- chụp ảnh cưới ngoại cảnh đà nẵng
- chụp ảnh cưới studio hà nội
- chụp ảnh cưới studio đà nẵng
- chụp ảnh cưới uy tín hà nội
- chụp ảnh cưới uy tín tại hà nội
- chụp ảnh cưới uy tín ở hà nội
- chụp ảnh cưới vũng tàu
- chụp ảnh cưới đà lạt
- chụp ảnh cưới đà lạt giá bao nhiêu
- chụp ảnh cưới đà nẵng giá bao nhiêu
- chụp ảnh cưới đẹp hà nội
- chụp ảnh cưới đẹp hải phòng
- chụp ảnh cưới đẹp đà nẵng
- chụp ảnh cưới đẹp ở phú quốc
- chụp ảnh cưới ở đâu hà nội
- chụp ảnh cưới ở đâu đẹp hà nội
- chụp ảnh doanh nhân hà nội
- chụp ảnh doanh nhân tại hà nội
- chụp ảnh doanh nhân đà nẵng
- chụp ảnh profile chuyên nghiệp hà nội
- chụp ảnh profile tại hà nội
- chụp ảnh profile đẹp hà nội
- chụp ảnh sự kiện cần thơ
- chụp ảnh sự kiện hà nội
- chụp ảnh sự kiện hải phòng
- chụp ảnh sự kiện nha trang
- chụp ảnh sự kiện tại hà nội
- chụp ảnh sự kiện đà nẵng
- dịch vụ quay chụp sự kiện cần thơ
- giá chụp ảnh cưới hà nội
- giá chụp ảnh cưới ngoại cảnh đà lạt
- giá chụp ảnh cưới studio hà nội
- giá chụp ảnh cưới studio đà nẵng
- giá chụp ảnh cưới tại thanh hóa
- giá chụp ảnh cưới uy tín hà nội
- giá chụp ảnh cưới uy tín tại hà nội
- giá chụp ảnh cưới uy tín ở hà nội
- giá chụp ảnh cưới vũng tàu
- giá chụp ảnh cưới đà nẵng
- gói chụp ảnh cưới hà nội
- gói chụp ảnh cưới studio hà nội
- gói chụp ảnh cưới đà lạt
- gói chụp ảnh cưới đà nẵng
- phóng sự cưới hà nội
- phóng sự cưới đà nẵng
- phóng sự cưới đẹp ở biên hòa hip bridal
- review chụp ảnh cưới hà nội
- review chụp ảnh cưới đà lạt
- review chụp ảnh cưới đà nẵng
- review studio chụp ảnh cưới đẹp ở hà nội
- review studio chụp ảnh cưới đẹp ở đà lạt
- review studio chụp ảnh cưới đẹp ở đà nẵng
- studio chụp hình đẹp ở vũng tàu
- studio chụp ảnh cưới hà nội
- studio chụp ảnh cưới đẹp đà nẵng
- studio chụp ảnh cưới đẹp ở hà nội
- studio chụp ảnh cưới đẹp ở hải phòng
- studio chụp ảnh cưới ở đà lạt

</details>

---

Chạy lại: `tools.py` (SearXNG + ollama, cache theo hash tham số) + `research2.py` + `assemble2.py` trong scratchpad của session. Mọi tool call đều cache ra đĩa nên chạy lại gần như tức thì; xoá file trong `toolcache/` để lấy dữ liệu mới.
