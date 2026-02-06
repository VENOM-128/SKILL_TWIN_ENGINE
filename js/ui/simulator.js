/* ================================
   ROLE SIMULATOR VIEW
   ================================ */

/**
 * Render role simulator with skill requirements
 */
function renderSimulator() {
  const roleSelector = document.getElementById("role-selector");
  
  if (roleSelector) {
    roleSelector.value = currentTargetRole;
    roleSelector.onchange = (e) => {
      currentTargetRole = e.target.value;
      renderSimulator();
      
      // Update dashboard if visible
      if (currentUser && currentUser.role === "STUDENT") {
        renderStudentDashboard();
      }
    };
  }

  const analysis = analyzeSkillGap(currentTargetRole);

  // Required skills
  const reqContainer = document.getElementById("sim-req-skills");
  if (reqContainer) {
    reqContainer.innerHTML = analysis.required.map(s =>
      `<span class="px-2 py-1 rounded bg-slate-800 text-slate-300 text-xs border border-slate-700">${s}</span>`
    ).join("");
  }

  // Missing skills
  const missingContainer = document.getElementById("sim-missing-skills");
  if (missingContainer) {
    missingContainer.innerHTML = analysis.missing.length > 0
      ? analysis.missing.map(s => 
          `<span class="px-2 py-1 rounded bg-rose-500/10 text-rose-300 text-xs border border-rose-500/30">${s}</span>`
        ).join("")
      : '<span class="text-emerald-400 text-xs">You are ready for this role!</span>';
  }

  // Time estimate
  const timeEl = document.getElementById("sim-time");
  if (timeEl) timeEl.textContent = (analysis.missing.length * 2) + " Weeks";

  // Effort level
  const effortEl = document.getElementById("sim-effort");
  if (effortEl) {
    const effort = analysis.missing.length > 4 ? "High" : analysis.missing.length > 2 ? "Medium" : "Low";
    effortEl.textContent = effort;
    effortEl.className = `text-2xl font-bold ${effort === "High" ? "text-rose-400" : effort === "Medium" ? "text-amber-400" : "text-emerald-400"}`;
  }
}
