/* ================================
   DATABASE MANAGEMENT SYSTEM
   ================================ */

/**
 * Load database from localStorage or initialize with seed data
 */
function loadDB() {
  try {
    const raw = localStorage.getItem(DB_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && Array.isArray(parsed.users) && Array.isArray(parsed.notifications)) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn("Failed to parse DB, resetting.", e);
  }
  const seeded = seedDatabase();
  saveDB(seeded);
  return seeded;
}

/**
 * Save database to localStorage
 */
function saveDB(db) {
  localStorage.setItem(DB_KEY, JSON.stringify(db));
}

/**
 * Seed database with initial data
 */
function seedDatabase() {
  const users = [];
  const notifications = [];
  const marketData = [];

  // Create a single student user for the demo
  users.push({
    id: 1,
    username: "student",
    password: "password",
    role: "STUDENT",
    fullName: "SUBRAT PANIGRAHI",
    email: "24cseaiml128.subratpanigrahi@giet.edu",
  });

  // Seed notifications
  const now = new Date();
  const today = now.toISOString().slice(0, 10);

  notifications.push({
    id: Date.now(),
    title: "Welcome to the Skill-Twin Engine!",
    msg: "Upload your resume and syllabus in the 'Twin Analyzer' to get started.",
    date: today,
    author: "System",
  });

  marketData.push({
    id: Date.now(),
    role: "Full Stack Developer",
    trend: "Up",
    skills: ["React", "Node.js", "MongoDB", "Docker", "AWS"]
  });

  return { users, notifications, marketData, records: [] };
}

/**
 * Add user to database
 */
function addUser(user) {
  db.users.push(user);
  saveDB(db);
  return user;
}

/**
 * Add notification to database
 */
function addNotification(notification) {
  db.notifications.push({
    id: Date.now(),
    ...notification,
    date: formatDate(new Date())
  });
  saveDB(db);
  updateNotificationBadge();
}

/**
 * Get user by ID
 */
function getUserById(id) {
  return db.users.find(u => u.id === id);
}

/**
 * Update user profile
 */
function updateUserProfile(userId, updates) {
  const user = db.users.find(u => u.id === userId);
  if (user) {
    Object.assign(user, updates);
    saveDB(db);
    return user;
  }
  return null;
}
