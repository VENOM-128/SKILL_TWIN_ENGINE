/* ================================
   SKILL ANALYSIS & GAP ENGINE
   ================================ */

/**
 * Analyze skill gaps between student and role requirements
 */
function analyzeSkillGap(role) {
  const required = ROLE_SKILLS[role] || [];
  const studentHas = currentResumeSkills;
  const syllabusHas = currentSyllabusSkills;

  const missing = required.filter(s => !studentHas.includes(s));
  const coveredBySyllabus = required.filter(s => syllabusHas.includes(s));
  const gapInSyllabus = required.filter(s => !syllabusHas.includes(s));
  
  const readinessScore = Math.round(((required.length - missing.length) / required.length) * 100);

  return {
    required,
    missing,
    coveredBySyllabus,
    gapInSyllabus,
    readinessScore,
    studentGaps: missing,
    curriculumGaps: gapInSyllabus
  };
}

/**
 * Extract text from PDF file
 */
async function extractTextFromPDF(file) {
  if (!file) return "";
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let fullText = "";
    
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map(item => item.str).join(" ");
      fullText += pageText + "\n";
    }
    return fullText;
  } catch (e) {
    console.error("PDF Extraction Error", e);
    return "";
  }
}

/**
 * Extract skills from text using skill database
 */
function extractSkillsFromText(text) {
  const found = new Set();
  const lowerText = text.toLowerCase();
  
  SKILL_DB.forEach(skill => {
    const regex = new RegExp(
      `\\b${skill.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`,
      'i'
    );
    if (regex.test(lowerText)) {
      found.add(skill);
    }
  });
  
  return Array.from(found);
}

/**
 * Calculate market alignment score
 */
function calculateMarketAlignment() {
  const requiredSkills = ROLE_SKILLS[currentTargetRole] || [];
  const studentSkills = currentResumeSkills;
  
  if (requiredSkills.length === 0) {
    return { score: 0, status: "bad", matches: 0, total: 0 };
  }
  
  const matchCount = requiredSkills.filter(skill => studentSkills.includes(skill)).length;
  const alignmentPercentage = Math.round((matchCount / requiredSkills.length) * 100);
  
  let status = "bad";
  if (alignmentPercentage >= 75) status = "best";
  else if (alignmentPercentage >= 50) status = "good";
  
  return {
    score: alignmentPercentage,
    status: status,
    matches: matchCount,
    total: requiredSkills.length
  };
}

/**
 * Update market alignment card display
 */
function updateMarketAlignmentCard() {
  const alignment = calculateMarketAlignment();
  const card = document.getElementById("market-align-card");
  const icon = document.getElementById("market-align-icon");
  const text = document.getElementById("dash-market-align");
  const detail = document.getElementById("market-align-detail");
  
  if (!card || !icon || !text || !detail) return;

  text.textContent = alignment.status.charAt(0).toUpperCase() + alignment.status.slice(1);
  detail.textContent = `Matches ${alignment.matches}/${alignment.total} required skills`;

  // Reset classes
  icon.className = "h-12 w-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-all";
  card.className = "glass-card rounded-xl p-5 transition-all duration-300 group animate-scale-in";
  detail.className = "text-[10px] mt-1";

  // Apply status-specific colors
  if (alignment.status === "best") {
    icon.classList.add("bg-emerald-500/10", "text-emerald-300");
    card.classList.add("border", "border-emerald-500/20", "hover:border-emerald-500/40");
    detail.classList.add("text-emerald-400");
  } else if (alignment.status === "good") {
    icon.classList.add("bg-amber-500/10", "text-amber-300");
    card.classList.add("border", "border-amber-500/20", "hover:border-amber-500/40");
    detail.classList.add("text-amber-400");
  } else {
    icon.classList.add("bg-rose-500/10", "text-rose-300");
    card.classList.add("border", "border-rose-500/20", "hover:border-rose-500/40");
    detail.classList.add("text-rose-400");
  }
}
