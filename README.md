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

## Windows x64

Khuyến nghị Windows 10/11, RAM 16 GB trở lên. Có thể dùng nhận dạng CPU hoặc dịch vụ nhận dạng online; không bắt buộc card NVIDIA cho cấu hình này. Không phải mọi model AI đều hỗ trợ CPU.

### Tải bản build

Mở [GitHub Actions](https://github.com/ntccong2468-lab/videocreator/actions/workflows/videocreator-windows.yml), chọn lần build thành công và tải artifact **videoCreator-3.2.9-vn.1-windows-x64**. Bộ cài chỉ xuất hiện sau khi quy trình build và kiểm tra thành công.

### Tự build

Cài Git, Node.js 22 LTS, Go 1.25 và pnpm 9.15.0. Mở PowerShell tại thư mục mã nguồn:

```powershell
powershell -ExecutionPolicy Bypass -File .\Build-Windows.ps1
```

Script cài dependency, build và kiểm tra ứng dụng. Kết quả dự kiến: `apps/desktop/release/videoCreator-3.2.9-vn.1-win-x64.exe`.

## Bắt đầu sử dụng

1. Cấu hình dịch vụ nhận dạng, dịch và giọng đọc.
2. Nhập video cục bộ hoặc link được hỗ trợ.
3. Chọn ngôn ngữ đích và thiết lập phụ đề, lồng tiếng.
4. Kiểm tra bản dịch và xuất video.

Nên thử với một đoạn video ngắn trước khi xử lý video dài. Chỉ sử dụng nội dung bạn có quyền tải, chỉnh sửa và xuất bản.

## Giấy phép

Xem [LICENSE](LICENSE) và các thông báo bản quyền đi kèm. Dependency và model có giấy phép riêng.
