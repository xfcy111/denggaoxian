const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const htmlPath = path.join(__dirname, "..", "contour.html");

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
  assert.match(html, /C2_road_route/);
  assert.match(html, /C3_campsite_site/);
  assert.match(html, /C4_agriculture_layout/);
  assert.match(html, /公路选线/);
  assert.match(html, /宿营地选址/);
  assert.match(html, /农业布局/);
  assert.match(html, /避开陡坡/);
  assert.match(html, /高地缓坡/);
  assert.match(html, /林牧区/);
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
