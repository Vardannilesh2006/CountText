const STATE = {
  text: "",
  theme: "light",
  activeTab: "dashboard",
  socialTab: "twitter",
  socialImage: null,
  socialProfileImage: null,
  socialDrafts: {
    twitter: "",
    linkedin: "",
    instagram: "",
    youtube: ""
  },
  seo: {
    keyword: "",
    title: "",
    meta: ""
  },
  seoViewMode: "desktop", // desktop | mobile
  saveTimeout: null
};

// Common English stop words list for keyword density analysis
const STOP_WORDS = new Set([
  "i", "me", "my", "myself", "we", "our", "ours", "ourselves", "you", "your", "yours", 
  "yourself", "yourselves", "he", "him", "his", "himself", "she", "her", "hers", 
  "herself", "it", "its", "itself", "they", "them", "their", "theirs", "themselves", 
  "what", "which", "who", "whom", "this", "that", "these", "those", "am", "is", "are", 
  "was", "were", "be", "been", "being", "have", "has", "had", "having", "do", "does", 
  "did", "doing", "a", "an", "the", "and", "but", "if", "or", "because", "as", "until", 
  "while", "of", "at", "by", "for", "with", "about", "against", "between", "into", 
  "through", "during", "before", "after", "above", "below", "to", "from", "up", "down", 
  "in", "out", "on", "off", "over", "under", "again", "further", "then", "once", "here", 
  "there", "when", "where", "why", "how", "all", "any", "both", "each", "few", "more", 
  "most", "other", "some", "such", "no", "nor", "not", "only", "own", "same", "so", 
  "than", "too", "very", "s", "t", "can", "will", "just", "don", "should", "now"
]);

// --- DOM References ---
const DOM = {
  // Theme & Navigation
  html: document.documentElement,
  themeToggle: document.getElementById("theme-toggle"),
  themeIconSun: document.querySelector(".theme-icon-sun"),
  themeIconMoon: document.querySelector(".theme-icon-moon"),
  tabs: {
    dashboard: document.getElementById("tab-dashboard"),
    social: document.getElementById("tab-social"),
    seo: document.getElementById("tab-seo"),
    utils: document.getElementById("tab-utils")
  },
  views: {
    dashboard: document.getElementById("view-dashboard"),
    social: document.getElementById("view-social"),
    seo: document.getElementById("view-seo"),
    utils: document.getElementById("view-utils")
  },

  // Main Editor Elements
  editor: document.getElementById("main-editor-textarea"),
  saveIndicatorDot: document.getElementById("save-indicator-dot"),
  saveStatusText: document.getElementById("save-status-text"),
  
  // File operations
  importInput: document.getElementById("import-file-input"),
  importBtn: document.getElementById("import-btn"),
  exportBtn: document.getElementById("export-btn"),
  copyBtn: document.getElementById("copy-btn"),
  clearBtn: document.getElementById("clear-btn"),
  
  // Quick text formatting
  caseUpper: document.getElementById("case-upper-btn"),
  caseLower: document.getElementById("case-lower-btn"),
  caseTitle: document.getElementById("case-title-btn"),
  caseSentence: document.getElementById("case-sentence-btn"),

  // Stats Counters
  counters: {
    charsSp: document.getElementById("count-chars-sp"),
    charsNoSp: document.getElementById("count-chars-nosp"),
    words: document.getElementById("count-words"),
    sentences: document.getElementById("count-sentences"),
    paragraphs: document.getElementById("count-paragraphs"),
    readTime: document.getElementById("count-read-time"),
    speakTime: document.getElementById("count-speak-time"),
    readabilityScore: document.getElementById("count-readability-score"),
    readabilityLevel: document.getElementById("count-readability-level")
  },

  // Keyword Density
  densityList: document.getElementById("keyword-density-list"),
  excludeStopWords: document.getElementById("exclude-stop-words"),

  // Social Previews
  socialTabs: {
    twitter: document.getElementById("social-tab-twitter"),
    linkedin: document.getElementById("social-tab-linkedin"),
    instagram: document.getElementById("social-tab-instagram"),
    youtube: document.getElementById("social-tab-youtube")
  },
  socialCards: {
    twitter: document.getElementById("preview-card-twitter"),
    linkedin: document.getElementById("preview-card-linkedin"),
    instagram: document.getElementById("preview-card-instagram"),
    youtube: document.getElementById("preview-card-youtube")
  },
  socialParams: {
    twitter: {
      username: document.getElementById("twitter-param-username"),
      handle: document.getElementById("twitter-param-handle"),
      text: document.getElementById("twitter-param-text")
    },
    linkedin: {
      username: document.getElementById("linkedin-param-username"),
      headline: document.getElementById("linkedin-param-headline"),
      text: document.getElementById("linkedin-param-text")
    },
    instagram: {
      handle: document.getElementById("instagram-param-handle"),
      text: document.getElementById("instagram-param-text")
    },
    youtube: {
      username: document.getElementById("youtube-param-username"),
      text: document.getElementById("youtube-param-text")
    }
  },
  socialLimitBanner: document.getElementById("social-limit-banner"),
  socialLimitStatus: document.getElementById("social-limit-status"),
  socialProgressCount: document.getElementById("social-progress-count"),
  twitterProgressCircle: document.getElementById("twitter-progress-circle"),
  twitterRingContainer: document.getElementById("twitter-ring-container"),
  twitterRingText: document.getElementById("twitter-ring-text"),
  socialImageUploadGroup: document.getElementById("social-image-upload-group"),
  socialImageUploadLabel: document.getElementById("social-image-upload-label"),
  
  // Social Previews mock text target areas
  mockTwName: document.getElementById("tw-mock-name"),
  mockTwHandle: document.getElementById("tw-mock-handle"),
  mockTwAvatar: document.getElementById("tw-avatar-initials"),
  mockTwBody: document.getElementById("tw-mock-body"),
  
  mockLiName: document.getElementById("li-mock-name"),
  mockLiHeadline: document.getElementById("li-mock-headline"),
  mockLiAvatar: document.getElementById("li-avatar-initials"),
  mockLiBody: document.getElementById("li-mock-body"),
  
  mockIgUsername: document.getElementById("ig-mock-username"),
  mockIgUsernameCaption: document.getElementById("ig-mock-username-caption"),
  mockIgAvatar: document.getElementById("ig-avatar-initials"),
  mockIgBody: document.getElementById("ig-mock-body"),
  mockIgTagsChecker: document.getElementById("ig-tags-checker"),
  
  mockYtTitle: document.getElementById("yt-mock-title"),
  mockYtChannel: document.getElementById("yt-mock-channel"),

  // SEO Tool
  seoKeywordInput: document.getElementById("seo-keyword-input"),
  seoTitleInput: document.getElementById("seo-title-input"),
  seoMetaInput: document.getElementById("seo-meta-input"),
  seoTitleCount: document.getElementById("seo-title-count"),
  seoMetaCount: document.getElementById("seo-meta-count"),
  deviceToggleDesktop: document.getElementById("device-toggle-desktop"),
  deviceToggleMobile: document.getElementById("device-toggle-mobile"),
  googleSerpContainer: document.getElementById("google-serp-container"),
  serpPreviewTitle: document.getElementById("serp-preview-title-text"),
  serpPreviewSnippet: document.getElementById("serp-preview-snippet-text"),
  serpPreviewUrlText: document.getElementById("serp-preview-url-text"),
  
  // SEO Checklist items
  checkIconTitle: document.getElementById("check-icon-title-len"),
  checkDescTitle: document.getElementById("check-desc-title-len"),
  checkIconMeta: document.getElementById("check-icon-meta-len"),
  checkDescMeta: document.getElementById("check-desc-meta-len"),
  checkIconKeywordTitle: document.getElementById("check-icon-keyword-title"),
  checkDescKeywordTitle: document.getElementById("check-desc-keyword-title"),
  checkIconKeywordMeta: document.getElementById("check-icon-keyword-meta"),
  checkDescKeywordMeta: document.getElementById("check-desc-keyword-meta"),

  // Advanced Utilities
  utilSpacesBtn: document.getElementById("util-spaces-btn"),
  utilLinesBtn: document.getElementById("util-lines-btn"),
  utilSortAzBtn: document.getElementById("util-sort-az-btn"),
  utilSortZaBtn: document.getElementById("util-sort-za-btn"),
  utilReverseBtn: document.getElementById("util-reverse-btn"),
  utilStripHtmlBtn: document.getElementById("util-strip-html-btn"),
  utilFindInput: document.getElementById("util-find-input"),
  utilReplaceInput: document.getElementById("util-replace-input"),
  utilReplaceTrigger: document.getElementById("util-replace-trigger"),
  utilSearchCountInput: document.getElementById("util-search-count-input"),
  utilSearchCountTrigger: document.getElementById("util-search-count-trigger"),
  specificSearchOutput: document.getElementById("specific-search-output"),
  socialImageUpload: document.getElementById("social-image-upload"),
  socialImageRemoveBtn: document.getElementById("social-image-remove-btn"),
  socialProfileUpload: document.getElementById("social-profile-upload"),
  socialProfileRemoveBtn: document.getElementById("social-profile-remove-btn")
};

// --- Initialization ---
document.addEventListener("DOMContentLoaded", () => {
  loadSavedSession();
  setupEventListeners();
  analyzeText();
  
  const mainGrid = document.querySelector(".main-grid");
  if (mainGrid) {
    mainGrid.setAttribute("data-active-view", STATE.activeTab || "dashboard");
  }
});

// --- Event Listeners Setup ---
function setupEventListeners() {
  // Theme Toggle
  DOM.themeToggle.addEventListener("click", toggleTheme);

  // Nav Tabs switcher
  Object.keys(DOM.tabs).forEach(tabKey => {
    DOM.tabs[tabKey].addEventListener("click", () => switchTab(tabKey));
  });

  // Editor Input Listener
  DOM.editor.addEventListener("input", handleEditorInput);

  // File Utilities
  DOM.importBtn.addEventListener("click", () => DOM.importInput.click());
  DOM.importInput.addEventListener("change", handleFileImport);
  DOM.exportBtn.addEventListener("click", exportTextFile);
  DOM.copyBtn.addEventListener("click", copyTextToClipboard);
  DOM.clearBtn.addEventListener("click", clearEditor);

  // Quick Format Operations
  DOM.caseUpper.addEventListener("click", () => transformCase("uppercase"));
  DOM.caseLower.addEventListener("click", () => transformCase("lowercase"));
  DOM.caseTitle.addEventListener("click", () => transformCase("title"));
  DOM.caseSentence.addEventListener("click", () => transformCase("sentence"));

  // Exclude Stop Words Checkbox
  DOM.excludeStopWords.addEventListener("change", updateKeywordDensity);

  // Social Previews Platform Selection Tabs
  Object.keys(DOM.socialTabs).forEach(platform => {
    DOM.socialTabs[platform].addEventListener("click", () => switchSocialTab(platform));
  });

  // Social Customization Parameter Inputs
  // Twitter
  DOM.socialParams.twitter.username.addEventListener("input", updateSocialMockups);
  DOM.socialParams.twitter.handle.addEventListener("input", updateSocialMockups);
  DOM.socialParams.twitter.text.addEventListener("input", (e) => {
    STATE.socialDrafts.twitter = e.target.value;
    updateSocialMockups();
  });
  
  // LinkedIn
  DOM.socialParams.linkedin.username.addEventListener("input", updateSocialMockups);
  DOM.socialParams.linkedin.headline.addEventListener("input", updateSocialMockups);
  DOM.socialParams.linkedin.text.addEventListener("input", (e) => {
    STATE.socialDrafts.linkedin = e.target.value;
    updateSocialMockups();
  });
  
  // Instagram
  DOM.socialParams.instagram.handle.addEventListener("input", updateSocialMockups);
  DOM.socialParams.instagram.text.addEventListener("input", (e) => {
    STATE.socialDrafts.instagram = e.target.value;
    updateSocialMockups();
  });
  
  // YouTube
  DOM.socialParams.youtube.username.addEventListener("input", updateSocialMockups);
  DOM.socialParams.youtube.text.addEventListener("input", (e) => {
    STATE.socialDrafts.youtube = e.target.value;
    updateSocialMockups();
  });

  // SEO Checker Inputs
  DOM.seoKeywordInput.addEventListener("input", handleSeoInput);
  DOM.seoTitleInput.addEventListener("input", handleSeoInput);
  DOM.seoMetaInput.addEventListener("input", handleSeoInput);
  DOM.deviceToggleDesktop.addEventListener("click", () => toggleSeoDevice("desktop"));
  DOM.deviceToggleMobile.addEventListener("click", () => toggleSeoDevice("mobile"));

  // LinkedIn preview device toggles
  const liToggleDesktop = document.getElementById("li-toggle-desktop");
  const liToggleMobile = document.getElementById("li-toggle-mobile");
  const liPostCardElement = document.getElementById("li-post-card-element");
  if (liToggleDesktop && liToggleMobile && liPostCardElement) {
    liToggleDesktop.addEventListener("click", () => {
      liToggleDesktop.classList.add("active");
      liToggleMobile.classList.remove("active");
      liPostCardElement.classList.remove("mobile-view");
    });
    liToggleMobile.addEventListener("click", () => {
      liToggleMobile.classList.add("active");
      liToggleDesktop.classList.remove("active");
      liPostCardElement.classList.add("mobile-view");
    });
  }

  // Advanced Utilities Buttons
  DOM.utilSpacesBtn.addEventListener("click", () => applyTextUtility("cleanSpaces"));
  DOM.utilLinesBtn.addEventListener("click", () => applyTextUtility("removeBreaks"));
  DOM.utilSortAzBtn.addEventListener("click", () => applyTextUtility("sortAZ"));
  DOM.utilSortZaBtn.addEventListener("click", () => applyTextUtility("sortZA"));
  DOM.utilReverseBtn.addEventListener("click", () => applyTextUtility("reverse"));
  DOM.utilStripHtmlBtn.addEventListener("click", () => applyTextUtility("stripHTML"));
  
  DOM.utilReplaceTrigger.addEventListener("click", executeFindReplace);
  DOM.utilSearchCountTrigger.addEventListener("click", executeSpecificCount);
  DOM.socialImageUpload.addEventListener("change", handleSocialImageUpload);
  DOM.socialImageRemoveBtn.addEventListener("click", removeSocialImage);
  DOM.socialProfileUpload.addEventListener("change", handleSocialProfileUpload);
  DOM.socialProfileRemoveBtn.addEventListener("click", removeSocialProfilePhoto);
}

// --- Session Persistence ---
function loadSavedSession() {
  // Theme load
  const savedTheme = localStorage.getItem("counttext-theme-v2") || "light";
  setTheme(savedTheme);

  // Editor text load
  const savedText = localStorage.getItem("counttext-text") || "";
  DOM.editor.value = savedText;
  STATE.text = savedText;

  // SEO Fields load
  STATE.seo.keyword = localStorage.getItem("counttext-seo-keyword") || "";
  STATE.seo.title = localStorage.getItem("counttext-seo-title") || "";
  STATE.seo.meta = localStorage.getItem("counttext-seo-meta") || "";

  DOM.seoKeywordInput.value = STATE.seo.keyword;
  DOM.seoTitleInput.value = STATE.seo.title;
  DOM.seoMetaInput.value = STATE.seo.meta;
}

function triggerAutoSave() {
  setSaveIndicator("saving");
  clearTimeout(STATE.saveTimeout);
  
  STATE.saveTimeout = setTimeout(() => {
    localStorage.setItem("counttext-text", STATE.text);
    localStorage.setItem("counttext-seo-keyword", STATE.seo.keyword);
    localStorage.setItem("counttext-seo-title", STATE.seo.title);
    localStorage.setItem("counttext-seo-meta", STATE.seo.meta);
    setSaveIndicator("saved");
  }, 800);
}

function setSaveIndicator(status) {
  if (status === "saving") {
    DOM.saveIndicatorDot.className = "save-dot unsaved";
    DOM.saveStatusText.textContent = "Saving...";
  } else if (status === "saved") {
    DOM.saveIndicatorDot.className = "save-dot saved";
    DOM.saveStatusText.textContent = "Draft Saved";
  }
}

// --- Theme Toggler ---
function toggleTheme() {
  const currentTheme = DOM.html.getAttribute("data-theme") || "light";
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  setTheme(newTheme);
}

function setTheme(theme) {
  DOM.html.setAttribute("data-theme", theme);
  STATE.theme = theme;
  localStorage.setItem("counttext-theme-v2", theme);
  
  if (theme === "dark") {
    DOM.themeIconSun.style.display = "none";
    DOM.themeIconMoon.style.display = "block";
  } else {
    DOM.themeIconSun.style.display = "block";
    DOM.themeIconMoon.style.display = "none";
  }
}

// --- Nav Tabs Switching ---
function switchTab(tabKey) {
  Object.keys(DOM.tabs).forEach(k => {
    DOM.tabs[k].classList.remove("active");
    DOM.tabs[k].setAttribute("aria-selected", "false");
    DOM.views[k].classList.remove("active");
  });

  DOM.tabs[tabKey].classList.add("active");
  DOM.tabs[tabKey].setAttribute("aria-selected", "true");
  DOM.views[tabKey].classList.add("active");
  STATE.activeTab = tabKey;
  
  const mainGrid = document.querySelector(".main-grid");
  if (mainGrid) {
    mainGrid.setAttribute("data-active-view", tabKey);
  }

  // Smart suggestions for SEO Fields if user clicks SEO tab and inputs are empty
  if (tabKey === "seo") {
    if (!STATE.seo.title && STATE.text.trim()) {
      // Suggest first line of text
      const lines = STATE.text.split("\n").filter(l => l.trim().length > 0);
      if (lines.length > 0) {
        let suggestedTitle = lines[0].trim();
        if (suggestedTitle.length > 60) {
          suggestedTitle = suggestedTitle.substring(0, 57) + "...";
        }
        DOM.seoTitleInput.value = suggestedTitle;
        STATE.seo.title = suggestedTitle;
      }
    }
    if (!STATE.seo.meta && STATE.text.trim()) {
      // Suggest first 150 chars of text
      let suggestedMeta = STATE.text.trim().replace(/\s+/g, ' ');
      if (suggestedMeta.length > 155) {
        suggestedMeta = suggestedMeta.substring(0, 152) + "...";
      }
      DOM.seoMetaInput.value = suggestedMeta;
      STATE.seo.meta = suggestedMeta;
    }
    handleSeoInput(); // Recalculate SEO preview and scoring
  }

  if (tabKey === "social") {
    // Pre-populate with editor content if empty
    const currentPlatform = STATE.socialTab;
    const textarea = DOM.socialParams[currentPlatform].text;
    if (!textarea.value.trim() && STATE.text.trim()) {
      textarea.value = STATE.text;
      STATE.socialDrafts[currentPlatform] = STATE.text;
    }
    updateSocialMockups();
  }

  // If switching back to dashboard, make sure editor is updated
  if (tabKey === "dashboard") {
    DOM.editor.focus();
  }
}

// --- Editor Event Handler ---
function handleEditorInput(e) {
  STATE.text = e.target.value;
  setSaveIndicator("saving");
  analyzeText();
  triggerAutoSave();
}

// --- Text Analytics Engine ---
function analyzeText() {
  const text = STATE.text;

  // Basic stats
  const charsSp = text.length;
  const charsNoSp = text.replace(/\s/g, '').length;
  
  // Word extraction
  const cleanText = text.trim();
  const wordsArray = cleanText ? cleanText.split(/\s+/) : [];
  const wordsCount = wordsArray.length;

  // Sentence count (smart split on sentence endings with space/end)
  const sentencesCount = cleanText ? cleanText.split(/[.!?]+(?=\s|$)/).filter(s => s.trim().length > 0).length : 0;
  
  // Paragraphs
  const paragraphsCount = cleanText ? cleanText.split(/\n+/).filter(p => p.trim().length > 0).length : 0;

  // Read / Speak Times
  const readTimeMin = Math.ceil(wordsCount / 200); // 200 Words Per Minute
  const readTimeStr = wordsCount < 200 ? `${Math.round((wordsCount * 60) / 200)}s` : `${readTimeMin}m`;

  const speakTimeSec = Math.round((wordsCount * 60) / 130); // 130 Words Per Minute speaking
  const speakTimeStr = speakTimeSec >= 60 
    ? `${Math.floor(speakTimeSec / 60)}m ${speakTimeSec % 60}s` 
    : `${speakTimeSec}s`;

  // Readability
  const readability = calculateReadability(text, wordsCount, sentencesCount);

  // Update DOM widgets
  DOM.counters.charsSp.textContent = charsSp;
  DOM.counters.charsNoSp.textContent = charsNoSp;
  DOM.counters.words.textContent = wordsCount;
  DOM.counters.sentences.textContent = sentencesCount;
  DOM.counters.paragraphs.textContent = paragraphsCount;
  DOM.counters.readTime.textContent = readTimeStr;
  DOM.counters.speakTime.textContent = speakTimeStr;
  
  DOM.counters.readabilityScore.textContent = readability.score;
  DOM.counters.readabilityLevel.textContent = readability.level;

  // Update secondary processes
  updateKeywordDensity();
  updateSocialMockups();
}

// Flesch Reading Ease Score Implementation
function calculateReadability(text, wordsCount, sentencesCount) {
  if (wordsCount === 0) {
    return { score: 100, level: "N/A" };
  }
  
  const sentences = sentencesCount || 1;
  const syllables = countTotalSyllables(text);
  
  // Flesch Reading Ease Formula
  let score = 206.835 - 1.015 * (wordsCount / sentences) - 84.6 * (syllables / wordsCount);
  score = Math.max(0, Math.min(100, Math.round(score)));

  let level = "Standard";
  if (score >= 90) level = "Very Easy (5th Grade)";
  else if (score >= 80) level = "Easy (6th Grade)";
  else if (score >= 70) level = "Fairly Easy (7th Grade)";
  else if (score >= 60) level = "Standard (8th-9th Grade)";
  else if (score >= 50) level = "Fairly Hard (High School)";
  else if (score >= 30) level = "Hard (College)";
  else level = "Very Difficult (Grad Level)";

  return { score, level };
}

function countTotalSyllables(text) {
  const words = text.toLowerCase().match(/[a-z]+/g) || [];
  let total = 0;
  for (let i = 0; i < words.length; i++) {
    total += countWordSyllables(words[i]);
  }
  return total;
}

function countWordSyllables(word) {
  if (word.length <= 3) return 1;
  word = word.replace(/(?:es|ed|e)$/, ''); // Strip common silent endings
  word = word.replace(/^y/, ''); // Strip starting y
  
  const vowels = word.match(/[aeiouy]{1,2}/g); // Vowel pairings count as 1 syllable
  return vowels ? vowels.length : 1;
}

// --- Keyword Density Analyzer ---
function updateKeywordDensity() {
  const text = STATE.text;
  if (!text.trim()) {
    DOM.densityList.innerHTML = '<div class="no-keywords-msg">No words to analyze yet.</div>';
    return;
  }

  // Tokenize
  const rawWords = text.toLowerCase().match(/[a-z0-9']+/g) || [];
  const excludeStop = DOM.excludeStopWords.checked;

  const wordCounts = {};
  let validWordCount = 0;

  rawWords.forEach(word => {
    // Filter length, numbers or stop words
    if (word.length < 2 || (excludeStop && STOP_WORDS.has(word))) {
      return;
    }
    wordCounts[word] = (wordCounts[word] || 0) + 1;
    validWordCount++;
  });

  if (validWordCount === 0) {
    DOM.densityList.innerHTML = '<div class="no-keywords-msg">No qualifying keywords found.</div>';
    return;
  }

  // Sort and pick top 10
  const sortedKeywords = Object.keys(wordCounts)
    .map(word => ({ word, count: wordCounts[word] }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  const highestCount = sortedKeywords[0].count;
  
  // Render
  DOM.densityList.innerHTML = "";
  sortedKeywords.forEach(item => {
    const percentage = ((item.count / validWordCount) * 100).toFixed(1);
    const barWidth = (item.count / highestCount) * 100;
    
    const densityRow = document.createElement("div");
    densityRow.className = "density-item";
    densityRow.innerHTML = `
      <span class="density-word">${escapeHtml(item.word)}</span>
      <div class="density-stats">
        <div class="density-bar-container">
          <div class="density-bar" style="width: ${barWidth}%"></div>
        </div>
        <span class="density-count">${item.count}</span>
        <span class="density-pct">(${percentage}%)</span>
      </div>
    `;
    DOM.densityList.appendChild(densityRow);
  });
}

// --- Social Previews Logic ---
function switchSocialTab(platform) {
  Object.keys(DOM.socialTabs).forEach(p => {
    DOM.socialTabs[p].classList.remove("active");
    DOM.socialCards[p].style.display = "none";
    document.getElementById(`social-params-${p}`).style.display = "none";
  });

  DOM.socialTabs[platform].classList.add("active");
  DOM.socialCards[platform].style.display = platform === "instagram" ? "block" : "flex";
  document.getElementById(`social-params-${platform}`).style.display = "block";
  STATE.socialTab = platform;

  // Toggle uploader visibility based on platform
  if (platform === "instagram" || platform === "youtube") {
    DOM.socialImageUploadGroup.style.display = "flex";
    DOM.socialImageUploadLabel.textContent = platform === "instagram" ? "Upload Post Image" : "Upload Video Thumbnail";
  } else {
    DOM.socialImageUploadGroup.style.display = "none";
  }

  // Pre-populate platform text from main text if empty
  const textarea = DOM.socialParams[platform].text;
  if (!textarea.value.trim() && STATE.text.trim()) {
    textarea.value = STATE.text;
    STATE.socialDrafts[platform] = STATE.text;
  }

  updateSocialMockups();
}

function updateSocialMockups() {
  const activePlatform = STATE.socialTab;
  const text = DOM.socialParams[activePlatform].text.value;
  
  // Helper to extract initials
  const getInitials = (name) => {
    if (!name) return "";
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + (parts[parts.length - 1][0] || "")).toUpperCase();
  };

  if (activePlatform === "twitter") {
    // Update profile info
    const twName = DOM.socialParams.twitter.username.value.trim() || "John Doe";
    let twHandle = DOM.socialParams.twitter.handle.value.trim() || "@johndoe";
    if (!twHandle.startsWith("@")) twHandle = "@" + twHandle;
    DOM.mockTwName.textContent = twName;
    DOM.mockTwHandle.textContent = twHandle;
    
    if (STATE.socialProfileImage) {
      DOM.mockTwAvatar.textContent = "";
      DOM.mockTwAvatar.style.backgroundImage = `url(${STATE.socialProfileImage})`;
      DOM.mockTwAvatar.style.backgroundSize = "cover";
      DOM.mockTwAvatar.style.backgroundPosition = "center";
    } else {
      DOM.mockTwAvatar.textContent = getInitials(twName);
      DOM.mockTwAvatar.style.backgroundImage = "none";
    }

    const limit = 280;
    const currentLen = text.length;
    DOM.socialProgressCount.textContent = `${currentLen} / ${limit}`;

    // Highlight exceeded text inside Twitter preview
    if (currentLen > limit) {
      const validPart = text.substring(0, limit);
      const invalidPart = text.substring(limit);
      DOM.mockTwBody.innerHTML = escapeHtml(validPart) + `<span class="exceeded-chars">${escapeHtml(invalidPart)}</span>`;
      
      setSocialLimitAlert("danger", `Exceeded! You are ${currentLen - limit} characters over the limit.`);
    } else {
      DOM.mockTwBody.textContent = text || "Your tweet will look like this. Start typing inside the editor!";
      if (currentLen >= 260) {
        setSocialLimitAlert("warning", `Warning! You have only ${limit - currentLen} characters remaining.`);
      } else {
        setSocialLimitAlert("valid", `Excellent! Fits perfectly within the 280 character limit.`);
      }
    }

    // Twitter progress circle svg logic
    DOM.twitterRingContainer.style.display = "block";
    const circumference = 125.66; // 2 * pi * r (r=20)
    const pct = Math.min(currentLen / limit, 1.0);
    const offset = circumference - (pct * circumference);
    DOM.twitterProgressCircle.style.strokeDashoffset = offset;
    
    // Circle color feedback
    if (currentLen >= limit) {
      DOM.twitterProgressCircle.style.stroke = "var(--danger)";
      DOM.twitterRingText.textContent = `-${currentLen - limit}`;
      DOM.twitterRingText.style.color = "var(--danger)";
    } else if (currentLen >= 260) {
      DOM.twitterProgressCircle.style.stroke = "var(--warning)";
      DOM.twitterRingText.textContent = limit - currentLen;
      DOM.twitterRingText.style.color = "var(--warning)";
    } else {
      DOM.twitterProgressCircle.style.stroke = "var(--accent-primary)";
      DOM.twitterRingText.textContent = limit - currentLen;
      DOM.twitterRingText.style.color = "var(--text-primary)";
    }

  } else if (activePlatform === "linkedin") {
    // Update profile info
    const liName = DOM.socialParams.linkedin.username.value.trim() || "John Doe";
    const liHeadline = DOM.socialParams.linkedin.headline.value.trim() || "Software Engineer | Content Creator";
    DOM.mockLiName.textContent = liName;
    DOM.mockLiHeadline.textContent = liHeadline;

    if (STATE.socialProfileImage) {
      DOM.mockLiAvatar.textContent = "";
      DOM.mockLiAvatar.style.backgroundImage = `url(${STATE.socialProfileImage})`;
      DOM.mockLiAvatar.style.backgroundSize = "cover";
      DOM.mockLiAvatar.style.backgroundPosition = "center";
    } else {
      DOM.mockLiAvatar.textContent = getInitials(liName);
      DOM.mockLiAvatar.style.backgroundImage = "linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)";
    }

    DOM.twitterRingContainer.style.display = "none";
    const limit = 3000;
    const currentLen = text.length;
    DOM.socialProgressCount.textContent = `${currentLen} / ${limit}`;

    // LinkedIn body character see-more truncation simulation
    let displayText = text;
    if (displayText.length > 220) {
      displayText = displayText.substring(0, 200) + '...';
      DOM.mockLiBody.innerHTML = escapeHtml(displayText) + ' <span class="see-more">...more</span>';
    } else {
      DOM.mockLiBody.textContent = text || "Draft your LinkedIn content inside the editor. The layout is optimized to show how it previews!";
    }

    if (currentLen > limit) {
      setSocialLimitAlert("danger", `Exceeded! LinkedIn limits posts to ${limit} characters. You are ${currentLen - limit} characters over.`);
    } else {
      setSocialLimitAlert("valid", `Excellent! Your post is within the 3,000 character limit.`);
    }

  } else if (activePlatform === "instagram") {
    // Update profile info
    let igHandle = DOM.socialParams.instagram.handle.value.trim() || "johndoe";
    igHandle = igHandle.replace(/^@/, "").toLowerCase();
    DOM.mockIgUsername.textContent = igHandle;
    DOM.mockIgUsernameCaption.textContent = igHandle;

    if (STATE.socialProfileImage) {
      DOM.mockIgAvatar.textContent = "";
      DOM.mockIgAvatar.style.backgroundImage = `url(${STATE.socialProfileImage})`;
      DOM.mockIgAvatar.style.backgroundSize = "cover";
      DOM.mockIgAvatar.style.backgroundPosition = "center";
    } else {
      DOM.mockIgAvatar.textContent = getInitials(igHandle);
      DOM.mockIgAvatar.style.backgroundImage = "none";
    }

    DOM.twitterRingContainer.style.display = "none";
    const limit = 2200;
    const currentLen = text.length;
    DOM.socialProgressCount.textContent = `${currentLen} / ${limit}`;

    DOM.mockIgBody.textContent = text || "Write your caption. Hashtags (#) and Mentions (@) are monitored automatically in CountText.";

    // Match tags
    const hashtags = text.match(/#\w+/g) || [];
    const mentions = text.match(/@\w+/g) || [];

    let warningText = "";
    let isValid = true;
    let alertClass = "valid";

    if (currentLen > limit) {
      warningText += `Too Long: Caption exceeds 2200 chars. `;
      isValid = false;
      alertClass = "danger";
    }

    if (hashtags.length > 30) {
      warningText += `Too many hashtags (${hashtags.length}/30 max). `;
      isValid = false;
      alertClass = "danger";
    }

    if (mentions.length > 20) {
      warningText += `Too many mentions (${mentions.length}/20 max). `;
      isValid = false;
      alertClass = "danger";
    }

    if (isValid) {
      setSocialLimitAlert("valid", `Instagram checks clear! Tags: ${hashtags.length}/30, Mentions: ${mentions.length}/20.`);
      DOM.mockIgTagsChecker.style.display = "none";
    } else {
      setSocialLimitAlert(alertClass, warningText);
      DOM.mockIgTagsChecker.style.display = "inline-block";
      DOM.mockIgTagsChecker.className = `ig-tags-warning ${alertClass === "danger" ? "danger" : "warning"}`;
      DOM.mockIgTagsChecker.textContent = `Warning: ${warningText}`;
      DOM.mockIgTagsChecker.style.color = "var(--danger)";
    }

  } else if (activePlatform === "youtube") {
    // Update profile info
    const ytChannel = DOM.socialParams.youtube.username.value.trim() || "CountText Channel";
    DOM.mockYtChannel.textContent = ytChannel;
    const ytAvatar = document.querySelector(".yt-chan-avatar");
    if (ytAvatar) {
      if (STATE.socialProfileImage) {
        ytAvatar.textContent = "";
        ytAvatar.style.backgroundImage = `url(${STATE.socialProfileImage})`;
        ytAvatar.style.backgroundSize = "cover";
        ytAvatar.style.backgroundPosition = "center";
      } else {
        ytAvatar.textContent = getInitials(ytChannel);
        ytAvatar.style.backgroundImage = "none";
      }
    }

    DOM.twitterRingContainer.style.display = "none";
    const limit = 100;
    const currentLen = text.length;
    DOM.socialProgressCount.textContent = `${currentLen} / ${limit}`;

    if (currentLen > limit) {
      DOM.mockYtTitle.textContent = text;
      DOM.mockYtTitle.classList.add("exceeded");
      setSocialLimitAlert("danger", `Exceeded! YouTube titles are cut off after 100 characters. You have ${currentLen} characters.`);
    } else {
      DOM.mockYtTitle.classList.remove("exceeded");
      DOM.mockYtTitle.textContent = text || "How to Count Characters Instantly - Beautiful Title Guide";
      
      if (currentLen >= 70) {
        setSocialLimitAlert("warning", `Warning! Google search results usually cut off YouTube titles after 70 characters.`);
      } else if (currentLen > 0 && currentLen < 50) {
        setSocialLimitAlert("warning", `Recommended: YouTube titles should be 50-70 characters for best click rate.`);
      } else {
        setSocialLimitAlert("valid", `Great length! YouTube titles are optimal between 50-70 characters.`);
      }
    }
  }

  // Handle preview image injections
  const twImgContainer = document.getElementById("tw-mock-image-container");
  const twImg = document.getElementById("tw-mock-image");
  const liImgContainer = document.getElementById("li-mock-image-container");
  const liImg = document.getElementById("li-mock-image");
  const igImg = document.getElementById("ig-mock-image");
  const igPlaceholder = document.getElementById("ig-mock-image-placeholder");
  const ytImg = document.getElementById("yt-mock-image");
  const ytPlaceholder = document.getElementById("yt-mock-image-placeholder");

  if (STATE.socialImage) {
    if (twImg) { twImg.src = STATE.socialImage; twImgContainer.style.display = "block"; }
    if (liImg) { liImg.src = STATE.socialImage; liImgContainer.style.display = "block"; }
    if (igImg) { igImg.src = STATE.socialImage; igImg.style.display = "block"; if (igPlaceholder) igPlaceholder.style.display = "none"; }
    if (ytImg) { ytImg.src = STATE.socialImage; ytImg.style.display = "block"; if (ytPlaceholder) ytPlaceholder.style.display = "none"; }
  } else {
    if (twImgContainer) twImgContainer.style.display = "none";
    if (liImgContainer) liImgContainer.style.display = "none";
    if (igImg) { igImg.style.display = "none"; if (igPlaceholder) igPlaceholder.style.display = "block"; }
    if (ytImg) { ytImg.style.display = "none"; if (ytPlaceholder) ytPlaceholder.style.display = "block"; }
  }
}

function setSocialLimitAlert(type, message) {
  DOM.socialLimitBanner.className = `limit-alert-banner ${type}`;
  DOM.socialLimitStatus.textContent = message;
}

// --- SEO Title & Meta Checker Logic ---
function handleSeoInput() {
  STATE.seo.keyword = DOM.seoKeywordInput.value;
  STATE.seo.title = DOM.seoTitleInput.value;
  STATE.seo.meta = DOM.seoMetaInput.value;

  const titleChars = STATE.seo.title.length;
  const metaChars = STATE.seo.meta.length;

  // Compute pixel sizes using HTML5 Canvas measurements
  const titlePixels = calculatePixelWidth(STATE.seo.title, "20px Arial");
  const metaPixels = calculatePixelWidth(STATE.seo.meta, "14px Arial");

  // Render counts
  DOM.seoTitleCount.innerHTML = `
    <span class="${titleChars > 60 || titlePixels > 600 ? 'exceeded' : (titleChars >= 50 ? 'good' : '')}">
      ${titleChars} / 60 chars (${titlePixels}px / 600px)
    </span>
  `;

  DOM.seoMetaCount.innerHTML = `
    <span class="${metaChars > 160 || metaPixels > 960 ? 'exceeded' : (metaChars >= 120 ? 'good' : '')}">
      ${metaChars} / 160 chars (${metaPixels}px / 960px)
    </span>
  `;

  // Mirror to SERP mockup
  DOM.serpPreviewTitle.textContent = STATE.seo.title || "Please enter a Page Title";
  DOM.serpPreviewSnippet.textContent = STATE.seo.meta || "Please enter a Meta Description to see how your website snippet will look in Google search results page.";
  
  // Calculate URL mockup
  const slug = STATE.seo.title ? '/' + STATE.seo.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : '';
  DOM.serpPreviewUrlText.textContent = `https://counttext.com${slug}`;

  // Evaluate Checklist
  evaluateSeoChecklist(titleChars, titlePixels, metaChars, metaPixels);
  
  triggerAutoSave();
}

function calculatePixelWidth(text, font) {
  // Creating canvas element once internally
  if (!calculatePixelWidth.canvas) {
    calculatePixelWidth.canvas = document.createElement("canvas");
  }
  const context = calculatePixelWidth.canvas.getContext("2d");
  context.font = font;
  return Math.round(context.measureText(text).width);
}

function evaluateSeoChecklist(titleChars, titlePx, metaChars, metaPx) {
  const kw = STATE.seo.keyword.trim().toLowerCase();
  
  // 1. Title Length Check
  if (titleChars === 0) {
    setCheckItem("title-len", "invalid", "Title is empty", "Please input a title for your webpage.");
  } else if (titleChars > 60 || titlePx > 600) {
    setCheckItem("title-len", "invalid", "Title too long", `Google cuts off titles at 60 characters or 600px. Currently: ${titleChars} chars (${titlePx}px)`);
  } else if (titleChars < 40 || titlePx < 400) {
    setCheckItem("title-len", "warning", "Title too short", `Consider making your title longer to include more keywords. Recommended: 50-60 chars.`);
  } else {
    setCheckItem("title-len", "valid", "Title length optimal", `Your title fits perfectly! Length is: ${titleChars} chars (${titlePx}px).`);
  }

  // 2. Meta Length Check
  if (metaChars === 0) {
    setCheckItem("meta-len", "invalid", "Meta description is empty", "Please input a description to improve search engine rankings.");
  } else if (metaChars > 160 || metaPx > 960) {
    setCheckItem("meta-len", "invalid", "Description too long", `Google limits snippets to 160 characters or 960px. Currently: ${metaChars} chars (${metaPx}px)`);
  } else if (metaChars < 100 || metaPx < 600) {
    setCheckItem("meta-len", "warning", "Description too short", `Add more description to improve click rates. Recommended: 120-160 chars.`);
  } else {
    setCheckItem("meta-len", "valid", "Description length optimal", `Your description fits perfectly! Length is: ${metaChars} chars (${metaPx}px).`);
  }

  // Keyword check
  if (!kw) {
    setCheckItem("keyword-title", "warning", "Keyword not defined", "Provide a focus keyword to evaluate content relevancy.");
    setCheckItem("keyword-meta", "warning", "Keyword not defined", "Provide a focus keyword to evaluate content relevancy.");
  } else {
    // 3. Keyword in Title Check
    const titleVal = STATE.seo.title.toLowerCase();
    if (titleVal.includes(kw)) {
      setCheckItem("keyword-title", "valid", "Keyword in Title", `Nice! Focus keyword "${kw}" was found in your Title.`);
    } else {
      setCheckItem("keyword-title", "invalid", "Keyword missing from Title", `Ensure focus keyword "${kw}" appears in your Title (ideally at the beginning).`);
    }

    // 4. Keyword in Meta Check
    const metaVal = STATE.seo.meta.toLowerCase();
    if (metaVal.includes(kw)) {
      setCheckItem("keyword-meta", "valid", "Keyword in Meta Description", `Nice! Focus keyword "${kw}" was found in your Meta Description.`);
    } else {
      setCheckItem("keyword-meta", "invalid", "Keyword missing from Meta Description", `Ensure focus keyword "${kw}" appears inside your Meta Description.`);
    }
  }
}

function setCheckItem(idSuffix, status, title, desc) {
  const iconNode = DOM[`checkIcon${idSuffix.charAt(0).toUpperCase() + idSuffix.slice(1).replace(/-([a-z])/g, g => g[1].toUpperCase())}`];
  const descNode = DOM[`checkDesc${idSuffix.charAt(0).toUpperCase() + idSuffix.slice(1).replace(/-([a-z])/g, g => g[1].toUpperCase())}`];
  
  if (!iconNode || !descNode) return;

  // Swap SVGs matching statuses
  let svgContent = "";
  if (status === "valid") {
    iconNode.className = "seo-check-icon valid";
    svgContent = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="m4.5 12.75 6 6 9-13.5" /></svg>`;
  } else if (status === "invalid") {
    iconNode.className = "seo-check-icon invalid";
    svgContent = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M6 18 18 6M6 6l12 12" /></svg>`;
  } else {
    iconNode.className = "seo-check-icon warning";
    svgContent = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" /></svg>`;
  }

  iconNode.innerHTML = svgContent;
  
  // Update texts
  const labelParent = iconNode.nextElementSibling;
  if (labelParent) {
    labelParent.querySelector(".seo-check-title").textContent = title;
    labelParent.querySelector(".seo-check-desc").textContent = desc;
  }
}

function toggleSeoDevice(mode) {
  STATE.seoViewMode = mode;
  if (mode === "desktop") {
    DOM.deviceToggleDesktop.classList.add("active");
    DOM.deviceToggleMobile.classList.remove("active");
    DOM.googleSerpContainer.classList.remove("mobile-view");
  } else {
    DOM.deviceToggleDesktop.classList.remove("active");
    DOM.deviceToggleMobile.classList.add("active");
    DOM.googleSerpContainer.classList.add("mobile-view");
  }
}

// --- Quick Text Case Converters ---
function transformCase(mode) {
  let text = DOM.editor.value;
  if (!text) return;

  if (mode === "uppercase") {
    text = text.toUpperCase();
  } else if (mode === "lowercase") {
    text = text.toLowerCase();
  } else if (mode === "title") {
    text = text.replace(/\b\w/g, c => c.toUpperCase());
  } else if (mode === "sentence") {
    // Lowercase all, then capitalize first letter of each sentence
    text = text.toLowerCase().replace(/(^\s*|[.!?]\s+)([a-z])/g, c => c.toUpperCase());
  }

  DOM.editor.value = text;
  STATE.text = text;
  analyzeText();
  triggerAutoSave();
}

// --- File Import / Export ---
function handleFileImport(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    const text = event.target.result;
    DOM.editor.value = text;
    STATE.text = text;
    analyzeText();
    triggerAutoSave();
  };
  reader.readAsText(file);
}

function exportTextFile() {
  const blob = new Blob([STATE.text], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "counttext-draft.txt";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function copyTextToClipboard() {
  if (!STATE.text) return;
  navigator.clipboard.writeText(STATE.text).then(() => {
    const originalText = DOM.copyBtn.innerHTML;
    DOM.copyBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style="width:13px;height:13px;">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="m4.5 12.75 6 6 9-13.5" />
      </svg>
      Copied!
    `;
    setTimeout(() => {
      DOM.copyBtn.innerHTML = originalText;
    }, 1500);
  });
}

function clearEditor() {
  if (confirm("Are you sure you want to clear the editor?")) {
    DOM.editor.value = "";
    STATE.text = "";
    analyzeText();
    triggerAutoSave();
  }
}

// --- Advanced Text Utilities Functions ---
function applyTextUtility(type) {
  let text = DOM.editor.value;
  if (!text) return;

  if (type === "cleanSpaces") {
    text = text.replace(/[ \t]+/g, ' ').replace(/^ +| +$/gm, '');
  } else if (type === "removeBreaks") {
    text = text.replace(/[\r\n]+/g, ' ');
  } else if (type === "sortAZ" || type === "sortZA") {
    const lines = text.split("\n");
    lines.sort((a, b) => a.localeCompare(b));
    if (type === "sortZA") lines.reverse();
    text = lines.join("\n");
  } else if (type === "reverse") {
    text = text.split("").reverse().join("");
  } else if (type === "stripHTML") {
    text = text.replace(/<[^>]*>/g, '');
  }

  DOM.editor.value = text;
  STATE.text = text;
  analyzeText();
  triggerAutoSave();
}

function executeFindReplace() {
  const text = DOM.editor.value;
  const findVal = DOM.utilFindInput.value;
  const replaceVal = DOM.utilReplaceInput.value;
  
  if (!text || !findVal) return;

  // Global replacement using safe regex escaping
  const escapedFind = findVal.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  const regex = new RegExp(escapedFind, "g");
  const newText = text.replace(regex, replaceVal);

  DOM.editor.value = newText;
  STATE.text = newText;
  analyzeText();
  triggerAutoSave();
  
  DOM.utilFindInput.value = "";
  DOM.utilReplaceInput.value = "";
}

function executeSpecificCount() {
  const text = DOM.editor.value;
  const searchVal = DOM.utilSearchCountInput.value;

  if (!text || !searchVal) {
    DOM.specificSearchOutput.innerHTML = "Search Count: <span>0 occurrences</span>";
    return;
  }

  // Count occurrences
  const escapedSearch = searchVal.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  const regex = new RegExp(escapedSearch, "gi");
  const matches = text.match(regex);
  const count = matches ? matches.length : 0;

  DOM.specificSearchOutput.innerHTML = `Search Count: <span>${count} ${count === 1 ? 'occurrence' : 'occurrences'}</span>`;
}

function handleSocialImageUpload(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    const dataUrl = event.target.result;
    STATE.socialImage = dataUrl;
    DOM.socialImageRemoveBtn.style.display = "flex";
    updateSocialMockups();
  };
  reader.readAsDataURL(file);
}

function removeSocialImage() {
  STATE.socialImage = null;
  DOM.socialImageUpload.value = "";
  DOM.socialImageRemoveBtn.style.display = "none";
  updateSocialMockups();
}

function handleSocialProfileUpload(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    const dataUrl = event.target.result;
    STATE.socialProfileImage = dataUrl;
    DOM.socialProfileRemoveBtn.style.display = "flex";
    updateSocialMockups();
  };
  reader.readAsDataURL(file);
}

function removeSocialProfilePhoto() {
  STATE.socialProfileImage = null;
  DOM.socialProfileUpload.value = "";
  DOM.socialProfileRemoveBtn.style.display = "none";
  updateSocialMockups();
}

// --- Helpers ---
function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// --- Accordion FAQ Toggles ---
function toggleFaq(btn) {
  const isExpanded = btn.getAttribute("aria-expanded") === "true";
  const answer = btn.nextElementSibling;
  
  if (isExpanded) {
    btn.setAttribute("aria-expanded", "false");
    if (answer) answer.style.maxHeight = null;
  } else {
    // Close other items
    document.querySelectorAll(".faq-question").forEach(q => {
      q.setAttribute("aria-expanded", "false");
      const ans = q.nextElementSibling;
      if (ans) ans.style.maxHeight = null;
    });

    btn.setAttribute("aria-expanded", "true");
    if (answer) {
      answer.style.maxHeight = (answer.scrollHeight + 30) + "px";
    }
  }
}

// --- Modal Managers ---
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = "flex";
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = "none";
  }
}

function closeModalOnOuterClick(event, modalId) {
  if (event.target.id === modalId) {
    closeModal(modalId);
  }
}

// --- Contact Form Submission Handler ---
function handleContactSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const submitBtn = document.getElementById("contact-submit-btn");
  const statusMsg = document.getElementById("contact-status-msg");
  
  const nameVal = document.getElementById("contact-name").value.trim();
  const emailVal = document.getElementById("contact-email").value.trim();
  const messageVal = document.getElementById("contact-message").value.trim();
  
  if (!nameVal || !emailVal || !messageVal) {
    statusMsg.style.display = "block";
    statusMsg.style.backgroundColor = "rgba(239, 68, 68, 0.15)";
    statusMsg.style.color = "var(--danger)";
    statusMsg.style.border = "1px solid var(--danger)";
    statusMsg.textContent = "Please fill in all fields.";
    return;
  }
  
  submitBtn.disabled = true;
  const originalBtnText = submitBtn.textContent;
  submitBtn.textContent = "Sending...";
  
  statusMsg.style.display = "none";
  
  fetch("https://formsubmit.co/ajax/nileshverma99731@gmail.com", {
    method: "POST",
    headers: { 
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      name: nameVal,
      email: emailVal,
      message: messageVal,
      _subject: "New Contact Message from CountText User"
    })
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error("Network response was not ok.");
  })
  .then(data => {
    statusMsg.style.display = "block";
    statusMsg.style.backgroundColor = "rgba(16, 185, 129, 0.15)";
    statusMsg.style.color = "var(--success)";
    statusMsg.style.border = "1px solid var(--success)";
    statusMsg.textContent = "Thank you! Your message has been sent successfully.";
    form.reset();
  })
  .catch(error => {
    statusMsg.style.display = "block";
    statusMsg.style.backgroundColor = "rgba(239, 68, 68, 0.15)";
    statusMsg.style.color = "var(--danger)";
    statusMsg.style.border = "1px solid var(--danger)";
    statusMsg.textContent = "Oops! Something went wrong. Please try again later.";
    console.error("FormSubmit Error:", error);
  })
  .finally(() => {
    submitBtn.disabled = false;
    submitBtn.textContent = originalBtnText;
  });
}
