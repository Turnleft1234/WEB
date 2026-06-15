const catalog = window.GRIND_CATALOG;

if (!catalog) {
  throw new Error("GRIND_CATALOG is not loaded");
}

const { baseGames, categories, platforms } = catalog;
const categoryNames = Object.fromEntries(categories.map((category) => [category.id, category.label]));

const COMMENTS_PATH = "data/comments.json";
const COMMENTS_REPO = "Turnleft1234/WEB";
const MAX_COMMENT_LENGTH = 100;
const FEATURED_ROTATION_SIZE = 5;
const FEATURED_ROTATION_INTERVAL = 5200;

const state = {
  genre: "all",
  platforms: new Set(platforms),
  session: "all",
  query: "",
  sort: "score",
  commentsByGame: {},
  featuredKey: "",
  featuredGames: [],
  featuredIndex: 0,
  featuredTimer: null
};

const els = {
  search: document.querySelector("#searchInput"),
  genreFilters: document.querySelector("#genreFilters"),
  platformFilters: document.querySelector("#platformFilters"),
  session: document.querySelector("#sessionSelect"),
  sort: document.querySelector("#sortSelect"),
  total: document.querySelector("#totalCount"),
  avgGrind: document.querySelector("#avgGrind"),
  platformCount: document.querySelector("#platformCount"),
  featured: document.querySelector("#featuredGame"),
  grid: document.querySelector("#gameGrid"),
  empty: document.querySelector("#emptyState"),
  resultTitle: document.querySelector("#resultTitle"),
  dialog: document.querySelector("#gameDialog"),
  dialogContent: document.querySelector("#dialogContent"),
  closeDialog: document.querySelector("#closeDialog"),
  toast: document.querySelector("#toast"),
  submitForm: document.querySelector("#submitForm"),
  submitCategory: document.querySelector('#submitForm select[name="category"]'),
  shareSite: document.querySelector("#shareSite")
};

function getCommunityGames() {
  try {
    return JSON.parse(localStorage.getItem("grindShareGames") || "[]");
  } catch {
    return [];
  }
}

function saveCommunityGames(games) {
  localStorage.setItem("grindShareGames", JSON.stringify(games));
}

function allGames() {
  return [...baseGames, ...getCommunityGames()];
}

function renderGenreFilters() {
  const buttons = [
    '<button class="active" type="button" data-genre="all">全部</button>',
    ...categories.map(
      (category) =>
        `<button type="button" data-genre="${escapeHtml(category.id)}">${escapeHtml(category.label)}</button>`
    )
  ];
  els.genreFilters.innerHTML = buttons.join("");
}

function renderPlatformFilters() {
  els.platformFilters.innerHTML = platforms
    .map(
      (platform) =>
        `<label><input type="checkbox" value="${escapeHtml(platform)}" checked> ${escapeHtml(platform)}</label>`
    )
    .join("");
}

function renderSubmitCategories() {
  els.submitCategory.innerHTML = categories
    .map(
      (category) => `<option value="${escapeHtml(category.id)}">${escapeHtml(category.label)}</option>`
    )
    .join("");
}

function initializeControls() {
  renderGenreFilters();
  renderPlatformFilters();
  renderSubmitCategories();
  setupFeaturedCarousel();
}

function matchesQuery(game) {
  if (!state.query) return true;
  const haystack = [
    game.title,
    game.subtitle,
    game.loop,
    game.summary,
    game.category,
    ...game.tags,
    ...game.platforms
  ]
    .join(" ")
    .toLowerCase();
  return haystack.includes(state.query.toLowerCase());
}

function getFilteredGames() {
  const filtered = allGames().filter((game) => {
    const genreMatch = state.genre === "all" || game.category === state.genre;
    const platformMatch = game.platforms.some((platform) => state.platforms.has(platform));
    const sessionMatch = state.session === "all" || game.session === state.session;
    return genreMatch && platformMatch && sessionMatch && matchesQuery(game);
  });

  return filtered.sort((a, b) => {
    if (state.sort === "grind") return b.grind - a.grind;
    if (state.sort === "updated") return new Date(b.updated) - new Date(a.updated);
    return b.score - a.score;
  });
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderExternalLink(game, className, label) {
  if (!game.url) return "";
  return `<a class="${className}" href="${escapeHtml(game.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(label)}</a>`;
}

async function loadComments() {
  try {
    const response = await fetch(`${COMMENTS_PATH}?v=${Date.now()}`);
    if (!response.ok) throw new Error("failed to load comments");
    state.commentsByGame = await response.json();
  } catch {
    state.commentsByGame = {};
  }
}

function getGameComments(gameId) {
  return state.commentsByGame[gameId] || [];
}

function buildCommentIssueUrl(game, text) {
  const body = [
    "<!-- grind-share-comment -->",
    `game_id: ${game.id}`,
    "author: 访客",
    `text: ${text}`,
    "",
    "_此留言由刷子游戏分享站提交，确认后将写入 data/comments.json 并对所有访客可见。_"
  ].join("\n");

  const params = new URLSearchParams({
    title: `[留言] ${game.title}`,
    body
  });

  return `https://github.com/${COMMENTS_REPO}/issues/new?${params.toString()}`;
}

function formatCommentTime(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleString("zh-CN", {
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

function renderCommentList(comments) {
  if (!comments.length) {
    return `<p class="comment-empty">还没有留言，来做第一个吧。</p>`;
  }

  return `
    <ul class="comment-list">
      ${comments
        .map(
          (comment) => `
        <li class="comment-item">
          <div class="comment-meta">
            <span>${escapeHtml(comment.author || "访客")}</span>
            <time datetime="${escapeHtml(comment.createdAt)}">${escapeHtml(formatCommentTime(comment.createdAt))}</time>
          </div>
          <p>${escapeHtml(comment.text)}</p>
        </li>
      `
        )
        .join("")}
    </ul>
  `;
}

function renderCommentsSection(gameId) {
  const comments = getGameComments(gameId);
  return `
    <section class="dialog-comments" aria-labelledby="commentsTitle-${escapeHtml(gameId)}">
      <div class="comments-heading">
        <h3 id="commentsTitle-${escapeHtml(gameId)}">留言</h3>
        <span>${comments.length} 条</span>
      </div>
      <form class="comment-form" data-comment-form="${escapeHtml(gameId)}">
        <label class="comment-field" for="commentInput-${escapeHtml(gameId)}">
          <textarea
            id="commentInput-${escapeHtml(gameId)}"
            name="text"
            rows="3"
            maxlength="${MAX_COMMENT_LENGTH}"
            placeholder="分享你的刷本心得（最多 100 字）"
            required
          ></textarea>
          <span class="comment-counter"><span data-comment-count>0</span>/${MAX_COMMENT_LENGTH}</span>
        </label>
        <button class="primary-button" type="submit">提交留言</button>
      </form>
      <div class="comment-results" aria-live="polite">
        ${renderCommentList(comments)}
      </div>
      <p class="comment-hint">留言会写入仓库中的 data/comments.json，确认提交后对所有访客可见，通常 1-2 分钟内完成同步。</p>
    </section>
  `;
}

function renderStats(games) {
  const total = games.length;
  const avg = total ? Math.round(games.reduce((sum, game) => sum + game.grind, 0) / total) : 0;
  const platformCount = new Set(games.flatMap((game) => game.platforms)).size;
  els.total.textContent = total;
  els.avgGrind.textContent = avg;
  els.platformCount.textContent = platformCount;
}

function shuffle(list) {
  const copied = [...list];
  for (let i = copied.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copied[i], copied[j]] = [copied[j], copied[i]];
  }
  return copied;
}

function pickRandomGames(games, size) {
  return shuffle(games).slice(0, Math.min(size, games.length));
}

function renderFeaturedCarousel(games) {
  els.featured.innerHTML = `
    <div class="featured-track" data-featured-track>
      ${games
        .map(
          (game) => `
        <article class="featured-slide">
          <img src="${game.image}" alt="${escapeHtml(game.title)}的风格化封面" loading="eager">
          <div class="featured-copy">
            <div>
              <p class="eyebrow">Featured Pick</p>
              <h2>${escapeHtml(game.title)}</h2>
            </div>
            <p>${escapeHtml(game.summary)}</p>
            <div class="tag-row">
              <span class="tag hot">刷度 ${game.grind}</span>
              ${game.tags.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}
            </div>
            <div class="action-row">
              <button class="primary-button" type="button" data-open="${game.id}">查看详情</button>
              ${renderExternalLink(game, "primary-button outline", "前往资料站")}
            </div>
          </div>
        </article>
      `
        )
        .join("")}
    </div>
    <div class="featured-dots" aria-label="精选轮播分页">
      ${games
        .map(
          (game, index) => `
        <button
          class="featured-dot"
          type="button"
          aria-label="查看 ${escapeHtml(game.title)}"
          aria-pressed="${index === state.featuredIndex ? "true" : "false"}"
          data-featured-dot="${index}"
        ></button>
      `
        )
        .join("")}
    </div>
  `;
}

function syncFeaturedCarousel() {
  const track = els.featured.querySelector("[data-featured-track]");
  const dots = els.featured.querySelectorAll("[data-featured-dot]");
  if (!track) return;

  track.style.transform = `translateX(-${state.featuredIndex * 100}%)`;
  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === state.featuredIndex);
    dot.setAttribute("aria-pressed", index === state.featuredIndex ? "true" : "false");
  });
}

function goToFeaturedSlide(index) {
  if (!state.featuredGames.length) return;
  const normalizedIndex = ((index % state.featuredGames.length) + state.featuredGames.length) % state.featuredGames.length;
  state.featuredIndex = normalizedIndex;
  syncFeaturedCarousel();
  startFeaturedCarousel();
}

function buildFeaturedCarousel(games) {
  els.featured.hidden = false;
  renderFeaturedCarousel(games);
  syncFeaturedCarousel();
}

function resetFeaturedState() {
  state.featuredKey = "";
  state.featuredGames = [];
  state.featuredIndex = 0;
}

function refreshFeaturedSelection(games) {
  state.featuredKey = games.map((game) => game.id).join("|");
  state.featuredGames = pickRandomGames(games, FEATURED_ROTATION_SIZE);
  state.featuredIndex = 0;
  buildFeaturedCarousel(state.featuredGames);
  startFeaturedCarousel();
}

function handleFeaturedDotsClick(event) {
  const dot = event.target.closest("[data-featured-dot]");
  if (!dot) return;
  const index = Number(dot.dataset.featuredDot);
  if (Number.isNaN(index)) return;
  goToFeaturedSlide(index);
}

function bindFeaturedEvents() {
  els.featured.addEventListener("click", handleFeaturedDotsClick);
}

function unbindFeaturedEvents() {
  els.featured.removeEventListener("click", handleFeaturedDotsClick);
}

function stopFeaturedCarousel() {
  if (state.featuredTimer) {
    window.clearInterval(state.featuredTimer);
    state.featuredTimer = null;
  }
}

function advanceFeaturedCarousel() {
  if (!state.featuredGames.length) return;
  goToFeaturedSlide(state.featuredIndex + 1);
}

function startFeaturedCarousel() {
  stopFeaturedCarousel();
  if (state.featuredGames.length <= 1) return;
  state.featuredTimer = window.setInterval(() => {
    state.featuredIndex = (state.featuredIndex + 1) % state.featuredGames.length;
    syncFeaturedCarousel();
  }, FEATURED_ROTATION_INTERVAL);
}

function renderFeatured(games) {
  if (!games.length) {
    stopFeaturedCarousel();
    resetFeaturedState();
    els.featured.hidden = true;
    return;
  }

  const key = games.map((game) => game.id).join("|");
  if (key !== state.featuredKey || !state.featuredGames.length) {
    refreshFeaturedSelection(games);
    return;
  }

  els.featured.hidden = false;
  syncFeaturedCarousel();
}

function teardownFeaturedCarousel() {
  stopFeaturedCarousel();
  unbindFeaturedEvents();
}

function setupFeaturedCarousel() {
  teardownFeaturedCarousel();
  bindFeaturedEvents();
}

function renderCards(games) {
  els.empty.hidden = games.length !== 0;
  els.grid.innerHTML = games
    .map(
      (game) => `
      <article class="game-card">
        <img src="${game.image}" alt="${escapeHtml(game.title)}的风格化封面" loading="lazy">
        <div class="game-card-body">
          <div class="card-title">
            <h3>${escapeHtml(game.title)}</h3>
            <span class="score">${game.score.toFixed(1)}</span>
          </div>
          <div class="meta">
            <span>${categoryNames[game.category] || game.category}</span>
            <span>${game.session}</span>
            <span>${game.platforms.join(" / ")}</span>
          </div>
          <p>${escapeHtml(game.summary)}</p>
          <div>
            <div class="meter" aria-label="${escapeHtml(game.title)}刷度 ${game.grind}">
              <span>刷度 ${game.grind}</span>
              <span class="meter-track"><span class="meter-fill" style="width: ${game.grind}%"></span></span>
            </div>
            <div class="card-actions">
              <div class="tag-row">
                ${game.tags.slice(0, 2).map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}
              </div>
              <div class="card-action-buttons">
                <button class="text-button" type="button" data-open="${game.id}">详情</button>
                ${renderExternalLink(game, "text-button", "前往")}
              </div>
            </div>
          </div>
        </div>
      </article>
    `
    )
    .join("");
}

function render() {
  const games = getFilteredGames();
  const label = state.genre === "all" ? "全部游戏" : `${categoryNames[state.genre]} 游戏`;
  els.resultTitle.textContent = state.query ? `搜索：${state.query}` : label;
  renderStats(games);
  renderFeatured(games);
  renderCards(games);
}

function findGame(id) {
  return allGames().find((game) => game.id === id);
}

async function openGame(id) {
  const game = findGame(id);
  if (!game) return;

  await loadComments();

  els.dialogContent.innerHTML = `
    <div class="dialog-hero">
      <img src="${game.image}" alt="${escapeHtml(game.title)}的风格化封面">
    </div>
    <div class="dialog-body">
      <div>
        <p class="eyebrow">${categoryNames[game.category] || game.category}</p>
        <h2 id="dialogTitle">${escapeHtml(game.title)}</h2>
        <p>${escapeHtml(game.subtitle)} · ${escapeHtml(game.loop)}</p>
      </div>
      <div class="tag-row">
        <span class="tag hot">评分 ${game.score.toFixed(1)}</span>
        <span class="tag hot">刷度 ${game.grind}</span>
        <span class="tag">${game.session}</span>
        <span class="tag">${game.team} 人</span>
        ${game.platforms.map((platform) => `<span class="tag">${escapeHtml(platform)}</span>`).join("")}
      </div>
      <p>${escapeHtml(game.summary)}</p>
      ${game.url ? `<div class="dialog-actions">${renderExternalLink(game, "primary-button", "前往游戏资料站 ↗")}</div>` : ""}
      <div class="dialog-columns">
        <section>
          <h3>推荐理由</h3>
          <ul>${game.reasons.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
        </section>
        <section>
          <h3>游玩建议</h3>
          <ul>${game.tips.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
        </section>
      </div>
      ${renderCommentsSection(game.id)}
    </div>
  `;

  if (typeof els.dialog.showModal === "function") {
    els.dialog.showModal();
  } else {
    els.dialog.setAttribute("open", "");
  }
}

function showToast(message) {
  els.toast.textContent = message;
  els.toast.classList.add("show");
  window.setTimeout(() => els.toast.classList.remove("show"), 2400);
}

els.genreFilters.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-genre]");
  if (!button) return;
  state.genre = button.dataset.genre;
  els.genreFilters.querySelectorAll("button").forEach((item) => item.classList.toggle("active", item === button));
  render();
});

els.platformFilters.addEventListener("change", () => {
  state.platforms = new Set(
    [...els.platformFilters.querySelectorAll("input:checked")].map((input) => input.value)
  );
  render();
});

els.session.addEventListener("change", () => {
  state.session = els.session.value;
  render();
});

els.sort.addEventListener("change", () => {
  state.sort = els.sort.value;
  render();
});

els.search.addEventListener("input", () => {
  state.query = els.search.value.trim();
  render();
});

document.addEventListener("click", (event) => {
  const opener = event.target.closest("[data-open]");
  if (opener) {
    void openGame(opener.dataset.open);
  }
});

els.closeDialog.addEventListener("click", () => {
  els.dialog.close();
});

els.dialog.addEventListener("click", (event) => {
  if (event.target === els.dialog) {
    els.dialog.close();
  }
});

els.dialog.addEventListener("input", (event) => {
  const counter = event.target.closest("[data-comment-form]")?.querySelector("[data-comment-count]");
  if (!counter || event.target.name !== "text") return;
  counter.textContent = String(event.target.value.length);
});

els.dialog.addEventListener("submit", (event) => {
  const form = event.target.closest("[data-comment-form]");
  if (!form) return;

  event.preventDefault();
  const gameId = form.dataset.commentForm;
  const game = findGame(gameId);
  const text = new FormData(form).get("text")?.toString().trim().replace(/\s+/g, " ") || "";
  if (!game || !text || text.length > MAX_COMMENT_LENGTH) return;

  window.open(buildCommentIssueUrl(game, text), "_blank", "noopener,noreferrer");
  form.reset();
  const counter = form.querySelector("[data-comment-count]");
  if (counter) counter.textContent = "0";
  showToast("请在 GitHub 页面确认提交");
});

els.submitForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(els.submitForm);
  const title = formData.get("title").toString().trim();
  const loop = formData.get("loop").toString().trim();
  const submittedCategory = formData.get("category").toString();
  const category = categoryNames[submittedCategory] ? submittedCategory : categories[0]?.id || "arpg";

  if (!title || !loop) return;

  const communityGames = getCommunityGames();
  communityGames.unshift({
    id: `community-${Date.now()}`,
    title,
    subtitle: "社区投稿候选",
    category,
    image: "assets/covers/community-cache.png",
    platforms: ["PC"],
    session: "中等",
    team: "1-4",
    grind: 80,
    score: 8.0,
    updated: new Date().toISOString().slice(0, 10),
    loop,
    tags: ["投稿", categoryNames[category] || category],
    summary: `${title} 的核心循环是${loop}，已加入你的本地分享清单。`,
    reasons: ["来自本地投稿，适合继续补充评分和平台信息", "核心循环已经明确，便于后续维护到正式列表"],
    tips: ["补充游玩时长、平台和多人规模后再发布到公共仓库"]
  });

  saveCommunityGames(communityGames.slice(0, 12));
  els.submitForm.reset();
  render();
  showToast("已添加到本地分享清单");
});

els.shareSite.addEventListener("click", async () => {
  const shareData = {
    title: document.title,
    text: "刷子游戏分享：刷刷刷游戏推荐库",
    url: window.location.href
  };

  try {
    if (navigator.share) {
      await navigator.share(shareData);
    } else if (navigator.clipboard) {
      await navigator.clipboard.writeText(window.location.href);
      showToast("链接已复制");
    }
  } catch {
    showToast("分享已取消");
  }
});

initializeControls();
render();
