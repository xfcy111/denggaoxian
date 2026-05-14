# denggaoxian

等高线地形图 3D 互动教学单页。源码入口是 `contour.html` 和 `terrain-core.js`，发布入口是仓库根目录生成的 `denggaoxian.html`。

## 本地使用

直接双击 `contour.html` 可以查看源码版页面。源码版会读取 `terrain-core.js` 和 `images/processed/*.webp`。

生成单文件发布版：

```powershell
npm run build:single
```

生成后直接打开 `denggaoxian.html`。这个文件已经内联教学核心、Three.js 和已有参考图；联网时会继续尝试加载 MapLibre 在线真实地形，失败时回退本地地形模型。

## 测试

```powershell
npm test
```

测试会验证核心地形算法、HTML 教学功能挂载点，以及单文件构建结果。

## 上传与发布

首次创建公开仓库并推送：

```powershell
git branch -M main
gh repo create xfcy111/denggaoxian --public --source=. --remote=origin --push --description "等高线地形图 3D 互动教学单页"
```

GitHub Pages 设置：

1. 打开 `https://github.com/xfcy111/denggaoxian`
2. 进入 `Settings` -> `Pages`
3. Source 选 `Deploy from a branch`
4. Branch 选 `main`，Folder 选 `/root`
5. 发布后访问 `https://xfcy111.github.io/denggaoxian/denggaoxian.html`

## 在线数据约束

页面里的在线数据配置只放公开、无密钥、允许浏览器跨域访问的数据源。任意网页抓取、私密密钥和绕过 CORS 的逻辑不放进单 HTML；如以后需要，可以另建 Worker 或后端代理。
