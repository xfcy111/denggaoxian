(function (root, factory) {
  if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    root.ContourTerrain = factory();
  }
})(typeof self !== "undefined" ? self : this, function () {
  const TERRAIN_TYPES = [
    {
      id: "peak",
      label: "山峰",
      card: "A1_peak",
      rule: "闭合等高线，中间高、四周低",
      proverb: "闭合环线向中心升高",
    },
    {
      id: "basin",
      label: "盆地",
      card: "A2_basin",
      rule: "闭合等高线，中间低、四周高",
      proverb: "示坡线指向低处",
    },
    {
      id: "ridge",
      label: "山脊",
      card: "A3_ridge",
      rule: "等高线凸向低值，常为分水岭",
      proverb: "凸低为脊",
    },
    {
      id: "valley",
      label: "山谷",
      card: "A4_valley",
      rule: "等高线凸向高值，常发育河流",
      proverb: "凸高为谷",
    },
    {
      id: "saddle",
      label: "鞍部",
      card: "A5_saddle",
      rule: "两个山顶之间的低缓通道",
      proverb: "两峰之间找鞍部",
    },
    {
      id: "cliff",
      label: "陡崖",
      card: "A6_cliff",
      rule: "多条不同高度等高线重合",
      proverb: "重合多线是陡崖",
    },
  ];

  const DEFAULT_PARAMS = {
    verticalScale: 1,
    relief: 1,
    softness: 1,
  };

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function gaussian(x, z, cx, cz, sx, sz) {
    const dx = (x - cx) / sx;
    const dz = (z - cz) / sz;
    return Math.exp(-(dx * dx + dz * dz));
  }

  function resolveParams(overrides) {
    return Object.assign({}, DEFAULT_PARAMS, overrides || {});
  }

  function heightAt(type, x, z, overrides) {
    const params = resolveParams(overrides);
    const relief = params.relief;
    const softness = params.softness;
    let height;

    switch (type) {
      case "peak": {
        const cone = gaussian(x, z, 0, 0, 0.58 * softness, 0.58 * softness);
        const shoulder = gaussian(x, z, -0.28, 0.22, 0.9, 0.65) * 70;
        height = 95 + relief * (575 * cone + shoulder);
        break;
      }
      case "basin": {
        const hollow = gaussian(x, z, 0, 0, 0.62 * softness, 0.62 * softness);
        const rim = gaussian(Math.abs(x), Math.abs(z), 0.82, 0.82, 0.5, 0.5) * 70;
        height = 660 - relief * 525 * hollow + rim;
        break;
      }
      case "ridge": {
        const axis = z - 0.28 * x;
        const along = 0.82 + 0.18 * Math.cos(x * Math.PI * 1.2);
        height = 125 + relief * (455 * Math.exp(-(axis * axis) / 0.055) * along);
        height += 70 * (1 - (z + 1) / 2);
        break;
      }
      case "valley": {
        const axis = z - 0.25 * x;
        const upstreamRise = 250 * ((z + 1) / 2);
        const sideSlope = 315 * Math.exp(-(axis * axis) / 0.06);
        height = 260 + upstreamRise + 140 * Math.abs(x) - relief * sideSlope;
        break;
      }
      case "saddle": {
        const leftPeak = 445 * gaussian(x, z, -0.44, 0, 0.32, 0.42);
        const rightPeak = 485 * gaussian(x, z, 0.44, 0, 0.32, 0.42);
        const centralPass = 95 * gaussian(x, z, 0, 0, 0.34, 0.28);
        const flanks = 90 * Math.abs(z);
        height = 190 + relief * (leftPeak + rightPeak - centralPass) + flanks;
        break;
      }
      case "cliff": {
        const gentleSlope = 205 * ((x + 1) / 2);
        const cliffStep = 375 / (1 + Math.exp(-28 * x));
        const corrugation = 22 * Math.sin(z * Math.PI * 3) * Math.exp(-x * x * 7);
        height = 150 + relief * (gentleSlope + cliffStep + corrugation);
        break;
      }
      default:
        throw new Error(`Unknown terrain type: ${type}`);
    }

    return clamp(height * params.verticalScale, 20, 920);
  }

  function sampleGrid(type, size, overrides) {
    if (!Number.isInteger(size) || size < 2) {
      throw new Error("sampleGrid size must be an integer greater than 1");
    }

    const values = [];
    let min = Infinity;
    let max = -Infinity;

    for (let row = 0; row < size; row += 1) {
      const z = -1 + (2 * row) / (size - 1);
      for (let col = 0; col < size; col += 1) {
        const x = -1 + (2 * col) / (size - 1);
        const value = heightAt(type, x, z, overrides);
        values.push(value);
        min = Math.min(min, value);
        max = Math.max(max, value);
      }
    }

    return { type, size, min, max, values };
  }

  function valueAt(grid, col, row) {
    return grid.values[row * grid.size + col];
  }

  function pointFor(size, col, row) {
    return [-1 + (2 * col) / (size - 1), -1 + (2 * row) / (size - 1)];
  }

  function edgeCrosses(a, b, level) {
    return (a < level && b >= level) || (b < level && a >= level);
  }

  function interpolate(pa, pb, va, vb, level) {
    const t = va === vb ? 0.5 : (level - va) / (vb - va);
    return [
      pa[0] + (pb[0] - pa[0]) * t,
      pa[1] + (pb[1] - pa[1]) * t,
    ];
  }

  function contourSegments(grid, level) {
    const segments = [];
    const last = grid.size - 1;

    for (let row = 0; row < last; row += 1) {
      for (let col = 0; col < last; col += 1) {
        const p00 = pointFor(grid.size, col, row);
        const p10 = pointFor(grid.size, col + 1, row);
        const p11 = pointFor(grid.size, col + 1, row + 1);
        const p01 = pointFor(grid.size, col, row + 1);
        const v00 = valueAt(grid, col, row);
        const v10 = valueAt(grid, col + 1, row);
        const v11 = valueAt(grid, col + 1, row + 1);
        const v01 = valueAt(grid, col, row + 1);
        const hits = [];

        if (edgeCrosses(v00, v10, level)) hits.push(interpolate(p00, p10, v00, v10, level));
        if (edgeCrosses(v10, v11, level)) hits.push(interpolate(p10, p11, v10, v11, level));
        if (edgeCrosses(v11, v01, level)) hits.push(interpolate(p11, p01, v11, v01, level));
        if (edgeCrosses(v01, v00, level)) hits.push(interpolate(p01, p00, v01, v00, level));

        if (hits.length === 2) {
          segments.push([hits[0][0], hits[0][1], hits[1][0], hits[1][1]]);
        } else if (hits.length === 4) {
          segments.push([hits[0][0], hits[0][1], hits[1][0], hits[1][1]]);
          segments.push([hits[2][0], hits[2][1], hits[3][0], hits[3][1]]);
        }
      }
    }

    return segments;
  }

  function contourLevels(min, max, interval) {
    const step = interval || 100;
    const first = Math.ceil(min / step) * step;
    const last = Math.floor(max / step) * step;
    const levels = [];
    for (let level = first; level <= last; level += step) {
      levels.push(level);
    }
    return levels;
  }

  function profileSamples(type, start, end, count, overrides) {
    const samples = [];
    const total = Math.max(2, count || 80);
    for (let index = 0; index < total; index += 1) {
      const t = index / (total - 1);
      const x = start.x + (end.x - start.x) * t;
      const z = start.z + (end.z - start.z) * t;
      samples.push({ t, x, z, height: heightAt(type, x, z, overrides) });
    }
    return samples;
  }

  return {
    TERRAIN_TYPES,
    contourLevels,
    contourSegments,
    heightAt,
    profileSamples,
    sampleGrid,
  };
});

