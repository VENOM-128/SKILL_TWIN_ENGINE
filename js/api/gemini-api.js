/* ================================
   GEMINI AI API INTEGRATION
   ================================ */

/**
 * Call Gemini API with optional web search
 */
async function callGemini(prompt, useSearch = false) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;
  
  const requestBody = {
    contents: [{
      parts: [{ text: prompt }]
    }]
  };

  if (useSearch) {
    requestBody.tools = [{
      google_search_retrieval: {
        dynamic_retrieval_config: {
          mode: "MODE_DYNAMIC",
          dynamic_threshold: 0.6
        }
      }
    }];
  }
  
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}. Check your API Key.`);
    }

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "### AI Service Unavailable\n\n" +
      "Unable to connect to the AI service (" + error.message + ").\n\n" +
      "**Simulated Response:**\n" +
      "This is a placeholder response because the API call failed. " +
      "In a production environment, check your API key and network connection.\n\n" +
      "> " + prompt.substring(0, 100) + "...";
  }
}

/**
 * Generate AI-powered career coach response
 */
function generateSkillTwinResponse(message) {
  const analysis = analyzeSkillGap(currentTargetRole);

  // Skill gap & status queries
  if (message.includes("gap") || message.includes("missing") || message.includes("need")) {
    if (analysis.missing.length === 0) {
      return `✓ Great! You already have all skills for <strong>${currentTargetRole}</strong>. Your readiness is <strong>${analysis.readinessScore}%</strong>.`;
    }
    return `Missing <strong>${analysis.missing.length}</strong> skills: <strong>${analysis.missing.slice(0, 3).join(", ")}</strong>${analysis.missing.length > 3 ? "..." : ""}. Focus on these to be job-ready.`;
  }

  // Roadmap queries
  if (message.includes("roadmap") || message.includes("plan") || message.includes("learn")) {
    if (analysis.missing.length === 0) {
      return `You're ready for <strong>${currentTargetRole}</strong>! Consider specializing in an adjacent role or learning new tools.`;
    }
    const next = analysis.missing[0];
    return `Start with <strong>${next}</strong>. 1) Learn theory (2 weeks), 2) Build a mini-project (1 week), 3) Contribute to open source. This bridges 20%+ of your gap.`;
  }

  // Market insights
  if (message.includes("market") || message.includes("job") || message.includes("trend") || message.includes("salary")) {
    return `Market snapshot: <strong>${currentTargetRole}</strong> roles are <strong>High demand</strong>. Top markets: Bangalore, Hyderabad, Delhi. Avg salary: ₹18-25 LPA. Your alignment: <strong>${analysis.readinessScore}%</strong>.`;
  }

  // Readiness & assessment
  if (message.includes("readiness") || message.includes("ready") || message.includes("assess")) {
    const status = analysis.readinessScore >= 75 ? "Ready! Target job applications." : analysis.readinessScore >= 50 ? "Almost there. 3-4 weeks of focused learning." : "Build foundations first. 2-3 months recommended.";
    return `Your readiness for <strong>${currentTargetRole}</strong>: <strong>${analysis.readinessScore}%</strong>. ${status}`;
  }

  // Skill recommendations
  if (message.includes("skill") || message.includes("recommend") || message.includes("suggest")) {
    if (analysis.missing.length > 0) {
      return `Top 3 to learn: <strong>${analysis.missing.slice(0, 3).join(", ")}</strong>. Each takes 2-4 weeks with daily practice. Priority: ${analysis.missing[0]}.`;
    }
    return `You're strong in core skills! Next: <strong>Advanced specialization</strong> (Machine Learning, DevOps, or System Design).`;
  }

  // Portfolio help
  if (message.includes("portfolio") || message.includes("project") || message.includes("build")) {
    return `Build projects using your <strong>current skills</strong> (${currentResumeSkills.slice(0, 3).join(", ")}) to strengthen your resume. Target: 2-3 end-to-end projects.`;
  }

  // Syllabus & curriculum
  if (message.includes("course") || message.includes("syllabus") || message.includes("curriculum")) {
    const covered = analysis.coveredBySyllabus.length;
    return `Your syllabus covers <strong>${covered}</strong> of <strong>${analysis.required.length}</strong> required skills. Upload your syllabus PDF to see detailed alignment.`;
  }

  // Help / greeting
  if (message.includes("help") || message.includes("hello") || message.includes("hi")) {
    return `Hi ${currentUser.fullName}! 👋 I'm your **Skill-Twin AI**. I can help with: skill gaps, roadmaps, market insights, readiness scores, and project ideas. Ask me anything about becoming a <strong>${currentTargetRole}</strong>!`;
  }

  // Default response
  return `I analyzed your profile for <strong>${currentTargetRole}</strong>. Your readiness: <strong>${analysis.readinessScore}%</strong>. Try asking about gaps, roadmaps, market, or specific skills!`;
}
