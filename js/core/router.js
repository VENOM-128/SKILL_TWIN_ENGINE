/* ================================
   VIEW ROUTER & NAVIGATION
   ================================ */

/**
 * Switch between different views
 */
function switchView(viewId) {
  const allViews = document.querySelectorAll("[data-view]");
  allViews.forEach((el) => {
    el.classList.add("hidden");
  });
  
  const target = document.querySelector('[data-view="' + viewId + '"]');
  if (target) {
    target.classList.remove("hidden");
  }
  
  // Update breadcrumbs
  updateBreadcrumbs(viewId);
  
  // Update active navigation
  document.querySelectorAll('[data-nav]').forEach(btn => {
    btn.classList.remove('bg-emerald-500/10', 'border', 'border-emerald-500/20');
  });
  
  const activeNav = document.querySelector(`[data-nav="${viewId}"]`);
  if (activeNav) {
    activeNav.classList.add('bg-emerald-500/10', 'border', 'border-emerald-500/20');
  }
}

/**
 * Update breadcrumb navigation
 */
function updateBreadcrumbs(viewId) {
  const breadcrumb = document.getElementById("breadcrumb-current");
  if (breadcrumb) {
    breadcrumb.textContent = VIEW_NAMES[viewId] || "Dashboard";
  }
}

/**
 * Update sidebar based on user role
 */
function updateSidebarForUser() {
  const sidebarRole = document.getElementById("sidebar-role");
  const sidebarUser = document.getElementById("sidebar-user");
  const navLinks = document.getElementById("nav-links");

  sidebarRole.textContent = currentUser
    ? currentUser.role === "ADMIN"
      ? "Administrator"
      : currentUser.role === "FACULTY"
      ? "Curriculum Planner"
      : "Learner"
    : "";
  sidebarUser.textContent = currentUser ? currentUser.fullName : "";

  navLinks.innerHTML = "";
  if (!currentUser) return;

  const makeLink = (id, icon, label, isActive = false) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <button data-nav="${id}" class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:bg-slate-800/80 text-sm transition group ${isActive ? 'bg-emerald-500/10 border border-emerald-500/20' : ''}">
        <span class="h-8 w-8 rounded-lg bg-slate-900/80 text-slate-400 flex items-center justify-center group-hover:text-emerald-300 group-hover:bg-slate-900/90 transition">
          <i class="${icon} text-sm"></i>
        </span>
        <span class="font-medium">${label}</span>
      </button>
    `;
    return li;
  };

  if (currentUser.role === "STUDENT") {
    navLinks.appendChild(makeLink("dashboard", "fa-solid fa-gauge-high", "Dashboard", true));
    navLinks.appendChild(makeLink("analyzer", "fa-solid fa-microchip", "Twin Analyzer"));
    navLinks.appendChild(makeLink("roadmap", "fa-solid fa-route", "AI Roadmap"));
    navLinks.appendChild(makeLink("simulator", "fa-solid fa-vr-cardboard", "Role Simulator"));
    navLinks.appendChild(makeLink("student-profile", "fa-solid fa-id-card", "My Profile"));
  }

  // Attach click handlers
  navLinks.querySelectorAll("button[data-nav]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetView = btn.getAttribute("data-nav");
      switchView(targetView);
      
      // Render specific view content
      switch(targetView) {
        case "dashboard":
          renderStudentDashboard();
          break;
        case "analyzer":
          renderTwinRadarChart();
          break;
        case "simulator":
          renderSimulator();
          break;
        case "roadmap":
          generateRoadmapUI();
          break;
        case "student-profile":
          renderStudentProfilePage();
          break;
        case "market-insights":
          renderMarketInsights();
          break;
      }
      
      // Close sidebar on mobile
      if (window.innerWidth < 768) {
        document.getElementById("sidebar").classList.add("hidden");
      }
    });
  });
}

/**
 * Toggle sidebar on mobile
 */
function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("hidden");
}
