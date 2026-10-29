# Website Dự Án "Tư Duy Giải Quyết Vấn Đề" - Nhóm Five Stars

Trang web chính thức giới thiệu dự án môn học **SSA101 – Learning Skills in Real Life** của nhóm **Five Stars** (Trường Đại học FPT).

---

## 👥 Nhóm Tác Giả (Five Stars ★★★★★)
1. **Vũ Tiến Dũng** (MSSV: HE211181) – Phụ trách Nội dung
2. **Nguyễn Phúc Ngọc Trúc** (MSSV: HE211342) – Phụ trách Nội dung
3. **Nguyễn Văn Trường** (MSSV: HE211244) – Thiết kế Slide
4. **Trần Lê Nhật Khánh** (MSSV: HE211523) – Thiết kế Slide
5. **Nguyễn Quang Minh** (MSSV: HE211010) – Thiết kế Slide

---

## 📐 Cấu Trúc Bố Cục Trang Web
Trang web được sắp xếp đúng theo cấu trúc yêu cầu của đề án:
1. **Đầu trang (Hero Header):**
   * Câu chủ đề: *DỰ ÁN RÈN LUYỆN PHÁT TRIỂN TƯ DUY GIẢI QUYẾT VẤN ĐỀ*.
   * Giới thiệu nhóm Five Stars & danh sách 5 thành viên.
   * **2 Nút bấm hành động:** Nút "Đăng ký tham gia khóa học" và Nút "Video chiêu sinh".
2. **Khu vực Video Chiêu Sinh:**
   * Khung tỉ lệ chuẩn 16:9 với hiệu ứng chờ hiện đại.
   * Công cụ tích hợp sẵn cho phép dán link YouTube để kiểm tra xem thử trực tiếp.
3. **Bối Cảnh & Lý Do Chọn Đề Án:**
   * Dữ liệu khảo sát thực tế trên 34 sinh viên Đại học FPT (biểu đồ trực quan sinh động).
   * Căn cứ nghiên cứu từ World Economic Forum (2025).
4. **Chi Tiết Kế Hoạch 4 Buổi Học:**
   * **Bảng tổng hợp chi tiết:** Buổi, Tên chủ đề, Hình thức (2 Online - 2 Offline), Nội dung trọng tâm (5W1H, 5 Whys, Ishikawa, SIFT, AI có trách nhiệm, Design Thinking) và Sản phẩm đánh giá.
5. **Mục Cam Kết (6 Cam Kết của nhóm Five Stars):**
   * Nội dung học thuật, Trung thực khảo sát, Trách nhiệm triển khai, Môi trường học an toàn, Sử dụng AI có trách nhiệm, Cầu thị tiếp nhận góp ý.
6. **Khu Vực Form Đăng Ký:**
   * Nút bấm dẫn tới Google Form (sẵn sàng gắn link khi nhóm có link chính thức).
7. **Danh Mục Tài Liệu Tham Khảo (9 nguồn trích dẫn):**
   * Freeman et al. (PNAS 2014), WEF 2025, Mind Tools, Mike Caulfield SIFT, UNESCO 2024 AI Framework, IxDF, Khảo sát sinh viên FPTU 2026.

---

## 🔍 Cách Xem Tiến Trình Trong Lúc Chỉnh Sửa
* **Cách đơn giản nhất:** Mở file `index.html` trong trình duyệt bất kỳ. Mỗi khi có thay đổi, bạn chỉ cần nhấn **F5** (hoặc `Ctrl + R` / nút Tải lại trang) trên trình duyệt để thấy ngay kết quả mới nhất.
* **Cách mở local server:**
  ```powershell
  cd C:\Users\truon\.gemini\antigravity\scratch\ssa-course-website
  python -m http.server 3000
  ```
  Sau đó mở `http://localhost:3000`.

---

## 🌐 Sau Khi Hoàn Thành, Đưa Website Lên Mạng (Hosting & Tên Miền) Có Dễ Không?
**CỰC KỲ DỄ DÀNG VÀ HOÀN TOÀN MIỄN PHÍ:**
1. **Nền tảng triển khai miễn phí (Vercel / Netlify / GitHub Pages / Cloudflare Pages):**
   * Do trang web được viết bằng HTML/CSS/JS thuần, bạn chỉ cần kéo thả toàn bộ thư mục này lên **Netlify Drop** (tại [app.netlify.com/drop](https://app.netlify.com/drop)) hoặc kết nối qua GitHub với **Vercel**.
   * Thời gian xuất bản: **Chỉ mất chưa đầy 1 phút**.
   * Bạn sẽ nhận ngay một địa chỉ web trực tuyến hoạt động 24/7 (Ví dụ: `fivestars-ssa101.vercel.app` hoặc `duan-fivestars.netlify.app`), có sẵn chứng chỉ bảo mật SSL (`https://`).
2. **Nếu muốn gắn tên miền riêng (Ví dụ: `fivestars.vn` hoặc `fivestars.com`):**
   * Bạn chỉ cần mua tên miền tại các nhà cung cấp (như iNet, Mắt Bão, Namecheap, Cloudflare,...) và vào phần cài đặt tên miền của Vercel/Netlify để trỏ DNS. Mình sẽ hướng dẫn chi tiết từng bước khi nhóm bạn sẵn sàng!
