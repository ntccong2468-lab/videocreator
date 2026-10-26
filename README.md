# videoCreator

![VN](apps/web/public/vn-logo.svg)

**Tác giả bản videoCreator: Nguyễn Thành Công.**

Ứng dụng desktop cho Windows để tải video, dịch nội dung, tạo phụ đề và lồng tiếng trong một không gian làm việc.

## Tính năng

- Tải video từ các nguồn được hỗ trợ, tùy theo quyền truy cập và cấu hình tài khoản.
- Nhận dạng giọng nói và tạo phụ đề.
- Dịch phụ đề, chỉnh sửa câu chữ và thời gian hiển thị.
- Tạo giọng đọc, lồng tiếng và xuất video kèm phụ đề.
- Lựa chọn dịch vụ AI và phương thức xử lý phù hợp với máy.

Mã nguồn miễn phí. Dịch vụ AI, API và model bên thứ ba có thể có chi phí hoặc điều kiện sử dụng riêng. Bản hiện tại chưa tích hợp tự động đăng Facebook.

## Link video

Phần tải video và dịch/lồng tiếng nhận link HTTP/HTTPS công khai qua bộ phân tích yt-dlp, gồm Bilibili.tv, Vimeo, các mạng xã hội và link media trực tiếp. Không còn giới hạn ở danh sách 10 nền tảng trước đây. Tham số truy cập trong link được giữ nguyên.

Ví dụ: `https://www.bilibili.tv/en/video/4801343148661760?bstar_from=bstar-web.homepage.recommend.all`.

Việc nhận link không bảo đảm mọi video đều tải được: nguồn có thể yêu cầu đăng nhập, chặn khu vực, có DRM hoặc không có luồng video mà bộ phân tích hỗ trợ. Khi kiểm tra link Bilibili.tv mẫu, nền tảng trả về giới hạn bản quyền theo khu vực.

## Windows x64

Khuyến nghị Windows 10/11, RAM 16 GB trở lên. Có thể dùng nhận dạng CPU hoặc dịch vụ nhận dạng online; không bắt buộc card NVIDIA cho cấu hình này. Không phải mọi model AI đều hỗ trợ CPU.

### Tải bộ cài

[Tải videoCreator VN 3.2.9-vn.2 cho Windows x64](https://github.com/ntccong2468-lab/videocreator/releases/download/v3.2.9-vn.2/videoCreator-3.2.9-vn.2-win-x64.exe)

[Trang phát hành và checksum SHA-256](https://github.com/ntccong2468-lab/videocreator/releases/tag/v3.2.9-vn.2).
Bộ cài đã qua build và kiểm tra khởi động trên Windows bằng GitHub Actions. Bộ cài chưa ký số.

### Tự build

Cài Git, Node.js 22 LTS, Go 1.25 và pnpm 9.15.0. Mở PowerShell tại thư mục mã nguồn:

```powershell
powershell -ExecutionPolicy Bypass -File .\Build-Windows.ps1
```

Script cài dependency, build và kiểm tra ứng dụng. Kết quả dự kiến: `apps/desktop/release/videoCreator-3.2.9-vn.2-win-x64.exe`.

## Ngôn ngữ giao diện

Trong ứng dụng, vào **Cài đặt → Chung → Ngôn ngữ hiển thị → Tiếng Việt**.
Nếu đang dùng tiếng Trung: **设置 → 常规 → 显示语言 → Tiếng Việt**.
Bản VN 3.2.9-vn.2 mặc định dùng tiếng Việt cho cấu hình mới và màn hình khởi động. Lựa chọn ngôn ngữ đã lưu vẫn được giữ; nếu nâng cấp từ bản cũ đang dùng ngôn ngữ khác, hãy đổi trong Cài đặt theo hướng dẫn trên.

## Bắt đầu sử dụng

1. Cấu hình dịch vụ nhận dạng, dịch và giọng đọc.
2. Nhập video cục bộ hoặc link được hỗ trợ.
3. Chọn ngôn ngữ đích và thiết lập phụ đề, lồng tiếng.
4. Kiểm tra bản dịch và xuất video.

Nên thử với một đoạn video ngắn trước khi xử lý video dài. Chỉ sử dụng nội dung bạn có quyền tải, chỉnh sửa và xuất bản.

## Giấy phép

Xem [LICENSE](LICENSE) và các thông báo bản quyền đi kèm. Dependency và model có giấy phép riêng.
