const baseGames = [
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

const state = {
  genre: "all",
  platforms: new Set(["PC", "主机", "移动端"]),
  session: "all",
  query: "",
  sort: "score"
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
      <button class="primary-button" type="button" data-open="${game.id}">查看详情</button>
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
              <button class="text-button" type="button" data-open="${game.id}">详情</button>
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

function openGame(id) {
  const game = findGame(id);
  if (!game) return;

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
  if (opener) openGame(opener.dataset.open);
});

els.closeDialog.addEventListener("click", () => {
  els.dialog.close();
});

els.dialog.addEventListener("click", (event) => {
  if (event.target === els.dialog) els.dialog.close();
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
