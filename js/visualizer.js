// =============================================================================
// INTERACTIVE ALGORITHM VISUALIZERS FOR MODAL (PEDAGOGICAL DEMONSTRATIONS)
// Huấn luyện viên Lập trình Thi đấu ICPC & Kỹ sư Giáo dục
// =============================================================================

const Visualizers = {
  // 1. Binary Search Visualizer
  renderBinarySearch: function(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const array = [2, 5, 8, 12, 16, 23, 38, 45, 56, 72, 91];
    let L = 0, R = array.length - 1;
    let target = 23;
    let stepCount = 0;
    let found = false;
    let history = [];

    function updateUI(statusMsg = "") {
      const mid = Math.floor((L + R) / 2);
      let html = `
        <div class="vis-header">
          <div class="vis-title"><i class="fa-solid fa-magnifying-glass"></i> Mô Phỏng Trực Quan: Tìm Kiếm Nhị Phân (Binary Search)</div>
          <div class="vis-controls">
            <label>Giá trị cần tìm X: </label>
            <input type="number" id="bs-target-input" value="${target}" class="vis-input" min="1" max="100">
            <button id="bs-search-btn" class="vis-btn primary"><i class="fa-solid fa-play"></i> Bắt đầu lại</button>
            <button id="bs-step-btn" class="vis-btn secondary" ${found || L > R ? 'disabled' : ''}><i class="fa-solid fa-forward-step"></i> Bước tiếp theo</button>
          </div>
        </div>

        <div class="vis-canvas">
          <div class="array-container">
            ${array.map((val, idx) => {
              let cls = "array-cell";
              let badges = [];
              if (idx < L || idx > R) cls += " cell-disabled";
              if (idx === L) badges.push("L");
              if (idx === R) badges.push("R");
              if (!found && L <= R && idx === mid) cls += " cell-mid";
              if (found && idx === mid) cls += " cell-found";
              return `
                <div class="${cls}">
                  <div class="cell-val">${val}</div>
                  <div class="cell-idx">[${idx}]</div>
                  ${badges.length ? `<div class="cell-pointer">${badges.join("&")}</div>` : ''}
                </div>
              `;
            }).join("")}
          </div>
          <div class="vis-status-box">
            <div class="status-main">${statusMsg || `Đang tìm <strong>X = ${target}</strong> trong không gian [L = ${L}, R = ${R}]. Giữa Mid = ${mid} (Giá trị = ${array[mid]}).`}</div>
            <div class="status-stats">
              <span><i class="fa-solid fa-stopwatch"></i> Số bước: <strong>${stepCount}</strong></span>
              <span><i class="fa-solid fa-scale-balanced"></i> Độ phức tạp: <strong>O(log₂ N) ≈ 4 bước</strong></span>
            </div>
          </div>
        </div>
      `;
      container.innerHTML = html;

      // Event listeners
      document.getElementById("bs-search-btn").onclick = () => {
        const val = parseInt(document.getElementById("bs-target-input").value);
        if (!isNaN(val)) {
          target = val;
          L = 0; R = array.length - 1;
          stepCount = 0;
          found = false;
          updateUI(`Bắt đầu tìm X = ${target} trên đoạn [0, ${array.length - 1}].`);
        }
      };

      const stepBtn = document.getElementById("bs-step-btn");
      if (stepBtn) {
        stepBtn.onclick = () => {
          if (L > R) return;
          stepCount++;
          const mid = Math.floor((L + R) / 2);
          if (array[mid] === target) {
            found = true;
            updateUI(`🎯 TÌM THẤY! A[${mid}] == ${target}. Chỉ mất ${stepCount} bước so sánh!`);
          } else if (array[mid] < target) {
            L = mid + 1;
            updateUI(`A[${mid}] = ${array[mid]} < ${target} $\\implies$ Loại bỏ nửa bên trái [0..${mid}]. Thu hẹp tìm kiếm sang phải: L = ${L}.`);
          } else {
            R = mid - 1;
            updateUI(`A[${mid}] = ${array[mid]} > ${target} $\\implies$ Loại bỏ nửa bên phải [${mid}..${array.length-1}]. Thu hẹp tìm kiếm sang trái: R = ${R}.`);
          }
        };
      }
    }
    updateUI();
  },

  // 2. Prefix Sum Visualizer
  renderPrefixSum: function(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const A = [0, 3, 1, 4, 1, 5, 9, 2, 6]; // 1-based
    const P = [0];
    for (let i = 1; i < A.length; ++i) P.push(P[i - 1] + A[i]);

    let qL = 2, qR = 5;

    function render() {
      const sum = P[qR] - P[qL - 1];
      let html = `
        <div class="vis-header">
          <div class="vis-title"><i class="fa-solid fa-layer-group"></i> Mô Phỏng Trực Quan: Mảng Cộng Dồn (Prefix Sum)</div>
          <div class="vis-controls">
            <label>Truy vấn đoạn [L, R]: </label>
            <span>L: </span>
            <input type="number" id="ps-l-input" value="${qL}" min="1" max="8" class="vis-input-sm">
            <span>R: </span>
            <input type="number" id="ps-r-input" value="${qR}" min="1" max="8" class="vis-input-sm">
            <button id="ps-query-btn" class="vis-btn primary"><i class="fa-solid fa-bolt"></i> Tính trong O(1)</button>
          </div>
        </div>

        <div class="vis-canvas">
          <div class="vis-section-label">Mảng Gốc A (1-based):</div>
          <div class="array-container">
            ${A.slice(1).map((val, i) => {
              const idx = i + 1;
              const inRange = idx >= qL && idx <= qR;
              return `
                <div class="array-cell ${inRange ? 'cell-highlight-range' : ''}">
                  <div class="cell-val">${val}</div>
                  <div class="cell-idx">A[${idx}]</div>
                </div>
              `;
            }).join("")}
          </div>

          <div class="vis-section-label" style="margin-top: 15px;">Mảng Tiền Tố Pref (Tích lũy):</div>
          <div class="array-container">
            ${P.slice(1).map((val, i) => {
              const idx = i + 1;
              let cls = "array-cell";
              if (idx === qR) cls += " cell-pref-r";
              if (idx === qL - 1) cls += " cell-pref-l";
              return `
                <div class="${cls}">
                  <div class="cell-val">${val}</div>
                  <div class="cell-idx">P[${idx}]</div>
                  ${idx === qR ? '<div class="cell-pointer">P[R]</div>' : ''}
                  ${idx === qL - 1 ? '<div class="cell-pointer">P[L-1]</div>' : ''}
                </div>
              `;
            }).join("")}
          </div>

          <div class="vis-formula-box">
            <div class="formula-line">
              $$\\text{Sum}(${qL}, ${qR}) = P[${qR}] - P[${qL - 1}] = ${P[qR]} - ${P[qL - 1]} = \\mathbf{${sum}}$$
            </div>
            <div class="formula-sub">Không cần duyệt qua ${qR - qL + 1} phần tử! Chỉ duy nhất <strong>1 phép trừ trong O(1)</strong>!</div>
          </div>
        </div>
      `;
      container.innerHTML = html;

      document.getElementById("ps-query-btn").onclick = () => {
        let l = parseInt(document.getElementById("ps-l-input").value);
        let r = parseInt(document.getElementById("ps-r-input").value);
        if (l > r) [l, r] = [r, l];
        l = Math.max(1, Math.min(l, 8));
        r = Math.max(1, Math.min(r, 8));
        qL = l; qR = r;
        render();
      };
    }
    render();
  },

  // 3. Two Pointers Visualizer
  renderTwoPointers: function(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const arr = [1, 3, 4, 7, 9, 11, 15, 18, 21];
    let L = 0, R = arr.length - 1;
    let target = 16;
    let found = false;
    let step = 0;

    function render(msg = "") {
      const curSum = arr[L] + arr[R];
      let html = `
        <div class="vis-header">
          <div class="vis-title"><i class="fa-solid fa-arrows-left-right"></i> Mô Phỏng Trực Quan: Hai Con Trỏ (Two Pointers)</div>
          <div class="vis-controls">
            <label>Tổng mục tiêu S: </label>
            <input type="number" id="tp-target-input" value="${target}" class="vis-input-sm">
            <button id="tp-reset-btn" class="vis-btn primary"><i class="fa-solid fa-rotate-left"></i> Khởi tạo</button>
            <button id="tp-step-btn" class="vis-btn secondary" ${found || L >= R ? 'disabled' : ''}><i class="fa-solid fa-forward-step"></i> Bước dịch con trỏ</button>
          </div>
        </div>

        <div class="vis-canvas">
          <div class="array-container">
            ${arr.map((val, idx) => {
              let cls = "array-cell";
              let badge = "";
              if (idx === L && idx === R) { cls += " cell-mid"; badge = "L&R"; }
              else if (idx === L) { cls += " cell-pointer-l"; badge = "L"; }
              else if (idx === R) { cls += " cell-pointer-r"; badge = "R"; }
              if (found && (idx === L || idx === R)) cls += " cell-found";
              return `
                <div class="${cls}">
                  <div class="cell-val">${val}</div>
                  <div class="cell-idx">[${idx}]</div>
                  ${badge ? `<div class="cell-pointer">${badge}</div>` : ''}
                </div>
              `;
            }).join("")}
          </div>

          <div class="vis-status-box">
            <div class="status-main">
              ${msg || `Xét cặp <strong>A[${L}] + A[${R}] = ${arr[L]} + ${arr[R]} = ${curSum}</strong>. So sánh với mục tiêu S = ${target}.`}
            </div>
            <div class="status-stats">
              <span><i class="fa-solid fa-route"></i> Bước: <strong>${step}</strong></span>
              <span><i class="fa-solid fa-bolt"></i> Thời gian: <strong>O(N)</strong> (Không cần 2 vòng for O(N²))</span>
            </div>
          </div>
        </div>
      `;
      container.innerHTML = html;

      document.getElementById("tp-reset-btn").onclick = () => {
        target = parseInt(document.getElementById("tp-target-input").value) || 16;
        L = 0; R = arr.length - 1;
        found = false; step = 0;
        render(`Bắt đầu lại với S = ${target}.`);
      };

      const stepBtn = document.getElementById("tp-step-btn");
      if (stepBtn) {
        stepBtn.onclick = () => {
          if (L >= R) return;
          step++;
          const sum = arr[L] + arr[R];
          if (sum === target) {
            found = true;
            render(`🎯 CHÍNH XÁC! Cặp phần tử A[${L}] (${arr[L]}) + A[${R}] (${arr[R]}) = ${target}!`);
          } else if (sum < target) {
            L++;
            render(`Tổng ${sum} < ${target} $\\implies$ Cần số lớn hơn $\\implies$ Dịch con trỏ trái L sang phải (L = ${L}).`);
          } else {
            R--;
            render(`Tổng ${sum} > ${target} $\\implies$ Cần số nhỏ hơn $\\implies$ Dịch con trỏ phải R sang trái (R = ${R}).`);
          }
        };
      }
    }
    render();
  },

  // 4. Prime Sieve of Eratosthenes Visualizer
  renderSieve: function(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const MAX = 40;
    const isPrime = Array(MAX + 1).fill(true);
    isPrime[0] = isPrime[1] = false;
    let currentP = 2;
    let currentMultiple = 4;
    let finished = false;

    function render(msg = "") {
      let html = `
        <div class="vis-header">
          <div class="vis-title"><i class="fa-solid fa-filter"></i> Mô Phỏng Trực Quan: Sàng Eratosthenes (Prime Sieve)</div>
          <div class="vis-controls">
            <button id="sieve-next-btn" class="vis-btn primary" ${finished ? 'disabled' : ''}><i class="fa-solid fa-forward-step"></i> Sàng bước tiếp theo</button>
            <button id="sieve-reset-btn" class="vis-btn secondary"><i class="fa-solid fa-rotate-left"></i> Đặt lại</button>
          </div>
        </div>

        <div class="vis-canvas">
          <div class="sieve-grid">
            ${Array.from({ length: MAX }, (_, i) => i + 1).map(num => {
              let cls = "sieve-cell";
              if (num < 2) cls += " sieve-composite";
              else if (!isPrime[num]) cls += " sieve-composite";
              else if (num === currentP && !finished) cls += " sieve-current";
              else cls += " sieve-prime";
              return `<div class="${cls}">${num}</div>`;
            }).join("")}
          </div>

          <div class="vis-status-box">
            <div class="status-main">
              ${msg || `Số nguyên tố hiện tại đang xét: <strong>P = ${currentP}</strong>. Chuẩn bị gạch bỏ các bội số của ${currentP}.`}
            </div>
            <div class="status-stats">
              <span>Độ phức tạp: <strong>O(N log log N)</strong></span>
              <span>Ghi chú: <strong>Bắt đầu gạch từ P² vì các bội nhỏ hơn đã bị loại</strong></span>
            </div>
          </div>
        </div>
      `;
      container.innerHTML = html;

      document.getElementById("sieve-reset-btn").onclick = () => {
        for (let i = 2; i <= MAX; ++i) isPrime[i] = true;
        currentP = 2;
        currentMultiple = 4;
        finished = false;
        render("Đã khởi tạo lại lưới sàng 1..40.");
      };

      const nextBtn = document.getElementById("sieve-next-btn");
      if (nextBtn) {
        nextBtn.onclick = () => {
          if (finished) return;
          if (currentP * currentP > MAX) {
            finished = true;
            render(`Đã hoàn tất sàng! Vì P² = ${currentP}² > ${MAX}, mọi số còn lại trong lưới đều là SỐ NGUYÊN TỐ!`);
            return;
          }

          // Gạch bỏ các bội của currentP
          let countCrossed = 0;
          for (let m = currentP * currentP; m <= MAX; m += currentP) {
            if (isPrime[m]) {
              isPrime[m] = false;
              countCrossed++;
            }
          }
          const prevP = currentP;

          // Tìm số nguyên tố tiếp theo
          currentP++;
          while (currentP <= MAX && !isPrime[currentP]) currentP++;

          if (currentP * currentP > MAX) {
            finished = true;
            render(`Đã gạch bỏ các bội số của ${prevP}. Kết thúc sàng vì không còn P nào có P² <= ${MAX}!`);
          } else {
            render(`Đã gạch các bội của ${prevP} từ ${prevP * prevP}. Số nguyên tố tiếp theo là P = ${currentP}.`);
          }
        };
      }
    }
    render();
  },

  // 5. BFS Graph Visualizer
  renderBFS: function(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const graph = {
      1: [2, 3],
      2: [1, 4, 5],
      3: [1, 6],
      4: [2],
      5: [2, 6],
      6: [3, 5]
    };

    let visited = { 1: true };
    let queue = [1];
    let dist = { 1: 0 };
    let step = 0;
    let finished = false;

    function render(msg = "") {
      let html = `
        <div class="vis-header">
          <div class="vis-title"><i class="fa-solid fa-circle-nodes"></i> Mô Phỏng Trực Quan: Duyệt Đồ Thị BFS (Lan Tỏa Sóng)</div>
          <div class="vis-controls">
            <button id="bfs-step-btn" class="vis-btn primary" ${finished || queue.length === 0 ? 'disabled' : ''}><i class="fa-solid fa-play"></i> Bước lan toả tiếp</button>
            <button id="bfs-reset-btn" class="vis-btn secondary"><i class="fa-solid fa-rotate-left"></i> Đặt lại</button>
          </div>
        </div>

        <div class="vis-canvas">
          <div class="bfs-nodes-container">
            ${[1, 2, 3, 4, 5, 6].map(node => {
              let cls = "graph-node";
              let label = `Đỉnh ${node}`;
              let d = dist[node] !== undefined ? `d = ${dist[node]}` : 'd = ∞';
              if (queue[0] === node) cls += " node-active";
              else if (visited[node]) cls += " node-visited";
              else cls += " node-unvisited";

              return `
                <div class="${cls}">
                  <div class="node-id">${node}</div>
                  <div class="node-dist">${d}</div>
                </div>
              `;
            }).join("")}
          </div>

          <div class="vis-status-box">
            <div class="status-main">
              ${msg || `Bắt đầu từ đỉnh 1 (khoảng cách d = 0). Hàng đợi Queue: [${queue.join(", ")}].`}
            </div>
            <div class="status-stats">
              <span>Hàng đợi hiện thời: <strong>[${queue.join(", ") || "Rỗng"}]</strong></span>
              <span>Độ phức tạp: <strong>O(V + E)</strong> - Mỗi đỉnh vào Queue đúng 1 lần</span>
            </div>
          </div>
        </div>
      `;
      container.innerHTML = html;

      document.getElementById("bfs-reset-btn").onclick = () => {
        visited = { 1: true };
        queue = [1];
        dist = { 1: 0 };
        step = 0;
        finished = false;
        render("Đã khởi tạo lại đồ thị từ gốc đỉnh 1.");
      };

      const stepBtn = document.getElementById("bfs-step-btn");
      if (stepBtn) {
        stepBtn.onclick = () => {
          if (queue.length === 0) {
            finished = true;
            render("Hàng đợi rỗng! Quá trình duyệt BFS đã hoàn tất cho toàn bộ đồ thị.");
            return;
          }
          const u = queue.shift();
          const neighbors = graph[u] || [];
          let added = [];
          for (let v of neighbors) {
            if (!visited[v]) {
              visited[v] = true;
              dist[v] = dist[u] + 1;
              queue.push(v);
              added.push(v);
            }
          }
          if (queue.length === 0) finished = true;
          render(`Lấy đỉnh ${u} ra khỏi Queue. Thăm các đỉnh kề chưa đến: [${added.join(", ") || "Không có"}]. Hàng đợi mới: [${queue.join(", ")}].`);
        };
      }
    }
    render();
  },

  // 6. Interactive Complexity & Time Limit Calculator
  renderComplexityTool: function(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    let N = 100000;

    function render() {
      const complexities = [
        { name: "O(1)", formula: 1, limit: "Mọi giá trị N", desc: "Hằng số tức thời (Phép gán, toán tử bit, Hash Table lý tưởng)" },
        { name: "O(log N)", formula: Math.log2(N), limit: "N ≤ 10¹⁸", desc: "Chia đôi không gian (Binary Search, Luỹ thừa nhị phân)" },
        { name: "O(N)", formula: N, limit: "N ≤ 10⁷ - 10⁸", desc: "Duyệt 1 vòng lặp (Prefix Sum, Two Pointers, Sàng nguyên tố)" },
        { name: "O(N log N)", formula: N * Math.log2(N), limit: "N ≤ 10⁵ - 5·10⁵", desc: "Sắp xếp, Segment Tree, Dijkstra, Chia để trị" },
        { name: "O(N √N)", formula: N * Math.sqrt(N), limit: "N ≤ 10⁵", desc: "Chia căn (Mo's algorithm, phân rã khối)" },
        { name: "O(N²)", formula: N * N, limit: "N ≤ 5000", desc: "2 vòng for lồng nhau (Quy hoạch động 2D cơ bản)" },
        { name: "O(N³)", formula: N * N * N, limit: "N ≤ 400", desc: "3 vòng for (Nhân ma trận cơ bản, Floyd-Warshall)" },
        { name: "O(2^N)", formula: Math.pow(2, Math.min(N, 60)), limit: "N ≤ 20 - 22", desc: "Sinh tập con, Bitmask DP, Vét cạn nhánh nhị phân" },
        { name: "O(N!)", formula: N <= 12 ? factorial(N) : Infinity, limit: "N ≤ 10 - 11", desc: "Hoán vị, Vét cạn không gian thứ tự" }
      ];

      function factorial(n) {
        let r = 1; for (let i = 2; i <= n; ++i) r *= i; return r;
      }

      let html = `
        <div class="vis-header">
          <div class="vis-title"><i class="fa-solid fa-calculator"></i> Máy Tính Độ Phức Tạp & Tiêu Chuẩn Thời Gian ICPC (1s = 10⁸ phép tính)</div>
          <div class="vis-controls">
            <label>Thử nghiệm kích thước N: </label>
            <input type="number" id="comp-n-input" value="${N}" class="vis-input">
            <button id="comp-calc-btn" class="vis-btn primary"><i class="fa-solid fa-arrows-rotate"></i> Tính toán</button>
          </div>
        </div>

        <div class="vis-canvas">
          <table class="complexity-table">
            <thead>
              <tr>
                <th>Độ Phức Tạp</th>
                <th>Số Phép Tính Ước Tính (N = ${N.toLocaleString()})</th>
                <th>Giới Hạn Khuyến Nghị</th>
                <th>Đánh Giá Máy Chấm (1.0s)</th>
              </tr>
            </thead>
            <tbody>
              ${complexities.map(c => {
                const ops = c.formula;
                let statusBadge = "";
                if (ops <= 1e8) {
                  statusBadge = '<span class="badge-verdict ac"><i class="fa-solid fa-check"></i> ACCEPTED (< 1s)</span>';
                } else if (ops <= 5e8) {
                  statusBadge = '<span class="badge-verdict warning"><i class="fa-solid fa-triangle-exclamation"></i> RỦI RO TLE (Cần tối ưu sâu)</span>';
                } else {
                  statusBadge = '<span class="badge-verdict tle"><i class="fa-solid fa-xmark"></i> TIME LIMIT EXCEEDED (> 1s)</span>';
                }
                const opsStr = ops === Infinity || isNaN(ops) || ops > 1e18 ? "> 10¹⁸ (Tràn vô cùng)" : Math.round(ops).toLocaleString();
                return `
                  <tr>
                    <td><strong>${c.name}</strong><br><small style="color:#64748b">${c.desc}</small></td>
                    <td><code>${opsStr}</code></td>
                    <td>${c.limit}</td>
                    <td>${statusBadge}</td>
                  </tr>
                `;
              }).join("")}
            </tbody>
          </table>
        </div>
      `;
      container.innerHTML = html;

      document.getElementById("comp-calc-btn").onclick = () => {
        const val = parseInt(document.getElementById("comp-n-input").value);
        if (!isNaN(val) && val > 0) {
          N = val;
          render();
        }
      };
    }
    render();
  }
};
