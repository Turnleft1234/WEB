# 刷子游戏分享

一个面向 GitHub Pages 的静态游戏分享网站，主题是“刷子游戏分享 / 刷刷刷游戏推荐库”。

## 本地预览

直接打开 `index.html` 即可预览。也可以用任意静态服务器：

```bash
python3 -m http.server 8080
```

## 重新生成封面

封面以项目内位图资产为主；`new-king-awakening.png` 与 `reign-of-terror.png` 来自各游戏资料站，不会被脚本覆盖。其余封面可重新生成：

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

## 变更记录

| 时间 | 变更内容 |
|------|----------|
| 2026-06-11 | 在游戏详情弹窗新增留言区：无需登录即可发表，单条最多 100 字，留言按游戏保存在浏览器 localStorage。 |
| 2026-06-11 | 新增「新王觉醒」「RoT 畅玩」两款 Mod 推荐，使用资料站封面图；在精选区、游戏卡片和详情弹窗增加「前往资料站」外链（分别跳转 [wolai 资料页](https://www.wolai.com/dnrCQwp7BWAznpGTGesbp8)、[RoT 畅玩站](https://RoT.GrimDawn.cn)）；修复「前往」按钮文字垂直居中。 |
| 2026-06-11 | 完善 GitHub Pages 自动部署工作流配置。 |
| 2026-06-10 | 初始化项目：静态游戏推荐站（筛选、排序、详情弹窗、本地投稿）、7 款示例游戏、程序化封面生成工具、PWA 清单与 SEO 基础文件。 |
