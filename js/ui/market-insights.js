/* ================================
   MARKET INSIGHTS VIEW RENDERING
   ================================ */

/**
 * Render complete market insights dashboard
 */
function renderMarketInsights() {
  // Market Trend Chart
  const ctx = document.getElementById("market-trend-chart")?.getContext("2d");
  if (ctx) {
    if (marketTrendChart) marketTrendChart.destroy();
    
    marketTrendChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
          {
            label: 'Gen AI / LLM',
            data: [65, 78, 90, 115, 140, 180],
            borderColor: '#a855f7',
            backgroundColor: 'rgba(168, 85, 247, 0.1)',
            tension: 0.4,
            fill: true
          },
          {
            label: 'Quantum Computing',
            data: [20, 22, 25, 28, 35, 45],
            borderColor: '#22d3ee',
            backgroundColor: 'rgba(34, 211, 238, 0.1)',
            tension: 0.4,
            fill: true
          },
          {
            label: 'Full Stack',
            data: [80, 82, 81, 85, 86, 88],
            borderColor: '#10b981',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            tension: 0.4,
            fill: true
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { labels: { color: '#94a3b8' } }
        },
        scales: {
          y: { grid: { color: 'rgba(148, 163, 184, 0.1)' }, ticks: { color: '#94a3b8' } },
          x: { grid: { display: false }, ticks: { color: '#94a3b8' } }
        }
      }
    });
  }

  // Top Paying Skills
  const skillsList = document.getElementById("top-paying-skills-list");
  if (skillsList) {
    const skills = [
      { name: "Rust", salary: "₹30 LPA", trend: "+12%" },
      { name: "Solidity (Web3)", salary: "₹28 LPA", trend: "+8%" },
      { name: "PyTorch (AI)", salary: "₹25 LPA", trend: "+25%" },
      { name: "Kubernetes", salary: "₹22 LPA", trend: "+10%" }
    ];
    skillsList.innerHTML = skills.map(s => `
      <div class="flex items-center justify-between p-3 rounded-lg bg-slate-900/40 border border-slate-800 hover:border-slate-700 transition">
        <div>
          <p class="text-xs font-bold text-slate-200">${s.name}</p>
          <p class="text-[10px] text-slate-500">Avg Base: ${s.salary}</p>
        </div>
        <span class="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded">${s.trend}</span>
      </div>
    `).join("");
  }

  // Market Feed Table
  renderMarketFeedTable(DEFAULT_MARKET_FEEDS);

  // Scarcity Insights
  renderScarcityInsights();
}
