/**
 * MarisaOJ ICPC Roadmap - Interactive Controller Application
 * Nâng cấp tính năng Sư phạm cốt lõi:
 * 1. Bộ tạo lộ trình học tự động (Study Planner) theo từng tuần
 * 2. Thanh tiến độ trực quan (Progress Bar) & nút Đánh dấu hoàn thành từng chủ đề
 * 3. Nút Copy nhanh Template C++ chuẩn ICPC trực tiếp trên từng thẻ
 */

// Trạng thái ứng dụng
const AppState = {
  currentLevelFilter: "all",
  searchQuery: "",
  currentTopic: null,
  activeModalTab: "tab-intuition",
  activeVisTab: "bs",
  // Tiến độ học tập lưu trong LocalStorage: { [topicId]: 'not_started' | 'learning' | 'completed' }
  progress: JSON.parse(localStorage.getItem("marisa_cp_progress") || "{}")
};

/**
 * Hàm tích hợp KaTeX tự động render công thức toán học và độ phức tạp
 */
function renderMath(container = document.body) {
  if (!container) return;
  if (typeof renderMathInElement === "function") {
    try {
      renderMathInElement(container, {
        delimiters: [
          { left: "$$", right: "$$", display: true },
          { left: "\\[", right: "\\]", display: true },
          { left: "$", right: "$", display: false },
          { left: "\\(", right: "\\)", display: false }
        ],
        throwOnError: false,
        ignoredTags: ["script", "noscript", "style", "textarea", "pre", "code"]
      });
    } catch (err) {
      console.warn("KaTeX render notice:", err);
    }
  } else {
    // Retry nhẹ trong trường hợp KaTeX script đang tải bất đồng bộ (defer)
    setTimeout(() => {
      if (typeof renderMathInElement === "function") {
        renderMath(container);
      }
    }, 300);
  }
}

// Khởi chạy khi DOM sẵn sàng
document.addEventListener("DOMContentLoaded", () => {
  renderRoadmapTree();
  renderCheatsheet();
  initSearchAndFilters();
  initModalListeners();
  initVisualizerLab();
  updateProgressStats();
  // Khởi tạo Study Planner mặc định và gán sự kiện lắng nghe tự động cập nhật
  initStudyPlannerListeners();
  generateStudyPlan();
  renderMath(document.body);
});

function initStudyPlannerListeners() {
  const inputs = ["planner-start-level", "planner-target-level", "planner-daily-hours", "planner-days-week"];
  inputs.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener("change", () => {
        generateStudyPlan();
      });
    }
  });
}

/* ==========================================================================
   1. RENDER ROADMAP TREE (SƠ ĐỒ CÂY LỘ TRÌNH LEVEL 0 -> 6, 100)
   ========================================================================== */
function renderRoadmapTree() {
  const treeContainer = document.getElementById("tree-spine-container");
  if (!treeContainer) return;

  const filteredLevels = MARISA_ROADMAP_DATA.filter(level => {
    // 1. Lọc theo Level Chip
    if (AppState.currentLevelFilter !== "all" && level.id !== AppState.currentLevelFilter) {
      return false;
    }

    // 2. Lọc theo Từ khóa tìm kiếm
    if (AppState.searchQuery.trim() !== "") {
      const query = AppState.searchQuery.toLowerCase();
      const matchLevel = level.title.toLowerCase().includes(query) || 
                         level.vietnameseTitle.toLowerCase().includes(query) ||
                         level.description.toLowerCase().includes(query);
      
      const hasMatchingTopic = level.topics.some(t => 
        t.title.toLowerCase().includes(query) ||
        t.category.toLowerCase().includes(query) ||
        t.shortDesc.toLowerCase().includes(query) ||
        t.intuition.toLowerCase().includes(query)
      );

      return matchLevel || hasMatchingTopic;
    }

    return true;
  });

  if (filteredLevels.length === 0) {
    treeContainer.innerHTML = `
      <div style="text-align: center; padding: 48px; background: #EEF2F7; border-radius: 12px;">
        <h3 style="color: #1F3F73; margin-bottom: 8px;">Không tìm thấy chủ đề phù hợp</h3>
        <p style="color: #5B6E87;">Vui lòng thử tìm kiếm với từ khóa khác như "Nhị phân", "DP", "Segment Tree", "Graph"...</p>
        <button class="btn btn-primary" style="margin-top: 16px;" onclick="resetSearch()">Xóa bộ lọc</button>
      </div>
    `;
    return;
  }

  let html = "";
  filteredLevels.forEach(level => {
    const isBoss = (level.levelNumber === 100);
    const starString = "★".repeat(level.difficultyStars) + "☆".repeat(5 - level.difficultyStars);

    // Lọc các chủ đề con nếu có search query
    let displayedTopics = level.topics;
    if (AppState.searchQuery.trim() !== "") {
      const query = AppState.searchQuery.toLowerCase();
      displayedTopics = level.topics.filter(t => 
        t.title.toLowerCase().includes(query) ||
        t.category.toLowerCase().includes(query) ||
        t.shortDesc.toLowerCase().includes(query) ||
        t.intuition.toLowerCase().includes(query)
      );
    }

    if (displayedTopics.length === 0) return; // Bỏ qua level không có chủ đề khớp trong kết quả tìm kiếm

    html += `
      <div class="level-block ${isBoss ? 'boss-level' : ''}" id="${level.id}">
        <!-- Mốc đánh dấu Milestone Badge -->
        <div class="level-milestone">
          <div class="milestone-badge" title="${level.title}">
            <span class="milestone-sub">LVL</span>
            <span class="milestone-num">${level.levelNumber}</span>
          </div>
        </div>

        <!-- Khối thẻ nội dung Level -->
        <div class="level-card">
          <div class="level-card-header">
            <div class="level-header-left">
              <div class="level-title-group">
                <h3 class="level-main-title">${level.vietnameseTitle}</h3>
                <span class="level-badge-tag">${level.title}</span>
              </div>
              <p class="level-tagline">${level.tagline}</p>
            </div>
            <div class="level-meta-chips">
              <span class="meta-chip"><span style="color:#F59E0B;">${starString}</span> Độ khó</span>
              <span class="meta-chip">⏱ ${level.estimatedTime}</span>
              <a href="${level.marisaUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-outline" style="font-size:0.75rem;">
                Mở MarisaOJ ↗
              </a>
            </div>
          </div>

          <p class="level-card-desc">${level.description}</p>

          <!-- Danh sách chủ đề con (Sub-topics) -->
          <div class="subtopics-wrapper">
            <div class="subtopics-label">
              <span>Chuyên đề cốt lõi (${displayedTopics.length} nội dung)</span>
              <span style="font-size: 0.75rem; color: #5B6E87; font-weight: 500;">Bấm vào thẻ để xem Modal chi tiết hoặc dùng nút thao tác nhanh</span>
            </div>
            <div class="subtopics-grid">
              ${displayedTopics.map(topic => {
                const status = AppState.progress[topic.id] || "not_started";
                const isCompleted = (status === "completed");

                return `
                  <div class="topic-node ${isCompleted ? 'is-completed' : ''}" id="topic-card-${topic.id}">
                    <!-- Thanh thao tác nhanh: Checkbox hoàn thành & Copy nhanh Template C++ -->
                    <div class="topic-card-actions">
                      <button 
                        class="topic-check-btn ${isCompleted ? 'checked' : ''}" 
                        onclick="toggleTopicCompletion('${topic.id}', event)"
                        title="${isCompleted ? 'Bấm để hủy hoàn thành' : 'Đánh dấu đã hoàn thành'}"
                      >
                        <span class="check-icon">${isCompleted ? '✔' : '○'}</span>
                        <span class="check-text">${isCompleted ? 'Đã hoàn thành' : 'Chưa học'}</span>
                      </button>

                      <button 
                        class="quick-copy-btn" 
                        onclick="quickCopyCpp('${topic.id}', event)"
                        title="Sao chép nhanh Template C++ chuẩn"
                      >
                        <span>📋</span> C++
                      </button>
                    </div>

                    <!-- Phần thân thẻ: Bấm vào để mở Modal chi tiết 4 tab -->
                    <div class="topic-node-body" onclick="openTopicModal('${topic.id}', '${level.id}')" title="${topic.shortDesc}">
                      <div class="topic-node-info">
                        <h4 class="topic-node-title">${topic.title}</h4>
                        <div class="topic-node-meta">
                          <span class="topic-category-tag">${topic.category}</span>
                          <span class="topic-difficulty-stars">${'★'.repeat(topic.difficulty)}</span>
                        </div>
                      </div>
                      <div class="topic-node-arrow" title="Xem giải thích & trực quan">
                        &rarr;
                      </div>
                    </div>
                  </div>
                `;
              }).join("")}
            </div>
          </div>
        </div>
      </div>
    `;
  });

  treeContainer.innerHTML = html;
  renderMath(treeContainer);
}

/* ==========================================================================
   2. TIẾN ĐỘ HỌC TẬP & LOCALSTORAGE (CORE FEATURE 2)
   ========================================================================== */
function toggleTopicCompletion(topicId, event) {
  if (event) event.stopPropagation(); // Không mở modal

  const current = AppState.progress[topicId] || "not_started";
  const newStatus = (current === "completed") ? "not_started" : "completed";
  
  AppState.progress[topicId] = newStatus;
  localStorage.setItem("marisa_cp_progress", JSON.stringify(AppState.progress));

  // Cập nhật giao diện thẻ tức thời
  const card = document.getElementById(`topic-card-${topicId}`);
  if (card) {
    const checkBtn = card.querySelector(".topic-check-btn");
    if (newStatus === "completed") {
      card.classList.add("is-completed");
      if (checkBtn) {
        checkBtn.classList.add("checked");
        checkBtn.innerHTML = `<span class="check-icon">✔</span><span class="check-text">Đã hoàn thành</span>`;
      }
    } else {
      card.classList.remove("is-completed");
      if (checkBtn) {
        checkBtn.classList.remove("checked");
        checkBtn.innerHTML = `<span class="check-icon">○</span><span class="check-text">Chưa học</span>`;
      }
    }
  }

  // Cập nhật Modal nếu đang mở
  if (AppState.currentTopic && AppState.currentTopic.id === topicId) {
    updateModalStatusButton(topicId);
  }

  // Đồng bộ lại Study Planner Checklist nếu đang hiển thị
  const plannerCheck = document.getElementById(`planner-chk-${topicId}`);
  if (plannerCheck) {
    plannerCheck.checked = (newStatus === "completed");
    const pItem = plannerCheck.closest(".week-topic-item");
    if (pItem) {
      if (newStatus === "completed") pItem.classList.add("completed");
      else pItem.classList.remove("completed");
    }
  }

  // Tính lại tiến độ
  updateProgressStats();

  // Thông báo toast
  if (newStatus === "completed") {
    showToast("🎉 Tuyệt vời! Bạn đã hoàn thành chuyên đề này.");
  } else {
    showToast("Đã đặt lại trạng thái: Chưa học.");
  }
}

function updateProgressStats() {
  let globalTotal = 0;
  let globalCompleted = 0;
  const levelStats = [];

  MARISA_ROADMAP_DATA.forEach(lvl => {
    let lvlTotal = lvl.topics.length;
    let lvlDone = 0;
    globalTotal += lvlTotal;

    lvl.topics.forEach(t => {
      if (AppState.progress[t.id] === "completed") {
        globalCompleted++;
        lvlDone++;
      }
    });

    levelStats.push({
      id: lvl.id,
      number: lvl.levelNumber,
      title: lvl.title,
      done: lvlDone,
      total: lvlTotal,
      isAllDone: (lvlDone === lvlTotal && lvlTotal > 0)
    });
  });

  const globalPercent = globalTotal > 0 ? Math.round((globalCompleted / globalTotal) * 100) : 0;

  // 1. Cập nhật thanh header và hero stat luôn phản ánh toàn khóa
  const progressPill = document.getElementById("header-progress-text");
  if (progressPill) {
    progressPill.innerText = `${globalCompleted}/${globalTotal} chuyên đề (${globalPercent}%)`;
  }

  const statProgress = document.getElementById("stat-hero-progress");
  if (statProgress) {
    statProgress.innerText = `${globalPercent}%`;
  }

  // 2. Tính toán tiến độ trong phạm vi lọc/tìm kiếm hiện tại (Contextual Filter / Search Scope)
  const isLevelFiltered = (AppState.currentLevelFilter !== "all");
  const isSearchActive = (AppState.searchQuery.trim() !== "");
  const isFiltered = (isLevelFiltered || isSearchActive);

  let scopedTopics = [];
  MARISA_ROADMAP_DATA.forEach(lvl => {
    if (isLevelFiltered && lvl.id !== AppState.currentLevelFilter) return;
    lvl.topics.forEach(t => {
      if (isSearchActive) {
        const q = AppState.searchQuery.toLowerCase();
        const match = t.title.toLowerCase().includes(q) ||
                      t.category.toLowerCase().includes(q) ||
                      t.shortDesc.toLowerCase().includes(q) ||
                      t.intuition.toLowerCase().includes(q);
        if (!match) return;
      }
      scopedTopics.push(t);
    });
  });

  const scopeTotal = scopedTopics.length;
  const scopeCompleted = scopedTopics.filter(t => AppState.progress[t.id] === "completed").length;
  const scopePercent = scopeTotal > 0 ? Math.round((scopeCompleted / scopeTotal) * 100) : 0;

  // 3. Cập nhật thanh Progress Bar lớn và nhãn trạng thái động
  const progressBarFill = document.getElementById("progress-bar-fill");
  const progressBarCount = document.getElementById("progress-bar-count");
  const badge = document.getElementById("progress-status-badge");

  if (isFiltered) {
    // Khi đang áp dụng bộ lọc hoặc tìm kiếm
    let filterLabels = [];
    if (isLevelFiltered) {
      const lvlObj = MARISA_ROADMAP_DATA.find(l => l.id === AppState.currentLevelFilter);
      filterLabels.push(lvlObj ? lvlObj.title.split(":")[0] : AppState.currentLevelFilter);
    }
    if (isSearchActive) {
      filterLabels.push(`"${AppState.searchQuery}"`);
    }

    if (progressBarFill) {
      progressBarFill.style.width = `${scopePercent}%`;
    }
    if (progressBarCount) {
      progressBarCount.innerHTML = `
        Đang lọc (${filterLabels.join(" + ")}): <strong>${scopeCompleted} / ${scopeTotal}</strong> chuyên đề (${scopePercent}%)
        <span style="font-size:0.82rem; color:#5B6E87; font-weight:normal; margin-left:8px;">
          • Toàn khóa: ${globalCompleted}/${globalTotal} (${globalPercent}%)
        </span>
      `;
    }
    if (badge) {
      badge.innerText = `Bộ lọc: ${scopePercent}%`;
      badge.style.backgroundColor = "#DBEAFE";
      badge.style.color = "#1F3F73";
    }
  } else {
    // Khi xem toàn bộ lộ trình
    if (progressBarFill) {
      progressBarFill.style.width = `${globalPercent}%`;
    }
    if (progressBarCount) {
      progressBarCount.innerText = `${globalCompleted} / ${globalTotal} chuyên đề hoàn thành (${globalPercent}%)`;
    }
    if (badge) {
      badge.style.backgroundColor = "";
      badge.style.color = "";
      if (globalPercent === 0) badge.innerText = "Chưa bắt đầu";
      else if (globalPercent <= 25) badge.innerText = "Đang khởi động";
      else if (globalPercent <= 55) badge.innerText = "Tăng tốc kiến thức";
      else if (globalPercent <= 85) badge.innerText = "Bứt phá nâng cao";
      else if (globalPercent < 100) badge.innerText = "Sắp về đích!";
      else badge.innerText = "🏆 Đạt chuẩn ICPC!";
    }
  }

  // 4. Cập nhật các viên thuốc thống kê từng Level kèm highlight chip đang chọn
  const grid = document.getElementById("level-progress-grid");
  if (grid) {
    grid.innerHTML = levelStats.map(ls => {
      const isCurrentFilter = (ls.id === AppState.currentLevelFilter);
      return `
        <a href="#${ls.id}" class="level-prog-pill ${ls.isAllDone ? 'completed' : ''} ${isCurrentFilter ? 'active-level-chip' : ''}" title="Bấm để cuộn tới ${ls.title}">
          <span class="prog-dot"></span>
          <span>L${ls.number}: <strong>${ls.done}/${ls.total}</strong></span>
        </a>
      `;
    }).join("");
  }
}

function resetAllProgress() {
  if (confirm("Bạn có chắc chắn muốn đặt lại toàn bộ tiến độ học tập về 0%?")) {
    AppState.progress = {};
    localStorage.removeItem("marisa_cp_progress");
    renderRoadmapTree();
    updateProgressStats();
    generateStudyPlan();
    showToast("Đã đặt lại toàn bộ tiến độ học tập!");
  }
}

/* ==========================================================================
   3. SAO CHÉP NHANH TEMPLATE C++ CHUẨN ICPC (CORE FEATURE 2)
   ========================================================================== */
function quickCopyCpp(topicId, event) {
  if (event) event.stopPropagation(); // Không mở modal

  let targetTopic = null;
  for (const lvl of MARISA_ROADMAP_DATA) {
    const found = lvl.topics.find(t => t.id === topicId);
    if (found) {
      targetTopic = found;
      break;
    }
  }

  if (!targetTopic || !targetTopic.cppTemplate) {
    showToast("Không tìm thấy Template C++.");
    return;
  }

  navigator.clipboard.writeText(targetTopic.cppTemplate).then(() => {
    showToast(`⚡ Đã sao chép nhanh Template C++ "${targetTopic.title}"!`);
  }).catch(() => {
    showToast("Không thể sao chép tự động. Vui lòng thử lại.");
  });
}

function copyCppCode() {
  const codeElem = document.getElementById("modal-cpp-code");
  if (!codeElem) return;

  const text = codeElem.textContent;
  navigator.clipboard.writeText(text).then(() => {
    showToast("Đã sao chép Template C++ vào bộ nhớ tạm!");
  }).catch(() => {
    showToast("Không thể tự động sao chép. Vui lòng copy thủ công.");
  });
}

/* ==========================================================================
   4. BỘ TẠO LỘ TRÌNH HỌC TỰ ĐỘNG (STUDY PLANNER - CORE FEATURE 1)
   ========================================================================== */
function generateStudyPlan() {
  const startLvlElem = document.getElementById("planner-start-level");
  const targetLvlElem = document.getElementById("planner-target-level");
  const dailyHoursElem = document.getElementById("planner-daily-hours");
  const daysWeekElem = document.getElementById("planner-days-week");
  const resultContainer = document.getElementById("planner-result-container");

  if (!startLvlElem || !targetLvlElem || !dailyHoursElem || !daysWeekElem || !resultContainer) return;

  const startLevelId = startLvlElem.value;
  const targetLevelId = targetLvlElem.value;
  const dailyHours = parseFloat(dailyHoursElem.value) || 2;
  const daysPerWeek = parseInt(daysWeekElem.value, 10) || 6;

  // Lấy danh sách Level index
  const startIdx = MARISA_ROADMAP_DATA.findIndex(l => l.id === startLevelId);
  const targetIdx = MARISA_ROADMAP_DATA.findIndex(l => l.id === targetLevelId);

  if (startIdx > targetIdx) {
    resultContainer.innerHTML = `
      <div style="padding: 24px; background: #FEE2E2; border: 1px solid #FECACA; border-radius: 8px; color: #991B1B; margin-top: 20px;">
        <strong>Lỗi lập kế hoạch:</strong> Trình độ hiện tại (${MARISA_ROADMAP_DATA[startIdx].title}) cao hơn hoặc bằng Mục tiêu (${MARISA_ROADMAP_DATA[targetIdx].title}). Vui lòng chọn Mục tiêu cao hơn trình độ hiện tại để hệ thống lên lịch học tập.
      </div>
    `;
    return;
  }

  // Thu thập tất cả chuyên đề cần học từ startLevel tới targetLevel
  const plannedTopics = [];
  for (let i = startIdx; i <= targetIdx; ++i) {
    const lvl = MARISA_ROADMAP_DATA[i];
    lvl.topics.forEach(topic => {
      // Ước lượng thời lượng trung bình cho mỗi chuyên đề:
      // Level 0: 3h, Level 1: 4h, Level 2: 5h, Level 3: 6h, Level 4: 8h, Level 5: 10h, Level 6: 12h
      let topicWeightHours = 4;
      if (lvl.levelNumber === 0) topicWeightHours = 3;
      else if (lvl.levelNumber === 1) topicWeightHours = 4;
      else if (lvl.levelNumber === 2) topicWeightHours = 5;
      else if (lvl.levelNumber === 3) topicWeightHours = 6;
      else if (lvl.levelNumber === 4) topicWeightHours = 8;
      else if (lvl.levelNumber >= 5) topicWeightHours = 10;

      plannedTopics.push({
        ...topic,
        levelNumber: lvl.levelNumber,
        levelTitle: lvl.title,
        estimatedHours: topicWeightHours
      });
    });
  }

  // Tính toán chỉ số tổng thể
  const totalTopicsCount = plannedTopics.length;
  const totalRequiredHours = plannedTopics.reduce((acc, cur) => acc + cur.estimatedHours, 0);
  const weeklyBudgetHours = dailyHours * daysPerWeek;
  const totalWeeks = Math.max(1, Math.ceil(totalRequiredHours / weeklyBudgetHours));

  // Tính ngày hoàn thành mục tiêu dự kiến
  const targetDays = totalWeeks * 7;
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + targetDays);
  const formattedTargetDate = targetDate.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });

  // Phân bổ chuyên đề vào từng tuần (Mỗi tuần nhận các topic sao cho tổng giờ ≈ weeklyBudgetHours)
  const weeksPlan = [];
  let currentWeekTopics = [];
  let currentWeekHours = 0;
  let weekIndex = 1;

  plannedTopics.forEach((t, idx) => {
    currentWeekTopics.push(t);
    currentWeekHours += t.estimatedHours;

    // Khi đủ quỹ giờ tuần hoặc là chuyên đề cuối cùng
    if (currentWeekHours >= weeklyBudgetHours || idx === plannedTopics.length - 1) {
      weeksPlan.push({
        weekNumber: weekIndex,
        topics: [...currentWeekTopics],
        totalHours: currentWeekHours
      });
      weekIndex++;
      currentWeekTopics = [];
      currentWeekHours = 0;
    }
  });

  // Coach advice logic theo tuần
  const getCoachWeeklyAdvice = (weekNum, topics) => {
    const hasGraph = topics.some(t => t.category.includes("Đồ thị") || t.id.includes("bfs") || t.id.includes("dfs") || t.id.includes("dijkstra"));
    const hasTree = topics.some(t => t.id.includes("segment") || t.id.includes("fenwick") || t.id.includes("lca"));
    const hasDP = topics.some(t => t.category.includes("Quy hoạch") || t.id.includes("dp"));
    const hasBS = topics.some(t => t.id.includes("binary-search"));

    if (hasBS) return "Ưu tiên luyện tập chặt nhị phân kết quả trên MarisaOJ. Chú ý tính chất đơn điệu của hàm check(mid).";
    if (hasDP) return "Luôn viết công thức truy hồi và bài toán cơ sở ra giấy trước khi code. Tối ưu không gian bằng mảng 1D khi có thể.";
    if (hasTree) return "Cài đặt Segment Tree/Fenwick theo dạng struct sạch sẽ. Luôn nhớ khai báo kích thước 4*N cho Segment Tree.";
    if (hasGraph) return "Phân biệt rõ đồ thị có trọng số và không trọng số. Đánh dấu visited ngay khi push vào Queue để tránh TLE/MLE.";
    return "Dành 30% thời gian đọc lý thuyết, 70% thời gian gõ code và nộp bài trực tiếp trên hệ thống MarisaOJ.";
  };

  // Render HTML cho Kế hoạch học tập
  let html = `
    <!-- Thống kê tổng quan kế hoạch -->
    <div class="planner-summary-card">
      <div class="summary-metric">
        <span class="metric-label">Khối lượng học</span>
        <span class="metric-val">${totalTopicsCount}</span>
        <span class="metric-desc">Chuyên đề trọng tâm</span>
      </div>
      <div class="summary-metric">
        <span class="metric-label">Tổng thời lượng</span>
        <span class="metric-val">${totalRequiredHours}h</span>
        <span class="metric-desc">${weeklyBudgetHours} giờ / tuần (${dailyHours}h/ngày × ${daysPerWeek} ngày)</span>
      </div>
      <div class="summary-metric">
        <span class="metric-label">Số tuần dự kiến</span>
        <span class="metric-val">${weeksPlan.length}</span>
        <span class="metric-desc">Tuần học tập bài bản</span>
      </div>
      <div class="summary-metric">
        <span class="metric-label">Cán đích dự kiến</span>
        <span class="metric-val" style="color: #10B981;">${formattedTargetDate}</span>
        <span class="metric-desc">Chinh phục thành công ${MARISA_ROADMAP_DATA[targetIdx].title}</span>
      </div>
    </div>

    <!-- Danh sách chi tiết từng tuần -->
    <div class="timeline-container">
      ${weeksPlan.map(wp => {
        const coachAdvice = getCoachWeeklyAdvice(wp.weekNumber, wp.topics);
        const focusTopicTitles = wp.topics.map(t => t.title.split("(")[0]).slice(0, 2).join(" & ");

        return `
          <div class="week-card">
            <div class="week-card-header">
              <div class="week-title-badge">
                <span class="week-tag">TUẦN ${wp.weekNumber}</span>
                <span class="week-name">Trọng tâm: ${focusTopicTitles}</span>
              </div>
              <span class="week-time-chip">⏱ ~${wp.totalHours} giờ học tập</span>
            </div>

            <div class="week-topics-list">
              ${wp.topics.map(t => {
                const isCompleted = (AppState.progress[t.id] === "completed");
                return `
                  <div class="week-topic-item ${isCompleted ? 'completed' : ''}">
                    <div class="week-topic-info">
                      <input 
                        type="checkbox" 
                        id="planner-chk-${t.id}" 
                        ${isCompleted ? 'checked' : ''} 
                        onchange="toggleTopicCompletion('${t.id}', event)" 
                        style="width: 18px; height: 18px; cursor: pointer; accent-color: #10B981;"
                        title="Đánh dấu đã hoàn thành"
                      />
                      <span class="week-topic-title" title="${t.title}">L${t.levelNumber}: ${t.title}</span>
                    </div>
                    <div style="display:flex; align-items:center; gap:6px;">
                      <button class="btn btn-sm btn-outline" style="padding: 3px 8px; font-size: 0.72rem;" onclick="openTopicModal('${t.id}', 'level-${t.levelNumber}')">
                        Chi tiết
                      </button>
                      <button class="quick-copy-btn" onclick="quickCopyCpp('${t.id}', event)" title="Copy nhanh template C++">
                        📋 C++
                      </button>
                    </div>
                  </div>
                `;
              }).join("")}
            </div>

            <!-- Lời dặn dò của Huấn Luyện Viên -->
            <div class="week-coach-note">
              <span style="font-size: 1.1rem;">👨‍🏫</span>
              <div>
                <strong>Lời dặn của Coach:</strong> ${coachAdvice}
              </div>
            </div>
          </div>
        `;
      }).join("")}
    </div>
  `;

  resultContainer.innerHTML = html;
  renderMath(resultContainer);
}

function printStudyPlan() {
  window.print();
}

/* ==========================================================================
   5. CHEATSHEET BẢNG QUY TẮC ĐỘ PHỨC TẠP ICPC
   ========================================================================== */
function renderCheatsheet() {
  const tbody = document.getElementById("cheatsheet-tbody");
  if (!tbody || typeof ICPC_COMPLEXITY_RULES === "undefined") return;

  tbody.innerHTML = ICPC_COMPLEXITY_RULES.map(rule => `
    <tr>
      <td style="font-weight: 700; color: #1F3F73;">${rule.nLimit}</td>
      <td><span class="complexity-code">${rule.complexity}</span></td>
      <td>${rule.algorithms}</td>
    </tr>
  `).join("");
  renderMath(tbody);
}

/* ==========================================================================
   6. BỘ LỌC & TÌM KIẾM
   ========================================================================== */
function initSearchAndFilters() {
  const searchInput = document.getElementById("search-input");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      AppState.searchQuery = e.target.value;
      renderRoadmapTree();
      updateProgressStats();
    });
  }

  const chips = document.querySelectorAll(".filter-chip");
  chips.forEach(chip => {
    chip.addEventListener("click", () => {
      chips.forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      AppState.currentLevelFilter = chip.getAttribute("data-level") || "all";
      renderRoadmapTree();
      updateProgressStats();
    });
  });
}

function resetSearch() {
  AppState.searchQuery = "";
  AppState.currentLevelFilter = "all";
  const searchInput = document.getElementById("search-input");
  if (searchInput) searchInput.value = "";
  const chips = document.querySelectorAll(".filter-chip");
  chips.forEach(c => {
    if (c.getAttribute("data-level") === "all") c.classList.add("active");
    else c.classList.remove("active");
  });
  renderRoadmapTree();
  updateProgressStats();
}

/* ==========================================================================
   7. MODAL CHI TIẾT THUẬT TOÁN (TABS, COMPLEXITY, TEMPLATE, MARISA PRACTICE)
   ========================================================================== */
function openTopicModal(topicId, levelId) {
  let targetTopic = null;
  let targetLevel = null;

  for (const lvl of MARISA_ROADMAP_DATA) {
    const found = lvl.topics.find(t => t.id === topicId);
    if (found) {
      targetTopic = found;
      targetLevel = lvl;
      break;
    }
  }

  if (!targetTopic || !targetLevel) return;

  AppState.currentTopic = targetTopic;

  // Cập nhật Breadcrumb & Tiêu đề
  document.getElementById("modal-breadcrumb-level").innerText = targetLevel.title;
  document.getElementById("modal-breadcrumb-category").innerText = targetTopic.category;
  document.getElementById("modal-title").innerText = targetTopic.title;

  // Cập nhật trạng thái học tập của Topic trong Modal
  updateModalStatusButton(targetTopic.id);

  // Cập nhật Tab 1: Bản chất & Trực quan
  document.getElementById("modal-intuition-text").innerText = targetTopic.intuition;
  document.getElementById("modal-short-desc").innerText = targetTopic.shortDesc;

  // Nhúng bộ mô phỏng nếu topic phù hợp
  const inlineVisContainer = document.getElementById("modal-inline-vis");
  inlineVisContainer.innerHTML = "";
  if (topicId === "binary-search" || topicId === "binary-search-ans") {
    inlineVisContainer.innerHTML = `<div id="modal-bs-box"></div>`;
    VisualizerEngine.binarySearch.init("modal-bs-box", 23);
  } else if (topicId === "two-pointers" || topicId === "sliding-window") {
    inlineVisContainer.innerHTML = `<div id="modal-tp-box"></div>`;
    VisualizerEngine.twoPointers.init("modal-tp-box", 18);
  } else if (topicId === "prefix-sum" || topicId === "difference-array") {
    inlineVisContainer.innerHTML = `<div id="modal-ps-box"></div>`;
    VisualizerEngine.prefixSum.init("modal-ps-box");
  }

  // Cập nhật Tab 2: Độ phức tạp & Cạm bẫy
  document.getElementById("modal-time-complexity").innerText = targetTopic.timeComplexity;
  document.getElementById("modal-space-complexity").innerText = targetTopic.spaceComplexity;
  document.getElementById("modal-coach-tip").innerText = targetTopic.icpcTips || "Luôn giải quyết trước bài toán trên giấy nháp và ước lượng cận trên thời gian trước khi gõ code.";

  const pitfallsList = document.getElementById("modal-pitfalls-list");
  if (targetTopic.pitfalls && targetTopic.pitfalls.length > 0) {
    pitfallsList.innerHTML = targetTopic.pitfalls.map(p => `
      <li>
        <span style="color:#DC2626; font-weight:bold;">⚠</span>
        <span>${p}</span>
      </li>
    `).join("");
  } else {
    pitfallsList.innerHTML = `<li>Không có cạm bẫy đặc biệt.</li>`;
  }

  // Cập nhật Tab 3: C++ Template Code
  document.getElementById("modal-cpp-code").textContent = targetTopic.cppTemplate;

  // Cập nhật Tab 4: Bài tập MarisaOJ
  const practiceList = document.getElementById("modal-practice-list");
  if (targetTopic.marisaProblems && targetTopic.marisaProblems.length > 0) {
    practiceList.innerHTML = targetTopic.marisaProblems.map(p => `
      <div class="practice-card">
        <div class="practice-info">
          <span class="practice-code-badge">ID ${p.code}</span>
          <span class="practice-name">${p.name}</span>
          <span class="practice-diff ${getDiffClass(p.difficulty)}">${p.difficulty}</span>
        </div>
        <a href="${p.link}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-primary">
          Luyện bài trên MarisaOJ ↗
        </a>
      </div>
    `).join("");
  } else {
    practiceList.innerHTML = `
      <div style="padding: 16px; background:#EEF2F7; border-radius:8px;">
        <p>Truy cập trực tiếp lộ trình trên MarisaOJ để thực hành toàn bộ bài tập liên quan:</p>
      </div>
    `;
  }

  // Direct link footer
  const footerDirectLink = document.getElementById("modal-marisa-direct");
  footerDirectLink.href = targetTopic.marisaUrl || "https://marisaoj.com/roadmap";

  // Mặc định về Tab 1
  switchModalTab("tab-intuition");

  // Mở modal
  const modalOverlay = document.getElementById("modal-overlay");
  modalOverlay.classList.add("active");
  document.body.style.overflow = "hidden"; // Chặn cuộn trang nền

  // Render công thức toán học và độ phức tạp bằng KaTeX
  renderMath(document.querySelector(".modal-dialog"));
}

function getDiffClass(diff) {
  if (diff === "Rất dễ" || diff === "Dễ" || diff === "Cơ bản") return "diff-easy";
  if (diff === "Trung bình") return "diff-med";
  return "diff-hard";
}

function closeModal() {
  const modalOverlay = document.getElementById("modal-overlay");
  modalOverlay.classList.remove("active");
  document.body.style.overflow = "";

  // Tạm dừng visualizer nếu đang chạy
  VisualizerEngine.binarySearch.pause();
}

function initModalListeners() {
  const modalOverlay = document.getElementById("modal-overlay");
  if (modalOverlay) {
    modalOverlay.addEventListener("click", (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  // Phím Esc để đóng Modal
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeModal();
    }
  });

  // Modal Tabs switching
  const tabBtns = document.querySelectorAll(".modal-tab-btn");
  tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const targetTab = btn.getAttribute("data-tab");
      switchModalTab(targetTab);
    });
  });
}

function switchModalTab(tabId) {
  AppState.activeModalTab = tabId;

  document.querySelectorAll(".modal-tab-btn").forEach(btn => {
    if (btn.getAttribute("data-tab") === tabId) btn.classList.add("active");
    else btn.classList.remove("active");
  });

  document.querySelectorAll(".tab-pane").forEach(pane => {
    if (pane.id === tabId) pane.classList.add("active");
    else pane.classList.remove("active");
  });

  // Render toán học trong tab vừa chuyển
  const activePane = document.getElementById(tabId);
  if (activePane) renderMath(activePane);
}

// Cập nhật nút trạng thái học tập trong Modal
function updateModalStatusButton(topicId) {
  const btn = document.getElementById("btn-toggle-status");
  if (!btn) return;

  const currentStatus = AppState.progress[topicId] || "not_started";
  if (currentStatus === "completed") {
    btn.innerHTML = `<span style="color:#10B981;">✔</span> Đã thành thạo`;
    btn.className = "btn btn-sm btn-secondary";
  } else {
    btn.innerHTML = `<span>○</span> Đánh dấu hoàn thành`;
    btn.className = "btn btn-sm btn-outline";
  }
}

function toggleCurrentTopicStatus() {
  if (!AppState.currentTopic) return;
  toggleTopicCompletion(AppState.currentTopic.id, null);
}

/* ==========================================================================
   8. THÔNG BÁO TOAST NOTIFICATION
   ========================================================================= */
function showToast(message) {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `<span>💡</span><span>${message}</span>`;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(10px)";
    setTimeout(() => {
      if (toast.parentElement) toast.parentElement.removeChild(toast);
    }, 250);
  }, 2800);
}

/* ==========================================================================
   9. VISUALIZER LAB TẠI TRANG CHỦ
   ========================================================================== */
function initVisualizerLab() {
  // Mặc định khởi chạy Binary Search
  VisualizerEngine.binarySearch.init("vis-workbench-box", 23);

  const tabBtns = document.querySelectorAll(".vis-tab-btn");
  tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      tabBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const type = btn.getAttribute("data-vis");
      AppState.activeVisTab = type;

      if (type === "bs") {
        VisualizerEngine.binarySearch.init("vis-workbench-box", 23);
      } else if (type === "tp") {
        VisualizerEngine.twoPointers.init("vis-workbench-box", 18);
      } else if (type === "ps") {
        VisualizerEngine.prefixSum.init("vis-workbench-box");
      }
    });
  });
}
