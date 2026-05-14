# GPT-image-2 Prompts for Contour Teaching Cards

> Project: 等高线地形图 3D 互动 HTML  
> Plan source: `E:\agent\finalyouhuaditu.md`  
> Rule: GPT 图片只做教材参考卡，不作为高度图、几何数据或 3D 地形来源。

## A1-A6 入库记录

- Date: 2026-05-11
- Tool: Codex built-in image generation
- QC status: PASS for first classroom prototype
- Re-prompt history: none
- Notes: A1-A6 均按 `finalyouhuaditu.md` 第 6.3-6.8 节完整 prompt 生成；实际提交到网页的是 `images/processed/*.webp`，原始 PNG 保留在 `images/gpt-raw/`。

| Card | Raw file | Processed file | QC summary |
|---|---|---|---|
| A1_peak | `images/gpt-raw/A1_peak_raw.png` | `images/processed/A1_peak.webp` | 闭合环线、中心高、山峰插图清楚 |
| A2_basin | `images/gpt-raw/A2_basin_raw.png` | `images/processed/A2_basin.webp` | 闭合环线、中心低、示坡线向内 |
| A3_ridge | `images/gpt-raw/A3_ridge_raw.png` | `images/processed/A3_ridge.webp` | 山脊线与分水含义清楚 |
| A4_valley | `images/gpt-raw/A4_valley_raw.png` | `images/processed/A4_valley.webp` | 山谷线、水流箭头和低值流向清楚 |
| A5_saddle | `images/gpt-raw/A5_saddle_raw.png` | `images/processed/A5_saddle.webp` | 两峰与中间鞍部关系清楚 |
| A6_cliff | `images/gpt-raw/A6_cliff_raw.png` | `images/processed/A6_cliff.webp` | 多条等高线重合和陡崖公式清楚 |

### 实际生成源文件

```text
A1_peak_raw.png  <- C:\Users\xl\.codex\generated_images\019e15a9-2bfb-7261-8a81-6ba133d963a2\ig_00a2c8e67f6af560016a017fe181c48191a3dc52abd5314853.png
A2_basin_raw.png <- C:\Users\xl\.codex\generated_images\019e15a9-2bfb-7261-8a81-6ba133d963a2\ig_00a2c8e67f6af560016a0181e4d1fc81919841763c8af8f098.png
A3_ridge_raw.png <- C:\Users\xl\.codex\generated_images\019e15a9-2bfb-7261-8a81-6ba133d963a2\ig_00a2c8e67f6af560016a0182606e308191901a8b2bce1af3f3.png
A4_valley_raw.png <- C:\Users\xl\.codex\generated_images\019e15a9-2bfb-7261-8a81-6ba133d963a2\ig_00a2c8e67f6af560016a0182cf36b48191ba42d33f859bb275.png
A5_saddle_raw.png <- C:\Users\xl\.codex\generated_images\019e15a9-2bfb-7261-8a81-6ba133d963a2\ig_00a2c8e67f6af560016a018336adb481918f7d14d7ca1e7023.png
A6_cliff_raw.png <- C:\Users\xl\.codex\generated_images\019e15a9-2bfb-7261-8a81-6ba133d963a2\ig_00a2c8e67f6af560016a0183b12b788191897144befbf4f274.png
```

## B1-B5、C1 入库记录

- Date: 2026-05-11
- Tool: Codex built-in image generation
- QC status: PASS for first classroom prototype
- Re-prompt history: none
- Notes: B1-B5、C1 均按本轮“新教学模式扩展”计划生成；页面使用 `images/processed/*.webp`，原始 PNG 保留在 `images/gpt-raw/`。

| Card | Raw file | Processed file | QC summary |
|---|---|---|---|
| B1_plain | `images/gpt-raw/B1_plain_raw.png` | `images/processed/B1_plain.webp` | 低于 200m、等高线稀疏且近直线，平原地貌清楚 |
| B2_hills | `images/gpt-raw/B2_hills_raw.png` | `images/processed/B2_hills.webp` | 200-500m 闭合小丘，多处圆缓丘陵，线距适中 |
| B3_mountain | `images/gpt-raw/B3_mountain_raw.png` | `images/processed/B3_mountain.webp` | 高于 500m、等高线密集，双峰、深谷和山脊清楚 |
| B4_plateau | `images/gpt-raw/B4_plateau_raw.png` | `images/processed/B4_plateau.webp` | 高原面稀疏、边缘密集，平顶高地与陡缘标注清楚 |
| B5_large_basin | `images/gpt-raw/B5_large_basin_raw.png` | `images/processed/B5_large_basin.webp` | 四周高中心低，向心水系和盆地中心标注清楚 |
| C1_reservoir_site | `images/gpt-raw/C1_reservoir_site_raw.png` | `images/processed/C1_reservoir_site.webp` | 窄口宽肚，坝线横跨河谷窄口，库区在上游 |

### 实际生成源文件

```text
B1_plain_raw.png <- C:\Users\xl\.codex\generated_images\019e15a9-2bfb-7261-8a81-6ba133d963a2\ig_058bbd775f5066a9016a018d3ebd3081918b1b929819446e3c.png
B2_hills_raw.png <- C:\Users\xl\.codex\generated_images\019e15a9-2bfb-7261-8a81-6ba133d963a2\ig_058bbd775f5066a9016a018da27d2081919ce4ac1ba04546ea.png
B3_mountain_raw.png <- C:\Users\xl\.codex\generated_images\019e15a9-2bfb-7261-8a81-6ba133d963a2\ig_058bbd775f5066a9016a018e123f0481919ac30c2b3586723d.png
B4_plateau_raw.png <- C:\Users\xl\.codex\generated_images\019e15a9-2bfb-7261-8a81-6ba133d963a2\ig_058bbd775f5066a9016a018e9934c081918d2551bcb81433e5.png
B5_large_basin_raw.png <- C:\Users\xl\.codex\generated_images\019e15a9-2bfb-7261-8a81-6ba133d963a2\ig_058bbd775f5066a9016a018f1013fc8191a2f71f0ae710892f.png
C1_reservoir_site_raw.png <- C:\Users\xl\.codex\generated_images\019e15a9-2bfb-7261-8a81-6ba133d963a2\ig_058bbd775f5066a9016a018f7fd75481918aad97fce8c01305.png
```

## 全局 QC 清单

- 数值单调性：海拔值沿预期方向单调变化。
- 部位诊断正确：山峰中心高、盆地中心低、山脊凸低、山谷凸高、陡崖重合。
- 等高距纪律：同一张图保持统一等高距，必要变化必须能教学解释。
- 计曲线可见：关键或每五条等高线略粗，适合投屏。
- 数字可读：海拔数字清晰，不压住主线。
- 中文策略正确：中文注释准确、简洁、可读。
- 真实图与等高线一致：插图地貌与主图诊断一致。
- 真实感服务教学：纹理、水系、植被不能遮挡等高线与数字。
- 无多余要素：不出现随机地名、城市、道路、水印、复杂图例。
- 构图比例正确：主图约 65%-70%，真实地貌参考约 25%-30%。
- 高考可迁移：对应明确考点，不只追求“好看”。

## C2-C5 后期手动生成计划

> 当前阶段不生成新图。C2-C5 先使用网页内的解析函数临时卡，后期用 GPT-image-2 手动生成后放入 `images/gpt-raw/`，压缩为 `images/processed/*.webp`。

### 统一风格关键词

```text
高中地理等高线教学参考卡、真实地貌案例感、米色教材纸张、棕色等高线、清晰海拔数字、右侧小型斜视地貌插图、中文标签简洁清楚、主图占 65%-70%、插图占 25%-30%、无水印、无随机地名、适合课堂投屏
```

### C2_road_route

- Raw file: `images/gpt-raw/C2_road_route_raw.png`
- Processed file: `images/processed/C2_road_route.webp`
- QC status: PLANNED
- Prompt keywords:

```text
等高线地形图、公路线沿等高线绕行、避开陡坡和深切河谷、缓坡路线用橙色线标出、危险陡坡用淡红遮罩、标注“沿等高线”“避开陡坡”“跨谷需桥涵”
```

### C3_campsite_site

- Raw file: `images/gpt-raw/C3_campsite_site_raw.png`
- Processed file: `images/processed/C3_campsite_site.webp`
- QC status: PLANNED
- Prompt keywords:

```text
山谷河流、缓坡高地、宿营地选在高地缓坡、避开河谷洪水线和陡崖、蓝色河流、绿色安全营地区、红色危险区、标注“高地缓坡”“远离河谷”“避开陡崖”
```

### C4_agriculture_layout

- Raw file: `images/gpt-raw/C4_agriculture_layout_raw.png`
- Processed file: `images/processed/C4_agriculture_layout.webp`
- QC status: PLANNED
- Prompt keywords:

```text
低缓平地种植区、丘陵林牧区、低洼水产区、等高线稀疏处适合耕作、坡地适合林牧、水域低洼适合水产、三块半透明分区色块、标注“种植区”“林牧区”“水产区”
```

### C5_water_diversion

- Raw file: `images/gpt-raw/C5_water_diversion_raw.png`
- Processed file: `images/processed/C5_water_diversion.webp`
- QC status: PLANNED
- Prompt keywords:

```text
引水线路、起点为高处稳定水源或水库边缘、终点为低处农田或居民点、蓝色引水线沿等高线缓慢下降、红色不可行陡坡段、绿色受水区、箭头表示水流方向、标注“水源点”“引水线路”“受水区”“避开陡坡”
```

## 静态水流与后续流域识别方案

- 当前网页保留静态水流箭头，不做粒子动画。
- 山谷：箭头沿谷线向低处汇流，说明“凸高为谷，谷中常有水流”。
- 山脊：两侧短箭头背离山脊线，说明分水岭。
- 盆地/大盆地：四周箭头向中心低地汇集，说明向心水系。
- 水库坝址：箭头沿河谷穿过窄口，坝线横跨窄口，上游形成库区。
- 后续算法：基于 `heightAt()` 建静态采样网格，每个格点取 8 邻域最低点作为流向；无更低点时标记汇水终点；相邻格点流向不同终点的边界近似为分水线；从出口点反向追踪流入格点得到集水范围；先只做 Canvas 2D 覆盖。

## A1_peak

- Date:
- Tool: Codex image generation
- Raw file: `images/gpt-raw/A1_peak_raw.png`
- Processed file: `images/processed/A1_peak.webp`
- QC status: PASS
- Failed items: none
- Final prompt source: `finalyouhuaditu.md` section `6.3 A1 山峰 / Peak`
- Final prompt:

```text
Use the complete prompt in `finalyouhuaditu.md` section `6.3 A1 山峰 / Peak`, wrapped with:
Use case: scientific-educational
Asset type: high school geography contour teaching reference card
```

- Re-prompt history:
  - Attempt 1:
  - Attempt 2:
- Notes: First accepted image. Values increase toward the center; 3D inset is a raised peak.
- Required checks:
  - 等高线闭合且嵌套。
  - 海拔数字向中心单调递增。
  - 中心有峰顶或高程点标记。
  - 3D 插图是凸起山峰，不是洼地。
  - 主图约 70%，插图约 25%。

## A2_basin

- Date:
- Tool: Codex image generation
- Raw file: `images/gpt-raw/A2_basin_raw.png`
- Processed file: `images/processed/A2_basin.webp`
- QC status: PASS
- Failed items: none
- Final prompt source: `finalyouhuaditu.md` section `6.4 A2 盆地 / Depression Basin`
- Final prompt:

```text
Use the complete prompt in `finalyouhuaditu.md` section `6.4 A2 盆地 / Depression Basin`, wrapped with:
Use case: scientific-educational
Asset type: high school geography contour teaching reference card
```

- Re-prompt history:
  - Attempt 1:
  - Attempt 2:
- Notes: First accepted image. Values decrease toward the center; inward hachures are visible.
- Required checks:
  - 等高线向中心闭合。
  - 海拔数字向中心单调递减。
  - 示坡线在内侧并指向中心低处。
  - 3D 插图是凹碗状盆地。
  - 中文注释清晰，无乱码和伪造地名。

## A3_ridge

- Date:
- Tool: Codex image generation
- Raw file: `images/gpt-raw/A3_ridge_raw.png`
- Processed file: `images/processed/A3_ridge.webp`
- QC status: PASS
- Failed items: none
- Final prompt source: `finalyouhuaditu.md` section `6.5 A3 山脊 / Ridge`
- Final prompt:

```text
Use the complete prompt in `finalyouhuaditu.md` section `6.5 A3 山脊 / Ridge`, wrapped with:
Use case: scientific-educational
Asset type: high school geography contour teaching reference card
```

- Re-prompt history:
  - Attempt 1:
  - Attempt 2:
- Notes: First accepted image. Ridge axis and watershed arrows are legible.
- Required checks:
  - 弯曲顶点朝低值方向。
  - 脊轴沿弯曲顶点延伸。
  - 两侧有分水含义。
  - 3D 插图是凸起长脊。
  - 数字不混乱，方向不自相矛盾。

## A4_valley

- Date:
- Tool: Codex image generation
- Raw file: `images/gpt-raw/A4_valley_raw.png`
- Processed file: `images/processed/A4_valley.webp`
- QC status: PASS
- Failed items: none
- Final prompt source: `finalyouhuaditu.md` section `6.6 A4 山谷 / Valley`
- Final prompt:

```text
Use the complete prompt in `finalyouhuaditu.md` section `6.6 A4 山谷 / Valley`, wrapped with:
Use case: scientific-educational
Asset type: high school geography contour teaching reference card
```

- Re-prompt history:
  - Attempt 1:
  - Attempt 2:
- Notes: First accepted image. Valley axis and downstream flow arrows are legible.
- Required checks:
  - 弯曲顶点朝高值方向。
  - 水流箭头朝低值方向。
  - 水流方向与等高线凸出方向相反。
  - 3D 插图是凹谷。
  - 数字清楚且不矛盾。

## A5_saddle

- Date:
- Tool: Codex image generation
- Raw file: `images/gpt-raw/A5_saddle_raw.png`
- Processed file: `images/processed/A5_saddle.webp`
- QC status: PASS
- Failed items: none
- Final prompt source: `finalyouhuaditu.md` section `6.7 A5 鞍部 / Saddle`
- Final prompt:

```text
Use the complete prompt in `finalyouhuaditu.md` section `6.7 A5 鞍部 / Saddle`, wrapped with:
Use case: scientific-educational
Asset type: high school geography contour teaching reference card
```

- Re-prompt history:
  - Attempt 1:
  - Attempt 2:
- Notes: First accepted image. Two summits and the lower saddle pass are legible.
- Required checks:
  - 有两套独立闭合等高线。
  - 两个峰之间有低缓鞍点。
  - 鞍点不是最低盆地，也不是最高峰顶。
  - 3D 插图呈马鞍形。
  - 红线和蓝色排水箭头关系清楚。

## A6_cliff

- Date:
- Tool: Codex image generation
- Raw file: `images/gpt-raw/A6_cliff_raw.png`
- Processed file: `images/processed/A6_cliff.webp`
- QC status: PASS
- Failed items: none
- Final prompt source: `finalyouhuaditu.md` section `6.8 A6 陡崖 / Cliff`
- Final prompt:

```text
Use the complete prompt in `finalyouhuaditu.md` section `6.8 A6 陡崖 / Cliff`, wrapped with:
Use case: scientific-educational
Asset type: high school geography contour teaching reference card
```

- Re-prompt history:
  - Attempt 1:
  - Attempt 2:
- Notes: First accepted image. Overlapping contour band and cliff formula are legible.
- Required checks:
  - 可数出至少 3 条不同高度等高线重合。
  - 下方和上方海拔方向合理。
  - 有“陡崖”或等价中文标注。
  - 公式框清楚，不出现乱码。
  - 3D 插图是陡崖，不是普通陡坡。
