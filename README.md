# 刷子游戏分享

一个面向 GitHub Pages 的静态游戏分享网站，主题是“刷子游戏分享 / 刷刷刷游戏推荐库”。

## 项目结构

```text
.
├── assets/covers/        # 站点封面与备用位图素材
├── data/
│   ├── catalog.js        # 基础游戏数据、分类配置、平台配置
│   └── comments.json     # 所有访客可见的留言数据
├── tools/
│   └── generate_covers.py
├── index.html            # 页面骨架
├── script.js             # 前端交互、渲染、留言与投稿逻辑
├── styles.css            # 页面样式
└── README.md
```

## 数据与配置

- 基础游戏数据集中维护在 `data/catalog.js`
- 类型按钮、平台复选框、投稿类型下拉都由 `data/catalog.js` 中的统一配置生成
- 社区投稿仍保存在浏览器 `localStorage` 中，不会自动写回仓库
- 公共留言通过 `data/comments.json` 提供，并由 GitHub Actions 同步更新

## 本地预览

直接打开 `index.html` 即可预览。也可以用任意静态服务器：

```bash
python3 -m http.server 8080
```

## 重新生成封面

当前页面使用的程序化封面只有 `community-cache.png`；`new-king-awakening.png` 与 `reign-of-terror.png` 来自各游戏资料站，不会被脚本覆盖。脚本同时保留了若干备用封面素材的生成能力：

```bash
python3 tools/generate_covers.py
```

## GitHub Pages 发布

仓库推送到 GitHub 后，`main` 分支会通过 `.github/workflows/pages.yml` 自动发布到 GitHub Pages。

当前线上地址：

- **https://turnleft1234.github.io/WEB/**

GitHub 默认域名格式：

- 用户或组织站点：`https://<用户名>.github.io/`
- 项目站点：`https://<用户名>.github.io/<仓库名>/`

如果要绑定自定义域名，需要先在域名注册商购买域名，然后在仓库 Settings → Pages 添加 Custom domain，并按 GitHub 提示配置 DNS。

## 游戏留言

留言保存在 `data/comments.json`，随 `main` 分支部署后对所有访客可见。

发表流程：

1. 在游戏详情弹窗填写留言（最多 100 字）并点击「提交留言」
2. 在打开的 GitHub Issue 页面确认提交（需 GitHub 账号）
3. Actions 自动将留言写入 `data/comments.json` 并推送到 `main`
4. 站点重新部署后，所有用户即可看到该留言

## 最近整理

- 将基础游戏数据从 `script.js` 拆分到 `data/catalog.js`
- 统一类型和平台配置来源，减少 HTML 与脚本重复维护
- 修正 `sitemap.xml` 与 `robots.txt` 的线上地址配置
- 保持现有页面交互不变，仅做低风险结构优化

## 变更记录

| 时间 | 变更内容 |
|------|----------|
| 2026-06-14 | 拆分基础游戏数据到 `data/catalog.js`，统一类型与平台配置来源；修正 `sitemap.xml` 与 `robots.txt`；更新 README 文档。 |
| 2026-06-11 | 留言区改为读取仓库内 `data/comments.json`；通过 GitHub Issue 触发 Actions 写入代码并部署，所有访客可见。 |
| 2026-06-11 | 在游戏详情弹窗新增留言区：单条最多 100 字。 |
| 2026-06-11 | 新增「新王觉醒」「RoT 畅玩」两款 Mod 推荐，使用资料站封面图；在精选区、游戏卡片和详情弹窗增加「前往资料站」外链（分别跳转 [wolai 资料页](https://www.wolai.com/dnrCQwp7BWAznpGTGesbp8)、[RoT 畅玩站](https://RoT.GrimDawn.cn)）；修复「前往」按钮文字垂直居中。 |
| 2026-06-11 | 完善 GitHub Pages 自动部署工作流配置。 |
| 2026-06-10 | 初始化项目：静态游戏推荐站（筛选、排序、详情弹窗、本地投稿）、7 款示例游戏、程序化封面生成工具、PWA 清单与 SEO 基础文件。 |
