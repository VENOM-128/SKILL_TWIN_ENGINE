/* ================================
   AI CHAT ASSISTANT
   ================================ */

/**
 * Toggle AI chat window
 */
function toggleAIChat() {
  aiChatOpen = !aiChatOpen;
  const widget = document.getElementById("ai-chat-widget");
  const window = document.getElementById("ai-chat-window");
  
  if (aiChatOpen) {
    widget.classList.remove("hidden");
    window.classList.remove("hidden");
  } else {
    window.classList.add("hidden");
  }
}

/**
 * Send message to AI assistant
 */
async function sendAIMessage(message) {
  if (!currentUser) return;
  
  const messagesContainer = document.getElementById("ai-chat-messages");
  
  // Add user message
  const userMsg = document.createElement("div");
  userMsg.className = "flex items-start gap-2 justify-end";
  userMsg.innerHTML = `
    <div class="bg-emerald-500/20 rounded-lg px-2.5 py-1.5 max-w-[80%]">
      <p class="text-xs text-slate-100">${message}</p>
    </div>
    <div class="h-6 w-6 rounded-lg bg-emerald-500/20 flex items-center justify-center shrink-0">
      <i class="fa-solid fa-user text-[10px] text-emerald-300"></i>
    </div>
  `;
  messagesContainer.appendChild(userMsg);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;

  // Add loading message
  const botMsg = document.createElement("div");
  botMsg.className = "flex items-start gap-2";
  botMsg.innerHTML = `
    <div class="h-6 w-6 rounded-lg bg-violet-500/20 flex items-center justify-center shrink-0">
      <i class="fa-solid fa-robot text-[10px] text-violet-300"></i>
    </div>
    <div class="bg-slate-900/60 rounded-lg px-2.5 py-1.5">
      <p class="text-xs text-slate-300">Analyzing...</p>
    </div>
  `;
  messagesContainer.appendChild(botMsg);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;

  // Get response
  const response = generateSkillTwinResponse(message.toLowerCase());
  
  // Update bot message with response
  botMsg.innerHTML = `
    <div class="h-6 w-6 rounded-lg bg-violet-500/20 flex items-center justify-center shrink-0">
      <i class="fa-solid fa-robot text-[10px] text-violet-300"></i>
    </div>
    <div class="bg-slate-900/60 rounded-lg px-2.5 py-1.5 prose prose-invert prose-sm text-xs">
      <p>${response}</p>
    </div>
  `;
  
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

/**
 * Initialize AI chat event listeners
 */
function setupAIChatListeners() {
  const toggleBtn = document.getElementById("ai-chat-toggle");
  const chatButton = document.getElementById("ai-chat-button");
  const closeBtn = document.getElementById("ai-chat-close");
  const sendBtn = document.getElementById("ai-chat-send");
  const input = document.getElementById("ai-chat-input");
  
  if (toggleBtn) toggleBtn.addEventListener("click", toggleAIChat);
  if (chatButton) chatButton.addEventListener("click", toggleAIChat);
  if (closeBtn) closeBtn.addEventListener("click", () => {
    document.getElementById("ai-chat-window").classList.add("hidden");
    aiChatOpen = false;
  });
  
  if (sendBtn) sendBtn.addEventListener("click", () => {
    if (input && input.value.trim()) {
      sendAIMessage(input.value.trim());
      input.value = "";
    }
  });
  
  if (input) {
    input.addEventListener("keypress", (e) => {
      if (e.key === "Enter" && e.target.value.trim()) {
        sendAIMessage(e.target.value.trim());
        e.target.value = "";
      }
    });
  }
}
