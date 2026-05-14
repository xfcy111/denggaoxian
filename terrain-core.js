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
      mode: "landform",
      label: "山峰",
      card: "A1_peak",
      rule: "闭合等高线，中间高、四周低",
      proverb: "闭合环线向中心升高",
    },
    {
      id: "basin",
      mode: "landform",
      label: "盆地",
      card: "A2_basin",
      rule: "闭合等高线，中间低、四周高",
      proverb: "示坡线指向低处",
    },
    {
      id: "ridge",
      mode: "landform",
      label: "山脊",
      card: "A3_ridge",
      rule: "等高线凸向低值，常为分水岭",
      proverb: "凸低为脊",
    },
    {
      id: "valley",
      mode: "landform",
      label: "山谷",
      card: "A4_valley",
      rule: "等高线凸向高值，常发育河流",
      proverb: "凸高为谷",
    },
    {
      id: "saddle",
      mode: "landform",
      label: "鞍部",
      card: "A5_saddle",
      rule: "两个山顶之间的低缓通道",
      proverb: "两峰之间找鞍部",
    },
    {
      id: "cliff",
      mode: "landform",
      label: "陡崖",
      card: "A6_cliff",
      rule: "多条不同高度等高线重合",
      proverb: "重合多线是陡崖",
    },
    {
      id: "plain",
      mode: "terrainType",
      label: "平原",
      card: "B1_plain",
      rule: "海拔低于 200m，等高线稀疏，地势平坦",
      proverb: "低而平，线稀疏",
    },
    {
      id: "hills",
      mode: "terrainType",
      label: "丘陵",
      card: "B2_hills",
      rule: "海拔 200-500m，起伏和缓，坡度较小",
      proverb: "起伏小，坡度缓",
    },
    {
      id: "mountain",
      mode: "terrainType",
      label: "山地",
      card: "B3_mountain",
      rule: "海拔高，坡陡谷深，等高线密集",
      proverb: "线密坡陡，高差大",
    },
    {
      id: "plateau",
      mode: "terrainType",
      label: "高原",
      card: "B4_plateau",
      rule: "海拔高，内部平坦，边缘陡峭",
      proverb: "顶平边陡",
    },
    {
      id: "large_basin",
      mode: "terrainType",
      label: "大盆地",
      card: "B5_large_basin",
      rule: "四周高、中间低，常见向心状水系",
      proverb: "四周高，中间低",
    },
    {
      id: "reservoir_site",
      mode: "application",
      label: "水库坝址",
      card: "C1_reservoir_site",
      rule: "口小肚大，坝址横跨峡谷窄口，库区位于上游",
      proverb: "坝修窄口，库蓄宽肚",
    },
    {
      id: "water_diversion",
      mode: "application",
      label: "引水线路",
      card: "C5_water_diversion",
      rule: "水源高、受水区低，线路沿等高线缓降并避开陡坡深谷",
      proverb: "高水低引，沿线缓降",
    },
    {
      id: "road_route",
      mode: "application",
      label: "公路选线",
      card: "C2_road_route",
      rule: "公路线尽量沿等高线，避开陡坡、陡崖和深切河谷",
      proverb: "路随线走，避陡绕谷",
    },
    {
      id: "campsite_site",
      mode: "application",
      label: "宿营地选址",
      card: "C3_campsite_site",
      rule: "宿营地选高地缓坡，避开河谷、陡坡和陡崖",
      proverb: "高地缓坡，远离河谷",
    },
    {
      id: "agriculture_layout",
      mode: "application",
      label: "农业布局",
      card: "C4_agriculture_layout",
      rule: "平缓低地宜种植，山地丘陵宜林牧，水域低洼宜水产",
      proverb: "平种山牧，水域养殖",
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

  function smoothstep(edge0, edge1, value) {
    const t = clamp((value - edge0) / (edge1 - edge0), 0, 1);
    return t * t * (3 - 2 * t);
  }

  function resolveParams(overrides) {
    return Object.assign({}, DEFAULT_PARAMS, overrides || {});
  }

  function baseHeightAt(type, x, z, params) {
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
      case "plain": {
        const tilt = 42 * ((x + z + 2) / 4);
        const undulation = 7 * Math.sin((x - z) * Math.PI) + 5 * Math.cos(z * Math.PI * 1.2);
        height = 62 + relief * (tilt + undulation);
        break;
      }
      case "hills": {
        const hillA = 175 * gaussian(x, z, -0.46, -0.18, 0.32, 0.36);
        const hillB = 150 * gaussian(x, z, 0.38, 0.34, 0.34, 0.32);
        const hillC = 105 * gaussian(x, z, 0.08, -0.58, 0.42, 0.26);
        const lowSwale = 26 * gaussian(x, z, -0.02, 0.12, 0.28, 0.7);
        height = 215 + relief * (hillA + hillB + hillC - lowSwale);
        break;
      }
      case "mountain": {
        const peakA = 880 * gaussian(x, z, -0.32, -0.2, 0.26, 0.32);
        const peakB = 790 * gaussian(x, z, 0.42, 0.36, 0.3, 0.28);
        const ridgeArm = 350 * Math.exp(-Math.pow(z + 0.22 * x, 2) / 0.035);
        const valleyA = 270 * Math.exp(-Math.pow(x + 0.68, 2) / 0.035);
        const valleyB = 220 * Math.exp(-Math.pow(x - 0.05, 2) / 0.045) * ((z + 1) / 2);
        height = 460 + relief * (peakA + peakB + ridgeArm - valleyA - valleyB);
        break;
      }
      case "plateau": {
        const r = Math.sqrt(x * x + z * z);
        const edgeDrop = 790 * smoothstep(0.58, 0.96, r);
        const interior = 18 * Math.sin(x * Math.PI * 1.1) + 12 * Math.cos(z * Math.PI * 0.9);
        height = 1005 - relief * edgeDrop + interior * (1 - smoothstep(0.42, 0.72, r));
        break;
      }
      case "large_basin": {
        const floor = 650 * gaussian(x, z, 0, 0, 0.7, 0.66);
        const rim = 150 * Math.max(Math.abs(x), Math.abs(z));
        const cornerHigh = 95 * gaussian(Math.abs(x), Math.abs(z), 0.86, 0.86, 0.38, 0.38);
        height = 940 - relief * floor + rim + cornerHigh;
        break;
      }
      case "reservoir_site": {
        const downstream = (z + 1) / 2;
        const valleyWidth = 0.08 + 0.34 * smoothstep(-0.1, 0.85, z);
        const valleyFloor = 360 * Math.exp(-(x * x) / (valleyWidth * valleyWidth));
        const sideHills = 320 * Math.pow(Math.abs(x), 1.35);
        const upstreamRim = 340 * smoothstep(0.28, 0.95, z);
        const pocketLow = 115 * gaussian(x, z, -0.18, 0.45, 0.48, 0.34);
        height = 260 + sideHills + upstreamRim + 110 * downstream - relief * (valleyFloor + pocketLow);
        break;
      }
      case "water_diversion": {
        const highSource = 145 * gaussian(x, z, -0.62, 0.58, 0.32, 0.28);
        const receivingField = 95 * gaussian(x, z, 0.58, -0.44, 0.34, 0.3);
        const valleyCut = 105 * Math.exp(-Math.pow(x + 0.05, 2) / 0.055) * Math.exp(-Math.pow(z - 0.04, 2) / 0.5);
        const contourBench = 48 * Math.exp(-Math.pow(z + 0.12 + 0.26 * x, 2) / 0.035);
        const regionalFall = 185 * ((z + 1) / 2) + 95 * ((1 - x) / 2);
        height = 250 + regionalFall + relief * (highSource + contourBench - receivingField - valleyCut);
        break;
      }
      case "road_route": {
        const regionalSlope = 145 * ((z + 1) / 2);
        const ridgeBarrier = 230 * Math.exp(-Math.pow(x - 0.18, 2) / 0.05) * smoothstep(-0.2, 0.9, z);
        const valleyCut = 155 * Math.exp(-Math.pow(x + 0.42, 2) / 0.045) * Math.exp(-Math.pow(z - 0.3, 2) / 0.34);
        const bench = 55 * Math.exp(-Math.pow(z + 0.28 + 0.12 * Math.sin(x * Math.PI), 2) / 0.025);
        height = 285 + regionalSlope + ridgeBarrier - valleyCut + bench + 18 * Math.sin(x * Math.PI * 1.4);
        break;
      }
      case "campsite_site": {
        const riverValley = 280 * Math.exp(-(x * x) / 0.035) * Math.exp(-Math.pow(z - 0.35, 2) / 0.44);
        const bench = 145 * gaussian(x, z, 0.36, -0.3, 0.34, 0.28);
        const steepBack = 260 * smoothstep(0.45, 0.95, Math.max(Math.abs(x + 0.52), Math.abs(z + 0.58)));
        height = 330 + 115 * ((z + 1) / 2) + relief * (bench + steepBack - riverValley);
        break;
      }
      case "agriculture_layout": {
        const plainField = 110 * gaussian(x, z, -0.42, -0.35, 0.52, 0.38);
        const hillPasture = 235 * gaussian(x, z, 0.62, 0.52, 0.44, 0.4);
        const waterLow = 95 * gaussian(x, z, 0.1, -0.68, 0.36, 0.22);
        height = 210 + 70 * ((x + z + 2) / 4) - relief * plainField - waterLow + relief * hillPasture;
        break;
      }
      default:
        throw new Error(`Unknown terrain type: ${type}`);
    }

    return clamp(height * params.verticalScale, 20, 1600);
  }

  function edgeFade(x, z) {
    return 1 - smoothstep(0.82, 1, Math.max(Math.abs(x), Math.abs(z)));
  }

  function terrainNoise(x, z, seed) {
    const a = Math.sin((x * 12.9898 + z * 78.233 + seed * 19.19) * 1.07);
    const b = Math.sin(x * 31.7 - z * 24.3 + seed * 3.11) * 0.55;
    const c = Math.cos((x + z) * 17.9 + seed * 5.73) * 0.32;
    const d = Math.sin((x - z) * 47.1 - seed * 1.37) * 0.16;
    return (a + b + c + d) / 2.03;
  }

  function baseSlopeAt(type, x, z, params) {
    const step = 0.018;
    const leftX = clamp(x - step, -1, 1);
    const rightX = clamp(x + step, -1, 1);
    const downZ = clamp(z - step, -1, 1);
    const upZ = clamp(z + step, -1, 1);
    const dxDenom = rightX - leftX || step * 2;
    const dzDenom = upZ - downZ || step * 2;
    const dx = (baseHeightAt(type, rightX, z, params) - baseHeightAt(type, leftX, z, params)) / dxDenom;
    const dz = (baseHeightAt(type, x, upZ, params) - baseHeightAt(type, x, downZ, params)) / dzDenom;
    return Math.hypot(dx, dz);
  }

  function detailHeightAt(type, x, z, baseHeight, params) {
    const fade = edgeFade(x, z);
    if (fade <= 0 || params.detailScale === 0) return 0;

    const slopeGate = clamp(baseSlopeAt(type, x, z, params) / 620, 0, 1);
    const reliefGate = clamp(params.relief, 0.2, 1.4);
    const r = Math.hypot(x, z);
    const axisRidge = z - 0.28 * x;
    const axisValley = z - 0.25 * x;
    const baseNoise = terrainNoise(x, z, type.length + baseHeight * 0.001);
    let shaped = baseNoise;
    let amplitude = 10;

    switch (type) {
      case "peak":
        amplitude = 18;
        shaped = baseNoise * 0.55 + Math.sin(Math.atan2(z, x) * 9 + r * 18) * 0.32 * slopeGate;
        break;
      case "basin":
        amplitude = 13;
        shaped = Math.cos(r * 24) * 0.34 * (1 - slopeGate * 0.35);
        break;
      case "ridge":
        amplitude = 16;
        shaped = baseNoise * 0.5 + Math.sin(x * 22 + z * 5) * 0.32 * Math.exp(-(axisRidge * axisRidge) / 0.18);
        break;
      case "valley":
        amplitude = 15;
        shaped = baseNoise * 0.42 - Math.cos((x + z) * 18) * 0.28 * Math.exp(-(axisValley * axisValley) / 0.16);
        break;
      case "saddle":
        amplitude = 15;
        shaped = baseNoise * 0.48 + Math.sin((x * x - z * z) * 18) * 0.26;
        break;
      case "cliff":
        amplitude = 22;
        shaped = baseNoise * 0.38 + Math.sin(z * 30) * 0.42 * Math.exp(-x * x * 16);
        break;
      case "plain":
        amplitude = 2.8;
        shaped = baseNoise * 0.35;
        break;
      case "hills":
        amplitude = 11;
        shaped = baseNoise * 0.5 + Math.sin((x - z) * 16) * 0.22;
        break;
      case "mountain":
        amplitude = 38;
        shaped = baseNoise * 0.58 + Math.sin(x * 34 + z * 11) * 0.3 * slopeGate;
        break;
      case "plateau":
        amplitude = 10;
        shaped = baseNoise * 0.4 + Math.sin(r * 16) * 0.25 * smoothstep(0.48, 0.95, r);
        break;
      case "large_basin":
        amplitude = 12;
        shaped = baseNoise * 0.42 + Math.cos(r * 20) * 0.22;
        break;
      case "reservoir_site":
        amplitude = 14;
        shaped = baseNoise * 0.42 - Math.sin(z * 24) * 0.22 * Math.exp(-(x * x) / 0.22);
        break;
      case "water_diversion":
        amplitude = 12;
        shaped = baseNoise * 0.42 + Math.sin((z + 0.12 + 0.26 * x) * 34) * 0.18;
        break;
      case "road_route":
        amplitude = 12;
        shaped = baseNoise * 0.42 + Math.cos((z + 0.28 + 0.12 * Math.sin(x * Math.PI)) * 36) * 0.16;
        break;
      case "campsite_site":
        amplitude = 12;
        shaped = baseNoise * 0.4 + Math.sin((x + z) * 18) * 0.18;
        break;
      case "agriculture_layout":
        amplitude = 8;
        shaped = baseNoise * 0.35 + Math.sin(x * 13 - z * 9) * 0.12;
        break;
      default:
        amplitude = 10;
    }

    const detailScale = typeof params.detailScale === "number" ? params.detailScale : 1;
    const slopeMix = 0.35 + slopeGate * 0.65;
    return shaped * amplitude * reliefGate * fade * slopeMix * detailScale;
  }

  function detailedHeightAt(type, x, z, params) {
    const baseHeight = baseHeightAt(type, x, z, params);
    const detailHeight = detailHeightAt(type, x, z, baseHeight, params);
    return clamp(baseHeight + detailHeight, 20, 1600);
  }

  function terrainAt(type, x, z, overrides) {
    const params = resolveParams(overrides);
    const safeX = clamp(x, -1, 1);
    const safeZ = clamp(z, -1, 1);
    const baseHeight = baseHeightAt(type, safeX, safeZ, params);
    const detailHeight = detailHeightAt(type, safeX, safeZ, baseHeight, params);
    const height = clamp(baseHeight + detailHeight, 20, 1600);
    const step = 0.012;
    const leftX = clamp(safeX - step, -1, 1);
    const rightX = clamp(safeX + step, -1, 1);
    const downZ = clamp(safeZ - step, -1, 1);
    const upZ = clamp(safeZ + step, -1, 1);
    const dxDenom = rightX - leftX || step * 2;
    const dzDenom = upZ - downZ || step * 2;
    const dx = (detailedHeightAt(type, rightX, safeZ, params) - detailedHeightAt(type, leftX, safeZ, params)) / dxDenom;
    const dz = (detailedHeightAt(type, safeX, upZ, params) - detailedHeightAt(type, safeX, downZ, params)) / dzDenom;
    const slope = Math.hypot(dx, dz);
    const normalScale = 650;
    const nx = -dx / normalScale;
    const ny = 1;
    const nz = -dz / normalScale;
    const nLen = Math.hypot(nx, ny, nz) || 1;
    const roughness = clamp(0.24 + Math.abs(detailHeight) / 55 + clamp(slope / 900, 0, 0.55), 0, 1);

    return {
      height,
      baseHeight,
      detailHeight: height - baseHeight,
      slope,
      aspect: Math.atan2(dz, dx),
      roughness,
      normal: {
        x: nx / nLen,
        y: ny / nLen,
        z: nz / nLen,
      },
    };
  }

  function heightAt(type, x, z, overrides) {
    return terrainAt(type, x, z, overrides).height;
  }

  function sampleGrid(type, size, overrides) {
    if (!Number.isInteger(size) || size < 2) {
      throw new Error("sampleGrid size must be an integer greater than 1");
    }

    const values = [];
    const baseValues = [];
    const detailValues = [];
    const slopeValues = [];
    const aspectValues = [];
    const roughnessValues = [];
    const normalValues = [];
    let min = Infinity;
    let max = -Infinity;

    for (let row = 0; row < size; row += 1) {
      const z = -1 + (2 * row) / (size - 1);
      for (let col = 0; col < size; col += 1) {
        const x = -1 + (2 * col) / (size - 1);
        const terrain = terrainAt(type, x, z, overrides);
        const value = terrain.height;
        values.push(value);
        baseValues.push(terrain.baseHeight);
        detailValues.push(terrain.detailHeight);
        slopeValues.push(terrain.slope);
        aspectValues.push(terrain.aspect);
        roughnessValues.push(terrain.roughness);
        normalValues.push(terrain.normal.x, terrain.normal.y, terrain.normal.z);
        min = Math.min(min, value);
        max = Math.max(max, value);
      }
    }

    return {
      type,
      size,
      min,
      max,
      values,
      baseValues,
      detailValues,
      slopeValues,
      aspectValues,
      roughnessValues,
      normalValues,
    };
  }

  function sampleTeachingGrid(type, size, overrides) {
    return sampleGrid(type, size, Object.assign({}, overrides || {}, { detailScale: 0 }));
  }

  function sampleRenderGrid(type, size, overrides) {
    const params = Object.assign({}, overrides || {});
    const renderDetailScale = typeof params.renderDetailScale === "number" ? params.renderDetailScale : 1.55;
    delete params.renderDetailScale;
    params.detailScale = typeof params.detailScale === "number"
      ? Math.max(params.detailScale, renderDetailScale)
      : renderDetailScale;
    return sampleGrid(type, size, params);
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

  function pointKey(point) {
    return `${point.x.toFixed(5)},${point.z.toFixed(5)}`;
  }

  function segmentLength(a, b) {
    return Math.hypot(a.x - b.x, a.z - b.z);
  }

  function contourPolylines(grid, level) {
    const segments = contourSegments(grid, level).map((segment) => ({
      a: { x: segment[0], z: segment[1] },
      b: { x: segment[2], z: segment[3] },
      used: false,
    }));
    const endpointMap = new Map();

    segments.forEach((segment, index) => {
      for (const point of [segment.a, segment.b]) {
        const key = pointKey(point);
        if (!endpointMap.has(key)) endpointMap.set(key, []);
        endpointMap.get(key).push(index);
      }
    });

    function nextUnused(key) {
      const candidates = endpointMap.get(key) || [];
      return candidates.find((index) => !segments[index].used);
    }

    function extend(points, append) {
      while (points.length) {
        const edgePoint = append ? points[points.length - 1] : points[0];
        const key = pointKey(edgePoint);
        const index = nextUnused(key);
        if (index === undefined) return;
        const segment = segments[index];
        segment.used = true;
        const aKey = pointKey(segment.a);
        const bKey = pointKey(segment.b);
        const nextPoint = aKey === key ? segment.b : bKey === key ? segment.a : null;
        if (!nextPoint) return;
        if (append) {
          points.push(nextPoint);
        } else {
          points.unshift(nextPoint);
        }
      }
    }

    const polylines = [];
    for (let index = 0; index < segments.length; index += 1) {
      const segment = segments[index];
      if (segment.used) continue;
      segment.used = true;
      const points = [segment.a, segment.b];
      extend(points, true);
      extend(points, false);

      let length = 0;
      for (let pointIndex = 1; pointIndex < points.length; pointIndex += 1) {
        length += segmentLength(points[pointIndex - 1], points[pointIndex]);
      }

      polylines.push({
        level,
        points,
        closed: points.length > 2 && pointKey(points[0]) === pointKey(points[points.length - 1]),
        length,
      });
    }

    return polylines;
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

  function lineOfSight(type, start, end, count, overrides) {
    const samples = profileSamples(type, start, end, count || 100, overrides);
    const startHeight = samples[0].height;
    const endHeight = samples[samples.length - 1].height;
    const tolerance = 0.5;
    let obstruction = null;
    let clearanceMin = Infinity;

    for (const sample of samples) {
      sample.sightHeight = startHeight + (endHeight - startHeight) * sample.t;
      sample.clearance = sample.sightHeight - sample.height;
      sample.blocked = sample.t > 0 && sample.t < 1 && sample.clearance < -tolerance;
      if (sample.t > 0 && sample.t < 1) {
        clearanceMin = Math.min(clearanceMin, sample.clearance);
      }
      if (!obstruction && sample.blocked) {
        obstruction = sample;
      }
    }

    return {
      visible: obstruction === null,
      obstruction,
      clearanceMin: clearanceMin === Infinity ? 0 : clearanceMin,
      samples,
    };
  }

  function flowVector(type, x, z, overrides) {
    const step = 0.012;
    const left = heightAt(type, clamp(x - step, -1, 1), z, overrides);
    const right = heightAt(type, clamp(x + step, -1, 1), z, overrides);
    const down = heightAt(type, x, clamp(z - step, -1, 1), overrides);
    const up = heightAt(type, x, clamp(z + step, -1, 1), overrides);
    const gradX = (right - left) / (Math.min(1, x + step) - Math.max(-1, x - step) || step * 2);
    const gradZ = (up - down) / (Math.min(1, z + step) - Math.max(-1, z - step) || step * 2);
    const magnitude = Math.hypot(gradX, gradZ);

    if (magnitude < 1e-6) {
      return { x: 0, z: 0, dx: 0, dz: 0, magnitude };
    }

    const dx = -gradX / magnitude;
    const dz = -gradZ / magnitude;
    return {
      x: dx,
      z: dz,
      dx,
      dz,
      magnitude,
    };
  }

  function flowField(type, points, overrides) {
    const minMagnitude = 1;
    return (points || [])
      .map((point) => {
        const vector = flowVector(type, point.x, point.z, overrides);
        return {
          x: point.x,
          z: point.z,
          dx: vector.dx,
          dz: vector.dz,
          magnitude: vector.magnitude,
        };
      })
      .filter((arrow) => arrow.magnitude >= minMagnitude);
  }

  return {
    TERRAIN_TYPES,
    contourLevels,
    contourPolylines,
    contourSegments,
    flowField,
    flowVector,
    heightAt,
    lineOfSight,
    profileSamples,
    sampleRenderGrid,
    sampleGrid,
    sampleTeachingGrid,
    terrainAt,
  };
});
