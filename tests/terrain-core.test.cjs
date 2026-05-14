const test = require("node:test");
const assert = require("node:assert/strict");

const core = require("../terrain-core.js");

function h(type, x, z, overrides) {
  return core.heightAt(type, x, z, overrides);
}

test("terrain library keeps the six original landform types first", () => {
  const ids = core.TERRAIN_TYPES.map((item) => item.id).slice(0, 6);
  assert.deepEqual(ids, ["peak", "basin", "ridge", "valley", "saddle", "cliff"]);
});

test("terrain library exposes A, B, and C teaching mode landform types", () => {
  const ids = core.TERRAIN_TYPES.map((item) => item.id);
  assert.deepEqual(ids, [
    "peak",
    "basin",
    "ridge",
    "valley",
    "saddle",
    "cliff",
    "plain",
    "hills",
    "mountain",
    "plateau",
    "large_basin",
    "reservoir_site",
    "water_diversion",
    "road_route",
    "campsite_site",
    "agriculture_layout",
  ]);
});

test("peak and basin have opposite closed-contour height logic", () => {
  assert.ok(h("peak", 0, 0) > h("peak", 0.9, 0.9));
  assert.ok(h("basin", 0, 0) < h("basin", 0.9, 0.9));
});

test("ridge is high on the axis and valley is low on the axis", () => {
  assert.ok(h("ridge", 0, 0.02) > h("ridge", 0, 0.55));
  assert.ok(h("valley", 0, 0.02) < h("valley", 0, 0.55));
});

test("saddle contains two summits separated by a lower pass", () => {
  const leftPeak = h("saddle", -0.42, 0);
  const rightPeak = h("saddle", 0.42, 0);
  const pass = h("saddle", 0, 0);
  assert.ok(leftPeak > pass + 120);
  assert.ok(rightPeak > pass + 120);
});

test("cliff produces a narrow high-gradient band for overlapping contours", () => {
  const beforeBand = h("cliff", -0.18, 0);
  const afterBand = h("cliff", 0.18, 0);
  const farSlope = h("cliff", -0.9, 0);
  assert.ok(afterBand - beforeBand > 260);
  assert.ok(beforeBand - farSlope < 180);
});

test("sampleGrid uses one geometry source and reports normalized values", () => {
  const grid = core.sampleGrid("peak", 21);
  assert.equal(grid.size, 21);
  assert.equal(grid.values.length, 441);
  assert.ok(grid.max > grid.min);
  assert.ok(grid.values.every((value) => Number.isFinite(value)));
});

test("terrainAt exposes deterministic same-source terrain detail metadata", () => {
  const first = core.terrainAt("mountain", 0.18, -0.27);
  const second = core.terrainAt("mountain", 0.18, -0.27);

  assert.deepEqual(first, second);
  assert.equal(core.heightAt("mountain", 0.18, -0.27), first.height);
  assert.ok(Math.abs(first.detailHeight) > 0.1);
  assert.ok(Math.abs(first.detailHeight) < 70);
  assert.equal(first.height, first.baseHeight + first.detailHeight);
  assert.ok(Number.isFinite(first.slope));
  assert.ok(Number.isFinite(first.aspect));
  assert.ok(first.roughness >= 0 && first.roughness <= 1);
  assert.ok(Number.isFinite(first.normal.x));
  assert.ok(Number.isFinite(first.normal.y));
  assert.ok(Number.isFinite(first.normal.z));
});

test("terrainAt can disable detail for idealized same-source contours", () => {
  const ideal = core.terrainAt("mountain", 0.18, -0.27, { detailScale: 0 });
  const natural = core.terrainAt("mountain", 0.18, -0.27, { detailScale: 1 });

  assert.equal(ideal.detailHeight, 0);
  assert.equal(ideal.height, ideal.baseHeight);
  assert.notEqual(natural.height, ideal.height);
});

test("sampleTeachingGrid returns a smooth deterministic classroom height field", () => {
  const teaching = core.sampleTeachingGrid("mountain", 19);
  const direct = core.sampleGrid("mountain", 19, { detailScale: 0 });

  assert.equal(teaching.size, 19);
  assert.deepEqual(teaching.values, direct.values);
  assert.ok(teaching.detailValues.every((value) => value === 0));
  assert.ok(teaching.values.every((value) => Number.isFinite(value)));
});

test("sampleRenderGrid returns deterministic local-realism terrain metadata", () => {
  const teaching = core.sampleTeachingGrid("mountain", 19);
  const render = core.sampleRenderGrid("mountain", 19);
  const repeat = core.sampleRenderGrid("mountain", 19);
  const count = render.size * render.size;
  const totalDelta = render.values.reduce((total, value, index) => total + Math.abs(value - teaching.values[index]), 0);

  assert.deepEqual(render, repeat);
  assert.equal(render.size, 19);
  assert.equal(render.values.length, count);
  assert.equal(render.slopeValues.length, count);
  assert.equal(render.aspectValues.length, count);
  assert.equal(render.normalValues.length, count * 3);
  assert.equal(render.roughnessValues.length, count);
  assert.ok(totalDelta > 300);
  assert.ok(render.detailValues.some((value) => Math.abs(value) > 5));
  assert.ok(render.slopeValues.every((value) => Number.isFinite(value) && value >= 0));
  assert.ok(render.roughnessValues.every((value) => value >= 0 && value <= 1));
});

test("sampleGrid carries the same detail, slope, normal, and roughness data used by renderers", () => {
  const grid = core.sampleGrid("ridge", 19);
  const count = grid.size * grid.size;
  const mid = Math.floor(count / 2);

  assert.equal(grid.baseValues.length, count);
  assert.equal(grid.detailValues.length, count);
  assert.equal(grid.slopeValues.length, count);
  assert.equal(grid.aspectValues.length, count);
  assert.equal(grid.roughnessValues.length, count);
  assert.equal(grid.normalValues.length, count * 3);
  assert.ok(grid.detailValues.some((value) => Math.abs(value) > 0.1));
  assert.equal(grid.values[mid], grid.baseValues[mid] + grid.detailValues[mid]);
  assert.ok(grid.slopeValues.every((value) => Number.isFinite(value) && value >= 0));
  assert.ok(grid.roughnessValues.every((value) => value >= 0 && value <= 1));
});

test("contourSegments returns drawable marching-squares line segments", () => {
  const grid = core.sampleGrid("peak", 49);
  const segments = core.contourSegments(grid, 400);
  assert.ok(segments.length > 8);
  for (const segment of segments.slice(0, 8)) {
    assert.equal(segment.length, 4);
    assert.ok(segment.every((value) => value >= -1 && value <= 1));
  }
});

test("contourPolylines joins marching-squares segments without changing the contour source", () => {
  const grid = core.sampleGrid("peak", 49);
  const level = 400;
  const segments = core.contourSegments(grid, level);
  const polylines = core.contourPolylines(grid, level);
  const polylineSegmentCount = polylines.reduce((total, line) => total + Math.max(0, line.points.length - 1), 0);

  assert.ok(polylines.length > 0);
  assert.equal(polylineSegmentCount, segments.length);
  for (const line of polylines) {
    assert.equal(line.level, level);
    assert.ok(line.length > 0);
    assert.ok(line.points.length >= 2);
    for (const point of line.points) {
      assert.ok(point.x >= -1 && point.x <= 1);
      assert.ok(point.z >= -1 && point.z <= 1);
    }
  }
});

test("profileSamples returns ordered A-B terrain heights", () => {
  const samples = core.profileSamples("ridge", { x: -0.8, z: -0.2 }, { x: 0.8, z: 0.2 }, 25);
  assert.equal(samples.length, 25);
  assert.equal(samples[0].t, 0);
  assert.equal(samples.at(-1).t, 1);
  assert.ok(samples.every((sample) => Number.isFinite(sample.height)));
  assert.ok(samples.some((sample) => sample.height > samples[0].height));
});

test("lineOfSight reports visible A-B points when the profile dips below the sight line", () => {
  const result = core.lineOfSight("basin", { x: -0.8, z: 0 }, { x: 0.8, z: 0 }, 41);

  assert.equal(result.visible, true);
  assert.equal(result.obstruction, null);
  assert.equal(result.samples.length, 41);
  assert.ok(result.clearanceMin > 0);
  assert.ok(result.samples.every((sample) => sample.sightHeight >= sample.height || sample.t === 0 || sample.t === 1));
});

test("lineOfSight marks the first terrain obstruction on a blocked A-B profile", () => {
  const result = core.lineOfSight("peak", { x: -0.9, z: 0 }, { x: 0.9, z: 0 }, 81);

  assert.equal(result.visible, false);
  assert.ok(result.obstruction);
  assert.ok(result.obstruction.t > 0 && result.obstruction.t < 1);
  assert.ok(result.obstruction.height > result.obstruction.sightHeight);
  assert.equal(result.obstruction, result.samples.find((sample) => sample.blocked));
});

test("flowVector follows local downslope direction from heightAt", () => {
  const valleyFlow = core.flowVector("valley", 0, 0.35);
  const basinFlow = core.flowVector("basin", 0.55, 0);

  assert.ok(valleyFlow.dz < -0.2);
  assert.ok(Math.abs(valleyFlow.dx) < 0.35);
  assert.ok(basinFlow.dx < -0.65);
  assert.ok(Math.abs(basinFlow.dz) < 0.25);
  assert.equal(valleyFlow.x, valleyFlow.dx);
  assert.equal(valleyFlow.z, valleyFlow.dz);
  assert.ok(valleyFlow.magnitude > 0);
  assert.ok(basinFlow.magnitude > 0);
});

test("flowField returns finite arrows and filters near-flat points", () => {
  const arrows = core.flowField("large_basin", [
    { x: 0.7, z: 0 },
    { x: 0, z: 0.7 },
    { x: 0, z: 0 },
  ]);
  const flat = core.flowField("basin", [{ x: 0.4, z: 0 }], { verticalScale: 0 });

  assert.ok(arrows.length >= 2);
  assert.equal(flat.length, 0);
  for (const arrow of arrows) {
    assert.ok(Number.isFinite(arrow.x));
    assert.ok(Number.isFinite(arrow.z));
    assert.ok(Number.isFinite(arrow.dx));
    assert.ok(Number.isFinite(arrow.dz));
    assert.ok(Number.isFinite(arrow.magnitude));
    assert.ok(Math.hypot(arrow.dx, arrow.dz) > 0.99);
  }
});

test("terrain metadata binds each landform to its planned reference card", () => {
  for (const item of core.TERRAIN_TYPES) {
    assert.match(item.card, /^[ABC][1-6]_/);
    assert.ok(item.label.length >= 2);
    assert.ok(item.rule.length >= 4);
    assert.match(item.mode, /^(landform|terrainType|application)$/);
  }
});

test("plain, hills, and mountain encode increasing relief and elevation", () => {
  const plain = core.sampleGrid("plain", 41);
  const hills = core.sampleGrid("hills", 41);
  const mountain = core.sampleGrid("mountain", 41);
  assert.ok(plain.max < 220);
  assert.ok(hills.min >= 180 && hills.max <= 540);
  assert.ok(mountain.max > 1000);
  assert.ok(mountain.max - mountain.min > hills.max - hills.min);
});

test("plateau is high and flatter inside than near the margin", () => {
  const center = Math.abs(h("plateau", 0, 0) - h("plateau", 0.2, 0.1));
  const edge = Math.abs(h("plateau", 0.78, 0) - h("plateau", 1, 0));
  assert.ok(h("plateau", 0, 0) > 850);
  assert.ok(edge > center * 2);
});

test("large basin and reservoir site preserve application teaching logic", () => {
  assert.ok(h("large_basin", 0, 0) < h("large_basin", 0.85, 0.85));
  assert.ok(h("reservoir_site", -0.45, 0) < h("reservoir_site", 0.55, 0.62));
  assert.ok(h("reservoir_site", 0.1, 0) < h("reservoir_site", 0.1, 0.8));
});

test("stage 8 application scenarios encode route, water diversion, campsite, and agriculture logic", () => {
  const roadStart = h("road_route", -0.75, -0.4);
  const roadEnd = h("road_route", 0.75, -0.12);
  const diversionSource = h("water_diversion", -0.62, 0.58);
  const diversionTarget = h("water_diversion", 0.58, -0.44);
  const diversionRouteA = h("water_diversion", -0.35, 0.32);
  const diversionRouteB = h("water_diversion", 0.28, -0.08);
  const campBench = h("campsite_site", 0.36, -0.3);
  const valleyFloor = h("campsite_site", 0, 0.45);
  const field = h("agriculture_layout", -0.45, -0.35);
  const hill = h("agriculture_layout", 0.72, 0.58);

  assert.ok(Math.abs(roadStart - roadEnd) < 130);
  assert.ok(diversionSource > diversionTarget + 140);
  assert.ok(Math.abs(diversionRouteA - diversionRouteB) < 170);
  assert.ok(campBench > valleyFloor + 80);
  assert.ok(field < 260);
  assert.ok(hill > field + 120);
});
