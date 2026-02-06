/* ================================
   KEYBOARD SHORTCUTS MANAGEMENT
   ================================ */

/**
 * Setup global keyboard shortcuts
 */
function setupKeyboardShortcuts() {
  document.addEventListener("keydown", (e) => {
    // Don't trigger shortcuts when typing in input/textarea
    if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
    
    // T: Toggle Theme
    if (e.key === "t" || e.key === "T") {
      e.preventDefault();
      toggleTheme();
    }
    
    // A: Toggle AI Chat
    if (e.key === "a" || e.key === "A") {
      e.preventDefault();
      toggleAIChat();
    }
    
    // E: Export Report (Students only)
    if (e.key === "e" || e.key === "E") {
      if (currentUser?.role === "STUDENT") {
        e.preventDefault();
        exportStudentReport();
      }
    }
    
    // Escape: Close modals
    if (e.key === "Escape") {
      const aiWindow = document.getElementById("ai-chat-window");
      if (aiWindow && !aiWindow.classList.contains("hidden")) {
        aiWindow.classList.add("hidden");
        aiChatOpen = false;
      }
    }
  });
}
