# 等高线地形图 3D 互动 HTML 最终优化计划

> 文件用途：在 `planditu-v2.md` 的基础上，进一步补齐 GPT-image-2 教材参考卡关键词库，并把 Codex 内图像资产工作流嵌入完整九阶段开发计划。  
> 创建日期：2026-05-11  
> 计划文件位置：`E:\agent\finalyouhuaditu.md`  
> 最终实现路径：`E:\agent\contour.html`  
> 核心定位：教师大屏讲解优先、完整九阶段路线、双视觉模式、GPT 图片只做教材参考卡。

---

## 一、总目标与可行性结论

本项目要做的是面向中国高中地理“地球与地图”专题中“等高线地形图”的 3D 可互动教学 HTML。它的核心价值不是单纯展示漂亮地形，而是让学生在高考题所要求的平面等高线图与真实三维地形之间建立稳定映射。

可行性结论如下：

1. **主架构可行**：继续采用 `planditu-v2.md` 已确定的“解析地形函数 `h(x,z)` 作为唯一几何真源”路线。Three.js 3D 地形、Canvas 2D 等高线、剖面图、通视、水流和计算结果都从同一函数派生。
2. **GPT-image-2 的职责要收窄**：GPT-image-2 只生成教材级静态参考卡，不生成高度图、不承担几何数据、不作为 3D 地形来源。
3. **完整九阶段推进**：总计划覆盖部位判读、剖面、通视、水流、选址和题型迁移；但第 1-4 阶段必须先形成可独立试讲的课堂闭环。
4. **教师大屏优先**：默认界面以清爽教辅风格为主，控件少而清晰；另提供自然地理科技感主题用于项目展示。
5. **图像生成必须可复现**：每张 GPT 图都要保存 prompt、原图、处理图、QC 记录和重抽原因，避免后期图片风格与知识点失控。

---

## 二、高考知识任务链

### 2.1 基本概念链

教学目标：让学生理解等高线不是“地图装饰线”，而是同一海拔水平面切割地形后得到的交线。

对应互动：

- 水平切面自下而上穿过 3D 地形。
- 切面与地形相交处实时显线。
- 切面停止后，所有历史交线组成右侧 2D 等高线图。

### 2.2 地形部位判读链

核心部位：

- 山峰：闭合等高线，中间高、四周低。
- 盆地/洼地：闭合等高线，中间低、四周高，示坡线指向低处。
- 山脊：等高线凸向低值方向，常为分水岭。
- 山谷：等高线凸向高值方向，常发育河流。
- 鞍部：两个山顶或两个山谷之间的较低、较平坦部位。
- 陡崖：多条不同高度等高线重合。

对应互动：

- 左侧 GPT 教材参考卡。
- 中间 3D 地形旋转观察。
- 右侧 2D 等高线卷面图。
- 一键口诀验证：“凸高为谷，凸低为脊”“大于大的，小于小的”“密陡疏缓”。

### 2.3 计算判读链

必须覆盖：

- 两点相对高度：`H相 = H高 - H低`
- 陡崖相对高度：`(n-1)d <= H < (n+1)d`
- 崖顶高度：`H大 <= H顶 < H大 + d`
- 崖底高度：`H小 - d < H底 <= H小`
- 气温垂直递减率：`0.6 deg C / 100m`
- 闭合等高线规律：“大于大的，小于小的”

对应互动：

- 鼠标点击两点实时显示海拔差。
- 陡崖模式可数出重合等高线条数 `n`。
- 弹出公式卡并把 `n`、`d`、`H大`、`H小` 自动填入。

### 2.4 剖面与通视链

必须覆盖：

- 剖面图绘制五步法：定线、建坐标、定比例尺、描点、连线。
- 通视判断：先看整体阻挡，再看凹坡/凸坡，再看是否穿越沟谷。
- 凹坡：从高处向低处等高线先密后疏，通视条件较好。
- 凸坡：从高处向低处等高线先疏后密，常遮挡视线。

对应互动：

- 拖动剖面线，右侧生成剖面图。
- 选择观察点和目标点，显示视线是否被地形阻挡。
- 阻挡点用红色标记，通视线用绿色，不通视用红色。

### 2.5 河流与水系链

必须覆盖：

- 河流从高处流向低处。
- 河流发育于山谷，流向与等高线凸出方向相反。
- 山脊为分水岭，山谷为集水线。
- 等高线密集处河流流速大，水能资源丰富，陡崖处可能形成瀑布。
- 盆地常形成向心状水系，山地常形成放射状水系。

对应互动：

- 水流粒子沿负梯度流动。
- 山脊两侧粒子分流，山谷粒子汇流。
- 自动高亮分水岭、集水线和可能瀑布点。

### 2.6 工程与生活选址链

必须覆盖：

- 水库坝址：峡谷窄口，工程量小；上游口袋形洼地或盆地，库容大。
- 公路/铁路：坡度平缓，尽量沿等高线，避开陡崖和陡坡。
- 引水线路：从高处向低处自流，路线尽可能短，避开山脊障碍。
- 宿营地：避开河谷、河边、陡崖、陡坡，选地势较高的缓坡或鞍部。
- 港口：陆地平坦开阔，水域等深线密集，避风浪。
- 农业布局：平原宜种植，山区宜林牧，水域宜水产。

对应互动：

- 学生拖拽坝址、公路线、宿营点。
- 系统给出“适合 / 不适合”与地理原因。
- 教师模式可直接显示标准答案逻辑。

---

## 三、总体产品结构

### 3.1 主界面布局

桌面端采用三联视图：

```text
┌───────────────┬───────────────────────┬─────────────────┐
│ GPT参考卡     │ Three.js 3D地形        │ 2D等高线卷面图  │
│ 教材式应然图  │ 可旋转、可叠等高线     │ 高考题视角      │
└───────────────┴───────────────────────┴─────────────────┘
```

教师大屏默认：

- 顶部：当前知识点、模式切换、演示步骤。
- 左栏：GPT 教材参考卡，图片内保留中文注释，CSS 可补充或纠错标签。
- 中栏：3D 地形，默认大视口。
- 右栏：2D 等高线图、剖面图或计算面板。
- 底部：口诀卡、比例尺、等高距、当前讲解提示。

移动端降级：

- 默认只显示 3D+等高线叠加视图。
- 参考图、2D 等高线、剖面、参数滑块用底部 Tab 切换。
- 地形网格从 200x200 自动降到 100x100。

### 3.2 双视觉模式

#### 高考教辅清爽模式

默认模式。特点：

- 米白背景、棕色等高线、黑色数字。
- 大字号中文讲解，适合投屏。
- 控件数量少，强调“读图”和“解题”。

#### 自然地理科技感模式

展示模式。特点：

- 深色背景、地形高程色带、半透明 UI。
- 更适合项目演示和吸引注意。
- 不替代教辅模式，只作为主题切换。

---

## 四、技术架构决策

### 4.1 唯一几何真源

所有核心互动都基于解析地形函数：

```js
height = h(x, z, params)
```

它派生：

- 3D 网格顶点高度。
- 2D 等高线采样矩阵。
- 水平切面交线。
- 剖面图高度采样。
- 通视判断采样。
- 水流粒子梯度。
- 坡度热力图。

### 4.2 GPT 图像只做参考卡

GPT-image-2 生成的图片只承担以下职责：

- 帮助教师形成教材式讲解入口。
- 展示“真实地貌感 + 卷面等高线”的桥接材料。
- 让学生先获得真实案例体验，再回到等高线判读规则。
- 与 3D 实时地形进行对照。

GPT 图像不承担以下职责：

- 不作为高度图。
- 不从像素灰度反推 3D 地形。
- 不参与等高线计算。
- 不作为几何验算依据。

### 4.3 文件与资源路径

最终交付目录：

```text
E:\agent\
├── contour.html
├── images\
│   ├── gpt-raw\
│   ├── processed\
│   └── prompts.md
└── finalyouhuaditu.md
```

当前计划文件：

```text
E:\agent\finalyouhuaditu.md
```

---

## 五、九阶段实施路线

### 阶段 1：基础框架与等高线溯源

目标：让学生理解“线从哪来”。

交付：

- `contour.html` 基础结构。
- Three.js 场景、相机、光照、OrbitControls。
- 山峰解析地形。
- 水平切面动画。
- 切面交线历史轨迹。

课堂验收：

- 教师能用 3 分钟讲清：等高线是相同海拔点连成的闭合或延伸曲线。

### 阶段 2：六大地形部位解析函数

目标：形成核心判读库。

交付：

- 山峰、盆地、山脊、山谷、鞍部、陡崖六个函数。
- 地形切换菜单。
- 标准相机视角。
- 地形参数滑块。

课堂验收：

- 学生能说出每个地形部位的等高线特征。

### 阶段 3：2D 等高线卷面图

目标：让 3D 地形与高考试卷视角连起来。

交付：

- Canvas 2D 等高线。
- 计曲线加粗。
- 海拔数字自动标注。
- 盆地示坡线。
- 陡崖等高线合并显示。

课堂验收：

- 切到山脊、山谷时，学生能用“凸低为脊、凸高为谷”解释图像。

### 阶段 4：GPT-image-2 教材参考卡

目标：完成 A1-A6、B1-B5、C1 共 12 张静态教学图。

交付：

- `images/gpt-raw/` 原图。
- `images/processed/` 压缩图。
- `images/prompts.md` 最终 prompt 和 QC 记录。
- 网页左栏图片加载与必要的 CSS 中文标签补充。

课堂验收：

- 教师能在参考卡、3D 地形、2D 卷面图之间来回指认同一知识点。

### 阶段 5：口诀验证与俯视对照

目标：把口诀从死记硬背变成空间验证。

交付：

- 一键俯视对照。
- 点击 2D 等高线高亮 3D 对应位置。
- 口诀卡：“凸高为谷，凸低为脊”“密陡疏缓”“大于大的，小于小的”。

课堂验收：

- 学生能解释口诀成立的几何原因，而不是只背口诀。

### 阶段 6：剖面图与通视

目标：覆盖高考拉分题型。

交付：

- 剖面线拖拽。
- 剖面图自动生成。
- 凹坡/凸坡对比。
- 两点通视判断。
- 阻挡点标记。

课堂验收：

- 学生能按五步法描述剖面图绘制，并用剖面解释通视。

### 阶段 7：水流与水系

目标：把山脊/山谷判读迁移到河流题。

交付：

- 水流粒子。
- 山脊分水、山谷集水可视化。
- 河流流向箭头。
- 流域范围初步识别。

课堂验收：

- 学生能判断河流流向与等高线弯曲方向的关系。

### 阶段 8：应用场景

目标：覆盖水库、公路、宿营地、农业布局等综合题。

交付：

- 水库坝址模式。
- 公路选线模式。
- 宿营地选址模式。
- 引水线路模式。
- 农业布局提示。

课堂验收：

- 学生能用等高线图说明“为什么这个点/线/面适合或不适合”。

### 阶段 9：性能、移动端、课堂验证

目标：稳定进入真实教学使用。

交付：

- LOD 降采样。
- 移动端 Tab 降级。
- 主题切换。
- 浏览器兼容测试。
- 课堂试讲记录表。

课堂验收：

- 教师大屏流畅演示。
- 学生完成课前/课后对比题，能明显提升 2D 到 3D 的转译能力。

---

## 六、GPT-image-2 生图关键词库

### 6.1 统一生图原则

所有图片统一定位为“高中地理真实案例感等高线参考卡”。

核心取向：

- 不再追求过度简化的纯示意图。
- 每张图都要有接近真实地貌案例的空间体验，例如航拍感、斜视地形、自然纹理、水系、植被或裸露岩土。
- 真实感必须服务读图训练，不能压过等高线、海拔数字和关键地形诊断。
- GPT 图片仍然只做教学参考，不作为高度图、几何数据或 3D 地形来源。

统一风格关键词：

```text
realistic geography teaching case card, clear topographic contour overlay, real-world landform reference, square canvas, readable contour lines, precise elevation labels, natural terrain texture, aerial or oblique terrain feeling, small realistic 3D landform inset
```

统一构图：

```text
1024 x 1024 square PNG. Main area shows a clear topographic contour case map occupying about 65% to 70% of the canvas. A realistic oblique landform reference or 3D terrain inset occupies about 25% to 30% of the canvas on the right or in a clean corner. Leave clean margins for concise Chinese annotation text inside the image.
```

统一标注策略：

```text
Use concise Chinese annotation text inside the image, paired with Arabic elevation numbers. Chinese labels must be legible, accurate, and limited to geography terms needed for teaching; CSS labels may only supplement or correct them later.
```

统一线条：

```text
Brown or dark sepia contour lines over a subtle terrain-paper or lightly textured land surface. Consistent contour interval. Every fifth contour line is slightly thicker. Elevation numbers are clear, black, and placed in gaps on the contour lines.
```

统一禁用：

```text
No pure satellite screenshot. No pure landscape photo without contour teaching structure. No tourism postcard composition. No decorative fantasy mountains. No fake city names. No garbled or irrelevant Chinese text. No inconsistent elevation numbers. No watermark. No complex legend. Do not let terrain texture, shadows, vegetation, or color gradients obscure contour lines and elevation numbers.
```

### 6.2 文件命名与入库规则

```text
images/gpt-raw/A1_peak_raw.png
images/gpt-raw/A2_basin_raw.png
images/gpt-raw/A3_ridge_raw.png
images/gpt-raw/A4_valley_raw.png
images/gpt-raw/A5_saddle_raw.png
images/gpt-raw/A6_cliff_raw.png
images/gpt-raw/B1_plain_raw.png
images/gpt-raw/B2_hills_raw.png
images/gpt-raw/B3_mountain_raw.png
images/gpt-raw/B4_plateau_raw.png
images/gpt-raw/B5_large_basin_raw.png
images/gpt-raw/C1_reservoir_site_raw.png

images/processed/A1_peak.webp
images/processed/A2_basin.webp
images/processed/A3_ridge.webp
images/processed/A4_valley.webp
images/processed/A5_saddle.webp
images/processed/A6_cliff.webp
images/processed/B1_plain.webp
images/processed/B2_hills.webp
images/processed/B3_mountain.webp
images/processed/B4_plateau.webp
images/processed/B5_large_basin.webp
images/processed/C1_reservoir_site.webp
```

每张图片生成后，在 `images/prompts.md` 记录：

- 日期。
- 使用的完整 prompt。
- 生成结果文件名。
- 是否通过 QC。
- 失败项。
- 重抽 prompt。
- 最终采用原因。

### 6.3 A1 山峰 / Peak

教学用途：

- 讲解闭合等高线。
- 讲解“中间高、四周低”。
- 对应山峰、山顶、高程点。

中文关键词：

- 闭合等高线
- 中心高四周低
- 三角高程点
- 同心环
- 海拔向中心递增

English keywords:

- closed contour rings
- elevation increases toward center
- summit marker
- concentric contours
- textbook topographic map

完整 prompt：

```text
Create a realistic geography teaching case card for a single isolated mountain peak with a clear topographic contour overlay.

Composition: 1024 x 1024 square PNG. The main 2D topographic contour case map occupies about 65% to 70% of the canvas on the left. A realistic oblique landform reference occupies about 25% to 30% of the canvas on the right, viewed at about 30 degrees elevation. Leave clean margins for concise Chinese annotation text inside the image.

Teaching role: This image is a visual teaching reference only. Do not imply that it is a heightmap, geometry source, or measurement dataset.

Map content: Draw six concentric closed contour rings, smoothly rounded and slightly natural but not noisy. Elevation increases toward the center. Use outermost contour 100, then 200, 300, 400, 500, and innermost 600. Put a small triangle summit marker at the center labeled "山峰 640m". The contour rings must not cross each other.

Real-world reference: The right-side landform should feel like a real isolated hill or volcanic cone with dry grass, exposed soil, and subtle slope texture, but still simplified enough for classroom reading.

Style: realistic geography teaching case card, lightly textured terrain-paper background, brown contour lines, black elevation numbers, every fifth contour line slightly thicker, clear linework, natural terrain texture kept behind the teaching overlay. Use concise Chinese labels and Arabic elevation numbers; Chinese text must be legible, accurate, and limited to geography teaching terms.

Landform reference: a raised conical hill matching the contour map, with realistic but restrained terrain texture, high center and lower surrounding slopes.

Use Chinese annotation text inside the image, but only required concise geography labels and Arabic elevation numbers. No pure satellite screenshot. No pure landscape photo without contour teaching structure. No decorative fantasy mountains. No fake city names. No garbled or irrelevant Chinese text. No inconsistent elevation numbers. No watermark. No complex legend. Do not let terrain texture, shadows, vegetation, or color gradients obscure contour lines and elevation numbers.
```

禁用元素：

- 中心低、外圈高的错误盆地形态。
- 等高线交叉。
- 乱码中文标签。
- 纯风景照片导致等高线和峰顶诊断不清。

QC 验收：

1. 等高线闭合且嵌套。
2. 海拔数字向中心单调递增。
3. 中心有峰顶或高程点标记。
4. 3D 插图是凸起山峰，不是洼地。
5. 主图约 70%，插图约 25%。

Re-prompt：

```text
Regenerate the same textbook contour map, but fix the peak logic: all contour values must increase toward the center, the center must be the highest point, and the 3D inset must be a raised hill. Keep only accurate Chinese teaching labels and remove any garbled text or random place names.
```

### 6.4 A2 盆地 / Depression Basin

教学用途：

- 讲解闭合等高线中的低值中心。
- 讲解盆地/洼地与山峰的差别。
- 讲解示坡线指向低处。

中文关键词：

- 闭合等高线
- 中心低四周高
- 示坡线向内
- 洼地
- 盆地碗状形态

English keywords:

- closed contour rings
- elevation decreases toward center
- depression hachures pointing inward
- basin bowl inset
- enclosed lowland

完整 prompt：

```text
Create a realistic geography teaching case card for an enclosed depression basin with a clear topographic contour overlay.

Composition: 1024 x 1024 square PNG. The main 2D topographic contour case map occupies about 65% to 70% of the canvas on the left. A realistic oblique landform reference occupies about 25% to 30% of the canvas on the right, viewed at about 30 degrees elevation. Leave clean margins for concise Chinese annotation text inside the image.

Teaching role: This image is a visual teaching reference only. Do not imply that it is a heightmap, geometry source, or measurement dataset.

Map content: Draw six concentric closed contour rings. Elevation decreases toward the center. Use outermost contour 600, then 500, 400, 300, 200, and innermost 100. Add short depression hachure tick marks on the inside edge of each contour, pointing inward toward the lower center. Put a small center marker labeled "盆地 80m". The contour rings must not cross each other.

Real-world reference: The right-side landform should feel like a real enclosed dry inland basin, salt-lake basin, or closed lowland depression with a higher rim, pale basin floor, subtle alluvial texture, and sparse vegetation.

Style: realistic geography teaching case card, lightly textured terrain-paper background, brown contour lines, black elevation numbers, every fifth contour line slightly thicker, clear linework, natural terrain texture kept behind the teaching overlay. Use concise Chinese labels and Arabic elevation numbers; Chinese text must be legible, accurate, and limited to geography teaching terms.

Landform reference: a bowl-shaped basin matching the contour map, with high surrounding rim and low center, realistic but restrained terrain texture, and no peak-like center.

Use Chinese annotation text inside the image, but only required concise geography labels and Arabic elevation numbers. No pure satellite screenshot. No pure landscape photo without contour teaching structure. No decorative fantasy mountains. No fake city names. No garbled or irrelevant Chinese text. No inconsistent elevation numbers. No watermark. No complex legend. Do not let terrain texture, shadows, vegetation, or color gradients obscure contour lines and elevation numbers.
```

禁用元素：

- 盆地中心画成山峰。
- 示坡线朝外。
- 缺少低值中心。
- 3D 插图与 2D 图不一致。

QC 验收：

1. 等高线向中心闭合。
2. 海拔数字向中心单调递减。
3. 示坡线在内侧并指向中心低处。
4. 3D 插图是凹碗状盆地。
5. 中文注释清晰，无乱码和伪造地名。

Re-prompt：

```text
Regenerate the basin diagram. The center must be lower than the outer rings, with elevation values decreasing inward. Add inward-pointing depression hachures on the inside of the closed contours. The 3D inset must be a bowl-shaped basin, not a peak.
```

### 6.5 A3 山脊 / Ridge

教学用途：

- 讲解“凸低为脊”。
- 讲解山脊是分水岭。
- 帮助学生把 U/V 形弯曲与 3D 高地联系起来。

中文关键词：

- 等高线凸向低值
- 分水岭
- 脊线
- 高处向外伸
- elongated ridge

English keywords:

- contour bends toward lower elevation
- ridge line
- watershed divide
- elongated high landform
- U-shaped contour bends

完整 prompt：

```text
Create a realistic geography teaching case card for a mountain ridge and watershed divide with a clear topographic contour overlay.

Composition: 1024 x 1024 square PNG. The main 2D topographic contour case map occupies about 65% to 70% of the canvas on the left. A realistic oblique landform reference occupies about 25% to 30% of the canvas on the right, viewed at about 30 degrees elevation. Leave clean margins for concise Chinese annotation text inside the image.

Teaching role: This image is a visual teaching reference only. Do not imply that it is a heightmap, geometry source, or measurement dataset.

Map content: Show an elongated ridge running diagonally from lower-left to upper-right. Draw five to six contour lines shaped like elongated U or V bends. The bends must point toward lower elevation values, demonstrating that ridge contours protrude toward low values. Use values 100, 200, 300, 400, 500, with higher values along the ridge core. Add a thin dashed red line along the ridge axis labeled "山脊线". Add two small arrows on both sides showing water divides away from the ridge.

Real-world reference: The right-side landform should feel like a real elongated mountain spur or watershed ridge with two sloping sides, exposed ridgeline texture, and drainage falling away on both sides.

Style: realistic geography teaching case card, lightly textured terrain-paper background, brown contour lines, black elevation numbers, every fifth contour line slightly thicker, clear linework, natural terrain texture kept behind the teaching overlay. Use concise Chinese labels and Arabic elevation numbers; Chinese text must be legible, accurate, and limited to geography teaching terms.

Landform reference: a long raised ridge matching the contour map, not a valley, with realistic but restrained slope texture and drainage away from the ridge.

Use Chinese annotation text inside the image, but only required concise geography labels and Arabic elevation numbers. No pure satellite screenshot. No pure landscape photo without contour teaching structure. No decorative fantasy mountains. No fake city names. No garbled or irrelevant Chinese text. No inconsistent elevation numbers. No watermark. No complex legend. Do not let terrain texture, shadows, vegetation, or color gradients obscure contour lines and elevation numbers.
```

禁用元素：

- 等高线弯向高值，误画成山谷。
- 脊线不连接弯曲顶点。
- 水流箭头汇入脊线。
- 3D 插图画成沟谷。

QC 验收：

1. 弯曲顶点朝低值方向。
2. 脊轴沿弯曲顶点延伸。
3. 两侧有分水含义。
4. 3D 插图是凸起长脊。
5. 数字不混乱，方向不自相矛盾。

Re-prompt：

```text
Regenerate the ridge diagram. The contour bends must point toward lower elevation values, and the ridge axis must connect the bend tips. Show water dividing away from the ridge on both sides. Do not make it look like a valley.
```

### 6.6 A4 山谷 / Valley

教学用途：

- 讲解“凸高为谷”。
- 讲解山谷是集水线。
- 讲解河流流向与等高线凸出方向相反。

中文关键词：

- 等高线凸向高值
- 集水线
- 河流发育
- 水流箭头
- V 形谷

English keywords:

- contour bends upstream toward higher elevation
- valley line
- stream channel
- blue flow arrows
- V-shaped valley

完整 prompt：

```text
Create a realistic geography teaching case card for a mountain valley with a clear topographic contour overlay.

Composition: 1024 x 1024 square PNG. The main 2D topographic contour case map occupies about 65% to 70% of the canvas on the left. A realistic oblique landform reference occupies about 25% to 30% of the canvas on the right, viewed at about 30 degrees elevation. Leave clean margins for concise Chinese annotation text inside the image.

Teaching role: This image is a visual teaching reference only. Do not imply that it is a heightmap, geometry source, or measurement dataset.

Map content: Show a V-shaped valley. Draw five to six contour lines shaped like V or U bends. The bends must point toward higher elevation values, demonstrating that valley contours protrude toward high values. Use values 100 near the downstream open end, then 200, 300, 400, 500 upstream and on surrounding slopes. Add a thin blue valley axis labeled "山谷线". Add small blue arrows showing water flowing downstream along the valley toward lower values, opposite the direction in which the contour bends point.

Real-world reference: The right-side landform should feel like a real V-shaped valley with a narrow stream channel, steeper side slopes, visible valley floor, and natural rock or vegetation texture.

Style: realistic geography teaching case card, lightly textured terrain-paper background, brown contour lines, black elevation numbers, every fifth contour line slightly thicker, clear linework, natural terrain texture kept behind the teaching overlay. Use concise Chinese labels and Arabic elevation numbers; Chinese text must be legible, accurate, and limited to geography teaching terms.

Landform reference: a recessed V-shaped valley between two slopes matching the contour map, with water flowing toward lower values and no raised ridge in the valley axis.

Use Chinese annotation text inside the image, but only required concise geography labels and Arabic elevation numbers. No pure satellite screenshot. No pure landscape photo without contour teaching structure. No decorative fantasy mountains. No fake city names. No garbled or irrelevant Chinese text. No inconsistent elevation numbers. No watermark. No complex legend. Do not let terrain texture, shadows, vegetation, or color gradients obscure contour lines and elevation numbers.
```

禁用元素：

- 等高线弯向低值，误画成山脊。
- 水流箭头指向高处。
- 谷轴不在弯曲顶点连线上。
- 3D 插图画成凸起山脊。

QC 验收：

1. 弯曲顶点朝高值方向。
2. 水流箭头朝低值方向。
3. 水流方向与等高线凸出方向相反。
4. 3D 插图是凹谷。
5. 数字清楚且不矛盾。

Re-prompt：

```text
Regenerate the valley diagram. The contour bends must point toward higher elevation values, while the blue stream arrows must flow toward lower elevation values. The 3D inset must be a recessed V-shaped valley, not a ridge.
```

### 6.7 A5 鞍部 / Saddle

教学用途：

- 讲解两个山峰之间的低缓部位。
- 讲解鞍部是山谷最高处、山脊最低处的空间关系。
- 为通视、公路穿越、山口等题型铺垫。

中文关键词：

- 两座山峰之间
- 马鞍形
- 两组闭合等高线
- 中间低缓
- 山口

English keywords:

- saddle between two peaks
- two closed contour systems
- low pass
- mountain pass diagram
- saddle point

完整 prompt：

```text
Create a realistic geography teaching case card for a saddle landform between two peaks with a clear topographic contour overlay.

Composition: 1024 x 1024 square PNG. The main 2D topographic contour case map occupies about 65% to 70% of the canvas on the left. A realistic oblique landform reference occupies about 25% to 30% of the canvas on the right, viewed at about 30 degrees elevation. Leave clean margins for concise Chinese annotation text inside the image.

Teaching role: This image is a visual teaching reference only. Do not imply that it is a heightmap, geometry source, or measurement dataset.

Map content: Draw two separate mountain peaks, each with its own set of closed contour rings. The left peak reaches 600 and the right peak reaches 650. Between the two peaks, draw a lower pass around 400 labeled "鞍部". Lower contour rings should wrap around both peaks but the two highest closed systems must remain visually distinct. Add a small X marker at the saddle point. Add a thin red line showing the ridge route through the saddle and thin blue arrows showing drainage away to both sides.

Real-world reference: The right-side landform should feel like a real mountain pass or col between two rounded summits, with a lower traversable notch and drainage dropping away on opposite sides.

Style: realistic geography teaching case card, lightly textured terrain-paper background, brown contour lines, black elevation numbers, every fifth contour line slightly thicker, clear linework, natural terrain texture kept behind the teaching overlay. Use concise Chinese labels and Arabic elevation numbers; Chinese text must be legible, accurate, and limited to geography teaching terms.

Landform reference: two hills with a lower saddle pass between them matching the contour map, realistic but restrained, with the pass lower than both peaks.

Use Chinese annotation text inside the image, but only required concise geography labels and Arabic elevation numbers. No pure satellite screenshot. No pure landscape photo without contour teaching structure. No decorative fantasy mountains. No fake city names. No garbled or irrelevant Chinese text. No inconsistent elevation numbers. No watermark. No complex legend. Do not let terrain texture, shadows, vegetation, or color gradients obscure contour lines and elevation numbers.
```

禁用元素：

- 只有一个山峰。
- 两组闭合线完全融合，看不出两个峰。
- 鞍部画成盆地中心。
- 3D 插图没有两个山头。

QC 验收：

1. 有两套独立闭合等高线。
2. 两个峰之间有低缓鞍点。
3. 鞍点不是最低盆地，也不是最高峰顶。
4. 3D 插图呈马鞍形。
5. 红线和蓝色排水箭头关系清楚。

Re-prompt：

```text
Regenerate the saddle diagram. It must show two separate peaks with two distinct closed contour systems, and a lower pass between them labeled 鞍部. The 3D inset must clearly show two hills with a low saddle between them.
```

### 6.8 A6 陡崖 / Cliff

教学用途：

- 讲解多条等高线重合表示陡崖。
- 讲解陡崖相对高度公式。
- 帮助学生数重合线条数 `n`。

中文关键词：

- 多条等高线重合
- 陡崖符号
- 崖顶崖底
- 高差计算
- 重合线条数

English keywords:

- overlapping contour lines
- cliff symbol
- cliff top and base
- steep escarpment inset
- relative height formula

完整 prompt：

```text
Create a realistic geography teaching case card for a cliff or escarpment with a clear topographic contour overlay.

Composition: 1024 x 1024 square PNG. The main 2D topographic contour case map occupies about 65% to 70% of the canvas on the left. A realistic oblique landform reference occupies about 25% to 30% of the canvas on the right, viewed at about 30 degrees elevation. Leave clean margins for concise Chinese annotation text inside the image.

Teaching role: This image is a visual teaching reference only. Do not imply that it is a heightmap, geometry source, or measurement dataset.

Map content: Draw a topographic contour map where several different elevation contours converge and overlap into one thick cliff band. On the lower side, show normal contours labeled 100, 200, 300. In the middle, show four contours labeled 400, 500, 600, 700 merging into a single thick overlapping line labeled "陡崖". On the upper side, show contour 800. Add small ticks or short marks along the cliff band to indicate a steep cliff. Add a small formula box labeled "陡崖高差" with mathematical symbols: "(n-1)d <= H < (n+1)d".

Real-world reference: The right-side landform should feel like a real steep escarpment, fault scarp, mountain cliff, or coastal cliff face with exposed rock texture and a clear drop from upper surface to lower ground.

Style: realistic geography teaching case card, lightly textured terrain-paper background, brown contour lines, black elevation numbers, every fifth contour line slightly thicker, clear linework, natural rock texture kept behind the teaching overlay. Use concise Chinese labels and Arabic elevation numbers; Chinese text must be legible, accurate, and limited to geography teaching terms.

Landform reference: a steep escarpment or cliff drop matching the contour map, with a near-vertical face and readable top/base relationship.

Use Chinese annotation text inside the image, but only required concise geography labels and Arabic elevation numbers. No pure satellite screenshot. No pure landscape photo without contour teaching structure. No decorative fantasy mountains. No fake city names. No garbled or irrelevant Chinese text. No inconsistent elevation numbers. No watermark. No complex legend. Do not let terrain texture, shadows, vegetation, or color gradients obscure contour lines, overlap count, and elevation numbers.
```

禁用元素：

- 等高线只是密集但没有重合。
- 重合线少于 3 条。
- 公式乱码。
- 崖顶崖底高度方向颠倒。

QC 验收：

1. 可数出至少 3 条不同高度等高线重合。
2. 下方和上方海拔方向合理。
3. 有“陡崖”或等价中文标注。
4. 公式框清楚，不出现乱码。
5. 3D 插图是陡崖，不是普通陡坡。

Re-prompt：

```text
Regenerate the cliff diagram. The key feature must be multiple contour lines of different elevations overlapping into one thick cliff band. Make the overlap count clear, with at least four merged contour labels. Keep the formula readable and remove any random characters.
```

### 6.9 B1 平原 / Plain

教学用途：

- 讲解五大地形类型中的平原。
- 强调低海拔、等高线稀疏、地势平坦。

中文关键词：

- 海拔低于 200 米
- 等高线稀疏平直
- 地势平坦
- 平原

English keywords:

- low elevation plain
- sparse straight contour lines
- flat terrain
- under 200 meters
- gentle surface

完整 prompt：

```text
Create a realistic geography teaching case card for a low-elevation plain with a clear topographic contour overlay.

Composition: 1024 x 1024 square PNG. The main 2D topographic contour case map occupies about 65% to 70% of the canvas on the left. A realistic oblique landform reference occupies about 25% to 30% of the canvas on the right, viewed at about 30 degrees elevation. Leave clean margins for concise Chinese annotation text inside the image.

Teaching role: This image is a visual teaching reference only. Do not imply that it is a heightmap, geometry source, or measurement dataset.

Map content: Show a very flat low-elevation plain. Draw only three widely spaced, gently curving contour lines labeled 50, 100, and 150. The lines should be sparse and almost straight, indicating a very gentle slope. Add a concise Chinese label "平原 < 200m".

Real-world reference: The right-side landform should feel like a real broad alluvial plain or low agricultural plain with subtle drainage traces, very gentle relief, and open flat terrain.

Style: realistic geography teaching case card, lightly textured terrain-paper background, brown contour lines, black elevation numbers, clear linework, natural lowland texture kept behind the teaching overlay. Use concise Chinese labels and Arabic elevation numbers; Chinese text must be legible, accurate, and limited to geography teaching terms.

Landform reference: an almost flat surface with very slight relief matching the contour map, realistic but restrained, with no hills or deep valleys.

Use Chinese annotation text inside the image, but only required concise geography labels and Arabic elevation numbers. No pure satellite screenshot. No pure landscape photo without contour teaching structure. No decorative fantasy mountains. No fake city names. No garbled or irrelevant Chinese text. No inconsistent elevation numbers. No watermark. No complex legend. Do not let terrain texture, field patterns, shadows, vegetation, or color gradients obscure contour lines and elevation numbers.
```

禁用元素：

- 山峰或密集等高线。
- 海拔超过 200m 后还标为平原。
- 起伏过大。

QC 验收：

1. 海拔数字低于 200m。
2. 等高线稀疏、平缓。
3. 3D 插图几乎平坦。
4. 没有明显山峰或深谷。

Re-prompt：

```text
Regenerate the plain diagram with lower relief. Keep all elevations below 200 meters, make contour lines sparse and almost straight, and make the 3D inset nearly flat.
```

### 6.10 B2 丘陵 / Hills

教学用途：

- 讲解丘陵 200-500m 的一般海拔范围。
- 强调起伏和缓、坡度较缓。

中文关键词：

- 200 到 500 米
- 起伏和缓
- 等高线较稀疏
- 小丘
- 丘陵

English keywords:

- rolling hills
- 200 to 500 meters
- gentle relief
- moderately sparse contour lines
- small rounded hills

完整 prompt：

```text
Create a realistic geography teaching case card for rolling hills with a clear topographic contour overlay.

Composition: 1024 x 1024 square PNG. The main 2D topographic contour case map occupies about 65% to 70% of the canvas on the left. A realistic oblique landform reference occupies about 25% to 30% of the canvas on the right, viewed at about 30 degrees elevation. Leave clean margins for concise Chinese annotation text inside the image.

Teaching role: This image is a visual teaching reference only. Do not imply that it is a heightmap, geometry source, or measurement dataset.

Map content: Show several small rounded hills. Draw three to four small closed contour loops with elevations 200, 300, 400, and 500. Contour spacing should be moderate, not extremely dense. The hill shapes should be gentle and rounded. Add a concise Chinese label "丘陵 200-500m".

Real-world reference: The right-side landform should feel like real rolling hills with patchy vegetation, rounded hilltops, shallow gullies, and gentle slopes rather than sharp mountains.

Style: realistic geography teaching case card, lightly textured terrain-paper background, brown contour lines, black elevation numbers, every fifth contour line slightly thicker if present, clear linework, natural hill texture kept behind the teaching overlay. Use concise Chinese labels and Arabic elevation numbers; Chinese text must be legible, accurate, and limited to geography teaching terms.

Landform reference: rolling low hills with gentle slopes matching the contour map, realistic but restrained, with moderate relief between 200 and 500 meters.

Use Chinese annotation text inside the image, but only required concise geography labels and Arabic elevation numbers. No pure satellite screenshot. No pure landscape photo without contour teaching structure. No decorative fantasy mountains. No fake city names. No garbled or irrelevant Chinese text. No inconsistent elevation numbers. No watermark. No complex legend. Do not let terrain texture, shadows, vegetation, or color gradients obscure contour lines and elevation numbers.
```

禁用元素：

- 尖锐高山。
- 海拔明显超过 500m。
- 等高线过密。
- 平坦到像平原。

QC 验收：

1. 主要海拔在 200-500m。
2. 起伏和缓。
3. 多个小丘可辨。
4. 3D 插图是丘陵而不是山地。

Re-prompt：

```text
Regenerate the hills diagram. Keep elevations between 200 and 500 meters, with rounded small hills and moderately spaced contours. Avoid steep mountains or flat plains.
```

### 6.11 B3 山地 / Mountain

教学用途：

- 讲解山地高海拔、坡陡谷深。
- 强调等高线密集代表坡陡。

中文关键词：

- 500 米以上
- 等高线密集
- 坡陡谷深
- 山地
- 高差大

English keywords:

- mountainous terrain
- above 500 meters
- dense contour lines
- steep slopes
- deep valleys

完整 prompt：

```text
Create a realistic geography teaching case card for mountainous terrain with a clear topographic contour overlay.

Composition: 1024 x 1024 square PNG. The main 2D topographic contour case map occupies about 65% to 70% of the canvas on the left. A realistic oblique landform reference occupies about 25% to 30% of the canvas on the right, viewed at about 30 degrees elevation. Leave clean margins for concise Chinese annotation text inside the image.

Teaching role: This image is a visual teaching reference only. Do not imply that it is a heightmap, geometry source, or measurement dataset.

Map content: Show a mountain area with two high peaks and deep valleys. Draw dense contour lines labeled 500, 700, 900, 1100, 1300, and 1500. The spacing should be tight on steep slopes and slightly wider in valley floors. Add a concise Chinese label "山地 > 500m". Make the relief clearly greater than hills.

Real-world reference: The right-side landform should feel like a real mountain area with steep slopes, deep valleys, exposed ridges, rock faces, and patchy vegetation or snow-free highland texture.

Style: realistic geography teaching case card, lightly textured terrain-paper background, brown contour lines, black elevation numbers, every fifth contour line slightly thicker, clear linework, natural mountain texture kept behind the teaching overlay. Use concise Chinese labels and Arabic elevation numbers; Chinese text must be legible, accurate, and limited to geography teaching terms.

Landform reference: a mountain range with steep slopes and deep valleys matching the contour map, realistic but restrained, with relief clearly greater than hills.

Use Chinese annotation text inside the image, but only required concise geography labels and Arabic elevation numbers. No pure satellite screenshot. No pure landscape photo without contour teaching structure. No decorative fantasy mountains. No fake city names. No garbled or irrelevant Chinese text. No inconsistent elevation numbers. No watermark. No complex legend. Do not let terrain texture, shadows, vegetation, or color gradients obscure contour lines and elevation numbers.
```

禁用元素：

- 等高线太稀疏。
- 海拔不足 500m 却标山地。
- 只有单个小丘。
- 真实纹理压过等高线和高差诊断。

QC 验收：

1. 海拔主要高于 500m。
2. 等高线密集处明显。
3. 有高差大、谷深的感觉。
4. 3D 插图与 2D 图一致。

Re-prompt：

```text
Regenerate the mountain diagram with greater relief. Use dense contour lines above 500 meters, show steep slopes and deep valleys, and avoid making it look like gentle hills.
```

### 6.12 B4 高原 / Plateau

教学用途：

- 讲解高原“海拔高、内部起伏小、边缘较陡”。
- 强调“中间疏、四周密”的等高线特征。

中文关键词：

- 海拔高
- 内部平坦
- 边缘陡峭
- 中间疏四周密
- 高原面

English keywords:

- high plateau
- flat interior
- steep edges
- sparse inner contours
- dense edge contours

完整 prompt：

```text
Create a realistic geography teaching case card for a plateau with a clear topographic contour overlay.

Composition: 1024 x 1024 square PNG. The main 2D topographic contour case map occupies about 65% to 70% of the canvas on the left. A realistic oblique landform reference occupies about 25% to 30% of the canvas on the right, viewed at about 30 degrees elevation. Leave clean margins for concise Chinese annotation text inside the image.

Teaching role: This image is a visual teaching reference only. Do not imply that it is a heightmap, geometry source, or measurement dataset.

Map content: Show a high plateau with a broad flat interior and steep edges. In the center, draw a large open area around 1000 meters with very sparse inner contour detail. Around the plateau edge, draw tightly packed contours labeled 800, 600, 400, and 200, showing steep margins. Add concise Chinese labels "高原面" and "陡缘".

Real-world reference: The right-side landform should feel like a real high plateau, mesa, or tableland with a broad flat top, steep margins, sparse vegetation, and exposed sediment or rock texture along the edge.

Style: realistic geography teaching case card, lightly textured terrain-paper background, brown contour lines, black elevation numbers, every fifth contour line slightly thicker, clear linework, natural plateau texture kept behind the teaching overlay. Use concise Chinese labels and Arabic elevation numbers; Chinese text must be legible, accurate, and limited to geography teaching terms.

Landform reference: a flat-topped high plateau or mesa with steep edges matching the contour map, realistic but restrained, with sparse contours on the top and dense contours along the edge.

Use Chinese annotation text inside the image, but only required concise geography labels and Arabic elevation numbers. No pure satellite screenshot. No pure landscape photo without contour teaching structure. No decorative fantasy mountains. No fake city names. No garbled or irrelevant Chinese text. No inconsistent elevation numbers. No watermark. No complex legend. Do not let terrain texture, shadows, vegetation, or color gradients obscure contour lines and elevation numbers.
```

禁用元素：

- 中心密集，边缘稀疏。
- 高原顶部起伏太大。
- 画成普通山峰。
- 3D 插图没有平顶。

QC 验收：

1. 内部等高线稀疏。
2. 边缘等高线密集。
3. 海拔体现较高。
4. 3D 插图是平顶高地。

Re-prompt：

```text
Regenerate the plateau diagram. The key visual diagnosis is sparse contours on a broad flat high interior and dense contours along steep edges. Make the 3D inset a flat-topped plateau, not a peak.
```

### 6.13 B5 综合盆地 / Large Basin

教学用途：

- 讲解大尺度盆地。
- 讲解四周高中间低。
- 讲解向心状水系。

中文关键词：

- 四周高中间低
- 向心状水系
- 盆地边缘密集
- 大尺度盆地
- 盆底低平

English keywords:

- large topographic basin
- high surrounding terrain
- low center
- centripetal drainage
- inward streams

完整 prompt：

```text
Create a realistic geography teaching case card for a large topographic basin with a clear topographic contour overlay.

Composition: 1024 x 1024 square PNG. The main 2D topographic contour case map occupies about 65% to 70% of the canvas on the left. A realistic oblique landform reference occupies about 25% to 30% of the canvas on the right, viewed at about 30 degrees elevation. Leave clean margins for concise Chinese annotation text inside the image.

Teaching role: This image is a visual teaching reference only. Do not imply that it is a heightmap, geometry source, or measurement dataset.

Map content: Show a large basin surrounded by higher terrain. Use outer surrounding contours labeled 1000, 800, 600, 400, and a broad low basin floor labeled 200 in the center. Add several thin blue streams flowing inward from the surrounding slopes toward the basin center, showing centripetal drainage. The basin edge should have denser contour lines than the flat center. Add a concise Chinese label "大盆地".

Real-world reference: The right-side landform should feel like a real large intermontane basin or dry sedimentary basin with a broad flat low floor, higher surrounding mountains, alluvial fans, and inward drainage traces.

Style: realistic geography teaching case card, lightly textured terrain-paper background, brown contour lines, black elevation numbers, every fifth contour line slightly thicker, clear linework, natural basin texture kept behind the teaching overlay. Use concise Chinese labels and Arabic elevation numbers; Chinese text must be legible, accurate, and limited to geography teaching terms.

Landform reference: a broad basin with high surrounding rim and low center matching the contour map, realistic but restrained, with streams flowing inward rather than outward.

Use Chinese annotation text inside the image, but only required concise geography labels and Arabic elevation numbers. No pure satellite screenshot. No pure landscape photo without contour teaching structure. No decorative fantasy mountains. No fake city names. No garbled or irrelevant Chinese text. No inconsistent elevation numbers. No watermark. No complex legend. Do not let terrain texture, shadows, vegetation, water, or color gradients obscure contour lines and elevation numbers.
```

禁用元素：

- 河流向外流成放射状。
- 中心高、四周低。
- 盆地边缘不清晰。
- 缺少大尺度感。

QC 验收：

1. 四周高、中间低。
2. 河流或水系向中心汇集。
3. 中心盆底较平。
4. 3D 插图是大盆地。

Re-prompt：

```text
Regenerate the large basin diagram. Make the surrounding terrain higher, the center lower and flatter, and the blue streams flow inward toward the basin center. Do not make a peak or outward drainage pattern.
```

### 6.14 C1 水库坝址 / Reservoir Site

教学用途：

- 讲解水库坝址选择。
- 讲解“口袋形地形”：口小肚大。
- 讲解坝址选在峡谷窄口，库区选在宽阔洼地或盆地。

中文关键词：

- 口袋形地形
- 峡谷窄口
- 库区宽阔
- 坝址垂直河谷
- 水库选址

English keywords:

- pocket-shaped valley
- narrow gorge outlet
- broad reservoir basin
- dam line across narrow neck
- contour map planning diagram

完整 prompt：

```text
Create a realistic geography teaching case card for reservoir dam site selection with a clear topographic contour overlay.

Composition: 1024 x 1024 square PNG. The main 2D topographic contour planning case map occupies about 65% to 70% of the canvas on the left. A realistic oblique landform reference occupies about 25% to 30% of the canvas on the right, viewed at about 30 degrees elevation. Leave clean margins for concise Chinese annotation text inside the image.

Teaching role: This image is a visual teaching reference only. Do not imply that it is a heightmap, geometry source, or measurement dataset.

Map content: Show a pocket-shaped valley ideal for a reservoir. A narrow river valley exits through a narrow gorge neck between two hills. Upstream of the neck, the valley widens into a broad enclosed basin. Draw contour lines labeled 100, 150, 200, 250, 300, and 350. Add a thin blue river flowing from the broad basin through the narrow neck toward the outside. Mark a red dashed dam line across the narrow neck, perpendicular to the river, labeled "拟建坝址". Add a light blue translucent reservoir water area upstream of the dam, labeled "库区". The surrounding contours should clearly show a narrow outlet and a broad storage area.

Real-world reference: The right-side landform should feel like a real narrow gorge outlet opening into a broad upstream pocket basin, with a river channel, rocky valley sides, and a plausible reservoir storage area.

Style: realistic geography teaching case card, lightly textured terrain-paper background, brown contour lines, black elevation numbers, every fifth contour line slightly thicker, clear linework, natural valley texture kept behind the teaching overlay. Use concise Chinese labels and Arabic elevation numbers; Chinese text must be legible, accurate, and limited to geography teaching terms.

Landform reference: a pocket-shaped basin with a narrow outlet and a dam across the neck matching the contour map, realistic but restrained, with the reservoir water area upstream of the dam.

Use Chinese annotation text inside the image, but only required concise geography labels and Arabic elevation numbers. No pure satellite screenshot. No pure landscape photo without contour teaching structure. No decorative fantasy mountains. No fake city names. No garbled or irrelevant Chinese text. No inconsistent elevation numbers. No watermark. No complex legend. Do not let terrain texture, shadows, vegetation, water fill, or color gradients obscure contour lines and elevation numbers.
```

禁用元素：

- 坝线顺着河流画。
- 库区在坝址下游。
- 没有“口小肚大”的几何形态。
- 随机加城市、道路或复杂图例。

QC 验收：

1. 窄口与宽肚清楚。
2. 坝线横跨窄口且基本垂直河流。
3. 水库蓄水区位于坝址上游。
4. 等高线能解释库容大、工程量小。
5. 中文注释清晰，无乱码和多余地名。

Re-prompt：

```text
Regenerate the reservoir site diagram. The dam must cross the narrow gorge neck perpendicular to the river. The reservoir water area must be upstream in the broad pocket-shaped basin. Make the narrow outlet and broad storage area visually obvious.
```

### 6.15 GPT 图片 11 项总 QC 清单

每张图入库前必须逐项检查：

1. **数值单调性**：海拔值沿预期方向单调变化，不出现 `200` 套 `100` 外又套 `300` 的矛盾。
2. **部位诊断正确**：山脊凸低、山谷凸高、陡崖重合、盆地中心低、山峰中心高。
3. **等高距纪律**：同一张图尽量保持统一等高距，确需变化时必须教学上说得通。
4. **计曲线可见**：每五条或关键等高线略粗，便于投屏阅读。
5. **数字可读**：海拔数字清晰、水平或沿线排布合理，不压住主线。
6. **中文策略正确**：图片内使用准确、简洁、可读的中文注释，CSS 只用于补充或纠错。
7. **真实图与等高线一致**：真实感地形参考必须与主图诊断一致，不能山峰图配盆地插图，也不能山谷纹理配山脊等高线。
8. **真实感服务教学**：地貌纹理、水系、植被或岩土质感必须帮助识别地形，不能喧宾夺主。
9. **无多余要素**：不出现地名、城市、道路、指南针、水印、装饰边框等干扰项。
10. **构图比例正确**：主图约 65%-70%，真实地貌参考约 25%-30%，保留干净边距。
11. **高考可迁移**：学生看图后能对应一个明确考点，而不是只觉得“好看”。

### 6.16 Codex 内生成工作流

```text
步骤 1：在已登录账号的 Codex 中逐张调用生图能力。
步骤 2：允许参考 E:\agent\地图.pdf 中常见地形照片的真实质感，但不能替代本章 prompt 的地形逻辑。
步骤 3：从本章复制单张完整 prompt，先生成 1 张真实案例卡样图。
步骤 4：按总 QC 清单和该图专属 QC 清单检查。
步骤 5：如果真实感导致等高线数字混乱、地形诊断不清或主图被纹理遮挡，改用“真实感地形参考 + 更清晰的等高线覆绘”重抽。
步骤 6：如果地理逻辑失败，复制该图的 Re-prompt 在 Codex 中重抽，并记录失败原因。
步骤 7：样图通过后，再进入同类图片批量生成。
步骤 8：合格原图保存到 E:\agent\images\gpt-raw\。
步骤 9：压缩或转换为 WebP 后保存到 E:\agent\images\processed\。
步骤 10：把最终 prompt、文件名、QC 结果和重抽原因写入 E:\agent\images\prompts.md。
步骤 11：网页中可用 CSS 补充或纠错中文标签，但正式入库图应优先保证图内中文注释正确。
```

### 6.17 `images/prompts.md` 模板

````markdown
# GPT-image-2 Prompts for Contour Teaching Cards

## A1_peak

- Date:
- Tool: Codex image generation
- Raw file: images/gpt-raw/A1_peak_raw.png
- Processed file: images/processed/A1_peak.webp
- QC status: PASS / FAIL
- Failed items:
- Final prompt:

```text
paste final prompt here
```

- Re-prompt history:
  - Attempt 1:
  - Attempt 2:
- Notes:
````

---

## 七、网页交互功能清单

### 7.1 必做功能

| 功能 | 教学目的 | 阶段 |
|---|---|---|
| 水平切面溯源 | 理解等高线来源 | 1 |
| 六地形切换 | 掌握部位判读 | 2 |
| 2D 等高线卷面图 | 迁移到高考试卷 | 3 |
| GPT 参考卡 | 提供教材式标准图 | 4 |
| 俯视对照 | 验证 2D/3D 一致 | 5 |
| 口诀验证 | 解释口诀成因 | 5 |
| 剖面图 | 覆盖作图与读图 | 6 |
| 通视判断 | 覆盖难题拉分点 | 6 |
| 水流粒子 | 理解山谷/山脊 | 7 |
| 应用选址 | 覆盖综合题 | 8 |

### 7.2 教师模式

教师模式默认开启：

- 显示标准答案。
- 显示讲解步骤。
- 一键复位最佳视角。
- 一键进入下一地形。
- 隐藏复杂参数。

### 7.3 学生练习模式

后续可开启：

- 隐藏答案。
- 让学生点击山脊/山谷/鞍部。
- 让学生拖拽坝址或公路线。
- 系统给出反馈。

---

## 八、验收标准

### 8.1 第一轮课堂闭环验收

完成阶段 1-5 后，应满足：

1. 打开 `contour.html` 后能稳定显示 3D 地形。
2. 切换六大地形部位，3D 和 2D 同步变化。
3. 水平切面动画能解释等高线生成过程。
4. 山峰、盆地、山脊、山谷、鞍部、陡崖的图形诊断正确。
5. GPT 参考卡全部加载，并与当前地形匹配。
6. 俯视对照时，学生能看出“右侧等高线图来自中间 3D 地形”。
7. 教师能用 10-15 分钟完成一轮核心讲解。

### 8.2 完整九阶段验收

完成全部阶段后，应满足：

1. 能覆盖等高线基本概念、部位判读、计算、剖面、通视、水流、选址应用。
2. 每个模块都有一个高考题型对应。
3. 所有计算公式在界面中可解释、可追踪。
4. 图片资产全部有 prompt 和 QC 记录。
5. 教师大屏投影文字清晰。
6. 移动端有可用降级方案。
7. GitHub 仓库能复现最终文件结构。

---

## 九、风险与应对

| 风险 | 表现 | 应对 |
|---|---|---|
| GPT 图片地理错误 | 数值乱、方向错、示坡线错 | 每张图按 QC 清单验收，不合格重抽 |
| GPT 图片中文乱码 | “山脊/鞍部”等字变形 | 图片内中文注释必须清晰，必要时网页 CSS 补充或纠错 |
| 功能范围过大 | 九阶段拖慢首版 | 阶段 1-5 先形成课堂闭环 |
| 3D 与 2D 不一致 | 学生困惑 | 统一使用解析函数 `h(x,z)` |
| 陡崖动画过快 | 重合线一闪而过 | 陡崖模式切面动画自动降速 |
| 移动端性能不足 | 卡顿或黑屏 | 降采样、关闭 shader、Tab 降级 |
| 教师操作复杂 | 课堂节奏被打断 | 教师模式隐藏高级参数 |

---

## 十、后续执行顺序

1. 在 `E:\agent` 下建立 `images/gpt-raw/`、`images/processed/`、`images/prompts.md`。
2. 先在 Codex 内生成 A1-A6 六张地形部位图。
3. 完成 A1-A6 的 QC、重抽与 `E:\agent\images\prompts.md` 记录。
4. 开始实现 `E:\agent\contour.html` 阶段 1-3。
5. 将 A1-A6 接入网页左栏。
6. 再在 Codex 内生成 B1-B5、C1。
7. 完成 B1-B5、C1 的 QC、重抽与记录。
8. 进入剖面、通视、水流和应用场景阶段。

---

## 十一、资料依据

本计划依据：

- `C:\Users\xl\Desktop\agent\地图.pdf`
- `C:\Users\xl\Desktop\agent\planditu-v2.md`
- 高中地理“地球与地图”中等高线地形图常见知识点：海拔、相对高度、等高线、等高距、地形部位、陡崖公式、闭合等高线、河流流向、剖面图、通视、五大地形类型与选址应用。
- OpenAI 官方图像模型文档中关于 GPT-image-2 / 图像生成的使用定位。
- Three.js 与 D3 contour / marching squares 相关技术路线。

---

## 十二、核心原则

最终实现必须一直服从这句话：

> GPT 图片负责“教材参考”，解析函数负责“几何真相”，交互设计负责“高考迁移”。

只要学生能看到一张等高线图，就在脑中自动浮现山峰、山脊、山谷、河流、坡度和工程选址逻辑，这个项目就达到了真正的教学目标。
