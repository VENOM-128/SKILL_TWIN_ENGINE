/* ================================
   AUTHENTICATION SYSTEM
   ================================ */

/**
 * Attempt login with credentials
 */
function attemptLogin(username, password) {
  const user = db.users.find(
    (u) => u.username.toLowerCase() === username.toLowerCase() && u.password === password
  );
  return user || null;
}

/**
 * Handle login form submission
 */
function handleLogin(event) {
  event.preventDefault();
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const spinner = document.getElementById("login-spinner");

  spinner.classList.remove("hidden");

  setTimeout(() => {
    const user = attemptLogin(username, password);
    spinner.classList.add("hidden");

    if (!user) {
      showToast("Invalid credentials. Please check your username or password.", "error");
      return;
    }

    currentUser = user;
    sessionStorage.setItem(
      SESSION_KEY,
      JSON.stringify({ id: user.id, username: user.username })
    );

    showToast("Signed in successfully.", "success");
    onAuthenticated();
  }, 500);
}

/**
 * Restore user session from sessionStorage
 */
function restoreSession() {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return;
    
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed.id !== "number") return;
    
    const user = db.users.find((u) => u.id === parsed.id);
    if (user) {
      currentUser = user;
      onAuthenticated(true);
    }
  } catch (e) {
    console.warn("Failed to restore session.", e);
  }
}

/**
 * Logout user and clear session
 */
function logout() {
  currentUser = null;
  sessionStorage.removeItem(SESSION_KEY);
  
  // Close AI chat
  const chatWidget = document.getElementById("ai-chat-widget");
  if (chatWidget) chatWidget.classList.add("hidden");
  const chatWindow = document.getElementById("ai-chat-window");
  if (chatWindow) chatWindow.classList.add("hidden");
  aiChatOpen = false;
  
  window.scrollTo(0, 0);
  showLogin();
}

/**
 * Callback after successful authentication
 */
function onAuthenticated(isRestored = false) {
  if (!currentUser) return;
  
  showAppShell();
  updateSidebarForUser();

  if (currentUser.role === "STUDENT") {
    renderStudentDashboard();
    switchView("dashboard");
  } else {
    logout(); // Should not happen with simplified DB
  }

  if (!isRestored) {
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
  }
  
  // Remove login view from DOM
  const loginView = document.getElementById("login-view");
  if (loginView) {
    loginView.classList.add("hidden");
    setTimeout(() => {
      if (loginView.parentNode) loginView.parentNode.removeChild(loginView);
    }, 300);
  }
}

/**
 * Show login screen
 */
function showLogin() {
  document.getElementById("login-view").classList.remove("hidden");
  document.getElementById("app-shell").classList.add("hidden");
  document.getElementById("ai-chat-widget").classList.add("hidden");
}

/**
 * Show application shell
 */
function showAppShell() {
  const loginView = document.getElementById("login-view");
  const appShell = document.getElementById("app-shell");
  const chatWidget = document.getElementById("ai-chat-widget");
  
  if (loginView) loginView.classList.add("hidden");
  if (appShell) appShell.classList.remove("hidden");
  if (chatWidget) chatWidget.classList.remove("hidden");
}
