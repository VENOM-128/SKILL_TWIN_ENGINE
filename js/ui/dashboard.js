/* ================================
   DASHBOARD RENDERING
   ================================ */

/**
 * Render student dashboard with all widgets
 */
function renderStudentDashboard() {
  if (!currentUser || currentUser.role !== "STUDENT") return;
  
  const analysis = analyzeSkillGap(currentTargetRole);
  
  // Update welcome message
  const welcomeName = document.getElementById("user-welcome-name");
  if (welcomeName) welcomeName.textContent = currentUser.fullName;

  // Animate readiness score
  const readinessEl = document.getElementById("dash-readiness-score");
  const readinessCircle = document.getElementById("dash-readiness-circle");
  if (readinessEl) animateValue(readinessEl, 0, analysis.readinessScore, 1000, "%");
  if (readinessCircle) {
    readinessCircle.style.setProperty('--progress', analysis.readinessScore);
  }

  // Update gap count
  const gapEl = document.getElementById("dash-gap-count");
  if (gapEl) gapEl.textContent = analysis.missing.length;

  // Update target role
  const roleEl = document.getElementById("dash-target-role");
  if (roleEl) roleEl.textContent = currentTargetRole;

  // Update market alignment
  updateMarketAlignmentCard();

  // Render charts
  setTimeout(() => {
    if (isVennView) {
      renderTwinVennChart();
    } else {
      renderTwinRadarChart();
    }
  }, 300);

  // Update market ticker and FOMO alert
  renderMarketTicker();
  renderFomoAlert();
}

/**
 * Render radar chart visualization
 */
function renderTwinRadarChart() {
  const ctx = document.getElementById("twin-radar-chart")?.getContext("2d");
  if (!ctx) return;
  if (twinRadarChart) twinRadarChart.destroy();

  const labels = ["Coding", "Tools", "Cloud", "Theory", "Soft Skills", "Projects"];
  
  const hasSkill = (s) => currentResumeSkills.some(rs => rs.toLowerCase().includes(s.toLowerCase()));
  
  const studentScore = [
    hasSkill("Python") || hasSkill("Java") || hasSkill("Script") ? 85 : 40,
    hasSkill("Docker") || hasSkill("Git") ? 75 : 30,
    hasSkill("AWS") || hasSkill("Cloud") ? 65 : 20,
    currentSyllabusSkills.length > 5 ? 90 : 50,
    70,
    currentResumeSkills.length * 8
  ];

  const marketScore = [90, 85, 90, 70, 85, 95];
  const syllabusScore = [70, 30, 20, 95, 40, 50];

  const isLight = document.body.classList.contains("light-mode");
  const textColor = isLight ? "#0f172a" : "#e5e7eb";

  twinRadarChart = new Chart(ctx, {
    type: "radar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "You (Student)",
          data: studentScore,
          backgroundColor: "rgba(34, 211, 238, 0.2)",
          borderColor: "#22d3ee",
          pointBackgroundColor: "#22d3ee",
        },
        {
          label: "Market Demand",
          data: marketScore,
          backgroundColor: "rgba(168, 85, 247, 0.2)",
          borderColor: "#a855f7",
          pointBackgroundColor: "#a855f7",
        },
        {
          label: "Syllabus Coverage",
          data: syllabusScore,
          backgroundColor: "rgba(148, 163, 184, 0.2)",
          borderColor: "#94a3b8",
          pointBackgroundColor: "#94a3b8",
          borderDash: [5, 5]
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false }
      },
      scales: {
        r: {
          angleLines: { color: "rgba(148, 163, 184, 0.1)" },
          grid: { color: "rgba(148, 163, 184, 0.1)" },
          pointLabels: {
            color: textColor,
            font: { size: 11 }
          },
          ticks: {
            display: false,
            backdropColor: "transparent"
          }
        }
      }
    }
  });
}

/**
 * Render Venn diagram visualization
 */
function renderTwinVennChart() {
  const ctx = document.getElementById("twin-radar-chart")?.getContext("2d");
  if (!ctx) return;
  if (twinRadarChart) twinRadarChart.destroy();

  const student = currentResumeSkills;
  const market = ROLE_SKILLS[currentTargetRole] || [];
  const syllabus = currentSyllabusSkills;

  const s_m = arrayIntersection(student, market);
  const s_a = arrayIntersection(student, syllabus);
  const m_a = arrayIntersection(market, syllabus);
  const s_m_a = arrayIntersection(s_m, syllabus);

  const data = [
    { sets: ['You'], value: student.length || 1 },
    { sets: ['Market'], value: market.length || 1 },
    { sets: ['Syllabus'], value: syllabus.length || 1 },
    { sets: ['You', 'Market'], value: s_m.length },
    { sets: ['You', 'Syllabus'], value: s_a.length },
    { sets: ['Market', 'Syllabus'], value: m_a.length },
    { sets: ['You', 'Market', 'Syllabus'], value: s_m_a.length }
  ];

  twinRadarChart = new Chart(ctx, {
    type: 'venn',
    data: {
      labels: ['You', 'Market', 'Syllabus'],
      datasets: [{
        label: 'Skill Overlap',
        data: data,
        backgroundColor: [
          'rgba(34, 211, 238, 0.5)',
          'rgba(168, 85, 247, 0.5)',
          'rgba(148, 163, 184, 0.5)'
        ]
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: true, position: 'bottom', labels: { color: '#94a3b8' } },
        tooltip: {
          callbacks: {
            title: (context) => context[0].raw.sets.join(' & '),
            label: (context) => `Overlap: ${context.raw.value} Skills`
          }
        }
      }
    }
  });
}
