# 刷子游戏分享

一个面向 GitHub Pages 的静态游戏分享网站，主题是“刷子游戏分享 / 刷刷刷游戏推荐库”。

## 本地预览

直接打开 `index.html` 即可预览。也可以用任意静态服务器：

```bash
python3 -m http.server 8080
```

## 重新生成封面

封面是项目内的原创位图资产，不依赖外链图片：

```bash
python3 tools/generate_covers.py
```

## GitHub Pages 发布

仓库推送到 GitHub 后，`main` 分支会通过 `.github/workflows/pages.yml` 自动发布到 GitHub Pages。

GitHub 默认域名不是单独申请的，而是在 Pages 发布后自动生成：

- 用户或组织站点：`https://<用户名>.github.io/`
- 项目站点：`https://<用户名>.github.io/<仓库名>/`

如果要绑定自定义域名，需要先在域名注册商购买域名，然后在仓库 Settings → Pages 添加 Custom domain，并按 GitHub 提示配置 DNS。
