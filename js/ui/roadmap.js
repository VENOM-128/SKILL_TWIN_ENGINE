/* ================================
   ROADMAP & LEARNING PATH
   ================================ */

/**
 * Generate personalized learning roadmap
 */
function generateRoadmapUI() {
  const analysis = analyzeSkillGap(currentTargetRole);
  const container = document.getElementById("roadmap-container");
  
  if (!container) return;

  if (analysis.missing.length === 0) {
    container.innerHTML = '<p class="text-emerald-400">No gaps found! You are ready.</p>';
    return;
  }

  container.innerHTML = analysis.missing.map((skill, idx) => {
    const ytLink = `https://www.youtube.com/results?search_query=${encodeURIComponent(skill + " full course tutorial")}`;
    const projectLink = `https://github.com/search?q=${encodeURIComponent(skill + " beginner project")}&type=repositories`;
    
    return `
      <div class="relative animate-slide-in-right" style="animation-delay: ${idx * 0.2}s">
        <div class="absolute -left-[41px] top-0 h-6 w-6 rounded-full bg-slate-900 border-2 border-cyan-500 flex items-center justify-center z-10">
          <span class="text-[10px] text-cyan-400 font-bold">${idx + 1}</span>
        </div>
        <div class="glass-card p-4 rounded-xl border border-slate-700/50">
          <h4 class="text-sm font-bold text-slate-100">Week ${idx + 1}: Master ${skill}</h4>
          <p class="text-xs text-slate-400 mt-1">Focus on core concepts and build a mini-project.</p>
          <div class="mt-3 flex gap-2">
            <a href="${ytLink}" target="_blank" class="px-3 py-1 bg-cyan-500/10 text-cyan-300 text-[10px] rounded border border-cyan-500/30 hover:bg-cyan-500/20 flex items-center gap-2">
              <i class="fa-brands fa-youtube"></i> Watch Tutorial
            </a>
            <a href="${projectLink}" target="_blank" class="px-3 py-1 bg-purple-500/10 text-purple-300 text-[10px] rounded border border-purple-500/30 hover:bg-purple-500/20 flex items-center gap-2">
              <i class="fa-brands fa-github"></i> Practice Project
            </a>
          </div>
        </div>
      </div>
    `;
  }).join("");

  // Initialize Tilt on roadmap cards
  if (typeof VanillaTilt !== "undefined") {
    VanillaTilt.init(container.querySelectorAll(".glass-card"), {
      max: 5,
      speed: 400,
      glare: true,
      "max-glare": 0.2,
      scale: 1.02
    });
  }

  // Add course recommendations
  const recContainer = document.getElementById("course-recommendations");
  if (recContainer) {
    const courseraLink = `https://www.coursera.org/search?query=${encodeURIComponent(currentTargetRole + " Specialization")}`;
    const udemyLink = `https://www.udemy.com/courses/search/?q=${encodeURIComponent("Complete " + (analysis.missing[0] || "Skill") + " Bootcamp")}`;

    recContainer.innerHTML = `
      <a href="${courseraLink}" target="_blank" class="block p-3 rounded-lg bg-slate-900/50 border border-slate-800 hover:border-cyan-500/30 transition cursor-pointer group">
        <div class="flex items-center justify-between">
          <p class="text-xs font-bold text-slate-200 group-hover:text-cyan-400 transition">Coursera: ${currentTargetRole} Specialization</p>
          <i class="fa-solid fa-arrow-up-right-from-square text-[10px] text-slate-500 group-hover:text-cyan-400"></i>
        </div>
        <p class="text-[10px] text-slate-500 mt-1">Rated 4.8/5 • 3 Months</p>
      </a>
      <a href="${udemyLink}" target="_blank" class="block p-3 rounded-lg bg-slate-900/50 border border-slate-800 hover:border-purple-500/30 transition cursor-pointer group">
        <div class="flex items-center justify-between">
          <p class="text-xs font-bold text-slate-200 group-hover:text-purple-400 transition">Udemy: Complete ${analysis.missing[0] || "Skill"} Bootcamp</p>
          <i class="fa-solid fa-arrow-up-right-from-square text-[10px] text-slate-500 group-hover:text-purple-400"></i>
        </div>
        <p class="text-[10px] text-slate-500 mt-1">Rated 4.7/5 • 20 Hours</p>
      </a>
    `;
  }
}
