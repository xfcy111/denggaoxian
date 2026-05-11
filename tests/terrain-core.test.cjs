const test = require("node:test");
const assert = require("node:assert/strict");

const core = require("../terrain-core.js");

function h(type, x, z, overrides) {
  return core.heightAt(type, x, z, overrides);
}

test("terrain library exposes the six required landform types", () => {
  const ids = core.TERRAIN_TYPES.map((item) => item.id);
  assert.deepEqual(ids, ["peak", "basin", "ridge", "valley", "saddle", "cliff"]);
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

test("contourSegments returns drawable marching-squares line segments", () => {
  const grid = core.sampleGrid("peak", 49);
  const segments = core.contourSegments(grid, 400);
  assert.ok(segments.length > 8);
  for (const segment of segments.slice(0, 8)) {
    assert.equal(segment.length, 4);
    assert.ok(segment.every((value) => value >= -1 && value <= 1));
  }
});

test("terrain metadata binds each landform to its planned reference card", () => {
  for (const item of core.TERRAIN_TYPES) {
    assert.match(item.card, /^A[1-6]_/);
    assert.ok(item.label.length >= 2);
    assert.ok(item.rule.length >= 4);
  }
});

