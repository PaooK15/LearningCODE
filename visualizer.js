/**
 * Algorithm Interactive Visualizer Engine
 * Hỗ trợ mô phỏng trực quan: Binary Search, Two Pointers, Prefix Sum, BFS Queue
 */

const VisualizerEngine = {
  // 1. BINARY SEARCH VISUALIZER
  binarySearch: {
    data: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91],
    target: 23,
    l: 0,
    r: 9,
    mid: -1,
    steps: [],
    currentStepIndex: 0,
    timer: null,
    isPlaying: false,

    init(containerId, customTarget = 23) {
      this.target = customTarget;
      this.data.sort((a, b) => a - b);
      this.generateSteps();
      this.currentStepIndex = 0;
      this.render(containerId);
    },

    generateSteps() {
      this.steps = [];
      let l = 0, r = this.data.length - 1;
      let found = false;

      this.steps.push({
        l, r, mid: -1,
        message: `Khởi tạo: Tìm kiếm giá trị X = ${this.target} trong mảng đã sắp xếp [0..${r}].`,
        status: "start"
      });

      while (l <= r) {
        let mid = Math.floor(l + (r - l) / 2);
        let val = this.data[mid];

        if (val === this.target) {
          this.steps.push({
            l, r, mid,
            message: `Bước ${this.steps.length}: Mid = ${mid}, A[${mid}] = ${val} == ${this.target}. ĐÃ TÌM THẤY TẠI VỊ TRÍ ${mid}!`,
            status: "found"
          });
          found = true;
          break;
        } else if (val < this.target) {
          this.steps.push({
            l, r, mid,
            message: `Bước ${this.steps.length}: Mid = ${mid}, A[${mid}] = ${val} < ${this.target}. Thu hẹp tìm kiếm sang nửa phải (L = Mid + 1 = ${mid + 1}).`,
            status: "right"
          });
          l = mid + 1;
        } else {
          this.steps.push({
            l, r, mid,
            message: `Bước ${this.steps.length}: Mid = ${mid}, A[${mid}] = ${val} > ${this.target}. Thu hẹp tìm kiếm sang nửa trái (R = Mid - 1 = ${mid - 1}).`,
            status: "left"
          });
          r = mid - 1;
        }
      }

      if (!found) {
        this.steps.push({
          l, r, mid: -1,
          message: `Kết thúc: L = ${l} > R = ${r}. Giá trị ${this.target} không tồn tại trong mảng.`,
          status: "not_found"
        });
      }
    },

    render(containerId) {
      const container = document.getElementById(containerId);
      if (!container) return;

      const current = this.steps[this.currentStepIndex] || this.steps[0];
      const { l, r, mid, message, status } = current;

      let html = `
        <div class="visualizer-box">
          <div class="vis-header">
            <h4><i class="icon-search"></i> Mô Phỏng Tìm Kiếm Nhị Phân (Binary Search)</h4>
            <div class="vis-controls">
              <label>Giá trị tìm kiếm X: </label>
              <input type="number" id="bs-input-val" value="${this.target}" style="width: 70px; padding: 4px 8px; border: 1px solid #D5DEE8; border-radius: 4px;" />
              <button class="btn btn-sm btn-primary" onclick="VisualizerEngine.binarySearch.setTarget('${containerId}')">Cập nhật</button>
            </div>
          </div>
          
          <div class="array-container">
            ${this.data.map((val, idx) => {
              let isOutOfRange = (idx < l || idx > r) && status !== "found";
              let isMid = (idx === mid);
              let isFound = (isMid && status === "found");
              let isL = (idx === l && !isFound);
              let isR = (idx === r && !isFound);

              let classes = ["array-cell"];
              if (isOutOfRange) classes.push("dimmed");
              if (isMid) classes.push("is-mid");
              if (isFound) classes.push("is-found");

              let pointers = [];
              if (isL) pointers.push("<span class='pointer-badge ptr-l'>L</span>");
              if (isMid) pointers.push("<span class='pointer-badge ptr-m'>MID</span>");
              if (isR) pointers.push("<span class='pointer-badge ptr-r'>R</span>");

              return `
                <div class="${classes.join(" ")}">
                  <div class="cell-pointers">${pointers.join("")}</div>
                  <div class="cell-val">${val}</div>
                  <div class="cell-idx">[${idx}]</div>
                </div>
              `;
            }).join("")}
          </div>

          <div class="vis-log">
            <span class="vis-badge ${status === 'found' ? 'badge-success' : 'badge-info'}">Trạng thái</span>
            <p class="vis-msg">${message}</p>
          </div>

          <div class="vis-action-bar">
            <button class="btn btn-outline btn-sm" onclick="VisualizerEngine.binarySearch.prevStep('${containerId}')" ${this.currentStepIndex === 0 ? 'disabled' : ''}>
              &larr; Bước trước
            </button>
            <span class="step-counter">Bước ${this.currentStepIndex + 1} / ${this.steps.length}</span>
            <button class="btn btn-outline btn-sm" onclick="VisualizerEngine.binarySearch.nextStep('${containerId}')" ${this.currentStepIndex === this.steps.length - 1 ? 'disabled' : ''}>
              Bước sau &rarr;
            </button>
            <button class="btn btn-primary btn-sm" onclick="VisualizerEngine.binarySearch.togglePlay('${containerId}')">
              ${this.isPlaying ? '❚❚ Tạm dừng' : '▶ Tự động chạy'}
            </button>
            <button class="btn btn-secondary btn-sm" onclick="VisualizerEngine.binarySearch.reset('${containerId}')">
              Làm lại
            </button>
          </div>
        </div>
      `;
      container.innerHTML = html;
    },

    setTarget(containerId) {
      const input = document.getElementById("bs-input-val");
      if (input) {
        const val = parseInt(input.value, 10);
        if (!isNaN(val)) {
          this.init(containerId, val);
        }
      }
    },

    nextStep(containerId) {
      if (this.currentStepIndex < this.steps.length - 1) {
        this.currentStepIndex++;
        this.render(containerId);
      } else {
        this.pause();
      }
    },

    prevStep(containerId) {
      if (this.currentStepIndex > 0) {
        this.currentStepIndex--;
        this.render(containerId);
      }
    },

    togglePlay(containerId) {
      if (this.isPlaying) {
        this.pause();
        this.render(containerId);
      } else {
        this.isPlaying = true;
        this.render(containerId);
        this.timer = setInterval(() => {
          if (this.currentStepIndex < this.steps.length - 1) {
            this.nextStep(containerId);
          } else {
            this.pause();
            this.render(containerId);
          }
        }, 1200);
      }
    },

    pause() {
      this.isPlaying = false;
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    },

    reset(containerId) {
      this.pause();
      this.currentStepIndex = 0;
      this.render(containerId);
    }
  },

  // 2. TWO POINTERS VISUALIZER
  twoPointers: {
    data: [1, 3, 5, 7, 11, 14, 19, 25],
    target: 18,
    steps: [],
    currentStepIndex: 0,
    isPlaying: false,
    timer: null,

    init(containerId, target = 18) {
      this.target = target;
      this.generateSteps();
      this.currentStepIndex = 0;
      this.render(containerId);
    },

    generateSteps() {
      this.steps = [];
      let l = 0, r = this.data.length - 1;
      let found = false;

      this.steps.push({
        l, r, sum: this.data[l] + this.data[r],
        message: `Khởi tạo: Tìm cặp số có tổng bằng S = ${this.target}. L trỏ vị trí 0, R trỏ vị trí ${r}.`,
        status: "start"
      });

      while (l < r) {
        let sum = this.data[l] + this.data[r];
        if (sum === this.target) {
          this.steps.push({
            l, r, sum,
            message: `Tìm thấy cặp số: A[${l}] (${this.data[l]}) + A[${r}] (${this.data[r]}) = ${sum} == ${this.target}!`,
            status: "found"
          });
          found = true;
          break;
        } else if (sum < this.target) {
          this.steps.push({
            l, r, sum,
            message: `Tổng A[${l}] + A[${r}] = ${sum} < ${this.target}. Cần tăng tổng: dịch con trỏ L sang phải (L = ${l + 1}).`,
            status: "increase"
          });
          l++;
        } else {
          this.steps.push({
            l, r, sum,
            message: `Tổng A[${l}] + A[${r}] = ${sum} > ${this.target}. Cần giảm tổng: dịch con trỏ R sang trái (R = ${r - 1}).`,
            status: "decrease"
          });
          r--;
        }
      }

      if (!found) {
        this.steps.push({
          l, r, sum: 0,
          message: `Con trỏ gặp nhau (L >= R). Không tồn tại cặp số có tổng bằng ${this.target}.`,
          status: "not_found"
        });
      }
    },

    render(containerId) {
      const container = document.getElementById(containerId);
      if (!container) return;

      const current = this.steps[this.currentStepIndex] || this.steps[0];
      const { l, r, sum, message, status } = current;

      let html = `
        <div class="visualizer-box">
          <div class="vis-header">
            <h4><i class="icon-pointers"></i> Mô Phỏng Kỹ Thuật Hai Con Trỏ (Two Pointers)</h4>
            <div class="vis-controls">
              <label>Tổng mục tiêu S: </label>
              <input type="number" id="tp-input-val" value="${this.target}" style="width: 70px; padding: 4px 8px; border: 1px solid #D5DEE8; border-radius: 4px;" />
              <button class="btn btn-sm btn-primary" onclick="VisualizerEngine.twoPointers.setTarget('${containerId}')">Cập nhật</button>
            </div>
          </div>
          
          <div class="array-container">
            ${this.data.map((val, idx) => {
              let isL = (idx === l);
              let isR = (idx === r);
              let isFound = (status === "found" && (isL || isR));

              let classes = ["array-cell"];
              if (isFound) classes.push("is-found");
              else if (isL || isR) classes.push("is-active");

              let pointers = [];
              if (isL) pointers.push("<span class='pointer-badge ptr-l'>PTR L</span>");
              if (isR) pointers.push("<span class='pointer-badge ptr-r'>PTR R</span>");

              return `
                <div class="${classes.join(" ")}">
                  <div class="cell-pointers">${pointers.join("")}</div>
                  <div class="cell-val">${val}</div>
                  <div class="cell-idx">[${idx}]</div>
                </div>
              `;
            }).join("")}
          </div>

          <div class="sum-indicator">
            <span class="formula">A[L] + A[R] = ${this.data[l] || 0} + ${this.data[r] || 0} = <strong>${sum}</strong> (Mục tiêu: ${this.target})</span>
          </div>

          <div class="vis-log">
            <span class="vis-badge ${status === 'found' ? 'badge-success' : 'badge-info'}">Phân tích</span>
            <p class="vis-msg">${message}</p>
          </div>

          <div class="vis-action-bar">
            <button class="btn btn-outline btn-sm" onclick="VisualizerEngine.twoPointers.prevStep('${containerId}')" ${this.currentStepIndex === 0 ? 'disabled' : ''}>
              &larr; Bước trước
            </button>
            <span class="step-counter">Bước ${this.currentStepIndex + 1} / ${this.steps.length}</span>
            <button class="btn btn-outline btn-sm" onclick="VisualizerEngine.twoPointers.nextStep('${containerId}')" ${this.currentStepIndex === this.steps.length - 1 ? 'disabled' : ''}>
              Bước sau &rarr;
            </button>
            <button class="btn btn-secondary btn-sm" onclick="VisualizerEngine.twoPointers.reset('${containerId}')">
              Làm lại
            </button>
          </div>
        </div>
      `;
      container.innerHTML = html;
    },

    setTarget(containerId) {
      const input = document.getElementById("tp-input-val");
      if (input) {
        const val = parseInt(input.value, 10);
        if (!isNaN(val)) {
          this.init(containerId, val);
        }
      }
    },

    nextStep(containerId) {
      if (this.currentStepIndex < this.steps.length - 1) {
        this.currentStepIndex++;
        this.render(containerId);
      }
    },

    prevStep(containerId) {
      if (this.currentStepIndex > 0) {
        this.currentStepIndex--;
        this.render(containerId);
      }
    },

    reset(containerId) {
      this.currentStepIndex = 0;
      this.render(containerId);
    }
  },

  // 3. PREFIX SUM VISUALIZER
  prefixSum: {
    a: [0, 3, 1, 4, 1, 5, 9, 2, 6], // 1-indexed
    pref: [],
    l: 2,
    r: 6,

    init(containerId) {
      this.pref = [0];
      for (let i = 1; i < this.a.length; ++i) {
        this.pref[i] = this.pref[i - 1] + this.a[i];
      }
      this.render(containerId);
    },

    setRange(containerId, newL, newR) {
      this.l = Math.max(1, Math.min(newL, this.a.length - 1));
      this.r = Math.max(this.l, Math.min(newR, this.a.length - 1));
      this.render(containerId);
    },

    render(containerId) {
      const container = document.getElementById(containerId);
      if (!container) return;

      const sumVal = this.pref[this.r] - this.pref[this.l - 1];

      let html = `
        <div class="visualizer-box">
          <div class="vis-header">
            <h4><i class="icon-calc"></i> Mô Phỏng Mảng Cộng Dồn (Prefix Sum O(1) Query)</h4>
            <div class="vis-controls">
              <label>Đoạn [L, R]: </label>
              <span>L = </span>
              <input type="number" id="ps-input-l" min="1" max="8" value="${this.l}" style="width: 50px; padding: 4px; border: 1px solid #D5DEE8; border-radius: 4px;" />
              <span>R = </span>
              <input type="number" id="ps-input-r" min="1" max="8" value="${this.r}" style="width: 50px; padding: 4px; border: 1px solid #D5DEE8; border-radius: 4px;" />
              <button class="btn btn-sm btn-primary" onclick="VisualizerEngine.prefixSum.updateRangeFromInput('${containerId}')">Tính tổng</button>
            </div>
          </div>

          <div class="table-responsive">
            <p style="margin: 8px 0 4px 0; font-weight: 600; color: #1F3F73;">Mảng gốc A[i]:</p>
            <div class="array-container">
              ${this.a.slice(1).map((val, i) => {
                let idx = i + 1;
                let isInRange = (idx >= this.l && idx <= this.r);
                return `
                  <div class="array-cell ${isInRange ? 'is-in-range' : ''}">
                    <div class="cell-val">${val}</div>
                    <div class="cell-idx">[${idx}]</div>
                  </div>
                `;
              }).join("")}
            </div>

            <p style="margin: 16px 0 4px 0; font-weight: 600; color: #1F3F73;">Mảng tiền tố Pref[i] = Pref[i-1] + A[i]:</p>
            <div class="array-container">
              ${this.pref.map((val, idx) => {
                let isRight = (idx === this.r);
                let isLeftMinus1 = (idx === this.l - 1);
                let highlightClass = "";
                if (isRight) highlightClass = "is-pref-r";
                if (isLeftMinus1) highlightClass = "is-pref-l";

                return `
                  <div class="array-cell ${highlightClass}">
                    <div class="cell-val">${val}</div>
                    <div class="cell-idx">P[${idx}]</div>
                  </div>
                `;
              }).join("")}
            </div>
          </div>

          <div class="prefix-formula-card">
            <div class="formula-line">
              <span>Công thức O(1):</span>
              <code>Sum(${this.l}..${this.r}) = Pref[${this.r}] - Pref[${this.l - 1}]</code>
            </div>
            <div class="formula-calc">
              <code>= ${this.pref[this.r]} - ${this.pref[this.l - 1]} = <strong>${sumVal}</strong></code>
            </div>
            <div class="formula-note">
              (Kiểm chứng cộng trực tiếp: ${this.a.slice(this.l, this.r + 1).join(" + ")} = ${sumVal})
            </div>
          </div>
        </div>
      `;
      container.innerHTML = html;
    },

    updateRangeFromInput(containerId) {
      const inL = document.getElementById("ps-input-l");
      const inR = document.getElementById("ps-input-r");
      if (inL && inR) {
        let l = parseInt(inL.value, 10);
        let r = parseInt(inR.value, 10);
        this.setRange(containerId, l, r);
      }
    }
  }
};
