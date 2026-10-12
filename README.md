# HẮC HẢI KÝ SỰ — Website sinh nhật cho anh Công

Một website sinh nhật cá nhân được thiết kế theo chủ đề **tiên hiệp Trung Hoa × đen/vàng đồng × biển Nha Trang**, có 4 mini-game và mật thư cuối hành trình. Không cần cài đặt framework, npm hoặc máy chủ backend.

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
  hero-landscape.svg
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
