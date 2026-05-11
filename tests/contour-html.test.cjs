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
