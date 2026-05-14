const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { execFileSync } = require("node:child_process");

const root = path.join(__dirname, "..");

test("package.json exposes test and single-file build commands", () => {
  const packageJson = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8"));
  assert.equal(packageJson.scripts.test, "node --test tests/*.test.cjs");
  assert.equal(packageJson.scripts["build:single"], "node tools/build-single-html.mjs");
});

test("build-single-html emits a self-contained classroom page with online terrain fallback kept", () => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "denggaoxian-build-"));
  const outFile = path.join(tmpDir, "denggaoxian.html");

  execFileSync(process.execPath, ["tools/build-single-html.mjs", "--out", outFile], {
    cwd: root,
    stdio: "pipe",
  });

  const html = fs.readFileSync(outFile, "utf8");
  assert.match(html, /window\.DENGGAOXIAN_EMBEDDED_ASSETS/);
  assert.match(html, /data:image\/webp;base64,/);
  assert.match(html, /THREE\.REVISION/);
  assert.match(html, /ContourTerrain/);
  assert.match(html, /ONLINE_DATA_SOURCES/);
  assert.match(html, /https:\/\/unpkg\.com\/maplibre-gl@5\.24\.0/);
  assert.match(html, /RAW_REFERENCE_CDN_BASES/);
  assert.match(html, /cdn\.jsdelivr\.net\/gh\/xfcy111\/denggaoxian@main\/images\/gpt-raw\//);
  assert.match(html, /raw\.githubusercontent\.com\/xfcy111\/denggaoxian\/main\/images\/gpt-raw\//);
  assert.match(html, /function rawReferenceUrlsFor/);
  assert.match(html, /function loadReferenceLightboxImage/);
  assert.match(html, /function referenceStatusText/);
  assert.match(html, /GitHub 高清原图/);
  assert.match(html, /byId\("referenceLightboxStatus"\)\.textContent = referenceStatusText\(meta\)/);
  assert.match(html, /loadReferenceLightboxImage\(rawReferenceUrlsFor\(meta\.card\),\s*meta\)/);
  assert.doesNotMatch(html, /<script src="terrain-core\.js/);
  assert.doesNotMatch(html, /images\/processed\//);
});
