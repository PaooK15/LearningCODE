// =============================================================================
// MARISAOJ COMPETITIVE PROGRAMMING ROADMAP DATA (LEVEL 0 - LEVEL 6 & LEVEL 100)
// Huấn luyện viên Lập trình Thi đấu ICPC & Kỹ sư Giáo dục
// =============================================================================

const ROADMAP_DATA = {
  levels: [
    {
      id: "level-0",
      levelNum: 0,
      title: "Level 0: Nhập Môn Lập Trình",
      enTitle: "Getting Started with Language",
      badge: "Khởi động (Beginner)",
      icon: "fa-solid fa-seedling",
      summary: "Xây dựng tư duy giải quyết vấn đề, cú pháp C++ cơ bản, cấu trúc rẽ nhánh, vòng lặp, mảng và chuỗi ký tự.",
      marisaRoadmapUrl: "https://marisaoj.com/roadmap/",
      topics: [
        {
          id: "io-fastio",
          title: "Nhập / Xuất Dữ Liệu & Tối Ưu Fast I/O",
          enTitle: "Standard I/O & Fast I/O in C++",
          category: "Cú pháp nền tảng",
          badge: "Bắt buộc",
          interactiveType: "fastio",
          summary: "Cơ chế đọc ghi luồng trong C++, cách tối ưu luồng với cin.tie(NULL) để tránh lỗi Time Limit Exceeded (TLE) khi input lên đến 10^6 phần tử.",
          intuition: `
            <h4>1. Bản chất vấn đề</h4>
            <p>Trong C++, mặc định luồng <code>std::cin</code> và <code>std::cout</code> được đồng bộ hóa với luồng chuẩn của C (<code>stdio.h</code>: <code>scanf</code>/<code>printf</code>) và tự động flush bộ đệm mỗi khi có thao tác nhập/xuất đan xen. Điều này đảm bảo an toàn nếu lập trình viên dùng lẫn cả hai thư viện, nhưng <strong>khiến tốc độ chậm đi gấp 4-8 lần</strong>.</p>
            <div class="pedagogy-callout">
              <i class="fa-solid fa-lightbulb"></i>
              <div>
                <strong>Góc nhìn Huấn luyện viên:</strong> Trong các kỳ thi ICPC hoặc HSG Quốc gia, một bài toán có thể có tới $10^6$ số nguyên trong test case. Nếu dùng <code>std::cin</code> thông thường mà không tối ưu, chương trình của bạn sẽ bị <strong>Time Limit Exceeded (TLE)</strong> ngay tại khâu nạp dữ liệu trước khi thuật toán kịp chạy!
              </div>
            </div>
            <h4>2. Cơ chế giải quyết</h4>
            <ul>
              <li><code>ios_base::sync_with_stdio(false);</code>: Ngắt đồng bộ giữa luồng C và C++. Từ đây bạn chỉ được dùng <code>cin/cout</code>, không dùng lẫn <code>scanf/printf</code>.</li>
              <li><code>cin.tie(NULL);</code>: Hủy bỏ việc tự động flush <code>cout</code> trước mỗi lệnh <code>cin</code>.</li>
              <li>Dùng <code>'\\n'</code> thay vì <code>std::endl</code> vì <code>endl</code> bắt buộc hệ điều hành flush buffer ngay lập tức, tốn rất nhiều chu kỳ CPU.</li>
            </ul>
          `,
          complexity: {
            time: "O(1) mỗi thao tác đọc/ghi",
            space: "O(1) bộ đệm I/O",
            analysis: "Fast I/O giảm thời gian đọc 1 triệu số nguyên từ ~0.8s xuống còn ~0.08s trên các trình chấm hiện đại.",
            limitGuideline: "Mọi bài toán ICPC/MarisaOJ có $N \\ge 10^5$ đều BẮT BUỘC chèn Fast I/O ở đầu hàm main()."
          },
          codeTemplate: `#include <bits/stdc++.h>
using namespace std;

int main() {
    // Tối ưu tốc độ luồng I/O chuẩn ICPC
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int n;
    if (cin >> n) {
        long long sum = 0;
        for (int i = 0; i < n; ++i) {
            long long x;
            cin >> x;
            sum += x;
        }
        // Dùng '\\n' thay cho endl để tránh flush buffer liên tục
        cout << sum << '\\n';
    }
    return 0;
}`,
          marisaLinks: [
            { id: 1, name: "Hello Marisa!", url: "https://marisaoj.com/problem/1", diff: "★☆☆☆☆", note: "Làm quen cấu trúc nộp bài cơ bản" },
            { id: 2, name: "A + B", url: "https://marisaoj.com/problem/2", diff: "★☆☆☆☆", note: "Nhập 2 số và in ra tổng" },
            { id: 3, name: "A / B", url: "https://marisaoj.com/problem/3", diff: "★☆☆☆☆", note: "Phép chia số nguyên và xử lý số học" }
          ],
          coachTips: [
            "Tuyệt đối không dùng chung cin/cout với scanf/printf sau khi đã gọi sync_with_stdio(false) (gây loạn thứ tự dữ liệu dẫn tới Wrong Answer).",
            "Tránh xa std::endl trong các vòng lặp in nhiều phần tử.",
            "Chú ý kiểu dữ liệu: Nếu tổng các số vượt quá 2 * 10^9, bắt buộc dùng long long thay vì int để tránh tràn số âm."
          ]
        },
        {
          id: "conditionals-loops",
          title: "Cấu Trúc Rẽ Nhánh & Vòng Lặp",
          enTitle: "Conditionals, Loops & Number Extraction",
          category: "Cú pháp nền tảng",
          badge: "Nền tảng",
          interactiveType: "loop-step",
          summary: "Cấu trúc if-else, switch-case, vòng lặp for, while, do-while và kỹ thuật tách chữ số, kiểm tra tính chất số học.",
          intuition: `
            <h4>1. Bản chất sư phạm</h4>
            <p>Vòng lặp và rẽ nhánh là hai viên gạch nền tảng của mọi tư duy thuật toán. Mọi bài toán mô phỏng (simulation) từ tính tổng chuỗi, kiểm tra số chính phương, số đối xứng đến tách các chữ số của một số nguyên lớn đều dựa trên kỹ thuật này.</p>
            <div class="pedagogy-callout">
              <i class="fa-solid fa-graduation-cap"></i>
              <div>
                <strong>Mẹo ghi nhớ:</strong> Kỹ thuật tách chữ số từ phải sang trái bằng <code>num % 10</code> (lấy chữ số cuối) và <code>num /= 10</code> (bỏ chữ số cuối) là mẫu hình lặp xuất hiện trong hơn 40% bài toán sơ cấp.
              </div>
            </div>
          `,
          complexity: {
            time: "O(K) với K là số chữ số hoặc số bước lặp",
            space: "O(1) biến đếm",
            analysis: "Số lượng chữ số của N trong hệ thập phân là log10(N) + 1. Vòng lặp tách số chỉ mất tối đa 19 bước với số 64-bit.",
            limitGuideline: "Số vòng lặp tối đa trong 1 giây trên máy chấm là khoảng 10^8 thao tác cơ bản."
          },
          codeTemplate: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    long long n;
    cin >> n;

    // Kỹ thuật tách chữ số và đảo ngược số nguyên
    long long reversed_num = 0;
    long long temp = abs(n);
    int sum_digits = 0;

    while (temp > 0) {
        int last_digit = temp % 10;
        sum_digits += last_digit;
        reversed_num = reversed_num * 10 + last_digit;
        temp /= 10;
    }

    cout << "Tong chu so: " << sum_digits << '\\n';
    cout << "So dao nguoc: " << reversed_num << '\\n';
    return 0;
}`,
          marisaLinks: [
            { id: 4, name: "Kiểm tra chẵn lẻ & Dấu số", url: "https://marisaoj.com/problemset", diff: "★☆☆☆☆", note: "Rẽ nhánh cơ bản" },
            { id: 7, name: "Tính tổng dãy số 1..N", url: "https://marisaoj.com/problemset", diff: "★☆☆☆☆", note: "Luyện vòng lặp for" },
            { id: 12, name: "Số hoàn hảo / Số đối xứng", url: "https://marisaoj.com/problemset", diff: "★★☆☆☆", note: "Tách chữ số & kiểm tra" }
          ],
          coachTips: [
            "Cẩn thận trường hợp n = 0 hoặc n âm khi tách chữ số.",
            "Tránh lỗi lặp vô hạn (Infinite Loop) do quên bước cập nhật biến đếm i++ hoặc n /= 10.",
            "Khi tính n * (n + 1) / 2, hãy ép kiểu (1LL * n * (n + 1)) / 2 trước khi chia để chống tràn int."
          ]
        },
        {
          id: "arrays-matrices",
          title: "Mảng 1D, 2D & Xử Lý Chuỗi Ký Tự",
          enTitle: "1D/2D Arrays, std::vector & Strings",
          category: "Cấu trúc dữ liệu sơ cấp",
          badge: "Nền tảng",
          interactiveType: "matrix-traversal",
          summary: "Cơ chế quản lý bộ nhớ liên tục trong RAM, kỹ thuật duyệt mảng 2 chiều theo hướng 4/8 hướng và các hàm xử lý xâu STL.",
          intuition: `
            <h4>1. Bản chất bộ nhớ</h4>
            <p>Mảng là một khối bộ nhớ liên tục trong RAM. Việc duyệt mảng theo dòng (row-major order) nhanh hơn nhiều so với duyệt theo cột nhờ cơ chế <strong>CPU Cache Locality</strong>. Trong C++, <code>std::vector</code> là mảng động linh hoạt tự quản lý kích thước.</p>
            <h4>2. Kỹ thuật duyệt lưới ma trận (Grid traversal)</h4>
            <p>Thay vì viết 4 câu lệnh <code>if</code> dài dòng để kiểm tra 4 ô lân cận (trên, dưới, trái, phải), ta dùng 2 mảng hướng hằng số:</p>
            <pre><code>const int dx[] = {-1, 1, 0, 0};
const int dy[] = {0, 0, -1, 1};</code></pre>
          `,
          complexity: {
            time: "O(N) cho mảng 1D, O(N * M) cho ma trận N x M",
            space: "O(N) hoặc O(N * M) bộ nhớ tĩnh/động",
            analysis: "Bộ nhớ tối đa cho 1 mảng int 10^7 phần tử xấp xỉ 40MB, hoàn toàn nằm trong giới hạn 256MB/512MB của các kỳ thi.",
            limitGuideline: "Nếu kích thước mảng > 10^5, hãy khai báo toàn cục (Global) hoặc dùng vector để tránh tràn ngăn xếp (Stack Overflow)."
          },
          codeTemplate: `#include <bits/stdc++.h>
using namespace std;

// Mảng hướng 4 phía: Lên, Xuống, Trái, Phải
const int dx[4] = {-1, 1, 0, 0};
const int dy[4] = {0, 0, -1, 1};

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int r, c;
    if (!(cin >> r >> c)) return 0;

    vector<vector<int>> grid(r, vector<int>(c));
    for (int i = 0; i < r; ++i) {
        for (int j = 0; j < c; ++j) {
            cin >> grid[i][j];
        }
    }

    // Minh họa duyệt các ô kề của ô (x, y)
    int x = 0, y = 0;
    cout << "Cac o ke cua (" << x << ", " << y << "):\\n";
    for (int k = 0; k < 4; ++k) {
        int nx = x + dx[k];
        int ny = y + dy[k];
        // Kiem tra bien ma tran
        if (nx >= 0 && nx < r && ny >= 0 && ny < c) {
            cout << "-> (" << nx << ", " << ny << ") = " << grid[nx][ny] << '\\n';
        }
    }
    return 0;
}`,
          marisaLinks: [
            { id: 15, name: "Tìm kiếm phần tử lớn nhất/nhỏ nhất", url: "https://marisaoj.com/problemset", diff: "★☆☆☆☆", note: "Duyệt mảng 1 chiều" },
            { id: 22, name: "Xoay ma trận 90 độ", url: "https://marisaoj.com/problemset", diff: "★★☆☆☆", note: "Kỹ thuật thao tác chỉ số 2D" },
            { id: 30, name: "Đếm từ & Xâu đối xứng (Palindrome)", url: "https://marisaoj.com/problemset", diff: "★★☆☆☆", note: "Xử lý xâu STL" }
          ],
          coachTips: [
            "Khai báo mảng lớn (ví dụ a[1000000]) bên trong hàm main() sẽ gây lỗi 'Segmentation fault / Stack Overflow' vì bộ nhớ stack của hàm rất nhỏ (~8MB). Hãy đưa ra biến toàn cục (global scope).",
            "Lưu ý quy ước đánh số 0-based hay 1-based để tránh truy cập tràn chỉ số (Out of bound)."
          ]
        }
      ]
    },
    {
      id: "level-1",
      levelNum: 1,
      title: "Level 1: Thuật Toán & Kỹ Thuật Cơ Bản",
      enTitle: "Simple Algorithms & Techniques",
      badge: "Cốt lõi (Fundamental)",
      icon: "fa-solid fa-calculator",
      summary: "Các kỹ thuật kinh điển giúp giảm độ phức tạp từ O(N^2) xuống O(N) hoặc O(N log N): Mảng cộng dồn, Mảng hiệu, Hai con trỏ, Chặt nhị phân và Sắp xếp.",
      marisaRoadmapUrl: "https://marisaoj.com/roadmap/",
      topics: [
        {
          id: "prefix-sum",
          title: "Mảng Cộng Dồn 1D & 2D (Prefix Sum)",
          enTitle: "Prefix Sum & 2D Prefix Sum",
          category: "Kỹ thuật tiền xử lý",
          badge: "Cực kỳ quan trọng",
          interactiveType: "prefix-sum",
          summary: "Tiền xử lý mảng trong O(N) để trả lời truy vấn tính tổng đoạn [L, R] bất kỳ trong O(1). Mở rộng sang ma trận 2D với công thức bao hàm loại trừ.",
          intuition: `
            <h4>1. Đặt vấn đề & Điểm nghẽn</h4>
            <p>Cho mảng $A$ gồm $N$ phần tử và $Q$ câu hỏi: Tính tổng từ vị trí $L$ đến $R$. Nếu mỗi truy vấn ta dùng vòng lặp chạy từ $L$ đến $R$, độ phức tạp mỗi câu hỏi là $O(N)$, tổng thời gian là $O(Q \\times N)$. Với $N, Q = 10^5$, chương trình mất $10^{10}$ phép tính $\\rightarrow$ Chắc chắn <strong>Time Limit Exceeded (TLE)</strong>!</p>
            <h4>2. Ý tưởng bản chất</h4>
            <p>Ta xây dựng mảng tích lũy $P$ sao cho $P[i] = A[1] + A[2] + \\dots + A[i]$. Khi đó, tổng đoạn từ $L$ đến $R$ chính là phần tử lũy kế đến $R$ trừ đi phần lũy kế trước $L$:</p>
            <div class="math-card">
              $$Sum(L, R) = P[R] - P[L - 1]$$
            </div>
            <p>Đối với ma trận 2D, ta dùng nguyên lý hình chữ nhật bao hàm - loại trừ:</p>
            <div class="math-card">
              $$Sum(x_1, y_1, x_2, y_2) = P[x_2][y_2] - P[x_1-1][y_2] - P[x_2][y_1-1] + P[x_1-1][y_1-1]$$
            </div>
          `,
          complexity: {
            time: "Tiền xử lý O(N), Mỗi truy vấn O(1)",
            space: "O(N) lưu mảng tiền tố",
            analysis: "Giảm thời gian xử lý từ O(Q x N) xuống chỉ còn O(N + Q). Ví dụ 10^5 truy vấn chạy chỉ mất ~0.02 giây.",
            limitGuideline: "Dấu hiệu nhận biết: Đề bài yêu cầu tính tổng/đếm số lượng trên nhiều đoạn con liên tiếp mà mảng KHÔNG bị cập nhật giữa chừng (Static Range Query)."
          },
          codeTemplate: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int n, q;
    if (!(cin >> n >> q)) return 0;

    vector<long long> a(n + 1);
    vector<long long> pref(n + 1, 0);

    for (int i = 1; i <= n; ++i) {
        cin >> a[i];
        // Xay dung mang cong don 1-based indexing
        pref[i] = pref[i - 1] + a[i];
    }

    // Tra loi Q truy van trong O(1) moi truy van
    while (q--) {
        int l, r;
        cin >> l >> r;
        cout << (pref[r] - pref[l - 1]) << '\\n';
    }
    return 0;
}`,
          marisaLinks: [
            { id: 45, name: "Introduction to Prefix Sum", url: "https://marisaoj.com/problemset", diff: "★★☆☆☆", note: "Bài tập cơ bản áp dụng công thức P[R] - P[L-1]" },
            { id: 46, name: "2D Prefix Sum", url: "https://marisaoj.com/problemset", diff: "★★★☆☆", note: "Áp dụng tổng tiền tố trên lưới ma trận" },
            { id: 47, name: "Maximum Subarray Sum", url: "https://marisaoj.com/problemset", diff: "★★★☆☆", note: "Tìm đoạn con có tổng lớn nhất dùng prefix sum kết hợp min prefix" }
          ],
          coachTips: [
            "Luôn dùng 1-based indexing (chỉ số mảng bắt đầu từ 1) để tránh việc phải viết câu lệnh if (L == 0) rườm rà. Khi đó pref[0] = 0 tự nhiên giải quyết biên.",
            "Giá trị mảng có thể âm hoặc rất lớn: Hãy dùng kiểu dữ liệu long long cho mảng pref để không bị tràn số âm (Integer Overflow)."
          ]
        },
        {
          id: "difference-array",
          title: "Mảng Hiệu (Difference Array)",
          enTitle: "Difference Array (Range Updates)",
          category: "Kỹ thuật biến đổi",
          badge: "Thủ thuật kinh điển",
          interactiveType: "diff-array",
          summary: "Cập nhật cộng thêm giá trị V vào tất cả phần tử trong đoạn [L, R] với độ phức tạp O(1) mỗi thao tác, sau đó khôi phục lại mảng gốc bằng Prefix Sum.",
          intuition: `
            <h4>1. Nghịch lý giữa cập nhật và truy vấn</h4>
            <p>Nếu có $Q$ truy vấn cộng dồn $V$ vào đoạn $[L, R]$, làm ngây thơ sẽ tốn $O(Q \\times N)$. Mảng hiệu là phép toán ngược lại với mảng cộng dồn: Thay vì cộng tất cả các phần tử, ta chỉ 'đánh dấu' sự thay đổi độ chênh lệch ở hai đầu mút!</p>
            <div class="pedagogy-callout">
              <i class="fa-solid fa-wand-magic-sparkles"></i>
              <div>
                <strong>Quy tắc vàng của mảng hiệu $D$:</strong>
                <ul>
                  <li><code>D[L] += V</code>: Báo hiệu từ vị trí $L$ trở đi, giá trị tăng thêm $V$.</li>
                  <li><code>D[R + 1] -= V</code>: Báo hiệu sau vị trí $R$, hiệu ứng tăng thêm $V$ kết thúc.</li>
                </ul>
                Sau khi áp dụng xong tất cả $Q$ cập nhật trong $O(1)$ mỗi lượt, ta chỉ cần tính Prefix Sum của mảng $D$ đúng một lần là thu được mảng kết quả cuối cùng trong $O(N)$!
              </div>
            </div>
          `,
          complexity: {
            time: "Mỗi thao tác cập nhật O(1), Khôi phục cuối O(N)",
            space: "O(N) lưu mảng hiệu",
            analysis: "Chuyển bài toán biến đổi hàng triệu lần từ O(Q x N) xuống O(N + Q) tuyệt đối tối ưu.",
            limitGuideline: "Chỉ áp dụng khi tất cả các thao tác cập nhật diễn ra trước, sau đó mới cần xem kết quả mảng cuối cùng (Offline Range Updates)."
          },
          codeTemplate: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int n, q;
    if (!(cin >> n >> q)) return 0;

    // Khoi tao mang goc a va mang hieu diff
    vector<long long> a(n + 2, 0);
    vector<long long> diff(n + 2, 0);

    for (int i = 1; i <= n; ++i) {
        cin >> a[i];
        // Khoi tao hieu ban dau
        diff[i] = a[i] - a[i - 1];
    }

    // Xy ly Q truy van cap nhat cong V vao [l, r]
    while (q--) {
        int l, r;
        long long v;
        cin >> l >> r >> v;
        diff[l] += v;
        diff[r + 1] -= v;
    }

    // Khoi phuc lai mang cuoi cung bang Prefix Sum tren diff
    long long current_val = 0;
    for (int i = 1; i <= n; ++i) {
        current_val += diff[i];
        cout << current_val << (i == n ? "" : " ");
    }
    cout << '\\n';
    return 0;
}`,
          marisaLinks: [
            { id: 48, name: "Difference Array Basics", url: "https://marisaoj.com/problemset", diff: "★★☆☆☆", note: "Bài toán cập nhật dãy số liên tục" },
            { id: 49, name: "Stair Query", url: "https://marisaoj.com/problemset", diff: "★★★☆☆", note: "Nâng cao: Mảng hiệu cấp 2 (cộng cấp số cộng)" }
          ],
          coachTips: [
            "Khai báo kích thước mảng diff là n + 2 để khi cập nhật diff[r + 1] với r = n không bị lỗi chỉ số ngoài biên.",
            "Nếu có các truy vấn xen kẽ vừa cập nhật vừa hỏi tổng tức thời (Online Range Update & Query), bạn phải dùng Fenwick Tree hoặc Segment Tree ở Level 4."
          ]
        },
        {
          id: "two-pointers",
          title: "Kỹ Thuật Hai Con Trỏ (Two Pointers)",
          enTitle: "Two Pointers Technique",
          category: "Thuật toán tìm kiếm",
          badge: "Siêu kinh điển",
          interactiveType: "two-pointers",
          summary: "Sử dụng hai chỉ số di chuyển cùng chiều hoặc ngược chiều đơn điệu để tìm cặp phần tử, đoạn con thoả mãn điều kiện trong thời gian tuyến tính O(N).",
          intuition: `
            <h4>1. Tính đơn điệu - Chìa khoá vàng</h4>
            <p>Tại sao Two Pointers lại chạy được trong $O(N)$ thay vì $O(N^2)$? Bản chất là ta lợi dụng tính <strong>đơn điệu (monotonicity)</strong> của bài toán. Khi con trỏ bên phải $R$ mở rộng làm tăng tổng, nếu tổng vượt quá giới hạn, ta <strong>không cần quay lại kiểm tra từ đầu</strong> mà chỉ cần dịch con trỏ trái $L$ sang phải để giảm tổng lại!</p>
            <div class="pedagogy-callout">
              <i class="fa-solid fa-arrows-left-right"></i>
              <div>
                <strong>Hai dạng biến thể phổ biến:</strong>
                <ul>
                  <li><strong>Ngược chiều (Opposite directions):</strong> Tìm cặp $(i, j)$ sao cho $A[i] + A[j] = X$ trên mảng đã sắp xếp. Một con trỏ đi từ đầu, một con trỏ đi từ cuối.</li>
                  <li><strong>Cùng chiều (Sliding Window):</strong> Tìm đoạn con dài nhất/ngắn nhất có tổng $\\le S$ hoặc có nhiều nhất $K$ phần tử phân biệt. Cả $L$ và $R$ chỉ luôn tiến về phía trước.</li>
                </ul>
              </div>
            </div>
          `,
          complexity: {
            time: "O(N) nếu mảng đã sắp xếp, O(N log N) nếu cần sort trước",
            space: "O(1) bộ nhớ phụ trợ",
            analysis: "Mỗi con trỏ L và R chỉ di chuyển tối đa N bước từ trái sang phải, tổng số bước di chuyển không vượt quá 2N.",
            limitGuideline: "Bài toán yêu cầu tìm đoạn con trên mảng số dương hoặc tìm cặp phần tử thoả mãn bất đẳng thức."
          },
          codeTemplate: `#include <bits/stdc++.h>
using namespace std;

// Vi du: Tim doan con lien tiep dai nhat co tong <= S (cac phan tu deu >= 0)
int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int n;
    long long s;
    if (!(cin >> n >> s)) return 0;

    vector<long long> a(n);
    for (int i = 0; i < n; ++i) cin >> a[i];

    int l = 0, max_len = 0;
    long long current_sum = 0;

    // Con tro r mo rong cua so
    for (int r = 0; r < n; ++r) {
        current_sum += a[r];

        // Thu hep cua so tu ben trai khi tong vi pham dieu kien
        while (current_sum > s && l <= r) {
            current_sum -= a[l];
            l++;
        }

        // Cap nhat do dai hop le
        max_len = max(max_len, r - l + 1);
    }

    cout << max_len << '\\n';
    return 0;
}`,
          marisaLinks: [
            { id: 50, name: "Two Sum (Sorted Array)", url: "https://marisaoj.com/problemset", diff: "★★☆☆☆", note: "Tìm 2 số có tổng bằng S bằng con trỏ trái/phải" },
            { id: 51, name: "Subarray Sum at most K", url: "https://marisaoj.com/problemset", diff: "★★★☆☆", note: "Cửa sổ trượt (Sliding Window) độ dài cực đại" }
          ],
          coachTips: [
            "Điều kiện tiên quyết của Two Pointers cùng chiều là tính chất mảng phải bảo toàn tính đơn điệu (ví dụ: mảng toàn số không âm, khi thêm phần tử thì tổng chỉ tăng hoặc giữ nguyên).",
            "Nếu mảng chứa cả số âm, Two Pointers sẽ THẤT BẠI vì việc dịch chuyển con trỏ không còn tính đơn điệu. Khi đó bắt buộc phải chuyển sang dùng Map / Prefix Sum hoặc Segment Tree."
          ]
        },
        {
          id: "binary-search",
          title: "Tìm Kiếm Nhị Phân & Chặt Nhị Phân Kết Quả",
          enTitle: "Binary Search & BS on Answer",
          category: "Thuật toán tìm kiếm & Tối ưu",
          badge: "Vũ khí tối thượng",
          interactiveType: "binary-search",
          summary: "Thuật toán chia đôi không gian tìm kiếm trong O(log N). Kỹ thuật chặt nhị phân kết quả (Binary Search on Answer) biến bài toán tối ưu cực trị thành bài toán kiểm tra tính khả thi.",
          intuition: `
            <h4>1. Bản chất chặt nhị phân</h4>
            <p>Mỗi bước so sánh với phần tử trung vị <code>mid = (L + R) / 2</code>, ta loại bỏ được một nửa không gian tìm kiếm còn lại. Từ $10^9$ phần tử, ta chỉ cần khoảng $\\approx 30$ phép so sánh!</p>
            <h4>2. Kỹ thuật Chặt nhị phân kết quả (BS on Answer)</h4>
            <p>Trong thi đấu, nhiều bài toán hỏi: <em>'Tìm giá trị $X$ nhỏ nhất/lớn nhất thoả mãn điều kiện...'</em>. Nếu việc kiểm tra xem một giá trị $X$ cụ thể có thoả mãn hay không (hàm <code>check(X)</code>) là dễ dàng (thường là tham lam trong $O(N)$), và hàm <code>check(X)</code> có <strong>tính đơn điệu</strong> (nếu $X$ thoả mãn thì mọi số lớn hơn/nhỏ hơn cũng thoả mãn), ta có thể chặt nhị phân trực tiếp trên biến $X$!</p>
          `,
          complexity: {
            time: "O(log(Range) x T(check))",
            space: "O(1) biến con trỏ L, R, Mid",
            analysis: "Với Range = 10^18, log2(10^18) ≈ 60 bước. Với hàm check O(N) = 10^5, tổng thời gian chỉ là 60 x 10^5 ≈ 6 x 10^6 phép tính (< 0.1s).",
            limitGuideline: "Xuất hiện trong hơn 60% các kỳ thi HSG Tỉnh, HSG Quốc Gia và ICPC."
          },
          codeTemplate: `#include <bits/stdc++.h>
using namespace std;

// Ham kiem tra xem voi thoi gian T, co the lam xong cong viec khong
bool check(long long val, const vector<long long>& a, int k) {
    // Logic kiem tra tinh kha thi (tham lam O(N))
    long long count = 0;
    for (auto x : a) {
        count += val / x;
    }
    return count >= k;
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int n, k;
    if (!(cin >> n >> k)) return 0;

    vector<long long> a(n);
    for (int i = 0; i < n; ++i) cin >> a[i];

    // Chat nhi phan tren mien gia tri dap an [low, high]
    long long low = 1, high = 1e18;
    long long ans = high;

    while (low <= high) {
        long long mid = low + (high - low) / 2; // Chống tràn số khi (low + high)
        if (check(mid, a, k)) {
            ans = mid;       // Tim duoc gia tri kha thi, thu tim dap an nho hon
            high = mid - 1;
        } else {
            low = mid + 1;  // Khong the hoan thanh, phai tang mien gia tri
        }
    }

    cout << ans << '\\n';
    return 0;
}`,
          marisaLinks: [
            { id: 52, name: "Binary Search Basics", url: "https://marisaoj.com/problemset", diff: "★★☆☆☆", note: "Tìm vị trí đầu tiên >= X (lower_bound)" },
            { id: 53, name: "Woodcutters (Chặt gỗ)", url: "https://marisaoj.com/problemset", diff: "★★★☆☆", note: "Chặt nhị phân kết quả độ cao máy cưa gỗ" },
            { id: 54, name: "Factory Machines", url: "https://marisaoj.com/problemset", diff: "★★★☆☆", note: "Tính thời gian tối thiểu sản xuất K sản phẩm" }
          ],
          coachTips: [
            "Tránh lỗi tràn số khi tính trung vị: Dùng mid = low + (high - low) / 2 thay vì (low + high) / 2.",
            "Xác định đúng cận trên high: Nếu kết quả có thể lên tới 10^18, high phải là 1e18 hoặc 2e18 và các biến phải là long long.",
            "Tận dụng STL của C++ khi tìm kiếm trên mảng đã sắp xếp: std::lower_bound (>= X) và std::upper_bound (> X)."
          ]
        },
        {
          id: "backtracking-search",
          title: "Vét Cạn & Quay Lui (Complete Search / Backtracking)",
          enTitle: "Complete Search & Backtracking",
          category: "Kỹ thuật duyệt toàn bộ",
          badge: "Nền tảng tư duy",
          interactiveType: "backtracking",
          summary: "Tạo sinh toàn bộ không gian nghiệm theo mô hình cây đệ quy: Sinh nhị phân, sinh tổ hợp, hoán vị và bài toán kinh điển N quân hậu.",
          intuition: `
            <h4>1. Khái niệm sư phạm</h4>
            <p>Quay lui (Backtracking) là thuật toán thử và sai có tổ chức. Nó duyệt qua từng quyết định. Nếu phát hiện một nhánh rẽ chắc chắn không thể dẫn tới lời giải hợp lệ (nhánh bị cắt - Pruning), thuật toán sẽ <strong>quay ngược trở lại</strong> trạng thái trước đó để thử con đường khác.</p>
            <div class="pedagogy-callout">
              <i class="fa-solid fa-tree"></i>
              <div>
                <strong>Khung tư duy 3 bước cho mọi bài đệ quy quay lui:</strong>
                <ol>
                  <li><strong>Điều kiện dừng (Base case):</strong> Khi đã đưa ra đủ $N$ quyết định $\\rightarrow$ Ghi nhận nghiệm.</li>
                  <li><strong>Lựa chọn bước tiếp theo (Choices):</strong> Thử tất cả giá trị có thể nhận được ở bước hiện tại.</li>
                  <li><strong>Hoàn tác (Backtrack):</strong> Huỷ bỏ trạng thái đã thử để không làm ảnh hưởng tới nhánh tiếp theo.</li>
                </ol>
              </div>
            </div>
          `,
          complexity: {
            time: "O(K^N) hoặc O(N!) tuỳ bài toán",
            space: "O(N) độ sâu ngăn xếp đệ quy",
            analysis: "N = 20 có 2^20 ≈ 10^6 trạng thái (chạy trong 0.05s). N = 10 có 10! ≈ 3.6 x 10^6 (chạy trong 0.1s).",
            limitGuideline: "Nhận dạng qua ràng buộc N rất nhỏ: N <= 20 thường là 2^N (sinh tập con/bitmask), N <= 11 là N! (hoán vị)."
          },
          codeTemplate: `#include <bits/stdc++.h>
using namespace std;

int n;
vector<int> a;
vector<bool> used;

// Ham de quy sinh tat ca cac hoan vi cua 1..N
void backtrack(int pos) {
    if (pos == n) {
        // Da duyet du n phan tu -> In ra mot nghiem
        for (int i = 0; i < n; ++i) cout << a[i] << " ";
        cout << '\\n';
        return;
    }

    for (int val = 1; val <= n; ++val) {
        if (!used[val]) {
            a[pos] = val;      // 1. Chon gia tri
            used[val] = true;  // 2. Danh dau da dung

            backtrack(pos + 1); // Goi de quy buoc tiep theo

            used[val] = false; // 3. Hoan tac (Backtrack)
        }
    }
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    if (cin >> n) {
        a.resize(n);
        used.assign(n + 1, false);
        backtrack(0);
    }
    return 0;
}`,
          marisaLinks: [
            { id: 55, name: "Generate Binary Strings", url: "https://marisaoj.com/problemset", diff: "★★☆☆☆", note: "Sinh tất cả xâu nhị phân độ dài N" },
            { id: 56, name: "N Queens Problem", url: "https://marisaoj.com/problemset", diff: "★★★☆☆", note: "Bài toán xếp N quân hậu không tấn công nhau" },
            { id: 57, name: "Subset Sum Backtracking", url: "https://marisaoj.com/problemset", diff: "★★★☆☆", note: "Tìm tập con có tổng bằng S kết hợp tỉa nhánh" }
          ],
          coachTips: [
            "Tỉa nhánh (Pruning) là linh hồn của quay lui: Nếu tổng hiện tại đã vượt quá giới hạn mong muốn thì return ngay lập tức.",
            "Trong C++, có thể dùng hàm std::next_permutation để sinh hoán vị cực nhanh mà không cần tự viết hàm quay lui phức tạp."
          ]
        }
      ]
    },
    {
      id: "level-2",
      levelNum: 2,
      title: "Level 2: Nền Tảng Thiết Yếu & Số Học Cơ Bản",
      enTitle: "Still Simple, But Crucial",
      badge: "Thiết yếu (Essential)",
      icon: "fa-solid fa-shapes",
      summary: "Số học đại số, sàng số nguyên tố, luỹ thừa nhanh, thuật toán tham lam, nén toạ độ và ngăn xếp đơn điệu.",
      marisaRoadmapUrl: "https://marisaoj.com/roadmap/",
      topics: [
        {
          id: "prime-sieve",
          title: "Sàng Nguyên Tố Eratosthenes & Thừa Số Nguyên Tố",
          enTitle: "Sieve of Eratosthenes & Prime Factorization",
          category: "Số học cơ bản",
          badge: "Bắt buộc học",
          interactiveType: "sieve",
          summary: "Tìm toàn bộ các số nguyên tố trong đoạn [1, N] trong O(N log log N). Kỹ thuật Sàng biến đổi lưu ước nguyên tố nhỏ nhất (SPF) giúp phân tích thừa số trong O(log N).",
          intuition: `
            <h4>1. Bản chất cơ chế sàng</h4>
            <p>Nếu kiểm tra từng số $X$ có phải nguyên tố không bằng vòng lặp đến $\\sqrt{X}$, tìm nguyên tố đến $N$ sẽ mất $O(N \\sqrt{N})$. Với $N = 10^7$, $N\\sqrt{N} \\approx 3 \\times 10^{10}$ phép tính $\\rightarrow$ Chậm không tưởng!</p>
            <p>Eratosthenes phát hiện ra: <em>Mọi hợp số đều là bội của một số nguyên tố nhỏ hơn nó</em>. Do đó ta duyệt qua từng số nguyên tố $p$, rồi gạch bỏ tất cả bội số $2p, 3p, 4p, \\dots$. Bắt đầu gạch từ $p^2$ vì các bội nhỏ hơn đã bị các nguyên tố trước đó loại trừ.</p>
            <div class="pedagogy-callout">
              <i class="fa-solid fa-bolt"></i>
              <div>
                <strong>Tuyệt chiêu ICPC - Sàng SPF (Smallest Prime Factor):</strong> Lưu lại ước nguyên tố nhỏ nhất của mỗi số $i$ vào mảng <code>spf[i]</code>. Sau khi sàng trong $O(N)$, ta có thể phân tích bất kỳ số nào ra thừa số nguyên tố chỉ trong thời gian $O(\\log N)$!
              </div>
            </div>
          `,
          complexity: {
            time: "Sàng: O(N log log N) ≈ Tuyến tính O(N)",
            space: "O(N) bộ nhớ mảng đánh dấu",
            analysis: "Với N = 10^7, log log N ≈ log(16) ≈ 4. Toàn bộ quá trình sàng 10 triệu số chỉ tốn khoảng 0.08 giây.",
            limitGuideline: "Thường dùng để tiền xử lý khi đề bài có nhiều truy vấn hỏi số nguyên tố hoặc phân tích ước số."
          },
          codeTemplate: `#include <bits/stdc++.h>
using namespace std;

const int MAXN = 10000000;
vector<int> spf(MAXN + 1);

// Sang Eratosthenes cai tien tinh Smallest Prime Factor
void sieve() {
    for (int i = 1; i <= MAXN; ++i) spf[i] = i;

    for (int i = 2; i * i <= MAXN; ++i) {
        if (spf[i] == i) { // i la so nguyen to
            for (int j = i * i; j <= MAXN; j += i) {
                if (spf[j] == j) {
                    spf[j] = i; // Ghi nhan uoc nguyen to nho nhat
                }
            }
        }
    }
}

// Phan tich thua so nguyen to trong O(log N)
vector<int> get_factorization(int x) {
    vector<int> factors;
    while (x > 1) {
        factors.push_back(spf[x]);
        x /= spf[x];
    }
    return factors;
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    sieve();
    int x = 84;
    vector<int> f = get_factorization(x);
    cout << "Cac thua so nguyen to cua " << x << ": ";
    for (int p : f) cout << p << " ";
    cout << '\\n';
    return 0;
}`,
          marisaLinks: [
            { id: 60, name: "Prime Sieve Basics", url: "https://marisaoj.com/problemset", diff: "★★☆☆☆", note: "Đếm số nguyên tố nhỏ hơn N" },
            { id: 61, name: "Fast Prime Factorization", url: "https://marisaoj.com/problemset", diff: "★★★☆☆", note: "Phân tích thừa số nhiều số lớn dùng SPF" },
            { id: 62, name: "Sum of Divisors", url: "https://marisaoj.com/problemset", diff: "★★★☆☆", note: "Tính tổng ước số của các số từ 1 đến N" }
          ],
          coachTips: [
            "Để tiết kiệm bộ nhớ khi N = 10^7 hoặc 10^8, hãy dùng std::vector<bool> (được compiler tối ưu thành bitset: 1 bit mỗi phần tử) thay vì bool thông thường.",
            "Vòng lặp trong bắt đầu từ i * i. Nếu i > 46340, i * i sẽ tràn số int 32-bit! Bắt buộc viết 1LL * i * i <= MAXN."
          ]
        },
        {
          id: "binary-exponentiation",
          title: "Luỹ Thừa Nhị Phân & Nghịch Đảo Modulo",
          enTitle: "Binary Exponentiation & Modular Inverse",
          category: "Số học nâng cao",
          badge: "Siêu tốc độ",
          interactiveType: "binexp",
          summary: "Tính (A^B) % MOD trong O(log B) bằng kỹ thuật chia để trị. Tìm nghịch đảo modulo theo định lý Fermat nhỏ để thực hiện phép chia theo modulo.",
          intuition: `
            <h4>1. Phép luỹ thừa trong O(log B)</h4>
            <p>Tính $A^B$ bằng vòng lặp chạy $B$ lần mất $O(B)$. Khi $B = 10^{18}$, thời gian chạy là hàng ngàn năm! Ta quan sát:</p>
            <ul>
              <li>Nếu $B$ chẵn: $A^B = (A^{B/2})^2$</li>
              <li>Nếu $B$ lẻ: $A^B = A \\times A^{B-1}$</li>
            </ul>
            <p>Mỗi bước ta giảm số mũ $B$ đi một nửa, do đó chỉ mất tối đa $\\approx 60$ phép nhân cho $B = 10^{18}$!</p>
            <h4>2. Nghịch đảo Modulo (Modular Inverse)</h4>
            <p>Trong toán modulo, <strong>không tồn tại phép chia trực tiếp</strong>: $(A / B) \\pmod M \\ne (A \\pmod M) / (B \\pmod M)$.</p>
            <p>Theo Định lý nhỏ Fermat: Nếu $M$ là số nguyên tố thì $B^{M-1} \\equiv 1 \\pmod M$, suy ra $B \\times B^{M-2} \\equiv 1 \\pmod M$. Nghịch đảo modulo của $B$ chính là $B^{M-2} \\pmod M$. Ta chuyển phép chia thành phép nhân với $B^{M-2}$!</p>
          `,
          complexity: {
            time: "O(log B) cho luỹ thừa và O(log M) cho nghịch đảo",
            space: "O(1) bộ nhớ",
            analysis: "Tính số mũ 10^18 modulo 10^9+7 chỉ trong 60 chu kỳ máy (chưa tới 1 microsecond).",
            limitGuideline: "Không thể thiếu trong mọi bài toán tổ hợp, đếm số cách và xác suất trong kỳ thi."
          },
          codeTemplate: `#include <bits/stdc++.h>
using namespace std;

const long long MOD = 1e9 + 7;

// Tinh (base^exp) % MOD trong O(log exp)
long long power(long long base, long long exp) {
    long long res = 1;
    base %= MOD;
    while (exp > 0) {
        if (exp % 2 == 1) res = (res * base) % MOD;
        base = (base * base) % MOD;
        exp /= 2;
    }
    return res;
}

// Tinh nghich dao modulo B^(-1) mod MOD theo dinh ly Fermat nho
long long modInverse(long long b) {
    return power(b, MOD - 2);
}

// Tinh phep chia (a / b) % MOD
long long modDivide(long long a, long long b) {
    return (a % MOD * modInverse(b)) % MOD;
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    long long a = 12, b = 4;
    cout << "(" << a << " / " << b << ") % MOD = " << modDivide(a, b) << '\\n';
    return 0;
}`,
          marisaLinks: [
            { id: 63, name: "Binary Exponentiation", url: "https://marisaoj.com/problemset", diff: "★★☆☆☆", note: "Tính A^B mod M với B lên tới 10^18" },
            { id: 64, name: "Combination modulo 1e9+7", url: "https://marisaoj.com/problemset", diff: "★★★☆☆", note: "Tính tổ hợp nCk dùng giai thừa và nghịch đảo modulo" }
          ],
          coachTips: [
            "Mỗi khi nhân hai số long long có giá trị gần 10^9, tích của chúng đạt tới 10^18, suýt chạm ngưỡng tràn long long (9 x 10^18). Luôn modulo ngay sau mỗi phép nhân!",
            "Nếu MOD không phải là số nguyên tố, Định lý Fermat nhỏ không áp dụng được. Khi đó phải dùng thuật toán Euclid mở rộng (Extended Euclidean Algorithm)."
          ]
        },
        {
          id: "monotonic-stack",
          title: "Ngăn Xếp & Hàng Đợi Đơn Điệu (Monotonic Stack / Queue)",
          enTitle: "Monotonic Stack & Sliding Window Minimum",
          category: "Cấu trúc dữ liệu tối ưu",
          badge: "Kỹ thuật nâng cao",
          interactiveType: "monotonic-stack",
          summary: "Duy trì ngăn xếp hoặc hàng đợi luôn tăng hoặc giảm dần để tìm phần tử lớn hơn/nhỏ hơn gần nhất trong O(1) trung bình và tìm Min/Max trên cửa sổ trượt.",
          intuition: `
            <h4>1. Nghịch lý phần tử vô dụng</h4>
            <p>Xét bài toán: Tìm phần tử đầu tiên bên phải lớn hơn $A[i]$ (Next Greater Element). Nếu làm duyệt trâu 2 vòng for tốn $O(N^2)$.</p>
            <p>Trong ngăn xếp đơn điệu, ta duy trì các phần tử giảm dần. Khi gặp một phần tử mới $X$, nếu $X$ lớn hơn các phần tử đang nằm ở đỉnh ngăn xếp, thì <strong>$X$ chính là câu trả lời của các phần tử đó</strong>, và những phần tử nhỏ hơn này sẽ không bao giờ có cơ hội là đáp án cho bất kỳ ai đứng sau nữa! Ta loại bỏ chúng ngay lập tức.</p>
          `,
          complexity: {
            time: "O(N) tổng cộng (Mỗi phần tử chỉ push và pop đúng 1 lần)",
            space: "O(N) lưu stack / deque",
            analysis: "Mặc dù có vòng while bên trong vòng for, tổng số lần phần tử bị đẩy vào và lấy ra tối đa là 2N lần.",
            limitGuideline: "Áp dụng cho bài toán: Diện tích hình chữ nhật lớn nhất trong biểu đồ cột (Largest Rectangle in Histogram), Cửa sổ trượt min/max."
          },
          codeTemplate: `#include <bits/stdc++.h>
using namespace std;

// Tim chi so phan tu dau tien ben phai lon hon A[i]
int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int n;
    if (!(cin >> n)) return 0;

    vector<int> a(n);
    for (int i = 0; i < n; ++i) cin >> a[i];

    vector<int> next_greater(n, -1);
    stack<int> st; // Luu chi so index

    for (int i = 0; i < n; ++i) {
        // Duy tri ngan xep giam dan
        while (!st.empty() && a[st.top()] < a[i]) {
            next_greater[st.top()] = a[i];
            st.pop();
        }
        st.push(i);
    }

    for (int i = 0; i < n; ++i) {
        cout << next_greater[i] << " ";
    }
    cout << '\\n';
    return 0;
}`,
          marisaLinks: [
            { id: 65, name: "Next Greater Element", url: "https://marisaoj.com/problemset", diff: "★★☆☆☆", note: "Tìm phần tử lớn hơn gần nhất" },
            { id: 66, name: "Largest Rectangle in Histogram", url: "https://marisaoj.com/problemset", diff: "★★★☆☆", note: "Hình chữ nhật lớn nhất trên biểu đồ cột" },
            { id: 67, name: "Sliding Window Maximum", url: "https://marisaoj.com/problemset", diff: "★★★☆☆", note: "Tìm giá trị lớn nhất trên mọi cửa sổ độ dài K bằng Deque" }
          ],
          coachTips: [
            "Khi lưu vào ngăn xếp, hãy lưu chỉ số (index) thay vì lưu giá trị, vì từ index ta có thể vừa tra cứu giá trị vừa tính được khoảng cách/độ dài đoạn.",
            "Chú ý khởi tạo giá trị mặc định (như -1 hoặc n) cho các phần tử không tìm thấy đáp án hợp lệ."
          ]
        }
      ]
    },
    {
      id: "level-3",
      levelNum: 3,
      title: "Level 3: Kiến Thức Cốt Lõi (Fundamental Core)",
      enTitle: "Fundamental Knowledge for Advanced Algorithms",
      badge: "Xương sống (Core)",
      icon: "fa-solid fa-network-wired",
      summary: "Những kiến thức không thể thiếu của mọi lập trình viên thi đấu: Quy hoạch động kinh điển, DSU, Duyệt đồ thị BFS/DFS, Đường đi ngắn nhất Dijkstra và Cây khung Kruskal.",
      marisaRoadmapUrl: "https://marisaoj.com/roadmap/",
      topics: [
        {
          id: "dynamic-programming-knapsack",
          title: "Quy Hoạch Động: Bài Toán Cái Balo (Knapsack DP)",
          enTitle: "0/1 Knapsack & Unbounded Knapsack DP",
          category: "Quy hoạch động",
          badge: "Bắt buộc thành thạo",
          interactiveType: "knapsack",
          summary: "Tối ưu hoá các bài toán chọn lựa đồ vật có trọng lượng và giá trị bằng bảng trạng thái DP. Tối ưu không gian nhớ từ 2D xuống mảng 1D.",
          intuition: `
            <h4>1. Bản chất chia bài toán con</h4>
            <p>Gọi $dp[i][w]$ là giá trị lớn nhất thu được khi chỉ xét từ đồ vật $1$ đến đồ vật $i$ với sức chứa balo tối đa là $w$. Tại mỗi đồ vật $i$, ta chỉ có hai lựa chọn:</p>
            <ul>
              <li><strong>Không chọn vật $i$:</strong> Giá trị giữ nguyên $dp[i-1][w]$.</li>
              <li><strong>Có chọn vật $i$ (nếu $w \\ge weight[i]$):</strong> Giá trị là $dp[i-1][w - weight[i]] + value[i]$.</li>
            </ul>
            <div class="pedagogy-callout">
              <i class="fa-solid fa-microchip"></i>
              <div>
                <strong>Tối ưu bộ nhớ 1D (Space Optimization):</strong> Vì $dp[i][w]$ chỉ phụ thuộc vào hàng trước $dp[i-1]$, ta có thể bỏ chiều $i$ và chỉ dùng mảng $1$ chiều $dp[w]$. Nhưng chú ý: với Balo 0/1 (mỗi vật chỉ lấy tối đa 1 lần), <strong>phải duyệt $w$ từ lớn về nhỏ</strong> (từ $W$ xuống $weight[i]$) để không sử dụng lại kết quả của chính vật $i$ vừa tính!
              </div>
            </div>
          `,
          complexity: {
            time: "O(N x W) với N vật và sức chứa W",
            space: "O(W) sau khi tối ưu mảng 1 chiều",
            analysis: "N = 1000 vật, W = 10^5 sức chứa: 10^8 phép tính, chạy khoảng 0.15s trên máy chấm.",
            limitGuideline: "Dấu hiệu nhận biết: Bài toán chọn một tập hợp các phần tử sao cho tổng một đại lượng <= K và tối đa hoá đại lượng khác."
          },
          codeTemplate: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int n, W;
    if (!(cin >> n >> W)) return 0;

    vector<int> wt(n), val(n);
    for (int i = 0; i < n; ++i) cin >> wt[i] >> val[i];

    // Mang DP 1 chieu khoi tao ban dau bang 0
    vector<long long> dp(W + 1, 0);

    for (int i = 0; i < n; ++i) {
        // DUYET NGUOC tu W ve wt[i] de dam bao moi do vat chi dung 1 lan (0/1 Knapsack)
        for (int w = W; w >= wt[i]; --w) {
            dp[w] = max(dp[w], dp[w - wt[i]] + val[i]);
        }
    }

    cout << dp[W] << '\\n';
    return 0;
}`,
          marisaLinks: [
            { id: 70, name: "0/1 Knapsack Problem", url: "https://marisaoj.com/problemset", diff: "★★★☆☆", note: "Bài toán cái balo cơ bản" },
            { id: 71, name: "Subset Sum DP", url: "https://marisaoj.com/problemset", diff: "★★★☆☆", note: "Kiểm tra có tồn tại tập con có tổng đúng bằng S" },
            { id: 72, name: "Coin Change Problem", url: "https://marisaoj.com/problemset", diff: "★★★☆☆", note: "Balo không giới hạn (Unbounded Knapsack - duyệt xuôi w)" }
          ],
          coachTips: [
            "Nếu W duyệt từ bé đến lớn (wt[i] -> W), bài toán sẽ chuyển thành Balo không giới hạn (được lấy vật vô số lần).",
            "Nếu W quá lớn (W = 10^9) nhưng giá trị val[i] nhỏ (val <= 1000, tổng val <= 10^5), hãy ĐẢO TRẠNG THÁI: dp[v] là khối lượng nhỏ nhất để đạt được giá trị v!"
          ]
        },
        {
          id: "dsu",
          title: "Cấu Trúc Tập Hợp Rời Rạc (Disjoint Set Union - DSU)",
          enTitle: "Disjoint Set Union (DSU / Union-Find)",
          category: "Cấu trúc dữ liệu",
          badge: "Bảo bối đồ thị",
          interactiveType: "dsu",
          summary: "Quản lý các tập hợp rời rạc, hỗ trợ thao tác gộp (Union) và tìm kiếm đại diện (Find) trong thời gian gần như O(1) nhờ Nén đường đi (Path Compression) và Hợp nhất theo kích thước (Union by Rank).",
          intuition: `
            <h4>1. Ẩn dụ sư phạm</h4>
            <p>Mỗi tập hợp giống như một quốc gia, trong đó một đỉnh đóng vai trò là 'Nhà vua' (đại diện - Leader). Khi muốn biết hai người có cùng nước không, ta chỉ cần lần theo cây phả hệ xem hai người có chung Nhà vua hay không.</p>
            <h4>2. Hai phép tối ưu thần kỳ</h4>
            <ul>
              <li><strong>Nén đường đi (Path Compression):</strong> Khi tìm đại diện của $u$, ta gắn trực tiếp $u$ và tất cả các nút trên đường đi thẳng vào gốc. Lần sau gọi lại chỉ mất $O(1)$!</li>
              <li><strong>Hợp nhất theo kích thước (Union by Size/Rank):</strong> Luôn nhập cây nhỏ hơn vào cây lớn hơn, giúp chiều cao của cây không bao giờ bị phình to dạng đường thẳng.</li>
            </ul>
          `,
          complexity: {
            time: "O(alpha(N)) ≈ O(1) mỗi thao tác (alpha là hàm ngược Ackermann)",
            space: "O(N) lưu mảng cha parent và kích thước size",
            analysis: "Hàm alpha(N) < 5 với mọi N trong vũ trụ (N < 10^80). Thời gian thực tế chỉ là 1-2 phép gán con trỏ.",
            limitGuideline: "Dùng để kiểm tra liên thông, chu trình trong đồ thị, và làm lõi cho thuật toán Kruskal tìm cây khung nhỏ nhất."
          },
          codeTemplate: `#include <bits/stdc++.h>
using namespace std;

// Cau truc DSU toi uu chuan ICPC
struct DSU {
    vector<int> parent, sz;

    DSU(int n) {
        parent.resize(n + 1);
        sz.assign(n + 1, 1);
        for (int i = 1; i <= n; ++i) parent[i] = i;
    }

    // Tim nut dai dien ket hop nen duong di (Path Compression)
    int find(int v) {
        if (v == parent[v]) return v;
        return parent[v] = find(parent[v]);
    }

    // Hop nhat hai tap hop theo kich thuoc (Union by Size)
    bool unite(int a, int b) {
        a = find(a);
        b = find(b);
        if (a != b) {
            if (sz[a] < sz[b]) swap(a, b);
            parent[b] = a;
            sz[a] += sz[b];
            return true; // Da hop nhat thanh cong
        }
        return false; // Chung da thuoc ve cung mot tap hop tu truoc
    }
};

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int n = 5;
    DSU dsu(n);
    dsu.unite(1, 2);
    dsu.unite(2, 3);
    cout << (dsu.find(1) == dsu.find(3) ? "Cung thanh phan" : "Khac thanh phan") << '\\n';
    return 0;
}`,
          marisaLinks: [
            { id: 75, name: "Disjoint Set Union Basics", url: "https://marisaoj.com/problemset", diff: "★★★☆☆", note: "Kiểm tra tính liên thông giữa các đỉnh" },
            { id: 76, name: "Road Construction", url: "https://marisaoj.com/problemset", diff: "★★★☆☆", note: "Quản lý số lượng thành phần liên thông và kích thước lớn nhất" }
          ],
          coachTips: [
            "Đừng quên gán parent[v] = find(parent[v]) trong hàm find. Nếu chỉ viết return find(parent[v]) mà không nén đường đi, cây có thể bị suy biến thành đường thẳng và độ phức tạp tụt xuống O(N) gây TLE!",
            "DSU có thể mang thêm trọng số (DSU with rollbacks hoặc Potential DSU) để giải các bài toán nâng cao."
          ]
        },
        {
          id: "graph-bfs-dfs",
          title: "Duyệt Đồ Thị BFS & DFS (Graph Traversals)",
          enTitle: "Breadth-First Search & Depth-First Search",
          category: "Lý thuyết đồ thị",
          badge: "Cốt lõi tuyệt đối",
          interactiveType: "bfs",
          summary: "Hai thuật toán duyệt đồ thị kinh điển: BFS dùng hàng đợi tìm đường đi ngắn nhất không trọng số, DFS dùng ngăn xếp đệ quy tìm thành phần liên thông, chu trình và thứ tự tô-pô.",
          intuition: `
            <h4>1. Phân biệt theo triết lý tìm kiếm</h4>
            <ul>
              <li><strong>BFS (Breadth-First - Theo chiều rộng):</strong> Lan tỏa đều như làn sóng nước. Thăm tất cả các đỉnh cách đỉnh xuất phát khoảng cách $1$, sau đó là khoảng cách $2$, rồi đến $3$... Vì vậy, lần đầu tiên BFS chạm tới đích chính là <strong>con đường ngắn nhất</strong> (trên đồ thị không có trọng số hoặc trọng số bằng nhau)!</li>
              <li><strong>DFS (Depth-First - Theo chiều sâu):</strong> Đi sâu nhất có thể theo một nhánh giống như người lạc trong mê cung đến khi gặp ngõ cụt thì mới lùi lại (Backtrack). Rất phù hợp để đếm thành phần liên thông, kiểm tra chu trình và sắp xếp tô-pô (Topological Sort).</li>
            </ul>
          `,
          complexity: {
            time: "O(V + E) với V la so dinh, E la so canh",
            space: "O(V) cho mang visited va Queue/Stack",
            analysis: "Mỗi đỉnh được đưa vào hàng đợi đúng 1 lần, mỗi cạnh được duyệt đúng 1 hoặc 2 lần.",
            limitGuideline: "Đồ thị có V, E <= 2 x 10^5 chạy hoàn toàn trong khoảng 0.15s."
          },
          codeTemplate: `#include <bits/stdc++.h>
using namespace std;

// BFS tim khoang cach ngan nhat tu dinh xuat phat s
vector<int> bfs(int s, int n, const vector<vector<int>>& adj) {
    vector<int> dist(n + 1, -1);
    queue<int> q;

    dist[s] = 0;
    q.push(s);

    while (!q.empty()) {
        int u = q.front();
        q.pop();

        for (int v : adj[u]) {
            if (dist[v] == -1) { // Dinh v chua duoc tham
                dist[v] = dist[u] + 1;
                q.push(v);
            }
        }
    }
    return dist;
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int n, m;
    if (!(cin >> n >> m)) return 0;

    vector<vector<int>> adj(n + 1);
    for (int i = 0; i < m; ++i) {
        int u, v;
        cin >> u >> v;
        adj[u].push_back(v);
        adj[v].push_back(u); // Do thi vo huong
    }

    vector<int> dist = bfs(1, n, adj);
    cout << "Khoang cach tu 1 den n: " << dist[n] << '\\n';
    return 0;
}`,
          marisaLinks: [
            { id: 80, name: "Connected Components", url: "https://marisaoj.com/problemset", diff: "★★☆☆☆", note: "Đếm số thành phần liên thông trên đồ thị vô hướng" },
            { id: 81, name: "Shortest Route with BFS", url: "https://marisaoj.com/problemset", diff: "★★★☆☆", note: "Tìm đường đi ngắn nhất và truy vết đường đi" },
            { id: 82, name: "Bipartite Graph Check", url: "https://marisaoj.com/problemset", diff: "★★★☆☆", note: "Tô màu đồ thị kiểm tra đồ thị hai phía" }
          ],
          coachTips: [
            "Đánh dấu visited[v] = true NGAY KHI PUSH vào Queue, không phải khi Pop ra! Nếu đánh dấu khi Pop, một đỉnh có thể bị đẩy vào Queue hàng ngàn lần bởi các đỉnh láng giềng khác nhau $\\rightarrow$ tràn bộ nhớ MLE hoặc TLE.",
            "Với đồ thị có trọng số $0$ hoặc $1$, hãy dùng 0-1 BFS với std::deque thay vì Dijkstra để đạt độ phức tạp $O(V + E)$ thay vì $O(E \\log V)$."
          ]
        },
        {
          id: "dijkstra",
          title: "Đường Đi Ngắn Nhất: Thuật Toán Dijkstra",
          enTitle: "Dijkstra's Shortest Path Algorithm",
          category: "Lý thuyết đồ thị có trọng số",
          badge: "Siêu sao đồ thị",
          interactiveType: "dijkstra",
          summary: "Tìm đường đi ngắn nhất từ một đỉnh nguồn tới mọi đỉnh trên đồ thị có trọng số không âm trong O((V + E) log V) bằng Hàng đợi ưu tiên (Priority Queue).",
          intuition: `
            <h4>1. Tư tưởng tham lam kết hợp lan truyền</h4>
            <p>Dijkstra duy trì mảng $dist[u]$ là khoảng cách ngắn nhất hiện thời từ đỉnh nguồn $S$ tới $u$. Tại mỗi bước, ta luôn chọn đỉnh $u$ có <strong>$dist[u]$ nhỏ nhất trong số các đỉnh chưa được chốt</strong> bằng <code>priority_queue</code>.</p>
            <p>Vì mọi trọng số cạnh đều không âm, không bao giờ có một con đường vòng nào khác có thể đi qua một đỉnh khác rồi quay lại $u$ mà cho khoảng cách ngắn hơn $dist[u]$ hiện tại. Khi $u$ được lấy ra khỏi hàng đợi ưu tiên, khoảng cách của nó được CHỐT VĨNH VIỄN!</p>
          `,
          complexity: {
            time: "O((V + E) log V)",
            space: "O(V + E) lưu danh sách kề và heap",
            analysis: "Với V, E = 2 x 10^5, thuật toán thực hiện khoảng 2 x 10^5 x 18 ≈ 3.6 x 10^6 phép toán, chạy chỉ mất ~0.1s.",
            limitGuideline: "CHỈ ÁP DỤNG cho đồ thị có trọng số CẠNH KHÔNG ÂM. Nếu có cạnh âm, phải dùng Bellman-Ford hoặc SPFA."
          },
          codeTemplate: `#include <bits/stdc++.h>
using namespace std;

const long long INF = 1e18; // Gia tri vo cung an toan

struct Edge {
    int to;
    long long weight;
};

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int n, m;
    if (!(cin >> n >> m)) return 0;

    vector<vector<Edge>> adj(n + 1);
    for (int i = 0; i < m; ++i) {
        int u, v;
        long long w;
        cin >> u >> v >> w;
        adj[u].push_back({v, w});
    }

    // Min-heap luu cap {khoang cach, dinh}
    priority_queue<pair<long long, int>, vector<pair<long long, int>>, greater<pair<long long, int>>> pq;
    vector<long long> dist(n + 1, INF);

    int start_node = 1;
    dist[start_node] = 0;
    pq.push({0, start_node});

    while (!pq.empty()) {
        auto [d, u] = pq.top();
        pq.pop();

        // Kiem tra gia tri loi thoi (Lazy deletion)
        if (d > dist[u]) continue;

        for (const auto& edge : adj[u]) {
            int v = edge.to;
            long long w = edge.weight;
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                pq.push({dist[v], v});
            }
        }
    }

    cout << (dist[n] == INF ? -1 : dist[n]) << '\\n';
    return 0;
}`,
          marisaLinks: [
            { id: 85, name: "Shortest Routes I", url: "https://marisaoj.com/problemset", diff: "★★★☆☆", note: "Dijkstra cơ bản từ đỉnh 1 tới các đỉnh còn lại" },
            { id: 86, name: "Flight Discount", url: "https://marisaoj.com/problemset", diff: "★★★★☆", note: "Dijkstra trên đồ thị nhiều tầng (State Graph)" }
          ],
          coachTips: [
            "Bắt buộc phải có câu lệnh 'if (d > dist[u]) continue;' ngay sau pq.pop(). Nếu thiếu bước này, các đỉnh với khoảng cách cũ lỗi thời sẽ vẫn được duyệt, khiến thuật toán bị chạy lũy thừa thời gian dẫn tới TLE!",
            "Khởi tạo khoảng cách vô cùng INF = 1e18 (long long), không dùng 0x3f3f3f3f hoặc 1e9 nếu tổng trọng số đường đi có thể vượt quá giới hạn int 32-bit."
          ]
        }
      ]
    },
    {
      id: "level-4",
      levelNum: 4,
      title: "Level 4: Nền Tảng Nâng Cao (Data Structures & Trees)",
      enTitle: "Further Fundamental Knowledge",
      badge: "Nâng cao (Advanced)",
      icon: "fa-solid fa-tree",
      summary: "Các cấu trúc dữ liệu cây tối thượng: Segment Tree, Fenwick Tree (BIT), thuật toán trên cây (LCA, Euler Tour) và Quy hoạch động trạng thái Bit (Bitmask DP).",
      marisaRoadmapUrl: "https://marisaoj.com/roadmap/",
      topics: [
        {
          id: "segment-tree",
          title: "Cây Phân Đoạn (Segment Tree)",
          enTitle: "Segment Tree (Point Update, Range Query)",
          category: "Cấu trúc dữ liệu cây",
          badge: "Bảo vật thi đấu",
          interactiveType: "segment-tree",
          summary: "Cây nhị phân hoàn hảo chia mảng thành các đoạn con, cho phép cập nhật điểm và truy vấn tổng/min/max trên đoạn bất kỳ trong O(log N).",
          intuition: `
            <h4>1. Cấu trúc nhị phân phân chia quản lý</h4>
            <p>Nếu dùng mảng thường: Cập nhật $O(1)$ nhưng hỏi đoạn tốn $O(N)$. Nếu dùng Prefix Sum: Hỏi đoạn $O(1)$ nhưng cập nhật tốn $O(N)$.</p>
            <p>Segment Tree là sự cân bằng hoàn hảo! Mỗi nút trên cây quản lý một đoạn $[L, R]$. Nút con trái quản lý $[L, Mid]$, con phải quản lý $[Mid+1, R]$. Bất kỳ đoạn truy vấn nào cũng chỉ cần phân rã thành tối đa $2 \\log_2 N$ nút trên cây. Do đó cả cập nhật lẫn truy vấn đều mất đúng $O(\\log N)$!</p>
          `,
          complexity: {
            time: "Dựng cây O(N), Cập nhật O(log N), Truy vấn O(log N)",
            space: "O(4N) bộ nhớ mảng cây",
            analysis: "Với N = 2 x 10^5, cây có chiều cao không quá 19 tầng. 10^5 truy vấn chạy chỉ mất khoảng 0.09s.",
            limitGuideline: "Áp dụng cho mọi bài toán Range Minimum Query (RMQ), Range Sum có yếu tố CẬP NHẬT GIÁ TRỊ liên tục."
          },
          codeTemplate: `#include <bits/stdc++.h>
using namespace std;

const int MAXN = 200005;
long long tree[4 * MAXN];
long long a[MAXN];

// Xay dung cay Segment Tree tu mang ban dau
void build(int node, int start, int end) {
    if (start == end) {
        tree[node] = a[start];
        return;
    }
    int mid = (start + end) / 2;
    build(2 * node, start, mid);
    build(2 * node + 1, mid + 1, end);
    tree[node] = tree[2 * node] + tree[2 * node + 1]; // Tong hai nut con
}

// Cap nhat diem: Thay doi gia tri tai vi tri idx thanh val
void update(int node, int start, int end, int idx, long long val) {
    if (start == end) {
        a[idx] = val;
        tree[node] = val;
        return;
    }
    int mid = (start + end) / 2;
    if (start <= idx && idx <= mid)
        update(2 * node, start, mid, idx, val);
    else
        update(2 * node + 1, mid + 1, end, idx, val);
    tree[node] = tree[2 * node] + tree[2 * node + 1];
}

// Truy van tong tren doan [l, r]
long long query(int node, int start, int end, int l, int r) {
    if (r < start || end < l) return 0; // Doan khong giao nhau
    if (l <= start && end <= r) return tree[node]; // Doan nam hoan toan ben trong
    int mid = (start + end) / 2;
    long long p1 = query(2 * node, start, mid, l, r);
    long long p2 = query(2 * node + 1, mid + 1, end, l, r);
    return p1 + p2;
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int n = 5;
    for (int i = 1; i <= n; ++i) a[i] = i;
    build(1, 1, n);
    cout << "Tong doan [2, 4]: " << query(1, 1, n, 2, 4) << '\\n';
    return 0;
}`,
          marisaLinks: [
            { id: 90, name: "Dynamic Range Sum Queries", url: "https://marisaoj.com/problemset", diff: "★★★☆☆", note: "Cập nhật điểm và truy vấn tổng đoạn" },
            { id: 91, name: "Dynamic Range Minimum Queries", url: "https://marisaoj.com/problemset", diff: "★★★☆☆", note: "Truy vấn giá trị nhỏ nhất trên đoạn" }
          ],
          coachTips: [
            "Kích thước mảng cây bắt buộc phải là 4 * N. Nếu khai báo 2 * N sẽ bị tràn mảng và nhận lỗi Runtime Error (SIGSEGV) ngay lập tức.",
            "Segment Tree dạng đệ quy dễ code và mở rộng (hỗ trợ Lazy Propagation). Nếu cần tốc độ cực nhanh, có thể tìm hiểu Segment Tree không đệ quy (Iterative Segment Tree)."
          ]
        },
        {
          id: "fenwick-tree",
          title: "Cây Chỉ Số Nhị Phân (Fenwick Tree / BIT)",
          enTitle: "Binary Indexed Tree (BIT)",
          category: "Cấu trúc dữ liệu gọn nhẹ",
          badge: "Ngắn gọn & Tối ưu",
          interactiveType: "fenwick",
          summary: "Cấu trúc dữ liệu thần kỳ chỉ với 10 dòng mã! Dựa trên phép toán bit x & (-x) (LSB) để tính tổng tiền tố và cập nhật trong O(log N) với hằng số thời gian cực nhỏ.",
          intuition: `
            <h4>1. Phép toán bit thông minh</h4>
            <p>Phép toán <code>x & (-x)</code> trả về bit $1$ thấp nhất (Lowest Set Bit - LSB) của $x$. Ví dụ:</p>
            <ul>
              <li>$6 = (110)_2 \\implies 6 \\& (-6) = 2$. Nút 6 quản lý đoạn có độ dài 2: $(4, 6]$.</li>
              <li>$8 = (1000)_2 \\implies 8 \\& (-8) = 8$. Nút 8 quản lý đoạn có độ dài 8: $(0, 8]$.</li>
            </ul>
            <p>Nhờ cấu trúc nhị phân này, mảng BIT không cần con trỏ hay bộ nhớ $4N$, chỉ cần đúng $N$ phần tử và chạy nhanh hơn Segment Tree từ 3-5 lần!</p>
          `,
          complexity: {
            time: "Cập nhật O(log N), Truy vấn O(log N)",
            space: "O(N) bộ nhớ - tối ưu tuyệt đối",
            analysis: "Không dùng đệ quy, chỉ có vòng lặp while 10-20 bước dịch bit, gần như không có chi phí overhead của CPU cache.",
            limitGuideline: "Lựa chọn số 1 khi chỉ cần cập nhật điểm và truy vấn tổng hoặc nghịch thế (Inversion Count)."
          },
          codeTemplate: `#include <bits/stdc++.h>
using namespace std;

struct FenwickTree {
    int n;
    vector<long long> bit;

    FenwickTree(int n) : n(n), bit(n + 1, 0) {}

    // Cong them delta vao phan tu tai chi so idx
    void add(int idx, long long delta) {
        for (; idx <= n; idx += idx & (-idx))
            bit[idx] += delta;
    }

    // Tinh tong tien to tu 1 den idx
    long long query(int idx) {
        long long sum = 0;
        for (; idx > 0; idx -= idx & (-idx))
            sum += bit[idx];
        return sum;
    }

    // Tinh tong tren doan [l, r]
    long long queryRange(int l, int r) {
        return query(r) - query(l - 1);
    }
};

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    FenwickTree bit(10);
    bit.add(3, 5);
    bit.add(7, 10);
    cout << "Tong doan [1, 7]: " << bit.query(7) << '\\n';
    return 0;
}`,
          marisaLinks: [
            { id: 92, name: "Fenwick Tree Inversion Count", url: "https://marisaoj.com/problemset", diff: "★★★☆☆", note: "Đếm số cặp nghịch thế trong mảng" },
            { id: 93, name: "Range Sum with BIT", url: "https://marisaoj.com/problemset", diff: "★★★☆☆", note: "Luyện tập thao tác cập nhật và tính tổng" }
          ],
          coachTips: [
            "Fenwick Tree BẮT BUỘC dùng 1-based indexing! Nếu gọi add(0, v) hoặc query(0), vòng lặp idx += idx & (-idx) với idx = 0 sẽ dẫn tới vòng lặp vô hạn và tràn thời gian TLE.",
            "BIT thích hợp nhất cho phép toán có nghịch đảo (như phép cộng, trừ, xor). Nếu muốn tìm Min/Max đoạn mà có cập nhật, nên dùng Segment Tree."
          ]
        },
        {
          id: "lca-binary-lifting",
          title: "Tổ Tiên Chung Gần Nhất (LCA & Binary Lifting)",
          enTitle: "Lowest Common Ancestor by Binary Lifting",
          category: "Thuật toán trên cây",
          badge: "Kỹ thuật thượng thừa",
          interactiveType: "lca",
          summary: "Tìm tổ tiên chung gần nhất của hai nút trên cây trong O(log N) bằng phương pháp Nhảy nhị phân (Binary Lifting) sau khi tiền xử lý O(N log N).",
          intuition: `
            <h4>1. Ý tưởng nhảy số mũ 2</h4>
            <p>Thay vì đi ngược từng bước một lên nút cha (mất $O(N)$ trong trường hợp cây suy biến thành đường thẳng), ta lưu trước thông tin: <em>Nút cha thứ $2^j$ của nút $u$ là ai?</em></p>
            <p>Ta có công thức quy hoạch động tuyệt đẹp:</p>
            <div class="math-card">
              $$up[u][j] = up[up[u][j-1]][j-1]$$
            </div>
            <p>Nghĩa là: Bước nhảy $2^j$ bước bằng hai bước nhảy liên tiếp, mỗi bước dài $2^{j-1}$ bước!</p>
          `,
          complexity: {
            time: "Tiền xử lý O(N log N), Mỗi truy vấn LCA O(log N)",
            space: "O(N log N) mảng bảng nhảy nhị phân up[N][20]",
            analysis: "log2(N) <= 20 với N <= 2 x 10^5. Mỗi truy vấn chỉ mất khoảng 20 phép so sánh.",
            limitGuideline: "Nền tảng của mọi bài toán tính khoảng cách giữa hai đỉnh trên cây: dist(u, v) = depth[u] + depth[v] - 2 * depth[LCA(u, v)]."
          },
          codeTemplate: `#include <bits/stdc++.h>
using namespace std;

const int MAXN = 200005;
const int LOG = 20;

vector<int> adj[MAXN];
int up[MAXN][LOG]; // up[u][j] la to tien thu 2^j cua u
int depth[MAXN];

void dfs(int u, int p) {
    up[u][0] = p;
    for (int j = 1; j < LOG; ++j) {
        up[u][j] = up[up[u][j - 1]][j - 1];
    }
    for (int v : adj[u]) {
        if (v != p) {
            depth[v] = depth[u] + 1;
            dfs(v, u);
        }
    }
}

int get_lca(int u, int v) {
    if (depth[u] < depth[v]) swap(u, v);

    // Dua u va v ve cung do sau
    for (int j = LOG - 1; j >= 0; --j) {
        if (depth[u] - (1 << j) >= depth[v]) {
            u = up[u][j];
        }
    }
    if (u == v) return u;

    // Nhay dong thoi ca u va v len cao nhat co the ma van khong gap nhau
    for (int j = LOG - 1; j >= 0; --j) {
        if (up[u][j] != up[v][j]) {
            u = up[u][j];
            v = up[v][j];
        }
    }
    return up[u][0]; // Cha truc tiep chinh la LCA
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    // Minh hoa DFS tu goc 1
    depth[1] = 0;
    dfs(1, 1);
    return 0;
}`,
          marisaLinks: [
            { id: 95, name: "Company Queries II (LCA)", url: "https://marisaoj.com/problemset", diff: "★★★★☆", note: "Bài tập LCA chuẩn trên MarisaOJ" },
            { id: 96, name: "Distance Queries on Tree", url: "https://marisaoj.com/problemset", diff: "★★★★☆", note: "Tính khoảng cách giữa 2 nút bất kỳ trên cây dùng LCA" }
          ],
          coachTips: [
            "Khi khởi tạo DFS cho nút gốc root, hãy đặt up[root][0] = root để khi nhảy vượt quá gốc, chỉ số vẫn an toàn ở root.",
            "Giá trị LOG chỉ cần đặt là 19 hoặc 20 cho N <= 200,000 vì 2^18 = 262,144."
          ]
        },
        {
          id: "bitmask-dp",
          title: "Quy Hoạch Động Trạng Thái Bit (Bitmask DP)",
          enTitle: "Bitmask Dynamic Programming (TSP & Assignment)",
          category: "Quy hoạch động nâng cao",
          badge: "Đặc sản ICPC",
          interactiveType: "bitmask",
          summary: "Mã hoá tập hợp các phần tử đã được chọn thành một số nguyên bằng các bit nhị phân (0 hoặc 1). Giải quyết các bài toán NP-hard kích thước nhỏ như Người du lịch (TSP) trong O(N^2 * 2^N).",
          intuition: `
            <h4>1. Biểu diễn tập hợp bằng bit</h4>
            <p>Một số nguyên 32-bit có thể đại diện cho một tập hợp tối đa 32 phần tử. Bit thứ $i$ bằng $1$ nghĩa là phần tử thứ $i$ đã được chọn, bit bằng $0$ là chưa chọn:</p>
            <ul>
              <li>Kiểm tra phần tử $i$ có trong mask không: <code>(mask >> i) & 1</code></li>
              <li>Thêm phần tử $i$ vào mask: <code>mask | (1 << i)</code></li>
              <li>Loại bỏ phần tử $i$ khỏi mask: <code>mask & ~(1 << i)</code></li>
            </ul>
            <p>Thay vì lưu mảng trạng thái $20$ chiều không khả thi, ta chỉ cần một chiều duy nhất có kích thước $2^N$!</p>
          `,
          complexity: {
            time: "O(N^2 x 2^N) cho bai toan TSP",
            space: "O(N x 2^N) bo nho mang DP",
            analysis: "Voi N = 18, 2^18 = 262,144. Tong so trang thai la 18 x 262,144 ≈ 4.7 x 10^6, chay trong ~0.12s.",
            limitGuideline: "Dấu hiệu nhận biết rõ ràng nhất: Giới hạn N trong đề bài rất nhỏ, thường là N <= 18 hoặc N <= 20."
          },
          codeTemplate: `#include <bits/stdc++.h>
using namespace std;

const int INF = 1e9;
int n;
int dist[20][20];
int dp[1 << 18][18];

// Ham de quy nho loi giai tinh TSP
int solve(int mask, int u) {
    if (mask == (1 << n) - 1) {
        return dist[u][0]; // Da tham het tat ca thanh pho, quay ve xuat phat 0
    }
    if (dp[mask][u] != -1) return dp[mask][u];

    int ans = INF;
    for (int v = 0; v < n; ++v) {
        if (!((mask >> v) & 1)) { // Neu thanh pho v chua duoc tham
            ans = min(ans, solve(mask | (1 << v), v) + dist[u][v]);
        }
    }
    return dp[mask][u] = ans;
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    // Khoi tao mang dp ban dau bang -1
    memset(dp, -1, sizeof(dp));
    return 0;
}`,
          marisaLinks: [
            { id: 98, name: "Traveling Salesman Problem (TSP)", url: "https://marisaoj.com/problemset", diff: "★★★★☆", note: "Bài toán người du lịch kinh điển" },
            { id: 99, name: "Hamiltonian Flights", url: "https://marisaoj.com/problemset", diff: "★★★★☆", note: "Đếm số đường đi Hamilton trên đồ thị dùng Bitmask DP" }
          ],
          coachTips: [
            "Các phép toán bit có độ ưu tiên THẤP HƠN các phép toán so sánh (+, -, ==). Luôn bọc dấu ngoặc cẩn thận: ((mask >> i) & 1) thay vì (mask >> i & 1).",
            "Tránh dịch bit quá 31 vị trí trên số int thường: Phải dùng (1LL << i) nếu làm việc với mask trên 30 bit."
          ]
        }
      ]
    },
    {
      id: "level-5",
      levelNum: 5,
      title: "Level 5: Kỹ Thuật Chuyên Sâu (Advanced Techniques)",
      enTitle: "Advanced Techniques",
      badge: "Chuyên sâu (Master)",
      icon: "fa-solid fa-brain",
      summary: "Những kỹ thuật đỉnh cao phân loại huy chương: Phân rã căn bậc hai (Sqrt Decomposition / Mo), Cây tiền tố (Trie), HLD, Khớp & Cầu, Thành phần liên thông mạnh (Tarjan SCC) và Luồng cực đại Dinic.",
      marisaRoadmapUrl: "https://marisaoj.com/roadmap/",
      topics: [
        {
          id: "mo-algorithm",
          title: "Chia Căn & Thuật Toán Mo (Sqrt Decomposition & Mo's Algorithm)",
          enTitle: "Square Root Decomposition & Mo's Algorithm",
          category: "Kỹ thuật tối ưu truy vấn",
          badge: "Đỉnh cao Offline",
          interactiveType: "mo",
          summary: "Kỹ thuật chia mảng thành các khối kích thước sqrt(N). Thuật toán Mo sắp xếp lại các câu hỏi ngoại tuyến (offline) để trả lời Q truy vấn đoạn trong O((N + Q) * sqrt(N)).",
          intuition: `
            <h4>1. Phép màu của việc sắp xếp lại câu hỏi</h4>
            <p>Nếu người ta hỏi các đoạn $[L, R]$ ngẫu nhiên, ta phải di chuyển con trỏ rất xa. Nhưng nếu ta được phép gom các câu hỏi lại và trả lời theo thứ tự thông minh (Offline Processing):</p>
            <ul>
              <li>Chia mảng $N$ phần tử thành các block kích thước $B = \\sqrt{N}$.</li>
              <li>Sắp xếp các câu hỏi theo $L / B$ (cùng thuộc một block bên trái).</li>
              <li>Nếu cùng block, sắp xếp theo $R$ tăng dần.</li>
            </ul>
            <p>Khi đó con trỏ $R$ chỉ quét từ trái sang phải một lần cho mỗi block (tối đa $\\sqrt{N} \\times N$), còn con trỏ $L$ chỉ dao động quanh quẩn trong block độ dài $\\sqrt{N}$! Tổng thời gian di chuyển giảm ngoạn mục về $O((N + Q)\\sqrt{N})$.</p>
          `,
          complexity: {
            time: "O((N + Q) * sqrt(N))",
            space: "O(N + Q) luu mang va truy van",
            analysis: "Voi N = Q = 10^5, (N + Q) * sqrt(N) ≈ 2 x 10^5 x 316 ≈ 6.3 x 10^7 phep tinh, chay hoan hao trong 0.25s.",
            limitGuideline: "Dùng cho các bài toán đếm số phần tử phân biệt, tần số xuất hiện trên đoạn mà không thể dùng Segment Tree thông thường."
          },
          codeTemplate: `#include <bits/stdc++.h>
using namespace std;

const int BLOCK_SIZE = 350; // Xap xi sqrt(100000)

struct Query {
    int l, r, id;
    bool operator<(const Query& other) const {
        if (l / BLOCK_SIZE != other.l / BLOCK_SIZE)
            return l < other.l;
        // Toi uu con tro zigzag (Hilbert Curve hoac chan le)
        return (l / BLOCK_SIZE) % 2 ? r < other.r : r > other.r;
    }
};

int freq[1000005];
int current_distinct = 0;

void add(int val) {
    if (freq[val] == 0) current_distinct++;
    freq[val]++;
}

void remove(int val) {
    freq[val]--;
    if (freq[val] == 0) current_distinct--;
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    // Duyet hai con tro Mo tuong tu Two Pointers ngoai tuyen
    return 0;
}`,
          marisaLinks: [
            { id: 105, name: "Distinct Values Queries", url: "https://marisaoj.com/problemset", diff: "★★★★☆", note: "Đếm số phần tử phân biệt trên đoạn bằng Mo" },
            { id: 106, name: "Powerful Array", url: "https://marisaoj.com/problemset", diff: "★★★★★", note: "Tính tổng s * s * Ks kinh điển trên Codeforces/MarisaOJ" }
          ],
          coachTips: [
            "Tối ưu Mo chẵn lẻ (Zigzag optimization): Khi block của L là số lẻ thì sắp R tăng dần, số chẵn thì sắp R giảm dần. Điều này giúp con trỏ R không phải chạy ngược vô ích từ cuối mảng về đầu mỗi khi chuyển block, tăng tốc độ gấp đôi!",
            "Kích thước block tối ưu thực tế không nhất thiết là sqrt(N), mà có thể chỉnh thành N / sqrt(Q) tuỳ theo tỉ lệ giữa N và Q."
          ]
        },
        {
          id: "tarjan-scc",
          title: "Thành Phần Liên Thông Mạnh & Khớp Cầu (Tarjan SCC)",
          enTitle: "Tarjan's Strongly Connected Components & Bridges",
          category: "Lý thuyết đồ thị chuyên sâu",
          badge: "Bản lĩnh ICPC",
          interactiveType: "tarjan",
          summary: "Tìm các khớp (Articulation Points), cầu (Bridges) trên đồ thị vô hướng và phân rã đồ thị có hướng thành Đồ thị có hướng không chu trình (DAG) bằng thuật toán Tarjan trong O(V + E).",
          intuition: `
            <h4>1. Khái niệm tin[u] và low[u]</h4>
            <p>Trong quá trình duyệt DFS cây tìm kiếm, mỗi đỉnh được gán nhãn thời điểm thăm $tin[u]$.</p>
            <p>$low[u]$ là thời điểm nhỏ nhất mà từ cây con gốc $u$ có thể đi ngược lên được thông qua tối đa một cạnh ngược (Back-edge).</p>
            <div class="pedagogy-callout">
              <i class="fa-solid fa-bridge"></i>
              <div>
                <strong>Điều kiện nhận diện:</strong>
                <ul>
                  <li><strong>Cạnh $(u, v)$ là Cầu (Bridge):</strong> Khi $low[v] > tin[u]$ (nghĩa là từ cây con của $v$ không có bất kỳ con đường nào vòng lên được $u$ hoặc cao hơn $u$).</li>
                  <li><strong>Đỉnh $u$ là Khớp (Articulation Point):</strong> Khi $low[v] \\ge tin[u]$ (xoá $u$ sẽ làm cô lập nhánh của $v$).</li>
                </ul>
              </div>
            </div>
          `,
          complexity: {
            time: "O(V + E) - Đúng duy nhất một lần duyệt DFS",
            space: "O(V) lưu mảng tin, low và stack",
            analysis: "Đạt giới hạn lý thuyết tối ưu tuyệt đối cho việc phân tích cấu trúc liên thông của đồ thị.",
            limitGuideline: "Dùng để co cụm các thành phần liên thông mạnh thành siêu đỉnh (DAG condensation), sau đó chạy Quy hoạch động trên DAG."
          },
          codeTemplate: `#include <bits/stdc++.h>
using namespace std;

const int MAXN = 100005;
vector<int> adj[MAXN];
int tin[MAXN], low[MAXN], timer = 0;
bool visited[MAXN];
vector<pair<int, int>> bridges;

void dfs_bridge(int u, int p = -1) {
    visited[u] = true;
    tin[u] = low[u] = ++timer;

    for (int v : adj[u]) {
        if (v == p) continue; // Bo qua canh tro ve cha truc tiep
        if (visited[v]) {
            // Canh nguoc (Back-edge)
            low[u] = min(low[u], tin[v]);
        } else {
            // Canh tren cay DFS (Tree-edge)
            dfs_bridge(v, u);
            low[u] = min(low[u], low[v]);
            if (low[v] > tin[u]) {
                bridges.push_back({u, v}); // Tim thay cau!
            }
        }
    }
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    return 0;
}`,
          marisaLinks: [
            { id: 110, name: "Finding Bridges", url: "https://marisaoj.com/problemset", diff: "★★★★☆", note: "Liệt kê toàn bộ các cầu trên đồ thị" },
            { id: 111, name: "Strongly Connected Components", url: "https://marisaoj.com/problemset", diff: "★★★★☆", note: "Thuật toán Tarjan phân tích SCC trên đồ thị có hướng" }
          ],
          coachTips: [
            "Cẩn thận trường hợp đồ thị có cạnh bội (Multiple edges): Khi đó v == p không đủ, bạn phải truyền vào ID của cạnh để tránh việc coi cạnh bội thứ hai là cạnh đi ngược về cha!",
            "Với gốc của cây DFS, nó chỉ là khớp nếu nó có từ 2 cây con độc lập trở lên trong cây DFS."
          ]
        },
        {
          id: "max-flow-dinic",
          title: "Luồng Cực Đại: Thuật Toán Dinic (Max Flow)",
          enTitle: "Maximum Flow with Dinic's Algorithm",
          category: "Lý thuyết luồng mạng",
          badge: "Vũ khí hạng nặng",
          interactiveType: "dinic",
          summary: "Tìm giá trị luồng cực đại và lát cắt hẹp nhất (Min Cut) trên mạng luồng. Thuật toán Dinic kết hợp BFS phân tầng và DFS tìm luồng chặn (blocking flow) trong O(V^2 * E).",
          intuition: `
            <h4>1. Định lý Max-Flow Min-Cut</h4>
            <p>Giá trị luồng cực đại chảy từ nguồn $S$ sang đích $T$ luôn <strong>bằng chính xác dung lượng của lát cắt nhỏ nhất</strong> ngăn cách $S$ và $T$. Điều này biến hàng loạt bài toán tưởng như không liên quan (như phân công công việc, chọn đồ vật có điều kiện phụ thuộc, chia nhóm) thành bài toán luồng!</p>
            <h4>2. Thuật toán Dinic vượt trội như thế nào?</h4>
            <p>Thay vì tìm từng đường tăng luồng đơn lẻ như Edmonds-Karp, Dinic dùng BFS để dựng đồ thị phân tầng (Level Graph), sau đó dùng DFS đẩy cùng lúc nhiều luồng để lấp đầy toàn bộ 'luồng chặn'. Trên đồ thị mạng đơn vị (Unit Network), Dinic chạy thần tốc trong $O(E \\sqrt{V})$!</p>
          `,
          complexity: {
            time: "O(V^2 * E) trường hợp tổng quát, O(E * sqrt(V)) trên đồ thị đơn vị (Bipartite Matching)",
            space: "O(V + E) lưu danh sách kề và cạnh đảo (Residual Graph)",
            analysis: "Trong thực tế thi đấu, Dinic chạy cực kỳ nhanh, giải quyết mạng 5000 đỉnh 30000 cạnh chỉ trong vài mili-giây.",
            limitGuideline: "Giải quyết các bài toán Cặp ghép cực đại (Max Bipartite Matching), Min Cut, và quy hoạch dự án có ràng buộc."
          },
          codeTemplate: `#include <bits/stdc++.h>
using namespace std;

struct Edge {
    int to;
    long long cap, flow;
    int rev; // Chi so cua canh dao nguoc trong danh sach ke
};

struct Dinic {
    int n, s, t;
    vector<vector<Edge>> adj;
    vector<int> level, ptr;

    Dinic(int n, int s, int t) : n(n), s(s), t(t), adj(n + 1), level(n + 1), ptr(n + 1) {}

    void add_edge(int from, int to, long long cap) {
        adj[from].push_back({to, cap, 0, (int)adj[to].size()});
        adj[to].push_back({from, 0, 0, (int)adj[from].size() - 1});
    }

    bool bfs() {
        fill(level.begin(), level.end(), -1);
        level[s] = 0;
        queue<int> q;
        q.push(s);
        while (!q.empty()) {
            int u = q.front(); q.pop();
            for (auto& edge : adj[u]) {
                if (edge.cap - edge.flow > 0 && level[edge.to] == -1) {
                    level[edge.to] = level[u] + 1;
                    q.push(edge.to);
                }
            }
        }
        return level[t] != -1;
    }

    long long dfs(int u, long long pushed) {
        if (pushed == 0 || u == t) return pushed;
        for (int& cid = ptr[u]; cid < adj[u].size(); ++cid) {
            auto& edge = adj[u][cid];
            int trg = edge.to;
            if (level[u] + 1 != level[trg] || edge.cap - edge.flow == 0) continue;
            long long push = dfs(trg, min(pushed, edge.cap - edge.flow));
            if (push == 0) continue;
            edge.flow += push;
            adj[trg][edge.rev].flow -= push;
            return push;
        }
        return 0;
    }

    long long max_flow() {
        long long flow = 0;
        while (bfs()) {
            fill(ptr.begin(), ptr.end(), 0);
            while (long long pushed = dfs(s, 1e18)) {
                flow += pushed;
            }
        }
        return flow;
    }
};

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    return 0;
}`,
          marisaLinks: [
            { id: 115, name: "Download Speed (Max Flow)", url: "https://marisaoj.com/problemset", diff: "★★★★☆", note: "Bài toán luồng cực đại chuẩn mực trên mạng" },
            { id: 116, name: "Police Chase (Min Cut)", url: "https://marisaoj.com/problemset", diff: "★★★★★", note: "Tìm tập cạnh nhỏ nhất để cắt đứt liên lạc giữa 1 và N" }
          ],
          coachTips: [
            "Con trỏ ptr[u] (Current Arc Optimization) trong hàm DFS là cốt lõi giúp Dinic đạt độ phức tạp O(V^2 E). Nếu không có con trỏ này mà duyệt lại từ đầu mỗi lần DFS, Dinic sẽ bị thoái hóa chạy chậm tương đương thuật toán cổ Ford-Fulkerson!",
            "Luôn nhớ thêm cạnh đảo có dung lượng 0: add_edge(u, v, cap) và add_edge(v, u, 0)."
          ]
        }
      ]
    },
    {
      id: "level-6",
      levelNum: 6,
      title: "Level 6: Đỉnh Cao Thuật Toán (Super Advanced)",
      enTitle: "Super Advanced / Elite Level",
      badge: "Huyền thoại (Elite)",
      icon: "fa-solid fa-crown",
      summary: "Những thuật toán tinh hoa của đấu trường quốc tế: Convex Hull Trick, Cây Li Chao, Centroid Decomposition trên cây, Biến đổi Fourier nhanh (FFT), Lý thuyết trò chơi Sprague-Grundy.",
      marisaRoadmapUrl: "https://marisaoj.com/roadmap/",
      topics: [
        {
          id: "cht-lichao",
          title: "Convex Hull Trick & Cây Li Chao (CHT & Li Chao Tree)",
          enTitle: "Convex Hull Trick & Li Chao Tree (DP Optimization)",
          category: "Tối ưu hoá quy hoạch động",
          badge: "Bí kíp HCV",
          interactiveType: "lichao",
          summary: "Tối ưu phương trình quy hoạch động dạng dp[i] = min(dp[j] + m[j] * x[i] + c[j]) từ O(N^2) xuống O(N log N) hoặc O(N) bằng cách biểu diễn thành các đường thẳng và tìm bao lồi dưới.",
          intuition: `
            <h4>1. Góc nhìn hình học hoá phương trình số học</h4>
            <p>Phương trình $dp[i] = \\min_{j < i} (m_j \\cdot x_i + c_j)$ có dạng chính xác là tìm giá trị nhỏ nhất trong số các đường thẳng $y = m_j \\cdot x + c_j$ tại hoành độ $x = x_i$!</p>
            <p>Trong mặt phẳng toạ độ, giao điểm của các đường thẳng này tạo thành một đường đa giác lồi (Lower Envelope). Thay vì duyệt qua toàn bộ $N$ đường thẳng cũ, ta chỉ cần duy trì các đoạn thẳng thuộc bao lồi dưới:</p>
            <ul>
              <li>Nếu hệ số góc $m_j$ và hoành độ $x_i$ đều tăng dần: Dùng Deque tối ưu trong $O(N)$ tổng cộng!</li>
              <li>Nếu hệ số góc hoặc truy vấn tuỳ ý: Dùng <strong>Cây Li Chao (Li Chao Tree)</strong> - Một biến thể Segment Tree lưu đường thẳng với code ngắn hơn 40 dòng!</li>
            </ul>
          `,
          complexity: {
            time: "Li Chao Tree: O(N log(Range)), CHT Deque: O(N)",
            space: "O(4 * Range) hoặc O(N log N) cho cây động",
            analysis: "Biến bài toán quy hoạch động 10^5 trạng thái từ 10^10 phép tính (100 giây) xuống còn 10^5 x 20 ≈ 2 x 10^6 phép tính (0.04s).",
            limitGuideline: "Dấu hiệu nhận biết: Đề bài yêu cầu tối ưu chi phí phân đoạn hoặc di chuyển mà hàm chi phí chứa tích chéo a[i] * b[j]."
          },
          codeTemplate: `#include <bits/stdc++.h>
using namespace std;

// Cau truc duong thang y = a*x + b
struct Line {
    long long a, b;
    long long eval(long long x) const {
        return a * x + b;
    }
};

const long long INF = 2e18;
const int MAXN = 200005;
Line tree[4 * MAXN];

// Chen duong thang moi vao cay Li Chao quan ly doan [l, r]
void insert(int node, int l, int r, Line newLine) {
    int mid = (l + r) / 2;
    bool left_better = newLine.eval(l) < tree[node].eval(l);
    bool mid_better = newLine.eval(mid) < tree[node].eval(mid);

    if (mid_better) swap(tree[node], newLine);

    if (l == r) return;

    if (left_better != mid_better)
        insert(2 * node, l, mid, newLine);
    else
        insert(2 * node + 1, mid + 1, r, newLine);
}

// Truy van gia tri y nho nhat tai hoanh do x
long long query(int node, int l, int r, long long x) {
    if (l == r) return tree[node].eval(x);
    int mid = (l + r) / 2;
    long long cur = tree[node].eval(x);
    if (x <= mid)
        return min(cur, query(2 * node, l, mid, x));
    else
        return min(cur, query(2 * node + 1, mid + 1, r, x));
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    return 0;
}`,
          marisaLinks: [
            { id: 120, name: "Frog 3 (Li Chao Tree)", url: "https://marisaoj.com/problemset", diff: "★★★★★", note: "Bài toán nhảy cóc với chi phí (h[i] - h[j])^2 + C" },
            { id: 121, name: "Convex Hull Trick Basics", url: "https://marisaoj.com/problemset", diff: "★★★★★", note: "Tối ưu hoá đường bao lồi chuẩn" }
          ],
          coachTips: [
            "Khởi tạo cây ban đầu với đường thẳng a = 0, b = INF để tránh trường hợp cây rỗng trả về rác.",
            "Nếu hoành độ x có thể lên tới 10^9 hoặc là số thực, hãy dùng Cây Li Chao cấp phát động (Dynamic Segment Tree) thay vì mảng tĩnh."
          ]
        },
        {
          id: "centroid-decomposition",
          title: "Phân Rã Trọng Tâm Cây (Centroid Decomposition)",
          enTitle: "Centroid Decomposition on Trees",
          category: "Thuật toán nâng cao trên cây",
          badge: "ICPC World Finals",
          interactiveType: "centroid",
          summary: "Kỹ thuật chia để trị trên cây: Luôn tìm đỉnh trọng tâm (Centroid) mà khi bỏ đi, mỗi cây con còn lại có kích thước không quá N/2. Xây dựng Cây trọng tâm có chiều cao tối đa log2(N).",
          intuition: `
            <h4>1. Bản chất chia để trị</h4>
            <p>Trên mảng, ta dễ dàng chia đôi mảng tại $Mid = N/2$. Nhưng trên một cái cây có hình dạng bất kỳ, làm sao để chia đều cây?</p>
            <p><strong>Định lý trọng tâm:</strong> Mọi cây luôn tồn tại ít nhất một đỉnh trọng tâm $C$ sao cho khi xoá $C$, không có cây con nào có kích thước vượt quá $\\lfloor N/2 \\rfloor$.</p>
            <p>Bằng cách đệ quy tìm trọng tâm của từng nhánh, ta thu được Cây trọng tâm (Centroid Tree) với độ sâu chỉ vỏn vẹn $O(\\log N)$. Mọi đường đi giữa hai đỉnh bất kỳ trên cây ban đầu đều đi qua đúng một tổ tiên chung trên Cây trọng tâm!</p>
          `,
          complexity: {
            time: "O(N log N) hoac O(N log^2 N)",
            space: "O(N) luu cay trong tam",
            analysis: "Chiều cao của cây chỉ là log2(N) <= 18. Giải quyết trọn vẹn các bài toán đường đi trên cây kích thước 200,000 trong 0.3s.",
            limitGuideline: "Giải quyết bài toán: Đếm số cặp đỉnh (u, v) trên cây có khoảng cách đúng bằng K hoặc có trọng số thoả mãn điều kiện phức tạp."
          },
          codeTemplate: `#include <bits/stdc++.h>
using namespace std;

const int MAXN = 200005;
vector<int> adj[MAXN];
int sz[MAXN];
bool removed_centroid[MAXN];

// Tinh kich thuoc cua cay con
void get_sz(int u, int p) {
    sz[u] = 1;
    for (int v : adj[u]) {
        if (v != p && !removed_centroid[v]) {
            get_sz(v, u);
            sz[u] += sz[v];
        }
    }
}

// Tim dinh trong tam cua cay con hien tai
int get_centroid(int u, int p, int total) {
    for (int v : adj[u]) {
        if (v != p && !removed_centroid[v] && sz[v] > total / 2) {
            return get_centroid(v, u, total);
        }
    }
    return u;
}

// De quy phan ra trong tam
void decompose(int u) {
    get_sz(u, -1);
    int c = get_centroid(u, -1, sz[u]);

    // Danh dau trong tam c da duoc xu ly
    removed_centroid[c] = true;

    // Xu ly tat ca cac duong di di qua trong tam c o day...

    for (int v : adj[c]) {
        if (!removed_centroid[v]) {
            decompose(v);
        }
    }
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    return 0;
}`,
          marisaLinks: [
            { id: 125, name: "Fixed-Length Paths I", url: "https://marisaoj.com/problemset", diff: "★★★★★", note: "Đếm số đường đi có độ dài đúng K trên cây" },
            { id: 126, name: "Centroid Tree Decomposition", url: "https://marisaoj.com/problemset", diff: "★★★★★", note: "Cài đặt phân rã trọng tâm chuẩn" }
          ],
          coachTips: [
            "Luôn kiểm tra điều kiện '!removed_centroid[v]' trong TẤT CẢ các hàm DFS phụ trợ. Quên điều này sẽ khiến thuật toán duyệt tràn ra ngoài phạm vi cây con hiện tại gây TLE hoặc đệ quy vô hạn.",
            "Để đếm số cặp đường đi đi qua trọng tâm C, hãy nhớ loại trừ các cặp cùng xuất phát từ một nhánh con trực tiếp của C."
          ]
        },
        {
          id: "fft-polynomial",
          title: "Biến Đổi Fourier Nhanh (Fast Fourier Transform - FFT / NTT)",
          enTitle: "Fast Fourier Transform & Number Theoretic Transform",
          category: "Toán học & Xử lý đa thức",
          badge: "Siêu toán học",
          interactiveType: "fft",
          summary: "Nhân hai đa thức bậc N trong O(N log N) thay vì O(N^2) bằng cách chuyển từ biểu diễn hệ số sang biểu diễn giá trị tại các căn nguyên thuỷ của đơn vị và ngược lại.",
          intuition: `
            <h4>1. Ý tưởng cốt lõi của Fourier</h4>
            <p>Nhân hai đa thức bậc $N$ theo cách thông thường tốn $O(N^2)$. Nhưng một đa thức bậc $N$ được xác định duy nhất bởi giá trị của nó tại $N+1$ điểm phân biệt!</p>
            <p>Nếu ta có giá trị của $A(x)$ và $B(x)$ tại các điểm $x_0, x_1, \\dots, x_N$, thì giá trị của đa thức tích $C(x) = A(x) \\times B(x)$ tại điểm $x_i$ chỉ đơn giản là $A(x_i) \\times B(x_i)$ (tính trong $O(1)$)!</p>
            <p>Bí quyết của FFT là chọn các điểm $x_i$ đặc biệt: <strong>Các căn bậc $N$ của đơn vị trên mặt phẳng số phức ($e^{i 2\\pi / N}$)</strong>. Cấu trúc đối xứng này cho phép chia để trị chuyển đổi chỉ trong $O(N \\log N)$. Với số học nguyên tử, ta thay số phức bằng căn nguyên thuỷ modulo $998244353$ (NTT)!</p>
          `,
          complexity: {
            time: "O(N log N) cho phep nhan hai da thuc bac N",
            space: "O(N) mang so phuc std::complex hoac so nguyen",
            analysis: "N = 2^18 ≈ 2.6 x 10^5: Chạy chỉ mất ~0.08 giây, giải quyết bài toán nhân hai số có hàng triệu chữ số trong chớp mắt.",
            limitGuideline: "Dùng để giải các bài toán nhân số nguyên khổng lồ, bài toán so khớp xâu có ký tự đại diện (wildcard), hoặc đếm số nghiệm a + b = c."
          },
          codeTemplate: `#include <bits/stdc++.h>
using namespace std;

using cd = complex<double>;
const double PI = acos(-1);

// Ham FFT Cooley-Tukey bien doi he so <-> gia tri
void fft(vector<cd>& a, bool invert) {
    int n = a.size();
    for (int i = 1, j = 0; i < n; i++) {
        int bit = n >> 1;
        for (; j & bit; bit >>= 1) j ^= bit;
        j ^= bit;
        if (i < j) swap(a[i], a[j]);
    }

    for (int len = 2; len <= n; len <<= 1) {
        double ang = 2 * PI / len * (invert ? -1 : 1);
        cd wlen(cos(ang), sin(ang));
        for (int i = 0; i < n; i += len) {
            cd w(1);
            for (int j = 0; j < len / 2; j++) {
                cd u = a[i + j], v = a[i + j + len / 2] * w;
                a[i + j] = u + v;
                a[i + j + len / 2] = u - v;
                w *= wlen;
            }
        }
    }
    if (invert) {
        for (cd& x : a) x /= n;
    }
}

// Nhan hai da thuc a va b
vector<long long> multiply(const vector<int>& a, const vector<int>& b) {
    vector<cd> fa(a.begin(), a.end()), fb(b.begin(), b.end());
    int n = 1;
    while (n < a.size() + b.size()) n <<= 1;
    fa.resize(n); fb.resize(n);

    fft(fa, false);
    fft(fb, false);
    for (int i = 0; i < n; i++) fa[i] *= fb[i];
    fft(fa, true);

    vector<long long> result(n);
    for (int i = 0; i < n; i++) result[i] = round(fa[i].real());
    return result;
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    return 0;
}`,
          marisaLinks: [
            { id: 130, name: "Fast Polynomial Multiplication", url: "https://marisaoj.com/problemset", diff: "★★★★★", note: "Nhân hai đa thức bậc cao" },
            { id: 131, name: "Signal Processing & String Matching", url: "https://marisaoj.com/problemset", diff: "★★★★★", note: "Khớp xâu ký tự đại diện bằng FFT" }
          ],
          coachTips: [
            "Khi dùng FFT số thực std::complex, chú ý sai số dấu phẩy động (Precision Error). Luôn làm tròn bằng round(x.real()) và kiểm tra nếu kết quả phải nằm trong khoảng nguyên.",
            "Nếu đề bài yêu cầu đáp án modulo 998244353 (một số nguyên tố đặc biệt có dạng c * 2^k + 1), BẮT BUỘC dùng NTT (Number Theoretic Transform) thay cho FFT để chuẩn xác 100% không lo sai số thực."
          ]
        }
      ]
    },
    {
      id: "level-100",
      levelNum: 100,
      title: "Level 100: Đấu Trường Cọ Xát & Kỳ Thi Thực Chiến",
      enTitle: "Competitions & Real Contest Archives",
      badge: "Võ đài ICPC / HSGQG",
      icon: "fa-solid fa-trophy",
      summary: "Tổng hợp các bộ đề thi thử, đề thi chính thức của Kỳ thi Học sinh giỏi Quốc gia (VOI), ICPC Vietnam National & Regional, và các giải đấu danh giá trên MarisaOJ.",
      marisaRoadmapUrl: "https://marisaoj.com/roadmap/",
      topics: [
        {
          id: "voi-archive",
          title: "Bộ Đề Thi HSG Quốc Gia (VOI Archive)",
          enTitle: "Vietnam Olympiad in Informatics (VOI)",
          category: "Kỳ thi Quốc gia",
          badge: "Đặc quyền HSG",
          interactiveType: "contest-strategy",
          summary: "Bộ sưu tập các đề thi chọn học sinh giỏi quốc gia qua các năm. Đòi hỏi kỹ năng nhận diện kết hợp nhiều thuật toán, phân tích subtask và tối ưu thời gian/bộ nhớ.",
          intuition: `
            <h4>1. Chiến lược làm bài thi VOI (Subtask Strategy)</h4>
            <p>Khác với kỳ thi ICPC chấm theo kiểu đúng tất cả test mới có điểm, kỳ thi VOI chấm theo từng <strong>Subtask</strong>. Một thí sinh đạt giải cao không phải là người giải trọn vẹn 100% bài khó, mà là người vét trọn vẹn từng điểm của các subtask nhỏ!</p>
            <div class="pedagogy-callout">
              <i class="fa-solid fa-chess-knight"></i>
              <div>
                <strong>Chiến thuật 3 bước thi đấu VOI:</strong>
                <ol>
                  <li><strong>Dành 30 phút đầu đọc cả 3 bài:</strong> Đánh giá mức độ dễ/khó, không được cắm đầu code bài 1 ngay.</li>
                  <li><strong>Vét trọn điểm subtask cơ bản (60% tổng điểm):</strong> Viết thuật toán trâu (Brute-force $O(N^2)$, $O(2^N)$) chắc chắn đúng 100% cho các subtask nhỏ.</li>
                  <li><strong>Lập trình đối chiếu (Stress Testing):</strong> Dùng code trâu để sinh test ngẫu nhiên kiểm tra chéo với code thuật toán tối ưu trước khi nộp.</li>
                </ol>
              </div>
            </div>
          `,
          complexity: {
            time: "Từ O(N) đến O(2^N) tuỳ theo từng Subtask cụ thể",
            space: "Giới hạn nghiêm ngặt 512MB - 1024MB",
            analysis: "Mỗi subtask có ràng buộc N khác nhau, ví dụ Subtask 1: N <= 20, Subtask 2: N <= 2000, Subtask 3: N <= 200,000.",
            limitGuideline: "Mục tiêu: Đạt 100% điểm các subtask 1 và 2, sau đó tối ưu subtask 3."
          },
          codeTemplate: `#include <bits/stdc++.h>
using namespace std;

// Khung code chuan chia Subtask trong ky thi VOI
int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int n, q;
    if (!(cin >> n >> q)) return 0;

    // Subtask 1: N, Q <= 1000 -> Dung thuat toan O(N^2) chac chan dung
    if (n <= 1000 && q <= 1000) {
        // Code vet can subtask 1...
        return 0;
    }

    // Subtask 2 & 3: Thuat toan toi uu O((N + Q) log N) bang Segment Tree
    // Code Segment Tree hoac Quy hoach dong...
    return 0;
}`,
          marisaLinks: [
            { id: 140, name: "VOI 2022 - Đua Xe (Race)", url: "https://marisaoj.com/problemset", diff: "★★★★☆", note: "Đề thi chính thức VOI 2022" },
            { id: 141, name: "VOI 2021 - Dãy Số Kỳ Ảo", url: "https://marisaoj.com/problemset", diff: "★★★★☆", note: "Đề thi chính thức VOI 2021" },
            { id: 142, name: "VOI 2020 - Cây Cảnh", url: "https://marisaoj.com/problemset", diff: "★★★★★", note: "Xử lý đồ thị cây và quy hoạch động" }
          ],
          coachTips: [
            "Đừng bao giờ để bài trắng! Viết code sinh nghiệm ngẫu nhiên hoặc xuất một đáp án mặc định (như 0 hoặc -1) đôi khi vẫn ăn được 1-2 test lẻ trong barem.",
            "Hãy luôn tạo bộ sinh test ngẫu nhiên và script bash so sánh để tìm ra phản ví dụ (Counter-example) trong phòng thi."
          ]
        },
        {
          id: "icpc-regional",
          title: "Đề Thi ICPC National & Regional Asia",
          enTitle: "ICPC Regional & World Finals Preparation",
          category: "Lập trình đối kháng đồng đội",
          badge: "Đấu trường Quốc tế",
          interactiveType: "icpc-team",
          summary: "Quy chuẩn thi đấu đồng đội 3 người 1 máy tính trong 5 tiếng. Kỹ thuật chia bài, gỡ lỗi trên giấy, quản lý thời gian và chiến lược giành bóng (Balloon Hunting).",
          intuition: `
            <h4>1. Tinh thần đồng đội & Chiến thuật 1 máy tính</h4>
            <p>Trong ICPC, 3 lập trình viên chỉ dùng chung duy nhất một chiếc máy tính. Vì vậy, <strong>người ngồi gõ code không phải là người duy nhất giải bài</strong>!</p>
            <ul>
              <li><strong>Giai đoạn 30 phút đầu:</strong> Quét nhanh bảng đề (12-14 bài). Tìm bài 'First to Solve' (bài dễ nhất mà các đội khác đã có bóng) để mở màn giải toả tâm lý.</li>
              <li><strong>Lập trình ngoài giấy (Dry-run):</strong> Chỉ được ngồi vào máy tính khi đã viết ra giấy toàn bộ logic, công thức toán và các biến quan trọng.</li>
              <li><strong>Phạt thời gian (Penalty):</strong> Mỗi lần nộp sai (Wrong Answer) bị phạt cộng thêm 20 phút. Phải kiểm tra cực kỳ kỹ các biên đặc biệt (Edge Cases: N=1, số âm, giá trị cực đại) trước khi bấm nộp!</li>
            </ul>
          `,
          complexity: {
            time: "1 giây / 2 giây cho toàn bộ các test",
            space: "Bộ nhớ tiêu chuẩn 256MB",
            analysis: "Mỗi bài chỉ có 2 trạng thái: Accepted (1 điểm) hoặc Không có điểm.",
            limitGuideline: "Chiến thắng dựa trên số lượng bài giải được nhiều nhất, nếu bằng nhau thì so thời gian Penalty ít hơn."
          },
          codeTemplate: `#include <bits/stdc++.h>
using namespace std;

// Template chuan cho doi tuyen ICPC
void solve(int tc) {
    int n;
    cin >> n;
    // Xu ly tung bo test
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int test_cases = 1;
    // Neu de bai co nhieu test case
    if (cin >> test_cases) {
        for (int t = 1; t <= test_cases; ++t) {
            solve(t);
        }
    }
    return 0;
}`,
          marisaLinks: [
            { id: 150, name: "ICPC Vietnam National - Problem A", url: "https://marisaoj.com/problemset", diff: "★★★☆☆", note: "Bài mở màn khởi động" },
            { id: 151, name: "ICPC Asia Regional - Geometry & Flow", url: "https://marisaoj.com/problemset", diff: "★★★★★", note: "Bài thi phân loại huy chương" }
          ],
          coachTips: [
            "Khi bị WA hoặc TLE, hãy in code ra giấy và NHƯỜNG MÁY TÍNH cho đồng đội code bài tiếp theo, sau đó ngồi soi bug trên giấy.",
            "Hãy chuẩn bị sẵn quyển 'Team Reference Document' (Notebook 25 trang) chứa đầy đủ template code C++ đã được kiểm chứng chuẩn xác."
          ]
        }
      ]
    }
  ]
};
