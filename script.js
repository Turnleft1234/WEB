const baseGames = [
  {
    id: "new-king-awakening",
    title: "新王觉醒",
    subtitle: "暗黑2重制版大型微变 Mod",
    category: "arpg",
    image: "assets/covers/new-king-awakening.png",
    platforms: ["PC"],
    session: "长线",
    team: "1-8",
    grind: 95,
    score: 9.4,
    updated: "2026-03-22",
    loop: "刷装备、研究配方、追传奇词条、打磨 Build",
    tags: ["暗黑2", "Mod", "传奇词条"],
    summary: "从「隔壁大王」官方资料站提取：大型微变 Mod，适配 3.0 客户端，以全新装备系统、配方公式和传奇词条驱动长期刷装。",
    reasons: ["原页定位为长期更新中的大型微变 Mod", "装备系统、配方公式和传奇词条都指向清晰的掉落追求", "暗黑2重制版底层循环成熟，适合长线 Build 优化"],
    tips: ["适合熟悉暗黑2重制版后再开荒", "优先记录核心配方和传奇词条来源"],
    url: "https://www.wolai.com/dnrCQwp7BWAznpGTGesbp8"
  },
  {
    id: "reign-of-terror-cw",
    title: "RoT 畅玩",
    subtitle: "恐怖黎明暗黑2复刻 Mod",
    category: "arpg",
    image: "assets/covers/reign-of-terror.png",
    platforms: ["PC"],
    session: "长线",
    team: "1-4",
    grind: 93,
    score: 9.3,
    updated: "2026-06-02",
    loop: "开荒推进、设置专精掉落、刷 Boss、重构词缀 Build",
    tags: ["恐怖黎明", "D2复刻", "专精掉落"],
    summary: "基于 RoT 畅玩非官方资料站提取：在恐怖黎明机制下游玩暗黑2复刻 Mod，包含职业、技能、地图、剧情、装备和符文，并通过畅玩改动缩短成型周期。",
    reasons: ["RoT 本体高仿复刻暗黑2，畅玩版在此基础上降低肝度并提升趣味性", "指定掉落和专精独立装备池让刷装目标更明确", "新词缀体系、世界 Boss、隐藏 Boss 和高档位内容支撑长线 Build 追求"],
    tips: ["先读入坑指南，再按最新整合包安装", "用指定掉落和魔晶兑换系统缩短开荒到成型的距离"],
    url: "https://RoT.GrimDawn.cn"
  },
  {
    id: "rune-abyss",
    title: "符文深渊",
    subtitle: "赛季制刷装 ARPG",
    category: "arpg",
    image: "assets/covers/loot-forge.png",
    platforms: ["PC", "主机"],
    session: "长线",
    team: "1-4",
    grind: 96,
    score: 9.2,
    updated: "2026-06-10",
    loop: "刷图掉落、词缀鉴定、Build 成型",
    tags: ["赛季", "装备词缀", "BD"],
    summary: "适合喜欢反复优化装备和技能联动的玩家，单人推进和组队速刷都能成立。",
    reasons: ["掉落反馈密集，装备筛选有明确目标", "赛季重开成本可控，流派变化明显", "后期地图词缀能持续制造挑战"],
    tips: ["适合固定晚间长刷", "建议用笔记记录核心词缀"]
  },
  {
    id: "starfall-contract",
    title: "星落合约",
    subtitle: "合作射击刷本",
    category: "shooter",
    image: "assets/covers/starfall-raid.png",
    platforms: ["PC", "主机"],
    session: "中等",
    team: "2-4",
    grind: 88,
    score: 8.8,
    updated: "2026-06-09",
    loop: "接合约、清据点、回收稀有模组",
    tags: ["合作", "模组", "副本"],
    summary: "每局目标清晰，装备模组带来足够的长期追求，适合朋友固定车队。",
    reasons: ["单局节奏紧凑，失败也有材料收益", "职业配合明显，队伍构筑有空间", "高难合约需要路线和资源管理"],
    tips: ["适合两到四人语音", "优先培养一套通用控场配置"]
  },
  {
    id: "rootcraft-frontier",
    title: "根须边境",
    subtitle: "采集建造生存",
    category: "survival",
    image: "assets/covers/rootcraft.png",
    platforms: ["PC"],
    session: "长线",
    team: "1-8",
    grind: 82,
    score: 8.5,
    updated: "2026-06-07",
    loop: "采集、建造、科技解锁、据点扩张",
    tags: ["生存", "基地", "材料"],
    summary: "资源路线和基地规划是核心，适合把收集效率和空间布局一起优化。",
    reasons: ["材料层级清楚，扩张目标稳定", "基地建造能沉淀长期成果", "多人分工后效率提升明显"],
    tips: ["适合周末长时间推进", "先规划仓储，再推进自动化"]
  },
  {
    id: "neon-crypt",
    title: "霓虹墓穴",
    subtitle: "短局肉鸽刷词条",
    category: "roguelite",
    image: "assets/covers/neon-crypt.png",
    platforms: ["PC", "主机", "移动端"],
    session: "短局",
    team: "1",
    grind: 79,
    score: 8.3,
    updated: "2026-06-08",
    loop: "十分钟冲层、拾取芯片、解锁角色",
    tags: ["短局", "解锁", "词条"],
    summary: "启动成本低，适合碎片时间刷角色和芯片组合。",
    reasons: ["单局变化快，失败重开压力小", "角色成长和局内词条互相影响", "移动端也能完成完整循环"],
    tips: ["适合通勤和睡前短刷", "优先解锁能改变开局节奏的芯片"]
  },
  {
    id: "mech-hunt",
    title: "机甲狩猎线",
    subtitle: "Boss 材料刷装",
    category: "shooter",
    image: "assets/covers/mech-hunt.png",
    platforms: ["PC", "主机"],
    session: "中等",
    team: "1-4",
    grind: 91,
    score: 8.9,
    updated: "2026-06-06",
    loop: "狩猎 Boss、拆解部件、打造机体",
    tags: ["Boss", "部件", "配装"],
    summary: "把 Boss 行为学习、部件掉落和机体搭配结合在一起，重复挑战价值很高。",
    reasons: ["每个目标都有明确掉落池", "武器和机体部件能形成不同打法", "高阶狩猎考验走位和队伍职责"],
    tips: ["适合反复练同一只 Boss", "缺材料时先做部位破坏路线"]
  },
  {
    id: "relic-garden",
    title: "遗物农场",
    subtitle: "经营收集循环",
    category: "sim",
    image: "assets/covers/relic-farm.png",
    platforms: ["PC", "移动端"],
    session: "短局",
    team: "1",
    grind: 74,
    score: 8.1,
    updated: "2026-06-05",
    loop: "种植、探险、修复遗物、扩建展馆",
    tags: ["经营", "收集", "轻量"],
    summary: "节奏温和但目标很多，适合每天上线收资源、补图鉴和优化产线。",
    reasons: ["每日循环稳定，不需要高强度操作", "图鉴和展馆提供长期收集目标", "轻量经营适合移动端碎片时间"],
    tips: ["适合低压力长期游玩", "优先升级影响离线收益的设施"]
  }
];

const categoryNames = {
  arpg: "ARPG",
  shooter: "射击",
  survival: "生存",
  roguelite: "肉鸽",
  sim: "经营",
  community: "投稿"
};

const COMMENTS_PATH = "data/comments.json";
const COMMENTS_REPO = "Turnleft1234/WEB";
const MAX_COMMENT_LENGTH = 100;

const state = {
  genre: "all",
  platforms: new Set(["PC", "主机", "移动端"]),
  session: "all",
  query: "",
  sort: "score",
  activeGameId: null,
  commentsByGame: {}
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

function getAllComments() {
  return state.commentsByGame;
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
  return getAllComments()[gameId] || [];
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

function renderFeatured(games) {
  const game = games[0];
  if (!game) {
    els.featured.hidden = true;
    return;
  }

  els.featured.hidden = false;
  els.featured.innerHTML = `
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
  `;
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

  state.activeGameId = id;
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
  state.activeGameId = null;
  els.dialog.close();
});

els.dialog.addEventListener("click", (event) => {
  if (event.target === els.dialog) {
    state.activeGameId = null;
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
  const category = formData.get("category").toString();

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

render();
