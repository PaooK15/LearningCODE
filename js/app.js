// =============================================================================
// MAIN APPLICATION LOGIC & CONTROLLER (MARISAOJ ROADMAP & STUDY PLANNER)
// Huấn luyện viên Lập trình Thi đấu ICPC & Kỹ sư Giáo dục
// =============================================================================

document.addEventListener("DOMContentLoaded", () => {
  // Application State
  const state = {
    activeLevelFilter: "all",
    searchQuery: "",
    viewMode: "tree", // "tree" | "grid"
    completedTopics: JSON.parse(localStorage.getItem("marisaoj_completed_topics") || "[]"),
    isProjectorMode: JSON.parse(localStorage.getItem("marisaoj_projector_mode") || "false"),
    currentModalTopic: null,
    currentModalLevel: null,
    activeTab: "intuition",
    currentPlanData: null
  };

  // DOM Elements
  const treeContainer = document.getElementById("tree-container");
  const searchInput = document.getElementById("search-input");
  const levelPillsContainer = document.getElementById("level-pills-bar");
  const progressCountEl = document.getElementById("progress-count");
  const totalCountEl = document.getElementById("total-count");
  const progressCountText = document.getElementById("progress-count-text");
  const totalCountText = document.getElementById("total-count-text");
  const progressBarFill = document.getElementById("progress-bar-fill");
  const progressPercentLabel = document.getElementById("progress-percent-label");
  const progressScopeLabel = document.getElementById("progress-scope-label");
  const progressOverallTag = document.getElementById("progress-overall-tag");
  const levelProgressGrid = document.getElementById("level-progress-grid");

  const topicModalOverlay = document.getElementById("topic-modal");
  const modalCloseBtn = document.getElementById("modal-close-btn");
  const plannerModalOverlay = document.getElementById("planner-modal");
  const toastEl = document.getElementById("toast-notice");
  const toastMsg = document.getElementById("toast-message");
  const projectorToggleBtn = document.getElementById("projector-toggle-btn");

  // Apply saved Projector Mode on load
  if (state.isProjectorMode) {
    document.body.classList.add("projector-mode");
    if (projectorToggleBtn) projectorToggleBtn.classList.add("active");
  }

  // Calculate total topics across all levels
  let totalTopicsCount = 0;
  ROADMAP_DATA.levels.forEach(lvl => {
    totalTopicsCount += lvl.topics.length;
  });
  if (totalCountEl) totalCountEl.innerText = totalTopicsCount;
  if (totalCountText) totalCountText.innerText = totalTopicsCount;

  // Safe KaTeX Math Formula Rendering Helper
  function renderMath(container) {
    if (!container) return;
    if (typeof renderMathInElement === "function") {
      try {
        renderMathInElement(container, {
          delimiters: [
            { left: "$$", right: "$$", display: true },
            { left: "$", right: "$", display: false },
            { left: "\\(", right: "\\)", display: false },
            { left: "\\[", right: "\\]", display: true }
          ],
          throwOnError: false,
          ignoredTags: ["script", "noscript", "style", "textarea", "pre", "code"]
        });
      } catch (err) {
        console.warn("KaTeX render notice:", err);
      }
    } else {
      // Retry in 100ms if KaTeX script is still loading asynchronously
      setTimeout(() => {
        if (typeof renderMathInElement === "function" && container) {
          renderMath(container);
        }
      }, 150);
    }
  }

  // Render Level Filter Pills
  function renderLevelPills() {
    if (!levelPillsContainer) return;
    let html = `<button class="level-pill ${state.activeLevelFilter === 'all' ? 'active' : ''}" data-level="all"><i class="fa-solid fa-layer-group"></i> Tất cả các Level</button>`;

    ROADMAP_DATA.levels.forEach(lvl => {
      const isAct = state.activeLevelFilter === lvl.id ? 'active' : '';
      const numLabel = lvl.levelNum === 100 ? "Level 100 (Thi đấu)" : `Level ${lvl.levelNum}`;
      html += `<button class="level-pill ${isAct}" data-level="${lvl.id}"><i class="${lvl.icon}"></i> ${numLabel}</button>`;
    });

    levelPillsContainer.innerHTML = html;

    levelPillsContainer.querySelectorAll(".level-pill").forEach(pill => {
      pill.addEventListener("click", () => {
        state.activeLevelFilter = pill.getAttribute("data-level");
        renderLevelPills();
        renderRoadmap();
        updateProgressUI();
      });
    });
  }

  // Update Global Progress Bar dynamically reflecting Filter & Search Scopes
  function updateProgressUI() {
    // 1. Gather all topics in current filter/search scope
    let scopedTopics = [];
    const filteredLevels = ROADMAP_DATA.levels.filter(lvl => {
      if (state.activeLevelFilter !== "all" && lvl.id !== state.activeLevelFilter) return false;
      return true;
    });

    filteredLevels.forEach(lvl => {
      lvl.topics.forEach(t => {
        if (!state.searchQuery) {
          scopedTopics.push(t);
        } else {
          const q = state.searchQuery.toLowerCase();
          if (
            t.title.toLowerCase().includes(q) ||
            t.enTitle.toLowerCase().includes(q) ||
            t.category.toLowerCase().includes(q) ||
            t.summary.toLowerCase().includes(q)
          ) {
            scopedTopics.push(t);
          }
        }
      });
    });

    const scopedTotal = scopedTopics.length;
    const scopedCompleted = scopedTopics.filter(t => state.completedTopics.includes(t.id)).length;
    const scopedPct = scopedTotal > 0 ? Math.round((scopedCompleted / scopedTotal) * 100) : 0;

    const overallCompleted = state.completedTopics.length;
    const overallTotal = totalTopicsCount;
    const overallPct = overallTotal > 0 ? Math.round((overallCompleted / overallTotal) * 100) : 0;

    // Update Navbar text
    if (progressCountEl) progressCountEl.innerText = overallCompleted;
    if (totalCountEl) totalCountEl.innerText = overallTotal;

    // Update Progress Strip Metrics
    if (progressPercentLabel) progressPercentLabel.innerText = `${scopedPct}%`;
    if (progressCountText) progressCountText.innerText = scopedCompleted;
    if (totalCountText) totalCountText.innerText = scopedTotal;
    if (progressBarFill) {
      progressBarFill.style.width = `${scopedPct}%`;
    }

    // Dynamic Scope Label
    if (progressScopeLabel) {
      if (state.searchQuery) {
        progressScopeLabel.innerHTML = `<i class="fa-solid fa-magnifying-glass"></i> Tiến Độ Tìm Kiếm ("${state.searchQuery}")`;
      } else if (state.activeLevelFilter !== "all") {
        const foundLvl = ROADMAP_DATA.levels.find(l => l.id === state.activeLevelFilter);
        progressScopeLabel.innerHTML = `<i class="fa-solid fa-filter"></i> Tiến Độ ${foundLvl ? foundLvl.title.split(':')[0] : 'Bộ Lọc'}`;
      } else {
        progressScopeLabel.innerHTML = `<i class="fa-solid fa-bars-progress"></i> Tiến Độ Chinh Phục Toàn Khóa`;
      }
    }

    // Overall Tag indicator
    if (progressOverallTag) {
      if (state.activeLevelFilter !== "all" || state.searchQuery) {
        progressOverallTag.style.display = "inline-flex";
        progressOverallTag.innerText = `Toàn khóa: ${overallCompleted}/${overallTotal} (${overallPct}%)`;
      } else {
        progressOverallTag.style.display = "none";
      }
    }

    // Render mini level badges under progress bar
    if (levelProgressGrid) {
      let gridHtml = "";
      ROADMAP_DATA.levels.forEach(lvl => {
        const lvlTotal = lvl.topics.length;
        const lvlCompleted = lvl.topics.filter(t => state.completedTopics.includes(t.id)).length;
        const lvlPct = lvlTotal > 0 ? Math.round((lvlCompleted / lvlTotal) * 100) : 0;
        const isFinished = lvlCompleted === lvlTotal && lvlTotal > 0;
        const lvlName = lvl.levelNum === 100 ? "Lv100" : `Lv ${lvl.levelNum}`;
        const isCurrentActive = state.activeLevelFilter === lvl.id;

        gridHtml += `
          <div class="level-mini-stat ${isFinished ? 'level-done' : ''} ${isCurrentActive ? 'level-active-filter' : ''}" 
               onclick="window.app.filterByLevel('${lvl.id}')" 
               title="${lvl.title}: ${lvlCompleted}/${lvlTotal} chuyên đề (${lvlPct}%) - Bấm để lọc">
            <span class="mini-tag">${lvlName}</span>
            <span class="mini-num">${lvlCompleted}/${lvlTotal}</span>
            <div class="mini-bar-track">
              <div class="mini-bar-fill" style="width: ${lvlPct}%;"></div>
            </div>
          </div>
        `;
      });
      levelProgressGrid.innerHTML = gridHtml;
    }
  }

  // Render the entire Roadmap Tree / Grid
  function renderRoadmap() {
    if (!treeContainer) return;

    const filteredLevels = ROADMAP_DATA.levels.filter(lvl => {
      if (state.activeLevelFilter !== "all" && lvl.id !== state.activeLevelFilter) {
        return false;
      }
      return true;
    });

    let html = "";
    let matchCount = 0;

    filteredLevels.forEach(lvl => {
      // Filter topics inside this level by search query
      const matchingTopics = lvl.topics.filter(t => {
        if (!state.searchQuery) return true;
        const q = state.searchQuery.toLowerCase();
        return (
          t.title.toLowerCase().includes(q) ||
          t.enTitle.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q) ||
          t.summary.toLowerCase().includes(q)
        );
      });

      if (matchingTopics.length === 0 && state.searchQuery) {
        return; // Skip level if searching and no topics match
      }

      matchCount += matchingTopics.length;
      const lvlCompletedCount = lvl.topics.filter(t => state.completedTopics.includes(t.id)).length;

      html += `
        <div class="level-block" id="block-${lvl.id}">
          <div class="level-card">
            <div class="level-header" onclick="window.app.toggleLevel('${lvl.id}')">
              <div class="level-header-left">
                <div class="level-node-icon">
                  <i class="${lvl.icon}"></i>
                </div>
                <div class="level-header-info">
                  <h2>
                    <span>${lvl.title}</span>
                    <span class="level-badge">${lvl.badge}</span>
                  </h2>
                  <div class="level-en-sub">${lvl.enTitle}</div>
                </div>
              </div>
              <div class="level-header-right">
                <span class="topic-count-pill" style="font-size: 0.85rem; font-weight: 600; color: var(--title-color); background: var(--bg-secondary); padding: 0.3rem 0.75rem; border-radius: var(--radius-full); border: 1px solid var(--border-color);">
                  <i class="fa-solid fa-circle-check" style="color: ${lvlCompletedCount === lvl.topics.length ? 'var(--success-color)' : 'var(--accent-color)'};"></i> 
                  ${lvlCompletedCount}/${lvl.topics.length} chuyên đề
                </span>
                <button class="level-toggle-btn" aria-label="Thu gọn/Mở rộng">
                  <i class="fa-solid fa-chevron-down"></i>
                </button>
              </div>
            </div>

            <div class="level-content">
              <div class="level-summary-bar">
                <div>
                  <i class="fa-solid fa-compass" style="color: var(--accent-color); margin-right: 0.5rem;"></i>
                  <span>${lvl.summary}</span>
                </div>
                <a href="${lvl.marisaRoadmapUrl}" target="_blank" rel="noopener noreferrer" class="level-marisa-btn" onclick="event.stopPropagation()">
                  <i class="fa-solid fa-arrow-up-right-from-square"></i> Xem trên MarisaOJ
                </a>
              </div>

              <div class="topics-branch-grid">
                ${matchingTopics.map(topic => renderTopicCard(topic, lvl)).join("")}
              </div>
            </div>
          </div>
        </div>
      `;
    });

    if (matchCount === 0 && state.searchQuery) {
      html = `
        <div style="text-align: center; padding: 4rem 1rem; background: var(--bg-secondary); border-radius: var(--radius-lg); border: 2px dashed var(--border-color);">
          <i class="fa-solid fa-magnifying-glass" style="font-size: 3rem; color: var(--accent-color); margin-bottom: 1rem;"></i>
          <h3 style="color: var(--title-color); margin-bottom: 0.5rem;">Không tìm thấy thuật toán phù hợp</h3>
          <p style="color: var(--text-muted); max-width: 500px; margin: 0 auto 1.5rem;">
            Không có chuyên đề nào khớp với từ khóa "<strong>${state.searchQuery}</strong>". Thử tìm các từ khóa như: <em>Binary Search, Prefix Sum, DSU, Segment Tree, Quy hoạch động, Dijkstra...</em>
          </p>
          <button class="vis-btn primary" onclick="window.app.clearSearch()"><i class="fa-solid fa-rotate-left"></i> Xóa bộ lọc tìm kiếm</button>
        </div>
      `;
    }

    treeContainer.innerHTML = html;
    updateProgressUI();

    // Render KaTeX for tree content (math badges if any)
    renderMath(treeContainer);
  }

  // Render individual Topic Card with Quick Check and Quick Copy buttons
  function renderTopicCard(topic, level) {
    const isCompleted = state.completedTopics.includes(topic.id);
    const shortComplexity = topic.complexity.time.split(",")[0] || topic.complexity.time;

    return `
      <div class="topic-card ${isCompleted ? 'is-completed' : ''}" onclick="window.app.openTopicModal('${topic.id}')">
        <div>
          <div class="topic-card-top">
            <span class="topic-category-tag">${topic.category}</span>
            <div style="display: flex; gap: 0.4rem; align-items: center;">
              <span class="topic-badge-pill">${topic.badge}</span>
              ${isCompleted ? '<span class="completed-pill-tag"><i class="fa-solid fa-check"></i> Đã học</span>' : ''}
            </div>
          </div>

          <h3 class="topic-title">${topic.title}</h3>
          <div class="topic-en-title">${topic.enTitle}</div>
          <p class="topic-summary">${topic.summary}</p>
        </div>

        <div class="topic-card-footer">
          <div class="topic-meta-row">
            <span class="topic-complexity-badge" title="Độ phức tạp thời gian">
              <i class="fa-solid fa-stopwatch"></i> ${shortComplexity}
            </span>
          </div>

          <!-- Quick Action Buttons: Mark Completed & Quick Copy C++ -->
          <div class="topic-quick-actions" onclick="event.stopPropagation()">
            <button class="quick-check-btn ${isCompleted ? 'is-checked' : ''}" onclick="window.app.toggleTopicStatus('${topic.id}')" title="${isCompleted ? 'Bấm để bỏ đánh dấu hoàn thành' : 'Bấm để đánh dấu đã hoàn thành'}">
              <i class="fa-${isCompleted ? 'solid' : 'regular'} fa-circle-check"></i>
              <span>${isCompleted ? 'Đã học' : 'Hoàn thành'}</span>
            </button>
            
            <button class="quick-copy-code-btn" onclick="window.app.quickCopyCode('${topic.id}', this)" title="Sao chép nhanh Template C++ Chuẩn ICPC">
              <i class="fa-regular fa-copy"></i>
              <span>Copy C++</span>
            </button>
          </div>
        </div>
      </div>
    `;
  }

  // Global window methods
  window.app = window.app || {};

  // Toggle Level Collapse
  window.app.toggleLevel = function(levelId) {
    const block = document.getElementById(`block-${levelId}`);
    if (block) {
      block.classList.toggle("collapsed");
    }
  };

  // Filter by Level
  window.app.filterByLevel = function(levelId) {
    state.activeLevelFilter = levelId;
    renderLevelPills();
    renderRoadmap();
    updateProgressUI();
    window.app.scrollToRoadmap();
  };

  // Scroll to roadmap view
  window.app.scrollToRoadmap = function() {
    const el = document.getElementById("roadmap-controls");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  // Clear Search
  window.app.clearSearch = function() {
    state.searchQuery = "";
    if (searchInput) searchInput.value = "";
    renderRoadmap();
    updateProgressUI();
  };

  // Toggle Projector / Classroom Presentation Mode
  window.app.toggleProjectorMode = function() {
    state.isProjectorMode = !state.isProjectorMode;
    localStorage.setItem("marisaoj_projector_mode", JSON.stringify(state.isProjectorMode));
    if (state.isProjectorMode) {
      document.body.classList.add("projector-mode");
      if (projectorToggleBtn) projectorToggleBtn.classList.add("active");
      showToast("🖥️ Đã bật Chế độ Trình chiếu Lớp học (Phóng to font chữ & tăng tương phản)!");
    } else {
      document.body.classList.remove("projector-mode");
      if (projectorToggleBtn) projectorToggleBtn.classList.remove("active");
      showToast("Đã chuyển về Chế độ Tiêu chuẩn.");
    }
  };

  // Quick Toggle Topic Status (from Card or Modal)
  window.app.toggleTopicStatus = function(topicId) {
    const idx = state.completedTopics.indexOf(topicId);
    let topicName = topicId;

    // Find topic name for toast
    for (const lvl of ROADMAP_DATA.levels) {
      const f = lvl.topics.find(t => t.id === topicId);
      if (f) { topicName = f.title; break; }
    }

    if (idx > -1) {
      state.completedTopics.splice(idx, 1);
      showToast(`Đã bỏ đánh dấu: "${topicName}"`);
    } else {
      state.completedTopics.push(topicId);
      showToast(`🎉 Tuyệt vời! Đã nắm vững: "${topicName}"`);
    }

    localStorage.setItem("marisaoj_completed_topics", JSON.stringify(state.completedTopics));
    updateProgressUI();
    renderRoadmap();

    // If modal is open for this topic, update modal status button too
    if (state.currentModalTopic && state.currentModalTopic.id === topicId) {
      updateModalStatusBtn(state.completedTopics.includes(topicId));
    }
  };

  // Toggle from within modal
  window.app.toggleCurrentTopicStatus = function() {
    if (!state.currentModalTopic) return;
    window.app.toggleTopicStatus(state.currentModalTopic.id);
  };

  // Quick Copy C++ Code from Topic Card
  window.app.quickCopyCode = function(topicId, btnEl) {
    let targetCode = "";
    let topicTitle = "";

    for (const lvl of ROADMAP_DATA.levels) {
      const found = lvl.topics.find(t => t.id === topicId);
      if (found) {
        targetCode = found.codeTemplate;
        topicTitle = found.title;
        break;
      }
    }

    if (!targetCode) return;

    navigator.clipboard.writeText(targetCode).then(() => {
      if (btnEl) {
        const origHtml = btnEl.innerHTML;
        btnEl.classList.add("copied");
        btnEl.innerHTML = `<i class="fa-solid fa-check"></i> <span>Đã Copy!</span>`;
        setTimeout(() => {
          btnEl.classList.remove("copied");
          btnEl.innerHTML = origHtml;
        }, 1800);
      }
      showToast(`Đã sao chép template C++ của "${topicTitle}"!`);
    }).catch(() => {
      showToast("Không thể truy cập clipboard.");
    });
  };

  // Open Topic Modal with all pedagogical tabs & KaTeX Rendering
  window.app.openTopicModal = function(topicId) {
    let targetTopic = null;
    let targetLevel = null;

    for (const lvl of ROADMAP_DATA.levels) {
      const found = lvl.topics.find(t => t.id === topicId);
      if (found) {
        targetTopic = found;
        targetLevel = lvl;
        break;
      }
    }

    if (!targetTopic) return;
    state.currentModalTopic = targetTopic;
    state.currentModalLevel = targetLevel;

    // Populate Modal Header
    document.getElementById("modal-topic-title").innerText = targetTopic.title;
    document.getElementById("modal-topic-en").innerText = targetTopic.enTitle;
    document.getElementById("modal-level-badge").innerText = targetLevel.title.split(":")[0];

    // Populate Status Checkbox
    const isCompleted = state.completedTopics.includes(targetTopic.id);
    updateModalStatusBtn(isCompleted);

    // Populate Tab 1: Intuition & Essence
    const tabIntuition = document.getElementById("tab-pane-intuition");
    tabIntuition.innerHTML = `
      <div class="pedagogy-essence">
        ${targetTopic.intuition}
      </div>
      <div class="vis-wrapper" id="modal-interactive-vis"></div>
    `;

    // Render interactive simulation if available
    renderEmbeddedVisualizer(targetTopic.interactiveType);

    // Populate Tab 2: Complexity
    const tabComplexity = document.getElementById("tab-pane-complexity");
    tabComplexity.innerHTML = `
      <div class="complexity-grid">
        <div class="complexity-card">
          <div class="complexity-card-title"><i class="fa-solid fa-stopwatch"></i> Thời Gian (Time Complexity)</div>
          <div class="complexity-card-val">${targetTopic.complexity.time}</div>
        </div>
        <div class="complexity-card">
          <div class="complexity-card-title"><i class="fa-solid fa-memory"></i> Bộ Nhớ Phụ Trợ (Space Complexity)</div>
          <div class="complexity-card-val">${targetTopic.complexity.space}</div>
        </div>
      </div>

      <div class="complexity-analysis-box">
        <h4><i class="fa-solid fa-microscope" style="color: var(--accent-color);"></i> Phân Tích Bản Chất Độ Phức Tạp</h4>
        <p style="color: var(--text-main); margin-bottom: 1rem; line-height: 1.6;">${targetTopic.complexity.analysis}</p>
        <div class="time-guideline-alert">
          <strong><i class="fa-solid fa-triangle-exclamation"></i> Quy tắc thời gian ICPC:</strong> ${targetTopic.complexity.limitGuideline}
        </div>
      </div>

      <div class="vis-wrapper" id="complexity-calc-embed"></div>
    `;

    // Render Complexity Calculator
    Visualizers.renderComplexityTool("complexity-calc-embed");

    // Populate Tab 3: C++ Template Code
    const codeEl = document.getElementById("code-content-block");
    if (codeEl) {
      codeEl.textContent = targetTopic.codeTemplate;
    }

    // Populate Tab 4: Practice Problems on MarisaOJ
    const tabProblems = document.getElementById("tab-pane-problems");
    let problemsHtml = `
      <div style="margin-bottom: 1.25rem; padding: 0.85rem 1rem; background: var(--bg-secondary); border-radius: var(--radius-md);">
        <strong><i class="fa-solid fa-bullseye" style="color: var(--accent-color);"></i> Lộ trình luyện tập:</strong> Hãy giải theo thứ tự từ dễ đến nâng cao để rèn luyện tốc độ gõ code chính xác (Accuracy) và phản xạ nhận diện bài toán.
      </div>
      <div class="problems-list">
    `;

    targetTopic.marisaLinks.forEach(p => {
      problemsHtml += `
        <div class="problem-item-card">
          <div class="problem-info-left">
            <div class="problem-title-row">
              <span class="problem-name">#${p.id}. ${p.name}</span>
              <span class="problem-diff-stars" title="Độ khó ${p.diff}">${p.diff}</span>
            </div>
            <div class="problem-note">${p.note}</div>
          </div>
          <a href="${p.url}" target="_blank" rel="noopener noreferrer" class="btn-open-marisa">
            <i class="fa-solid fa-play"></i> Luyện bài trên MarisaOJ
          </a>
        </div>
      `;
    });
    problemsHtml += `</div>`;
    tabProblems.innerHTML = problemsHtml;

    // Populate Tab 5: Coach Tips & Pitfalls
    const tabCoach = document.getElementById("tab-pane-coach");
    let coachHtml = `<ul class="coach-tips-list">`;
    targetTopic.coachTips.forEach(tip => {
      coachHtml += `
        <li class="coach-tip-item">
          <i class="fa-solid fa-circle-exclamation"></i>
          <div>${tip}</div>
        </li>
      `;
    });
    coachHtml += `</ul>`;
    tabCoach.innerHTML = coachHtml;

    // Reset to tab 1
    switchTab("intuition");

    // Trigger KaTeX rendering for the newly injected modal content
    const modalBodyEl = document.getElementById("topic-modal-body");
    renderMath(modalBodyEl);

    // Show modal
    topicModalOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
  };

  // Render embedded visualizer based on topic type
  function renderEmbeddedVisualizer(type) {
    const containerId = "modal-interactive-vis";
    switch(type) {
      case "binary-search":
        Visualizers.renderBinarySearch(containerId);
        break;
      case "prefix-sum":
        Visualizers.renderPrefixSum(containerId);
        break;
      case "two-pointers":
        Visualizers.renderTwoPointers(containerId);
        break;
      case "sieve":
        Visualizers.renderSieve(containerId);
        break;
      case "bfs":
        Visualizers.renderBFS(containerId);
        break;
      default:
        Visualizers.renderComplexityTool(containerId);
        break;
    }
  }

  // Update Status Button in modal
  function updateModalStatusBtn(isCompleted) {
    const statusBtn = document.getElementById("modal-toggle-status-btn");
    if (!statusBtn) return;
    if (isCompleted) {
      statusBtn.className = "vis-btn secondary";
      statusBtn.innerHTML = `<i class="fa-solid fa-circle-check" style="color: var(--success-color);"></i> Đã nắm vững (Bấm để hủy)`;
    } else {
      statusBtn.className = "vis-btn primary";
      statusBtn.innerHTML = `<i class="fa-regular fa-circle-check"></i> Đánh dấu đã nắm vững`;
    }
  }

  // Close Topic Modal
  function closeTopicModal() {
    topicModalOverlay.classList.remove("active");
    document.body.style.overflow = "auto";
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener("click", closeTopicModal);
  topicModalOverlay.addEventListener("click", (e) => {
    if (e.target === topicModalOverlay) closeTopicModal();
  });

  // Switch Tabs in Modal & trigger KaTeX for current tab
  function switchTab(tabId) {
    state.activeTab = tabId;
    document.querySelectorAll(".modal-tab-btn").forEach(btn => {
      if (btn.getAttribute("data-tab") === tabId) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });

    document.querySelectorAll(".tab-pane").forEach(pane => {
      if (pane.id === `tab-pane-${tabId}`) {
        pane.classList.add("active");
        renderMath(pane);
      } else {
        pane.classList.remove("active");
      }
    });
  }

  document.querySelectorAll(".modal-tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      switchTab(btn.getAttribute("data-tab"));
    });
  });

  // Copy Code to Clipboard from inside Modal
  window.app.copyCode = function() {
    if (!state.currentModalTopic) return;
    navigator.clipboard.writeText(state.currentModalTopic.codeTemplate).then(() => {
      const copyBtn = document.getElementById("copy-code-btn");
      if (copyBtn) {
        copyBtn.classList.add("copied");
        copyBtn.innerHTML = `<i class="fa-solid fa-check"></i> Đã sao chép!`;
        setTimeout(() => {
          copyBtn.classList.remove("copied");
          copyBtn.innerHTML = `<i class="fa-regular fa-copy"></i> Sao chép C++ Code`;
        }, 2000);
      }
      showToast("Đã sao chép mã nguồn C++ chuẩn vào clipboard!");
    });
  };

  // Toast Notification
  function showToast(message) {
    if (!toastEl) return;
    toastMsg.innerText = message;
    toastEl.classList.add("show");
    setTimeout(() => {
      toastEl.classList.remove("show");
    }, 2800);
  }

  // Search input event with debounce and automatic Progress Bar sync
  let searchDebounce = null;
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      clearTimeout(searchDebounce);
      searchDebounce = setTimeout(() => {
        state.searchQuery = e.target.value.trim();
        renderRoadmap();
        updateProgressUI();
      }, 120);
    });
  }

  // View switch: Tree vs Grid
  document.querySelectorAll(".view-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".view-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const mode = btn.getAttribute("data-view");
      state.viewMode = mode;
      if (mode === "grid") {
        treeContainer.classList.add("grid-layout");
      } else {
        treeContainer.classList.remove("grid-layout");
      }
    });
  });

  // Keyboard shortcut (Escape closes any open modal)
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (topicModalOverlay && topicModalOverlay.classList.contains("active")) {
        closeTopicModal();
      }
      if (plannerModalOverlay && plannerModalOverlay.classList.contains("active")) {
        window.app.closePlannerModal();
      }
    }
  });

  // ===========================================================================
  // STUDY PLANNER ENGINE (BỘ TẠO LỘ TRÌNH HỌC TỰ ĐỘNG THEO TUẦN)
  // ===========================================================================

  window.app.openPlannerModal = function() {
    if (plannerModalOverlay) {
      plannerModalOverlay.classList.add("active");
      document.body.style.overflow = "hidden";
      // Auto generate initial plan if not already rendered
      if (!state.currentPlanData) {
        window.app.generateStudyPlan();
      }
    }
  };

  window.app.closePlannerModal = function() {
    if (plannerModalOverlay) {
      plannerModalOverlay.classList.remove("active");
      document.body.style.overflow = "auto";
    }
  };

  // Automatic Study Plan Generator Algorithm
  window.app.generateStudyPlan = function() {
    const curLevelNum = parseInt(document.getElementById("planner-current-level").value);
    const targetLevelNum = parseInt(document.getElementById("planner-target-level").value);
    const dailyHours = parseFloat(document.getElementById("planner-daily-hours").value);
    const daysPerWeek = parseInt(document.getElementById("planner-days-week").value);

    const resultContainer = document.getElementById("planner-result-wrapper");
    if (!resultContainer) return;

    if (curLevelNum >= targetLevelNum) {
      resultContainer.innerHTML = `
        <div class="planner-empty-alert">
          <i class="fa-solid fa-circle-exclamation"></i>
          <div>
            <strong>Lựa chọn không hợp lệ:</strong> Trình độ hiện tại (Level ${curLevelNum}) phải nhỏ hơn Mục tiêu chinh phục (Level ${targetLevelNum}). Vui lòng chọn lại mục tiêu cao hơn để tạo kế hoạch học tập!
          </div>
        </div>
      `;
      return;
    }

    // Collect all topics from curLevelNum to targetLevelNum
    const targetLevels = ROADMAP_DATA.levels.filter(lvl => lvl.levelNum >= curLevelNum && lvl.levelNum <= targetLevelNum);
    let planTopics = [];
    targetLevels.forEach(lvl => {
      lvl.topics.forEach(t => {
        // Estimated study hours per topic based on pedagogical difficulty
        let estHours = 4;
        if (lvl.levelNum === 0) estHours = 2.5;
        else if (lvl.levelNum === 1) estHours = 4.0;
        else if (lvl.levelNum === 2) estHours = 5.0;
        else if (lvl.levelNum === 3) estHours = 7.0;
        else if (lvl.levelNum === 4) estHours = 9.0;
        else if (lvl.levelNum === 5) estHours = 12.0;
        else if (lvl.levelNum === 6) estHours = 16.0;

        planTopics.push({
          ...t,
          levelNum: lvl.levelNum,
          levelTitle: lvl.title,
          levelBadge: lvl.badge,
          estHours: estHours
        });
      });
    });

    const weeklyAvailableHours = dailyHours * daysPerWeek;
    let totalEstHours = planTopics.reduce((sum, t) => sum + t.estHours, 0);

    // Group topics into weeks
    let weeks = [];
    let currentWeekTopics = [];
    let currentWeekHours = 0;

    planTopics.forEach((t) => {
      if (currentWeekHours + t.estHours > weeklyAvailableHours && currentWeekTopics.length > 0) {
        weeks.push({
          weekNum: weeks.length + 1,
          topics: [...currentWeekTopics],
          totalHours: currentWeekHours
        });
        currentWeekTopics = [t];
        currentWeekHours = t.estHours;
      } else {
        currentWeekTopics.push(t);
        currentWeekHours += t.estHours;
      }
    });

    if (currentWeekTopics.length > 0) {
      weeks.push({
        weekNum: weeks.length + 1,
        topics: [...currentWeekTopics],
        totalHours: currentWeekHours
      });
    }

    state.currentPlanData = {
      curLevelNum,
      targetLevelNum,
      dailyHours,
      daysPerWeek,
      weeklyAvailableHours,
      totalEstHours,
      totalWeeks: weeks.length,
      weeks
    };

    // Render Weekly Timetable UI
    let resHtml = `
      <!-- Summary Metrics Bar -->
      <div class="planner-metrics-overview">
        <div class="metric-card">
          <div class="metric-icon"><i class="fa-solid fa-calendar-check"></i></div>
          <div class="metric-data">
            <span class="metric-val">${weeks.length} Tuần</span>
            <span class="metric-lbl">Tổng thời gian biểu</span>
          </div>
        </div>

        <div class="metric-card">
          <div class="metric-icon"><i class="fa-solid fa-stopwatch"></i></div>
          <div class="metric-data">
            <span class="metric-val">~${Math.round(totalEstHours)} Giờ</span>
            <span class="metric-lbl">Tổng thời lượng học</span>
          </div>
        </div>

        <div class="metric-card">
          <div class="metric-icon"><i class="fa-solid fa-book-bookmark"></i></div>
          <div class="metric-data">
            <span class="metric-val">${planTopics.length} Chuyên đề</span>
            <span class="metric-lbl">Từ Level ${curLevelNum} → Level ${targetLevelNum}</span>
          </div>
        </div>

        <div class="metric-card">
          <div class="metric-icon"><i class="fa-solid fa-bolt"></i></div>
          <div class="metric-data">
            <span class="metric-val">${weeklyAvailableHours}h / tuần</span>
            <span class="metric-lbl">${dailyHours}h x ${daysPerWeek} ngày/tuần</span>
          </div>
        </div>
      </div>

      <!-- Action toolbar for generated plan -->
      <div class="plan-toolbar-actions">
        <div>
          <h4 style="color: var(--title-color); font-size: 1.1rem; margin-bottom: 0.2rem;">
            <i class="fa-solid fa-list-ol" style="color: var(--accent-color);"></i> Lịch Trình Tuần Chi Tiết (Weekly Milestones)
          </h4>
          <p style="font-size: 0.85rem; color: var(--text-muted);">Mỗi tuần phân bổ theo chuẩn sư phạm 4 pha: Hiểu lý thuyết $\\rightarrow$ Template $\\rightarrow$ Luyện MarisaOJ $\\rightarrow$ Soi Bug</p>
        </div>
        <button class="vis-btn secondary" onclick="window.app.copyPlanMarkdown()">
          <i class="fa-regular fa-copy"></i> Sao chép Lịch Trình (Markdown)
        </button>
      </div>

      <!-- Weeks Timeline Container -->
      <div class="weeks-timeline">
    `;

    weeks.forEach((w) => {
      const weekCompletedCount = w.topics.filter(t => state.completedTopics.includes(t.id)).length;
      const isWeekDone = weekCompletedCount === w.topics.length && w.topics.length > 0;

      // Pedagogical Coach Advice per week
      let coachAdvice = "Tập trung giải bài tập mức 2 sao trước khi chuyển sang các bài có biến tấu nâng cao.";
      if (w.weekNum === 1) {
        coachAdvice = "Tuần khởi động: Hãy gõ trực tiếp code template C++ bằng tay, không copy-paste để các ngón tay quen với Fast I/O và cấu trúc dữ liệu!";
      } else if (w.topics.some(t => t.id.includes("dp") || t.id.includes("knapsack"))) {
        coachAdvice = "Tuần Quy hoạch động: Hãy vẽ bảng trạng thái ra giấy trước khi gõ code. Xác định rõ công thức truy hồi và chiều duyệt mảng!";
      } else if (w.topics.some(t => t.id.includes("segment-tree") || t.id.includes("fenwick"))) {
        coachAdvice = "Tuần Cây cấu trúc dữ liệu: Luôn nhớ mảng Segment Tree kích thước 4*N và Fenwick Tree bắt buộc 1-based indexing!";
      } else if (w.topics.some(t => t.id.includes("graph") || t.id.includes("dijkstra") || t.id.includes("bfs"))) {
        coachAdvice = "Tuần Đồ thị: Luôn kiểm tra đồ thị vô hướng (thêm 2 chiều) hay có hướng, và cẩn thận đồ thị có chu trình âm hoặc trọng số âm.";
      }

      resHtml += `
        <div class="week-schedule-card ${isWeekDone ? 'week-completed' : ''}">
          <div class="week-header-row">
            <div class="week-badge-wrap">
              <span class="week-badge">TUẦN ${w.weekNum}</span>
              <span class="week-hours-tag"><i class="fa-solid fa-clock"></i> ~${Math.round(w.totalHours)} giờ học</span>
              ${isWeekDone ? '<span class="week-done-badge"><i class="fa-solid fa-check"></i> Đã hoàn tất tuần</span>' : ''}
            </div>
            <div class="week-progress-indicator">
              <span>Đã học: <strong>${weekCompletedCount}/${w.topics.length}</strong></span>
            </div>
          </div>

          <!-- Topics in this week -->
          <div class="week-topics-list">
            ${w.topics.map(t => {
              const isTopicDone = state.completedTopics.includes(t.id);
              return `
                <div class="week-topic-row ${isTopicDone ? 'row-done' : ''}">
                  <div class="row-left">
                    <button class="topic-check-btn-sm ${isTopicDone ? 'checked' : ''}" onclick="window.app.toggleTopicStatus('${t.id}')" title="Đánh dấu đã hoàn thành">
                      <i class="fa-${isTopicDone ? 'solid' : 'regular'} fa-circle-check"></i>
                    </button>
                    <div>
                      <div class="topic-row-title" onclick="window.app.openTopicModal('${t.id}')">
                        ${t.title}
                        <span class="topic-row-en">(${t.enTitle})</span>
                      </div>
                      <div class="topic-row-sub">
                        <span><i class="fa-solid fa-tag"></i> ${t.category}</span>
                        <span>•</span>
                        <span><i class="fa-solid fa-stopwatch"></i> ${t.complexity.time.split(',')[0]}</span>
                        <span>•</span>
                        <span>~${t.estHours} giờ</span>
                      </div>
                    </div>
                  </div>
                  <div class="row-right">
                    <button class="row-action-btn" onclick="window.app.openTopicModal('${t.id}')">
                      <i class="fa-solid fa-book-open"></i> Học & Code
                    </button>
                  </div>
                </div>
              `;
            }).join("")}
          </div>

          <!-- Pedagogical Time Breakdown Strip -->
          <div class="week-time-breakdown">
            <div class="breakdown-item"><span class="breakdown-color c-theory"></span> <strong>30%</strong> Hiểu bản chất</div>
            <div class="breakdown-item"><span class="breakdown-color c-code"></span> <strong>20%</strong> Thuộc Template</div>
            <div class="breakdown-item"><span class="breakdown-color c-practice"></span> <strong>40%</strong> Luyện MarisaOJ</div>
            <div class="breakdown-item"><span class="breakdown-color c-debug"></span> <strong>10%</strong> Soi Bẫy TLE</div>
          </div>

          <!-- Coach Weekly Note -->
          <div class="week-coach-note">
            <i class="fa-solid fa-chalkboard-user"></i>
            <div><strong>Lời khuyên Tuần ${w.weekNum}:</strong> ${coachAdvice}</div>
          </div>
        </div>
      `;
    });

    resHtml += `</div>`;
    resultContainer.innerHTML = resHtml;

    // Render KaTeX for newly created study plan cards
    renderMath(resultContainer);
  };

  // Copy Study Plan as Markdown
  window.app.copyPlanMarkdown = function() {
    if (!state.currentPlanData) return;
    const { curLevelNum, targetLevelNum, dailyHours, daysPerWeek, totalEstHours, totalWeeks, weeks } = state.currentPlanData;

    let md = `# KẾ HOẠCH HỌC TẬP THUẬT TOÁN MARISAOJ & ICPC\n`;
    md += `* **Trình độ xuất phát:** Level ${curLevelNum}\n`;
    md += `* **Mục tiêu chinh phục:** Level ${targetLevelNum}\n`;
    md += `* **Thời gian biểu:** ${dailyHours} giờ/ngày x ${daysPerWeek} ngày/tuần\n`;
    md += `* **Tổng thời gian dự kiến:** ${totalWeeks} tuần (~${Math.round(totalEstHours)} giờ)\n\n`;
    md += `---\n\n`;

    weeks.forEach(w => {
      md += `## 📅 TUẦN ${w.weekNum} (~${Math.round(w.totalHours)} giờ)\n`;
      w.topics.forEach((t) => {
        const check = state.completedTopics.includes(t.id) ? "[x]" : "[ ]";
        md += `- ${check} **${t.title}** (${t.enTitle}) - *Độ phức tạp: ${t.complexity.time.split(',')[0]}*\n`;
        md += `  - Bài tập thực hành: ${t.marisaLinks.map(l => `[${l.name}](${l.url})`).join(", ")}\n`;
      });
      md += `\n`;
    });

    md += `\n> *Sinh tự động từ MarisaOJ Mastery Platform - Chuẩn Sư Phạm ICPC*\n`;

    navigator.clipboard.writeText(md).then(() => {
      showToast("Đã sao chép toàn bộ kế hoạch học tập (Markdown) vào clipboard!");
    }).catch(() => {
      showToast("Không thể sao chép văn bản.");
    });
  };

  // Initial render calls
  renderLevelPills();
  renderRoadmap();
  updateProgressUI();

  // Initial Math rendering for static hero / coach quotes
  setTimeout(() => {
    renderMath(document.body);
  }, 300);
});
