# videoCreator — bản nguồn Windows dựa trên OpenCreator v3.2.9

Nguồn gốc: https://github.com/krillinai/OpenCreator/releases/tag/v3.2.9
Commit gốc: cb4f7fcf72b6f9061257350779891432c63cdced.

Bản tùy biến VN của Nguyễn Thành Công, dùng logo VN chữ trắng trên nền đen.

Bộ cài Windows đã build và qua kiểm tra khởi động trên GitHub Actions: https://github.com/ntccong2468-lab/videocreator/releases/tag/v3.2.9-vn.1 .
Không có tính năng tự đăng Facebook.

## Đã thay đổi

- Tên ứng dụng Windows, cửa sổ, khay hệ thống, màn hình khởi động và tên chính ở sidebar: videoCreator.
- ID ứng dụng: local.videocreator.desktop; giao thức ngoài: videocreator://.
- Thư mục dữ liệu mặc định: .videocreator thay vì .opencreator. Biến OPENCREATOR_HOME cũ vẫn có thể ghi đè, không đặt nó trỏ vào dữ liệu OpenCreator.
- Tắt cập nhật ứng dụng từ upstream; loại bỏ cấu hình phát hành lên repo gốc.
- Giữ chung giao diện Web/Desktop, chức năng, giấy phép và các thành phần runtime gốc.
- Workflow build Windows và phát hành được bật và chạy thủ công; workflow upstream lưu ở docs/upstream-workflows.
- Các tên gói, API, biểu tượng, font, nội dung trợ giúp và một số nhãn dịch vụ OpenCreator vẫn được giữ để tránh làm hỏng tương thích. Đây chưa phải đổi toàn bộ thương hiệu.

## Build trên Windows 10/11 x64

1. Cài Git, Node.js 22 LTS, Go theo runtime/krillinai/go.mod (Go 1.25), pnpm 9.15.0.
2. Giải nén vào thư mục ngắn như C:\videoCreator; chuẩn bị Internet và dung lượng cho dependency/runtime.
3. Mở PowerShell tại thư mục nguồn, chạy `powershell -ExecutionPolicy Bypass -File .\Build-Windows.ps1`.
4. Script cài dependency, build theo quy trình upstream, xác minh package và chạy smoke test. Lần đầu tải nhiều thành phần, có thể lâu.
5. Bộ cài dự kiến: apps/desktop/release/videoCreator-3.2.9-vn.1-win-x64.exe. Chỉ coi là bản Windows đạt kiểm tra sau khi cả script thành công.

Có thể đưa mã nguồn vào repo GitHub của bạn và chạy Actions → Build videoCreator for Windows → Run workflow. Bản VN đã được build và kiểm thử bằng workflow trên GitHub Actions. Các bước Actions bên thứ ba và dịch vụ GitHub chịu điều khoản/giới hạn riêng.

## Máy i7-1255U / RAM 16 GB / Iris Xe

Dùng nhận dạng CPU (base/small nếu chọn Whisper), thực hiện một video mỗi lần. Không bật model yêu cầu CUDA. Không có phép đo tốc độ thực tế trên máy của bạn. Các chức năng AI khác phụ thuộc dịch vụ/model bạn cấu hình.

## Miễn phí và giới hạn

Mã nguồn gốc theo Apache-2.0. Giữ LICENSE và NOTICE.videoCreator khi phân phối; dependency, model và thành phần đi kèm có giấy phép riêng. Mã nguồn miễn phí không đảm bảo API AI, tài khoản dịch vụ hoặc runtime bên thứ ba miễn phí. Chưa kiểm tra callback đăng nhập/thanh toán của dịch vụ upstream có chấp nhận giao thức videocreator://; không nên coi các tính năng tài khoản cloud này đã hoạt động trong fork.

Không có khóa API, cookie hoặc tài khoản được đóng gói. Bộ cài Windows được tạo và kiểm tra khởi động trên runner Windows của GitHub Actions; chưa kiểm thử trực tiếp trên máy cá nhân của bạn.
