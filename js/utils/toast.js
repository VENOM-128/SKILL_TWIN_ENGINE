/* ================================
   TOAST NOTIFICATION SYSTEM
   ================================ */

/**
 * Show toast notification
 */
function showToast(message, type = "error") {
  const toast = document.getElementById("toast");
  const msg = document.getElementById("toast-message");
  const icon = document.getElementById("toast-icon");
  
  msg.textContent = message;
  
  if (type === "success") {
    icon.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
    icon.className = "text-emerald-400";
  } else if (type === "info") {
    icon.innerHTML = '<i class="fa-solid fa-circle-info"></i>';
    icon.className = "text-sky-400";
  } else {
    icon.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i>';
    icon.className = "text-rose-400";
  }
  
  toast.classList.remove("hidden", "opacity-0");
  toast.classList.add("animate-fade-in");
  
  setTimeout(() => {
    toast.classList.add("opacity-0");
    setTimeout(() => {
      toast.classList.add("hidden");
      toast.classList.remove("opacity-0");
    }, 200);
  }, 2600);
}

/**
 * Show loading toast
 */
function showLoadingToast(message) {
  const toast = document.getElementById("toast");
  const msg = document.getElementById("toast-message");
  const icon = document.getElementById("toast-icon");
  
  msg.textContent = message;
  icon.innerHTML = '<i class="fa-solid fa-spinner animate-spin-soft"></i>';
  icon.className = "text-cyan-400";
  
  toast.classList.remove("hidden");
  toast.classList.add("animate-fade-in");
  
  return () => {
    toast.classList.remove("animate-fade-in");
    toast.classList.add("hidden");
  };
}
