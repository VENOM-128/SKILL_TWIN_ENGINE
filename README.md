# Skill-Twin Engine - Project Structure Documentation

## 📋 Overview

The Skill-Twin Engine is an AI-powered gap analyzer that bridges the gap between academic curriculum and industry skill requirements. This document explains the extracted and organized code structure.

---

## 📁 Directory Structure

```
Skill-Twin Engine/
├── skillTwin.html                 # Main HTML file (unchanged)
├── css/                       # Stylesheet organization
│   ├── core-styles.css        # Core layout & glass-morphism effects
│   ├── theme-colors.css       # Color variables & theme configuration
│   ├── animations.css         # Keyframe animations
│   ├── light-mode.css         # Light mode color overrides
│   └── tailwind-config.js     # Tailwind CSS configuration
│
├── js/                        # JavaScript organization
│   ├── core/                  # Core application logic
│   │   ├── auth.js            # Authentication & session management
│   │   ├── database.js        # Data persistence & storage
│   │   └── router.js          # View navigation & routing
│   │
│   ├── ui/                    # UI rendering & view components
│   │   ├── dashboard.js       # Main dashboard with charts
│   │   ├── profile.js         # Student profile page
│   │   ├── analyzer.js        # Resume/Syllabus analysis
│   │   ├── roadmap.js         # Learning roadmap generation
│   │   ├── simulator.js       # Role simulation & comparison
│   │   ├── notifications.js   # Notification management
│   │   ├── market-insights.js # Market data visualization
│   │   └── theme.js           # Theme & global event setup
│   │
│   ├── features/              # Feature-specific logic
│   │   ├── skill-analyzer.js  # Skill gap analysis engine
│   │   ├── market-insights.js # Market data & FOMO engine
│   │   └── ai-chat.js         # AI chat assistant
│   │
│   ├── api/                   # External API integrations
│   │   ├── gemini-api.js      # Google Gemini API wrapper
│   │   └── github-api.js      # GitHub API integration
│   │
│   └── utils/                 # Utility & helper functions
│       ├── constants.js       # Global constants
│       ├── helpers.js         # General utilities
│       ├── toast.js           # Toast notification system
│       └── keyboard-shortcuts.js # Keyboard shortcut handler
│
├── config/                    # Configuration data
│   ├── skill-database.json    # List of recognized skills
│   ├── role-skills-mapping.json # Job role skill requirements
│   ├── market-data.json       # Real-time job market data
│   └── scarcity-data.json     # Supply vs demand analysis
│
└── docs/                      # Documentation
    └── README.md              # This file
```

---

## 🎨 CSS Architecture

### Core Styling System
- **theme-colors.css**: Root CSS variables, dark/light mode color schemes
- **core-styles.css**: Layout, glass-morphism cards, transitions
- **animations.css**: 8 custom animations (float, fade-in, slide, scale, etc.)
- **light-mode.css**: Complete light theme color overrides
- **tailwind-config.js**: Tailwind CSS extensions for custom colors

### Key CSS Classes
- `.glass-card` - Frosted glass effect with backdrop blur
- `.animate-fade-in` - Entrance animations
- `.scrollbar-thin` - Custom scrollbar styling
- `.timeline-line` - Vertical timeline indicator

---

## 🚀 JavaScript Architecture

### Core Module (`js/core/`)
Handles fundamental app operations:

#### auth.js
- `attemptLogin()` - Validate credentials
- `handleLogin(event)` - Form submission handler
- `restoreSession()` - Persistent login
- `logout()` - Clear session
- `onAuthenticated()` - Post-login setup
- `showLogin()` / `showAppShell()` - UI toggling

#### database.js
- `loadDB()` / `saveDB()` - LocalStorage persistence
- `seedDatabase()` - Initial data seeding
- `addUser()` / `addNotification()` - Data operations
- `getUserById()` - Query helpers
- `updateUserProfile()` - User updates

#### router.js
- `switchView()` - Navigate between pages
- `updateBreadcrumbs()` - Navigation title
- `updateSidebarForUser()` - Role-based menu
- `toggleSidebar()` - Mobile navigation

---

### UI Module (`js/ui/`)
Renders and manages visual components:

#### dashboard.js
- `renderStudentDashboard()` - Main dashboard setup
- `renderTwinRadarChart()` - 6-axis radar visualization
- `renderTwinVennChart()` - Skill overlap diagram
- Used Chart.js for interactive visualizations

#### profile.js
- `renderStudentProfilePage()` - Display user info
- Shows extracted resume & syllabus skills

#### analyzer.js
- `handleProcessResume()` - Parse resume/GitHub
- `handleProcessSyllabus()` - Parse syllabus
- `handleRunAnalysis()` - Trigger gap analysis

#### roadmap.js
- `generateRoadmapUI()` - Week-by-week learning plan
- Links to YouTube tutorials & GitHub projects
- Integration with Coursera/Udemy recommendations

#### simulator.js
- `renderSimulator()` - Role requirement display
- Shows missing skills for selected role
- Estimates time & effort needed

#### notifications.js
- `updateNotificationBadge()` - Notification count
- `renderNotificationsList()` - List view
- `renderNotificationsStandalone()` - Full page view

#### market-insights.js
- `renderMarketInsights()` - Complete market dashboard
- Chart.js line graph of demand trends
- Top paying skills list
- Job market feed table

#### theme.js
- `initTheme()` - Load theme preference
- `toggleTheme()` - Dark/light mode switch
- `initTilt()` - 3D card effects
- `setupEventListeners()` - Global event wiring
- Bootstrap function & DOMContentLoaded

---

### Features Module (`js/features/`)
Domain-specific business logic:

#### skill-analyzer.js
- `analyzeSkillGap()` - Compare student vs role requirements
- `extractTextFromPDF()` - PDF parsing with PDF.js
- `extractSkillsFromText()` - Regex-based skill detection
- `calculateMarketAlignment()` - Score calculation
- `updateMarketAlignmentCard()` - UI update

#### market-insights.js
- `renderMarketTicker()` - Live market trend ticker
- `updateTickerContent()` - Animated ticker update
- `renderMarketFeedTable()` - Job posting table
- `handleMarketSearch()` - Filter market data
- `renderScarcityInsights()` - Supply vs demand analysis
- `renderFomoAlert()` - Scarcity notifications

#### ai-chat.js
- `toggleAIChat()` - Chat window visibility
- `sendAIMessage()` - Message handling
- `setupAIChatListeners()` - Event binding

---

### API Module (`js/api/`)
External service integrations:

#### gemini-api.js
- `callGemini()` - Google Gemini API wrapper
- `generateSkillTwinResponse()` - AI career coach responses
- Context-aware answers (gaps, roadmaps, market, readiness)

#### github-api.js
- `fetchGitHubProfile()` - User profile extraction
- `fetchGitHubRepo()` - Repository analysis
- `analyzeGitHubURL()` - Smart URL routing

---

### Utils Module (`js/utils/`)
Shared utilities & helpers:

#### constants.js
- `DB_KEY`, `SESSION_KEY` - Storage keys
- `GEMINI_API_KEY` - API credential
- `VIEW_NAMES` - Navigation labels
- `TOAST_TYPES`, `COLORS` - Enums

#### helpers.js
- `randomInt()` - Random number generation
- `animateValue()` - Number counter animations
- `arrayIntersection()` - Set operations
- `formatCurrency()`, `formatDate()` - Formatters
- `debounce()` - Event optimization

#### toast.js
- `showToast()` - Notification display
- `showLoadingToast()` - Loading state

#### keyboard-shortcuts.js
- `setupKeyboardShortcuts()` - Global hotkeys
- T: Theme toggle, A: AI Chat, E: Export, Esc: Close

---

## ⚙️ Configuration Files

### skill-database.json
List of 50+ recognized technical skills extracted from resumes/syllabus:
- Languages: Python, Java, C++, JavaScript, Go, Rust
- Libraries: React, Node.js, Django, Flask
- Tools: Docker, Kubernetes, Git
- Services: AWS, Azure, GCP

### role-skills-mapping.json
10 job roles with required skill sets:
- Full Stack Developer: 7 skills
- Data Scientist: 7 skills
- AI Engineer: 7 skills
- DevOps, Cybersecurity, Cloud, Blockchain, Prompt Engineer, Quantum, AR/VR

### market-data.json
17 high-demand job roles with:
- Job title
- Tech stack
- Demand level
- Salary range

### scarcity-data.json
5 skills analyzing local supply vs demand:
- Saturated: React.js, Python (Basic)
- Opportunity: Rust, COBOL, AI Ethics

---

## 🔄 Data Flow

```
User Login
    ↓
Authenticate (auth.js)
    ↓
Load Dashboard (dashboard.js)
    ↓
Upload Resume/Syllabus
    ↓
Extract Skills (skill-analyzer.js)
    ↓
Analyze Gap (analyzeSkillGap)
    ↓
Generate Roadmap (roadmap.js)
    ↓
View Market Insights (market-insights.js)
    ↓
Chat with AI (ai-chat.js)
```

---

## 🎯 Key Features

### 1. Twin Visualization
Radar chart comparing:
- Student preparedness
- Market demand
- Syllabus coverage

### 2. Skill Gap Analysis
- PDF resume parsing
- GitHub profile integration
- Syllabus extraction
- Skill database matching

### 3. AI Coach
- Context-aware responses
- Gap recommendations
- Learning timeline
- Market insights

### 4. Market Intelligence
- Real-time job trends
- Salary information
- Supply vs demand analysis
- FOMO alert system

### 5. Learning Roadmap
- Week-by-week plan
- YouTube tutorials
- GitHub projects
- Course recommendations

### 6. Role Simulator
- 10 job role templates
- Missing skills display
- Time/effort estimates
- Transition cost analysis

---

## 🔌 External Dependencies

### CDN Libraries
- **Tailwind CSS** - Utility CSS framework
- **Font Awesome 6** - Icon library
- **Chart.js 3.9** - Data visualization
- **Chart.js Venn Plugin** - Venn diagrams
- **Vanilla Tilt** - 3D card effects
- **Marked.js** - Markdown parsing
- **PDF.js 3.4** - PDF text extraction
- **Google Fonts (Outfit)** - Typography

### APIs
- **Google Gemini AI** - AI Coach responses
- **GitHub REST API** - Profile/repo analysis
- **Google Search** - Market data augmentation (via Gemini)

---

## 📊 State Management

### Global Variables
```javascript
let db = loadDB();
let currentUser = null;
let twinRadarChart = null;
let marketTrendChart = null;
let isDarkMode = true;
let aiChatOpen = false;
let isVennView = false;
let currentSyllabusSkills = [];
let currentResumeSkills = [];
let currentTargetRole = "Full Stack Developer";
```

---

## 🔐 Security Notes

⚠️ **Demo purposes only**:
- Credentials stored in localStorage
- API keys exposed (should use backend proxy)
- No server-side validation
- Mock data for testing

**Production improvements needed**:
- Server-side authentication
- Password hashing
- Secure API key management
- Input sanitization
- HTTPS enforcement

---

## 🚀 Getting Started

1. **Open skillTwin.html** in a modern browser
2. **Login** with demo credentials:
   - Username: `student`
   - Password: `password`
3. **Upload files** in Twin Analyzer
4. **Generate roadmap** with AI
5. **Explore** market insights & roles

---

## 📝 Configuration

### Adding New Skills
Edit `config/skill-database.json`:
```json
{
  "skillDatabase": [
    "NewSkill",
    ...existing skills...
  ]
}
```

### Adding New Role
Edit `config/role-skills-mapping.json`:
```json
{
  "newRole": ["skill1", "skill2", ...]
}
```

### Theme Colors
Edit CSS variables in `css/theme-colors.css`:
```css
--color-primary-cyan: #22d3ee;
```

---

## 🐛 Debugging

### Browser DevTools
- Open Chrome DevTools (F12)
- View console for errors
- Check Network tab for API calls
- Use Elements tab to inspect DOM

### localStorage
```javascript
// View database
console.log(JSON.parse(localStorage.getItem("skill_twin_db_v1")))

// Clear data
localStorage.clear()
```

---

## 📚 Further Documentation

- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Chart.js Docs](https://www.chartjs.org/docs/latest/)
- [PDF.js Docs](https://mozilla.github.io/pdf.js/)
- [GitHub API Docs](https://docs.github.com/en/rest)
- [Google Gemini API](https://ai.google.dev/)

---

## 📄 License

Educational project - Skill-Twin Engine (GDG)

---

**Last Updated**: February 2026 | **Version**: 1.0
