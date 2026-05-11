# GPT-image-2 Prompts for Contour Teaching Cards

> Project: 等高线地形图 3D 互动 HTML  
> Plan source: `E:\agent\finalyouhuaditu.md`  
> Rule: GPT 图片只做教材参考卡，不作为高度图、几何数据或 3D 地形来源。

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

## A1_peak

- Date:
- Tool: Codex image generation
- Raw file: `images/gpt-raw/A1_peak_raw.png`
- Processed file: `images/processed/A1_peak.webp`
- QC status: TODO
- Failed items:
- Final prompt source: `finalyouhuaditu.md` section `6.3 A1 山峰 / Peak`
- Final prompt:

```text
TODO: paste the final prompt used for the accepted A1 image.
```

- Re-prompt history:
  - Attempt 1:
  - Attempt 2:
- Notes:
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
- QC status: TODO
- Failed items:
- Final prompt source: `finalyouhuaditu.md` section `6.4 A2 盆地 / Depression Basin`
- Final prompt:

```text
TODO: paste the final prompt used for the accepted A2 image.
```

- Re-prompt history:
  - Attempt 1:
  - Attempt 2:
- Notes:
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
- QC status: TODO
- Failed items:
- Final prompt source: `finalyouhuaditu.md` section `6.5 A3 山脊 / Ridge`
- Final prompt:

```text
TODO: paste the final prompt used for the accepted A3 image.
```

- Re-prompt history:
  - Attempt 1:
  - Attempt 2:
- Notes:
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
- QC status: TODO
- Failed items:
- Final prompt source: `finalyouhuaditu.md` section `6.6 A4 山谷 / Valley`
- Final prompt:

```text
TODO: paste the final prompt used for the accepted A4 image.
```

- Re-prompt history:
  - Attempt 1:
  - Attempt 2:
- Notes:
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
- QC status: TODO
- Failed items:
- Final prompt source: `finalyouhuaditu.md` section `6.7 A5 鞍部 / Saddle`
- Final prompt:

```text
TODO: paste the final prompt used for the accepted A5 image.
```

- Re-prompt history:
  - Attempt 1:
  - Attempt 2:
- Notes:
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
- QC status: TODO
- Failed items:
- Final prompt source: `finalyouhuaditu.md` section `6.8 A6 陡崖 / Cliff`
- Final prompt:

```text
TODO: paste the final prompt used for the accepted A6 image.
```

- Re-prompt history:
  - Attempt 1:
  - Attempt 2:
- Notes:
- Required checks:
  - 可数出至少 3 条不同高度等高线重合。
  - 下方和上方海拔方向合理。
  - 有“陡崖”或等价中文标注。
  - 公式框清楚，不出现乱码。
  - 3D 插图是陡崖，不是普通陡坡。

