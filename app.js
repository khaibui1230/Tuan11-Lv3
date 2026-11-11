/**
 * IC3 GS6 Level 3 - Sổ Tay Thám Tử Kỹ Thuật Số
 * Tuần 11: Bài 13 & Bài 14
 * Interactive Application Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initSound();
  initTabs();
  initPromptBuilder();
  init4W1HExplorer();
  initCaseLab();
  initQuiz();
  initPrintButton();
});

/* ==========================================================================
   THEME TOGGLE (DARK / LIGHT MODE)
   ========================================================================== */
function initTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      updateThemeIcon(next);
      playAudioCue('click');
    });
  }
}

function updateThemeIcon(theme) {
  const icon = document.querySelector('#theme-toggle i, #theme-toggle span');
  if (icon) {
    icon.textContent = theme === 'dark' ? '☀️' : '🌙';
  }
}

/* ==========================================================================
   WEB AUDIO API SOUND EFFECTS (Zero external files needed)
   ========================================================================== */
let audioCtx = null;
let soundEnabled = true;

function initSound() {
  const soundToggle = document.getElementById('sound-toggle');
  if (soundToggle) {
    soundToggle.addEventListener('click', () => {
      soundEnabled = !soundEnabled;
      const icon = soundToggle.querySelector('span');
      if (icon) {
        icon.textContent = soundEnabled ? '🔔' : '🔕';
      }
      if (soundEnabled) playAudioCue('click');
    });
  }
}

function playAudioCue(type) {
  if (!soundEnabled) return;
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const now = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    if (type === 'click') {
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(800, now + 0.05);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.05);
      osc.start(now);
      osc.stop(now + 0.05);
    } else if (type === 'correct') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.setValueAtTime(659.25, now + 0.1); // E5
      osc.frequency.setValueAtTime(783.99, now + 0.2); // G5
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.35);
      osc.start(now);
      osc.stop(now + 0.35);
    } else if (type === 'wrong') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(280, now);
      osc.frequency.setValueAtTime(220, now + 0.12);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.25);
      osc.start(now);
      osc.stop(now + 0.25);
    } else if (type === 'win') {
      // Fanfare
      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, idx) => {
        const o = audioCtx.createOscillator();
        const g = audioCtx.createGain();
        o.connect(g);
        g.connect(audioCtx.destination);
        o.frequency.value = freq;
        g.gain.setValueAtTime(0.08, now + idx * 0.12);
        g.gain.linearRampToValueAtTime(0.01, now + idx * 0.12 + 0.25);
        o.start(now + idx * 0.12);
        o.stop(now + idx * 0.12 + 0.25);
      });
    }
  } catch (e) {
    // Audio context not allowed or unsupported
  }
}

/* ==========================================================================
   TABS INTERFACE (Compliant with Modern Web Guidance)
   ========================================================================== */
function initTabs() {
  const tablist = document.querySelector('[role="tablist"], [focusgroup="tablist"]');
  if (!tablist) return;

  const tabs = Array.from(tablist.querySelectorAll('[role="tab"]'));
  const panels = Array.from(document.querySelectorAll('[role="tabpanel"]'));

  function activateTab(selectedTab, moveFocus = true) {
    tabs.forEach(tab => {
      const isSelected = tab === selectedTab;
      tab.setAttribute('aria-selected', isSelected ? 'true' : 'false');
      tab.tabIndex = isSelected ? 0 : -1;
      if (isSelected && moveFocus) tab.focus();
    });

    const targetId = selectedTab.getAttribute('aria-controls');
    panels.forEach(panel => {
      if (panel.id === targetId) {
        panel.removeAttribute('hidden');
        panel.tabIndex = 0;
      } else {
        panel.setAttribute('hidden', '');
        panel.removeAttribute('tabindex');
      }
    });

    // Update progress bar
    updateReadingProgress();
  }

  // Click & keyboard listeners
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
      activateTab(tab, false);
      playAudioCue('click');
    });

    tab.addEventListener('keydown', (e) => {
      let targetIndex = null;
      if (e.key === 'ArrowRight') {
        targetIndex = (index + 1) % tabs.length;
      } else if (e.key === 'ArrowLeft') {
        targetIndex = (index - 1 + tabs.length) % tabs.length;
      } else if (e.key === 'Home') {
        targetIndex = 0;
      } else if (e.key === 'End') {
        targetIndex = tabs.length - 1;
      }

      if (targetIndex !== null) {
        e.preventDefault();
        activateTab(tabs[targetIndex], true);
        playAudioCue('click');
      }
    });
  });

  // Global links to switch tab (e.g. "Bắt đầu bài học" button)
  document.querySelectorAll('[data-switch-tab]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const targetTabId = btn.getAttribute('data-switch-tab');
      const targetTab = document.getElementById(targetTabId);
      if (targetTab) {
        activateTab(targetTab, true);
        targetTab.scrollIntoView({ behavior: 'smooth' });
        playAudioCue('click');
      }
    });
  });
}

function updateReadingProgress() {
  const progressBar = document.getElementById('header-progress');
  if (!progressBar) return;
  const activeTab = document.querySelector('[role="tab"][aria-selected="true"]');
  if (!activeTab) return;

  const tabs = Array.from(document.querySelectorAll('[role="tab"]'));
  const idx = tabs.indexOf(activeTab);
  const percent = Math.round(((idx + 1) / tabs.length) * 100);
  progressBar.style.width = `${percent}%`;
}

/* ==========================================================================
   INTERACTIVE PROMPT BUILDER (BÀI 14 TOOL)
   ========================================================================== */
function initPromptBuilder() {
  const topicSel = document.getElementById('prompt-topic');
  const contextSel = document.getElementById('prompt-context');
  const audienceSel = document.getElementById('prompt-audience');
  const formatSel = document.getElementById('prompt-format');
  const outputText = document.getElementById('synthesized-prompt');
  const simBtn = document.getElementById('btn-run-sim');
  const simResultBox = document.getElementById('prompt-sim-result');

  if (!topicSel || !outputText) return;

  function updateSynthesizedPrompt() {
    const topic = topicSel.value || '[Chủ đề]';
    const context = contextSel.value || '[Ngữ cảnh]';
    const audience = audienceSel.value || '[Đối tượng]';
    const format = formatSel.value || '[Định dạng]';

    const fullPrompt = `Hãy đóng vai trò chuyên gia, tìm thông tin về ${topic} dành cho ${audience}, trong bối cảnh ${context}, và trình bày kết quả thành ${format}. Kèm theo nguồn tham khảo chính thống từ các cơ quan uy tín.`;
    outputText.textContent = fullPrompt;
  }

  [topicSel, contextSel, audienceSel, formatSel].forEach(el => {
    if (el) el.addEventListener('change', () => {
      updateSynthesizedPrompt();
      playAudioCue('click');
      if (simResultBox) simResultBox.style.display = 'none';
    });
  });

  if (simBtn) {
    simBtn.addEventListener('click', () => {
      playAudioCue('click');
      if (!simResultBox) return;

      const topicText = topicSel.options[topicSel.selectedIndex].text;
      const audienceText = audienceSel.options[audienceSel.selectedIndex].text;
      const formatText = formatSel.options[formatSel.selectedIndex].text;

      // Populate simulation responses
      const badBox = document.getElementById('sim-bad-content');
      const goodBox = document.getElementById('sim-good-content');

      if (badBox) {
        badBox.innerHTML = `
          <strong>Prompt sơ sài:</strong> "Cho tôi biết về ${topicText}"<br/>
          <span style="color:#991b1b;">❌ Phản hồi AI:</span> "Thông tin về chủ đề này rất phong phú. Có nhiều tài liệu trên mạng nói về nó. Bạn có thể tìm thấy trên Google hoặc các sách vở tổng quan..."
          <em>(Chung chung, không có số liệu, không rõ đối tượng, khó áp dụng vào bài tập!)</em>
        `;
      }

      if (goodBox) {
        goodBox.innerHTML = `
          <strong>Prompt chuẩn 4W Thám tử:</strong> "${outputText.textContent}"<br/>
          <span style="color:#047857;">✅ Phản hồi AI chuẩn xác:</span><br/>
          - <strong>Ý 1:</strong> Khái niệm cốt lõi phù hợp với ${audienceText}.<br/>
          - <strong>Ý 2:</strong> Các số liệu thực tế được kiểm chứng theo ${formatText}.<br/>
          - <strong>Ý 3:</strong> Hướng dẫn hành động an toàn kèm trích dẫn từ nguồn Bộ Y tế / Bộ GD&ĐT (.gov.vn).
        `;
      }

      simResultBox.style.display = 'grid';
      simResultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  }

  updateSynthesizedPrompt();
}

/* ==========================================================================
   4W + 1H INTERACTIVE EXPLORER (BÀI 13)
   ========================================================================== */
function init4W1HExplorer() {
  const chips = document.querySelectorAll('.w-interactive-chip');
  const demoOutput = document.getElementById('w-demo-text');
  if (!chips.length || !demoOutput) return;

  const currentStates = {
    who: false,
    what: false,
    where: false,
    when: false,
    how: false
  };

  const fragments = {
    base: "Chiều nay",
    who: "lớp 8A",
    what: "nghỉ 2 tiết Tin học",
    where: "tại phòng Máy tính 1",
    when: "từ 14h00 đến 15h30",
    how: "do thầy cô tham gia tập huấn chuyên môn (theo thông báo số 12 của BGH)"
  };

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      const wKey = chip.getAttribute('data-w');
      currentStates[wKey] = !currentStates[wKey];
      chip.classList.toggle('active', currentStates[wKey]);
      playAudioCue('click');

      render4WText();
    });
  });

  function render4WText() {
    let result = fragments.base;
    if (currentStates.who) result += ` <mark class="hl-who">${fragments.who}</mark>`;
    if (currentStates.what) result += ` <mark class="hl-what">${fragments.what}</mark>`;
    if (currentStates.when) result += ` <mark class="hl-when">${fragments.when}</mark>`;
    if (currentStates.where) result += ` <mark class="hl-where">${fragments.where}</mark>`;
    if (currentStates.how) result += ` <mark class="hl-how">${fragments.how}</mark>`;

    demoOutput.innerHTML = result;

    const allChecked = Object.values(currentStates).every(Boolean);
    const statusNote = document.getElementById('w-status-note');
    if (statusNote) {
      if (allChecked) {
        statusNote.innerHTML = "🎉 <strong>TUYỆT VỜI:</strong> Thông tin đã đạt chuẩn 4W + 1H! Rõ ràng, đầy đủ, không gây hiểu lầm!";
        statusNote.className = "callout-box callout-success";
      } else {
        statusNote.innerHTML = "⚠️ <strong>CHƯA ĐẦY ĐỦ:</strong> Bấm vào các thẻ Who, What, Where, When, How để hoàn thiện thông điệp!";
        statusNote.className = "callout-box callout-warning";
      }
    }
  }
}

/* ==========================================================================
   CASE LAB (THỰC HÀNH THÁM TỬ KỸ THUẬT SỐ)
   ========================================================================== */
function initCaseLab() {
  const container = document.getElementById('cases-container');
  if (!container || typeof CASE_STUDIES === 'undefined') return;

  container.innerHTML = CASE_STUDIES.map(c => `
    <div class="case-card" id="${c.id}">
      <div class="case-header">
        <h4>${c.title}</h4>
        <span class="case-badge ${c.badgeType}">${c.badge}</span>
      </div>
      <div class="case-body">
        <div class="case-meta">
          <div>👤 <strong>Tác giả:</strong> ${c.author}</div>
          <div>🕒 <strong>Thời gian:</strong> ${c.date}</div>
          <div>🔗 <strong>Liên kết:</strong> <code>${c.linkSupplied}</code></div>
        </div>
        <div class="evidence-box">"${c.content}"</div>
        <button type="button" class="case-action-btn" data-case-toggle="${c.id}">
          🔍 Mở Hồ Sơ Khám Nghiệm AAOCC
        </button>
        <div class="case-solution" id="solution-${c.id}">
          <h5 style="margin-bottom:0.5rem; font-weight:800; color:var(--primary);">BÁO CÁO GIÁM ĐỊNH AAOCC:</h5>
          <ul style="padding-left:1.25rem; font-size:0.85rem; margin-bottom:0.75rem;">
            <li><strong>Accuracy (Chính xác):</strong> ${c.aaoccCheck.accuracy.pass ? '✅' : '❌'} ${c.aaoccCheck.accuracy.note}</li>
            <li><strong>Authority (Thẩm quyền):</strong> ${c.aaoccCheck.authority.pass ? '✅' : '❌'} ${c.aaoccCheck.authority.note}</li>
            <li><strong>Objectivity (Khách quan):</strong> ${c.aaoccCheck.objectivity.pass ? '✅' : '❌'} ${c.aaoccCheck.objectivity.note}</li>
            <li><strong>Currency (Cập nhật):</strong> ${c.aaoccCheck.currency.pass ? '✅' : '❌'} ${c.aaoccCheck.currency.note}</li>
            <li><strong>Coverage (Bao quát):</strong> ${c.aaoccCheck.coverage.pass ? '✅' : '❌'} ${c.aaoccCheck.coverage.note}</li>
          </ul>
          <div class="callout-box ${c.badgeType === 'danger' ? 'callout-danger' : c.badgeType === 'warning' ? 'callout-warning' : 'callout-info'}" style="margin:0; padding:0.75rem;">
            <strong>KẾT LUẬN: ${c.conclusion}</strong><br/>
            💡 <em>Khuyến nghị thám tử:</em> ${c.advice}
          </div>
        </div>
      </div>
    </div>
  `).join('');

  container.querySelectorAll('[data-case-toggle]').forEach(btn => {
    btn.addEventListener('click', () => {
      const caseId = btn.getAttribute('data-case-toggle');
      const sol = document.getElementById(`solution-${caseId}`);
      if (sol) {
        const isOpen = sol.classList.toggle('open');
        btn.textContent = isOpen ? '✖ Đóng Hồ Sơ Giám Định' : '🔍 Mở Hồ Sơ Khám Nghiệm AAOCC';
        playAudioCue('click');
      }
    });
  });
}

/* ==========================================================================
   QUIZ ENGINE (COMPREHENSIVE IC3 GS6 LEVEL 3)
   Hỗ trợ 2 Chế độ: Trình Chiếu Giảng Dạy (Từng Câu) & Danh Sách Học Sinh
   ========================================================================== */
let activeFilter = 'all';
let quizViewMode = 'presentation'; // 'presentation' | 'list'
let currentSlideIndex = 0;
let userAnswers = {}; // { questionId: answer }
let revealedQuestions = {}; // { questionId: boolean }
let isSubmitted = false;

function initQuiz() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const modePresBtn = document.getElementById('btn-mode-presentation');
  const modeListBtn = document.getElementById('btn-mode-list');
  const instantToggle = document.getElementById('toggle-instant-feedback');
  const fullscreenBtn = document.getElementById('btn-toggle-fullscreen');
  const submitBtn = document.getElementById('btn-submit-quiz');
  const resetBtn = document.getElementById('btn-reset-quiz');

  // Presentation Navigation Buttons
  const presPrevBtn = document.getElementById('btn-pres-prev');
  const presNextBtn = document.getElementById('btn-pres-next');
  const presRevealBtn = document.getElementById('btn-pres-reveal');
  const presRetryBtn = document.getElementById('btn-pres-retry');

  if (typeof QUIZ_QUESTIONS === 'undefined') return;

  // Filter Categories
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.getAttribute('data-filter');
      currentSlideIndex = 0;
      playAudioCue('click');
      refreshQuizView();
    });
  });

    // Mode Switcher: Presentation vs List
    if (modePresBtn && modeListBtn) {
      modePresBtn.addEventListener('click', () => {
        switchQuizMode('presentation');
        playAudioCue('click');
      });
      modeListBtn.addEventListener('click', () => {
        switchQuizMode('list');
        playAudioCue('click');
      });
    }

      // Presentation Controls
      if (presPrevBtn) presPrevBtn.addEventListener('click', () => prevQuestion());
      if (presNextBtn) presNextBtn.addEventListener('click', () => nextQuestion());
      if (presRevealBtn) presRevealBtn.addEventListener('click', () => toggleRevealCurrent());
      if (presRetryBtn) presRetryBtn.addEventListener('click', () => resetCurrentQuestion());

      // Fullscreen Button
      if (fullscreenBtn) {
        fullscreenBtn.addEventListener('click', () => toggleFullscreen());
      }

      // Keyboard Shortcuts for Teacher Slideshow
      document.addEventListener('keydown', handleQuizKeydown);

      // Submit & Reset for List Mode
      if (submitBtn) submitBtn.addEventListener('click', evaluateQuiz);
      if (resetBtn) resetBtn.addEventListener('click', resetQuiz);

      // Initial render
      refreshQuizView();
    }

    function switchQuizMode(mode) {
      quizViewMode = mode;
      const presBtn = document.getElementById('btn-mode-presentation');
      const listBtn = document.getElementById('btn-mode-list');
      const presStage = document.getElementById('presentation-stage');
      const listStage = document.getElementById('list-mode-container');

      if (mode === 'presentation') {
        if (presBtn) presBtn.classList.add('active');
        if (listBtn) listBtn.classList.remove('active');
        if (presStage) presStage.style.display = 'block';
        if (listStage) listStage.style.display = 'none';
      } else {
        if (presBtn) presBtn.classList.remove('active');
        if (listBtn) listBtn.classList.add('active');
        if (presStage) presStage.style.display = 'none';
        if (listStage) listStage.style.display = 'block';
      }

      refreshQuizView();
    }

    function refreshQuizView() {
      if (quizViewMode === 'presentation') {
        renderPresentationMode();
      } else {
        renderQuestions();
      }
      updateLiveScore();
    }

    function getFilteredQuestions() {
      if (activeFilter === 'all') return QUIZ_QUESTIONS;
      return QUIZ_QUESTIONS.filter(q => q.lesson === activeFilter);
    }

    function isAutoRevealEnabled() {
      const toggle = document.getElementById('toggle-instant-feedback');
      return toggle ? toggle.checked : true;
    }

    /* ==========================================================================
       PRESENTATION MODE (TRÌNH CHIẾU TỪNG CÂU CHO GIÁO VIÊN)
       ========================================================================== */
    function renderPresentationMode() {
      const questions = getFilteredQuestions();
      if (!questions.length) return;

      if (currentSlideIndex >= questions.length) currentSlideIndex = 0;
      if (currentSlideIndex < 0) currentSlideIndex = questions.length - 1;

      const q = questions[currentSlideIndex];
      const isRevealed = !!revealedQuestions[q.id];
      const userAns = userAnswers[q.id];

      // Update Header Badges
      const badgeEl = document.getElementById('pres-q-badge');
      const lessonTagEl = document.getElementById('pres-lesson-tag');
      const typeBadgeEl = document.getElementById('pres-type-badge');

      if (badgeEl) badgeEl.textContent = `Câu ${currentSlideIndex + 1} / ${questions.length}`;
      if (lessonTagEl) lessonTagEl.textContent = q.lessonTitle;
      if (typeBadgeEl) {
        if (q.type === 'single') typeBadgeEl.textContent = 'Chọn 1 đáp án đúng';
        else if (q.type === 'multiple') typeBadgeEl.textContent = `Chọn ${q.requiredCount || 2} đáp án`;
        else if (q.type === 'matching') typeBadgeEl.textContent = 'Ghép nối thuật ngữ';
      }

      // Render Jump Bar (1..N)
      renderJumpBar(questions);

      // Render Body
      const bodyEl = document.getElementById('pres-body');
      if (!bodyEl) return;

      let optionsHtml = '';

      if (q.type === 'single' || q.type === 'multiple') {
        const isMulti = q.type === 'multiple';
        optionsHtml = `
      <div class="pres-options-grid" role="${isMulti ? 'group' : 'radiogroup'}">
        ${q.options.map(opt => {
          let isSelected = false;
          if (isMulti) {
            isSelected = Array.isArray(userAns) && userAns.includes(opt.id);
          } else {
            isSelected = userAns === opt.id;
          }

          let cardClass = '';
          let statusBadge = '';

          if (isRevealed) {
            const isCorrectOption = isMulti ? q.correct.includes(opt.id) : q.correct === opt.id;
            if (isCorrectOption) {
              cardClass = 'correct';
              statusBadge = '<span class="pres-opt-status-tag correct">✓ ĐÁP ÁN ĐÚNG</span>';
            } else if (isSelected) {
              cardClass = 'wrong';
              statusBadge = '<span class="pres-opt-status-tag wrong">✗ LỰA CHỌN NÀY SAI</span>';
            }
          } else if (isSelected) {
            cardClass = 'selected';
          }

          return `
            <div class="pres-option-card ${cardClass}" data-pres-qid="${q.id}" data-pres-optid="${opt.id}" role="${isMulti ? 'checkbox' : 'radio'}" aria-checked="${isSelected}" tabindex="0">
              <span class="pres-opt-badge">${isSelected ? '✓' : opt.id}</span>
              <span class="pres-opt-text">${opt.text}</span>
              ${statusBadge}
            </div>
          `;
        }).join('')}
      </div>
    `;
      } else if (q.type === 'matching') {
        optionsHtml = renderMatchingUI(q, userAns || {});
      }

      // Explanation Box
      let explanationHtml = '';
      if (isRevealed) {
        let correctLabel = '';
        if (q.type === 'single') {
          const correctOpt = q.options.find(o => o.id === q.correct);
          correctLabel = `<strong>${q.correct}</strong>: ${correctOpt ? correctOpt.text : ''}`;
        } else if (q.type === 'multiple') {
          correctLabel = q.correct.join(', ');
        } else {
          correctLabel = 'Đã ghép nối chuẩn xác các cặp định nghĩa';
        }

        explanationHtml = `
      <div class="pres-explanation-box">
        <div class="pres-exp-header">
          <span class="pres-exp-tag">💡 ĐÁP ÁN CHÍNH XÁC: ${correctLabel}</span>
          <span style="font-size:0.85rem; color:var(--text-muted); font-weight:700;">Giải thích chi tiết cho bài giảng</span>
        </div>
        <div class="pres-exp-content">${q.explanation}</div>
      </div>
    `;
      }

      bodyEl.innerHTML = `
    <div class="pres-question-title">
      <strong>Câu ${currentSlideIndex + 1}:</strong> ${q.question}
    </div>
    ${optionsHtml}
    ${explanationHtml}
  `;

      // Attach Options Listeners
      attachPresOptionListeners(q);

      // Update Reveal Button State
      const revealBtn = document.getElementById('btn-pres-reveal');
      if (revealBtn) {
        if (isRevealed) {
          revealBtn.innerHTML = '🙈 Ẩn Đáp Án & Thử Lại';
          revealBtn.className = 'btn btn-pres btn-pres-hide';
        } else {
          revealBtn.innerHTML = '👁️ Hiện Đáp Án & Giải Thích';
          revealBtn.className = 'btn btn-pres btn-pres-reveal';
        }
      }

      // Update Prev / Next Button disabled states
      const prevBtn = document.getElementById('btn-pres-prev');
      const nextBtn = document.getElementById('btn-pres-next');
      if (prevBtn) prevBtn.disabled = currentSlideIndex === 0;
      if (nextBtn) nextBtn.disabled = currentSlideIndex === questions.length - 1;
    }

    function renderJumpBar(questions) {
      const jumpBar = document.getElementById('pres-jump-bar');
      if (!jumpBar) return;

      jumpBar.innerHTML = questions.map((q, idx) => {
        const isActive = idx === currentSlideIndex;
        const isAnswered = userAnswers[q.id] !== undefined;
        const isRevealed = !!revealedQuestions[q.id];

        let cls = 'jump-btn';
        if (isActive) cls += ' active';
        if (isRevealed) cls += ' revealed';
        else if (isAnswered) cls += ' answered';

        return `
      <button type="button" class="${cls}" data-jump-to="${idx}" title="Câu ${idx + 1} (${q.lessonTitle})" aria-label="Đến câu ${idx + 1}">
        ${idx + 1}
      </button>
    `;
      }).join('');

      jumpBar.querySelectorAll('[data-jump-to]').forEach(btn => {
        btn.addEventListener('click', () => {
          currentSlideIndex = parseInt(btn.getAttribute('data-jump-to'));
          playAudioCue('click');
          renderPresentationMode();
        });
      });
    }

    function attachPresOptionListeners(q) {
      document.querySelectorAll('[data-pres-qid]').forEach(card => {
        card.addEventListener('click', () => {
          const qid = parseInt(card.getAttribute('data-pres-qid'));
          const optid = card.getAttribute('data-pres-optid');

          if (q.type === 'single') {
            userAnswers[qid] = optid;
            playAudioCue('click');

            if (isAutoRevealEnabled()) {
              revealedQuestions[qid] = true;
              const isCorrect = optid === q.correct;
              playAudioCue(isCorrect ? 'correct' : 'wrong');
            }
            renderPresentationMode();
          } else if (q.type === 'multiple') {
            let selected = userAnswers[qid] || [];
            if (selected.includes(optid)) {
              selected = selected.filter(x => x !== optid);
            } else {
              if (q.requiredCount && selected.length >= q.requiredCount) {
                selected.shift();
              }
              selected.push(optid);
            }
            userAnswers[qid] = selected;
            playAudioCue('click');

            if (isAutoRevealEnabled() && q.requiredCount && selected.length === q.requiredCount) {
              revealedQuestions[qid] = true;
              const isCorrect = q.correct.every(c => selected.includes(c));
              playAudioCue(isCorrect ? 'correct' : 'wrong');
            }
            renderPresentationMode();
          }
        });
      });

      // Attach matching logic in presentation mode
      attachMatchingListeners();
    }

    function prevQuestion() {
      const questions = getFilteredQuestions();
      if (currentSlideIndex > 0) {
        currentSlideIndex--;
        playAudioCue('click');
        renderPresentationMode();
      }
    }

    function nextQuestion() {
      const questions = getFilteredQuestions();
      if (currentSlideIndex < questions.length - 1) {
        currentSlideIndex++;
        playAudioCue('click');
        renderPresentationMode();
      }
    }

    function toggleRevealCurrent() {
      const questions = getFilteredQuestions();
      const q = questions[currentSlideIndex];
      if (!q) return;

      revealedQuestions[q.id] = !revealedQuestions[q.id];
      if (revealedQuestions[q.id]) {
        playAudioCue('correct');
      } else {
        playAudioCue('click');
      }
      renderPresentationMode();
    }

    function resetCurrentQuestion() {
      const questions = getFilteredQuestions();
      const q = questions[currentSlideIndex];
      if (!q) return;

      delete userAnswers[q.id];
      delete revealedQuestions[q.id];
      playAudioCue('click');
      renderPresentationMode();
    }

    function toggleFullscreen() {
      const stage = document.getElementById('presentation-stage');
      if (!stage) return;

      if (!document.fullscreenElement) {
        if (stage.requestFullscreen) {
          stage.requestFullscreen();
        } else if (stage.webkitRequestFullscreen) {
          stage.webkitRequestFullscreen();
        }
        stage.classList.add('is-fullscreen');
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
        stage.classList.remove('is-fullscreen');
      }
    }

    function handleQuizKeydown(e) {
      // Only handle shortcuts when on the quiz tab and not typing in an input
      const quizTab = document.getElementById('tab-quiz');
      if (!quizTab || quizTab.getAttribute('aria-selected') !== 'true') return;
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) return;

      if (quizViewMode === 'presentation') {
        if (e.key === 'ArrowRight' || e.key === 'PageDown') {
          e.preventDefault();
          nextQuestion();
        } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
          e.preventDefault();
          prevQuestion();
        } else if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          toggleRevealCurrent();
        } else if (e.key === 'f' || e.key === 'F') {
          e.preventDefault();
          toggleFullscreen();
        }
      }
    }

    /* ==========================================================================
       LIST MODE (HỌC SINH TỰ LUYỆN TẬP TẤT CẢ)
       ========================================================================== */
    function renderQuestions() {
      const container = document.getElementById('quiz-questions-list');
      const questions = getFilteredQuestions();
      if (!container) return;

      container.innerHTML = questions.map((q, qIndex) => {
        const isAnswered = userAnswers[q.id] !== undefined;
        const isRevealed = isSubmitted || !!revealedQuestions[q.id];

        let badgeText = q.type === 'multiple' ? `Chọn ${q.requiredCount || 2} đáp án` : (q.type === 'matching' ? 'Kéo ghép nối' : 'Chọn 1 đáp án');
        let badgeClass = q.type === 'multiple' ? 'multi' : (q.type === 'matching' ? 'matching' : '');

        let optionsHtml = '';

        if (q.type === 'single') {
          optionsHtml = `
        <div class="options-list" role="radiogroup" aria-labelledby="q-title-${q.id}">
          ${q.options.map(opt => {
            const isSelected = userAnswers[q.id] === opt.id;
            let statusClass = '';
              if (isRevealed) {
                if (opt.id === q.correct) statusClass = 'correct';
                else if (isSelected && opt.id !== q.correct) statusClass = 'wrong';
              } else if (isSelected) {
                statusClass = 'selected';
              }

              return `
              <div class="option-item ${statusClass}" data-qid="${q.id}" data-optid="${opt.id}" role="radio" aria-checked="${isSelected}" tabindex="0">
                <span class="opt-prefix">${opt.id}</span>
                <span class="opt-text">${opt.text}</span>
              </div>
            `;
            }).join('')}
        </div>
      `;
        } else if (q.type === 'multiple') {
          const currentSelected = userAnswers[q.id] || [];
          optionsHtml = `
        <div class="options-list" role="group" aria-labelledby="q-title-${q.id}">
          ${q.options.map(opt => {
            const isSelected = currentSelected.includes(opt.id);
            let statusClass = '';
              if (isRevealed) {
                if (q.correct.includes(opt.id)) statusClass = 'correct';
                else if (isSelected && !q.correct.includes(opt.id)) statusClass = 'wrong';
              } else if (isSelected) {
                statusClass = 'selected';
              }

              return `
              <div class="option-item ${statusClass}" data-qid="${q.id}" data-optid="${opt.id}" data-multi="true" role="checkbox" aria-checked="${isSelected}" tabindex="0">
                <span class="opt-prefix">${isSelected ? '✓' : opt.id}</span>
                <span class="opt-text">${opt.text}</span>
              </div>
            `;
            }).join('')}
        </div>
      `;
        } else if (q.type === 'matching') {
          const currentMatches = userAnswers[q.id] || {};
          optionsHtml = renderMatchingUI(q, currentMatches);
        }

        // Individual Action Bar for Teachers / Students
        const cardActionsHtml = `
      <div class="card-action-bar">
        <button type="button" class="btn-card-reveal ${isRevealed ? 'active' : ''}" data-card-reveal="${q.id}">
          ${isRevealed ? '🙈 Ẩn Đáp Án & Giải Thích' : '👁️ Hiện Đáp Án & Giải Thích Ngay'}
        </button>
        <button type="button" class="btn-card-retry" data-card-retry="${q.id}">
          🔄 Thử lại câu này
        </button>
      </div>
    `;

        // Feedback box if revealed
        let feedbackHtml = '';
          if (isRevealed) {
            const isCorrect = checkQuestionCorrect(q);
            feedbackHtml = `
        <div class="q-feedback open ${isCorrect ? 'correct' : 'wrong'}">
          <strong>${isCorrect ? '✅ Chính xác!' : '💡 Đáp án & Hướng dẫn giải thích:'}</strong>
          <p style="margin-top:0.25rem;">${q.explanation}</p>
        </div>
      `;
          }

          return `
      <div class="question-card" id="q-card-${q.id}">
        <div class="q-top-row">
          <span class="q-badge ${badgeClass}">${badgeText}</span>
          <span style="font-size:0.8rem; font-weight:700; color:var(--text-subtle);">${q.lessonTitle}</span>
        </div>
        <div class="q-text" id="q-title-${q.id}"><strong>Câu ${qIndex + 1}:</strong> ${q.question}</div>
        ${optionsHtml}
        ${cardActionsHtml}
        ${feedbackHtml}
      </div>
    `;
        }).join('');

      attachListOptionListeners();
      attachCardActionListeners();
      updateLiveScore();
    }

    /* Matching UI Renderer & Click-to-connect handler */
    let activeMatchingTerm = null;

    function renderMatchingUI(q, currentMatches) {
      const isRevealed = !!revealedQuestions[q.id] || isSubmitted;

      return `
    <div class="matching-container" id="matching-${q.id}">
      <div class="matching-col">
        <h5>Thuật ngữ Sở hữu trí tuệ:</h5>
        ${q.pairs.map(p => {
        const isMatched = isRevealed || !!currentMatches[p.id];
        return `
            <div class="matching-item ${isMatched ? 'matched' : ''}" data-qid="${q.id}" data-term-id="${p.id}" tabindex="0">
              <strong>${p.term}</strong>
              ${isMatched ? ` ➔ <em>Đã ghép đôi</em>` : ''}
            </div>
          `;
      }).join('')}
      </div>
      <div class="matching-col">
        <h5>Mô tả hành vi vi phạm:</h5>
        ${q.pairs.map(p => {
        const isMatched = isRevealed || Object.keys(currentMatches).some(k => currentMatches[k] === p.id);
        return `
            <div class="matching-item ${isMatched ? 'matched' : ''}" data-qid="${q.id}" data-desc-id="${p.id}" tabindex="0">
              ${p.match}
            </div>
          `;
      }).join('')}
      </div>
    </div>
    <div style="font-size:0.8rem; color:var(--text-subtle); margin-top:0.5rem;">
      💡 <em>Hướng dẫn:</em> Bấm chọn một thuật ngữ bên trái, sau đó bấm vào mô tả tương ứng bên phải để ghép đôi.
    </div>
  `;
    }

      function attachListOptionListeners() {
        // Single choice
        document.querySelectorAll('.option-item:not([data-multi])').forEach(item => {
          item.addEventListener('click', () => {
            const qid = parseInt(item.getAttribute('data-qid'));
            const optid = item.getAttribute('data-optid');
            userAnswers[qid] = optid;
            playAudioCue('click');

            if (isAutoRevealEnabled()) {
              revealedQuestions[qid] = true;
            }
            renderQuestions();
          });
        });

        // Multiple choice
        document.querySelectorAll('.option-item[data-multi="true"]').forEach(item => {
          item.addEventListener('click', () => {
            const qid = parseInt(item.getAttribute('data-qid'));
            const optid = item.getAttribute('data-optid');
            const q = QUIZ_QUESTIONS.find(x => x.id === qid);
            let selected = userAnswers[qid] || [];

            if (selected.includes(optid)) {
              selected = selected.filter(x => x !== optid);
            } else {
              if (q.requiredCount && selected.length >= q.requiredCount) {
                selected.shift();
              }
              selected.push(optid);
            }
            userAnswers[qid] = selected;
            playAudioCue('click');

            if (isAutoRevealEnabled() && q.requiredCount && selected.length === q.requiredCount) {
              revealedQuestions[qid] = true;
            }
            renderQuestions();
          });
        });

        attachMatchingListeners();
      }

      function attachMatchingListeners() {
        // Matching click logic for both presentation and list modes
        document.querySelectorAll('.matching-item[data-term-id]').forEach(termItem => {
          termItem.addEventListener('click', () => {
            const qid = parseInt(termItem.getAttribute('data-qid'));
            const termId = termItem.getAttribute('data-term-id');


            document.querySelectorAll('.matching-item[data-term-id]').forEach(el => el.classList.remove('active'));
            termItem.classList.add('active');
            activeMatchingTerm = { qid, termId };
            playAudioCue('click');
          });
        });

        document.querySelectorAll('.matching-item[data-desc-id]').forEach(descItem => {
          descItem.addEventListener('click', () => {
            if (!activeMatchingTerm) return;
            const qid = parseInt(descItem.getAttribute('data-qid'));
            const descId = descItem.getAttribute('data-desc-id');

            if (activeMatchingTerm.qid === qid) {
              if (!userAnswers[qid]) userAnswers[qid] = {};
              userAnswers[qid][activeMatchingTerm.termId] = descId;
              playAudioCue('correct');
              activeMatchingTerm = null;

              const q = QUIZ_QUESTIONS.find(x => x.id === qid);
              if (q && Object.keys(userAnswers[qid]).length === q.pairs.length && isAutoRevealEnabled()) {
                revealedQuestions[qid] = true;
              }

              refreshQuizView();
            }
          });
        });
      }

      function attachCardActionListeners() {
        document.querySelectorAll('[data-card-reveal]').forEach(btn => {
          btn.addEventListener('click', () => {
            const qid = parseInt(btn.getAttribute('data-card-reveal'));
            revealedQuestions[qid] = !revealedQuestions[qid];
            playAudioCue('click');
            renderQuestions();
          });
        });

        document.querySelectorAll('[data-card-retry]').forEach(btn => {
          btn.addEventListener('click', () => {
            const qid = parseInt(btn.getAttribute('data-card-retry'));
            delete userAnswers[qid];
            delete revealedQuestions[qid];
            playAudioCue('click');
            renderQuestions();
          });
        });
      }

      function checkQuestionCorrect(q) {
        const ans = userAnswers[q.id];
        if (ans === undefined) return false;

        if (q.type === 'single') {
          return ans === q.correct;
        } else if (q.type === 'multiple') {
          if (!Array.isArray(ans) || ans.length !== q.correct.length) return false;
          return q.correct.every(c => ans.includes(c));
        } else if (q.type === 'matching') {
          if (!ans || typeof ans !== 'object') return false;
          return q.pairs.every(p => ans[p.id] === p.id);
        }
        return false;
      }

      function updateLiveScore() {
        const questions = getFilteredQuestions();
        const total = questions.length;
        const answeredCount = questions.filter(q => userAnswers[q.id] !== undefined).length;

        const progressEl = document.getElementById('quiz-answered-count');
        if (progressEl) {
          progressEl.textContent = `${answeredCount} / ${total} câu đã trả lời`;
        }
      }

      function evaluateQuiz() {
        const questions = getFilteredQuestions();
        let correctCount = 0;

        questions.forEach(q => {
          revealedQuestions[q.id] = true;
          if (checkQuestionCorrect(q)) correctCount++;
        });

        isSubmitted = true;
        refreshQuizView();

        const percent = Math.round((correctCount / questions.length) * 100);

        if (percent >= 80) {
          playAudioCue('win');
        } else {
          playAudioCue('correct');
        }

        showResultDialog(correctCount, questions.length, percent);
      }

      function resetQuiz() {
        userAnswers = {};
        revealedQuestions = {};
        isSubmitted = false;
        activeMatchingTerm = null;
        currentSlideIndex = 0;
        playAudioCue('click');
        refreshQuizView();
      }

      /* ==========================================================================
         RESULT & CERTIFICATE MODAL
         ========================================================================== */
      function showResultDialog(correct, total, percent) {
        const dialog = document.getElementById('quiz-result-dialog');
        if (!dialog) return;

        const scoreEl = document.getElementById('dialog-score');
        const totalEl = document.getElementById('dialog-total');
        const titleEl = document.getElementById('dialog-rank-title');
        const certNameEl = document.getElementById('cert-student-name');
        const certDateEl = document.getElementById('cert-date');

        if (scoreEl) scoreEl.textContent = correct;
        if (totalEl) totalEl.textContent = total;

        let rank = "Thám Tử Tập Sự";
        if (percent >= 90) rank = "🌟 ĐẠI THÁM TỬ KỸ THUẬT SỐ XUẤT SẮC";
        else if (percent >= 70) rank = "🔍 THÁM TỬ THÔNG TIN CẤP CAO";
        else if (percent >= 50) rank = "🔎 THÁM TỬ THÔNG TIN";

        if (titleEl) titleEl.textContent = rank;

        if (certDateEl) {
          const today = new Date();
          certDateEl.textContent = `Ngày cấp: ${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
        }

        // Ask or get student name
        let studentName = localStorage.getItem('student_name') || 'Học Sinh Lớp 8';
        if (certNameEl) certNameEl.textContent = studentName;

        dialog.showModal();

        // Close btn
        const closeBtn = document.getElementById('btn-close-dialog');
        if (closeBtn) {
          closeBtn.onclick = () => dialog.close();
        }

        const printCertBtn = document.getElementById('btn-print-cert');
        if (printCertBtn) {
          printCertBtn.onclick = () => window.print();
        }

        const editNameBtn = document.getElementById('btn-edit-name');
        if (editNameBtn) {
          editNameBtn.onclick = () => {
            const newName = prompt('Nhập họ và tên của bạn để in lên Chứng chỉ:', studentName);
            if (newName && newName.trim()) {
              studentName = newName.trim();
              localStorage.setItem('student_name', studentName);
              if (certNameEl) certNameEl.textContent = studentName;
            }
          };
        }
      }

      /* ==========================================================================
         PRINT WORKSHEET BUTTON
         ========================================================================== */
      function initPrintButton() {
        document.querySelectorAll('[data-action="print-worksheet"]').forEach(btn => {
          btn.addEventListener('click', () => {
            playAudioCue('click');
            window.print();
          });
        });
      }

