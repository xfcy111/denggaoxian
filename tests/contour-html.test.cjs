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

test("contour.html includes the teacher-facing slogans from the plan", () => {
  const html = fs.readFileSync(htmlPath, "utf8");
  assert.match(html, /凸高为谷，凸低为脊/);
  assert.match(html, /密陡疏缓/);
  assert.match(html, /大于大的，小于小的/);
});

