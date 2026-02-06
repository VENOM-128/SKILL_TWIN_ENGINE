/* ================================
   HELPER UTILITIES
   ================================ */

/**
 * Generate random integer between min and max
 */
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Animate value changes with easing
 */
function animateValue(element, start, end, duration, suffix = "") {
  if (!element) return;
  const startTime = performance.now();
  
  const animate = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeOutCubic = 1 - Math.pow(1 - progress, 3);
    const current = start + (end - start) * easeOutCubic;
    
    element.textContent = current.toFixed(1) + suffix;
    
    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      element.textContent = end.toFixed(1) + suffix;
    }
  };
  
  requestAnimationFrame(animate);
}

/**
 * Get intersection of two arrays
 */
function arrayIntersection(arr1, arr2) {
  return arr1.filter(x => arr2.some(y => y.toLowerCase() === x.toLowerCase()));
}

/**
 * Format number as currency
 */
function formatCurrency(value, currency = "₹") {
  return `${currency}${value.toLocaleString()}`;
}

/**
 * Format date to readable format
 */
function formatDate(date) {
  return new Date(date).toISOString().slice(0, 10);
}

/**
 * Debounce function for optimized event handling
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Check if date is today
 */
function isToday(date) {
  const today = new Date();
  const checkDate = new Date(date);
  return checkDate.getDate() === today.getDate() &&
         checkDate.getMonth() === today.getMonth() &&
         checkDate.getFullYear() === today.getFullYear();
}

/**
 * Get ordinal number suffix (1st, 2nd, 3rd, etc.)
 */
function getOrdinalSuffix(num) {
  const j = num % 10;
  const k = num % 100;
  if (j === 1 && k !== 11) return num + "st";
  if (j === 2 && k !== 12) return num + "nd";
  if (j === 3 && k !== 13) return num + "rd";
  return num + "th";
}
