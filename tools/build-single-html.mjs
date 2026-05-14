import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const defaultOutFile = path.join(rootDir, "denggaoxian.html");

function parseOutFile(argv) {
  const outIndex = argv.indexOf("--out");
  if (outIndex >= 0) {
    const value = argv[outIndex + 1];
    if (!value) throw new Error("--out requires a file path");
    return path.resolve(process.cwd(), value);
  }

  const inlineOut = argv.find((arg) => arg.startsWith("--out="));
  if (inlineOut) {
    return path.resolve(process.cwd(), inlineOut.slice("--out=".length));
  }

  return defaultOutFile;
}

function readText(relativePath) {
  return fs.readFileSync(path.join(rootDir, relativePath), "utf8");
}

function escapeClosingScript(source) {
  return source.replace(/<\/script/gi, "<\\/script");
}

function replaceOnce(source, matcher, replacement, label) {
  if (!matcher.test(source)) {
    throw new Error(`Could not find ${label} in contour.html`);
  }
  return source.replace(matcher, replacement);
}

function buildEmbeddedAssets() {
  const assetsDir = path.join(rootDir, "images", "processed");
  const assets = {};

  for (const entry of fs.readdirSync(assetsDir, { withFileTypes: true })) {
    if (!entry.isFile() || !entry.name.endsWith(".webp")) continue;

    const filePath = path.join(assetsDir, entry.name);
    const card = path.basename(entry.name, ".webp");
    const dataUrl = `data:image/webp;base64,${fs.readFileSync(filePath).toString("base64")}`;
    assets[card] = dataUrl;
    assets[entry.name] = dataUrl;
  }

  return assets;
}

function buildSingleHtml(outFile) {
  const terrainCore = readText("terrain-core.js");
  const threeJs = readText(path.join("vendor", "three.r128.min.js"));
  const embeddedAssets = buildEmbeddedAssets();
  let html = readText("contour.html");

  html = replaceOnce(
    html,
    /<script>\s*window\.DENGGAOXIAN_EMBEDDED_ASSETS = window\.DENGGAOXIAN_EMBEDDED_ASSETS \|\| \{\};\s*<\/script>/,
    `<script>\n    window.DENGGAOXIAN_EMBEDDED_ASSETS = Object.freeze(${JSON.stringify(embeddedAssets)});\n  </script>`,
    "embedded asset placeholder",
  );

  html = replaceOnce(
    html,
    /<script src="terrain-core\.js\?v=terrain-realism-sync"><\/script>/,
    `<script>\n/* Inlined terrain-core.js for denggaoxian.html. */\n${escapeClosingScript(terrainCore)}\n</script>`,
    "terrain-core script tag",
  );

  html = replaceOnce(
    html,
    /<script src="https:\/\/cdnjs\.cloudflare\.com\/ajax\/libs\/three\.js\/r128\/three\.min\.js"><\/script>/,
    `<script>\n/* Inlined Three.js r128 for offline 3D teaching. THREE.REVISION is available at runtime. */\n${escapeClosingScript(threeJs)}\n</script>`,
    "Three.js CDN script tag",
  );

  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, html, "utf8");
  return { outFile, bytes: fs.statSync(outFile).size, assetCount: Object.keys(embeddedAssets).length };
}

const result = buildSingleHtml(parseOutFile(process.argv.slice(2)));
console.log(`Built ${path.relative(rootDir, result.outFile)} (${result.bytes} bytes, ${result.assetCount} embedded asset keys).`);
