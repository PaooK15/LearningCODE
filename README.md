# MarisaOJ ICPC Roadmap & Algorithm Education Hub 🏆

Website tương tác giáo dục và huấn luyện lập trình thi đấu (Competitive Programming) được thiết kế theo khung chương trình chuẩn mực của **[MarisaOJ](https://marisaoj.com/roadmap/)**.

---

## 🎨 Bảng Màu Chuẩn Sư Phạm
Hệ thống tuân thủ nghiêm ngặt bộ màu nhận diện sư phạm theo yêu cầu:
- **Nền chính (Primary Background):** `#FFFFFF`
- **Nền phụ (Secondary Background):** `#EEF2F7`
- **Màu nhấn (Accent Color):** `#4A78C2`
- **Tiêu đề & Nhận diện (Titles & Branding):** `#1F3F73`

---

## 🏗 Cấu Trúc Khung Lộ Trình (Level 0 → Level 6 & Level 100)

| Cấp Độ | Tên Tiếng Việt | Đối Tượng Mục Tiêu | Chuyên Đề Cốt Lõi |
| :--- | :--- | :--- | :--- |
| **Level 0** | **Getting Started** (Nhập môn lập trình) | Người mới bắt đầu, rèn cú pháp | Fast I/O, Vòng lặp For/While, Mảng 1D & Tần số, Ma trận 2D, Chuỗi `std::string` |
| **Level 1** | **Simple Algorithms** (Kỹ thuật cơ bản) | HSG Tỉnh, ICPC Trường | Vét cạn toàn phần, Đệ quy & Quay lui, Mảng cộng dồn (Prefix Sum), Mảng hiệu, `std::sort` |
| **Level 2** | **Still Simple, But Crucial** (Cốt lõi) | Luyện thi HSG Tỉnh/QG | Tìm kiếm nhị phân, Chặt nhị phân kết quả, Hai con trỏ, Cửa sổ trượt, Tham lam, Meet in the Middle |
| **Level 3** | **Fundamental Knowledge** (Nền tảng) | Đội tuyển HSG Quốc Gia (VOI), ICPC National | BFS / DFS, Tập hợp rời rạc (DSU), Nhập môn Quy hoạch động (Knapsack, LIS, LCS), Tree DP, Bitmasks |
| **Level 4** | **Further Fundamentals** (Trung cấp) | Săn giải HSG Quốc Gia (VOI), ICPC Regional | Dijkstra, 0-1 BFS, Topological Sort, Segment Tree, Fenwick Tree, Sparse Table, LCA Binary Lifting, Hash chuỗi, Bitmask DP |
| **Level 5** | **Advanced Techniques** (Nâng cao) | Giải Nhất/Nhì VOI, Top ICPC Châu Á | Sqrt Decomposition & Mo's Algorithm, Segment Tree Lazy Propagation, Tarjan SCC & Khớp Cầu, Heavy-Light Decomposition (HLD) |
| **Level 6** | **Super Advanced** (Chuyên sâu Olympic) | ICPC World Finals, Đội tuyển Quốc tế (IOI/APIO) | Luồng cực đại Dinic, Centroid Decomposition, Convex Hull Trick / Li Chao Tree, Biến đổi Fourier nhanh (FFT / NTT) |
| **Level 100** | **Competitions & Boss Arena** (Đấu trường) | Đấu thủ mọi kỳ thi chính thức | Tuyển tập đề thi HSG Quốc Gia (VOI), ICPC Regional Archive, Kỹ thuật Stress Testing tự động, Chiến thuật 3 người 1 máy |

---

## 🌟 Các Tính Năng Nổi Bật

1. **Bộ Tạo Lộ Trình Học Tự Động (Automated Study Planner - Tính năng sư phạm mới):**
   - Học sinh chọn **Trình độ hiện tại** (vd: Level 0, Level 1, Level 2...) và **Mục tiêu hướng tới** (vd: Level 4 - Cột mốc thi đấu HSG QG & ICPC).
   - Tùy chỉnh **Quỹ thời gian học mỗi ngày** (1h, 2h, 3h, 4h+) và **Số ngày học trong tuần** (5, 6, 7 ngày).
   - Hệ thống tự động tính toán tổng số chuyên đề, tổng thời lượng học, số tuần dự kiến và ngày cán đích.
   - Phân bổ bài giảng chi tiết theo **từng tuần (Tuần 1, Tuần 2, Tuần 3...)**, tích hợp sẵn Checkbox hoàn thành, nút xem Modal, nút Copy nhanh C++, mục tiêu bài tập MarisaOJ và **Lời dặn dò sư phạm của Huấn luyện viên**.
   - Hỗ trợ in thời gian biểu ra giấy hoặc xuất PDF sạch đẹp bằng nút `🖨 In / Lưu Kế Hoạch (PDF)`.

2. **Thanh Tiến Độ Trực Quan & Lưu Trữ `localStorage` (Progress Dashboard):**
   - Thanh tiến độ động (Animated Progress Bar) với dải màu chuyển tiếp gradient `#4A78C2` đến `#10B981`.
   - Hiển thị tỷ lệ hoàn thành `%`, số chuyên đề đã thành thạo trên tổng số chuyên đề.
   - Huy hiệu trạng thái động: *Chưa bắt đầu* → *Đang khởi động* → *Tăng tốc kiến thức* → *Bứt phá nâng cao* → *Sắp về đích* → *🏆 Đạt chuẩn ICPC*.
   - Các viên thuốc thống kê tiến độ từng Level (`L0: 5/5`, `L1: 3/5`, `L2: 2/6`...) với tính năng bấm để cuộn trang nhanh tới Level tương ứng.
   - Nút **"Đặt lại tiến độ"** (Reset Progress) để bắt đầu lại chu trình ôn tập khi cần.

3. **Nút Đánh Dấu 'Đã Hoàn Thành' & Nút Copy Nhanh Template C++ Trực Tiếp Trên Từng Thẻ:**
   - Mỗi thẻ chuyên đề trên cây lộ trình được tích hợp thanh tác vụ nhanh:
     - Nút **`[✔ Đã hoàn thành]` / `[○ Chưa học]`**: Bấm để đánh dấu nhanh, tự động lưu vào `localStorage`, đổi kiểu giao diện thẻ sang viền xanh nổi bật và đồng bộ tức thì lên thanh tiến độ.
     - Nút **`[📋 C++]`**: Sao chép ngay lập tức mã nguồn Template C++ chuẩn ICPC vào bộ nhớ tạm mà không cần phải mở Modal, kèm thông báo Toast nổi sinh động.

4. **Sơ Đồ Cây Lộ Trình (Interactive Roadmap Tree):**
   - Thiết kế trục spine dọc trực quan với các mốc Milestone Badge (LVL 0 đến LVL 100).
   - Bộ lọc cấp độ tức thời (Level filter chips) và thanh tìm kiếm thuật toán thời gian thực (Live Search).

5. **Modal Tương Tác Đa Năng (4 Tabs):**
   - **Tab 1 - Bản chất & Trực quan:** Giải thích tường minh ý tưởng, trực quan hóa tư duy sư phạm và nhúng bộ mô phỏng động.
   - **Tab 2 - Độ phức tạp & Cạm bẫy:** Phân tích chi tiết $O(N)$ thời gian, bộ nhớ, giới hạn $10^8$ ops/giây và danh sách các bẫy thường gặp trong contest.
   - **Tab 3 - Template C++ chuẩn ICPC:** Mã nguồn tối ưu, chuẩn C++17/C++20, Fast I/O, chú thích rõ ràng, hỗ trợ sao chép 1-click có thông báo Toast.
   - **Tab 4 - Thực hành MarisaOJ:** Danh sách bài tập trực tiếp trên hệ thống [MarisaOJ](https://marisaoj.com) kèm mã bài, tên bài và mức độ khó.

6. **Phòng Thí Nghiệm Giải Thuật Trực Quan (Visualizer Lab):**
   - Mô phỏng bước chạy Tìm kiếm nhị phân (Binary Search).
   - Mô phỏng bước chạy Hai con trỏ (Two Pointers).
   - Mô phỏng bước chạy Mảng cộng dồn (Prefix Sum O(1) query).

7. **Cẩm Nang Ước Lượng Độ Phức Tạp ICPC:**
   - Bảng quy tắc vàng đối chiếu giới hạn $N$ với thuật toán tương ứng khi làm bài thi.

8. **Tích Hợp Thư Viện Toán Học KaTeX (Mới):**
   - Tự động hiển thị công thức toán học và độ phức tạp thuật toán chuẩn mực giáo khoa ($\mathcal{O}(N)$, $\mathcal{O}(N \log N)$, $\mathcal{O}(2^N)$, $\sum_{i=1}^N i$, phân số, modulo $\pmod M$, căn thức...).
   - Tốc độ hiển thị siêu tốc (blazing fast) không gây giật lag trang.

9. **Tối Ưu Hóa Responsive Đa Thiết Bị (Mới):**
   - **Máy chiếu lớp học (Classroom Projectors - 1024x768, 1280x800):** Tối ưu tỷ lệ chữ to rõ, tương phản cao, công thức hiển thị sắc nét từ khoảng cách xa trong giảng đường.
   - **Điện thoại di động (Smartphones - 360px đến 640px):** Thanh lọc Level trượt ngang mượt mà, thẻ chuyên đề chạm tay dễ dàng (min-height 44px), Modal co giãn 100% màn hình với cuộn trang êm ái.

---

## 🚀 Hướng Dẫn Sử Dụng
Mở file `index.html` trực tiếp bằng bất kỳ trình duyệt web hiện đại nào (Chrome, Edge, Firefox, Safari) mà không cần cài đặt thêm bất kỳ thư viện hay phần mềm máy chủ nào.
