/* ================================
   THEME & UI STATE MANAGEMENT
   ================================ */

/**
 * Initialize theme from localStorage
 */
function initTheme() {
  const saved = localStorage.getItem("apt_theme");
  if (saved === "light") {
    toggleTheme();
  }
}

/**
 * Toggle between dark and light mode
 */
function toggleTheme() {
  isDarkMode = !isDarkMode;
  document.body.classList.toggle("light-mode");
  
  const themeIcon = document.querySelector("#theme-toggle i");
  if (themeIcon) {
    themeIcon.className = isDarkMode ? "fa-solid fa-moon" : "fa-solid fa-sun";
  }
  
  localStorage.setItem("apt_theme", isDarkMode ? "dark" : "light");
}

/**
 * Initialize 3D Tilt effect for cards
 */
function initTilt() {
  if (typeof VanillaTilt !== "undefined") {
    VanillaTilt.init(document.querySelectorAll("main .glass-card"), {
      max: 5,
      speed: 400,
      glare: true,
      "max-glare": 0.2,
      scale: 1.02
    });
  }
}

/**
 * Setup all event listeners
 */
function setupEventListeners() {
  // Login form
  document.getElementById("login-form")?.addEventListener("submit", handleLogin);

  // Logout
  document.getElementById("logout-btn")?.addEventListener("click", () => logout());

  // Sidebar toggle mobile
  const sidebarToggle = document.getElementById("sidebar-toggle");
  const sidebar = document.getElementById("sidebar");
  sidebarToggle?.addEventListener("click", () => {
    sidebar.classList.toggle("hidden");
  });

  // Global analyze button
  const analyzeBtn = document.getElementById("btn-global-analyze");
  analyzeBtn?.addEventListener("click", async () => {
    if (!currentUser) return;

    if (currentUser.role === "STUDENT") {
      const analysis = analyzeSkillGap(currentTargetRole);
      const outputEl = document.getElementById("dashboard-ai-output");

      const prompt = `You are a Career Coach AI. The student wants to be a ${currentTargetRole}.
       Missing Skills: ${analysis.missing.join(", ")}.
       Current Skills: ${currentResumeSkills.join(", ")}.
       Provide a 3-step action plan to bridge this gap. Keep it concise.`;

      outputEl.innerHTML = '<p class="text-xs text-slate-400 flex items-center gap-2"><span class="h-3 w-3 rounded-full border-2 border-emerald-400 border-t-transparent animate-spin-soft"></span> Generating AI guidance...</p>';
      
      try {
        const res = await callGemini(prompt);
        outputEl.innerHTML = (typeof marked.parse === 'function' ? marked.parse(res) : marked(res));
      } catch (e) {
        console.error(e);
        outputEl.innerHTML = '<p class="text-xs text-rose-400">Failed to contact AI service. Please try again later.</p>';
      }
      
      generateRoadmapUI();
      switchView('roadmap');
    }
  });

  // Resume/Syllabus processing
  document.getElementById("btn-process-resume")?.addEventListener("click", handleProcessResume);
  document.getElementById("btn-process-syllabus")?.addEventListener("click", handleProcessSyllabus);
  document.getElementById("btn-run-analysis")?.addEventListener("click", handleRunAnalysis);

  // Notifications
  document.getElementById("view-notifications-btn")?.addEventListener("click", () => {
    renderNotificationsStandalone();
    switchView("notifications-view");
  });

  document.getElementById("btn-back-from-notifications")?.addEventListener("click", () => {
    if (!currentUser) return;
    if (currentUser.role === "STUDENT") switchView("dashboard");
  });

  // Theme toggle
  document.getElementById("theme-toggle")?.addEventListener("click", toggleTheme);

  // Market features
  document.getElementById("market-pulse-btn")?.addEventListener("click", () => {
    switchView("market-insights");
    renderMarketInsights();
  });

  document.getElementById("btn-market-search")?.addEventListener("click", handleMarketSearch);
  document.getElementById("market-search-input")?.addEventListener("keypress", (e) => {
    if (e.key === "Enter") handleMarketSearch();
  });

  document.getElementById("btn-market-clear")?.addEventListener("click", () => {
    const input = document.getElementById("market-search-input");
    const clearBtn = document.getElementById("btn-market-clear");
    if (input) input.value = "";
    if (clearBtn) clearBtn.classList.add("hidden");
    renderMarketFeedTable(DEFAULT_MARKET_FEEDS);
  });

  // Chart toggle
  const btnToggleChart = document.getElementById("btn-toggle-chart");
  btnToggleChart?.addEventListener("click", () => {
    isVennView = !isVennView;
    const btnText = document.getElementById("chart-toggle-text");
    if (isVennView) {
      btnText.textContent = "View Radar";
      renderTwinVennChart();
    } else {
      btnText.textContent = "View Venn";
      renderTwinRadarChart();
    }
  });

  // AI Chat
  document.getElementById("ai-chat-toggle")?.addEventListener("click", toggleAIChat);
  setupAIChatListeners();

  // Keyboard shortcuts
  setupKeyboardShortcuts();
}

/**
 * Bootstrap application on DOM ready
 */
document.addEventListener("DOMContentLoaded", () => {
  setupEventListeners();
  initTheme();
  showLogin();
  updateNotificationBadge();
  initTilt();
});
