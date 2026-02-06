/* ================================
   GITHUB API INTEGRATION
   ================================ */

/**
 * Fetch GitHub user profile
 */
async function fetchGitHubProfile(profileUrl) {
  try {
    const u = new URL(profileUrl);
    const host = u.hostname.toLowerCase();
    
    if (!host.includes('github.com')) {
      throw new Error('Not a GitHub URL');
    }
    
    const parts = u.pathname.replace(/^\//, '').split('/').filter(Boolean);
    if (parts.length < 1) throw new Error('Invalid GitHub URL');
    
    const username = parts[0];
    const headers = { 'Accept': 'application/vnd.github.v3+json' };

    // Fetch user data
    const userResp = await fetch(`https://api.github.com/users/${username}`, { headers });
    if (!userResp.ok) throw new Error('GitHub user not found');
    const user = await userResp.json();

    // Fetch repositories
    const reposResp = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=100&type=owner&sort=pushed`,
      { headers }
    );
    const repos = reposResp.ok ? await reposResp.json() : [];

    // Build profile summary
    let summary = `GitHub profile for ${user.login}`;
    if (user.name) summary += ` - ${user.name}`;
    if (user.bio) summary += `. Bio: ${user.bio}`;
    if (user.location) summary += `. Location: ${user.location}`;

    // Add repositories info
    if (Array.isArray(repos) && repos.length > 0) {
      summary += `. Repositories (${repos.length}): `;
      const repoParts = repos.map(r => {
        const desc = r.description ? `: ${r.description}` : '';
        const lang = r.language ? ` [${r.language}]` : '';
        return `${r.name}${desc}${lang}`;
      });
      summary += repoParts.join('; ');
    }

    // Extract languages
    const languages = {};
    if (Array.isArray(repos)) {
      repos.forEach(r => {
        if (r.language) languages[r.language] = (languages[r.language] || 0) + 1;
      });
    }
    const topLangs = Object.entries(languages)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(e => e[0]);
    
    if (topLangs.length) summary += `. Languages: ${topLangs.join(', ')}`;

    return summary;
  } catch (e) {
    console.warn('GitHub fetch failed', e);
    throw e;
  }
}

/**
 * Fetch GitHub repository details
 */
async function fetchGitHubRepo(repoUrl) {
  try {
    const u = new URL(repoUrl);
    const host = u.hostname.toLowerCase();
    
    if (!host.includes('github.com')) {
      throw new Error('Not a GitHub URL');
    }
    
    const parts = u.pathname.replace(/^\//, '').split('/').filter(Boolean);
    if (parts.length < 2) throw new Error('Invalid GitHub repo URL');
    
    const owner = parts[0];
    const repo = parts[1].replace(/\.git$/i, '');
    const headers = { 'Accept': 'application/vnd.github.v3+json' };

    // Fetch repository info
    const repoResp = await fetch(`https://api.github.com/repos/${owner}/${repo}`, { headers });
    if (!repoResp.ok) throw new Error('GitHub repo not found');
    const repoInfo = await repoResp.json();

    // Fetch README
    let readmeText = '';
    const readmeResp = await fetch(`https://api.github.com/repos/${owner}/${repo}/readme`, { headers });
    if (readmeResp.ok) {
      const readmeJson = await readmeResp.json();
      if (readmeJson && readmeJson.content) {
        try {
          readmeText = atob(readmeJson.content.replace(/\n/g, ''));
        } catch (e) {
          readmeText = readmeJson.content || '';
        }
      }
    }

    // Fetch languages
    const langResp = await fetch(`https://api.github.com/repos/${owner}/${repo}/languages`, { headers });
    const languages = langResp.ok ? await langResp.json() : {};
    const topLangs = Object.keys(languages).slice(0, 5);

    // Build summary
    let summary = `Repository ${owner}/${repo}`;
    if (repoInfo.description) summary += ` - ${repoInfo.description}`;
    if (repoInfo.homepage) summary += `. Homepage: ${repoInfo.homepage}`;
    if (repoInfo.license && repoInfo.license.name) summary += `. License: ${repoInfo.license.name}`;
    if (topLangs.length) summary += `. Languages: ${topLangs.join(', ')}`;
    if (readmeText) summary += `. README: ${readmeText.substring(0, 2000)}`;

    return summary;
  } catch (e) {
    console.warn('GitHub repo fetch failed', e);
    throw e;
  }
}

/**
 * Analyze profile or repo from GitHub URL
 */
async function analyzeGitHubURL(url) {
  const repoMatch = url.match(/^https?:\/\/(?:www\.)?github\.com\/([^\/\s]+)\/([^\/\s]+)(?:\.git)?\/?$/i);
  const profileMatch = url.match(/^https?:\/\/(?:www\.)?github\.com\/([^\/\s]+)\/?$/i);
  
  if (repoMatch) {
    return await fetchGitHubRepo(url);
  } else if (profileMatch) {
    return await fetchGitHubProfile(url);
  }
  
  throw new Error("Invalid GitHub URL format");
}
