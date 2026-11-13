/**
 * MarisaOJ ICPC Roadmap Data Hub
 * Cung cấp dữ liệu chuẩn mực về 8 cấp độ (Level 0 - Level 6, Level 100)
 * Biên soạn bởi Kỹ sư phần mềm giáo dục & Huấn luyện viên Lập trình thi đấu (ICPC Coach)
 */

const MARISA_ROADMAP_DATA = [
  {
    id: "level-0",
    levelNumber: 0,
    title: "Level 0: Getting Started",
    vietnameseTitle: "Nhập Môn Lập Trình & Cú Pháp Chuẩn",
    tagline: "Xây nền móng tư duy lập trình cấu trúc và làm chủ I/O tốc độ cao",
    targetAudience: "Học sinh/sinh viên mới bắt đầu, rèn luyện tư duy biến - vòng lặp - mảng",
    estimatedTime: "25 - 35 giờ",
    difficultyStars: 1,
    accentColor: "#4A78C2",
    marisaUrl: "https://marisaoj.com/roadmap",
    description: "Cấp độ nền tảng đầu tiên tại MarisaOJ. Mục tiêu là chuyển hóa ngôn ngữ tự nhiên thành mã lệnh chính xác, thành thạo các cấu trúc dữ liệu nguyên thủy (Primitive Types), vòng lặp lồng nhau và xử lý mảng/chuỗi cơ bản.",
    topics: [
      {
        id: "fast-io-cond",
        title: "Nhập/Xuất Tốc Độ Cao & Rẽ Nhánh Điều Kiện",
        category: "Cú pháp cơ bản",
        difficulty: 1,
        shortDesc: "Tối ưu hóa cin/cout trong C++ và xử lý điều kiện if/else lồng nhau.",
        intuition: `Trong lập trình thi đấu (Competitive Programming - CP), giới hạn thời gian (Time Limit - TL) thường là 1.0s cho khoảng 10^8 phép tính. Lệnh 'std::cin' và 'std::cout' mặc định đồng bộ với 'stdio' của C, dẫn đến tốc độ rất chậm khi dữ liệu vào/ra lên đến 10^5 - 10^6 dòng.
Bằng cách thêm dòng lệnh thần chú:
  ios_base::sync_with_stdio(false);
  cin.tie(NULL);
chúng ta ngắt kết nối đồng bộ và giải phóng bộ đệm (buffer), giúp cin/cout nhanh ngang ngửa 'scanf/printf'.
Đối với rẽ nhánh (if/else/switch), nguyên tắc sư phạm cốt lõi là: Luôn kiểm tra điều kiện loại trừ sớm (Early Return) để giảm độ sâu lồng nhau của code, tránh lỗi 'Dangling Else' và xử lý cẩn thận các trường hợp biên như số 0, số âm và số vượt giới hạn int32.`,
        timeComplexity: "$\\mathcal{O}(1)$ cho mỗi phép kiểm tra điều kiện; $\\mathcal{O}(N)$ cho I/O $N$ phần tử với buffer tối ưu.",
        spaceComplexity: "$\\mathcal{O}(1)$ bộ nhớ phụ trợ.",
        pitfalls: [
          "Dùng 'std::endl' thay vì '\\n': 'endl' ép xả bộ đệm (flush buffer) liên tục khiến chương trình bị Time Limit Exceeded (TLE).",
          "So sánh số thực: Không bao giờ dùng 'a == b' với float/double; phải dùng 'fabs(a - b) < 1e-9'.",
          "Tràn số nguyên (Integer Overflow): Với giá trị $> 2 \\times 10^9$, bắt buộc dùng 'long long' (64-bit int)."
        ],
        cppTemplate: `#include <iostream>
#include <iomanip>

using namespace std;

void solve() {
    long long a, b;
    if (!(cin >> a >> b)) return;
    
    // Tối ưu xử lý điều kiện: Kiểm tra trường hợp biên trước
    if (b == 0) {
        cout << "INVALID_DIVISION\\n";
        return;
    }
    
    long long quotient = a / b;
    long long remainder = a % b;
    cout << quotient << " " << remainder << "\\n";
}

int main() {
    // Tối ưu I/O bắt buộc trong mọi bài thi ICPC
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    
    solve();
    return 0;
}`,
        marisaUrl: "https://marisaoj.com/roadmap",
        marisaProblems: [
          { code: "1", name: "A + B", difficulty: "Rất dễ", link: "https://marisaoj.com/problem/1" },
          { code: "2", name: "Phương trình bậc nhất", difficulty: "Dễ", link: "https://marisaoj.com/problem/2" }
        ],
        icpcTips: "Trong mọi contest ICPC hoặc kỳ thi HSG, luôn gõ sẵn đoạn mã Fast I/O ngay dòng đầu tiên của hàm main() để tránh mất điểm oan do TLE."
      },
      {
        id: "loops-control",
        title: "Vòng Lặp For/While & Kỹ Thuật Lặp Lồng Nhau",
        category: "Cấu trúc lặp",
        difficulty: 1,
        shortDesc: "Vét các trạng thái đơn giản, kiểm soát biến đếm và tránh vòng lặp vô tận.",
        intuition: `Vòng lặp là trái tim của mọi giải thuật máy tính: tự động hóa hàng triệu phép tính giống nhau.
- 'for': Sử dụng khi biết trước số bước lặp (hoặc duyệt theo khoảng xác định).
- 'while': Sử dụng khi số bước phụ thuộc vào một điều kiện trạng thái (chẳng hạn thuật toán Euclid tìm GCD, biến đổi số học cho đến khi n = 0).
- Kỹ thuật vòng lặp lồng nhau (Nested loops): Cho phép duyệt qua không gian 2 chiều (bảng ô vuông, ma trận) hoặc sinh các cặp (i, j). Tuy nhiên số vòng lặp lồng nhau quyết định bậc đa thức độ phức tạp: 1 vòng là O(N), 2 vòng là O(N^2), 3 vòng là O(N^3).`,
        timeComplexity: "$\\mathcal{O}(N)$ cho 1 vòng lặp; $\\mathcal{O}(N \\times M)$ cho 2 vòng lặp lồng nhau.",
        spaceComplexity: "$\\mathcal{O}(1)$ biến đếm.",
        pitfalls: [
          "Điều kiện dừng sai trong while gây vòng lặp vô hạn (Infinite Loop -> TLE).",
          "Biến đếm bị thay đổi ngoài ý muốn bên trong thân vòng lặp.",
          "Off-by-one: Lẫn lộn giữa '<' và '<=', duyệt thiếu hoặc thừa 1 phần tử biên."
        ],
        cppTemplate: `#include <iostream>

using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    
    int n;
    if (cin >> n) {
        long long sum = 0;
        // Duyệt tuyến tính tính tổng từ 1 đến n
        for (int i = 1; i <= n; ++i) {
            sum += i;
        }
        cout << sum << "\\n";
    }
    return 0;
}`,
        marisaUrl: "https://marisaoj.com/roadmap",
        marisaProblems: [
          { code: "5", name: "Tính tổng dãy số", difficulty: "Dễ", link: "https://marisaoj.com/problem/5" }
        ],
        icpcTips: "Với công thức toán học như 1+2+...+n = n*(n+1)/2, hãy dùng công thức O(1) thay vì lặp O(N) khi n lên đến 10^9."
      },
      {
        id: "arrays-frequency",
        title: "Mảng 1 Chiều & Mảng Đếm Phân Phối (Frequency Array)",
        category: "Mảng & Dữ liệu tuyến tính",
        difficulty: 1,
        shortDesc: "Lưu trữ dữ liệu liên tục và kỹ thuật đếm số lần xuất hiện với độ phức tạp O(1).",
        intuition: `Mảng là cấu trúc dữ liệu lưu trữ các phần tử cùng kiểu dữ liệu tại các ô nhớ kế tiếp nhau, cho phép truy xuất ngẫu nhiên qua chỉ số (Index) với độ phức tạp tuyệt đối O(1).
Kỹ thuật mảng đếm tần số (Frequency Array / Counting):
Thay vì mỗi lần muốn biết 'x' xuất hiện bao nhiêu lần ta phải duyệt lại cả mảng (mất O(N)), ta khởi tạo một mảng 'cnt[x]' lưu số lần xuất hiện của giá trị 'x'. Khi gặp phần tử 'v', chỉ cần thực hiện 'cnt[v]++'.
Điều này chuyển đổi phép tìm kiếm từ O(N) về O(1), đánh đổi bộ nhớ (Space) lấy thời gian (Time) - một nguyên lý kinh điển trong ICPC.`,
        timeComplexity: "O(N) để xây dựng mảng đếm; O(1) cho mỗi truy vấn tần số.",
        spaceComplexity: "O(MAX_VAL) cho mảng đếm (thường dùng khi giá trị <= 10^6).",
        pitfalls: [
          "Mảng cục bộ (Local Array) trong hàm bị Stack Overflow nếu kích thước > 10^5. Luôn khai báo mảng lớn ở phạm vi toàn cục (Global) hoặc dùng 'std::vector'.",
          "Chỉ số âm: Nếu phần tử có thể âm, phải tịnh tiến chỉ số (Index Shifting: 'cnt[v + OFFSET]').",
          "Truy cập vượt quá chỉ số (Out of Bounds) dẫn đến Runtime Error (RE) hoặc Undefined Behavior."
        ],
        cppTemplate: `#include <iostream>
#include <vector>

using namespace std;

const int MAX_VAL = 1000000;
int cnt[MAX_VAL + 5]; // Khai báo toàn cục, tự động khởi tạo bằng 0

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    
    int n;
    if (!(cin >> n)) return 0;
    
    vector<int> a(n);
    for (int i = 0; i < n; ++i) {
        cin >> a[i];
        if (a[i] >= 0 && a[i] <= MAX_VAL) {
            cnt[a[i]]++; // Tăng tần số xuất hiện O(1)
        }
    }
    
    // Tìm phần tử xuất hiện nhiều nhất
    int maxFreq = 0, bestVal = -1;
    for (int v = 0; v <= MAX_VAL; ++v) {
        if (cnt[v] > maxFreq) {
            maxFreq = cnt[v];
            bestVal = v;
        }
    }
    
    cout << bestVal << " " << maxFreq << "\\n";
    return 0;
}`,
        marisaUrl: "https://marisaoj.com/roadmap",
        marisaProblems: [
          { code: "10", name: "Đếm số lần xuất hiện", difficulty: "Dễ", link: "https://marisaoj.com/problem/10" }
        ],
        icpcTips: "Nếu giá trị mảng lên đến 10^9, mảng đếm sẽ tràn RAM; khi đó hãy chuyển sang kỹ thuật Rời rạc hóa (Coordinate Compression) hoặc dùng 'std::map/unordered_map'."
      },
      {
        id: "matrix-2d",
        title: "Ma Trận & Kỹ Thuật Duyệt Lưới 2 Chiều",
        category: "Ma trận & Lưới",
        difficulty: 1,
        shortDesc: "Biểu diễn bảng ô vuông, tọa độ (r, c) và mảng hướng di chuyển (dx, dy).",
        intuition: `Ma trận kích thước N x M tương đương một lưới tọa độ gồm N hàng và M cột.
Trong các bài toán đường đi trên mê cung hoặc bảng cờ vua, kỹ thuật kinh điển nhất của ICPC là sử dụng mảng hướng:
  const int dx[] = {-1, 1, 0, 0};
  const int dy[] = {0, 0, -1, 1};
Thay vì viết 4 câu lệnh 'if' dài dòng để kiểm tra 4 hướng (Lên, Xuống, Trái, Phải), ta chỉ cần một vòng lặp 4 bước:
  int new_r = r + dx[k];
  int new_c = c + dy[k];
Cách cài đặt này giúp code ngắn gọn, không bị sót hướng và dễ mở rộng sang 8 hướng (kèm đường chéo).`,
        timeComplexity: "O(N * M) để duyệt toàn bộ ma trận.",
        spaceComplexity: "O(N * M) lưu trữ ma trận trong bộ nhớ.",
        pitfalls: [
          "Nhầm lẫn chỉ số hàng và cột (Row-major vs Column-major): 'a[row][col]'.",
          "Quên hàm kiểm tra tọa độ hợp lệ 'isValid(r, c)' dẫn đến truy cập ngoài mảng.",
          "Thứ tự duyệt lồng nhau: Luôn duyệt vòng ngoài theo hàng (i), vòng trong theo cột (j) để tối ưu Cache CPU (Spatial Locality)."
        ],
        cppTemplate: `#include <iostream>
#include <vector>

using namespace std;

// 4 hướng di chuyển: Trên, Dưới, Trái, Phải
const int dx[4] = {-1, 1, 0, 0};
const int dy[4] = {0, 0, -1, 1};

bool isValid(int r, int c, int n, int m) {
    return (r >= 0 && r < n && c >= 0 && c < m);
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    
    int n, m;
    if (!(cin >> n >> m)) return 0;
    
    vector<vector<int>> grid(n, vector<int>(m));
    for (int i = 0; i < n; ++i) {
        for (int j = 0; j < m; ++j) {
            cin >> grid[i][j];
        }
    }
    
    cout << "Loaded grid size: " << n << " x " << m << "\\n";
    return 0;
}`,
        marisaUrl: "https://marisaoj.com/roadmap",
        marisaProblems: [
          { code: "15", name: "Duyệt ma trận", difficulty: "Dễ", link: "https://marisaoj.com/problem/15" }
        ],
        icpcTips: "C++ lưu trữ mảng 2 chiều dạng Row-Major. Duyệt 'for(i) for(j) a[i][j]' nhanh gấp nhiều lần 'for(j) for(i) a[i][j]' do cache line hits."
      },
      {
        id: "strings-basic",
        title: "Xử Lý Chuỗi Ký Tự Cơ Bản (std::string)",
        category: "Chuỗi ký tự",
        difficulty: 1,
        shortDesc: "Thao tác trên xâu, đảo xâu, kiểm tra đối xứng (Palindrome) và phân tích ký tự.",
        intuition: `Chuỗi ký tự là mảng các ký tự (characters) kết thúc bằng ký tự null ('\\0'). Trong C++, 'std::string' hỗ trợ quản lý bộ nhớ động và cung cấp nhiều tiện ích mạnh mẽ như '.length()', '.substr()', toán tử cộng chuỗi '+'.
Bản chất của các thuật toán sơ cấp trên chuỗi:
1. Đảo ngược xâu: Dùng hai chỉ số chạy từ 2 đầu dồn vào giữa (Two Pointers cơ bản).
2. Kiểm tra xâu đối xứng (Palindrome): So sánh 's[i]' và 's[n - 1 - i]'. Nếu tìm thấy 1 cặp khác nhau thì không phải đối xứng.`,
        timeComplexity: "O(|S|) cho duyệt xâu, O(|S|) cho đảo chuỗi hoặc kiểm tra đối xứng.",
        spaceComplexity: "O(|S|) lưu trữ chuỗi.",
        pitfalls: [
          "Dùng 'cin >> s' sẽ dừng lại ngay khi gặp dấu cách. Nếu muốn đọc cả dòng văn bản chứa khoảng trắng, phải dùng 'getline(cin, s)'.",
          "Cẩn thận khi kết hợp 'cin >> n' trước 'getline': Phải có 'cin.ignore()' để loại bỏ ký tự xuống dòng thừa trong bộ đệm.",
          "Phép cộng chuỗi trong vòng lặp 's = s + ch' tạo bản sao mới mất O(|S|), dẫn đến O(|S|^2). Hãy dùng 's.push_back(ch)' hoặc 's += ch' để đạt O(1) amortized."
        ],
        cppTemplate: `#include <iostream>
#include <string>
#include <algorithm>

using namespace std;

bool isPalindrome(const string &s) {
    int left = 0, right = (int)s.length() - 1;
    while (left < right) {
        if (s[left] != s[right]) return false;
        left++;
        right--;
    }
    return true;
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    
    string s;
    if (cin >> s) {
        if (isPalindrome(s)) {
            cout << "YES\\n";
        } else {
            cout << "NO\\n";
        }
    }
    return 0;
}`,
        marisaUrl: "https://marisaoj.com/roadmap",
        marisaProblems: [
          { code: "20", name: "Xâu đối xứng", difficulty: "Dễ", link: "https://marisaoj.com/problem/20" }
        ],
        icpcTips: "Khi truyền chuỗi vào hàm, luôn dùng tham chiếu hằng 'const string &s' để tránh copy toàn bộ xâu gây chậm chương trình."
      }
    ]
  },
  {
    id: "level-1",
    levelNumber: 1,
    title: "Level 1: Simple Algorithms & Techniques",
    vietnameseTitle: "Thuật Toán & Kỹ Thuật Cơ Bản",
    tagline: "Làm chủ Vét cạn toàn phần, Mảng cộng dồn và Thuật toán Sắp xếp",
    targetAudience: "Học sinh chuyên Tin lớp 10, sinh viên bắt đầu luyện thi ICPC vòng trường",
    estimatedTime: "30 - 45 giờ",
    difficultyStars: 2,
    accentColor: "#3F6CB3",
    marisaUrl: "https://marisaoj.com/roadmap",
    description: "Chuyển từ việc lập trình thuần túy sang áp dụng các thuật toán giải quyết vấn đề. Nắm vững kỹ thuật tiền xử lý (Preprocessing) với Mảng cộng dồn và kỹ thuật thử-sai có hệ thống (Backtracking/Complete Search).",
    topics: [
      {
        id: "complete-search",
        title: "Vét Cạn Toàn Phần (Complete Search / Brute-force)",
        category: "Kỹ thuật tìm kiếm",
        difficulty: 2,
        shortDesc: "Duyệt qua toàn bộ không gian nghiệm khả dĩ để tìm đáp án tối ưu.",
        intuition: `Khi không gian trạng thái đủ nhỏ (ví dụ N <= 20 với hoán vị hoặc tập con), thuật toán vét cạn là lựa chọn thông minh và an toàn nhất trong phòng thi vì không bao giờ bị sai logic như các thuật toán tham lam vội vã.
Hai dạng vét cạn phổ biến nhất:
1. Sinh mọi tập con: Kích thước 2^N (thường dùng khi N <= 20).
2. Sinh mọi hoán vị: Kích thước N! (thường dùng hàm 'std::next_permutation' khi N <= 10).
Tư duy ICPC: 'Nếu N nhỏ, hãy vét cạn ngay lập tức và chuyển sang bài tiếp theo, không mất thời gian suy nghĩ thuật toán phức tạp'.`,
        timeComplexity: "O(2^N) cho tập con, O(N! * N) cho sinh hoán vị.",
        spaceComplexity: "O(N) lưu trạng thái hiện tại.",
        pitfalls: [
          "Dùng 'next_permutation' mà quên sắp xếp mảng tăng dần trước đó khiến bị sót cấu hình.",
          "Không ước lượng trước số lượng phép tính: 11! ~ 4*10^7 (vừa đủ 1s), nhưng 12! ~ 4.8*10^8 (chắc chắn TLE)."
        ],
        cppTemplate: `#include <iostream>
#include <vector>
#include <algorithm>
#include <numeric>

using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    
    int n;
    if (!(cin >> n)) return 0;
    
    vector<int> p(n);
    iota(p.begin(), p.end(), 1); // Khởi tạo 1, 2, ..., n
    
    // Sinh tất cả hoán vị theo thứ tự từ điển
    do {
        for (int i = 0; i < n; ++i) {
            cout << p[i] << (i == n - 1 ? "" : " ");
        }
        cout << "\\n";
    } while (next_permutation(p.begin(), p.end()));
    
    return 0;
}`,
        marisaUrl: "https://marisaoj.com/roadmap",
        marisaProblems: [
          { code: "35", name: "Sinh hoán vị", difficulty: "Cơ bản", link: "https://marisaoj.com/problem/35" }
        ],
        icpcTips: "Đừng đánh giá thấp Brute-force: Rất nhiều bài Subtask 1 hoặc 2 trong kỳ thi HSG Quốc Gia và ICPC có điểm số đáng kể nếu bạn làm trọn vẹn bằng vét cạn."
      },
      {
        id: "recursion-backtracking",
        title: "Đệ Quy & Thuật Toán Quay Lui (Backtracking)",
        category: "Kỹ thuật tìm kiếm",
        difficulty: 2,
        shortDesc: "Xây dựng nghiệm từng bước và quay lui khi phát hiện hướng đi không khả thi.",
        intuition: `Quay lui (Backtracking) là một chiến lược tìm kiếm có chiều sâu (DFS trên cây không gian trạng thái).
Mô hình chuẩn 3 bước:
1. Thử (Try): Đặt một lựa chọn tại bước hiện tại.
2. Đi tiếp (Recurse): Đệ quy giải bài toán con ở bước tiếp theo.
3. Rút lại (Backtrack): Hủy bỏ lựa chọn vừa rồi để phục hồi trạng thái cũ, sẵn sàng thử lựa chọn khác.
Nhờ kỹ thuật 'Tỉa nhánh' (Pruning) - nếu phát hiện trạng thái hiện tại chắc chắn không thể dẫn tới nghiệm tốt hơn nghiệm tốt nhất đã biết, ta lập tức cắt tỉa nhánh đó, giúp giảm thời gian chạy từ hàm mũ sang chấp nhận được.`,
        timeComplexity: "O(K^N) trong trường hợp xấu nhất, nhưng nhanh hơn nhiều nhờ tỉa nhánh.",
        spaceComplexity: "O(N) bộ nhớ Call Stack.",
        pitfalls: [
          "Quên khôi phục trạng thái (Backtrack step): Dẫn đến dữ liệu bị nhiễm bẩn cho các nhánh sau.",
          "Quên điều kiện dừng (Base Case): Gây đệ quy vô hạn dẫn đến Stack Overflow (SIGSEGV).",
          "Khai báo biến trạng thái lớn truyền theo giá trị (Pass-by-value) trong hàm đệ quy làm tốn thời gian sao chép."
        ],
        cppTemplate: `#include <iostream>
#include <vector>

using namespace std;

int n;
vector<int> chosen;
vector<bool> used;

void backtrack(int step) {
    if (step == n) {
        // Đã tìm được một cấu hình hoàn chỉnh
        for (int i = 0; i < n; ++i) {
            cout << chosen[i] << (i == n - 1 ? "" : " ");
        }
        cout << "\\n";
        return;
    }
    
    for (int val = 1; val <= n; ++val) {
        if (!used[val]) {
            used[val] = true;      // 1. Thử
            chosen.push_back(val);
            
            backtrack(step + 1);   // 2. Đi tiếp
            
            chosen.pop_back();     // 3. Rút lại (Backtrack)
            used[val] = false;
        }
    }
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    if (cin >> n) {
        used.assign(n + 1, false);
        backtrack(0);
    }
    return 0;
}`,
        marisaUrl: "https://marisaoj.com/roadmap",
        marisaProblems: [
          { code: "40", name: "Bài toán N quân hậu", difficulty: "Trung bình", link: "https://marisaoj.com/problem/40" }
        ],
        icpcTips: "Luôn vẽ cây quyết định (Decision Tree) ra giấy nháp trước khi gõ code đệ quy. Điều này giúp nhìn thấy rõ điều kiện dừng và các nhánh có thể tỉa sớm."
      },
      {
        id: "prefix-sum",
        title: "Mảng Cộng Dồn 1D & 2D (Prefix Sums)",
        category: "Tiền xử lý & Mảng",
        difficulty: 2,
        shortDesc: "Trả lời truy vấn tổng đoạn $[L, R]$ hoặc hình chữ nhật 2D trong $\\mathcal{O}(1)$.",
        intuition: `Giả sử có $Q = 10^5$ truy vấn tính tổng các phần tử từ chỉ số $L$ đến $R$. Nếu mỗi lần tính ta dùng vòng lặp for từ $L$ đến $R$, tổng thời gian sẽ là $\\mathcal{O}(Q \\times N) \\approx 10^{10}$ phép tính $\\to$ TLE nặng nề!
Giải pháp thần kỳ: Tiền xử lý mảng cộng dồn:
  $\\text{pref}[i] = \\text{pref}[i - 1] + a[i]$ (với $\\text{pref}[0] = 0$)
Khi đó tổng đoạn $[L, R]$ được tính ngay lập tức:
  $\\text{Sum}(L, R) = \\text{pref}[R] - \\text{pref}[L - 1]$ trong $\\mathcal{O}(1)$!
Mở rộng lên 2D: Sử dụng nguyên lý Bao hàm - Loại trừ (Inclusion-Exclusion Principle):
  $\\text{pref}[r][c] = a[r][c] + \\text{pref}[r-1][c] + \\text{pref}[r][c-1] - \\text{pref}[r-1][c-1]$
  $\\text{Sum}(r_1, c_1, r_2, c_2) = \\text{pref}[r_2][c_2] - \\text{pref}[r_1-1][c_2] - \\text{pref}[r_2][c_1-1] + \\text{pref}[r_1-1][c_1-1]$.`,
        timeComplexity: "$\\mathcal{O}(N)$ tiền xử lý 1D, $\\mathcal{O}(N \\times M)$ tiền xử lý 2D; $\\mathcal{O}(1)$ cho mỗi truy vấn.",
        spaceComplexity: "$\\mathcal{O}(N)$ cho mảng 1D, $\\mathcal{O}(N \\times M)$ cho ma trận 2D.",
        pitfalls: [
          "Nên đánh chỉ số 1-indexed (từ 1 đến N) thay vì 0-indexed để 'pref[0] = 0' tự nhiên, không cần viết 'if (L == 0)' tránh lỗi chỉ số âm.",
          "Tổng các phần tử có thể vượt quá giới hạn kiểu int 32-bit (2*10^9), mảng 'pref' bắt buộc phải là kiểu 'long long'."
        ],
        cppTemplate: `#include <iostream>
#include <vector>

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
        pref[i] = pref[i - 1] + a[i]; // Tiền xử lý O(N)
    }
    
    while (q--) {
        int l, r;
        cin >> l >> r;
        // Trả lời truy vấn tổng trong O(1)
        long long range_sum = pref[r] - pref[l - 1];
        cout << range_sum << "\\n";
    }
    return 0;
}`,
        marisaUrl: "https://marisaoj.com/roadmap",
        marisaProblems: [
          { code: "45", name: "Tổng đoạn liên tiếp", difficulty: "Cơ bản", link: "https://marisaoj.com/problem/45" },
          { code: "46", name: "Tổng hình chữ nhật con", difficulty: "Trung bình", link: "https://marisaoj.com/problem/46" }
        ],
        icpcTips: "Prefix Sum là nền tảng của hàng loạt kỹ thuật cao cấp: từ 2D Prefix Sum, Trie XOR đến Prefix Sum trên cây (Tree Prefix Sums với LCA)."
      },
      {
        id: "difference-array",
        title: "Mảng Hiệu & Kỹ Thuật Cập Nhật Đoạn (Difference Array)",
        category: "Tiền xử lý & Mảng",
        difficulty: 2,
        shortDesc: "Cộng giá trị V vào mọi phần tử trong đoạn [L, R] với thời gian O(1) mỗi truy vấn.",
        intuition: `Mảng hiệu (Difference Array) là phép toán đối ngẫu (dual) với Mảng cộng dồn.
Định nghĩa: diff[i] = a[i] - a[i - 1].
Nhận xét kỳ diệu: Khi ta cộng giá trị V vào mọi phần tử từ L đến R trong mảng ban đầu, hầu hết các hiệu số liền kề 'a[i] - a[i-1]' không đổi!
Chỉ có 2 vị trí thay đổi:
  diff[L] += V  (vì a[L] tăng lên V so với a[L-1])
  diff[R + 1] -= V (vì a[R+1] giữ nguyên còn a[R] tăng lên V)
Sau khi thực hiện tất cả Q cập nhật chỉ với O(1) mỗi bước, ta lấy mảng cộng dồn của mảng hiệu để khôi phục lại mảng kết quả cuối cùng trong O(N)!`,
        timeComplexity: "O(1) cho mỗi cập nhật đoạn [L, R]; O(N) tái tạo mảng cuối cùng.",
        spaceComplexity: "O(N) bộ nhớ phụ trợ.",
        pitfalls: [
          "Quên cập nhật biên phải 'diff[R + 1] -= V' khi R < N, dẫn đến giá trị cộng dồn bị lan truyền đến cuối mảng.",
          "Mảng hiệu chỉ áp dụng hiệu quả khi tất cả các truy vấn cập nhật được thực hiện Offline (hoặc trước khi truy vấn giá trị)."
        ],
        cppTemplate: `#include <iostream>
#include <vector>

using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    
    int n, q;
    if (!(cin >> n >> q)) return 0;
    
    vector<long long> diff(n + 2, 0);
    
    while (q--) {
        int l, r;
        long long v;
        cin >> l >> r >> v;
        diff[l] += v;       // O(1)
        diff[r + 1] -= v;   // O(1)
    }
    
    // Tái tạo lại mảng sau toàn bộ các thao tác bằng Prefix Sum
    vector<long long> result(n + 1, 0);
    long long current_val = 0;
    for (int i = 1; i <= n; ++i) {
        current_val += diff[i];
        result[i] = current_val;
        cout << result[i] << (i == n ? "" : " ");
    }
    cout << "\\n";
    return 0;
}`,
        marisaUrl: "https://marisaoj.com/roadmap",
        marisaProblems: [
          { code: "48", name: "Cập nhật đoạn", difficulty: "Cơ bản", link: "https://marisaoj.com/problem/48" }
        ],
        icpcTips: "Nếu bài toán vừa có cập nhật đoạn vừa xen kẽ truy vấn giá trị Online, hãy chuyển sang Segment Tree Lazy Propagation ở Level 4."
      },
      {
        id: "sorting-comparator",
        title: "Sắp Xếp & Hàm So Sánh Tùy Biến (Custom Comparators)",
        category: "Sắp xếp & Cấu trúc",
        difficulty: 2,
        shortDesc: "Sử dụng std::sort O(N log N) với lambda hoặc struct để sắp xếp dữ liệu phức hợp.",
        intuition: `Thuật toán 'std::sort' trong C++ STL sử dụng Introsort (kết hợp Quicksort, Heapsort và Insertion Sort) với độ phức tạp bảo đảm luôn là O(N log N) trong mọi trường hợp.
Trong CP, hiếm khi ta chỉ sắp xếp số nguyên đơn thuần; hầu hết các bài toán yêu cầu sắp xếp cặp tọa độ, đoạn thời gian [L, R], hoặc cấu trúc struct theo nhiều tiêu chí ưu tiên:
  sort(a.begin(), a.end(), [](const Item &x, const Item &y) {
      if (x.weight != y.weight) return x.weight < y.weight;
      return x.id < y.id;
  });
Hàm so sánh phải tuân thủ nghiêm ngặt quan hệ Strict Weak Ordering (nếu x == y thì hàm so sánh bắt buộc phải trả về false).`,
        timeComplexity: "O(N log N) so sánh; O(1) cho mỗi phép so sánh cơ bản.",
        spaceComplexity: "O(log N) bộ nhớ stack của Introsort.",
        pitfalls: [
          "Vi phạm quy tắc Strict Weak Ordering: Trả về '<=' thay vì '<'. Điều này có thể gây segmentation fault / lỗi thời gian chạy vì std::sort bị lặp vô hạn.",
          "Sắp xếp cấu trúc dữ liệu cồng kềnh mà không dùng tham chiếu const: Dùng 'const Item &a' để tránh overhead copy."
        ],
        cppTemplate: `#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

struct Segment {
    int l, r, id;
};

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    
    int n;
    if (!(cin >> n)) return 0;
    
    vector<Segment> segs(n);
    for (int i = 0; i < n; ++i) {
        cin >> segs[i].l >> segs[i].r;
        segs[i].id = i + 1;
    }
    
    // Sắp xếp: Ưu tiên đầu mút trái tăng dần, nếu bằng thì đầu mút phải giảm dần
    sort(segs.begin(), segs.end(), [](const Segment &a, const Segment &b) {
        if (a.l != b.l) return a.l < b.l;
        return a.r > b.r; // Strict Weak Ordering: dùng > hoặc <, không dùng >=
    });
    
    for (const auto &s : segs) {
        cout << "[" << s.l << ", " << s.r << "] ID: " << s.id << "\\n";
    }
    return 0;
}`,
        marisaUrl: "https://marisaoj.com/roadmap",
        marisaProblems: [
          { code: "50", name: "Sắp xếp tọa độ", difficulty: "Cơ bản", link: "https://marisaoj.com/problem/50" }
        ],
        icpcTips: "Nắm vững sắp xếp là chìa khóa mở đường tới Greedy, Two Pointers, Sweep Line và Binary Search."
      }
    ]
  },
  {
    id: "level-2",
    levelNumber: 2,
    title: "Level 2: Still Simple, But Crucial",
    vietnameseTitle: "Thuật Toán Cốt Lõi Thiết Yếu",
    tagline: "\"Stop learning useless algorithms, learn how to use binary search.\" — Um_nik",
    targetAudience: "Học sinh luyện thi Học sinh giỏi Tỉnh/Quốc gia, Thí sinh ICPC khu vực",
    estimatedTime: "40 - 55 giờ",
    difficultyStars: 3,
    accentColor: "#2F599E",
    marisaUrl: "https://marisaoj.com/roadmap",
    description: "Bộ vũ khí quan trọng nhất trong lập trình thi đấu. Không có kỳ thi ICPC hay HSG Quốc Gia nào không xuất hiện ít nhất một bài toán áp dụng Tìm kiếm nhị phân, Hai con trỏ hoặc Tham lam.",
    topics: [
      {
        id: "binary-search",
        title: "Tìm Kiếm Nhị Phân & STL lower_bound / upper_bound",
        category: "Tìm kiếm",
        difficulty: 3,
        shortDesc: "Thu hẹp không gian tìm kiếm một nửa sau mỗi bước trên mảng đã sắp xếp trong $\\mathcal{O}(\\log N)$.",
        intuition: `Mỗi lần kiểm tra phần tử chính giữa (mid), ta loại bỏ được một nửa số phần tử còn lại. Với mảng $10^9$ phần tử, ta chỉ cần tối đa khoảng $\\approx \\log_2(10^9) \\approx 30$ phép so sánh để tìm thấy đáp án!
Trong C++ STL:
- 'lower_bound(first, last, val)': Trả về con trỏ/iterator tới phần tử đầu tiên $\\ge val$.
- 'upper_bound(first, last, val)': Trả về con trỏ/iterator tới phần tử đầu tiên $> val$.
- Số lần xuất hiện của 'val' trong mảng đã sắp xếp chính là: $\\text{upper\\_bound} - \\text{lower\\_bound}$!`,
        timeComplexity: "$\\mathcal{O}(\\log N)$ cho mỗi thao tác tìm kiếm trên mảng kích thước $N$.",
        spaceComplexity: "$\\mathcal{O}(1)$ biến con trỏ $L, R, mid$.",
        pitfalls: [
          "Tràn số nguyên khi tính mid: 'int mid = (l + r) / 2' có thể tràn int nếu l + r > 2*10^9. Cách viết chuẩn ICPC: 'int mid = l + (r - l) / 2'.",
          "Vòng lặp vô hạn do cập nhật biên sai: Cẩn thận với 'l = mid' hoặc 'r = mid'. Luôn xác định rõ điều kiện dừng l <= r hay l < r.",
          "Quên sắp xếp mảng trước khi gọi binary_search hoặc lower_bound."
        ],
        cppTemplate: `#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

// Cài đặt chuẩn tìm vị trí đầu tiên >= target
int my_lower_bound(const vector<int> &a, int target) {
    int l = 0, r = (int)a.size() - 1;
    int ans = a.size(); // Mặc định nếu không tìm thấy
    
    while (l <= r) {
        int mid = l + (r - l) / 2; // Tránh tràn số
        if (a[mid] >= target) {
            ans = mid;
            r = mid - 1; // Thu hẹp sang nửa trái
        } else {
            l = mid + 1; // Thu hẹp sang nửa phải
        }
    }
    return ans;
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    
    vector<int> a = {2, 5, 8, 12, 16, 23, 38, 56, 72, 91};
    int target = 23;
    
    int idx = my_lower_bound(a, target);
    cout << "Index: " << idx << ", Value: " << a[idx] << "\\n";
    return 0;
}`,
        marisaUrl: "https://marisaoj.com/roadmap",
        marisaProblems: [
          { code: "60", name: "Tìm kiếm nhị phân", difficulty: "Cơ bản", link: "https://marisaoj.com/problem/60" },
          { code: "61", name: "Đếm phần tử trong đoạn", difficulty: "Trung bình", link: "https://marisaoj.com/problem/61" }
        ],
        icpcTips: "Khi cần tìm kiếm trên mảng, hãy luôn nghĩ đến 'lower_bound' trong STL trước khi tự cài đặt bằng tay để tránh lỗi off-by-one."
      },
      {
        id: "binary-search-ans",
        title: "Chặt Nhị Phân Kết Quả (Binary Search on Answer / Parametric Search)",
        category: "Kỹ thuật tối ưu",
        difficulty: 3,
        shortDesc: "Chuyển bài toán 'Tìm giá trị tối ưu' thành bài toán 'Kiểm tra tính khả thi' đơn điệu.",
        intuition: `Đây là một trong những kỹ thuật mạnh nhất trong ICPC!
Dấu hiệu nhận biết:
- Đề bài có dạng: 'Tìm giá trị nhỏ nhất để...', 'Tìm thời gian lớn nhất sao cho...', 'Tối thiểu hóa chi phí tối đa (Minimax)'.
- Không gian nghiệm có tính ĐƠN ĐIỆU (Monotonicity): Nếu giá trị X thỏa mãn thì mọi giá trị > X cũng thỏa mãn (hoặc ngược lại).
Thay vì tính toán trực tiếp đáp án (vốn rất khó), ta đoán một đáp án 'mid', sau đó viết hàm 'bool check(mid)' kiểm tra xem đáp án này có hợp lệ hay không. Vì hàm check thường chỉ mất O(N), tổng độ phức tạp sẽ là O(N * log(MAX_ANS)).`,
        timeComplexity: "O(T(check) * log(MAX_ANS - MIN_ANS)), thường là O(N log(10^18)).",
        spaceComplexity: "O(1) phụ trợ.",
        pitfalls: [
          "Đặt khoảng [L, R] không bao phủ hết đáp án (ví dụ R quá nhỏ dẫn đến không tìm được nghiệm tối ưu).",
          "Hàm 'check' không hoàn toàn đơn điệu khiến thuật toán ra kết quả sai.",
          "Với bài toán số thực: Kiểm tra điều kiện 'while (r - l > 1e-7)' hoặc chạy cố định 100 vòng lặp."
        ],
        cppTemplate: `#include <iostream>
#include <vector>
#include <numeric>

using namespace std;

// Kiểm tra xem có thể chia mảng thành <= k đoạn sao cho tổng mỗi đoạn <= max_sum không
bool check(long long max_sum, const vector<long long> &a, int k) {
    int segments = 1;
    long long current_sum = 0;
    
    for (long long x : a) {
        if (x > max_sum) return false; // Một phần tử đơn lẻ đã vượt ngưỡng
        if (current_sum + x > max_sum) {
            segments++;
            current_sum = x;
        } else {
            current_sum += x;
        }
    }
    return segments <= k;
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    
    int n, k;
    if (!(cin >> n >> k)) return 0;
    
    vector<long long> a(n);
    long long low = 0, high = 0;
    for (int i = 0; i < n; ++i) {
        cin >> a[i];
        low = max(low, a[i]);
        high += a[i];
    }
    
    long long ans = high;
    while (low <= high) {
        long long mid = low + (high - low) / 2;
        if (check(mid, a, k)) {
            ans = mid;
            high = mid - 1; // Thử tìm tổng nhỏ hơn nữa
        } else {
            low = mid + 1;  // Buộc phải tăng ngưỡng tổng lên
        }
    }
    
    cout << ans << "\\n";
    return 0;
}`,
        marisaUrl: "https://marisaoj.com/roadmap",
        marisaProblems: [
          { code: "65", name: "Đóng gói hàng hóa", difficulty: "Trung bình", link: "https://marisaoj.com/problem/65" },
          { code: "66", name: "Chặt gỗ", difficulty: "Trung bình", link: "https://marisaoj.com/problem/66" }
        ],
        icpcTips: "Với bài toán chặt nhị phân số thực, lặp cố định 80-100 lần (for iter = 0..99) tốt hơn nhiều so với while(r - l > eps) vì tránh hoàn toàn lỗi vòng lặp vô hạn do sai số float."
      },
      {
        id: "two-pointers",
        title: "Kỹ Thuật Hai Con Trỏ (Two Pointers Technique)",
        category: "Kỹ thuật mảng",
        difficulty: 3,
        shortDesc: "Duyệt tuyến tính bằng hai con trỏ di chuyển cùng chiều hoặc ngược chiều, giảm O(N^2) về O(N).",
        intuition: `Hai con trỏ là kỹ thuật tối ưu hóa dựa trên tính đơn điệu của hai đầu mút [L, R].
Thay vì xét mọi cặp (L, R) tốn O(N^2), ta nhận thấy: Khi L tăng lên thì R chỉ có thể tăng lên (cùng chiều) hoặc chỉ có thể giảm đi (ngược chiều).
Vì mỗi con trỏ L và R chỉ di chuyển tối đa N lần trong suốt toàn bộ quá trình chạy, tổng số bước di chuyển là L_steps + R_steps <= 2N, đưa độ phức tạp về O(N) tuyến tính!
Các ứng dụng kinh điển:
1. Tìm cặp số có tổng bằng S trên mảng đã sắp xếp (Hai con trỏ ngược chiều).
2. Tìm đoạn con dài nhất thỏa mãn điều kiện (Hai con trỏ cùng chiều).`,
        timeComplexity: "O(N) sau khi mảng đã sắp xếp; O(N log N) nếu phải sắp xếp trước.",
        spaceComplexity: "O(1) phụ trợ.",
        pitfalls: [
          "Điều kiện dừng con trỏ: Để L vượt quá R hoặc R vượt quá kích thước mảng.",
          "Quên rằng mảng bắt buộc phải được sắp xếp trước khi áp dụng con trỏ đối xứng tìm tổng cặp số."
        ],
        cppTemplate: `#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

// Tìm 2 vị trí có tổng đúng bằng target trên mảng đã sắp xếp
bool findPairSum(const vector<int> &a, int target, int &ans_l, int &ans_r) {
    int l = 0, r = (int)a.size() - 1;
    while (l < r) {
        int sum = a[l] + a[r];
        if (sum == target) {
            ans_l = l; ans_r = r;
            return true;
        } else if (sum < target) {
            l++; // Cần tăng tổng
        } else {
            r--; // Cần giảm tổng
        }
    }
    return false;
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    
    vector<int> a = {1, 3, 5, 7, 11, 14, 19, 25};
    int target = 18;
    int l, r;
    if (findPairSum(a, target, l, r)) {
        cout << "Found: a[" << l << "] + a[" << r << "] = " << a[l] + a[r] << "\\n";
    }
    return 0;
}`,
        marisaUrl: "https://marisaoj.com/roadmap",
        marisaProblems: [
          { code: "70", name: "Cặp số có tổng bằng S", difficulty: "Trung bình", link: "https://marisaoj.com/problem/70" }
        ],
        icpcTips: "Bất cứ khi nào bạn nhìn thấy bài toán tìm đoạn con liên tiếp thỏa mãn điều kiện tích lũy, hãy nghĩ ngay tới Two Pointers."
      },
      {
        id: "sliding-window",
        title: "Kỹ Thuật Cửa Sổ Trượt (Sliding Window)",
        category: "Kỹ thuật mảng",
        difficulty: 3,
        shortDesc: "Duy trì trạng thái của một khung cửa sổ có độ dài cố định hoặc thay đổi trên mảng.",
        intuition: `Cửa sổ trượt là dạng đặc biệt của Two Pointers.
Khi cửa sổ dịch chuyển sang phải 1 bước:
- Một phần tử ở biên trái bị LOẠI KHỎI cửa sổ.
- Một phần tử ở biên phải được THÊM VÀO cửa sổ.
Thay vì tính toán lại toàn bộ các phần tử bên trong cửa sổ từ đầu (mất O(K)), ta chỉ cập nhật chênh lệch trạng thái (Delta) trong O(1).
Ví dụ: Tổng cửa sổ mới = Tổng cũ - A[L - 1] + A[R].`,
        timeComplexity: "O(N) cho toàn bộ quá trình duyệt mảng.",
        spaceComplexity: "O(1) hoặc O(K) nếu cần lưu cấu trúc dữ liệu bên trong cửa sổ.",
        pitfalls: [
          "Khởi tạo sai trạng thái của cửa sổ K phần tử đầu tiên.",
          "Khi K > N: Cần xử lý ngoại lệ cẩn thận."
        ],
        cppTemplate: `#include <iostream>
#include <vector>

using namespace std;

// Tìm tổng lớn nhất của đoạn con có độ dài cố định k
long long maxSubarraySumLenK(const vector<int> &a, int k) {
    int n = a.size();
    if (n < k) return 0;
    
    long long window_sum = 0;
    for (int i = 0; i < k; ++i) window_sum += a[i];
    
    long long max_sum = window_sum;
    for (int i = k; i < n; ++i) {
        window_sum += a[i] - a[i - k]; // Thêm mới bên phải, bớt cũ bên trái
        max_sum = max(max_sum, window_sum);
    }
    return max_sum;
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    vector<int> a = {2, 1, 5, 1, 3, 2};
    cout << "Max sum len 3: " << maxSubarraySumLenK(a, 3) << "\\n";
    return 0;
}`,
        marisaUrl: "https://marisaoj.com/roadmap",
        marisaProblems: [
          { code: "72", name: "Cửa sổ trượt lớn nhất", difficulty: "Trung bình", link: "https://marisaoj.com/problem/72" }
        ],
        icpcTips: "Khi kết hợp cửa sổ trượt với 'std::deque' đơn điệu, ta có thể tìm Min/Max trong cửa sổ trượt với thời gian O(N) (Monotonic Queue)."
      },
      {
        id: "greedy-basic",
        title: "Chiến Lược Tham Lam Cơ Bản (Greedy Algorithms)",
        category: "Kỹ thuật tối ưu",
        difficulty: 3,
        shortDesc: "Đưa ra lựa chọn tối ưu cục bộ tại mỗi bước với niềm tin đạt được tối ưu toàn cục.",
        intuition: `Thuật toán tham lam hoạt động theo nguyên tắc: Luôn chọn phương án tốt nhất có thể ngay ở thời điểm hiện tại.
Để thuật toán tham lam đúng, bài toán phải thỏa mãn 2 tính chất toán học:
1. Tính chất lựa chọn tham lam (Greedy Choice Property): Một giải pháp tối ưu toàn cục có thể đạt được bằng cách đưa ra các lựa chọn tối ưu cục bộ.
2. Cấu trúc con tối ưu (Optimal Substructure): Lời giải tối ưu của bài toán chứa lời giải tối ưu của các bài toán con.
Bài toán kinh điển: Xếp lịch các cuộc họp (Interval Scheduling) - luôn chọn cuộc họp kết thúc sớm nhất để dành nhiều thời gian còn lại nhất cho các cuộc họp tiếp theo!`,
        timeComplexity: "Thường là O(N log N) do bước sắp xếp ban đầu, sau đó duyệt O(N).",
        spaceComplexity: "O(1) hoặc O(N) lưu danh sách.",
        pitfalls: [
          "Bẫy tham lam sai (False Greedy): Rất nhiều bài toán trông giống Tham lam nhưng thực chất phải dùng Quy hoạch động (ví dụ bài toán Đổi tiền với mệnh giá tùy ý).",
          "Không chứng minh được tính đúng đắn trước khi gõ code. Hãy thử phản chứng bằng các phản ví dụ nhỏ (Counter-examples)."
        ],
        cppTemplate: `#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

struct Interval {
    int start, end;
};

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    
    int n;
    if (!(cin >> n)) return 0;
    
    vector<Interval> intervals(n);
    for (int i = 0; i < n; ++i) {
        cin >> intervals[i].start >> intervals[i].end;
    }
    
    // Tham lam: Sắp xếp theo thời gian KẾT THÚC tăng dần
    sort(intervals.begin(), intervals.end(), [](const Interval &a, const Interval &b) {
        return a.end < b.end;
    });
    
    int count = 0;
    int last_end_time = -1;
    for (const auto &it : intervals) {
        if (it.start >= last_end_time) {
            count++;
            last_end_time = it.end; // Chọn cuộc họp này
        }
    }
    
    cout << count << "\\n";
    return 0;
}`,
        marisaUrl: "https://marisaoj.com/roadmap",
        marisaProblems: [
          { code: "75", name: "Lập lịch công việc", difficulty: "Trung bình", link: "https://marisaoj.com/problem/75" }
        ],
        icpcTips: "Quy tắc vàng: Nếu không thể chứng minh thuật toán tham lam bằng phương pháp đổi chỗ (Exchange Argument) trong 5 phút, hãy nghĩ sang DP."
      },
      {
        id: "meet-in-middle",
        title: "Kỹ Thuật Chia Đôi Tập Hợp (Meet in the Middle)",
        category: "Kỹ thuật tìm kiếm",
        difficulty: 3,
        shortDesc: "Chia không gian tìm kiếm kích thước 2^N thành hai nửa 2^(N/2) để giảm đột phá độ phức tạp.",
        intuition: `Khi N khoảng 40, thuật toán vét cạn O(2^N) = 2^40 ≈ 10^12 phép tính (chắc chắn TLE). Tuy nhiên N lại quá nhỏ để dùng Quy hoạch động thông thường (nếu trọng số W lên tới 10^18).
Kỹ thuật Meet in the Middle giải cứu:
1. Chia tập hợp thành 2 nửa: Nửa đầu kích thước N/2, nửa sau kích thước N - N/2.
2. Vét cạn mọi tập con của nửa đầu: tốn O(2^(N/2)) ≈ 2^20 ≈ 10^6 trạng thái. Lưu vào mảng và sắp xếp lại.
3. Vét cạn nửa sau: Với mỗi tổng s2 của nửa sau, dùng Tìm kiếm nhị phân (lower_bound) trên mảng nửa đầu để tìm tổng s1 sao cho s1 + s2 gần mục tiêu nhất!
Tổng độ phức tạp giảm từ O(2^N) xuống O(2^(N/2) * (N/2)), biến bài toán bất khả thi thành chạy trong 0.2 giây!`,
        timeComplexity: "O(2^(N/2) * N) - giảm từ 10^12 xuống 10^6 phép tính với N = 40.",
        spaceComplexity: "O(2^(N/2)) để lưu các giá trị của nửa thứ nhất.",
        pitfalls: [
          "Quên sắp xếp nửa thứ nhất trước khi binary search.",
          "Tràn số nguyên khi cộng dồn các tổng con, bắt buộc dùng 'long long'."
        ],
        cppTemplate: `#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

// Sinh tất cả các tổng tập con
void generateSubsets(int idx, int end, long long current_sum, 
                     const vector<long long> &a, vector<long long> &res) {
    if (idx == end) {
        res.push_back(current_sum);
        return;
    }
    // Không chọn a[idx]
    generateSubsets(idx + 1, end, current_sum, a, res);
    // Có chọn a[idx]
    generateSubsets(idx + 1, end, current_sum + a[idx], a, res);
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    
    int n;
    long long S;
    if (!(cin >> n >> S)) return 0;
    
    vector<long long> a(n);
    for (int i = 0; i < n; ++i) cin >> a[i];
    
    int mid = n / 2;
    vector<long long> left_sums, right_sums;
    generateSubsets(0, mid, 0, a, left_sums);
    generateSubsets(mid, n, 0, a, right_sums);
    
    sort(left_sums.begin(), left_sums.end());
    
    long long ans = 0;
    for (long long s2 : right_sums) {
        if (s2 <= S) {
            // Tìm s1 lớn nhất sao cho s1 + s2 <= S <=> s1 <= S - s2
            auto it = upper_bound(left_sums.begin(), left_sums.end(), S - s2);
            if (it != left_sums.begin()) {
                --it;
                ans = max(ans, s2 + *it);
            }
        }
    }
    
    cout << ans << "\\n";
    return 0;
}`,
        marisaUrl: "https://marisaoj.com/roadmap",
        marisaProblems: [
          { code: "80", name: "Tổng tập con gần S nhất", difficulty: "Khó", link: "https://marisaoj.com/problem/80" }
        ],
        icpcTips: "Cứ khi nào thấy N trong khoảng 36 đến 44, 99% đề bài yêu cầu sử dụng Meet in the Middle."
      }
    ]
  },
  {
    id: "level-3",
    levelNumber: 3,
    title: "Level 3: Fundamental Knowledge",
    vietnameseTitle: "Kiến Thức Nền Tảng Mở Rộng",
    tagline: "Bước chân vào thế giới Đồ thị (BFS/DFS), Cây, DSU và Quy hoạch động",
    targetAudience: "Học sinh luyện thi Đội tuyển HSG Quốc Gia (VOI), Sinh viên thi ICPC National",
    estimatedTime: "50 - 70 giờ",
    difficultyStars: 3,
    accentColor: "#274D8C",
    marisaUrl: "https://marisaoj.com/roadmap",
    description: "Cột mốc phân loại giữa lập trình cơ bản và thuật toán nâng cao. Đây là nơi thí sinh học cách mô hình hóa bài toán thực tế thành đồ thị, nắm bắt bản chất lưu vết trạng thái của Quy hoạch động và thao tác mảng tập hợp rời nhau DSU.",
    topics: [
      {
        id: "graph-bfs",
        title: "Duyệt Đồ Thị Theo Chiều Rộng (Breadth-First Search - BFS)",
        category: "Đồ thị",
        difficulty: 3,
        shortDesc: "Tìm đường đi ngắn nhất trên đồ thị không trọng số và loang ma trận.",
        intuition: `BFS hoạt động theo cơ chế hàng đợi (Queue - FIFO: Vào trước ra trước).
Nguyên lý loang sóng: Bắt đầu từ đỉnh nguồn, BFS mở rộng sang tất cả các đỉnh lân cận ở khoảng cách 1, sau đó tới khoảng cách 2, khoảng cách 3...
Nhờ tính chất này, lần đầu tiên BFS thăm một đỉnh 'v' cũng chính là lúc ta tìm được đường đi ngắn nhất từ đỉnh nguồn đến 'v' (với cạnh có trọng số bằng 1).
Thuật toán cũng là nền tảng để loang trên lưới (Flood Fill) tìm số thành phần liên thông của mê cung.`,
        timeComplexity: "O(V + E) trên danh sách kề, O(N * M) trên lưới ô vuông.",
        spaceComplexity: "O(V) lưu mảng khoảng cách dist[] và hàng đợi queue.",
        pitfalls: [
          "Đánh dấu đã thăm (visited = true) quá muộn: Phải đánh dấu NGAY KHI ĐẨY VÀO QUEUE, nếu để lúc lấy ra khỏi queue mới đánh dấu sẽ bị đẩy trùng hàng vạn lần gây MLE/TLE.",
          "Đồ thị gồm nhiều thành phần liên thông: Cần vòng lặp for duyệt qua mọi đỉnh để đảm bảo không sót thành phần nào."
        ],
        cppTemplate: `#include <iostream>
#include <vector>
#include <queue>

using namespace std;

const int INF = 1e9;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    
    int n, m, start_node;
    if (!(cin >> n >> m >> start_node)) return 0;
    
    vector<vector<int>> adj(n + 1);
    for (int i = 0; i < m; ++i) {
        int u, v;
        cin >> u >> v;
        adj[u].push_back(v);
        adj[v].push_back(u); // Đồ thị vô hướng
    }
    
    vector<int> dist(n + 1, INF);
    queue<int> q;
    
    dist[start_node] = 0;
    q.push(start_node); // Đánh dấu ngay khi push
    
    while (!q.empty()) {
        int u = q.front();
        q.pop();
        
        for (int v : adj[u]) {
            if (dist[v] == INF) {
                dist[v] = dist[u] + 1;
                q.push(v); // Đẩy vào hàng đợi
            }
        }
    }
    
    for (int i = 1; i <= n; ++i) {
        cout << "Khoang cach toi " << i << ": " << (dist[i] == INF ? -1 : dist[i]) << "\\n";
    }
    return 0;
}`,
        marisaUrl: "https://marisaoj.com/roadmap",
        marisaProblems: [
          { code: "100", name: "Đường đi ngắn nhất trên đồ thị", difficulty: "Cơ bản", link: "https://marisaoj.com/problem/100" }
        ],
        icpcTips: "BFS đa nguồn (Multisource BFS): Đẩy tất cả các điểm xuất phát vào Queue cùng lúc ở bước khởi tạo với dist = 0. Rất hay gặp trong các bài toán lan truyền chất độc/cháy rừng."
      },
      {
        id: "graph-dfs",
        title: "Duyệt Đồ Thị Theo Chiều Sâu (Depth-First Search - DFS)",
        category: "Đồ thị",
        difficulty: 3,
        shortDesc: "Đi sâu nhất có thể theo từng nhánh, tìm thành phần liên thông và chu trình.",
        intuition: `DFS đi theo một con đường duy nhất cho đến khi gặp đường cụt hoặc đỉnh đã thăm thì mới quay lui lại ngã ba gần nhất để khám phá con đường tiếp theo.
Ứng dụng cực kỳ đa dạng:
1. Đếm số thành phần liên thông.
2. Kiểm tra tính liên thông hai đỉnh.
3. Phát hiện chu trình (Cycle Detection) bằng cách kiểm tra cạnh ngược (Back Edge).
4. Phân loại cạnh cây (Tree Edges), cạnh xuôi (Forward Edges) và cạnh chéo (Cross Edges) - bước chuẩn bị cho thuật toán Tarjan.`,
        timeComplexity: "O(V + E) với danh sách kề.",
        spaceComplexity: "O(V) cho đệ quy stack và mảng visited.",
        pitfalls: [
          "Tràn bộ nhớ Call Stack khi đồ thị dạng đường thẳng có 10^5 đỉnh. Trong Linux (kỳ thi chuẩn), stack size thường mở rộng, nhưng trên Windows hoặc Codeforces cần cẩn thận hoặc dùng DFS khử đệ quy bằng std::stack.",
          "Quên bỏ qua đỉnh cha 'parent' trong đồ thị vô hướng dẫn đến tưởng nhầm là có chu trình."
        ],
        cppTemplate: `#include <iostream>
#include <vector>

using namespace std;

int n, m;
vector<vector<int>> adj;
vector<bool> visited;

void dfs(int u) {
    visited[u] = true;
    for (int v : adj[u]) {
        if (!visited[v]) {
            dfs(v);
        }
    }
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    
    if (!(cin >> n >> m)) return 0;
    adj.assign(n + 1, vector<int>());
    visited.assign(n + 1, false);
    
    for (int i = 0; i < m; ++i) {
        int u, v;
        cin >> u >> v;
        adj[u].push_back(v);
        adj[v].push_back(u);
    }
    
    int components = 0;
    for (int i = 1; i <= n; ++i) {
        if (!visited[i]) {
            components++;
            dfs(i);
        }
    }
    
    cout << "So thanh phan lien thong: " << components << "\\n";
    return 0;
}`,
        marisaUrl: "https://marisaoj.com/roadmap",
        marisaProblems: [
          { code: "105", name: "Đếm thành phần liên thông", difficulty: "Cơ bản", link: "https://marisaoj.com/problem/105" }
        ],
        icpcTips: "Khi làm việc với cây (Tree), ta không cần mảng visited, chỉ cần truyền thêm tham số 'int parent' và kiểm tra 'if (v != parent)' là đủ."
      },
      {
        id: "dsu-disjoint",
        title: "Tập Hợp Rời Nhau DSU (Disjoint Set Union)",
        category: "Cấu trúc dữ liệu",
        difficulty: 3,
        shortDesc: "Quản lý các tập hợp rời nhau với thao tác Hợp nhất (Union) và Tìm đại diện (Find) gần như $\\mathcal{O}(1)$.",
        intuition: `DSU quản lý một tập hợp các phần tử được chia thành các nhóm không giao nhau.
Hai thao tác cốt lõi:
1. 'find(u)': Tìm gốc đại diện cho tập hợp chứa u.
2. 'unite(u, v)': Hợp nhất tập hợp chứa u và tập hợp chứa v.
Hai kỹ thuật tối ưu hóa thần thánh giúp DSU đạt tốc độ gần như tức thời:
- Nén đường đi (Path Compression): Khi tìm gốc của u, gán trực tiếp cha của u trỏ thẳng về gốc tối cao.
- Hợp nhất theo kích thước/hạng (Union by Rank/Size): Luôn nối cây có kích thước nhỏ hơn vào gốc của cây có kích thước lớn hơn.
Kết hợp cả hai kỹ thuật đưa độ phức tạp về $\\mathcal{O}(\\alpha(N))$ mỗi thao tác (với $\\alpha$ là hàm ngược Ackermann, trong thực tế $\\alpha(10^{18}) \\le 4$, coi như hằng số $\\mathcal{O}(1)$)!`,
        timeComplexity: "$\\mathcal{O}(\\alpha(N)) \\approx \\mathcal{O}(1)$ cho mỗi thao tác find/unite.",
        spaceComplexity: "$\\mathcal{O}(N)$ lưu mảng parent[] và sz[].",
        pitfalls: [
          "Quên nén đường đi trong hàm find: 'return parent[u] = find(parent[u])' thay vì 'return find(parent[u])'. Quên điều này sẽ khiến độ phức tạp thoái hóa về O(N).",
          "Gọi unite(u, v) mà không kiểm tra xem u và v đã cùng một gốc hay chưa."
        ],
        cppTemplate: `#include <iostream>
#include <vector>
#include <numeric>

using namespace std;

struct DSU {
    vector<int> parent;
    vector<int> sz;
    int num_sets;
    
    DSU(int n) {
        parent.resize(n + 1);
        iota(parent.begin(), parent.end(), 0); // Mỗi đỉnh ban đầu tự làm cha của chính nó
        sz.assign(n + 1, 1);
        num_sets = n;
    }
    
    // Nén đường đi (Path Compression)
    int find(int u) {
        return (u == parent[u]) ? u : (parent[u] = find(parent[u]));
    }
    
    // Hợp nhất theo kích thước (Union by Size)
    bool unite(int u, int v) {
        int root_u = find(u);
        int root_v = find(v);
        if (root_u == root_v) return false; // Đã cùng một tập hợp
        
        if (sz[root_u] < sz[root_v]) swap(root_u, root_v);
        parent[root_v] = root_u;
        sz[root_u] += sz[root_v];
        num_sets--;
        return true;
    }
};

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    
    int n = 5;
    DSU dsu(n);
    dsu.unite(1, 2);
    dsu.unite(2, 3);
    
    cout << "1 va 3 cung nhom: " << (dsu.find(1) == dsu.find(3) ? "Dung" : "Sai") << "\\n";
    cout << "1 va 4 cung nhom: " << (dsu.find(1) == dsu.find(4) ? "Dung" : "Sai") << "\\n";
    return 0;
}`,
        marisaUrl: "https://marisaoj.com/roadmap",
        marisaProblems: [
          { code: "110", name: "Tập hợp rời rạc", difficulty: "Cơ bản", link: "https://marisaoj.com/problem/110" }
        ],
        icpcTips: "DSU là chìa khóa của Thuật toán Kruskal tìm cây khung nhỏ nhất (MST) và kỹ thuật DSU with Rollback khi làm việc với cây phân đoạn thời gian."
      },
      {
        id: "dp-intro",
        title: "Nhập Môn Quy Hoạch Động (Introduction to DP)",
        category: "Quy hoạch động",
        difficulty: 3,
        shortDesc: "Ghi nhớ kết quả bài toán con để tránh tính toán lặp lại (Memoization / Tabulation).",
        intuition: `Quy hoạch động (Dynamic Programming - DP) giải quyết các bài toán tối ưu bằng cách chia nhỏ thành các bài toán con gối nhau (Overlapping Subproblems).
3 bước tư duy quy hoạch động chuẩn mực:
1. Định nghĩa trạng thái (State Definition): 'dp[i][w]' có ý nghĩa chính xác là gì? (Ví dụ: giá trị lớn nhất khi xét i vật phẩm đầu tiên và tải trọng balo không vượt quá w).
2. Công thức truy hồi (Transition): Giá trị 'dp[i][w]' được tính toán từ các trạng thái nhỏ hơn nào trước đó?
3. Bài toán cơ sở (Base Case): Trạng thái nhỏ nhất đã biết trước đáp án (ví dụ dp[0][w] = 0).
Các bài toán kinh điển: Balo 0/1 (Knapsack 0/1), Dãy con tăng dài nhất (LIS), Dãy con chung dài nhất (LCS).`,
        timeComplexity: "O(Trạng thái * Số bước chuyển), ví dụ Balo 0/1 là O(N * W).",
        spaceComplexity: "O(N * W), có thể tối ưu không gian xuống O(W) bằng mảng 1 chiều.",
        pitfalls: [
          "Thứ tự tính toán sai (Order of computation): Tính trạng thái lớn trước khi trạng thái con được giải quyết.",
          "Bài toán Balo 0/1 khi tối ưu về mảng 1 chiều phải duyệt w NGƯỢC CHIỀU từ W về weight[i] để tránh dùng một đồ vật nhiều lần.",
          "Không khởi tạo giá trị ban đầu: Dùng -INF hoặc INF tùy bài toán Max hay Min."
        ],
        cppTemplate: `#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    
    int n, W;
    if (!(cin >> n >> W)) return 0;
    
    vector<int> weight(n), val(n);
    for (int i = 0; i < n; ++i) cin >> weight[i] >> val[i];
    
    // Tối ưu mảng 1 chiều dp[w]
    vector<long long> dp(W + 1, 0);
    
    for (int i = 0; i < n; ++i) {
        // Duyệt ngược để mỗi vật chỉ được chọn tối đa 1 lần (0/1 Knapsack)
        for (int w = W; w >= weight[i]; --w) {
            dp[w] = max(dp[w], dp[w - weight[i]] + val[i]);
        }
    }
    
    cout << dp[W] << "\\n";
    return 0;
}`,
        marisaUrl: "https://marisaoj.com/roadmap",
        marisaProblems: [
          { code: "120", name: "Bài toán cái túi (Knapsack)", difficulty: "Trung bình", link: "https://marisaoj.com/problem/120" },
          { code: "121", name: "Dãy con tăng dài nhất", difficulty: "Trung bình", link: "https://marisaoj.com/problem/121" }
        ],
        icpcTips: "Khi bị bế tắc không tìm được công thức truy hồi, hãy viết hàm đệ quy có nhớ (Memoization với mảng memo[]) trước, sau đó chuyển hóa sang vòng lặp (Iterative DP)."
      },
      {
        id: "tree-intro-dp",
        title: "Cây & Quy Hoạch Động Trên Cây Cơ Bản (Tree DP)",
        category: "Cây & Đồ thị",
        difficulty: 3,
        shortDesc: "Tính toán thông tin của cây thông qua duyệt DFS hậu thứ tự (Post-order traversal).",
        intuition: `Cây là một đồ thị vô hướng, liên thông và không có chu trình, gồm N đỉnh và đúng N - 1 cạnh.
Tính chất quan trọng nhất của cây: Giữa 2 đỉnh bất kỳ luôn tồn tại DUY NHẤT một đường đi đơn.
Khi chọn một đỉnh làm gốc (Root), cây có cấu trúc phân cấp tự nhiên: Mỗi đỉnh 'u' là gốc của một cây con (Subtree).
Quy hoạch động trên cây (Tree DP):
Ta tính toán thông tin của cây con gốc 'u' dựa trên kết quả đã tổng hợp từ tất cả các cây con của các đỉnh con 'v' (children of u). Do đó, thuật toán chạy hoàn hảo bên trong một hàm DFS duy nhất theo thứ tự từ dưới lá lên gốc (Bottom-Up)!`,
        timeComplexity: "O(N) - mỗi đỉnh và mỗi cạnh được duyệt đúng 1 lần.",
        spaceComplexity: "O(N) lưu trữ cây và mảng DP.",
        pitfalls: [
          "Quên bỏ qua đỉnh cha (parent) khiến DFS bị lặp ngược lên trên.",
          "Cây có độ sâu lớn có thể gây tràn stack, cần cẩn thận."
        ],
        cppTemplate: `#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

int n;
vector<vector<int>> adj;
vector<int> subtree_size;

void dfs_size(int u, int p) {
    subtree_size[u] = 1; // Bản thân đỉnh u
    for (int v : adj[u]) {
        if (v != p) {
            dfs_size(v, u);
            subtree_size[u] += subtree_size[v]; // Gộp kết quả từ cây con
        }
    }
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    if (!(cin >> n)) return 0;
    
    adj.assign(n + 1, vector<int>());
    subtree_size.assign(n + 1, 0);
    
    for (int i = 0; i < n - 1; ++i) {
        int u, v;
        cin >> u >> v;
        adj[u].push_back(v);
        adj[v].push_back(u);
    }
    
    dfs_size(1, 0); // Chọn đỉnh 1 làm gốc
    
    for (int i = 1; i <= n; ++i) {
        cout << "Kich thuoc cay con goc " << i << ": " << subtree_size[i] << "\\n";
    }
    return 0;
}`,
        marisaUrl: "https://marisaoj.com/roadmap",
        marisaProblems: [
          { code: "130", name: "Kích thước cây con", difficulty: "Cơ bản", link: "https://marisaoj.com/problem/130" }
        ],
        icpcTips: "Định lý: Mọi cây luôn tồn tại ít nhất 1 trọng tâm (Centroid) sao cho khi bỏ trọng tâm, kích thước của mọi cây con còn lại không vượt quá N/2."
      },
      {
        id: "bitmasks",
        title: "Thao Tác Bit & Đại Số Boolean Trong CP (Bitwise Operations)",
        category: "Kỹ thuật Bitmask",
        difficulty: 3,
        shortDesc: "Biểu diễn tập hợp bằng số nguyên nhị phân và thao tác với tốc độ 1 chu kỳ CPU.",
        intuition: `Một số nguyên 32-bit hoặc 64-bit có thể coi là một mảng boolean gồm 32 hoặc 64 phần tử.
Bit thứ i bật (bằng 1) đại diện cho phần tử thứ i thuộc về tập hợp.
Các thao tác bit cơ bản chạy trong 1 chu kỳ CPU:
- Kiểm tra bit thứ i: '(mask >> i) & 1'
- Bật bit thứ i: 'mask | (1 << i)'
- Tắt bit thứ i: 'mask & ~(1 << i)'
- Đảo bit thứ i: 'mask ^ (1 << i)'
- Duyệt mọi tập con của một mặt nạ: 'for (int sub = mask; sub > 0; sub = (sub - 1) & mask)' -> Duyệt mọi submask của mọi mask chỉ mất O(3^N) thay vì O(4^N)!`,
        timeComplexity: "O(1) cho hầu hết các phép toán bit.",
        spaceComplexity: "O(1) bộ nhớ.",
        pitfalls: [
          "Độ ưu tiên toán tử: Các toán tử bit ('&', '|', '^') có độ ưu tiên THẤP HƠN các phép toán so sánh ('==', '!='). Bắt buộc phải đóng ngoặc cẩn thận: 'if ((mask & (1 << i)) != 0)'.",
          "Dịch bit vượt quá 31 với số nguyên 32-bit: Phải dùng '1LL << i' nếu dịch từ 31 đến 62."
        ],
        cppTemplate: `#include <iostream>

using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    
    int n = 3; // Tập hợp có 3 phần tử: {0, 1, 2}
    
    // Duyệt qua tất cả 2^N tập con bằng bitmask
    for (int mask = 0; mask < (1 << n); ++mask) {
        cout << "Tap con mask " << mask << ": { ";
        for (int i = 0; i < n; ++i) {
            if ((mask >> i) & 1) {
                cout << i << " ";
            }
        }
        cout << "}\\n";
    }
    return 0;
}`,
        marisaUrl: "https://marisaoj.com/roadmap",
        marisaProblems: [
          { code: "135", name: "Duyệt tập con bằng Bitmask", difficulty: "Cơ bản", link: "https://marisaoj.com/problem/135" }
        ],
        icpcTips: "Các hàm builtin tối ưu của GCC: '__builtin_popcount(mask)' đếm số bit 1; '__builtin_ctz(mask)' đếm số bit 0 ở cuối. Chúng được dịch trực tiếp thành lệnh phần cứng của CPU."
      }
    ]
  },
  {
    id: "level-4",
    levelNumber: 4,
    title: "Level 4: Further Fundamental Knowledge",
    vietnameseTitle: "Thuật Toán & Cấu Trúc Dữ Liệu Trung Cấp",
    tagline: "Làm chủ Cây phân đoạn (Segment Tree), Fenwick Tree, Dijkstra và LCA",
    targetAudience: "Thí sinh thi HSG Quốc Gia (VOI) mục tiêu có giải, Đội tuyển ICPC Regional",
    estimatedTime: "60 - 80 giờ",
    difficultyStars: 4,
    accentColor: "#1F3F73",
    marisaUrl: "https://marisaoj.com/roadmap",
    description: "Cấp độ phân hóa rõ nét trình độ thí sinh. Nơi các cấu trúc dữ liệu dạng cây phức tạp như Segment Tree và Fenwick Tree giúp trả lời các truy vấn đoạn trong O(log N). Đồng thời làm chủ thuật toán Dijkstra cho đồ thị có trọng số và thuật toán tìm tổ tiên chung gần nhất LCA.",
    topics: [
      {
        id: "dijkstra-01bfs",
        title: "Đường Đi Ngắn Nhất: Dijkstra & 0-1 BFS",
        category: "Đồ thị",
        difficulty: 4,
        shortDesc: "Tìm đường đi ngắn nhất đồ thị trọng số không âm bằng Hàng đợi ưu tiên (Priority Queue).",
        intuition: `Thuật toán Dijkstra là sự kết hợp hoàn hảo giữa BFS và Chiến lược Tham lam:
Tại mỗi bước, thuật toán luôn chọn đỉnh chưa thăm có khoảng cách ngắn nhất tính từ gốc để nới rộng các cạnh kề.
Bằng cách sử dụng Hàng đợi ưu tiên (Min-Heap / 'std::priority_queue'), việc tìm đỉnh nhỏ nhất chỉ tốn O(log V).
Dạng đặc biệt 0-1 BFS:
Khi trọng số các cạnh chỉ có thể là 0 hoặc 1, ta không cần Priority Queue (O(log V)), mà có thể dùng 'std::deque' hai đầu: Cạnh trọng số 0 đẩy vào ĐẦU deque (push_front), cạnh trọng số 1 đẩy vào CUỐI deque (push_back). Độ phức tạp giảm về đúng O(V + E) như BFS thông thường!`,
        timeComplexity: "O((V + E) log V) cho Dijkstra chuẩn; O(V + E) cho 0-1 BFS.",
        spaceComplexity: "O(V + E) lưu danh sách kề và mảng khoảng cách.",
        pitfalls: [
          "Dijkstra KHÔNG ĐÚNG trên đồ thị có trọng số âm! (Gặp trọng số âm phải dùng Bellman-Ford hoặc SPFA).",
          "Quên điều kiện 'if (d > dist[u]) continue;' khiến lặp lại các trạng thái cũ trong Priority Queue, đẩy độ phức tạp lên thành hàm mũ.",
          "Khoảng cách đường đi có thể vượt quá kiểu int 32-bit, mảng dist[] bắt buộc phải là 'long long'."
        ],
        cppTemplate: `#include <iostream>
#include <vector>
#include <queue>

using namespace std;

const long long INF = 1e18;

struct Edge {
    int to;
    long long weight;
};

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    
    int n, m, start_node;
    if (!(cin >> n >> m >> start_node)) return 0;
    
    vector<vector<Edge>> adj(n + 1);
    for (int i = 0; i < m; ++i) {
        int u, v;
        long long w;
        cin >> u >> v >> w;
        adj[u].push_back({v, w});
        adj[v].push_back({u, w}); // Đồ thị vô hướng
    }
    
    vector<long long> dist(n + 1, INF);
    // Min-heap lưu cặp {khoảng_cách, đỉnh}
    priority_queue<pair<long long, int>, 
                   vector<pair<long long, int>>, 
                   greater<pair<long long, int>>> pq;
    
    dist[start_node] = 0;
    pq.push({0, start_node});
    
    while (!pq.empty()) {
        auto [d, u] = pq.top();
        pq.pop();
        
        // Bỏ qua trạng thái đã lỗi thời
        if (d > dist[u]) continue;
        
        for (const auto &edge : adj[u]) {
            int v = edge.to;
            long long w = edge.weight;
            
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                pq.push({dist[v], v});
            }
        }
    }
    
    for (int i = 1; i <= n; ++i) {
        cout << "dist(" << i << ") = " << (dist[i] == INF ? -1 : dist[i]) << "\\n";
    }
    return 0;
}`,
        marisaUrl: "https://marisaoj.com/roadmap",
        marisaProblems: [
          { code: "150", name: "Đường đi ngắn nhất Dijkstra", difficulty: "Trung bình", link: "https://marisaoj.com/problem/150" }
        ],
        icpcTips: "Cú pháp C++17 Structured Binding 'auto [d, u] = pq.top()' giúp code ngắn hơn và ít nhầm lẫn hơn so với 'top().first' và 'top().second'."
      },
      {
        id: "topo-dag",
        title: "Sắp Xếp Tô-pô & Quy Hoạch Động Trên DAG",
        category: "Đồ thị",
        difficulty: 4,
        shortDesc: "Sắp đặt thứ tự thực hiện công việc và tính toán đường đi trên đồ thị có hướng không chu trình.",
        intuition: `Sắp xếp Tô-pô (Topological Sort) áp dụng trên Đồ thị có hướng không có chu trình (Directed Acyclic Graph - DAG).
Một thứ tự tô-pô là sự sắp xếp tuyến tính các đỉnh sao cho với mọi cung có hướng từ u đến v, đỉnh u luôn xuất hiện TRƯỚC đỉnh v.
Hai cách cài đặt:
1. Thuật toán Kahn: Dựa trên bán bậc vào (In-degree). Đẩy các đỉnh có in_degree = 0 vào hàng đợi, xóa dần các cạnh kề. Nếu số đỉnh lấy ra < N thì đồ thị chứa chu trình!
2. DFS dựa trên thời điểm hoàn thành (Exit Time).
Ứng dụng: Khi một đồ thị là DAG, ta có thể giải quyết các bài toán Quy hoạch động đường đi dài nhất, số cách đi một cách dễ dàng theo thứ tự tô-pô mà không sợ bị lặp vô tận!`,
        timeComplexity: "O(V + E) tuyến tính.",
        spaceComplexity: "O(V + E) lưu đồ thị và mảng in_degree.",
        pitfalls: [
          "Áp dụng tô-pô lên đồ thị có chứa chu trình: Thuật toán sẽ không thể duyệt hết N đỉnh.",
          "Nhầm lẫn giữa bậc vào (in-degree) và bậc ra (out-degree)."
        ],
        cppTemplate: `#include <iostream>
#include <vector>
#include <queue>

using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    
    int n, m;
    if (!(cin >> n >> m)) return 0;
    
    vector<vector<int>> adj(n + 1);
    vector<int> in_degree(n + 1, 0);
    
    for (int i = 0; i < m; ++i) {
        int u, v;
        cin >> u >> v;
        adj[u].push_back(v);
        in_degree[v]++;
    }
    
    queue<int> q;
    for (int i = 1; i <= n; ++i) {
        if (in_degree[i] == 0) q.push(i);
    }
    
    vector<int> topo_order;
    while (!q.empty()) {
        int u = q.front();
        q.pop();
        topo_order.push_back(u);
        
        for (int v : adj[u]) {
            in_degree[v]--;
            if (in_degree[v] == 0) q.push(v);
        }
    }
    
    if ((int)topo_order.size() < n) {
        cout << "Do thi chua chu trinh (IMPOSSIBLE)\\n";
    } else {
        for (int x : topo_order) cout << x << " ";
        cout << "\\n";
    }
    return 0;
}`,
        marisaUrl: "https://marisaoj.com/roadmap",
        marisaProblems: [
          { code: "155", name: "Sắp xếp Tô-pô", difficulty: "Trung bình", link: "https://marisaoj.com/problem/155" }
        ],
        icpcTips: "Mọi bài toán đường đi dài nhất (Longest Path) nói chung là bài toán NP-hard, NHƯNG trên đồ thị DAG thì lại giải được trong O(V + E) bằng DP theo thứ tự Tô-pô."
      },
      {
        id: "segment-tree",
        title: "Cây Phân Đoạn (Segment Tree - Point Update, Range Query)",
        category: "Cấu trúc dữ liệu cây",
        difficulty: 4,
        shortDesc: "Cấu trúc dữ liệu tối thượng cho phép cập nhật 1 phần tử và truy vấn đoạn $[L, R]$ trong $\\mathcal{O}(\\log N)$.",
        intuition: `Segment Tree là một cây nhị phân đầy đủ mà mỗi nút đại diện cho một đoạn con $[L, R]$ của mảng:
- Nút gốc đại diện cho cả mảng $[1, N]$.
- Nút con trái đại diện cho nửa đầu $[L, \\text{Mid}]$.
- Nút con phải đại diện cho nửa sau $[\\text{Mid} + 1, R]$.
- Các nút lá đại diện cho các phần tử đơn lẻ $[i, i]$.
Khi cần tính tổng, min, max, hoặc gcd trên đoạn $[u, v]$, ta chỉ cần ghé thăm tối đa $4$ nút ở mỗi tầng của cây, do đó chỉ mất $\\mathcal{O}(\\log N)$ thời gian!
Cập nhật một phần tử cũng chỉ đi theo một nhánh từ lá lên gốc, tốn đúng $\\mathcal{O}(\\log N)$.
Quy ước kích thước mảng cây: Kích thước mảng phẳng 'tree[4 * N]' để đảm bảo không bao giờ tràn bộ nhớ.`,
        timeComplexity: "$\\mathcal{O}(N)$ dựng cây ban đầu; $\\mathcal{O}(\\log N)$ cho mỗi thao tác Update hoặc Query.",
        spaceComplexity: "$\\mathcal{O}(4N)$ bộ nhớ mảng phẳng.",
        pitfalls: [
          "Khai báo kích thước mảng cây nhỏ hơn 4 * N dẫn đến lỗi Runtime Error (Out of Bounds).",
          "Thao tác kết hợp (Merge function) không có tính kết hợp (Associativity).",
          "Giá trị trả về khi đoạn [L, R] nằm hoàn toàn ngoài phạm vi truy vấn (Identity element: 0 với phép cộng, INF với phép tìm min, -INF với phép tìm max)."
        ],
        cppTemplate: `#include <iostream>
#include <vector>

using namespace std;

struct SegmentTree {
    int n;
    vector<long long> tree;
    
    SegmentTree(int n) : n(n), tree(4 * n + 5, 0) {}
    
    void build(const vector<long long> &a, int node, int l, int r) {
        if (l == r) {
            tree[node] = a[l];
            return;
        }
        int mid = l + (r - l) / 2;
        build(a, 2 * node, l, mid);
        build(a, 2 * node + 1, mid + 1, r);
        tree[node] = tree[2 * node] + tree[2 * node + 1];
    }
    
    // Cập nhật điểm: a[pos] = val
    void update(int node, int l, int r, int pos, long long val) {
        if (l == r) {
            tree[node] = val;
            return;
        }
        int mid = l + (r - l) / 2;
        if (pos <= mid) update(2 * node, l, mid, pos, val);
        else update(2 * node + 1, mid + 1, r, pos, val);
        tree[node] = tree[2 * node] + tree[2 * node + 1];
    }
    
    // Truy vấn tổng đoạn [ql, qr]
    long long query(int node, int l, int r, int ql, int qr) {
        if (ql > r || qr < l) return 0; // Ngoài phạm vi
        if (ql <= l && r <= qr) return tree[node]; // Nằm trọn bên trong
        int mid = l + (r - l) / 2;
        return query(2 * node, l, mid, ql, qr) + query(2 * node + 1, mid + 1, r, ql, qr);
    }
};

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    
    int n = 5;
    vector<long long> a = {0, 1, 3, 5, 7, 9}; // 1-indexed
    SegmentTree st(n);
    st.build(a, 1, 1, n);
    
    cout << "Tong doan [2, 4]: " << st.query(1, 1, n, 2, 4) << "\\n"; // 3 + 5 + 7 = 15
    st.update(1, 1, n, 3, 10); // Đổi a[3] từ 5 thành 10
    cout << "Sau cap nhat: " << st.query(1, 1, n, 2, 4) << "\\n"; // 3 + 10 + 7 = 20
    return 0;
}`,
        marisaUrl: "https://marisaoj.com/roadmap",
        marisaProblems: [
          { code: "160", name: "Truy vấn tổng đoạn Segment Tree", difficulty: "Trung bình", link: "https://marisaoj.com/problem/160" }
        ],
        icpcTips: "Cài đặt Segment Tree theo dạng struct gọn gàng giúp bạn dễ dàng nhân bản nhiều cây trong một bài toán phức tạp mà không sợ nhầm tên biến."
      },
      {
        id: "fenwick-bit",
        title: "Cây Chỉ Số Nhị Phân Fenwick Tree (Binary Indexed Tree - BIT)",
        category: "Cấu trúc dữ liệu cây",
        difficulty: 4,
        shortDesc: "Cấu trúc dữ liệu siêu gọn nhẹ, chỉ tốn N ô nhớ và nhanh gấp 3 lần Segment Tree.",
        intuition: `Fenwick Tree (BIT) được phát minh bởi Peter Fenwick năm 1994, là một tuyệt phẩm của đại số nhị phân:
Ý tưởng cốt lõi: Mỗi số nguyên i có thể phân tích thành tổng các lũy thừa của 2. Nút 'i' trong mảng BIT sẽ quản lý một đoạn có độ dài đúng bằng 'lowbit(i) = i & (-i)' kết thúc tại i!
- Phép toán 'i & (-i)' cô lập bit 1 nhỏ nhất của i trong đúng 1 chu kỳ máy.
- Cập nhật phần tử: 'for (; i <= n; i += i & -i) bit[i] += val;' (Đi lên các nút cha quản lý nó).
- Tính tổng tiền tố: 'for (; i > 0; i -= i & -i) sum += bit[i];' (Cộng dồn các khoảng con rời rạc).
Toàn bộ cấu trúc chỉ gói gọn trong khoảng 15 dòng code, bộ nhớ chỉ đúng N phần tử (thay vì 4N như Segment Tree), cache locality cực cao!`,
        timeComplexity: "O(log N) cho cả Update và Query tiền tố.",
        spaceComplexity: "O(N) bộ nhớ, cực kỳ tiết kiệm.",
        pitfalls: [
          "Fenwick Tree BẮT BUỘC phải dùng chỉ số 1-indexed! Nếu gọi với i = 0 thì '0 & (-0) = 0', vòng lặp sẽ chạy vô hạn và treo chương trình.",
          "Fenwick Tree nguyên bản không hỗ trợ tốt phép tìm Min/Max tổng quát trên đoạn bất kỳ [L, R] (nếu cần Min/Max đoạn hãy dùng Segment Tree)."
        ],
        cppTemplate: `#include <iostream>
#include <vector>

using namespace std;

struct FenwickTree {
    int n;
    vector<long long> bit;
    
    FenwickTree(int n) : n(n), bit(n + 1, 0) {}
    
    // Cộng thêm delta vào phần tử tại vị trí idx (1-indexed)
    void add(int idx, long long delta) {
        for (; idx <= n; idx += idx & -idx) {
            bit[idx] += delta;
        }
    }
    
    // Tính tổng tiền tố từ 1 đến idx
    long long query(int idx) {
        long long sum = 0;
        for (; idx > 0; idx -= idx & -idx) {
            sum += bit[idx];
        }
        return sum;
    }
    
    // Tổng đoạn [l, r]
    long long queryRange(int l, int r) {
        return query(r) - query(l - 1);
    }
};

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    
    int n = 6;
    FenwickTree ft(n);
    ft.add(1, 5);
    ft.add(3, 2);
    ft.add(4, 8);
    
    cout << "Tong doan [1, 3]: " << ft.queryRange(1, 3) << "\\n"; // 5 + 2 = 7
    cout << "Tong doan [2, 4]: " << ft.queryRange(2, 4) << "\\n"; // 2 + 8 = 10
    return 0;
}`,
        marisaUrl: "https://marisaoj.com/roadmap",
        marisaProblems: [
          { code: "165", name: "Fenwick Tree cơ bản", difficulty: "Trung bình", link: "https://marisaoj.com/problem/165" }
        ],
        icpcTips: "Fenwick Tree kết hợp với Rời rạc hóa (Coordinate Compression) là cách kinh điển nhất để giải bài toán Đếm số cặp nghịch thế (Inversion Count) trong O(N log N)."
      },
      {
        id: "sparse-table",
        title: "Bảng Thưa Sparse Table & Range Minimum Query (RMQ)",
        category: "Cấu trúc dữ liệu tĩnh",
        difficulty: 4,
        shortDesc: "Trả lời truy vấn Range Minimum Query trên mảng tĩnh trong thời gian siêu tưởng O(1).",
        intuition: `Khi mảng dữ liệu KHÔNG CÓ thao tác cập nhật (Static Array) và ta cần trả lời hàng triệu truy vấn tìm Min/Max/GCD trên đoạn [L, R], Sparse Table là giải pháp vô địch:
Ý tưởng: Mọi độ dài đoạn đều có thể phủ bằng hai khoảng có độ dài lũy thừa của 2 gối lên nhau:
  Đoạn [L, R] có độ dài Len = R - L + 1. Đặt k = log2(Len).
  Hai đoạn con [L, L + 2^k - 1] và [R - 2^k + 1, R] chắc chắn bao phủ trọn vẹn đoạn [L, R]!
Vì phép toán 'min(x, y)' có tính chất Lũy đọng (Idempotent: min(x, x) = x), nên việc hai đoạn con bị chồng lấn (overlap) không hề làm sai kết quả!
Do đó ta chỉ mất đúng 1 phép tính so sánh O(1) để có kết quả!`,
        timeComplexity: "O(N log N) tiền xử lý bảng thưa; O(1) tuyệt đối cho mỗi truy vấn RMQ.",
        spaceComplexity: "O(N log N) bộ nhớ ma trận.",
        pitfalls: [
          "Chỉ áp dụng được cho các phép toán có tính lũy đọng (Idempotent: Min, Max, GCD). Với phép TỔNG (Sum) không áp dụng được O(1) theo cách này mà mất O(log N).",
          "Kích thước mảng: Cột thứ hai của bảng thưa cần kích thước khoảng log2(N) + 1 ≈ 22."
        ],
        cppTemplate: `#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

const int MAXN = 200005;
const int LOG = 20;

int st[MAXN][LOG];
int lg[MAXN];

void buildSparseTable(const vector<int> &a, int n) {
    // Tiền xử lý hàm log2
    lg[1] = 0;
    for (int i = 2; i <= n; ++i) lg[i] = lg[i / 2] + 1;
    
    for (int i = 0; i < n; ++i) st[i][0] = a[i];
    
    for (int j = 1; j < LOG; ++j) {
        for (int i = 0; i + (1 << j) <= n; ++i) {
            st[i][j] = min(st[i][j - 1], st[i + (1 << (j - 1))][j - 1]);
        }
    }
}

// Truy vấn Min trong đoạn [l, r] (0-indexed) trong O(1)
int queryMin(int l, int r) {
    int len = r - l + 1;
    int k = lg[len];
    return min(st[l][k], st[r - (1 << k) + 1][k]);
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    
    vector<int> a = {4, 6, 1, 5, 7, 3};
    buildSparseTable(a, a.size());
    
    cout << "Min doan [1, 4] (tu 6 den 7): " << queryMin(1, 4) << "\\n"; // 1
    return 0;
}`,
        marisaUrl: "https://marisaoj.com/roadmap",
        marisaProblems: [
          { code: "170", name: "Bảng thưa RMQ", difficulty: "Trung bình", link: "https://marisaoj.com/problem/170" }
        ],
        icpcTips: "Sparse Table kết hợp với Euler Tour của cây là một trong những cách tính LCA trong O(1) mỗi truy vấn nhanh nhất thế giới."
      },
      {
        id: "lca-binary-lifting",
        title: "Tổ Tiên Chung Gần Nhất (LCA - Binary Lifting)",
        category: "Cấu trúc dữ liệu cây",
        difficulty: 4,
        shortDesc: "Tìm tổ tiên chung gần nhất của hai đỉnh trên cây trong O(log N) bằng bước nhảy nhị phân.",
        intuition: `Tổ tiên chung gần nhất (Lowest Common Ancestor - LCA) của 2 đỉnh u và v là đỉnh sâu nhất trên cây vừa là tổ tiên của u vừa là tổ tiên của v.
Kỹ thuật Nhảy nhị phân (Binary Lifting):
Thay vì nhảy từng bước một lên cha 'up[u] = parent[u]' mất O(N), ta tiền xử lý mảng:
  'up[u][k]' = tổ tiên thứ 2^k của đỉnh u!
Công thức truy hồi tuyệt đẹp:
  'up[u][k] = up[ up[u][k - 1] ][k - 1]'
(Để nhảy 2^k bước, ta nhảy 2^(k-1) bước rồi từ vị trí đó nhảy tiếp 2^(k-1) bước nữa!).
Khi truy vấn LCA(u, v):
1. Đưa u và v về cùng độ sâu (Depth).
2. Thử nhảy các bước lớn 2^k giảm dần: Nếu tổ tiên thứ 2^k của u và v KHÁC NHAU, ta cùng nhảy u và v lên tầng đó. Cuối cùng, LCA chính là cha của u!`,
        timeComplexity: "O(N log N) tiền xử lý bảng nhảy; O(log N) cho mỗi truy vấn LCA.",
        spaceComplexity: "O(N log N) lưu trữ bảng up[N][LOG].",
        pitfalls: [
          "Không đưa hai đỉnh về cùng độ sâu trước khi thực hiện bước nhảy đồng thời.",
          "Chỉ số tầng LOG không đủ lớn (ví dụ N = 2*10^5 cần LOG = 18 hoặc 19)."
        ],
        cppTemplate: `#include <iostream>
#include <vector>

using namespace std;

const int MAXN = 200005;
const int LOG = 19;

vector<int> adj[MAXN];
int up[MAXN][LOG];
int depth[MAXN];

void dfs(int u, int p, int d) {
    depth[u] = d;
    up[u][0] = p; // Tổ tiên bậc 2^0 = 1 (chính là cha)
    for (int j = 1; j < LOG; ++j) {
        up[u][j] = up[ up[u][j - 1] ][j - 1];
    }
    
    for (int v : adj[u]) {
        if (v != p) dfs(v, u, d + 1);
    }
}

int getLCA(int u, int v) {
    if (depth[u] < depth[v]) swap(u, v);
    
    // 1. Nhảy u lên cùng độ sâu với v
    int diff = depth[u] - depth[v];
    for (int j = 0; j < LOG; ++j) {
        if ((diff >> j) & 1) u = up[u][j];
    }
    
    if (u == v) return u;
    
    // 2. Nhảy đồng thời u và v
    for (int j = LOG - 1; j >= 0; --j) {
        if (up[u][j] != up[v][j]) {
            u = up[u][j];
            v = up[v][j];
        }
    }
    return up[u][0]; // Cha trực tiếp của u
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    // Code minh họa cấu trúc LCA Binary Lifting
    return 0;
}`,
        marisaUrl: "https://marisaoj.com/roadmap",
        marisaProblems: [
          { code: "175", name: "Tổ tiên chung gần nhất", difficulty: "Khó", link: "https://marisaoj.com/problem/175" }
        ],
        icpcTips: "Khoảng cách giữa hai đỉnh u và v trên cây được tính ngay bằng công thức: dist(u, v) = depth[u] + depth[v] - 2 * depth[LCA(u, v)]."
      },
      {
        id: "string-hashing",
        title: "Băm Chuỗi Đa Thức (Polynomial Rolling Hash)",
        category: "Thuật toán chuỗi",
        difficulty: 4,
        shortDesc: "So sánh hai đoạn chuỗi bất kỳ có giống nhau không trong O(1) với xác suất đụng độ cực thấp.",
        intuition: `So sánh hai chuỗi con độ dài L theo cách thông thường tốn O(L). Nếu làm nhiều lần sẽ bị TLE.
Ý tưởng mã hóa băm: Ta ánh xạ mỗi chuỗi thành một số nguyên lớn dựa trên đa thức cơ số Base:
  Hash(S) = (S[0]*Base^(L-1) + S[1]*Base^(L-2) + ... + S[L-1]) mod MOD.
Nhờ tiền xử lý mảng 'hash_pref[i]' và lũy thừa 'pow_base[i]', mã băm của bất kỳ đoạn con S[L..R] nào đều được trích xuất trong O(1):
  SubHash(L, R) = (hash_pref[R] - hash_pref[L-1] * Base^(R - L + 1)) mod MOD!
Để tránh bị sinh test đối nghịch (Hash Collision Hacking), trong thi đấu ta luôn dùng Băm kép (Double Hashing) với 2 modulo nguyên tố khác nhau (ví dụ MOD1 = 10^9 + 7, MOD2 = 10^9 + 9) hoặc MOD 64-bit tự nhiên.`,
        timeComplexity: "O(|S|) tiền xử lý mảng băm; O(1) so sánh hai xâu con bất kỳ.",
        spaceComplexity: "O(|S|) lưu mảng hash và mảng lũy thừa.",
        pitfalls: [
          "Bị tràn số âm khi trừ trong modulo: Luôn cộng thêm MOD trước khi chia lấy dư: '(val % MOD + MOD) % MOD'.",
          "Chỉ dùng 1 modulo 10^9 + 7 rất dễ bị hacker trên Codeforces tạo anti-hash test đánh rớt (FST). Hãy dùng Double Hash hoặc chọn Base ngẫu nhiên bằng 'mt19937'."
        ],
        cppTemplate: `#include <iostream>
#include <string>
#include <vector>

using namespace std;

const int BASE = 311;
const long long MOD = 1e9 + 7;

struct StringHash {
    int n;
    vector<long long> h, p;
    
    StringHash(const string &s) {
        n = s.length();
        h.assign(n + 1, 0);
        p.assign(n + 1, 1);
        
        for (int i = 0; i < n; ++i) {
            p[i + 1] = (p[i] * BASE) % MOD;
            h[i + 1] = (h[i] * BASE + s[i]) % MOD;
        }
    }
    
    // Lấy mã băm đoạn con [l, r] (0-indexed)
    long long getHash(int l, int r) {
        long long res = (h[r + 1] - h[l] * p[r - l + 1]) % MOD;
        return (res + MOD) % MOD;
    }
};

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    
    string s = "marisaojmarisa";
    StringHash sh(s);
    
    // So sánh "marisa" ở vị trí 0..5 và vị trí 8..13
    long long h1 = sh.getHash(0, 5);
    long long h2 = sh.getHash(8, 13);
    
    cout << "Hai doan giong nhau: " << (h1 == h2 ? "DUNG" : "SAI") << "\\n";
    return 0;
}`,
        marisaUrl: "https://marisaoj.com/roadmap",
        marisaProblems: [
          { code: "180", name: "Tìm kiếm chuỗi bằng Hash", difficulty: "Trung bình", link: "https://marisaoj.com/problem/180" }
        ],
        icpcTips: "Sử dụng 'mt19937 rng(chrono::steady_clock::now().time_since_epoch().count())' để sinh ngẫu nhiên số BASE giữa 300 và 10^6 để đảm bảo 100% không thể bị hack test."
      },
      {
        id: "bitmask-dp",
        title: "Quy Hoạch Động Trạng Thái Bitmask (Bitmask DP)",
        category: "Quy hoạch động",
        difficulty: 4,
        shortDesc: "Giải quyết các bài toán NP-hard như Người du lịch (TSP) trên tập hợp nhỏ N <= 20 trong O(2^N * N).",
        intuition: `Khi bài toán yêu cầu tìm thứ tự ghé thăm mọi đỉnh đúng 1 lần với chi phí nhỏ nhất (Traveling Salesperson Problem - TSP), vét cạn N! sẽ TLE khi N > 11.
Bằng Quy hoạch động Bitmask:
Ta định nghĩa trạng thái: 'dp[mask][u]' = chi phí nhỏ nhất để đã thăm tập hợp các đỉnh trong 'mask' và hiện đang đứng tại đỉnh 'u'.
Chuyển trạng thái:
Từ đỉnh u, ta thử đi sang đỉnh v chưa có trong mask:
  new_mask = mask | (1 << v)
  dp[new_mask][v] = min(dp[new_mask][v], dp[mask][u] + cost[u][v]).
Số trạng thái là 2^N * N, mỗi trạng thái chuyển trong O(N). Tổng độ phức tạp là O(2^N * N^2) - giải quyết dễ dàng với N <= 20!`,
        timeComplexity: "O(2^N * N^2) cho TSP; O(2^N * N) cho bài toán phủ tập hợp.",
        spaceComplexity: "O(2^N * N) bảng DP.",
        pitfalls: [
          "Khai báo mảng DP với N > 22 sẽ gây tràn bộ nhớ RAM (2^22 * 22 * 4 bytes > 350MB).",
          "Thứ tự vòng lặp: Phải duyệt 'mask' từ 0 đến (1 << n) - 1 để đảm bảo các tập con nhỏ hơn luôn được tính toán trước."
        ],
        cppTemplate: `#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

const int INF = 1e9;
int n;
int dist_mat[20][20];
int dp[1 << 16][16];

int solveTSP() {
    int total_masks = 1 << n;
    for (int mask = 0; mask < total_masks; ++mask) {
        for (int i = 0; i < n; ++i) dp[mask][i] = INF;
    }
    
    dp[1][0] = 0; // Xuất phát từ đỉnh 0 (mask chỉ có bit 0 bật)
    
    for (int mask = 1; mask < total_masks; ++mask) {
        for (int u = 0; u < n; ++u) {
            if (dp[mask][u] == INF) continue;
            
            for (int v = 0; v < n; ++v) {
                if (!((mask >> v) & 1)) { // Nếu đỉnh v chưa thăm
                    int next_mask = mask | (1 << v);
                    dp[next_mask][v] = min(dp[next_mask][v], dp[mask][u] + dist_mat[u][v]);
                }
            }
        }
    }
    
    int ans = INF;
    for (int i = 0; i < n; ++i) {
        ans = min(ans, dp[total_masks - 1][i] + dist_mat[i][0]); // Quay về 0
    }
    return ans;
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    // Minh họa TSP Bitmask DP
    return 0;
}`,
        marisaUrl: "https://marisaoj.com/roadmap",
        marisaProblems: [
          { code: "185", name: "Bài toán Người du lịch TSP", difficulty: "Khó", link: "https://marisaoj.com/problem/185" }
        ],
        icpcTips: "Kỹ thuật Bitmask DP là nền tảng để bước lên SOS DP (Sum Over Subsets DP) và Fast Walsh-Hadamard Transform."
      }
    ]
  },
  {
    id: "level-5",
    levelNumber: 5,
    title: "Level 5: Advanced Techniques",
    vietnameseTitle: "Kỹ Thuật Nâng Cao & Tối Ưu Giải Thuật",
    tagline: "Tiếp cận đỉnh cao: Phân rã căn (Sqrt / Mo), Segment Tree Lazy, HLD và Tarjan SCC",
    targetAudience: "Học sinh chuyên Tin săn giải Nhất/Nhì HSG Quốc Gia, Đội tuyển ICPC Châu Á",
    estimatedTime: "80 - 120 giờ",
    difficultyStars: 5,
    accentColor: "#152E54",
    marisaUrl: "https://marisaoj.com/roadmap",
    description: "Các bài toán tại cấp độ này đòi hỏi sự kết hợp nhuần nhuyễn của nhiều kỹ thuật cùng lúc. Nắm vững phân rã đồ thị thành các thành phần liên thông mạnh SCC, kỹ thuật cập nhật đoạn Lazy Propagation, Heavy-Light Decomposition trên cây và thuật toán Mo phân căn chia để trị.",
    topics: [
      {
        id: "sqrt-decomp-mo",
        title: "Phân Căn & Thuật Toán Mo (Sqrt Decomposition & Mo's Algorithm)",
        category: "Kỹ thuật phân căn",
        difficulty: 5,
        shortDesc: "Xử lý hàng vạn truy vấn Offline trên đoạn [L, R] với thời gian O((N + Q) * sqrt(N)).",
        intuition: `Thuật toán Mo là một tuyệt chiêu xử lý Offline:
Nếu ta sắp xếp lại thứ tự trả lời các truy vấn một cách thông minh, ta có thể duy trì hai con trỏ [curL, curR] dịch chuyển dần từ truy vấn này sang truy vấn khác với tổng số bước cực nhỏ!
Quy tắc sắp xếp của Mo:
Chia mảng thành các khối (blocks) kích thước B = sqrt(N).
Một truy vấn [L, R] được sắp xếp theo:
1. Chỉ số khối của L: 'L / B' tăng dần.
2. Nếu cùng khối L, sắp xếp theo R tăng dần!
Khi đó:
- Con trỏ R chỉ tăng dần trong mỗi block của L, tổng số bước di chuyển của R là Q * (N / B).
- Con trỏ L chỉ dao động bên trong một block kích thước B, mỗi truy vấn tốn B bước.
Tổng thời gian di chuyển: O(Q * B + (N / B) * N). Chọn B = N / sqrt(Q) thì tổng chi phí đạt cực tiểu O(N * sqrt(Q))!`,
        timeComplexity: "O((N + Q) * sqrt(N)) tổng cộng cho toàn bộ Q truy vấn.",
        spaceComplexity: "O(N + Q) lưu danh sách truy vấn và mảng đếm.",
        pitfalls: [
          "Thuật toán Mo thuần túy chỉ dùng được khi KHÔNG CÓ thao tác sửa đổi mảng (Chỉ có truy vấn hỏi Offline).",
          "Tối ưu Hilbert Curve: Sắp xếp theo đường cong Hilbert giúp giảm hằng số thời gian chạy của Mo đi gần 2 lần."
        ],
        cppTemplate: `#include <iostream>
#include <vector>
#include <cmath>
#include <algorithm>

using namespace std;

int BLOCK_SIZE;

struct Query {
    int l, r, id;
    bool operator<(const Query &other) const {
        int b1 = l / BLOCK_SIZE;
        int b2 = other.l / BLOCK_SIZE;
        if (b1 != b2) return b1 < b2;
        return (b1 & 1) ? r < other.r : r > other.r; // Tối ưu zig-zag
    }
};

int cnt[1000005];
int current_distinct = 0;

void add(int val) {
    if (cnt[val] == 0) current_distinct++;
    cnt[val]++;
}

void remove(int val) {
    cnt[val]--;
    if (cnt[val] == 0) current_distinct--;
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    // Minh họa khung thuật toán Mo
    return 0;
}`,
        marisaUrl: "https://marisaoj.com/roadmap",
        marisaProblems: [
          { code: "200", name: "Đếm số phần tử phân biệt (Mo's)", difficulty: "Khó", link: "https://marisaoj.com/problem/200" }
        ],
        icpcTips: "Kỹ thuật tối ưu đảo chiều R ở các block lẻ (b1 & 1 ? r < other.r : r > other.r) giúp con trỏ R không phải chạy giật lùi về đầu mảng, tăng tốc 30-40% trong thực tế."
      },
      {
        id: "segment-tree-lazy",
        title: "Segment Tree Cập Nhật Đoạn (Lazy Propagation)",
        category: "Cấu trúc dữ liệu cây",
        difficulty: 5,
        shortDesc: "Cập nhật giá trị trên cả một đoạn [L, R] và truy vấn trong O(log N) bằng cơ chế lười biếng.",
        intuition: `Nếu cập nhật từng phần tử trong đoạn [L, R] bằng Segment Tree cơ bản, ta mất O(K log N) - tương đương O(N log N) khi đoạn dài, hoàn toàn bị TLE!
Kỹ thuật truyền lười (Lazy Propagation):
Khi một đoạn [l, r] của nút hiện tại nằm trọn vẹn bên trong đoạn cần cập nhật [ql, qr], ta:
1. Cập nhật ngay giá trị của nút hiện tại.
2. Lưu một dấu hiệu nợ (lazy tag) tại nút này để biểu thị: 'Các con của ta chưa được cập nhật giá trị này'.
3. KHÔNG ĐI XUỐNG CÁC CON NỮA! Dừng lại ngay lập tức!
Chỉ khi nào trong tương lai có một truy vấn khác buộc ta phải đi xuống các nút con, ta mới 'đẩy nợ' (pushdown) xuống 2 con trực tiếp. Nhờ đó mỗi thao tác cập nhật đoạn vẫn giữ đúng O(log N)!`,
        timeComplexity: "O(log N) cho cả Range Update và Range Query.",
        spaceComplexity: "O(4 * N) mảng cây và mảng lazy.",
        pitfalls: [
          "Quên gọi hàm 'pushdown' trước khi đệ quy xuống các nút con.",
          "Cộng dồn tag lười: Nếu đã có tag cũ thì tag mới phải cộng dồn vào 'lazy[child] += lazy[node]' chứ không được gán đè bừa bãi.",
          "Cập nhật tổng: Giá trị tổng tăng lên một lượng bằng 'lazy * (độ dài đoạn)', quên nhân độ dài đoạn là sai logic."
        ],
        cppTemplate: `#include <iostream>
#include <vector>

using namespace std;

struct LazySegmentTree {
    int n;
    vector<long long> tree, lazy;
    
    LazySegmentTree(int n) : n(n), tree(4 * n, 0), lazy(4 * n, 0) {}
    
    void pushdown(int node, int l, int r) {
        if (lazy[node] == 0) return;
        int mid = l + (r - l) / 2;
        
        // Đẩy xuống con trái
        lazy[2 * node] += lazy[node];
        tree[2 * node] += lazy[node] * (mid - l + 1);
        
        // Đẩy xuống con phải
        lazy[2 * node + 1] += lazy[node];
        tree[2 * node + 1] += lazy[node] * (r - mid);
        
        lazy[node] = 0; // Đã trả hết nợ
    }
    
    void updateRange(int node, int l, int r, int ql, int qr, long long val) {
        if (ql <= l && r <= qr) {
            tree[node] += val * (r - l + 1);
            lazy[node] += val;
            return;
        }
        pushdown(node, l, r);
        int mid = l + (r - l) / 2;
        if (ql <= mid) updateRange(2 * node, l, mid, ql, qr, val);
        if (qr > mid) updateRange(2 * node + 1, mid + 1, r, ql, qr, val);
        tree[node] = tree[2 * node] + tree[2 * node + 1];
    }
    
    long long queryRange(int node, int l, int r, int ql, int qr) {
        if (ql <= l && r <= qr) return tree[node];
        pushdown(node, l, r);
        int mid = l + (r - l) / 2;
        long long res = 0;
        if (ql <= mid) res += queryRange(2 * node, l, mid, ql, qr);
        if (qr > mid) res += queryRange(2 * node + 1, mid + 1, r, ql, qr);
        return res;
    }
};

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    // Minh họa Lazy Segment Tree
    return 0;
}`,
        marisaUrl: "https://marisaoj.com/roadmap",
        marisaProblems: [
          { code: "210", name: "Cập nhật đoạn Segment Tree Lazy", difficulty: "Khó", link: "https://marisaoj.com/problem/210" }
        ],
        icpcTips: "Cẩn thận với bài toán vừa có gán giá trị (= X) vừa có cộng dồn (+= X). Cần quy ước độ ưu tiên rõ ràng giữa hai loại tag lười."
      },
      {
        id: "tarjan-scc-bridges",
        title: "Khớp, Cầu & Thành Phần Liên Thông Mạnh (Tarjan SCC)",
        category: "Đồ thị nâng cao",
        difficulty: 5,
        shortDesc: "Phát hiện khớp - cầu trên đồ thị vô hướng và nén chu trình có hướng thành DAG chỉ trong 1 lần DFS O(V + E).",
        intuition: `Robert Tarjan đã tạo ra một trong những thuật toán đẹp nhất lịch sử khoa học máy tính:
Trong một lần duyệt DFS duy nhất, ta gán cho mỗi đỉnh 2 chỉ số:
- 'num[u]': Thứ tự thăm đỉnh u trong cây DFS.
- 'low[u]': Thứ tự thăm nhỏ nhất của một đỉnh có thể đi tới từ cây con gốc u bằng tối đa 1 cạnh ngược.
Ý nghĩa định lý:
- Cạnh (u, v) là CẦU khi và chỉ khi: 'low[v] > num[u]' (Không có đường nào từ cây con v đi vòng lên trên u được).
- Đỉnh u là KHỚP khi và chỉ khi u có con v thỏa mãn 'low[v] >= num[u]' (với gốc cây cần ít nhất 2 nhánh con).
- Thành phần liên thông mạnh (SCC) trong đồ thị có hướng: Khi 'low[u] == num[u]', toàn bộ các đỉnh trong stack tính từ u trở đi tạo thành một SCC độc lập! Nén các SCC này lại, ta biến mọi đồ thị có hướng phức tạp thành một đồ thị DAG thuần khiết.`,
        timeComplexity: "O(V + E) chính xác trong duy nhất 1 lần duyệt DFS.",
        spaceComplexity: "O(V + E) lưu trữ đồ thị và stack.",
        pitfalls: [
          "Đồ thị có cạnh song song: Khi kiểm tra khớp-cầu phải truyền chỉ số cạnh (edge index) thay vì chỉ truyền 'parent node' để tránh nhầm cạnh song song với cạnh đi ngược về cha.",
          "Với SCC: Chỉ cập nhật 'low[u] = min(low[u], num[v])' nếu đỉnh v VẪN CÒN NẰM TRONG STACK (đang thuộc cùng nhánh liên thông mạnh)."
        ],
        cppTemplate: `#include <iostream>
#include <vector>
#include <stack>

using namespace std;

int n, m, timer = 0, scc_count = 0;
vector<vector<int>> adj;
vector<int> num, low;
vector<bool> in_stack;
stack<int> st;

void dfs_scc(int u) {
    num[u] = low[u] = ++timer;
    st.push(u);
    in_stack[u] = true;
    
    for (int v : adj[u]) {
        if (!num[v]) {
            dfs_scc(v);
            low[u] = min(low[u], low[v]);
        } else if (in_stack[v]) {
            low[u] = min(low[u], num[v]);
        }
    }
    
    if (low[u] == num[u]) {
        scc_count++;
        while (true) {
            int v = st.top();
            st.pop();
            in_stack[v] = false;
            if (u == v) break;
        }
    }
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    // Minh họa Tarjan SCC
    return 0;
}`,
        marisaUrl: "https://marisaoj.com/roadmap",
        marisaProblems: [
          { code: "220", name: "Tìm thành phần liên thông mạnh", difficulty: "Khó", link: "https://marisaoj.com/problem/220" },
          { code: "221", name: "Tìm Khớp và Cầu", difficulty: "Khó", link: "https://marisaoj.com/problem/221" }
        ],
        icpcTips: "Nén đồ thị thành SCC là bước bắt buộc đầu tiên trong mọi bài toán giải hệ mệnh đề 2-SAT (2-Satisfiability)."
      },
      {
        id: "heavy-light-decomp",
        title: "Phân Rã Cây Chuỗi Nặng-Nhẹ (Heavy-Light Decomposition - HLD)",
        category: "Cấu trúc dữ liệu cây",
        difficulty: 5,
        shortDesc: "Biến đổi cây thành các đoạn thẳng liên tục để áp dụng Segment Tree trên đường đi u -> v trong O(log^2 N).",
        intuition: `Làm sao để cập nhật giá trị các đỉnh trên đường đi ngắn nhất giữa hai đỉnh u và v bất kỳ trên cây?
HLD chia các cạnh của cây thành 2 loại:
- Cạnh nặng (Heavy Edge): Cạnh nối cha với đỉnh con có kích thước cây con LỚN NHẤT.
- Cạnh nhẹ (Light Edge): Tất cả các cạnh còn lại.
Các cạnh nặng liên tiếp ghép lại tạo thành các 'Chuỗi nặng' (Heavy Chains).
Tính chất toán học vi diệu:
Trên bất kỳ đường đi nào từ gốc tới một đỉnh lá, ta chỉ đi qua tối đa log2(N) cạnh nhẹ!
Bằng cách đánh lại chỉ số đỉnh theo thứ tự DFS sao cho mỗi chuỗi nặng nằm trên một đoạn chỉ số LIÊN TỤC, ta có thể đặt một chiếc Cây phân đoạn (Segment Tree) lên toàn bộ cây.
Khi cần truy vấn đường đi u -> v, ta chỉ cần nhảy qua tối đa O(log N) chuỗi nặng, mỗi chuỗi truy vấn Segment Tree tốn O(log N). Tổng thời gian chỉ là O(log^2 N)!`,
        timeComplexity: "O(log^2 N) cho mỗi truy vấn đường đi u -> v; O(N) tiền xử lý HLD.",
        spaceComplexity: "O(N) bộ nhớ mảng phụ trợ.",
        pitfalls: [
          "Cần 2 lượt DFS: Lượt 1 tính kích thước cây con và tìm con nặng (heavy child); Lượt 2 trải phẳng cây và gán chỉ số chuỗi (head of chain).",
          "Khi u và v nằm trên cùng một chuỗi nặng, nhớ chỉ truy vấn đoạn từ min(pos[u], pos[v]) đến max(pos[u], pos[v])."
        ],
        cppTemplate: `#include <iostream>
#include <vector>

using namespace std;

// Cấu trúc khung HLD chuẩn ICPC
const int MAXN = 100005;
vector<int> adj[MAXN];
int parent_node[MAXN], depth_node[MAXN], heavy[MAXN], head[MAXN], pos[MAXN];
int cur_pos = 0;

int dfs_hld1(int u, int p, int d) {
    int sz = 1, max_c_sz = 0;
    parent_node[u] = p; depth_node[u] = d; heavy[u] = -1;
    for (int v : adj[u]) {
        if (v != p) {
            int c_sz = dfs_hld1(v, u, d + 1);
            sz += c_sz;
            if (c_sz > max_c_sz) {
                max_c_sz = c_sz;
                heavy[u] = v;
            }
        }
    }
    return sz;
}

void dfs_hld2(int u, int h) {
    head[u] = h;
    pos[u] = ++cur_pos;
    if (heavy[u] != -1) dfs_hld2(heavy[u], h); // Ưu tiên đi tiếp chuỗi nặng
    for (int v : adj[u]) {
        if (v != parent_node[u] && v != heavy[u]) {
            dfs_hld2(v, v); // Bắt đầu chuỗi mới
        }
    }
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    // Minh họa khung HLD
    return 0;
}`,
        marisaUrl: "https://marisaoj.com/roadmap",
        marisaProblems: [
          { code: "230", name: "Truy vấn đường đi trên cây HLD", difficulty: "Rất khó", link: "https://marisaoj.com/problem/230" }
        ],
        icpcTips: "HLD là một trong những công cụ uy lực nhất cho bài toán khó về cây trong đề thi ICPC Vòng loại và Vòng Quốc Gia."
      }
    ]
  },
  {
    id: "level-6",
    levelNumber: 6,
    title: "Level 6: Super Advanced",
    vietnameseTitle: "Chuyên Sâu Olympic & ICPC World Finals",
    tagline: "Vươn tới đẳng cấp Master: Luồng cực đại Dinic, Centroid Decomposition, CHT và FFT",
    targetAudience: "Đội tuyển tham dự ICPC World Finals, Thí sinh đội tuyển Quốc tế APIO/IOI",
    estimatedTime: "120+ giờ",
    difficultyStars: 5,
    accentColor: "#0D1E38",
    marisaUrl: "https://marisaoj.com/roadmap",
    description: "Cấp độ tinh hoa dành cho các bài toán siêu hóc búa. Nơi bạn làm chủ Lý thuyết Luồng cực đại mạng (Network Flow), phân rã trọng tâm cây Centroid, biến đổi Fourier nhanh (FFT) và các kỹ thuật tối ưu hóa Quy hoạch động nâng cao.",
    topics: [
      {
        id: "max-flow-dinic",
        title: "Luồng Cực Đại & Lát Cắt Cực Tiểu (Max Flow Dinic Algorithm)",
        category: "Luồng mạng",
        difficulty: 5,
        shortDesc: "Tìm luồng cực đại qua mạng trong O(V^2 * E) bằng đồ thị phân tầng (Level Graph) và DFS chặn luồng.",
        intuition: `Mạng dòng chảy (Flow Network): Một đồ thị có hướng với đỉnh phát S (Source), đỉnh thu T (Sink) và mỗi cạnh có dung lượng (Capacity).
Định lý kinh điển Ford-Fulkerson: Giá trị Luồng cực đại = Giá trị Lát cắt cực tiểu (Max-Flow Min-Cut Theorem).
Thuật toán Dinic vượt trội hoàn toàn:
1. Dùng BFS xây dựng đồ thị phân tầng (Level Graph) - chỉ đi theo các cạnh mà level[v] = level[u] + 1.
2. Dùng DFS tìm các luồng tăng cường chặn (Blocking Flow).
3. Sử dụng kỹ thuật con trỏ hiện tại (Current Arc Optimization) để không duyệt lại các cạnh đã bão hòa.
Đặc biệt: Trên đồ thị mạng đơn vị (Unit Network) hoặc đồ thị hai phía, Dinic chạy với tốc độ kinh ngạc O(E * sqrt(V))!`,
        timeComplexity: "O(V^2 * E) tổng quát; O(E * sqrt(V)) trên đồ thị hai phía.",
        spaceComplexity: "O(V + E) lưu danh sách cạnh và luồng dư.",
        pitfalls: [
          "Quên thêm cạnh ngược với dung lượng ban đầu bằng 0: Mỗi khi đẩy luồng qua cạnh xuôi, dung lượng còn lại của cạnh ngược phải tăng lên tương ứng để cho phép 'hối hận' (Push-back).",
          "Quên kỹ thuật Current Arc khiến độ phức tạp bị thoái hóa về O(V * E^2)."
        ],
        cppTemplate: `#include <iostream>
#include <vector>
#include <queue>
#include <algorithm>

using namespace std;

struct Edge {
    int to;
    long long cap, flow;
    int rev;
};

struct Dinic {
    int n, s, t;
    vector<vector<Edge>> adj;
    vector<int> level, ptr;
    
    Dinic(int n, int s, int t) : n(n), s(s), t(t), adj(n + 1), level(n + 1), ptr(n + 1) {}
    
    void addEdge(int from, int to, long long cap) {
        adj[from].push_back({to, cap, 0, (int)adj[to].size()});
        adj[to].push_back({from, 0, 0, (int)adj[from].size() - 1}); // Cạnh ngược
    }
    
    bool bfs() {
        fill(level.begin(), level.end(), -1);
        level[s] = 0;
        queue<int> q;
        q.push(s);
        while (!q.empty()) {
            int u = q.front(); q.pop();
            for (const auto &e : adj[u]) {
                if (e.cap - e.flow > 0 && level[e.to] == -1) {
                    level[e.to] = level[u] + 1;
                    q.push(e.to);
                }
            }
        }
        return level[t] != -1;
    }
    
    long long dfs(int u, long long pushed) {
        if (pushed == 0 || u == t) return pushed;
        for (int &cid = ptr[u]; cid < (int)adj[u].size(); ++cid) {
            auto &e = adj[u][cid];
            int tr = e.to;
            if (level[u] + 1 != level[tr] || e.cap - e.flow == 0) continue;
            long long tr_pushed = dfs(tr, min(pushed, e.cap - e.flow));
            if (tr_pushed == 0) continue;
            e.flow += tr_pushed;
            adj[tr][e.rev].flow -= tr_pushed;
            return tr_pushed;
        }
        return 0;
    }
    
    long long maxFlow() {
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
    // Minh họa Dinic
    return 0;
}`,
        marisaUrl: "https://marisaoj.com/roadmap",
        marisaProblems: [
          { code: "250", name: "Luồng cực đại trên mạng", difficulty: "Rất khó", link: "https://marisaoj.com/problem/250" }
        ],
        icpcTips: "Rất nhiều bài toán ghép đôi, quy hoạch phân công hoặc bài toán phủ tập hợp thực chất đều quy về tìm Lát cắt cực tiểu (Min-Cut)."
      },
      {
        id: "centroid-decomp",
        title: "Phân Rã Trọng Tâm Cây (Centroid Decomposition)",
        category: "Cấu trúc dữ liệu cây",
        difficulty: 5,
        shortDesc: "Chia để trị trên cây: Tìm trọng tâm chia đôi kích thước cây, giải bài toán đường đi trong O(N log N).",
        intuition: `Trọng tâm (Centroid) của một cây là đỉnh mà khi xóa nó đi, mọi thành phần liên thông còn lại có kích thước không quá N/2.
Thuật toán phân rã trọng tâm (Chia để trị trên cây):
1. Tìm trọng tâm C của cây hiện tại.
2. Đếm/xử lý tất cả các đường đi ĐI QUA trọng tâm C.
3. Xóa trọng tâm C, đệ quy giải bài toán con trên các cây con còn lại.
Vì kích thước cây giảm đi ít nhất một nửa sau mỗi tầng phân rã, độ sâu của cây trọng tâm (Centroid Tree) tối đa chỉ là log2(N)!
Nhờ vậy mọi bài toán đếm số đường đi có độ dài K, tìm đường đi ngắn nhất đều giải được trong O(N log N) hoặc O(N log^2 N).`,
        timeComplexity: "O(N log N) hoặc O(N log^2 N) tùy thao tác kết hợp.",
        spaceComplexity: "O(N) lưu cây centroid.",
        pitfalls: [
          "Quên tính lại kích thước các cây con (subtree size) trước mỗi lần tìm trọng tâm mới.",
          "Trùng lặp đường đi: Các đường đi cùng nằm trọn vẹn trong một cây con nhánh sẽ bị đếm thừa nếu không trừ bớt phần đóng góp nội bộ."
        ],
        cppTemplate: `#include <iostream>
#include <vector>

using namespace std;

const int MAXN = 100005;
vector<int> adj[MAXN];
bool removed[MAXN];
int sz[MAXN];

int get_sizes(int u, int p) {
    sz[u] = 1;
    for (int v : adj[u]) {
        if (v != p && !removed[v]) sz[u] += get_sizes(v, u);
    }
    return sz[u];
}

int get_centroid(int u, int p, int total) {
    for (int v : adj[u]) {
        if (v != p && !removed[v] && sz[v] > total / 2) {
            return get_centroid(v, u, total);
        }
    }
    return u;
}

void decompose(int u) {
    int centroid = get_centroid(u, -1, get_sizes(u, -1));
    removed[centroid] = true;
    
    // Xử lý các đường đi đi qua centroid tại đây...
    
    for (int v : adj[centroid]) {
        if (!removed[v]) decompose(v);
    }
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    // Khung Centroid Decomposition
    return 0;
}`,
        marisaUrl: "https://marisaoj.com/roadmap",
        marisaProblems: [
          { code: "260", name: "Đường đi có độ dài K trên cây", difficulty: "Rất khó", link: "https://marisaoj.com/problem/260" }
        ],
        icpcTips: "Cây trọng tâm (Centroid Tree) có tính chất: Bất kỳ cặp đỉnh (u, v) nào cũng có LCA trong cây trọng tâm chính là trọng tâm phân tách chúng."
      },
      {
        id: "convex-hull-trick",
        title: "Tối Ưu Hóa Quy Hoạch Động: Convex Hull Trick & Li Chao Tree",
        category: "Tối ưu hóa DP",
        difficulty: 5,
        shortDesc: "Tối ưu công thức DP dạng dp[i] = min(dp[j] + m_j * x_i + c_j) từ O(N^2) xuống O(N log N) hoặc O(N).",
        intuition: `Trong các bài toán DP, ta thường gặp công thức:
  dp[i] = min(m_j * x_i + b_j) với j < i.
Nhận xét hình học: Mỗi trạng thái j tương ứng với một đường thẳng: y = m_j * x + b_j!
Ta cần tìm đường thẳng có giá trị y nhỏ nhất tại hoành độ x = x_i.
Tập hợp các đường thẳng này tạo thành một Bao lồi dưới (Lower Convex Hull).
- Nếu hệ số góc m_j và hoành độ x_i đơn điệu: Dùng hàng đợi 2 đầu (Deque) duy trì bao lồi trong O(N)!
- Nếu không đơn điệu: Dùng Cây Li Chao (Li Chao Tree) hoặc CHT động (Dynamic CHT) để thêm đường thẳng và truy vấn trong O(log MAX_X).`,
        timeComplexity: "O(N) với CHT đơn điệu; O(N log N) với Li Chao Tree.",
        spaceComplexity: "O(N) lưu các đường thẳng.",
        pitfalls: [
          "Điều kiện loại bỏ đường thẳng vô dụng: Hai đường thẳng cắt nhau bên trái giao điểm trước đó.",
          "Tràn số khi tính giao điểm: Bắt buộc dùng '__int128_t' hoặc so sánh dạng chéo nhân để tránh sai số số thực."
        ],
        cppTemplate: `#include <iostream>
#include <vector>

using namespace std;

struct Line {
    long long m, c;
    long long eval(long long x) const { return m * x + c; }
};

// Khung Li Chao Tree tìm Min
struct LiChaoTree {
    static const long long INF = 2e18;
    int n;
    vector<Line> tree;
    
    LiChaoTree(int n) : n(n), tree(4 * n, {0, INF}) {}
    
    void addLine(int node, int l, int r, Line line) {
        int mid = l + (r - l) / 2;
        bool left_better = line.eval(l) < tree[node].eval(l);
        bool mid_better = line.eval(mid) < tree[node].eval(mid);
        
        if (mid_better) swap(tree[node], line);
        if (l == r) return;
        
        if (left_better != mid_better) addLine(2 * node, l, mid, line);
        else addLine(2 * node + 1, mid + 1, r, line);
    }
    
    long long query(int node, int l, int r, long long x) {
        long long res = tree[node].eval(x);
        if (l == r) return res;
        int mid = l + (r - l) / 2;
        if (x <= mid) return min(res, query(2 * node, l, mid, x));
        else return min(res, query(2 * node + 1, mid + 1, r, x));
    }
};

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    // Minh họa Li Chao Tree
    return 0;
}`,
        marisaUrl: "https://marisaoj.com/roadmap",
        marisaProblems: [
          { code: "270", name: "Cây Li Chao", difficulty: "Rất khó", link: "https://marisaoj.com/problem/270" }
        ],
        icpcTips: "Li Chao Tree cài đặt dễ hơn nhiều so với Dynamic Hull và không sợ lỗi số thực, là vũ khí ưa thích của các cao thủ CP."
      },
      {
        id: "fft-ntt",
        title: "Biến Đổi Fourier Nhanh & Nhân Đa Thức (FFT / NTT)",
        category: "Toán học & Đa thức",
        difficulty: 5,
        shortDesc: "Nhân hai đa thức bậc $N$ trong $\\mathcal{O}(N \\log N)$ thay vì $\\mathcal{O}(N^2)$ bằng giải thuật Cooley-Tukey.",
        intuition: `Nhân hai đa thức $P(x)$ và $Q(x)$ bậc $N$ theo cách đặt tính thông thường tốn $\\mathcal{O}(N^2)$ phép tính.
Ý tưởng thiên tài của FFT (Fast Fourier Transform):
Một đa thức bậc $N$ được xác định DUY NHẤT bởi $N + 1$ điểm giá trị (Point-Value Representation).
Nhân hai đa thức ở dạng điểm giá trị chỉ mất đúng $\\mathcal{O}(N)$ (nhân từng cặp tọa độ)!
Thuật toán FFT chuyển đổi giữa hai biểu diễn:
1. Chuyển từ hệ số sang điểm giá trị bằng FFT tại các nghiệm căn nguyên thủy của đơn vị (Roots of Unity: $\\omega_N^k = e^{i \\frac{2\\pi k}{N}}$) trong $\\mathcal{O}(N \\log N)$.
2. Nhân từng cặp điểm trong $\\mathcal{O}(N)$.
3. Biến đổi ngược (Inverse FFT) từ điểm trở về hệ số trong $\\mathcal{O}(N \\log N)$!
NTT (Number Theoretic Transform): Phiên bản FFT trên trường hữu hạn Modulo nguyên tố (ví dụ $998244353 = 119 \\times 2^{23} + 1$) hoàn toàn chính xác với số nguyên, không lo sai số dấu phẩy động!`,
        timeComplexity: "$\\mathcal{O}(N \\log N)$ nhân hai đa thức.",
        spaceComplexity: "$\\mathcal{O}(N)$ mảng số phức hoặc mảng modulo.",
        pitfalls: [
          "Sai số làm tròn số thực trong FFT: Cần dùng 'double' hoặc 'long double' và ép kiểu làm tròn cẩn thận: '(long long)(round(res.real()))'.",
          "NTT chỉ áp dụng được với Modulo có dạng 'c * 2^k + 1' (như 998244353 có 2^23)."
        ],
        cppTemplate: `#include <iostream>
#include <vector>
#include <cmath>
#include <complex>

using namespace std;

using cd = complex<double>;
const double PI = acos(-1);

void fft(vector<cd> &a, bool invert) {
    int n = a.size();
    for (int i = 1, j = 0; i < n; ++i) {
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
            for (int j = 0; j < len / 2; ++j) {
                cd u = a[i + j], v = a[i + j + len / 2] * w;
                a[i + j] = u + v;
                a[i + j + len / 2] = u - v;
                w *= wlen;
            }
        }
    }
    if (invert) {
        for (cd &x : a) x /= n;
    }
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    // Khung FFT
    return 0;
}`,
        marisaUrl: "https://marisaoj.com/roadmap",
        marisaProblems: [
          { code: "280", name: "Nhân đa thức bằng FFT", difficulty: "Rất khó", link: "https://marisaoj.com/problem/280" }
        ],
        icpcTips: "Bất kỳ bài toán đếm nào có dạng: 'Đếm số cặp (i, j) sao cho a[i] + a[j] = S' đều có thể chuyển thành bài toán nhân hai đa thức bằng cách đặt số mũ là giá trị a[i]."
      }
    ]
  },
  {
    id: "level-100",
    levelNumber: 100,
    title: "Level 100: Competitions & Boss Arena",
    vietnameseTitle: "Đấu Trường Thực Chiến & Kho Lưu Trữ Đề Thi",
    tagline: "Kho đề thi chính thức VOI, ICPC Asia Regional, kỹ năng sinh test và chiến thuật phòng thi",
    targetAudience: "Đấu thủ tham gia các kỳ thi chính thức, kiểm thử áp lực và hoàn thiện bản lĩnh",
    estimatedTime: "Không giới hạn (Luyện tập liên tục)",
    difficultyStars: 5,
    accentColor: "#B71C1C",
    marisaUrl: "https://marisaoj.com/roadmap",
    description: "Nơi quy tụ toàn bộ kho tàng đề thi thực tế của các kỳ thi Học sinh giỏi Quốc gia (VOI), các vòng loại và chung kết ICPC Regional. Cung cấp bộ công cụ gỡ lỗi đỉnh cao: Stress Testing tự động và cẩm nang chiến thuật làm bài dưới áp lực 5 tiếng thi đấu.",
    topics: [
      {
        id: "voi-archive",
        title: "Tuyển Tập Đề Thi HSG Quốc Gia (VOI Archive)",
        category: "Kho đề thi",
        difficulty: 5,
        shortDesc: "Phân tích cấu trúc phân hóa điểm số, các subtask kinh điển và tư duy ăn trọn điểm thành phần.",
        intuition: `Đặc thù của kỳ thi Học sinh giỏi Quốc gia môn Tin học (VOI):
Bài thi chia theo Subtask (thường từ 3 đến 5 subtask). Mỗi subtask có một giới hạn N riêng biệt:
- Subtask 1: N nhỏ (N <= 20) -> Dành cho Vét cạn (Brute-force) hoặc Quay lui.
- Subtask 2: N trung bình (N <= 2000) -> Dành cho DP O(N^2) hoặc Dijkstra thông thường.
- Subtask 3: N lớn (N <= 10^5) -> Bắt buộc dùng Cấu trúc dữ liệu nâng cao (Segment Tree, HLD) hoặc DP tối ưu.
Chiến thuật của Huấn luyện viên: 'Đừng bao giờ nộp bài trắng! Hãy luôn viết code giải quyết trọn vẹn các subtask nhỏ trước để nắm chắc 40-60% số điểm bỏ túi, sau đó mới dồn toàn lực tối ưu hóa cho subtask cuối cùng'.`,
        timeComplexity: "Tùy thuộc vào từng Subtask từ O(2^N) đến O(N log N).",
        spaceComplexity: "Phù hợp giới hạn bộ nhớ quy định (thường là 512MB - 1024MB).",
        pitfalls: [
          "Bỏ quên trường hợp đặc biệt của Subtask nhỏ dẫn đến mất điểm oan một cách đáng tiếc.",
          "Dành quá nhiều thời gian (3 tiếng) sa lầy vào 1 bài khó mà không kịp đọc và làm các bài còn lại."
        ],
        cppTemplate: `#include <iostream>
#include <vector>

using namespace std;

// Mẫu phân luồng Subtask chuẩn trong đề thi VOI
void solve_subtask1() {
    // Thuật toán vét cạn O(2^N)
}

void solve_full() {
    // Thuật toán tối ưu O(N log N)
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    
    int n;
    if (cin >> n) {
        if (n <= 20) {
            solve_subtask1();
        } else {
            solve_full();
        }
    }
    return 0;
}`,
        marisaUrl: "https://marisaoj.com/roadmap",
        marisaProblems: [
          { code: "300", name: "Đề thi VOI 2022 - Bài 1", difficulty: "Rất khó", link: "https://marisaoj.com/problem/300" },
          { code: "301", name: "Đề thi VOI 2023 - Bài 2", difficulty: "Rất khó", link: "https://marisaoj.com/problem/301" }
        ],
        icpcTips: "Luôn kiểm tra kỹ tên file vào/ra 'freopen(\"TENBAI.INP\", \"r\", stdin)' nếu kỳ thi vẫn áp dụng quy chế chấm file truyền thống."
      },
      {
        id: "icpc-regional-archive",
        title: "Tuyển Tập Đề Thi ICPC Asia Regional & Vietnam National",
        category: "Kho đề thi",
        difficulty: 5,
        shortDesc: "Chiến thuật phối hợp 3 người 1 máy tính, giải bài toán Ad-hoc và đọc bảng điểm động.",
        intuition: `Khác với VOI thi cá nhân theo subtask, ICPC là cuộc chiến đồng đội (3 thành viên, 1 bàn phím máy tính duy nhất trong 5 giờ liên tục) với quy chế:
- Chấm bài theo cơ chế Pass/Fail (All-or-Nothing). Không có điểm thành phần!
- Tính thời gian phạt (Penalty Time) cho mỗi lần nộp sai (Wrong Answer +20 phút).
- Bảng điểm trực tiếp (Live Scoreboard) và đóng băng (Freeze) trong 60 phút cuối cùng!
Chiến thuật phân bổ vai trò đội thi:
1. Đọc lướt toàn bộ đề thi (First 15 mins): Tìm bài dễ nhất (First to Solve) để lấy quả bóng đầu tiên, tạo tâm lý hưng phấn.
2. Phân công 'Người gõ code' và 'Người giải giấy': Chỉ khi thuật toán đã được viết chi tiết ra giấy nháp và kiểm chứng xong thì mới được ngồi vào máy gõ code.
3. Khi gặp Bug: In code ra giấy ngay lập tức và nhường máy cho đồng đội làm bài khác trong lúc mình ngồi debug bằng mắt trên giấy!`,
        timeComplexity: "Tối ưu hóa theo giới hạn 1.0s - 3.0s của máy chấm.",
        spaceComplexity: "Tuân thủ giới hạn 256MB - 512MB.",
        pitfalls: [
          "Cả 3 thành viên cùng ngồi nhìn màn hình máy tính để tìm một con bug nhỏ, lãng phí thời gian tài nguyên máy tính quý giá.",
          "Nộp bài vội vã khi chưa kiểm tra kỹ các trường hợp biên đặc biệt dẫn đến dính 4-5 lần WA làm tăng điểm phạt penalty."
        ],
        cppTemplate: `#include <iostream>
#include <vector>

using namespace std;

// Template thi đấu ICPC rút gọn
int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    
    int t = 1;
    // cin >> t; // Bật lên nếu bài toán có nhiều bộ test trong 1 lần chạy
    while (t--) {
        // Giải bài toán
    }
    return 0;
}`,
        marisaUrl: "https://marisaoj.com/roadmap",
        marisaProblems: [
          { code: "310", name: "ICPC Regional - Problem A", difficulty: "Rất khó", link: "https://marisaoj.com/problem/310" }
        ],
        icpcTips: "Bí quyết vô địch: Đừng ngần ngại in code ra giấy máy in phòng thi. 80% các lỗi sai ngớ ngẩn được phát hiện nhanh hơn khi đọc trên giấy."
      },
      {
        id: "stress-testing",
        title: "Kỹ Thuật Sinh Test Ngẫu Nhiên & Bắt Lỗi Tự Động (Stress Testing)",
        category: "Kỹ năng thực chiến",
        difficulty: 4,
        shortDesc: "Vũ khí bí mật bắt Wrong Answer trong phòng thi bằng cách đối chiếu code chuẩn với code trâu ngây thơ.",
        intuition: `Khi bạn nộp bài và nhận kết quả 'Wrong Answer on test 7', nhưng đề thi không cho bạn xem dữ liệu của test 7, làm sao để tìm ra lỗi sai?
Kỹ thuật Stress Testing tự động:
Ta chuẩn bị 3 chương trình:
1. 'code_nhanh.cpp': Code giải thuật tối ưu mà bạn đang nghi ngờ bị lỗi.
2. 'code_trau.cpp': Code vét cạn cực kỳ đơn giản nhưng 100% CHÍNH XÁC (chấp nhận chạy chậm).
3. 'generator.cpp': Code sinh test ngẫu nhiên theo đúng quy cách của đề bài.
Viết một script (Bash hoặc Batch/Python) chạy vòng lặp vô hạn:
Sinh một test ngẫu nhiên -> Chạy cả 2 code -> So sánh file kết quả output.
Chỉ sau vài giây và hàng trăm test được thử, script sẽ dừng lại và in ra chính xác bộ test nhỏ xíu đầu tiên mà code tối ưu ra sai kết quả!`,
        timeComplexity: "Chạy hàng trăm test nhỏ trong vài giây.",
        spaceComplexity: "O(1) phụ trợ.",
        pitfalls: [
          "Generator sinh test quá lớn khiến code trâu bị treo, không so sánh kịp. Hãy sinh test nhỏ vừa phải (ví dụ N = 5 đến 10) vì hầu hết các lỗi biên đều lộ diện ở test nhỏ.",
          "Generator không bao phủ được các trường hợp đặc biệt (ví dụ đồ thị không liên thông, số âm, cây suy biến thành đường thẳng)."
        ],
        cppTemplate: `// File: gen.cpp (Bộ sinh test ngẫu nhiên C++)
#include <iostream>
#include <random>
#include <chrono>

using namespace std;

mt19937_64 rng(chrono::steady_clock::now().time_since_epoch().count());

long long randInt(long long l, long long r) {
    return uniform_int_distribution<long long>(l, r)(rng);
}

int main() {
    int n = randInt(2, 6);
    int target = randInt(1, 20);
    cout << n << " " << target << "\\n";
    for (int i = 0; i < n; ++i) {
        cout << randInt(1, 15) << " ";
    }
    cout << "\\n";
    return 0;
}

/*
Script chạy Stress Test trên PowerShell (Windows):
for ($i = 1; $i -le 1000; $i++) {
    ./gen > test.inp
    ./code_nhanh < test.inp > out_fast.txt
    ./code_trau < test.inp > out_slow.txt
    if (Compare-Object (Get-Content out_fast.txt) (Get-Content out_slow.txt)) {
        Write-Host "Phat hien test sai o lan thu $i!" -ForegroundColor Red
        Get-Content test.inp
        break
    }
}
*/`,
        marisaUrl: "https://marisaoj.com/roadmap",
        marisaProblems: [
          { code: "320", name: "Thực hành Stress Testing", difficulty: "Trung bình", link: "https://marisaoj.com/problem/320" }
        ],
        icpcTips: "Cứ 10 cao thủ ICPC thì có 9 người dùng Stress Testing thường xuyên trong contest để sửa bug trước khi nộp."
      }
    ]
  }
];

// Dữ liệu bảng quy tắc vàng ước lượng độ phức tạp thời gian theo N trong ICPC (Chuẩn LaTeX KaTeX)
const ICPC_COMPLEXITY_RULES = [
  { nLimit: "$N \\le 10 - 11$", complexity: "$\\mathcal{O}(N!)$ hoặc $\\mathcal{O}(N^2 \\cdot 2^N)$", algorithms: "Vét cạn hoán vị, Bitmask DP cực nhỏ" },
  { nLimit: "$N \\le 18 - 22$", complexity: "$\\mathcal{O}(2^N)$ hoặc $\\mathcal{O}(N \\cdot 2^N)$", algorithms: "Quay lui, Bitmask DP (TSP), Meet-in-the-Middle" },
  { nLimit: "$N \\le 100$", complexity: "$\\mathcal{O}(N^4)$", algorithms: "Quy hoạch động 4 chiều, Vét 4 vòng lặp" },
  { nLimit: "$N \\le 400 - 500$", complexity: "$\\mathcal{O}(N^3)$", algorithms: "Floyd-Warshall, Nhân ma trận $\\mathcal{O}(N^3)$, DP 3 chiều" },
  { nLimit: "$N \\le 2,000 - 5,000$", complexity: "$\\mathcal{O}(N^2)$", algorithms: "DP bảng 2 chiều, Duyệt 2 con trỏ thô, Cặp ghép Kuhn" },
  { nLimit: "$N \\le 100,000 - 200,000$", complexity: "$\\mathcal{O}(N \\log N)$ hoặc $\\mathcal{O}(N \\log^2 N)$", algorithms: "Sắp xếp, Segment Tree, Binary Search, Dijkstra, HLD" },
  { nLimit: "$N \\le 1,000,000$", complexity: "$\\mathcal{O}(N)$", algorithms: "Mảng cộng dồn, Two Pointers, Sàng nguyên tố, BFS/DFS" },
  { nLimit: "$N \\ge 10^9$", complexity: "$\\mathcal{O}(\\log N)$ hoặc $\\mathcal{O}(1)$", algorithms: "Lũy thừa nhị phân, Công thức tổ hợp, Nhân ma trận nhanh" }
];
