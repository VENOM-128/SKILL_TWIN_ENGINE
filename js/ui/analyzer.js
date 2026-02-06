/* ================================
   TWIN ANALYZER VIEW
   ================================ */

/**
 * Handle resume/portfolio processing
 */
async function handleProcessResume() {
  const fileInput = document.getElementById("file-resume");
  const urlInput = document.getElementById("input-resume-url");
  let text = document.getElementById("input-resume-text").value;
  
  if (fileInput && fileInput.files.length > 0) {
    showToast("Reading PDF...", "info");
    const pdfText = await extractTextFromPDF(fileInput.files[0]);
    text += "\n" + pdfText;
  }

  if (urlInput && urlInput.value.trim()) {
    const url = urlInput.value.trim();
    try {
      const summary = await analyzeGitHubURL(url);
      text += "\n" + summary;
      showToast("GitHub data extracted.", "success");
    } catch (ghErr) {
      console.warn('GitHub fetch failed', ghErr);
      showToast("Could not analyze URL. Try pasting text.", "error");
    }
  }

  document.getElementById("input-resume-text").value = text;

  if (text.trim()) {
    const skills = extractSkillsFromText(text);
    if (skills.length > 0) {
      currentResumeSkills = skills;
      showToast(`Portfolio processed! Extracted ${skills.length} skills.`, "success");
      if (currentUser && currentUser.role === "STUDENT") {
        renderStudentDashboard();
      }
    } else {
      showToast("No known skills found. Try adding keywords manually.", "info");
    }
  } else {
    showToast("Please upload a PDF, enter a URL, or paste text.", "error");
  }
}

/**
 * Handle syllabus processing
 */
async function handleProcessSyllabus() {
  const fileInput = document.getElementById("file-syllabus");
  const urlInput = document.getElementById("input-syllabus-url");
  let text = document.getElementById("input-syllabus-text").value;

  if (fileInput && fileInput.files.length > 0) {
    showToast("Reading PDF...", "info");
    const pdfText = await extractTextFromPDF(fileInput.files[0]);
    text += "\n" + pdfText;
  }

  if (urlInput && urlInput.value.trim()) {
    const url = urlInput.value.trim();
    showToast("Analyzing syllabus URL via AI...", "info");
    try {
      const prompt = `Analyze the academic syllabus or course curriculum at ${url}. Extract a list of technical topics, subjects, and skills covered. Return ONLY a comma-separated list of skills/topics.`;
      const aiData = await callGemini(prompt, true);
      text += "\n" + aiData;
      showToast("Syllabus data extracted successfully.", "success");
    } catch (e) {
      console.error("Syllabus analysis failed", e);
      showToast("Could not analyze URL. Try pasting text.", "error");
    }
  }

  document.getElementById("input-syllabus-text").value = text;

  if (text.trim()) {
    const skills = extractSkillsFromText(text);
    if (skills.length > 0) {
      currentSyllabusSkills = skills;
      showToast(`Syllabus processed! Found ${skills.length} relevant skills.`, "success");
      if (currentUser && currentUser.role === "STUDENT") {
        renderStudentDashboard();
      }
    } else {
      showToast("No relevant skills found in syllabus.", "info");
    }
  } else {
    showToast("Please upload a PDF, enter a URL, or paste text.", "error");
  }
}

/**
 * Handle running full gap analysis
 */
function handleRunAnalysis() {
  switchView('dashboard');
  renderStudentDashboard();
  showToast("Twin Engine Analysis Complete", "success");
}
