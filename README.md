# HẮC HẢI KÝ SỰ — Website sinh nhật cho anh Công

Một website sinh nhật cá nhân được thiết kế theo chủ đề **tiên hiệp Trung Hoa × đen/vàng đồng × biển Nha Trang**, có 4 mini-game và mật thư cuối hành trình. Không cần cài đặt framework, npm hoặc máy chủ backend.

## C1 · Cinematic Xianxia Hero (2026-10-12)

Website gốc đã được nâng cấp **chỉ ở cảnh mở đầu và hero**:

- `assets/cinematic/hero-desktop.webp`: phong cảnh tiên hiệp điện ảnh độ phân giải 1672×941, có biển/đảo núi, trăng và công trình Trung Hoa cổ.
- `assets/cinematic/hero-mobile.webp`: phối cảnh dành cho màn hình dọc, giúp phần chữ HTML dễ đọc hơn.
- Lần đầu mở trong một phiên tab, cảnh **Thiên Môn Khai Mở** hiện ra. Bấm **Bước vào giang hồ**, **Bỏ qua lời dẫn** hoặc phím `Escape` để đóng. Có nút **Xem lại mở đầu** trên trang chính.
- Nhạc vẫn **không tự phát**; toàn bộ câu chữ/nút được viết bằng HTML và có thể truy cập bàn phím.
- Giao diện chuyển động dịu (camera chậm và lớp khói/ánh sáng tĩnh). Khi người dùng bật giảm chuyển động, hiệu ứng motion được tắt.
- Mini-game, `config.js`, thư, canvas, âm thanh và khóa lưu nhiệm vụ `birthday-for-cong-v1` vẫn giữ như phiên bản gốc.
- Việc đã xem intro được lưu **riêng trong `sessionStorage`** dưới khóa `hac-hai-ky-su-cinematic-intro-v1`; không làm thay đổi dữ liệu nhiệm vụ. Muốn xem lại có thể dùng nút trong hero.
- Hình ảnh nhân vật và chó pug chỉ là cảnh fantasy được AI sáng tác, **không phải ảnh thật của anh Công hay Bob**. Muốn chèn ảnh thật về Bob, sử dụng `bobPhoto` trong `config.js`.

Phạm vi chỉ đến **C1 — chờ bạn duyệt giao diện**. Bản đồ kỳ duyên và bốn mini-game bên dưới vẫn giữ bố cục cũ; các scene này thuộc C2 trở đi, chưa chỉnh sửa.

## Mở thử

Mở `index.html` bằng Chrome, Edge hoặc Firefox. Nhạc nền mặc định tắt; nhấn nút **Bật âm thanh** nếu muốn nghe giai điệu tạo trực tiếp bằng trình duyệt.

## Cá nhân hóa — chỉ cần sửa 1 file

Mở **`config.js`** bằng Notepad hoặc VS Code, sửa:

- `boyfriendName`: tên anh, hiện là `Công`.
- `fromName`: tên bạn hoặc cách xưng hô ở cuối thư.
- `birthdayDate`: ngày sinh nhật, chưa biết nên để trống.
- `favoriteQuote`: câu trích nhỏ trên nền núi trăng.
- `letterTitle`, `letterParagraphs`: tiêu đề và nội dung thư. Mỗi đoạn thư nằm trong một cặp dấu nháy, ngăn cách bằng dấu phẩy.
- `bobPhoto`, `nhaTrangPhoto`, `couplePhoto`: đường dẫn ảnh tự thêm. Ví dụ: `assets/bob.jpg` (phải chép ảnh vào đúng thư mục `assets`). Nếu để trống sẽ dùng tranh minh họa, không có lỗi ảnh.

**Lưu ý:** Nội dung lời thư có sẵn là lời chúc mẫu, không phải kỷ niệm thực tế của hai bạn. Hãy thay bằng lời của bạn để món quà thật riêng tư.

## Upload lên GitHub Pages

Chỉ cần **upload nội dung bên trong thư mục này**, giữ nguyên cấu trúc:

```text
index.html
styles.css
script.js
config.js
assets/
  hero-landscape.svg  # minh họa dự phòng từ phiên bản gốc
  cinematic/
    hero-desktop.webp
    hero-mobile.webp
  coast.svg
  bob-pug.svg
  favicon.svg
README.md
```

**Cách nhanh nhất:** Tạo repository công khai trên GitHub → `Add file` → `Upload files` → tải tất cả các file cùng thư mục `assets` lên nhánh `main` → `Commit changes` → `Settings` → `Pages` → `Deploy from a branch` → chọn `main` và `/ (root)` → `Save`. Chờ GitHub xuất đường link.

Nếu website được đặt trong repository đã có sẵn code, hãy **backup nội dung cũ trước khi thay**. Nếu muốn tạo website riêng thì nên tạo repository mới để không ảnh hưởng website khác.

## Nội dung tương tác

1. **Bến gió Nha Trang:** Thả câu hai lần để câu cá.
2. **Nông trại kỳ duyên:** Nhấn luống đất 3 lần (gieo → tưới → thu hoạch) và thu hoạch ít nhất hai lần.
3. **Thiên cơ HPC:** Kích hoạt Compute / Lustre / Network.
4. **Học viện vạn sự:** Trả lời đúng ba câu hỏi lịch sử, toán HPC và địa lý.
5. **Xưởng vẽ:** Dùng chuột hoặc cảm ứng để vẽ, chọn màu, xóa hoặc tải PNG.
6. **Bob:** Góc lưu một kỷ niệm về chú chó pug, có thể thay ảnh thật.
7. **Mật thư:** Mở đọc bất cứ lúc nào, không khóa sau nhiệm vụ; có hiệu ứng sinh nhật.

Tiến trình trò chơi được lưu vào `localStorage` trên thiết bị đang mở. Không có tài khoản hay thu thập dữ liệu người xem. Nút **Chơi lại từ đầu** xóa tiến trình nhiệm vụ trên thiết bị đó.

## Kiểm tra & lưu ý

- Tương thích desktop/mobile, hỗ trợ bàn phím, có chế độ giảm hiệu ứng chuyển động (`prefers-reduced-motion`).
- Phần lớn hình minh họa là SVG vẽ riêng nằm trong `assets`; không phụ thuộc ảnh bên ngoài. Font dùng Google Fonts, nếu mất mạng trình duyệt dùng font dự phòng.
- Không tự phát nhạc khi chưa có người dùng bấm.
- Mọi thứ chạy tĩnh; không có biểu mẫu thu dữ liệu hay chức năng lưu lời nhắn của người xem lên máy chủ.


## Hắc Hải Ký Sự 2.0 — C2: Vạn Giới Đồ & Tứ Cảnh Kỳ Duyên

- Bản đồ `#realm-map` gồm bốn điểm đến HTML có thể nhấn, nối tới bốn nhiệm vụ có sẵn (không yêu cầu mở khóa).
- Trạng thái hoàn thành trên bản đồ dùng chung `updateQuestProgress()` và dữ liệu lưu đã có, không thêm storage key.
- Ảnh cinematic C2: `assets/cinematic/world-map.webp`, `nha-trang-coast.webp`, `peanut-garden.webp`, `hpc-observatory.webp`, `ancient-library.webp`. Tất cả đều được đóng gói sẵn, không cần CDN ảnh.
- Mở `index.html` qua GitHub Pages hoặc static HTTP server, không cần build step.
- Trên mobile, bản đồ tự chuyển thành các điểm đến dạng dọc dễ bấm; có hỗ trợ giảm chuyển động trong tùy chọn hệ thống.
- Các quest, lịch sử lưu `birthday-for-cong-v1`, thư, vẽ và nhạc giữ nguyên từ C1.


## C2-HD artwork update (2026-10-12)
All nine immersive background illustrations use separate scenes in `assets/cinematic/` as 1920×1080 WebP, with a separate 900×1400 mobile hero. The native generated masters were 1672×941, and were high-quality resampled; the images are not true 4K. The website remains a static GitHub Pages project; copy the ZIP **contents** to the repository root, not the parent folder. Existing gameplay files and localStorage schema are unchanged. The separately provided QA ZIP includes screenshots, asset manifest, and a test report.
