const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const htmlPath = path.join(__dirname, "..", "contour.html");
const promptsPath = path.join(__dirname, "..", "images", "prompts.md");

test("contour.html wires the planned classroom layout and scripts", () => {
  const html = fs.readFileSync(htmlPath, "utf8");
  assert.match(html, /terrain-core\.js/);
  assert.match(html, /id="terrainCanvas"/);
  assert.match(html, /id="contourCanvas"/);
  assert.match(html, /id="sliceButton"/);
  assert.match(html, /id="themeToggle"/);
  assert.match(html, /data-view="overhead"/);
});

test("contour.html exposes one control for each required landform", () => {
  const html = fs.readFileSync(htmlPath, "utf8");
  for (const id of ["peak", "basin", "ridge", "valley", "saddle", "cliff"]) {
    assert.match(html, new RegExp(`data-terrain="${id}"`));
  }
});

test("contour.html exposes the three planned teaching modes", () => {
  const html = fs.readFileSync(htmlPath, "utf8");
  assert.match(html, /data-mode="landform"/);
  assert.match(html, /data-mode="terrainType"/);
  assert.match(html, /data-mode="application"/);
  assert.match(html, /部位判读/);
  assert.match(html, /地形类型/);
  assert.match(html, /应用选址/);
});

test("contour.html has reservoir teaching overlays for the C1 application mode", () => {
  const html = fs.readFileSync(htmlPath, "utf8");
  assert.match(html, /C1_reservoir_site/);
  assert.match(html, /拟建坝址/);
  assert.match(html, /库区/);
  assert.match(html, /河流/);
});

test("contour.html includes the teacher-facing slogans from the plan", () => {
  const html = fs.readFileSync(htmlPath, "utf8");
  assert.match(html, /凸高为谷，凸低为脊/);
  assert.match(html, /密陡疏缓/);
  assert.match(html, /大于大的，小于小的/);
});

test("contour.html turns slogans into clickable verification controls", () => {
  const html = fs.readFileSync(htmlPath, "utf8");
  assert.match(html, /data-slogan="bend"/);
  assert.match(html, /data-slogan="slope"/);
  assert.match(html, /data-slogan="closed"/);
  assert.match(html, /口诀验证/);
  assert.match(html, /activeSlogan/);
});

test("contour.html supports 2D contour click linking into 3D", () => {
  const html = fs.readFileSync(htmlPath, "utf8");
  assert.match(html, /id="pointReadout"/);
  assert.match(html, /handleContourClick/);
  assert.match(html, /drawSelectedPoint/);
  assert.match(html, /updateSelectionMarker/);
  assert.match(html, /已点选/);
});

test("contour.html explains overhead view as the source of contour lines", () => {
  const html = fs.readFileSync(htmlPath, "utf8");
  assert.match(html, /俯视图就是等高线图的空间来源/);
  assert.match(html, /updateViewCopy/);
});

test("contour.html exposes the stage 6A profile mode surface", () => {
  const html = fs.readFileSync(htmlPath, "utf8");
  assert.match(html, /data-map-tool="point"/);
  assert.match(html, /data-map-tool="profile"/);
  assert.match(html, /id="profileCanvas"/);
  assert.match(html, /id="profileReadout"/);
  assert.match(html, /剖面模式/);
  assert.match(html, /A-B 剖面图/);
});

test("contour.html wires profile clicks through shared terrain samples", () => {
  const html = fs.readFileSync(htmlPath, "utf8");
  assert.match(html, /handleProfileClick/);
  assert.match(html, /drawProfileCanvas/);
  assert.match(html, /drawProfileSelection/);
  assert.match(html, /updateProfileLine/);
  assert.match(html, /profileSamples/);
  assert.match(html, /定线、建坐标、定比例尺、描点、连线/);
});

test("contour.html exposes stage 6B line-of-sight feedback on the A-B profile", () => {
  const html = fs.readFileSync(htmlPath, "utf8");
  assert.match(html, /lineOfSight/);
  assert.match(html, /drawSightLineOnProfile/);
  assert.match(html, /drawSightSelection/);
  assert.match(html, /updateSightLine/);
  assert.match(html, /阻挡点/);
  assert.match(html, /通视判断/);
});

test("contour.html exposes stage 7 static flow arrows for water-system teaching", () => {
  const html = fs.readFileSync(htmlPath, "utf8");
  assert.match(html, /drawFlowArrows/);
  assert.match(html, /flowField/);
  assert.match(html, /data-terrain="valley"/);
  assert.match(html, /向心状水系/);
  assert.match(html, /流向与等高线凸出方向相反/);
  assert.match(html, /河流经窄口下泄/);
});

test("contour.html exposes stage 8 application scenarios", () => {
  const html = fs.readFileSync(htmlPath, "utf8");
  assert.match(html, /C5_water_diversion/);
  assert.match(html, /C2_road_route/);
  assert.match(html, /C3_campsite_site/);
  assert.match(html, /C4_agriculture_layout/);
  assert.match(html, /引水线路/);
  assert.match(html, /公路选线/);
  assert.match(html, /宿营地选址/);
  assert.match(html, /农业布局/);
  assert.match(html, /受水区/);
  assert.match(html, /避开陡坡/);
  assert.match(html, /高地缓坡/);
  assert.match(html, /林牧区/);
});

test("contour.html exposes collapsible side panels and reference image preview", () => {
  const html = fs.readFileSync(htmlPath, "utf8");
  assert.match(html, /id="toggleReferencePanel"/);
  assert.match(html, /id="toggleContourPanel"/);
  assert.match(html, /id="restoreReferencePanel"/);
  assert.match(html, /id="restoreContourPanel"/);
  assert.match(html, /is-reference-collapsed/);
  assert.match(html, /is-contour-collapsed/);
  assert.match(html, /id="referenceLightbox"/);
  assert.match(html, /id="closeReferenceLightbox"/);
  assert.match(html, /openReferenceLightbox/);
  assert.match(html, /closeReferenceLightbox/);
  assert.match(html, /aria-modal="true"/);
});

test("contour.html constrains the classroom viewport and scrolls the contour body internally", () => {
  const html = fs.readFileSync(htmlPath, "utf8");
  assert.match(html, /\.app\s*\{[^}]*height:\s*100vh/s);
  assert.match(html, /\.workspace\s*\{[^}]*grid-template-rows:\s*minmax\(0,\s*1fr\)/s);
  assert.match(html, /\.contour-body\s*\{[^}]*overflow-y:\s*auto/s);
  assert.match(html, /\.reference-panel\s*\{[^}]*transition:/s);
  assert.match(html, /\.topbar\s*\{[^}]*padding:\s*8px 14px/s);
});

test("contour.html exposes stage 9 classroom stability controls", () => {
  const html = fs.readFileSync(htmlPath, "utf8");
  assert.match(html, /mobile-tabs/);
  assert.match(html, /data-mobile-tab="terrain"/);
  assert.match(html, /data-mobile-panel="reference"/);
  assert.match(html, /setMobilePanel/);
  assert.match(html, /terrainGridSize/);
  assert.match(html, /课堂试讲检查/);
  assert.match(html, /投屏/);
  assert.match(html, /移动端/);
});

test("contour.html exposes natural terrain rendering without replacing shared terrain data", () => {
  const html = fs.readFileSync(htmlPath, "utf8");
  assert.match(html, /教学清爽/);
  assert.match(html, /自然写实/);
  assert.match(html, /terrainVisualSlope/);
  assert.match(html, /terrainSurfaceNoise/);
  assert.match(html, /terrainColorForVertex/);
  assert.match(html, /makeTerrainMaterial/);
  assert.match(html, /updateTerrainLighting/);
  assert.match(html, /core\.sampleRenderGrid\(state\.terrain,\s*activeGridSize,\s*snapshotParams\)/);
  assert.match(html, /buildRenderSnapshot/);
  assert.match(html, /geometry\.computeVertexNormals\(\)/);
});

test("contour.html separates online or local 3D rendering from teaching snapshots", () => {
  const html = fs.readFileSync(htmlPath, "utf8");
  assert.match(html, /let teachingSnapshot/);
  assert.match(html, /let renderSnapshot/);
  assert.match(html, /function buildTeachingSnapshot/);
  assert.match(html, /function buildRenderSnapshot/);
  assert.match(html, /core\.sampleTeachingGrid/);
  assert.match(html, /core\.sampleRenderGrid/);
  assert.match(html, /core\.contourPolylines/);
  assert.match(html, /teachingSnapshot\.grid/);
  assert.match(html, /renderSnapshot\.grid/);
  assert.match(html, /function drawContourPolyline/);
  assert.doesNotMatch(html, /core\.sampleGrid\(state\.terrain,\s*121,\s*params\(\)\)/);
});

test("contour.html wires MapLibre online terrain priority with local fallback", () => {
  const html = fs.readFileSync(htmlPath, "utf8");
  assert.match(html, /id="realTerrainMap"/);
  assert.match(html, /realTerrainStatus/);
  assert.match(html, /REAL_TERRAIN_VIEWPOINTS/);
  assert.match(html, /loadMapLibreAssets/);
  assert.match(html, /initRealTerrainMap/);
  assert.match(html, /showOnlineTerrain/);
  assert.match(html, /fallbackToLocalRealTerrain/);
  assert.match(html, /updateTerrainDisplayMode/);
  assert.match(html, /maplibre-gl@5\.24\.0/);
  assert.match(html, /tiles\.mapterhorn\.com\/tilejson\.json/);
  assert.match(html, /demotiles\.maplibre\.org\/terrain-tiles\/tiles\.json/);
});

test("contour.html keeps teaching tools on the teaching snapshot in real detail mode", () => {
  const html = fs.readFileSync(htmlPath, "utf8");
  assert.match(html, /function ensureTeachingSnapshot/);
  assert.match(html, /function ensureRenderSnapshot/);
  assert.match(html, /heightFromTeachingSnapshot/);
  assert.match(html, /profileSamplesFromTeachingSnapshot/);
  assert.match(html, /lineOfSightFromTeachingSnapshot/);
  assert.match(html, /const snapshot = ensureTeachingSnapshot\(\)/);
});

test("contour.html exposes browser-safe online data extension points and embedded reference assets", () => {
  const html = fs.readFileSync(htmlPath, "utf8");
  assert.match(html, /ONLINE_DATA_SOURCES/);
  assert.match(html, /window\.DENGGAOXIAN_EMBEDDED_ASSETS/);
  assert.match(html, /embeddedReferenceAssets/);
  assert.match(html, /referenceAssetFor/);
  assert.match(html, /PUBLIC_CORS_ONLY/);
});

test("contour.html exposes solid terrain blocks and thick contour ribbons", () => {
  const html = fs.readFileSync(htmlPath, "utf8");
  assert.match(html, /const terrainBaseY/);
  assert.match(html, /function makeSolidTerrainGeometry/);
  assert.match(html, /function contourRibbonForPolyline/);
  assert.match(html, /MeshStandardMaterial/);
  assert.match(html, /PMREMGenerator/);
  assert.match(html, /SSAO/);
});

test("contour.html exposes ideal mode as the default same-source smoothing control", () => {
  const html = fs.readFileSync(htmlPath, "utf8");
  assert.match(html, /idealMode:\s*true/);
  assert.match(html, /id="idealToggle"/);
  assert.match(html, /aria-pressed="true"/);
  assert.match(html, /function updateIdealModeButton/);
  assert.match(html, /state\.idealMode\s*=\s*!state\.idealMode/);
  assert.match(html, /在线真实地形/);
  assert.match(html, /本地真实细节/);
});

test("contour.html raises desktop 3D mesh detail while keeping a mobile downgrade", () => {
  const html = fs.readFileSync(htmlPath, "utf8");
  assert.match(html, /const gridSize = 181/);
  assert.match(html, /max-width:\s*1080px[\s\S]*\?\s*101\s*:\s*gridSize/);
  assert.match(html, /renderer\.shadowMap\.enabled\s*=\s*true/);
  assert.match(html, /new THREE\.HemisphereLight/);
  assert.match(html, /terrainMesh\.receiveShadow\s*=\s*true/);
  assert.match(html, /terrainMesh\.castShadow\s*=\s*true/);
});

test("contour.html keeps mobile 3D controls from forcing horizontal overflow", () => {
  const html = fs.readFileSync(htmlPath, "utf8");
  assert.match(html, /@media\s*\(max-width:\s*1080px\)[\s\S]*\.mobile-tab\s*\{[^}]*min-width:\s*0/s);
  assert.match(html, /@media\s*\(max-width:\s*1080px\)[\s\S]*\.stage-overlay\s*\{[^}]*grid-template-columns:\s*repeat\(2,\s*minmax\(0,\s*1fr\)\)/s);
  assert.match(html, /@media\s*\(max-width:\s*1080px\)[\s\S]*\.stage-readout,\s*[\s\S]*\.slice-readout\s*\{[^}]*min-width:\s*0/s);
});

test("prompt documentation includes deferred GPT-image-2 prompts for C2-C4 and C5", () => {
  const prompts = fs.readFileSync(promptsPath, "utf8");
  assert.match(prompts, /C2_road_route/);
  assert.match(prompts, /C3_campsite_site/);
  assert.match(prompts, /C4_agriculture_layout/);
  assert.match(prompts, /C5_water_diversion/);
  assert.match(prompts, /高中地理等高线教学参考卡/);
  assert.match(prompts, /沿等高线/);
  assert.match(prompts, /高地缓坡/);
  assert.match(prompts, /种植区/);
  assert.match(prompts, /引水线路/);
});
