/* ================================
   MARKET INSIGHTS & DATA ENGINE
   ================================ */

let marketTickerInterval = null;

/**
 * Update market pulse ticker with rotating data
 */
function renderMarketTicker() {
  const ticker = document.getElementById("market-ticker");
  if (!ticker) return;
  
  const roles = ["Gen AI Engineer", "Quantum Researcher", "Full Stack Dev", "Cybersecurity Analyst", "Blockchain Dev", "ML Ops"];
  
  updateTickerContent(ticker, roles);

  if (marketTickerInterval) clearInterval(marketTickerInterval);
  marketTickerInterval = setInterval(() => {
    updateTickerContent(ticker, roles);
  }, 5000);
}

/**
 * Update ticker content with animation
 */
function updateTickerContent(container, roles) {
  const getRandomTrend = () => {
    const val = Math.floor(Math.random() * 30) + 5;
    return `+${val}% Demand`;
  };

  container.style.opacity = '0';
  
  setTimeout(() => {
    container.innerHTML = roles.map((r, i) => `
      <div class="flex justify-between items-center text-[10px] animate-slide-in-right" style="animation-delay: ${i * 0.1}s">
        <span>${r}</span>
        <span class="text-emerald-400 font-mono">${getRandomTrend()}</span>
      </div>
    `).join("");
    container.style.opacity = '1';
  }, 300);
}

/**
 * Render market feed table with job data
 */
function renderMarketFeedTable(data) {
  const feedTable = document.getElementById("market-feed-table");
  if (!feedTable) return;
  
  feedTable.innerHTML = data.map(f => `
    <tr class="hover:bg-slate-800/30 transition">
      <td class="py-3 pl-2 font-medium text-slate-200">${f.role}</td>
      <td class="py-3 text-slate-400">${f.stack}</td>
      <td class="py-3"><span class="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] border border-emerald-500/20">${f.demand}</span></td>
      <td class="py-3 text-slate-300 font-mono">${f.salary}</td>
    </tr>
  `).join("");
}

/**
 * Handle market search/filter
 */
async function handleMarketSearch() {
  const input = document.getElementById("market-search-input");
  const clearBtn = document.getElementById("btn-market-clear");
  const query = input.value.trim();
  
  if (!query) {
    renderMarketFeedTable(DEFAULT_MARKET_FEEDS);
    if (clearBtn) clearBtn.classList.add("hidden");
    return;
  }

  const lowerQ = query.toLowerCase();
  const localResults = DEFAULT_MARKET_FEEDS.filter(f =>
    f.role.toLowerCase().includes(lowerQ) ||
    f.stack.toLowerCase().includes(lowerQ)
  );

  if (clearBtn) clearBtn.classList.remove("hidden");

  if (localResults.length > 0) {
    renderMarketFeedTable(localResults);
  } else {
    // AI Search (Simulated Web Search)
    const feedTable = document.getElementById("market-feed-table");
    feedTable.innerHTML = `<tr><td colspan="4" class="text-center py-8 text-slate-400"><div class="flex flex-col items-center gap-2"><i class="fa-solid fa-circle-notch animate-spin text-cyan-400 text-xl"></i><span>Searching global market data for "${query}"...</span></div></td></tr>`;
    
    const prompt = `Using Google Search, find real-time job market data for "${query}" in India. Return ONLY a valid JSON array of 5 entries. Keys: "role", "stack", "demand" (Low/Medium/High/Very High), "salary" (e.g. "₹15 LPA"). No markdown.`;
    
    try {
      let res = await callGemini(prompt, true);
      res = res.replace(/```json/g, '').replace(/```/g, '').trim();
      const aiData = JSON.parse(res);
      if (Array.isArray(aiData)) {
        renderMarketFeedTable(aiData);
      } else {
        throw new Error("Invalid Data");
      }
    } catch (e) {
      feedTable.innerHTML = `<tr><td colspan="4" class="text-center py-4 text-rose-400">No data found for "${query}".</td></tr>`;
    }
  }
}

/**
 * Render scarcity insights (supply vs demand analysis)
 */
function renderScarcityInsights() {
  const satList = document.getElementById("saturated-list");
  const oppList = document.getElementById("opportunity-list");
  
  if (!satList || !oppList) return;

  const renderItem = (item, isOpp) => `
    <div class="p-3 rounded-lg bg-slate-900/40 border ${isOpp ? 'border-emerald-500/20 hover:border-emerald-500/40' : 'border-rose-500/20 hover:border-rose-500/40'} transition flex items-center justify-between group">
      <div>
        <p class="text-xs font-bold text-slate-200 group-hover:text-white transition">${item.skill}</p>
        <p class="text-[10px] text-slate-500">Supply: ${item.supply} • Demand: ${item.demand}</p>
      </div>
      <div class="text-right">
        <p class="text-xs font-mono ${isOpp ? 'text-emerald-400' : 'text-rose-400'}">${item.salary}</p>
        <p class="text-[10px] text-slate-500">Ratio: ${(item.demand/item.supply).toFixed(1)}x</p>
      </div>
    </div>
  `;

  satList.innerHTML = SCARCITY_DATA.filter(d => d.type === "saturated").map(d => renderItem(d, false)).join("");
  oppList.innerHTML = SCARCITY_DATA.filter(d => d.type === "opportunity").map(d => renderItem(d, true)).join("");
}

/**
 * Render FOMO alert with scarcity data
 */
function renderFomoAlert() {
  const alertEl = document.getElementById("fomo-alert");
  const msgEl = document.getElementById("fomo-message");
  
  if (!alertEl || !msgEl) return;

  const opp = SCARCITY_DATA.find(d => d.type === "opportunity");
  const sat = SCARCITY_DATA.find(d => d.type === "saturated");

  if (opp && sat) {
    msgEl.innerHTML = `
      <span class="text-rose-300 font-semibold">${sat.supply} students</span> in your area are learning ${sat.skill}.
      Only <span class="text-emerald-300 font-semibold">${opp.supply}</span> are learning <span class="text-slate-100 font-bold border-b border-amber-500/50">${opp.skill}</span>.
      There are <span class="text-amber-300 font-bold">${opp.demand} open jobs</span> for it right now.
    `;
    alertEl.classList.remove("hidden");
    
    alertEl.onclick = () => {
      switchView("market-insights");
      renderMarketInsights();
    };
  }
}
