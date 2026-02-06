/* ================================
   NOTIFICATIONS MANAGEMENT
   ================================ */

/**
 * Update notification badge count
 */
function updateNotificationBadge() {
  const badge = document.getElementById("notification-badge");
  if (!badge) return;
  
  const count = db.notifications.length;
  if (count > 0) {
    badge.textContent = count > 9 ? "9+" : count;
    badge.classList.remove("hidden");
  } else {
    badge.classList.add("hidden");
  }
}

/**
 * Render notifications list
 */
function renderNotificationsList(elementId, limit = null) {
  const container = document.getElementById(elementId);
  if (!container) return;
  
  container.innerHTML = "";

  if (!db.notifications.length) {
    container.innerHTML = '<p class="text-sm text-slate-400 text-center py-4">No announcements yet.</p>';
    return;
  }
  
  const sorted = [...db.notifications].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
  const toShow = limit ? sorted.slice(0, limit) : sorted;

  toShow.forEach((n) => {
    const div = document.createElement("div");
    div.className = "rounded-lg bg-slate-900/60 border border-slate-800 px-4 py-3 flex flex-col gap-2 hover:border-emerald-500/30 transition";
    div.innerHTML = `
      <div class="flex items-center justify-between gap-2">
        <p class="text-sm font-semibold text-slate-100">${n.title}</p>
        <span class="text-xs text-slate-400 font-mono">${n.date}</span>
      </div>
      <p class="text-xs text-slate-300 leading-relaxed">${n.msg}</p>
      <p class="text-xs text-slate-500 italic">— ${n.author}</p>
    `;
    container.appendChild(div);
  });
}

/**
 * Render notifications in standalone view
 */
function renderNotificationsStandalone() {
  renderNotificationsList("notifications-view-list");
}
