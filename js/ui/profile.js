/* ================================
   PROFILE PAGE RENDERING
   ================================ */

/**
 * Render student profile page
 */
function renderStudentProfilePage() {
  if (!currentUser) return;

  const nameEl = document.getElementById("profile-view-name");
  if (nameEl) nameEl.textContent = currentUser.fullName;

  const usernameEl = document.getElementById("profile-view-username");
  if (usernameEl) usernameEl.textContent = currentUser.username;

  const emailEl = document.getElementById("profile-view-email");
  if (emailEl) emailEl.textContent = currentUser.email;

  const resumeSkillsContainer = document.getElementById("profile-resume-skills");
  if (resumeSkillsContainer) {
    resumeSkillsContainer.innerHTML = currentResumeSkills.length > 0
      ? currentResumeSkills.map(s => 
          `<span class="px-2 py-1 rounded bg-cyan-500/10 text-cyan-300 text-xs border border-cyan-500/30">${s}</span>`
        ).join("")
      : '<p class="text-xs text-slate-400">No skills extracted from portfolio yet. Go to the Analyzer.</p>';
  }

  const syllabusSkillsContainer = document.getElementById("profile-syllabus-skills");
  if (syllabusSkillsContainer) {
    syllabusSkillsContainer.innerHTML = currentSyllabusSkills.length > 0
      ? currentSyllabusSkills.map(s => 
          `<span class="px-2 py-1 rounded bg-purple-500/10 text-purple-300 text-xs border border-purple-500/30">${s}</span>`
        ).join("")
      : '<p class="text-xs text-slate-400">No skills extracted from syllabus yet. Go to the Analyzer.</p>';
  }
}
