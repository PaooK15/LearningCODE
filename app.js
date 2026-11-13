/**
 * MarisaOJ ICPC Roadmap - Interactive Controller Application
 * Xử lý kết xuất sơ đồ cây, lọc tìm kiếm, quản lý Modal chi tiết và tiến độ học tập
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

// Khởi chạy khi DOM sẵn sàng
document.addEventListener("DOMContentLoaded", () => {
  renderRoadmapTree();
  renderCheatsheet();
  initSearchAndFilters();
  initModalListeners();
  initVisualizerLab();
  updateProgressStats();
});

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
      if (displayedTopics.length === 0) displayedTopics = level.topics;
    }

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
              <span style="font-size: 0.75rem; color: #5B6E87; font-weight: 500;">Bấm vào chuyên đề để xem lý thuyết & code</span>
            </div>
            <div class="subtopics-grid">
              ${displayedTopics.map(topic => {
                const status = AppState.progress[topic.id] || "not_started";
                const statusClass = (status === "completed") ? "completed" : (status === "learning" ? "learning" : "");
                const statusTitle = (status === "completed") ? "Đã thành thạo" : (status === "learning" ? "Đang luyện tập" : "Chưa học");

                return `
                  <div class="topic-node" onclick="openTopicModal('${topic.id}', '${level.id}')" title="${topic.shortDesc}">
                    <div class="topic-node-info">
                      <div style="display:flex; align-items:center; gap:6px;">
                        <span class="topic-status-dot ${statusClass}" title="${statusTitle}"></span>
                        <h4 class="topic-node-title">${topic.title}</h4>
                      </div>
                      <div class="topic-node-meta">
                        <span class="topic-category-tag">${topic.category}</span>
                        <span class="topic-difficulty-stars">${'★'.repeat(topic.difficulty)}</span>
                      </div>
                    </div>
                    <div class="topic-node-arrow" title="Xem chi tiết">
                      &rarr;
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
}

/* ==========================================================================
   2. CHEATSHEET BẢNG QUY TẮC ĐỘ PHỨC TẠP ICPC
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
}

/* ==========================================================================
   3. BỘ LỌC & TÌM KIẾM
   ========================================================================== */
function initSearchAndFilters() {
  const searchInput = document.getElementById("search-input");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      AppState.searchQuery = e.target.value;
      renderRoadmapTree();
    });
  }

  const chips = document.querySelectorAll(".filter-chip");
  chips.forEach(chip => {
    chip.addEventListener("click", () => {
      chips.forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      AppState.currentLevelFilter = chip.getAttribute("data-level") || "all";
      renderRoadmapTree();
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
}

/* ==========================================================================
   4. MODAL CHI TIẾT THUẬT TOÁN (TABS, COMPLEXITY, TEMPLATE, MARISA PRACTICE)
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
}

// Cập nhật nút trạng thái học tập trong Modal
function updateModalStatusButton(topicId) {
  const btn = document.getElementById("btn-toggle-status");
  if (!btn) return;

  const currentStatus = AppState.progress[topicId] || "not_started";
  if (currentStatus === "completed") {
    btn.innerHTML = `<span style="color:#10B981;">✔</span> Đã thành thạo`;
    btn.className = "btn btn-sm btn-secondary";
  } else if (currentStatus === "learning") {
    btn.innerHTML = `<span style="color:#F59E0B;">⏳</span> Đang luyện tập`;
    btn.className = "btn btn-sm btn-secondary";
  } else {
    btn.innerHTML = `<span>○</span> Đánh dấu đã học`;
    btn.className = "btn btn-sm btn-outline";
  }
}

function toggleCurrentTopicStatus() {
  if (!AppState.currentTopic) return;
  const topicId = AppState.currentTopic.id;
  const current = AppState.progress[topicId] || "not_started";

  let nextStatus = "learning";
  if (current === "not_started") nextStatus = "learning";
  else if (current === "learning") nextStatus = "completed";
  else nextStatus = "not_started";

  AppState.progress[topicId] = nextStatus;
  localStorage.setItem("marisa_cp_progress", JSON.stringify(AppState.progress));

  updateModalStatusButton(topicId);
  renderRoadmapTree();
  updateProgressStats();

  let toastMsg = "Đã cập nhật: Chưa học";
  if (nextStatus === "learning") toastMsg = "Đã chuyển sang: Đang luyện tập ⏳";
  if (nextStatus === "completed") toastMsg = "Tuyệt vời! Đã hoàn thành chuyên đề ✔";
  showToast(toastMsg);
}

function updateProgressStats() {
  let totalTopics = 0;
  let completedCount = 0;

  MARISA_ROADMAP_DATA.forEach(lvl => {
    lvl.topics.forEach(t => {
      totalTopics++;
      if (AppState.progress[t.id] === "completed") completedCount++;
    });
  });

  const percent = totalTopics > 0 ? Math.round((completedCount / totalTopics) * 100) : 0;
  
  const progressPill = document.getElementById("header-progress-text");
  if (progressPill) {
    progressPill.innerText = `${completedCount}/${totalTopics} chuyên đề (${percent}%)`;
  }

  const statProgress = document.getElementById("stat-hero-progress");
  if (statProgress) {
    statProgress.innerText = `${percent}%`;
  }
}

/* ==========================================================================
   5. SAO CHÉP MÃ NGUỒN C++ & TOAST NOTIFICATION
   ========================================================================== */
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
   6. VISUALIZER LAB TẠI TRANG CHỦ
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
