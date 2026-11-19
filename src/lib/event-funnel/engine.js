/**
 * The event bar funnel. One hand written perspective engine, one panel of questions.
 *
 * Generated from the standalone prototype; see tools/extract-event-funnel.py.
 */
export function mountEventFunnel(initialLang) {
  'use strict';
  var SVG = document.getElementById('sheet'), W = 1000, CX = W / 2;
  var EYE = 1.6, FOCAL = 1050;
  var SHOT = {
    near: { yaw:  0.785, dist: 4.20, tx: -1.70, tz: 1.25, cy: 258 },
    wide: { yaw: -0.26, dist: 7.40, tx:  0.45, tz: 1.30, cy: 350 }
  };
  var cam = Object.assign({}, SHOT.near);

  function P(x, y, z) {
    var dx = x - cam.tx, dz = z - cam.tz;
    var c = Math.cos(cam.yaw), s = Math.sin(cam.yaw);
    var rx = dx * c + dz * s, rz = -dx * s + dz * c;
    var zc = Math.max(0.25, rz + cam.dist), k = (cam.focal || FOCAL) / zc;
    return [CX + rx * k, cam.cy - (y - (cam.eye == null ? EYE : cam.eye)) * k, k];
  }
  // Each piece now carries its own heading, so the bar and the booth can both
  // be turned to face the middle of the room instead of facing the camera.
  function L(o, lx, ly, lz) {
    var c = Math.cos(o.rot || 0), s = Math.sin(o.rot || 0);
    return P(o.x + lx * c - lz * s, ly, o.z + lx * s + lz * c);
  }
  function fmt(p) { return p[0].toFixed(1) + ' ' + p[1].toFixed(1); }
  function poly(ps) { return 'M' + ps.map(fmt).join(' L') + ' Z'; }
  function facing(ps) {
    var a = 0;
    for (var i = 0; i < ps.length; i++) { var p = ps[i], q = ps[(i + 1) % ps.length]; a += p[0] * q[1] - q[0] * p[1]; }
    return a < 0;
  }

  var ink = [], RV = 1, OP = 1;
  function solid(d) {
    if (RV <= 0.002) return;
    ink.push('<path d="' + d + '" fill="#1f1f1f" fill-opacity="' + RV.toFixed(3) + '" stroke="none"/>');
  }
  function line(d, o) {
    if (RV <= 0.002 || !d) return;
    o = o || {};
    ink.push('<path d="' + d + '" fill="none" stroke="' + (o.stroke || '#e8e8e8') + '" stroke-width="' + (o.w || 1.5) +
      '" stroke-linejoin="round" stroke-linecap="round"' + (OP < 0.999 ? ' stroke-opacity="' + OP.toFixed(3) + '"' : '') +
      (o.dash ? ' stroke-dasharray="' + o.dash + '"' : ' pathLength="1" stroke-dasharray="1" stroke-dashoffset="' + (1 - RV).toFixed(4) + '"') + '/>');
  }

  function faces(o, w, d, y0, y1) {
    var hw = w / 2, hd = d / 2;
    var c = [[-hw, -hd], [hw, -hd], [hw, hd], [-hw, hd]];
    var out = [{ k: 'top', p: c.map(function (q) { return L(o, q[0], y1, q[1]); }) }];
    for (var i = 0; i < 4; i++) {
      var a = c[i], b = c[(i + 1) % 4];
      out.push({ k: i === 0 ? 'front' : 'side', p: [L(o, a[0], y0, a[1]), L(o, b[0], y0, b[1]), L(o, b[0], y1, b[1]), L(o, a[0], y1, a[1])] });
    }
    return out;
  }
  function box(o, w, d, y0, y1, opt) {
    var f = faces(o, w, d, y0, y1).filter(function (q) { return facing(q.p); });
    f.forEach(function (q) { solid(poly(q.p)); });
    f.forEach(function (q) { line(poly(q.p), opt); });
  }

  function lathe(o, lx, lz, yBase, sil, col) {
    var a = L(o, lx, yBase, lz), k = a[2];
    function path(seg) {
      return seg.map(function (pt, i) { return (i ? 'L' : 'M') + (a[0] + pt[0] * k).toFixed(1) + ' ' + (a[1] - pt[1] * k).toFixed(1); }).join(' ');
    }
    var outline = path(sil[0]);
    solid(outline + ' Z');
    // sil[2], when present, is the liquid only, so the cap stays dark
    var fi = (typeof sil.fill === 'number') ? sil.fill : -1;
    if (col && RV > 0.002) {
      ink.push('<path d="' + path(fi >= 0 ? sil[fi] : sil[0]) + ' Z" fill="' + col + '" fill-opacity="' + (RV * 0.85).toFixed(3) + '" stroke="none"/>');
    }
    var strokes = [];
    sil.forEach(function (seg, i) { if (i !== fi) strokes.push(path(seg)); });
    line(strokes.join(' '));
  }
  function PREMIX(h, r) {
    var sh = h * 0.78, nk = r * 0.44, cap = h * 0.945, lip = r * 0.60;
    var a = [
      [[-r,0.004],[-r,sh],[-nk,h*0.885],[-nk,cap],[-lip,cap],[-lip,h],[lip,h],[lip,cap],[nk,cap],[nk,h*0.885],[r,sh],[r,0.004],[-r,0.004]],
      [[-lip,cap],[lip,cap]],
      [[-r,0.004],[-r,sh],[-nk*1.18,h*0.86],[nk*1.18,h*0.86],[r,sh],[r,0.004],[-r,0.004]]
    ];
    a.fill = 2; return a;
  }
  function BOTTLE(h, r) {
    return [[[-r, 0], [-r, h * 0.62], [-r * 0.34, h * 0.78], [-r * 0.34, h], [r * 0.34, h], [r * 0.34, h * 0.62 + (h * 0.16)], [r, h * 0.62], [r, 0], [-r, 0]],
            [[-r * 0.34, h * 0.93], [r * 0.34, h * 0.93]]];
  }
  var SHAKER = [[[-0.045,0],[-0.045,0.14],[-0.035,0.175],[-0.035,0.205],[0.035,0.205],[0.035,0.175],[0.045,0.14],[0.045,0],[-0.045,0]],
                [[-0.035,0.175],[0.035,0.175]]];
  var GLASS = [[[-0.036,0],[-0.031,0.095],[0.031,0.095],[0.036,0],[-0.036,0]]];
  function COBBLER(h, r) {
    return [
      [[-0.77*r,0],[-0.83*r,0.12*h],[-0.91*r,0.34*h],[-0.97*r,0.53*h],[-1.00*r,0.62*h],
       [-1.00*r,0.70*h],[-0.97*r,0.736*h],[-0.88*r,0.776*h],[-0.72*r,0.820*h],[-0.57*r,0.850*h],
       [-0.50*r,0.866*h],[-0.50*r,0.905*h],[-0.47*r,0.915*h],[-0.47*r,0.955*h],
       [-0.41*r,0.980*h],[-0.25*r,0.997*h],[0.25*r,0.997*h],[0.41*r,0.980*h],[0.47*r,0.955*h],
       [0.47*r,0.915*h],[0.50*r,0.905*h],[0.50*r,0.866*h],[0.57*r,0.850*h],[0.72*r,0.820*h],
       [0.88*r,0.776*h],[0.97*r,0.736*h],[1.00*r,0.70*h],[1.00*r,0.62*h],[0.97*r,0.53*h],
       [0.91*r,0.34*h],[0.83*r,0.12*h],[0.77*r,0],[-0.77*r,0]],
      [[-1.00*r,0.62*h],[1.00*r,0.62*h]],
      [[-1.00*r,0.70*h],[1.00*r,0.70*h]],
      [[-0.50*r,0.878*h],[0.50*r,0.878*h]],
      [[-0.50*r,0.894*h],[0.50*r,0.894*h]],
      [[-0.47*r,0.915*h],[0.47*r,0.915*h]],
      [[-0.77*r,0.016*h],[0.77*r,0.016*h]]
    ];
  }
  var JIGGER = [
    [[-0.031,0],[-0.0315,0.005],[-0.0075,0.052],[-0.0085,0.062],[-0.0075,0.072],[-0.034,0.115],
     [0.034,0.115],[0.0075,0.072],[0.0085,0.062],[0.0075,0.052],[0.0315,0.005],[0.031,0],[-0.031,0]],
    [[-0.0082,0.052],[0.0082,0.052]],
    [[-0.0082,0.072],[0.0082,0.072]],
    [[-0.0315,0.108],[0.0315,0.108]],
    [[-0.0295,0.010],[0.0295,0.010]]
  ];
  function figure(o, lx, lz, kind) {
    var a = L(o, lx, 0, lz), k = a[2];
    function X(u) { return (a[0] + u * k).toFixed(1); }
    function Y(v) { return (a[1] - v * k).toFixed(1); }
    function R(u) { return (u * k).toFixed(1); }
    var body = [], det = [];
    var sh = kind === 'dj' ? 1.50 : 1.52, hip = kind === 'dj' ? 1.06 : 1.00, hy = kind === 'dj' ? 1.68 : 1.70;

    body.push('M' + X(-0.27) + ' ' + Y(hip) + 'L' + X(-0.255) + ' ' + Y(sh - 0.15) +
      'Q' + X(-0.248) + ' ' + Y(sh) + ' ' + X(-0.095) + ' ' + Y(sh + 0.015) + 'L' + X(0.095) + ' ' + Y(sh + 0.015) +
      'Q' + X(0.248) + ' ' + Y(sh) + ' ' + X(0.255) + ' ' + Y(sh - 0.15) + 'L' + X(0.27) + ' ' + Y(hip) + 'Z');
    body.push('M' + X(-0.092) + ' ' + Y(hy) + 'a' + R(0.092) + ' ' + R(0.112) + ' 0 1 1 ' + R(0.184) + ' 0' +
      'a' + R(0.092) + ' ' + R(0.112) + ' 0 1 1 ' + R(-0.184) + ' 0Z');
    det.push('M' + X(-0.05) + ' ' + Y(hy - 0.112) + 'L' + X(-0.05) + ' ' + Y(sh + 0.01) +
             ' M' + X(0.05) + ' ' + Y(hy - 0.112) + 'L' + X(0.05) + ' ' + Y(sh + 0.01));

    if (kind === 'dj') {
      det.push('M' + X(-0.098) + ' ' + Y(hy + 0.035) + 'Q' + X(0) + ' ' + Y(hy + 0.145) + ' ' + X(0.098) + ' ' + Y(hy + 0.035));
      det.push('M' + X(-0.145) + ' ' + Y(hy + 0.035) + 'L' + X(0.098) + ' ' + Y(hy + 0.035));
      det.push('M' + X(-0.108) + ' ' + Y(hy + 0.02) + 'L' + X(-0.108) + ' ' + Y(hy - 0.055) +
               ' M' + X(0.108) + ' ' + Y(hy + 0.02) + 'L' + X(0.108) + ' ' + Y(hy - 0.055));
      det.push('M' + X(-0.248) + ' ' + Y(sh - 0.12) + 'Q' + X(-0.34) + ' ' + Y(1.22) + ' ' + X(-0.28) + ' ' + Y(1.07));
      det.push('M' + X(0.248) + ' ' + Y(sh - 0.12) + 'Q' + X(0.34) + ' ' + Y(1.22) + ' ' + X(0.28) + ' ' + Y(1.07));
    } else {
      det.push('M' + X(-0.088) + ' ' + Y(hy + 0.045) + 'Q' + X(0) + ' ' + Y(hy + 0.135) + ' ' + X(0.088) + ' ' + Y(hy + 0.045));
      det.push('M' + X(-0.05) + ' ' + Y(sh + 0.01) + 'L' + X(-0.015) + ' ' + Y(sh - 0.085) + 'L' + X(0.015) + ' ' + Y(sh - 0.085) + 'L' + X(0.05) + ' ' + Y(sh + 0.01));
      det.push('M' + X(-0.155) + ' ' + Y(hip) + 'L' + X(-0.155) + ' ' + Y(1.345) + 'L' + X(-0.045) + ' ' + Y(sh - 0.045) +
               ' M' + X(0.155) + ' ' + Y(hip) + 'L' + X(0.155) + ' ' + Y(1.345) + 'L' + X(0.045) + ' ' + Y(sh - 0.045));
      det.push('M' + X(-0.155) + ' ' + Y(1.345) + 'L' + X(0.155) + ' ' + Y(1.345));
      if (kind !== 'plain') det.push('M' + X(-0.082) + ' ' + Y(1.14) + 'L' + X(0.082) + ' ' + Y(1.14) + 'L' + X(0.082) + ' ' + Y(1.255) + 'L' + X(-0.082) + ' ' + Y(1.255) + 'Z');
      det.push('M' + X(-0.252) + ' ' + Y(sh - 0.17) + 'L' + X(-0.28) + ' ' + Y(hip) +
               ' M' + X(0.252) + ' ' + Y(sh - 0.17) + 'L' + X(0.28) + ' ' + Y(hip));
    }
    if (kind !== 'dj') {
      // slim scale-figure legs, no feet: same line weight as the rest of the drawing
      body.push('M' + X(-0.165) + ' ' + Y(hip) + 'L' + X(-0.115) + ' ' + Y(0.035) + 'L' + X(-0.062) + ' ' + Y(0.035) +
        'L' + X(-0.022) + ' ' + Y(0.62) + 'L' + X(0.022) + ' ' + Y(0.62) + 'L' + X(0.062) + ' ' + Y(0.035) +
        'L' + X(0.115) + ' ' + Y(0.035) + 'L' + X(0.165) + ' ' + Y(hip) + 'Z');
    }
    body.forEach(solid);
    line(body.join(' ') + ' ' + det.join(' '), { w: 1.35 });
  }

  /* ---- the pieces, each turned to face the middle of the room ---- */
  // A bar and a booth this close would put the DJ inside the drinks queue, so the
  // bar sits further down its own wall and the booth stands three metres deeper.
  var BAR   = { x: -2.42, z: 0.53, rot:  0.785, w: 2.00, d: 0.60, h: 1.00, slab: 0.06 };
  var BOOTH = { x:  4.97, z: 4.57, rot: -0.785, w: 1.50, d: 0.60, h: 0.98 };

  function drawBar() {
    box(BAR, BAR.w, BAR.d, 0.09, BAR.h);
    box(BAR, BAR.w + 0.10, BAR.d + 0.08, BAR.h, BAR.h + BAR.slab);
    var fz = -BAR.d / 2 - 0.002, i = 0.085;
    var front = [L(BAR, -BAR.w/2, 0.09, fz), L(BAR, BAR.w/2, 0.09, fz), L(BAR, BAR.w/2, BAR.h, fz), L(BAR, -BAR.w/2, BAR.h, fz)];
    if (facing(front)) {
      line(poly([L(BAR, -BAR.w/2+i, 0.09+i, fz), L(BAR, BAR.w/2-i, 0.09+i, fz), L(BAR, BAR.w/2-i, BAR.h-i, fz), L(BAR, -BAR.w/2+i, BAR.h-i, fz)]), { w: 1.1 });
    }
  }
  var BAR_BOTTLES = [];
  function drawBottles() {
    var top = BAR.h + BAR.slab, n = BAR_BOTTLES.length;
    if (!n) return;
    // one litre premix bottles, same size across the range, lined up like the shot
    var step = 0.146, x0 = -0.34 - (n - 1) * step;
    for (var i = 0; i < n; i++) {
      lathe(BAR, x0 + i * step, -0.10, top, PREMIX(0.305, 0.0405), BAR_BOTTLES[i]);
    }
  }
  function drawKit() {
    var top = BAR.h + BAR.slab;
    lathe(BAR, 0.34, -0.21, top, COBBLER(0.225, 0.048));
    lathe(BAR, 0.49, -0.19, top, JIGGER);
  }
  function drawBooth() {
    var top = BOOTH.h, slab = 0.035;
    box(BOOTH, BOOTH.w - 0.14, BOOTH.d - 0.10, 0.0, 0.085);
    box(BOOTH, BOOTH.w, BOOTH.d, 0.085, top);
    var fz = -BOOTH.d / 2 - 0.002, i = 0.055;
    var front = [L(BOOTH,-BOOTH.w/2,0.085,fz), L(BOOTH,BOOTH.w/2,0.085,fz), L(BOOTH,BOOTH.w/2,top,fz), L(BOOTH,-BOOTH.w/2,top,fz)];
    if (facing(front)) {
      line(poly([L(BOOTH,-BOOTH.w/2+i,0.085+i,fz), L(BOOTH,BOOTH.w/2-i,0.085+i,fz),
                 L(BOOTH,BOOTH.w/2-i,top-i,fz), L(BOOTH,-BOOTH.w/2+i,top-i,fz)]), { w: 1.1 });
    }
    box(BOOTH, BOOTH.w + 0.05, BOOTH.d + 0.05, top, top + slab);
    box(off(BOOTH, 0, BOOTH.d / 2 - 0.04), BOOTH.w - 0.06, 0.06, top + slab, top + slab + 0.05);
  }

  // flat ellipses, drawn to a fixed ratio: a true projection of the deck would
  // be edge-on at eye level and read as nothing
  function disc(c, rx, ratio, w) {
    var ry = rx * ratio;
    line('M' + (c[0]-rx).toFixed(1) + ' ' + c[1].toFixed(1) +
         'a' + rx.toFixed(1) + ' ' + ry.toFixed(1) + ' 0 1 0 ' + (2*rx).toFixed(1) + ' 0' +
         'a' + rx.toFixed(1) + ' ' + ry.toFixed(1) + ' 0 1 0 ' + (-2*rx).toFixed(1) + ' 0', { w: w || 1.1 });
  }
  function drawMixer() {
    var y = BOOTH.h + 0.035, deck = 0.044;
    [-0.45, 0.45].forEach(function (dx) {
      var o = off(BOOTH, dx, -0.015);
      box(o, 0.40, 0.33, y, y + deck);
      var c = L(o, 0, y + deck + 0.001, 0), e = L(o, 0.142, y + deck + 0.001, 0);
      var r = Math.max(5, Math.abs(e[0] - c[0]));
      disc(c, r, 0.40, 1.2);
      disc(c, r * 0.30, 0.40, 0.9);
      line('M' + fmt(L(o, 0.158, y + deck + 0.012, 0.105)) + 'L' + fmt(L(o, 0.092, y + deck + 0.012, -0.012)), { w: 1.1 });
      var h1 = L(o, 0.158, y + deck + 0.012, 0.105), h2 = L(o, 0.172, y + deck + 0.012, 0.118);
      disc(h1, Math.max(2, Math.abs(h2[0] - h1[0])), 0.45, 0.9);
      line(poly([L(o,0.172,y+deck,-0.025), L(o,0.190,y+deck,-0.025), L(o,0.190,y+deck,0.055), L(o,0.172,y+deck,0.055)]), { w: 0.85 });
    });
    var m = off(BOOTH, 0, -0.015);
    box(m, 0.27, 0.33, y, y + 0.050);
    var ky = y + 0.051;
    [-0.075, -0.025, 0.025, 0.075].forEach(function (kx) {
      [0.085, 0.035, -0.015].forEach(function (kz) {
        var c = L(m, kx, ky, kz), e = L(m, kx + 0.016, ky, kz);
        disc(c, Math.max(1.6, Math.abs(e[0] - c[0])), 0.55, 0.8);
      });
    });
    [-0.055, 0.055].forEach(function (fx) {
      line(poly([L(m,fx-0.012,ky,-0.055), L(m,fx+0.012,ky,-0.055), L(m,fx+0.012,ky,-0.135), L(m,fx-0.012,ky,-0.135)]), { w: 0.85 });
    });
  }

  function drawSpeaker(o) {
    var apex = 1.00, top = 1.38, legs = '';
    [[-0.26,-0.18],[0.26,-0.18],[0,0.30]].forEach(function (p) {
      legs += 'M' + fmt(L(o, p[0], 0, p[1])) + 'L' + fmt(L(o, 0, apex, 0));
    });
    line(legs, { w: 1.2 });
    line('M' + fmt(L(o, 0, apex, 0)) + 'L' + fmt(L(o, 0, top, 0)), { w: 1.3 });
    box(o, 0.36, 0.32, top, top + 0.56);
    var fz = -0.16 - 0.003;
    var c = L(o, 0, top + 0.22, fz), e = L(o, 0.12, top + 0.22, fz), r = Math.max(5, Math.abs(e[0] - c[0]));
    line('M' + (c[0]-r).toFixed(1) + ' ' + c[1].toFixed(1) + 'a' + r.toFixed(1) + ' ' + r.toFixed(1) + ' 0 1 0 ' + (2*r).toFixed(1) + ' 0' +
         'a' + r.toFixed(1) + ' ' + r.toFixed(1) + ' 0 1 0 ' + (-2*r).toFixed(1) + ' 0', { w: 1.2 });
    line(poly([L(o,-0.11,top+0.40,fz), L(o,0.11,top+0.40,fz), L(o,0.11,top+0.50,fz), L(o,-0.11,top+0.50,fz)]), { w: 1.1 });
  }
  // The grid follows the room, not the world axes: it runs parallel to the bar
  // and therefore square to the DJ side as well.
  var GRID = { x: 0.55, z: 1.85, rot: 0.785 };
  // The ground lays itself out rather than appearing: every grid line is sorted by where
  // it falls on screen and drawn in turn, so the floor sweeps in from the left.
  function drawFloor() {
    var keep = RV, p = Math.max(0, Math.min(1, keep)), segs = [], a, b;
    for (a = -8; a <= 14; a++) segs.push([L(GRID, a, 0, -9), L(GRID, a, 0, 6)]);
    for (b = -9; b <= 6; b++) segs.push([L(GRID, -8, 0, b), L(GRID, 14, 0, b)]);
    segs.sort(function (u, v) { return (u[0][0] + u[1][0]) - (v[0][0] + v[1][0]); });
    var span = 0.34;                      // how much of the sweep one line gets to itself
    for (var i = 0; i < segs.length; i++) {
      RV = Math.min(1, (p - (i / segs.length) * (1 - span)) / span);   // past 1 the dash wraps
      if (RV > 0.002) line('M' + fmt(segs[i][0]) + 'L' + fmt(segs[i][1]), { stroke: '#2c2c2c', w: 1 });
    }
    RV = keep;
  }
  function arrow(p, d) {
    var a = 7;
    return 'M' + fmt(p) + 'l' + (d[0]*a - d[1]*a*0.4).toFixed(1) + ' ' + (d[1]*a + d[0]*a*0.4).toFixed(1) +
           'M' + fmt(p) + 'l' + (d[0]*a + d[1]*a*0.4).toFixed(1) + ' ' + (d[1]*a - d[0]*a*0.4).toFixed(1);
  }
  function dimFoot(o, w, drop) {
    var a = L(o, -w/2, 0, -o.d/2 || -0.3), b = L(o, w/2, 0, -o.d/2 || -0.3);
    var ay = a[1] + drop, by = b[1] + drop;
    line('M' + a[0].toFixed(1) + ' ' + (a[1]+6) + 'L' + a[0].toFixed(1) + ' ' + (ay+10), { stroke:'#5c5c5c', w:1, dash:'4 4' });
    line('M' + b[0].toFixed(1) + ' ' + (b[1]+6) + 'L' + b[0].toFixed(1) + ' ' + (by+10), { stroke:'#5c5c5c', w:1, dash:'4 4' });
    line('M' + a[0].toFixed(1) + ' ' + ay.toFixed(1) + 'L' + b[0].toFixed(1) + ' ' + by.toFixed(1), { stroke:'#8d8d8d', w:1 });
    line(arrow([a[0],ay],[1,0]) + arrow([b[0],by],[-1,0]), { stroke:'#8d8d8d', w:1 });
  }

  function dep(x, z) { return -(x - cam.tx) * Math.sin(cam.yaw) + (z - cam.tz) * Math.cos(cam.yaw); }
  function at(o, lx, lz) {
    var c = Math.cos(o.rot || 0), s2 = Math.sin(o.rot || 0);
    return dep(o.x + lx * c - lz * s2, o.z + lx * s2 + lz * c);
  }


  /* ================= Regal ================= */
  var SHELF = { rot: BAR.rot, w: 2.24, d: 0.30, h: 1.84, board: 0.028, post: 0.045 };
  (function () {
    var lz = 1.32, c = Math.cos(BAR.rot), s = Math.sin(BAR.rot);
    SHELF.x = BAR.x - lz * s; SHELF.z = BAR.z + lz * c;
  })();
  var ROWS = [0.10, 0.52, 0.94, 1.36];

  function postAt(sgn) {
    var c = Math.cos(SHELF.rot), s = Math.sin(SHELF.rot), lx = sgn * (SHELF.w / 2 - SHELF.post / 2);
    return { x: SHELF.x + lx * c, z: SHELF.z + lx * s, rot: SHELF.rot };
  }
  function drawShelfFrame() {
    [-1, 1].forEach(function (sgn) { box(postAt(sgn), SHELF.post, SHELF.d, 0, SHELF.h); });
    ROWS.concat([SHELF.h - SHELF.board]).forEach(function (y) { box(SHELF, SHELF.w, SHELF.d, y, y + SHELF.board); });
  }

  // deterministic jitter so the rows look stocked, not stamped
  function rnd(i) { var x = Math.sin(i * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); }
  // how full the back shelf reads: the bigger the allowance, the more stock rolls in
  function stockFrac() {
    if (S.pack === 'cash') return 1;
    var g = Math.max(1, S.guests), per = totalDrinks() / g;
    if (per >= 3.6) return 1;                      // Late and up: every slot stocked
    return Math.max(0.34, Math.min(1, 0.16 + per * 0.19));
  }
  function drawShelfBottles() {
    var step = 0.1085, n = 20, x0 = -(n - 1) * step / 2;   // runs the full width, post to post
    var f = stockFrac();
    ROWS.forEach(function (y, r) {
      for (var j = 0; j < n; j++) {
        // evenly spread gaps rather than a block missing off one end
        if (Math.floor(j * f) === Math.floor((j + 1) * f)) continue;
        var i = r * 100 + j;                       // stable seed: skipped slots never shift the rest
        var h = 0.25 + rnd(i) * 0.09, rad = 0.036 + rnd(i + 90) * 0.009;
        lathe(SHELF, x0 + j * step, -0.03 + rnd(i + 40) * 0.06, y + SHELF.board, BOTTLE(h, rad));
      }
    });
  }

  /* ================= Menukarte ================= */
  var CARD = { w: 0.150, h: 0.230, lx: 0.12, lz: -0.08, turn: 0.22 };
  CARD.base = BAR.h + BAR.slab;
  CARD.rot  = BAR.rot + CARD.turn;
  (function () {
    var c = Math.cos(BAR.rot), s = Math.sin(BAR.rot);
    CARD.x = BAR.x + CARD.lx * c - CARD.lz * s;
    CARD.z = BAR.z + CARD.lx * s + CARD.lz * c;
  })();
  function cardPt(u, v) { return L(CARD, u - CARD.w / 2, CARD.base + v, 0); }
  function drawCardBody() {
    var p = [cardPt(0, 0), cardPt(CARD.w, 0), cardPt(CARD.w, CARD.h), cardPt(0, CARD.h)];
    solid(poly(p)); line(poly(p), { w: 1.4 });
  }

  var GLYPH = {
    M: [[[0,1],[0,0],[0.5,0.55],[1,0],[1,1]]],
    E: [[[1,0],[0,0],[0,1],[1,1]], [[0,0.5],[0.72,0.5]]],
    N: [[[0,1],[0,0],[1,1],[1,0]]],
    'Ü': [[[0,0],[0,0.74],[0.19,0.97],[0.81,0.97],[1,0.74],[1,0]],
               [[0.2,-0.32],[0.2,-0.19]], [[0.8,-0.32],[0.8,-0.19]]]
  };
  function lettering(word, x, base, cap, wid, gap) {
    var d = '', cx = x;
    for (var i = 0; i < word.length; i++) {
      var g = GLYPH[word[i]];
      if (g) g.forEach(function (st) {
        d += st.map(function (p, j) {
          return (j ? 'L' : 'M') + (cx + p[0] * wid).toFixed(5) + ' ' + (base - cap + p[1] * cap).toFixed(5);
        }).join(' ') + ' ';
      });
      cx += wid + gap;
    }
    return d;
  }

  var ITEMS = [];
  var LEN = [];
  var PRICE = { base: 10, spritz: 8, beer: 5 };   // guest prices at a cash bar, incl. VAT
  var PAD = 0.0140, FS = 0.0107, LH = 0.0186, FIRST = 0.0742, TRACK = -0.00022;

  var LET = {
    S:[[[0.94,0.14],[0.62,0.00],[0.22,0.06],[0.06,0.26],[0.22,0.46],[0.70,0.54],[0.92,0.74],[0.78,0.94],[0.34,1.00],[0.04,0.86]]],
    I:[[[0.5,0],[0.5,1]]],
    G:[[[0.96,0.16],[0.66,0.00],[0.24,0.12],[0.06,0.50],[0.24,0.88],[0.66,1.00],[0.94,0.86],[0.94,0.56],[0.60,0.56]]],
    N:[[[0,1],[0,0],[1,1],[1,0]]],
    A:[[[0,1],[0.5,0],[1,1]],[[0.2,0.62],[0.8,0.62]]],
    T:[[[0,0],[1,0]],[[0.5,0],[0.5,1]]],
    U:[[[0,0],[0,0.74],[0.19,0.97],[0.81,0.97],[1,0.74],[1,0]]],
    R:[[[0,1],[0,0],[0.72,0.00],[0.96,0.22],[0.72,0.46],[0,0.46]],[[0.46,0.46],[1,1]]],
    E:[[[1,0],[0,0],[0,1],[1,1]],[[0,0.5],[0.70,0.5]]],
    L:[[[0,0],[0,1],[0.92,1]]],
    C:[[[1,0.10],[0.72,0],[0.24,0.14],[0,0.50],[0.24,0.86],[0.72,1],[1,0.90]]],
    O:[[[0.5,0],[0.14,0.16],[0.02,0.50],[0.14,0.84],[0.5,1],[0.86,0.84],[0.98,0.50],[0.86,0.16],[0.5,0]]],
    ' ':[]
  };
  function caps(word, cx, base, cap, trackRatio) {
    var wid = cap * 0.74, gap = cap * trackRatio;
    var total = 0;
    for (var i = 0; i < word.length; i++) total += (word[i] === ' ' ? wid * 0.55 : wid) + gap;
    total -= gap;
    var x = cx - total / 2, d = '';
    for (var j = 0; j < word.length; j++) {
      var g = LET[word[j]];
      if (g) g.forEach(function (st) {
        d += st.map(function (pt, k) {
          return (k ? 'L' : 'M') + (x + pt[0] * wid).toFixed(5) + ' ' + (base - cap + pt[1] * cap).toFixed(5);
        }).join(' ') + ' ';
      });
      x += (word[j] === ' ' ? wid * 0.55 : wid) + gap;
    }
    return d;
  }

  // fixed grid: every size is a constant, so adding an item never reflows the ones above
  // Sized once for the fullest possible card: 5 bases + 2 aperitifs + beer, longest
  // name LIMONCELLO SPRITZ (11.53 em at this tracking) plus the cash-bar price column.
  var CL = {
    ml:    0.0185,                 // left margin
    mr:    0.150 - 0.0185,         // right margin
    head:  0.0300, headFS: 0.0058, headTR: 0.34,   // MENU
    rule:  0.0400,                 // hairline under the header
    top:   0.0680, step: 0.0180,   // first baseline, fixed line step (fits 8)
    name:  0.0076, nameTR: 0.08,
    price: 0.0058,
    foot:  0.2120, footW: 0.026    // short hairline at the foot
  };
  function layout() { return CL; }

  // MENU, a hairline, then the chosen cocktails left-aligned on a fixed grid
  function cardFace(prog, bodyRV) {
    var tl = cardPt(0, CARD.h), ctr = cardPt(CARD.w, CARD.h), bl = cardPt(0, 0);
    var m = [(ctr[0]-tl[0])/CARD.w, (ctr[1]-tl[1])/CARD.w, (bl[0]-tl[0])/CARD.h, (bl[1]-tl[1])/CARD.h, tl[0], tl[1]];
    var s = '<g transform="matrix(' + m.map(function (n) { return n.toFixed(5); }).join(',') + ')">';
    var L0 = CL, hair = 'fill="none" stroke="#9a9a9a" stroke-linecap="butt" vector-effect="non-scaling-stroke"' +
      ' stroke-width="0.9" pathLength="1" stroke-dasharray="1" stroke-dashoffset="' + (1 - bodyRV).toFixed(4) + '"';

    s += '<text x="' + L0.ml + '" y="' + L0.head + '" font-family="Archivo Variable" font-size="' + L0.headFS +
         '" font-weight="500" letter-spacing="' + (L0.headFS * L0.headTR).toFixed(5) +
         '" fill="#f2f2f2" fill-opacity="' + bodyRV.toFixed(3) + '">' + tr('MENU') + '</text>';
    s += '<path d="M' + L0.ml + ' ' + L0.rule + 'L' + L0.mr.toFixed(5) + ' ' + L0.rule + '" ' + hair + '/>';
    s += '<path d="M' + L0.ml + ' ' + L0.foot + 'L' + (L0.ml + L0.footW).toFixed(5) + ' ' + L0.foot + '" ' + hair + '/>';

    for (var i = 0; i < ITEMS.length; i++) {
      var p = prog[i];
      if (p <= 0.001) continue;
      var it = ITEMS[i], nb = L0.top + i * L0.step, wmax = (LEN[i] || 0.08);
      s += '<clipPath id="mc' + i + '" clipPathUnits="userSpaceOnUse"><rect x="' + (L0.ml - 0.003).toFixed(5) +
           '" y="' + (nb - L0.name).toFixed(5) + '" width="' + (wmax * Math.min(1, p) + 0.004).toFixed(5) +
           '" height="' + (L0.name * 1.6).toFixed(5) + '"/></clipPath>';
      s += '<text x="' + L0.ml + '" y="' + nb.toFixed(5) + '" font-family="Archivo Variable" font-size="' +
           L0.name.toFixed(5) + '" font-weight="400" letter-spacing="' + (L0.name * L0.nameTR).toFixed(5) +
           '" fill="#f2f2f2" clip-path="url(#mc' + i + ')">' + esc(tr(it.name).toUpperCase()) + '</text>';
      if (S.pack === 'cash') {
        s += '<text x="' + L0.mr.toFixed(5) + '" y="' + nb.toFixed(5) + '" text-anchor="end" font-family="Poppins"' +
             ' font-size="' + L0.price + '" font-weight="400" fill="#b7b7b7" fill-opacity="' +
             Math.max(0, (p - 0.75) / 0.25).toFixed(3) + '">' + (it.eur || PRICE.base) + ' &#8364;</text>';
      }
      if (p < 0.999) {
        var px = (L0.ml + wmax * p + 0.002).toFixed(5);
        s += '<path d="M' + px + ' ' + (nb - L0.name).toFixed(5) + 'L' + px + ' ' + (nb + L0.name * 0.28).toFixed(5) +
             '" fill="none" stroke="hsl(50 98% 51%)" stroke-width="1.3" vector-effect="non-scaling-stroke"/>';
      }
    }
    return s + '</g>';
  }

  /* ===================== scene wiring ===================== */
  function barLocal(lx, lz) {
    var c = Math.cos(BAR.rot), s = Math.sin(BAR.rot);
    return { x: BAR.x + lx * c - lz * s, z: BAR.z + lx * s + lz * c, rot: BAR.rot };
  }
  // the pair stands forward of the counter, so neither one tangles with the back shelf
  var SPK_BAR_L = barLocal(-1.66, 0.02), SPK_BAR_R = barLocal(1.66, 0.02);

  function off(o, lx, lz) {
    var c = Math.cos(o.rot || 0), s = Math.sin(o.rot || 0);
    return { x: o.x + lx * c - lz * s, z: o.z + lx * s + lz * c, rot: o.rot || 0 };
  }
  function boothLocal(lx, lz) { return off(BOOTH, lx, lz); }
  var SPK_L = boothLocal(-1.58, -0.38), SPK_R = boothLocal(1.58, -0.38);

  var TENT_BAR = { o: barLocal(0.00, 0.50),   w: 3.90, d: 2.80, eave: 2.34, peak: 3.02 };
  var TENT_DJ  = { o: boothLocal(0.00, 0.25), w: 4.30, d: 2.60, eave: 2.34, peak: 3.02 };
  function drawCanopy(t) {
    var o = t.o, hw = t.w / 2, hd = t.d / 2;
    var c = [[-hw,-hd],[hw,-hd],[hw,hd],[-hw,hd]], legs = '';
    c.forEach(function (p) { legs += 'M' + fmt(L(o, p[0], 0, p[1])) + 'L' + fmt(L(o, p[0], t.eave, p[1])); });
    line(legs, { w: 1.15 });
    var apex = L(o, 0, t.peak, 0), panels = [];
    for (var i = 0; i < 4; i++) {
      var a = c[i], b = c[(i + 1) % 4], mid = [(a[0]+b[0])/2, (a[1]+b[1])/2];
      panels.push({ d: dep(o.x + mid[0]*Math.cos(o.rot) - mid[1]*Math.sin(o.rot),
                          o.z + mid[0]*Math.sin(o.rot) + mid[1]*Math.cos(o.rot)),
                    p: [L(o,a[0],t.eave,a[1]), L(o,b[0],t.eave,b[1]), apex], a: a, b: b });
    }
    panels.sort(function (x, y) { return y.d - x.d; }).forEach(function (q) {
      solid(poly(q.p)); line(poly(q.p), { w: 1.3 });
      var sc = '', n = 6;
      for (var k = 0; k <= n; k++) {
        var u = k / n, lx = q.a[0] + (q.b[0]-q.a[0]) * u, lz = q.a[1] + (q.b[1]-q.a[1]) * u;
        sc += (k ? 'L' : 'M') + fmt(L(o, lx, t.eave - (k % 2 ? 0.10 : 0.16), lz));
      }
      line(sc, { w: 1 });
    });
  }

  // A low tripod with a camera head, kept clearly shorter than the speaker stands.
  function drawCamRig(o) {
    var head = 1.30, col = 1.40, legs = '';
    [[-0.26,-0.17],[0.26,-0.17],[0,0.30]].forEach(function (p) {
      legs += 'M' + fmt(L(o, p[0], 0, p[1])) + 'L' + fmt(L(o, 0, head, 0));
    });
    line(legs, { w: 1.2 });
    line('M' + fmt(L(o, -0.13, 0.40, -0.085)) + 'L' + fmt(L(o, 0.13, 0.40, -0.085)), { w: 1 });
    line('M' + fmt(L(o, 0, head, 0)) + 'L' + fmt(L(o, 0, col, 0)), { w: 1.3 });
    line('M' + fmt(L(o, 0.03, col - 0.01, 0.04)) + 'L' + fmt(L(o, 0.30, col - 0.26, 0.30)), { w: 1.1 });
    box(o, 0.34, 0.20, col, col + 0.17);
    box(off(o, 0, -0.155), 0.13, 0.12, col + 0.025, col + 0.145);
    var fz = -0.215, c0 = L(o, 0, col + 0.085, fz), e0 = L(o, 0.047, col + 0.085, fz);
    var r = Math.max(3, Math.abs(e0[0] - c0[0]));
    line('M' + (c0[0]-r).toFixed(1) + ' ' + c0[1].toFixed(1) + 'a' + r.toFixed(1) + ' ' + r.toFixed(1) + ' 0 1 0 ' + (2*r).toFixed(1) + ' 0' +
         'a' + r.toFixed(1) + ' ' + r.toFixed(1) + ' 0 1 0 ' + (-2*r).toFixed(1) + ' 0', { w: 1.1 });
    box(off(o, 0.10, 0.015), 0.10, 0.08, col + 0.17, col + 0.235);
  }
  // Under a canopy the mid ground is full of posts, so the crew steps forward
  // into the open floor between the two tents instead of standing among them.
  // The crew stands clear of the DJ zone, to its right and a step forward, so no
  // tent post or speaker stand crosses them.
  var VID = { rig: { x: 5.52, z: -0.72, rot: -1.780 }, man: { x: 6.46, z: -0.42, rot: 0 } };
  // With no DJ booth there is nothing between the bar and the camera, so the operator sets
  // up near it rather than standing alone at the far end of an empty floor.
  var VID_NEAR = { rig: { x: 2.05, z: -1.02, rot: -1.780 }, man: { x: 2.99, z: -0.72, rot: 0 } };
  function vidPos() { return S.music === 'dj' ? VID : VID_NEAR; }

  var ST = { x: BAR.x, z: BAR.z, rot: BAR.rot, w: 2.80, d: 0.76, top: 0.90, slab: 0.05, shelf: 0.26 };
  ST.surface = ST.top + ST.slab;

  function drawStation() {
    var hw = ST.w / 2 - 0.05, hd = ST.d / 2 - 0.05;
    [[-hw,-hd],[hw,-hd],[hw,hd],[-hw,hd]].forEach(function (p) {
      box(off(ST, p[0], p[1]), 0.045, 0.045, 0.075, ST.top);
      var c = L(off(ST, p[0], p[1]), 0, 0.038, 0), e = L(off(ST, p[0], p[1]), 0.038, 0.038, 0);
      var r = Math.max(2.5, Math.abs(e[0] - c[0]));
      line('M' + (c[0]-r).toFixed(1) + ' ' + c[1].toFixed(1) + 'a' + r.toFixed(1) + ' ' + r.toFixed(1) + ' 0 1 0 ' + (2*r).toFixed(1) + ' 0' +
           'a' + r.toFixed(1) + ' ' + r.toFixed(1) + ' 0 1 0 ' + (-2*r).toFixed(1) + ' 0', { w: 1.1 });
    });
    box(ST, ST.w * 0.93, ST.d * 0.86, ST.shelf, ST.shelf + 0.035);
    box(ST, ST.w, ST.d, ST.top, ST.surface);
  }

  // glass jar with a lid and a tap, the kind that stands on a buffet
  function DISPENSER(h, r) {
    var foot = h * 0.050, body = h * 0.70, nk = r * 0.52, lid = h * 0.86;
    var a = [
      [[-r*0.62,0],[-r*0.62,foot],[-r,h*0.14],[-r,body],[-nk,h*0.80],[-nk,lid],[-r*0.70,lid],[-r*0.70,h],
       [r*0.70,h],[r*0.70,lid],[nk,lid],[nk,h*0.80],[r,body],[r,h*0.14],[r*0.62,foot],[r*0.62,0],[-r*0.62,0]],
      [[-r*0.70,lid],[r*0.70,lid]],
      [[-r,h*0.14],[-r,body],[-nk*1.1,h*0.775],[nk*1.1,h*0.775],[r,body],[r,h*0.14],[-r,h*0.14]],
      [[r*0.84,h*0.42],[r*1.46,h*0.42],[r*1.46,h*0.30],[r*1.30,h*0.30],[r*1.30,h*0.11],[r*1.62,h*0.11],[r*1.62,h*0.22]]
    ];
    a.fill = 2; return a;
  }
  /* ---- buffet dispenser: domed lid, clear body, side knobs, pedestal ---- */
  function DISPENSER() {
    var a = [[
      [-0.080,0],[-0.080,0.014],[-0.066,0.016],[-0.046,0.055],[-0.026,0.090],[-0.024,0.098],
      [-0.038,0.112],[-0.064,0.128],[-0.094,0.144],[-0.108,0.158],[-0.108,0.432],
      [-0.104,0.452],[-0.092,0.478],[-0.070,0.505],[-0.040,0.527],[-0.016,0.538],[-0.016,0.548],
      [-0.028,0.553],[-0.028,0.566],[-0.014,0.578],[0.014,0.578],[0.028,0.566],[0.028,0.553],
      [0.016,0.548],[0.016,0.538],[0.040,0.527],[0.070,0.505],[0.092,0.478],[0.104,0.452],
      [0.108,0.432],[0.108,0.158],[0.094,0.144],[0.064,0.128],[0.038,0.112],[0.024,0.098],
      [0.026,0.090],[0.046,0.055],[0.066,0.016],[0.080,0.014],[0.080,0],[-0.080,0]
    ],
    [[-0.108,0.158],[0.108,0.158]],
    [[-0.108,0.158],[-0.108,0.345],[0.108,0.345],[0.108,0.158],[-0.108,0.158]],
    [[-0.108,0.400],[0.108,0.400]],
    [[-0.108,0.432],[0.108,0.432]],
    [[-0.108,0.422],[-0.126,0.422],[-0.126,0.402],[-0.108,0.402]],
    [[-0.126,0.430],[-0.141,0.430],[-0.141,0.394],[-0.126,0.394]],
    [[0.108,0.422],[0.126,0.422],[0.126,0.402],[0.108,0.402]],
    [[0.126,0.430],[0.141,0.430],[0.141,0.394],[0.126,0.394]],
    [[-0.019,0.166],[-0.019,0.106],[-0.012,0.072],[0.012,0.072],[0.019,0.106],[0.019,0.166]],
    [[-0.066,0.016],[0.066,0.016]]];
    a.fill = 2; return a;
  }

  /* ---- clip-top jar of citrus wheels ---- */
  var GARNISH = [[
    [-0.088,0],[-0.092,0.020],[-0.092,0.212],[-0.080,0.232],[-0.078,0.246],[-0.086,0.250],
    [-0.086,0.262],[-0.080,0.268],[-0.080,0.292],[0.080,0.292],[0.080,0.268],[0.086,0.262],
    [0.086,0.250],[0.078,0.246],[0.080,0.232],[0.092,0.212],[0.092,0.020],[0.088,0],[-0.088,0]
  ],
  [[-0.080,0.268],[0.080,0.268]],
  [[-0.086,0.256],[-0.112,0.256],[-0.118,0.244],[-0.112,0.232],[-0.100,0.230]],
  [[0.086,0.256],[0.112,0.256],[0.118,0.244],[0.112,0.232],[0.100,0.230]],
  [[-0.092,0.226],[0.092,0.226]]];

  var WHEELS = [[-0.044,0.042],[0.012,0.034],[0.056,0.056],[-0.052,0.098],[0.000,0.092],
                [0.052,0.112],[-0.040,0.152],[0.016,0.150],[0.054,0.182],[-0.044,0.196]];
  function drawGarnishJar(lx, lz) {
    lathe(ST, lx, lz, ST.surface, GARNISH);
    var o = off(ST, lx, lz), R = 0.034;
    WHEELS.forEach(function (p) {
      var c = L(o, p[0], ST.surface + p[1], 0), e = L(o, p[0] + R, ST.surface + p[1], 0);
      var r = Math.max(2.0, Math.abs(e[0] - c[0]));
      function ring(rad) {
        return 'M' + (c[0]-rad).toFixed(1) + ' ' + c[1].toFixed(1) + 'a' + rad.toFixed(1) + ' ' + (rad*0.95).toFixed(1) + ' 0 1 0 ' + (2*rad).toFixed(1) + ' 0' +
               'a' + rad.toFixed(1) + ' ' + (rad*0.95).toFixed(1) + ' 0 1 0 ' + (-2*rad).toFixed(1) + ' 0';
      }
      var d = ring(r) + ring(r * 0.78);
      for (var k = 0; k < 8; k++) {
        var th = k * Math.PI / 4;
        d += 'M' + (c[0] + Math.cos(th) * r * 0.10).toFixed(1) + ' ' + (c[1] + Math.sin(th) * r * 0.10).toFixed(1) +
             'L' + (c[0] + Math.cos(th) * r * 0.74).toFixed(1) + ' ' + (c[1] + Math.sin(th) * r * 0.70).toFixed(1);
      }
      line(d, { w: 0.8 });
    });
  }

  /* ---- ice bucket with real cubes ---- */
  var ICE = [
    [[-0.148,0],[-0.196,0.206],[0.196,0.206],[0.148,0],[-0.148,0]],
    [[-0.196,0.206],[-0.208,0.218],[-0.204,0.234],[0.204,0.234],[0.208,0.218],[0.196,0.206]],
    [[-0.138,0.030],[0.138,0.030]]
  ];
  var CUBES = [[-0.130,0.252],[-0.072,0.244],[-0.012,0.250],[0.050,0.246],[0.112,0.252],
               [-0.100,0.300],[-0.040,0.306],[0.022,0.302],[0.082,0.298],
               [-0.062,0.352],[0.004,0.356],[0.058,0.348]];
  function drawIce(lx, lz) {
    lathe(ST, lx, lz, ST.surface, ICE);
    var o = off(ST, lx, lz);
    var a = L(o, 0, ST.surface, 0), k = a[2], sz = 0.030 * k;
    var d = '';
    CUBES.forEach(function (p) {
      var c = L(o, p[0], ST.surface + p[1], 0), x = c[0], y = c[1];
      var P6 = [[0,-1],[0.866,-0.5],[0.866,0.5],[0,1],[-0.866,0.5],[-0.866,-0.5]];
      d += P6.map(function (q, i) { return (i ? 'L' : 'M') + (x + q[0]*sz).toFixed(1) + ' ' + (y + q[1]*sz*0.92).toFixed(1); }).join(' ') + ' Z';
      d += 'M' + x.toFixed(1) + ' ' + y.toFixed(1) + 'L' + x.toFixed(1) + ' ' + (y - sz*0.92).toFixed(1);
      d += 'M' + x.toFixed(1) + ' ' + y.toFixed(1) + 'L' + (x + 0.866*sz).toFixed(1) + ' ' + (y + 0.46*sz).toFixed(1);
      d += 'M' + x.toFixed(1) + ' ' + y.toFixed(1) + 'L' + (x - 0.866*sz).toFixed(1) + ' ' + (y + 0.46*sz).toFixed(1);
    });
    solid(d);
    line(d, { w: 0.9 });
  }

  var STACK = (function () {
    var h = 0.30, b = 0.036, t = 0.050;
    var a = [[[-b,0],[-t,h],[t,h],[b,0],[-b,0]]];
    for (var k = 1; k <= 5; k++) {
      var y = h * k / 6, r = b + (t - b) * (k / 6);
      a.push([[-r, y], [r, y]]);
    }
    return a;
  })();

  var LETTER = {
    I: [[[0.5,0],[0.5,1]]],
    C: [[[1,0.10],[0.72,0],[0.24,0.14],[0,0.50],[0.24,0.86],[0.72,1],[1,0.90]]],
    E: [[[1,0],[0,0],[0,1],[1,1]], [[0,0.5],[0.70,0.5]]]
  };
  function engrave(word, lx, ly, lz, cap) {
    var a = L(off(ST, lx, lz), 0, ly, 0), k = a[2];
    var wid = cap * 0.72, gap = cap * 0.46;
    var total = word.length * wid + (word.length - 1) * gap, cx = -total / 2, d = '';
    for (var i = 0; i < word.length; i++) {
      var g = LETTER[word[i]];
      if (g) g.forEach(function (st) {
        d += st.map(function (pt, j) {
          return (j ? 'L' : 'M') + (a[0] + (cx + pt[0] * wid) * k).toFixed(1) + ' ' + (a[1] + (pt[1] - 1) * cap * k).toFixed(1);
        }).join(' ') + ' ';
      });
      cx += wid + gap;
    }
    line(d, { w: 0.95 });
  }

  var JAR = { step: 0.300, mid: -0.36, lz: 0.06, tray: 0.024 };
  function drawJars(cols) {
    var n = cols.length || 4;
    var span = (n - 1) * JAR.step + 0.30, x0 = JAR.mid - ((n - 1) * JAR.step) / 2;
    box(off(ST, JAR.mid, JAR.lz), span, 0.36, ST.surface, ST.surface + JAR.tray);
    for (var i = 0; i < n; i++) {
      var g = off(ST, x0 + i * JAR.step, JAR.lz - 0.04);
      line(poly([L(g,-0.105,ST.surface+JAR.tray+0.001,-0.055), L(g,0.105,ST.surface+JAR.tray+0.001,-0.055),
                 L(g,0.105,ST.surface+JAR.tray+0.001,0.055), L(g,-0.105,ST.surface+JAR.tray+0.001,0.055)]), { w: 0.85 });
      lathe(ST, x0 + i * JAR.step, JAR.lz, ST.surface + JAR.tray, DISPENSER(), cols[i] || null);
    }
  }
  function drawFixtures() {
    drawGarnishJar(-1.26, 0.02);
    drawIce(0.70, 0.00);
    engrave('ICE', 0.70, ST.surface + 0.112, -0.175, 0.050);
    [1.05, 1.15, 1.25, 1.35].forEach(function (lx) { lathe(ST, lx, -0.02, ST.surface, STACK); });
  }
  var STAND = off(ST, 1.88, -0.42);
  STAND.rot = ST.rot + 0.22;
  function drawStandBody() {
    box(STAND, 0.34, 0.26, 0.0, 0.032);
    box(STAND, 0.046, 0.046, 0.032, 1.22);
  }
  var CARD_BAR = { x: CARD.x, z: CARD.z, rot: CARD.rot, base: CARD.base };
  function placeCard() {
    if (S.service === 'self') { CARD.x = STAND.x; CARD.z = STAND.z; CARD.rot = STAND.rot; CARD.base = 1.22; }
    else { CARD.x = CARD_BAR.x; CARD.z = CARD_BAR.z; CARD.rot = CARD_BAR.rot; CARD.base = CARD_BAR.base; }
  }

  var WORK = { x: 6.50, z: 0.40, rot: -1.25, w: 2.40, d: 0.80, h: 1.02 };
  var WS_COLS = ['hsl(84 48% 44%)', 'hsl(3 66% 47%)'];
  function workStations() { return Math.max(4, Math.min(10, Math.round(S.workshopPeople / 2))); }
  function workWidth() { return workStations() * 0.50 + 0.40; }
  function drawWorkTable() {
    var n = workStations(), w = workWidth();
    box(WORK, w, WORK.d, 0.07, WORK.h);
    box(WORK, w + 0.09, WORK.d + 0.07, WORK.h, WORK.h + 0.05);
    var top = WORK.h + 0.05, step = 0.50, x0 = -(n - 1) * step / 2;
    for (var i = 0; i < n; i++) {
      var lx = x0 + i * step;
      [-0.135, -0.065].forEach(function (dx, j) {
        lathe(WORK, lx + dx, -0.04 + (j % 2 ? 0.025 : 0), top, PREMIX(0.215, 0.029), WS_COLS[j]);
      });
      lathe(WORK, lx + 0.025, -0.01, top, COBBLER(0.185, 0.040));
      lathe(WORK, lx + 0.125, 0.05, top, JIGGER);
    }
  }

  var SHOT = {
    near:       { yaw: BAR.rot, dist: 4.05,  tx: BAR.x,  tz: BAR.z,       cy: 243, eye: 1.60, focal: 1060, vb: 720 },
    wide:       { yaw: -0.26,   dist: 12.60, tx: 0.08,   tz: 2.30,        cy: 268, eye: 1.60, focal: 940,  vb: 500 },
    nearSpk:    { yaw: BAR.rot, dist: 4.95,  tx: BAR.x,  tz: BAR.z,       cy: 296, eye: 1.60, focal: 1060, vb: 720 },
    menu:       { yaw: BAR.rot, dist: 0.95,  tx: CARD.x, tz: CARD.z,      cy: 342, eye: CARD.base + CARD.h * 0.5, focal: 2600, vb: 700 },
    work:       { yaw: -1.25,   dist: 5.60,  tx: WORK.x, tz: WORK.z,      cy: 140, eye: 1.60, focal: 1020, vb: 480 },
    nearOut:    { yaw: BAR.rot, dist: 8.80,  tx: BAR.x,  tz: BAR.z + 0.5, cy: 300, eye: 1.60, focal: 1240, vb: 720 },
    plot:       { yaw: -0.26,   dist: 16.50, tx: 1.26,   tz: 2.56,        cy: 238, eye: 1.95, focal: 820,  vb: 500 },
    wideOut:    { yaw: -0.26,   dist: 13.10, tx: 0.08,   tz: 2.30,        cy: 318, eye: 1.60, focal: 865,  vb: 560 },
    wideVid:    { yaw: -0.26,   dist: 14.20, tx: 1.20,   tz: 2.30,        cy: 272, eye: 1.60, focal: 895,  vb: 500 },
    wideVidOut: { yaw: -0.26,   dist: 14.80, tx: 1.20,   tz: 2.30,        cy: 322, eye: 1.60, focal: 825,  vb: 560 },
    vidNear:    { yaw: 0.30,    dist: 9.60,  tx: -0.55,  tz: 1.95,        cy: 262, eye: 1.60, focal: 975,  vb: 500 },
    vidNearOut: { yaw: 0.30,    dist: 10.10, tx: -0.55,  tz: 1.95,        cy: 312, eye: 1.60, focal: 900,  vb: 560 },
    nearSelf:   { yaw: BAR.rot, dist: 5.10,  tx: ST.x,    tz: ST.z,         cy: 228, eye: 1.60, focal: 1060, vb: 720 },
    menuSelf:   { yaw: BAR.rot, dist: 0.98,  tx: STAND.x, tz: STAND.z,      cy: 352, eye: 1.32, focal: 2400, vb: 720 }
  };
  cam = Object.assign({}, SHOT.near);

  var G = { floor:0, bar:0, crewA:0, crewB:0, runner:0, shelf:0, stock:0, bottles:0, kit:0,
            card:0, menu:0, tentBar:0, spkBarL:0, spkBarR:0, booth:0, mixer:0, dj:0, spkL:0, spkR:0,
            tentDJ:0, vidRig:0, vidMan:0, work:0,
            station:0, jars:0, host:0, stand:0 };
  var MENU = [0,0,0,0,0,0];
  var twoCrew = false;

  function render() {
    ink = [];
    OP = mix(1, 0.12, Math.max(0, Math.min(1, (cam.focal - 1250) / 1100)));
    RV = G.floor; drawFloor();
    var q = [];
    // The bar, its crew and the shelf keep a fixed order among themselves: a two
    // metre counter seen at an angle spans too much depth for one centroid.
    if (G.bar > 0 || G.shelf > 0) q.push([at(BAR, 0, 0), function () {
      if (G.shelf > 0) { RV = G.shelf; drawShelfFrame(); RV = G.stock; drawShelfBottles(); }
      if (G.crewA > 0) { var ax = twoCrew ? -0.62 : 0; RV = G.crewA; figure(BAR, ax, 0.66, 'bar'); }
      if (G.crewB > 0) { RV = G.crewB; figure(BAR, 0.62, 0.66, 'bar'); }
      // the runner stands behind the bar at the right end, where he may cover the counter
      if (G.runner > 0) { RV = G.runner; figure(BAR, 1.20, 0.94, 'bar'); }
      if (G.bar > 0) { RV = G.bar; drawBar(); RV = G.bottles; drawBottles(); RV = G.kit; drawKit(); }
    }]);
    // A canopy sorts by its own back edge, so it is drawn before everything that stands
    // under it and its legs end up behind the crew, the bottles and the speakers.
    if (G.tentBar > 0) q.push([at(TENT_BAR.o, 0, TENT_BAR.d / 2), function () { RV = G.tentBar; drawCanopy(TENT_BAR); }]);
    if (G.tentDJ > 0) q.push([at(TENT_DJ.o, 0, TENT_DJ.d / 2), function () { RV = G.tentDJ; drawCanopy(TENT_DJ); }]);
    if (G.spkBarL > 0) q.push([at(SPK_BAR_L,0,0), function () { RV = G.spkBarL; drawSpeaker(SPK_BAR_L); }]);
    if (G.spkBarR > 0) q.push([at(SPK_BAR_R,0,0), function () { RV = G.spkBarR; drawSpeaker(SPK_BAR_R); }]);
    if (G.spkL > 0) q.push([at(SPK_L,0,0), function () { RV = G.spkL; drawSpeaker(SPK_L); }]);
    if (G.spkR > 0) q.push([at(SPK_R,0,0), function () { RV = G.spkR; drawSpeaker(SPK_R); }]);
    if (G.dj > 0) q.push([at(BOOTH,0,0.62), function () { RV = G.dj; figure(BOOTH, 0, 0.62, 'dj'); }]);
    if (G.booth > 0) q.push([at(BOOTH,0,0), function () {
      RV = G.booth; drawBooth(); RV = G.mixer; drawMixer();
    }]);
    if (G.station > 0) q.push([at(ST,0,0), function () {
      if (G.host > 0) { RV = G.host; figure(ST, -1.72, 0.38, 'bar'); }
      RV = G.station; drawStation(); drawFixtures();
      RV = G.jars; drawJars(BAR_BOTTLES);
    }]);
    if (G.stand > 0) q.push([at(STAND,0,0), function () { RV = G.stand; drawStandBody(); }]);
    if (G.vidRig > 0) { var vp = vidPos();
      q.push([at(vp.rig,0,0), function () { RV = G.vidRig; drawCamRig(vp.rig); }]);
      if (G.vidMan > 0) q.push([at(vp.man,0,0), function () { RV = G.vidMan; figure(vp.man, 0, 0, 'plain'); }]);
    }
    if (G.work > 0) q.push([at(WORK,0,0), function () { RV = G.work; figure(WORK, workWidth() / 2 - 0.30, 0.80, 'bar'); drawWorkTable(); }]);
    if (G.bar > 0) q.push([at(BAR,0,0), function () { RV = G.bar; drawBar(); RV = G.bottles; drawBottles(); RV = G.kit; drawKit(); }]);
    var face = '';
    placeCard();
    if (G.card > 0) {
      q.push([at(CARD,0,0), function () { OP = 1; RV = G.card; drawCardBody(); }]);
      for (var i = 0; i < ITEMS.length; i++) MENU[i] = Math.max(0, Math.min(1, G.menu * ITEMS.length - i));
      face = cardFace(MENU, G.card);
    }
    q.sort(function (a, b) { return b[0] - a[0]; }).forEach(function (r) { r[1](); });
    SVG.setAttribute('viewBox', '0 0 1000 ' + Math.round(cam.vb || 720));
    SVG.innerHTML = ink.join('') + face;
  }

  function seg(t,a,b){ return b <= a ? 1 : Math.max(0, Math.min(1, (t-a)/(b-a))); }
  function ease(u){ return u<0.5 ? 4*u*u*u : 1-Math.pow(-2*u+2,3)/2; }
  function mix(a,b,u){ return a+(b-a)*u; }
  var CAMKEYS = ['yaw','dist','tx','tz','cy','eye','focal','vb'];

  var ORDER = ['floor','station','host','jars','stand','bar','crewA','crewB','runner','shelf','stock','bottles','kit','card','menu',
               'tentBar','spkBarL','spkBarR','booth','mixer','dj','spkL','spkR','tentDJ',
               'vidRig','vidMan','work'];
  var UP = { floor:1250, bar:900, crewA:460, crewB:460, runner:460, shelf:700, stock:1150, bottles:430,
             kit:320, card:540, menu:2200, spkBarL:380, spkBarR:380, booth:540, mixer:320, dj:420, spkL:380, spkR:380 };
  var DOWN = 190, CAMT = 950, raf = null;
  // a click during a camera move should only pay for the distance that is left
  var CAMSCALE = { yaw:1, dist:5, tx:3, tz:3, cy:200, eye:1, focal:1000, vb:300 };
  var camStart = null, camGoal = null;
  function camDist(a, b) {
    var d = 0;
    CAMKEYS.forEach(function (k) { d += Math.abs((a[k] || 0) - (b[k] || 0)) / CAMSCALE[k]; });
    return d;
  }

  function go(target, camTo) {
    if (raf) cancelAnimationFrame(raf);
    var from = {}, fromCam = {}, tl = [], t = 0;
    ORDER.forEach(function (k) { from[k] = G[k] || 0; });
    CAMKEYS.forEach(function (k) { fromCam[k] = cam[k]; });
    ORDER.slice().reverse().forEach(function (k) {
      if ((target[k]||0) < from[k] - 0.001) { tl.push({ k:k, a:t, b:t+DOWN, to:target[k]||0 }); t += DOWN; }
    });
    var camMoves = CAMKEYS.some(function (k) { return Math.abs(fromCam[k] - camTo[k]) > 0.001; });
    var ca = t, cb = t;
    if (camMoves) {
      if (!camGoal || camDist(camGoal, camTo) > 0.001) { camGoal = camTo; camStart = fromCam; }
      var rem = camDist(fromCam, camTo) / Math.max(1e-6, camDist(camStart, camTo));
      cb = t + Math.max(200, Math.min(CAMT, CAMT * rem));
      t = cb;
    }
    var upAt = t, cardEnd = null;
    ORDER.forEach(function (k) {
      if (k === 'menu') return;                     // the card writes in parallel, see below
      if ((target[k]||0) > from[k] + 0.001) {
        tl.push({ k:k, a:t, b:t+(UP[k] || 400), to:target[k]||0 });
        if (k === 'card') cardEnd = t + (UP[k] || 400);
        t += UP[k] || 400;
      }
    });
    // The card writes on its own clock. It waits for the blank card to be drawn and for
    // nothing else, so picking a cocktail mid-flight adds a line instead of stalling the
    // scene, and every cocktail takes the same time to appear.
    if ((target.menu||0) > from.menu + 0.001) {
      var dm = Math.max(380, ((target.menu||0) - from.menu) * ITEMS.length * 300);
      var ma = cardEnd == null ? 0 : cardEnd;
      tl.push({ k:'menu', a:ma, b:ma + dm, to:target.menu||0 });
      t = Math.max(t, ma + dm);
    }
    var total = Math.max(t, 1), t0 = null;
    (function frame(now) {
      if (t0 === null) t0 = now;
      var e = now - t0;
      tl.forEach(function (s) { G[s.k] = mix(from[s.k], s.to, ease(seg(e, s.a, s.b))); });
      if (camMoves) { var u = ease(seg(e, ca, cb)); CAMKEYS.forEach(function (k) { cam[k] = mix(fromCam[k], camTo[k], u); }); }
      render();
      raf = e < total + 40 ? requestAnimationFrame(frame) : null;
    })(performance.now());
  }

  /* ===================== state ===================== */
  var S = {
    occasion:null, guests:80, service:null, duration:null, pack:null, customDrinks:null,
    menu:[], aperitifs:false, beers:false, alcoholFree:false,
    workshop:null, workshopPeople:10, music:null, direction:[], avoid:'', otherLive:'', where:null, power:null, cover:null,
    date:'', start:'', venue:'', extras:[],
    name:'', company:'', email:'', phone:'', message:''
  };
  var idx = 0, reached = 0, sent = false;

  // two items on the card is the floor, and they do not all have to be cocktails
  function cardCount() { return S.menu.length + (S.aperitifs ? APERITIFS.length : 0) + (S.beers ? 1 : 0); }
  function crewOf() { return S.guests > 60 ? 2 : 1; }
  function runnersOf() { return S.guests > 120 ? 1 : 0; }
  function perGuest() { return S.pack === 'apero' ? 2 : S.pack === 'evening' ? 3 : S.pack === 'late' ? 4 : 0; }
  function totalDrinks() { return S.customDrinks != null ? S.customDrinks : perGuest() * S.guests; }

  function sceneFor() {
    var id = STEPS[idx].id;
    var t = { floor: S.occasion ? 1 : 0 };
    var iDrinks = index('drinks'), iMenu = index('menu'),
        iMusic = index('music'), iWhere = index('where'), iExtras = index('extras');
    var self = S.service === 'self';
    // the bar never stands alone: its crew is worked out from the guest count
    if (S.service) {
      if (self) { t.station = 1; t.jars = 1; t.host = 1; }
      else { t.bar = 1; t.crewA = 1; t.crewB = crewOf() > 1 ? 1 : 0; t.runner = runnersOf() ? 1 : 0; }
    }
    if (idx >= iDrinks && S.pack) { if (!self) { t.shelf = 1; t.stock = 1; } }
    if (idx >= iMenu) {
      t.card = 1;
      if (self) t.stand = 1;
      if (S.menu.length) { t.menu = 1; if (!self) { t.bottles = 1; t.kit = 1; } }
    }
    if (idx >= iMusic) {
      if (S.music === 'speakers') { t.spkBarL = 1; t.spkBarR = 1; }
      if (S.music === 'dj') { t.booth = 1; t.mixer = 1; t.dj = 1; t.spkL = 1; t.spkR = 1; }
    }
    if (idx >= iWhere && S.where === 'outdoor') { t.tentBar = 1; if (t.booth) t.tentDJ = 1; }
    if (idx >= iExtras && S.extras.indexOf('video') > -1) { t.vidRig = 1; t.vidMan = 1; }
    if (id === 'workshop' && S.workshop === 'yes') t.work = 1;
    var out = t.tentBar === 1, spk = (S.music === 'speakers' && idx >= iMusic);
    // until the bar is chosen we look at the plot from the corner; after that we face the bar
    var bare = !t.bar && !t.station;
    var shot = bare ? SHOT.plot : (self ? SHOT.nearSelf : (spk ? SHOT.nearSpk : SHOT.near));
    if (id === 'workshop' && S.workshop === 'yes') shot = Object.assign({}, SHOT.work, { dist: 1.60 + workWidth() * 1.25 });
    else if (id === 'menu') shot = self ? SHOT.menuSelf : SHOT.menu;
    else if (t.vidRig && idx >= iExtras) shot = S.music === 'dj' ? (out ? SHOT.wideVidOut : SHOT.wideVid)
                                                                 : (out ? SHOT.vidNearOut : SHOT.vidNear);
    else if (S.music === 'dj' && idx >= iMusic) shot = out ? SHOT.wideOut : SHOT.wide;
    twoCrew = crewOf() > 1;
    return { t: t, shot: shot };
  }
  function pushScene() { var r = sceneFor(); go(r.t, r.shot); }

  function syncMenu(animate) {
    var picked = BASES.filter(function (b) { return S.menu.indexOf(b.id) > -1; });
    var list = picked.map(function (b) { return { name: b.name, flavour: b.flavour, build: b.build, eur: PRICE.base }; });
    if (S.aperitifs) list = list.concat(APERITIFS);
    if (S.beers) list = list.concat(BEERS);
    ITEMS = list;
    BAR_BOTTLES = picked.map(function (b) { return b.col; });
    var n = ITEMS.length;
    MENU = ITEMS.map(function () { return 0; });
    // A new item never rubs out what is already written: the lines drawn so far keep
    // their place on the longer card, so the pen carries on from where it was.
    if (animate && prevItems > 0 && n > prevItems) G.menu = Math.min(1, (G.menu || 0) * prevItems / n);
    else if (animate && n < prevItems) G.menu = 1;
    prevItems = n;
    measure();
  }
  var prevItems = 0;

  /* ===================== steps ===================== */
  function index(id) { for (var i = 0; i < STEPS.length; i++) if (STEPS[i].id === id) return i; return -1; }
  function el(h) { var d = document.createElement('div'); d.innerHTML = h.trim(); return d.firstChild; }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'})[c]; }); }

  function cards(opts, key, onPick) {
    var wrap = el('<div class="cf-opts"></div>');
    opts.forEach(function (o) {
      var b = el('<button class="cf-opt" type="button"><b>' + esc(tr(o.name)) + '</b>' + (o.note ? '<i>' + esc(tr(o.note)) + '</i>' : '') +
                 (o.num ? '<span class="cf-num">' + esc(o.num) + '</span>' : '') + '</button>');
      b.setAttribute('aria-pressed', S[key] === o.id);
      b.addEventListener('click', function () {
        S[key] = o.id;
        wrap.querySelectorAll('.cf-opt').forEach(function (x, i) { x.setAttribute('aria-pressed', opts[i].id === o.id); });
        if (onPick) onPick(o);
        paintBar();
      });
      wrap.appendChild(b);
    });
    return wrap;
  }
  function toggle(label, note, key, onFlip) {
    var b = el('<button class="cf-tg" type="button"><span class="cf-box"></span><span><b>' + esc(tr(label)) + '</b><i>' + esc(tr(note)) + '</i></span></button>');
    b.dataset.k = key;
    b.setAttribute('aria-pressed', !!S[key]);
    b.addEventListener('click', function () {
      S[key] = !S[key]; b.setAttribute('aria-pressed', !!S[key]);
      if (key === 'aperitifs' || key === 'beers') { syncMenu(true); pushScene(); }
      if (onFlip) onFlip();
      paintBar();
    });
    return b;
  }
  function cont(label, enabled) {
    var b = el('<button class="cf-btn" type="button" style="margin-top:22px">' + esc(tr(label || 'Continue')) + '</button>');
    if (enabled === false) b.disabled = true;
    b.addEventListener('click', next);
    return b;
  }

  var STEPS = [
    { id:'occasion', label:'Occasion',
      sum:function(){ return pick(OCCASIONS, S.occasion) + ' · ' + S.guests + ' ' + tr('guests'); },
      title:"What's the occasion, and how many people?",
      sub:'Pick the closest one and give us a rough headcount. Nothing here is final, it only shapes what we suggest.',
      body:function(m){
        var btn;
        m.appendChild(cards(OCCASIONS, 'occasion', function () { pushScene(); btn.disabled = false; }));

        m.appendChild(el('<p class="cf-note" style="margin-top:26px;color:var(--mut)">' + tr('How many people?') + '</p>'));
        var row = el('<div class="cf-row"></div>');
        var st = el('<div class="cf-stepper"><button type="button" data-d="-10">&minus;</button><input class="g" inputmode="numeric" /><button type="button" data-d="10">+</button></div>');
        var inp = st.querySelector('input'); inp.value = S.guests;
        st.querySelectorAll('button').forEach(function (b) {
          b.addEventListener('click', function () {
            S.guests = Math.max(10, Math.min(180, S.guests + (+b.dataset.d)));
            inp.value = S.guests; paintChips(); paintNote(); paintBar();
          });
        });
        inp.addEventListener('input', function () {
          var v = parseInt(inp.value.replace(/\D/g,''), 10);
          if (!isNaN(v)) { S.guests = Math.max(10, Math.min(180, v)); paintChips(); paintNote(); paintBar(); }
        });
        row.appendChild(st); m.appendChild(row);
        var chips = el('<div class="cf-chips"></div>');
        [30,60,100,150,180].forEach(function (n) {
          var c = el('<button class="cf-chip" type="button">' + n + '</button>');
          c.addEventListener('click', function () { S.guests = n; inp.value = n; paintChips(); paintNote(); paintBar(); });
          chips.appendChild(c);
        });
        m.appendChild(chips);
        var note = el('<p class="cf-note"></p>'); m.appendChild(note);
        function paintChips(){ chips.querySelectorAll('.cf-chip').forEach(function(c){ c.setAttribute('aria-pressed', +c.textContent === S.guests); }); }
        function paintNote(){
          note.textContent = tr('One bartender serves up to 60 guests comfortably.') + ' ' +
            tr('At') + ' ' + S.guests + ' ' + tr('we bring') + ' ' + crewOf() + ' ' +
            tr(crewOf() > 1 ? 'bartenders' : 'bartender') + (runnersOf() ? ' ' + tr('and a runner') : '') + '.';
        }
        paintChips(); paintNote();
        btn = cont('Continue', !!S.occasion); m.appendChild(btn);
        m.appendChild(el('<p class="cf-note">' + tr('Above 180 guests, write it in the last step and we will plan a second bar with you.') + '</p>'));
      } },

    { id:'where', label:'Where', sum:function(){ return pick(WHERE, S.where); },
      title:'Indoor or outdoor?', sub:'We bring a canopy for outdoor events if the weather asks for it.',
      body:function(m){
        var btn;
        m.appendChild(cards(WHERE, 'where', function (o) {
          pushScene();
          if (o.id === 'indoor') extra.innerHTML = ''; else draw();
          btn.disabled = false;
        }));
        var extra = el('<div></div>'); m.appendChild(extra);
        function draw() {
          extra.innerHTML = '';
          extra.appendChild(el('<p class="cf-note" style="margin-top:20px;color:var(--mut)">' + tr('Power on site?') + '</p>'));
          var c = el('<div class="cf-chips" style="margin-top:8px"></div>');
          ['Yes','No','Not sure'].forEach(function (v) {
            var b = el('<button class="cf-chip" type="button">' + esc(tr(v)) + '</button>');
            b.setAttribute('aria-pressed', S.power === v);
            b.addEventListener('click', function () {
              S.power = v;
              c.querySelectorAll('.cf-chip').forEach(function (x, i) { x.setAttribute('aria-pressed', ['Yes','No','Not sure'][i] === v); });
              paintBar();
            });
            c.appendChild(b);
          });
          extra.appendChild(c);
        }
        if (S.where === 'outdoor') draw();
        btn = cont('Continue', !!S.where); m.appendChild(btn);
      } },

    { id:'service', label:'Service', sum:function(){ return pick(SERVICE, S.service); },
      title:'How should it be served?', sub:'Both roll in on castors. The difference is who pours.',
      body:function(m){
        var btn;
        var wrap = el('<div class="cf-opts"></div>');
        SERVICE.forEach(function (o) {
          var locked = o.id === 'self' && S.guests > 60;
          var b = el('<button class="cf-opt" type="button"><b>' + esc(tr(o.name)) + '</b><i>' + esc(tr(o.note)) + '</i></button>');
          b.setAttribute('aria-pressed', S.service === o.id);
          if (locked) { b.disabled = true; b.style.opacity = '0.45'; }
          b.addEventListener('click', function () {
            if (locked) return;
            S.service = o.id;
            wrap.querySelectorAll('.cf-opt').forEach(function (x, i) { x.setAttribute('aria-pressed', SERVICE[i].id === o.id); });
            if (o.id === 'self' && S.duration === '5') S.duration = null;
            if (o.id === 'self' && S.duration === '6') S.duration = null;
            if (o.id === 'self' && S.pack === 'late') S.pack = null;
            pushScene(); paintBar(); btn.disabled = false;
          });
          wrap.appendChild(b);
        });
        m.appendChild(wrap);
        if (S.guests > 60) m.appendChild(el('<p class="cf-note">' + tr('Self-service is for up to 60 guests. Above that a bartender pours.') + '</p>'));
        else m.appendChild(el('<p class="cf-note">' + tr('Self-service suits up to 60 guests. One of our hosts stays at the station to keep it stocked and to check ages.') + '</p>'));
        btn = cont('Continue', !!S.service); m.appendChild(btn);
      } },

    { id:'drinks', label:'Drinks',
      sum:function(){ return (S.pack === 'cash' ? tr('Cash bar') : pick(PACKS, S.pack) + ' · ' + totalDrinks() + ' ' + tr('cocktails')) +
                             (S.duration ? ' · ' + S.duration + ' h' : ''); },
      title:"What's on the house, and for how long?",
      sub:function(){ return tr('For') + ' ' + S.guests + ' ' + tr('guests.') + ' ' + tr('Bar time is service hours only.'); },
      body:function(m){
        var opts = PACKS.filter(function (p) { return !(S.service === 'self' && p.id === 'late'); }).map(function (p) {
          return p.id === 'cash' ? p : { id:p.id, name:p.name, note:p.note, num:p.per + ' ' + tr('per guest') + ' · ' + tr('about') + ' ' + (p.per * S.guests) + ' ' + tr('cocktails') };
        });
        var btn, self = S.service === 'self';
        var wrap = cards(opts, 'pack', function () { S.customDrinks = null; pushScene(); ok(); prices(); });
        m.appendChild(wrap);
        // the station is one flat price however the evening is shaped, so it is said once
        if (self) m.appendChild(el('<p class="cf-note" style="margin-top:14px">' + tr('Self-service station') + ', ' +
          tr('up to four hours') + ': <span class="cf-money">' + esc(eur(RATE.self)) + '</span> ' + tr('net') + '. ' +
          tr('The drinks are in that price.') + '</p>'));
        var link = el('<button class="cf-link" type="button">' + tr('Set the number myself') + '</button>');
        var box = el('<div style="display:none"></div>');
        var st = el('<div class="cf-row"><div class="cf-stepper"><button type="button" data-d="-25">&minus;</button><input inputmode="numeric" /><button type="button" data-d="25">+</button></div></div>');
        var inp = st.querySelector('input'); inp.value = S.customDrinks || perGuest() * S.guests || 240;
        st.querySelectorAll('button').forEach(function (b) {
          b.addEventListener('click', function () { inp.value = Math.max(25, (+inp.value || 0) + (+b.dataset.d)); S.customDrinks = +inp.value; paintBar(); });
        });
        inp.addEventListener('input', function () { S.customDrinks = parseInt(inp.value.replace(/\D/g,''),10) || null; paintBar(); prices(); });
        box.appendChild(el('<p class="cf-note" style="margin-top:18px">' + tr('Total cocktails for the night.') + '</p>'));
        box.appendChild(st);
        var ownPrice = el('<p class="cf-note"></p>'); box.appendChild(ownPrice);
        link.addEventListener('click', function () { box.style.display = 'block'; link.style.display = 'none'; S.customDrinks = +inp.value; S.pack = S.pack || 'custom'; paintBar(); ok(); });
        m.appendChild(link); m.appendChild(box);
        m.appendChild(el('<p class="cf-note">' + tr('Your line on unused drinks goes here.') + '</p>'));

        // how long the bar stays open: the other half of the same decision
        m.appendChild(el('<p class="cf-note" style="margin-top:26px;color:var(--mut)">' + tr('How long is the bar open?') + '</p>'));
        var hours = el('<div class="cf-chips" style="margin-top:10px"></div>');
        DURATIONS.filter(function (d) { return S.service !== 'self' || +d.id <= 4; }).forEach(function (d) {
          var c = el('<button class="cf-chip" type="button">' + esc(tr(d.name)) + '</button>');
          c.setAttribute('aria-pressed', S.duration === d.id);
          c.addEventListener('click', function () {
            S.duration = d.id;
            hours.querySelectorAll('.cf-chip').forEach(function (x) { x.setAttribute('aria-pressed', x === c); });
            paintBar(); ok(); prices();
          });
          hours.appendChild(c);
        });
        m.appendChild(hours);
        m.appendChild(el('<p class="cf-note">' + tr('We arrive two hours before you open and clear within one hour after. It does not count against your bar time.') + '</p>'));

        m.appendChild(el('<p class="cf-note" style="margin-top:22px">' + tr('Every price here is net. VAT comes on top.') + '</p>'));

        // Each card carries the price of its own choice. Bar time is folded in, so a
        // longer evening moves the numbers where the customer can see it happen.
        function prices() {
          var nodes = wrap.querySelectorAll('.cf-opt');
          opts.forEach(function (o, i) {
            if (self) { priceTag(nodes[i], ''); return; }
            if (o.id === 'cash') { priceTag(nodes[i], eur(RATE.cashSetup)); return; }
            var p = drinksPrice(perOf(o.id) * S.guests);
            priceTag(nodes[i], p == null ? tr('On request') : eur(p), p == null ? '' : 'net');
          });
          if (!self && S.customDrinks) {
            var c = drinksPrice(S.customDrinks);
            ownPrice.innerHTML = c == null
              ? tr('Past four hundred cocktails we run a second bar, and we quote that one by hand.')
              : '<span class="cf-money">' + esc(eur(c)) + '</span> ' + tr('net') + ', ' + tr('bar service for') + ' ' +
                S.customDrinks + ' ' + tr('cocktails') + (hoursOf() ? ' ' + tr('over') + ' ' + hoursOf() + ' h' : '') + '.';
          } else ownPrice.innerHTML = '';
        }

        function ok() { btn.disabled = !(S.pack || S.customDrinks) || !S.duration; }
        btn = cont('Continue', false); m.appendChild(btn); ok(); prices();
      } },

    { id:'menu', label:'Menu', sum:function(){ return S.menu.length + ' ' + tr('cocktails') + (S.aperitifs ? ' + ' + tr('aperitifs') : '') + (S.beers ? ' + ' + tr('beer') : ''); },
      title:'Build the card.', sub:function(){ return S.service === 'self' ? 'Every cocktail is made from a CORC base, one dispenser each. Two items on the card is the minimum.' : 'Every cocktail is made from a CORC base. Two items on the card is the minimum, aperitifs and beer count.'; },
      body:function(m){
        var wrap = el('<div class="cf-opts"></div>');
        BASES.forEach(function (o) {
          var b = el('<button class="cf-opt" type="button"><b>' + esc(tr(o.name)) + '</b><span class="cf-num">' +
                     esc(tr(o.flavour)) + '</span><i>' + esc(tr(o.build)) + '</i></button>');
          b.setAttribute('aria-pressed', S.menu.indexOf(o.id) > -1);
          b.addEventListener('click', function () {
            var i = S.menu.indexOf(o.id);
            if (i > -1) S.menu.splice(i, 1); else if (S.menu.length < 5) S.menu.push(o.id);
            b.setAttribute('aria-pressed', S.menu.indexOf(o.id) > -1);
            syncMenu(true); pushScene(); paintBar(); ok();
          });
          wrap.appendChild(b);
        });
        m.appendChild(wrap);
        var tg = el('<div class="cf-toggles"></div>');
        tg.appendChild(toggle('Aperitifs', 'Aperol Spritz and Limoncello Spritz, poured at the bar', 'aperitifs', function () { ok(); }));
        tg.appendChild(toggle('Beer', 'Bottled beer at the bar, 0.5 l', 'beers', function () { beerNote(); ok(); }));
        tg.appendChild(toggle('Alcohol free', 'Every base also works with tonic, soda or mate tea as a mocktail', 'alcoholFree'));
        m.appendChild(tg);
        // beer sits outside the drink allowance, so we say so where it is chosen
        var bn = el('<div></div>'); m.appendChild(bn);
        function beerNote() {
          bn.innerHTML = '';
          if (!S.beers) return;
          bn.appendChild(el('<p class="cf-note" style="margin-top:14px;color:var(--mut)">' + (S.pack === 'cash'
            ? '<b style="color:var(--fg);font-weight:500">' + tr('Guests pay per bottle.') + '</b> ' + tr('Beer is priced like the cocktails, straight at the bar.')
            : '<b style="color:var(--fg);font-weight:500">' + tr('Beer is billed separately.') + '</b> ' + tr('It sits outside your cocktail allowance and goes in blocks of twenty bottles, quoted before the event. Every unopened bottle is credited back.')) + '</p>'));
        }
        beerNote();
        function ok() {
          var af = tg.querySelector('.tg[data-k="alcoholFree"]');
          if (af) {                                  // a mocktail needs a base to be made from
            var can = S.menu.length > 0;
            af.disabled = !can;
            af.style.opacity = can ? '' : '0.45';
            if (!can && S.alcoholFree) { S.alcoholFree = false; af.setAttribute('aria-pressed', 'false'); }
          }
          btn.disabled = cardCount() < 2;
        }
        var btn = cont('Continue', false);
        m.appendChild(btn); ok();
      } },

    { id:'workshop', label:'Workshop', sum:function(){ return S.workshop === 'yes' ? tr('Workshop for') + ' ' + S.workshopPeople : tr('No workshop'); },
      title:'Want a cocktail workshop before the party?', sub:'Forty five minutes, hands on, before the event starts: your people shake their own, then the bar takes over. It does not have to sit on the event day at all, so if you would rather have it on its own date, say so in the last step.',
      body:function(m){
        var btn;
        var wrap = cards(WORKSHOP, 'workshop', function (o) {
          if (o.id === 'no') extra.innerHTML = ''; else draw();
          pushScene(); btn.disabled = false;
        });
        m.appendChild(wrap);
        var yes = wrap.querySelectorAll('.cf-opt')[0], headNote = null;
        // the card and the line under the stepper both move with the headcount
        function price() {
          priceTag(yes, eur(workshopPrice()));
          if (headNote) headNote.innerHTML = tr('Up to') + ' ' + RATE.workshopBase + ' ' + tr('people') + ': <span class="cf-money">' +
            esc(eur(RATE.workshop)) + '</span> ' + tr('net') + '. ' + tr('Each further person') + ' <span class="cf-money">' +
            esc(eur(RATE.workshopHead)) + '</span>.';
        }
        var extra = el('<div></div>'); m.appendChild(extra);
        function draw() {
          extra.innerHTML = ''; headNote = null;
          var st = el('<div class="cf-row"><div class="cf-stepper"><button type="button" data-d="-2">&minus;</button><input inputmode="numeric" /><button type="button" data-d="2">+</button></div></div>');
          var inp = st.querySelector('input'); inp.value = S.workshopPeople;
          st.querySelectorAll('button').forEach(function (b) {
            b.addEventListener('click', function () { S.workshopPeople = Math.max(4, Math.min(20, S.workshopPeople + (+b.dataset.d))); inp.value = S.workshopPeople; pushScene(); paintBar(); price(); });
          });
          extra.appendChild(el('<p class="cf-note" style="margin-top:18px">' + tr('How many people take part? Up to twenty.') + '</p>'));
          extra.appendChild(st);
          headNote = el('<p class="cf-note"></p>'); extra.appendChild(headNote);
          price();
        }
        if (S.workshop === 'yes') draw();
        price();
        btn = cont('Continue', !!S.workshop); m.appendChild(btn);
      } },

    { id:'music', label:'Music', sum:function(){ return pick(MUSIC, S.music) + (S.direction.length ? ' · ' + S.direction.join(', ') : ''); },
      title:'What about music?', sub:'The bar runs fine without it. These are the two ways to add it.',
      body:function(m){
        var btn;
        var wrap = cards(MUSIC, 'music', function (o) {
          pushScene();
          if (o.id === 'none') { S.direction = []; S.avoid = ''; S.otherLive = ''; extra.innerHTML = ''; }
          else draw();
          btn.disabled = false;
        });
        m.appendChild(wrap);
        // speakers ride along with the bar; the DJ is a line of his own, and it grows with the hours
        var mNodes = wrap.querySelectorAll('.cf-opt');
        MUSIC.forEach(function (o, i) {
          if (o.id === 'speakers') priceTag(mNodes[i], eur(RATE.speakers));
          if (o.id === 'dj') priceTag(mNodes[i], eur(djPrice()));
        });
        var extra = el('<div></div>'); m.appendChild(extra);
        function draw() {
          extra.innerHTML = '';
          if (S.music === 'dj') {
            extra.appendChild(el('<p class="cf-note" style="margin-top:22px;color:var(--mut)">' +
              '<b style="color:var(--fg);font-weight:500">' + tr('How the night runs.') + '</b> ' +
              tr('The resident plays up to three hours of house and techno. Around the set, the playlist runs in the genres you pick.') + '</p>'));
            extra.appendChild(el('<p class="cf-note">' + tr('Booth, speakers and the resident for') + ' ' + RATE.djTime + ' h: <span class="cf-money">' +
              esc(eur(RATE.dj)) + '</span> ' + tr('net') + '. ' + tr('Each further hour') + ' <span class="cf-money">' +
              esc(eur(RATE.djHour)) + '</span>.' + (hoursOf() > RATE.djTime ? ' ' + tr('Your') + ' ' + hoursOf() + ' h: <span class="cf-money">' +
              esc(eur(djPrice())) + '</span> ' + tr('net') + '.' : '') + '</p>'));
          }
          extra.appendChild(el('<p class="cf-note" style="margin-top:22px;color:var(--mut)">' + tr('What should the playlist sound like? Pick up to three.') + '</p>'));
          var c = el('<div class="cf-chips" style="margin-top:10px"></div>');
          DIRECTIONS.forEach(function (d) {
            var b = el('<button class="cf-chip" type="button">' + esc(tr(d)) + '</button>');
            b.setAttribute('aria-pressed', S.direction.indexOf(d) > -1);
            b.addEventListener('click', function () {
              var i = S.direction.indexOf(d);
              if (i > -1) S.direction.splice(i, 1); else if (S.direction.length < 3) S.direction.push(d);
              b.setAttribute('aria-pressed', S.direction.indexOf(d) > -1);
              paintBar();
            });
            c.appendChild(b);
          });
          extra.appendChild(c);
          if (S.music === 'dj') {
            // The honest escape hatch: a request we answer, not a promise we make.
            var link = el('<button class="cf-link" type="button">' + tr('Need another live sound?') + '</button>');
            var box = el('<div style="display:none"></div>');
            var f2 = el('<div class="cf-fields" style="margin-top:14px"></div>');
            f2.appendChild(field('What would you want live?', 'otherLive', 'text', 'Soul and funk, Spanish, a live sax'));
            box.appendChild(f2);
            box.appendChild(el('<p class="cf-note">' + tr('We come back within one working day with a name, a price and an honest yes or no.') + '</p>'));
            link.addEventListener('click', function () { box.style.display = 'block'; link.style.display = 'none'; });
            extra.appendChild(link); extra.appendChild(box);
            if (S.otherLive) { box.style.display = 'block'; link.style.display = 'none'; }
          }
          var f = el('<div class="cf-fields" style="margin-top:20px"></div>');
          f.appendChild(field('Anything we should keep off the floor?', 'avoid', 'text',
                              'One line is enough. A song with history, a track the room will not forgive.'));
          extra.appendChild(f);
        }
        if (S.music === 'speakers' || S.music === 'dj') draw();
        btn = cont('Continue', !!S.music); m.appendChild(btn);
      } },

    { id:'extras', label:'Extras', sum:function(){ return S.extras.length ? S.extras.map(function(k){ return pick(EXTRAS, k); }).join(', ') : tr('None'); },
      title:'Anything else?', sub:'All optional. Pick as many as you like, or none.',
      body:function(m){
        var tg = el('<div class="cf-toggles"></div>');
        EXTRAS.forEach(function (o) {
          var b = el('<button class="cf-tg" type="button"><span class="cf-box"></span><span><b>' + esc(tr(o.name)) + '</b><i>' + esc(tr(o.note)) + '</i></span></button>');
          b.setAttribute('aria-pressed', S.extras.indexOf(o.id) > -1);
          b.addEventListener('click', function () {
            var i = S.extras.indexOf(o.id);
            if (i > -1) S.extras.splice(i, 1); else S.extras.push(o.id);
            b.setAttribute('aria-pressed', S.extras.indexOf(o.id) > -1);
            pushScene(); paintBar();
          });
          // the two per-unit extras are priced off the package the bar is already on
          if (o.id === 'video') priceTag(b, eur(RATE.video));
          if (o.id === 'drinks') priceTag(b, eur(blockPrice()));   // the note already says per block of 25
          if (o.id === 'late') priceTag(b, eur(hourPrice()));      // and here, per hour
          tg.appendChild(b);
        });
        m.appendChild(tg);
        m.appendChild(cont());
      } },

    { id:'quote', label:'Your quote', sum:function(){ var q = quote(); return q.over ? tr('On request') : tr('from') + ' ' + eur(q.low) + ' ' + tr('net'); },
      title:'Here is what it comes to.', sub:'An estimate from the choices you made. We confirm it as a fixed quote within one working day, and nothing is booked until you say so.',
      body:function(m){
        var q = quote();

        if (q.over) {
          m.appendChild(el('<div class="cf-quote"><div class="cf-eyebrow">' + tr('More than one bar') + '</div>' +
            '<div class="cf-big">' + tr('We quote this one by hand') + '</div>' +
            '<p class="cf-vat">' + totalDrinks() + ' ' +
            tr('cocktails is past what a single two metre counter can pour in an evening. For this we plan a second bar station with its own crew, so the queue never becomes the evening. Send the request and we come back with a number.') +
            '</p></div>'));
        } else {
          var one = q.low === q.high, dash = ' &ndash; ';
          m.appendChild(el('<div class="cf-quote"><div class="cf-eyebrow">' +
            tr(S.pack === 'cash' && S.service !== 'self' ? 'What you pay, net' : 'Estimate, net') + '</div>' +
            '<div class="cf-big">' + esc(eur(q.low)) + (one ? '' : dash + esc(eur(q.high))) + '</div>' +
            '<div class="cf-vat">' + esc(eur(round50(q.low * (1 + RATE.vat)))) +
            (one ? '' : dash + esc(eur(round50(q.high * (1 + RATE.vat))))) + ' ' + tr('incl. VAT') +
            (S.pack === 'cash' && S.service !== 'self'
              ? '<br>' + tr('Your guests pay for their own drinks, from') + ' ' + esc(eur(PRICE.spritz)) + ' ' +
                tr('to') + ' ' + esc(eur(PRICE.base)) + ' ' + tr('a glass.')
              : '') + '</div></div>'));

          var lines = el('<div class="cf-lines"></div>');
          q.lines.forEach(function (l) {
            lines.appendChild(el('<div class="ln' + (l.soft ? ' soft' : '') + '"><span><b>' + esc(l.label) + '</b>' +
              (l.sub ? '<em>' + l.sub + '</em>' : '') + '</span><s>' +
              (l.net == null ? tr('quoted separately') : esc(eur(l.net))) + '</s></div>'));
          });
          m.appendChild(lines);
          q.notes.forEach(function (t) { m.appendChild(el('<p class="cf-note">' + t + '</p>')); });
          m.appendChild(el('<p class="cf-note">' + (one ? '' : tr('The band covers the small things we only know once we see the room.') + ' ') +
            tr('This estimate holds for fourteen days.') + '</p>'));
          if (S.pack && S.pack !== 'apero' && S.pack !== 'cash' && S.service !== 'self')
            m.appendChild(el('<p class="cf-note">' + tr('If that is over budget, the Apéro package starts at 1.000 € with the same bar.') + '</p>'));
        }

        var fx = el('<div class="cf-facts"></div>');
        facts().forEach(function (f) { fx.appendChild(el('<div><b>' + tr(f[0]) + '</b><i>' + f[1] + '</i></div>')); });
        m.appendChild(fx);

        m.appendChild(el('<p class="cf-note" style="margin-top:24px;color:var(--mut)">' +
          tr('Tell us where to send it, and the full summary plus our rate card lands in your inbox within a minute.') + '</p>'));
        m.appendChild(cont('Send me this as a PDF'));
      } },

    { id:'contact', label:'Date and contact',
      sum:function(){ return (S.date || tr('Date open')) + (S.name ? ' · ' + S.name : ''); },
      title:'Where should we send it?',
      sub:'The estimate, the full summary and our rate card go out as one PDF. If the date is not fixed yet, leave it open and tell us in the message. We answer within one working day with a fixed quote, and nothing is booked until you confirm it.',
      body:function(m){
        var f = el('<div class="cf-fields"></div>');
        var twoD = el('<div class="cf-fields cf-two"></div>');
        var fDate = field('Date', 'date', 'date');
        twoD.appendChild(fDate); twoD.appendChild(field('Bar opens', 'start', 'time'));
        f.appendChild(twoD);
        f.appendChild(field('Venue or address', 'venue', 'text', 'Name, street, floor'));
        var two = el('<div class="cf-fields cf-two"></div>');
        two.appendChild(field('Name', 'name', 'text'));
        two.appendChild(field('Company', 'company', 'text', 'Optional'));
        f.appendChild(two);
        var two2 = el('<div class="cf-fields cf-two"></div>');
        two2.appendChild(field('Email', 'email', 'email'));
        two2.appendChild(field('Phone', 'phone', 'tel', 'Optional'));
        f.appendChild(two2);
        f.appendChild(field('Anything else we should know', 'message', 'textarea'));
        m.appendChild(f);
        var warn = el('<div></div>'); m.appendChild(warn);
        // last step, so this is the footer's Send button brought next to the fields
        var btn = el('<button class="cf-btn" type="button" style="margin-top:22px">' + tr('Send the request') + '</button>');
        btn.addEventListener('click', function () { if (!elSend.disabled) elSend.click(); });
        m.appendChild(btn);

        // a week is the shortest lead time we can order, prep and staff against
        var iDate = fDate.querySelector('.cf-t');
        var floor7 = new Date(); floor7.setHours(12,0,0,0); floor7.setDate(floor7.getDate() + 7);
        function pad(v) { return ('0' + v).slice(-2); }
        var minDate = floor7.getFullYear() + '-' + pad(floor7.getMonth()+1) + '-' + pad(floor7.getDate());
        iDate.setAttribute('min', minDate);
        iDate.addEventListener('input', check);
        function check() {
          warn.innerHTML = '';
          var bad = S.date && S.date < minDate;
          if (bad) {
            var d = new Date(minDate + 'T12:00:00');
            warn.appendChild(el('<p class="cf-note" style="margin-top:14px;color:var(--primary)">' +
              esc(tr('The earliest date we can take is') + ' ' +
                  d.toLocaleDateString(loc(), { day:'numeric', month:'long', year:'numeric' }) + '. ' +
                  tr('We need a week to order, prep and staff the bar.')) + '</p>'));
          }
          btn.disabled = !!bad;
        }
        check();
      } }
  ];

  function field(label, key, type, ph) {
    var l = el('<label class="cf-f"><span>' + esc(tr(label)) + '</span></label>');
    var i = el(type === 'textarea' ? '<textarea class="cf-t"></textarea>' : '<input class="cf-t" type="' + type + '" />');
    if (ph) i.setAttribute('placeholder', tr(ph));
    i.value = S[key] || '';
    i.addEventListener('input', function () { S[key] = i.value; paintBar(); });
    l.appendChild(i);
    return l;
  }
  function pick(list, id) { for (var i = 0; i < list.length; i++) if (list[i].id === id) return tr(list[i].name); return '—'; }

  var OCCASIONS = [
    { id:'company',    name:'Company event',          note:'Summer party, year end, client evening, team offsite' },
    { id:'private',    name:'Private celebration',    note:'Birthday, anniversary, house party' },
    { id:'wedding',    name:'Wedding',                note:'Reception and evening' },
    { id:'special',    name:'Special event',          note:'Launch, opening, shoot, showroom, press night' },
    { id:'conference', name:'Conference and trade fair', note:'Booth, networking hour, side event' }
  ];
  var SERVICE = [
    { id:'bar',  name:'Bartender behind a bar', note:'Our bar rolls in, our crew mixes to order. The full card, alcohol free included.' },
    { id:'self', name:'Self-service station',   note:'A steel table with dispensers. Pre-mixed cocktails, your guests pour their own.' }
  ];
  var DURATIONS = [
    { id:'3', name:'3 hours', note:'Reception, after work, conference hour' },
    { id:'4', name:'4 hours', note:'The usual evening' },
    { id:'5', name:'5 hours', note:'Dinner plus party' },
    { id:'6', name:'6 hours or more', note:'Tell us in the last step' }
  ];
  var PACKS = [
    { id:'apero',   name:'Apéro',    per:2, note:'Reception, conference hour, short evening' },
    { id:'evening', name:'Evening',  per:3, note:'The standard party' },
    { id:'late',    name:'Late',     per:4, note:'Dinner and dancing' },
    { id:'cash',    name:'Cash bar', per:0, note:'No allowance, guests pay per drink' }
  ];
  var BASES = [
    { id:'basilico',  name:'Basilico',  col:'hsl(84 48% 44%)',  flavour:'Fresh · Herbal · Bright',    build:'Gin, basil, lemon, lime, orange' },
    { id:'fragola',   name:'Fragola',   col:'hsl(3 66% 47%)',   flavour:'Juicy · Rounded · Lively',   build:'Pink gin, strawberry, mint, lemon, lime, orange' },
    { id:'maracuja',  name:'Maracuja',  col:'hsl(36 86% 50%)',  flavour:'Tropical · Vibrant · Smooth',build:'Tequila, passion fruit, strawberry, lemon, lime' },
    { id:'framboise', name:'Framboise', col:'hsl(348 60% 39%)', flavour:'Deep · Spiced · Velvety',    build:'Gin, raspberry, cinnamon, lemon, orange' },
    { id:'yuzu',      name:'Yuzu',      col:'hsl(47 80% 53%)',  flavour:'Exotic · Zesty · Crisp',     build:'Vodka, mate tea, yuzu, lemon, orange, ginger' }
  ];
  var WORKSHOP = [
    { id:'yes', name:'Yes, add a workshop', note:'Before guests arrive, or as the opening act' },
    { id:'no',  name:'No, straight to the bar' }
  ];
  var MUSIC = [
    { id:'none',     name:'No music from us', note:'You handle sound' },
    { id:'speakers', name:'Speakers and playlist', note:'A pair of speakers beside the bar, your genres all night' },
    { id:'dj',       name:'DJ booth and resident DJ', note:'Live house and techno, the sound Berlin is known for' }
  ];
  var APERITIFS = [
    { name:'Aperol Spritz',     flavour:'Bitter · Citrus · Light',  build:'Aperol, prosecco, soda',      eur:PRICE.spritz },
    { name:'Limoncello Spritz', flavour:'Sweet · Sharp · Bright',   build:'Limoncello, prosecco, soda',  eur:PRICE.spritz }
  ];
  var BEERS = [ { name:'Beer', flavour:'', build:'', eur:PRICE.beer } ];
  var EXTRAS = [
    { id:'video',  name:'Videographer', note:'A short film of the night, delivered within a week' },
    { id:'drinks', name:'Extra drinks', note:'Blocks of 25 beyond the package' },
    { id:'late',   name:'Late hour',    note:'Each hour past the booked time' }
  ];
  var DIRECTIONS = ['Disco', 'House', 'Mediterranean', 'Afro and Latin', 'Pop classics', 'R&B and hip-hop'];
  var WHERE = [
    { id:'indoor',  name:'Indoor',  note:'Venue, office, hall, apartment' },
    { id:'outdoor', name:'Outdoor', note:'Garden, terrace, courtyard, rooftop' }
  ];

  /* ===================== language ===================== */
  // English is the source: every DE entry is keyed by the English line it replaces.
  var LANG = initialLang === 'de' ? 'de' : 'en';
  var DE = {
    "What's the occasion, and how many people?": "Was ist der Anlass, und wie viele Leute?",
    "Pick the closest one and give us a rough headcount. Nothing here is final, it only shapes what we suggest.": "Nehmt das, was am ehesten passt, und gebt uns eine ungefähre Zahl. Nichts davon ist endgültig, es prägt nur unsere Vorschläge.",
    "What's on the house, and for how long?": "Was geht aufs Haus, und wie lange?",
    "What about music?": "Und die Musik?",
    "We bring a canopy for outdoor events if the weather asks for it.": "Bei Outdoor-Events bringen wir ein Zelt mit, wenn das Wetter es verlangt.",
    "Every cocktail is made from a CORC base, one dispenser each. Two items on the card is the minimum.": "Jeder Cocktail entsteht aus einer CORC Base, pro Sorte ein Spender. Zwei Positionen auf der Karte sind das Minimum.",
    "Every cocktail is made from a CORC base. Two items on the card is the minimum, aperitifs and beer count.": "Jeder Cocktail entsteht aus einer CORC Base. Zwei Positionen auf der Karte sind das Minimum, Aperitifs und Bier zählen mit.",
    "Tell us where to send it, and the full summary plus our rate card lands in your inbox within a minute.": "Sagt uns, wohin wir es schicken sollen, und die vollständige Übersicht samt Preisliste liegt innerhalb einer Minute in eurem Postfach.",
    "Send me this as a PDF": "Schickt mir das als PDF",
    "Where should we send it?": "Wohin schicken wir es?",
    "The estimate, the full summary and our rate card go out as one PDF. If the date is not fixed yet, leave it open and tell us in the message. We answer within one working day with a fixed quote, and nothing is booked until you confirm it.": "Die Schätzung, die vollständige Übersicht und unsere Preisliste gehen als ein PDF raus. Wenn das Datum noch nicht fest steht, lasst es offen und schreibt es uns in die Nachricht. Wir antworten innerhalb eines Werktags mit einem festen Angebot, und gebucht ist nichts, bis ihr bestätigt.",
    "If that is over budget, the Apéro package starts at 1.000 € with the same bar.": "Wenn das über dem Budget liegt: das Apéro Paket beginnt bei 1.000 € mit derselben Bar.",
    "Forty five minutes, hands on, before the event starts: your people shake their own, then the bar takes over. It does not have to sit on the event day at all, so if you would rather have it on its own date, say so in the last step.": "Fünfundvierzig Minuten zum Mitmachen, bevor das Event losgeht: eure Leute shaken selbst, danach übernimmt die Bar. Der Workshop muss gar nicht am Eventtag liegen, also schreibt es uns im letzten Schritt, wenn ihr lieber einen eigenen Termin hättet.",
    "What are we pouring for, and for how many?": "Wofür schenken wir aus, und für wie viele?",
    "Pick the closest one and give us a rough headcount. Neither is locked.": "Nehmt das, was am ehesten passt, und gebt uns eine ungefähre Zahl. Festgelegt ist beides nicht.",
    "We put the canopy up first and build the bar under it. We only need to know about power.": "Wir stellen zuerst das Zelt auf und bauen die Bar darunter. Wir müssen nur wissen, wie es mit Strom aussieht.",
    "How much is on you, and for how long?": "Wie viel geht auf euch, und wie lange?",
    "Bar time is service hours only.": "Die Barzeit zählt nur die Ausschankstunden.",
    "We arrive two hours before you open and clear within one hour after. It does not count against your bar time.": "Wir kommen zwei Stunden vor Öffnung und sind eine Stunde danach wieder raus. Das zählt nicht zu eurer Barzeit.",
    "Date and contact": "Datum und Kontakt",
    "When is it, and who do we write back to?": "Wann ist es, und an wen schreiben wir zurück?",
    "If the date is not fixed yet, leave it open and tell us in the message. We answer within one working day with a fixed quote, and nothing is booked until you confirm it.": "Wenn das Datum noch nicht fest steht, lasst es offen und schreibt es uns in die Nachricht. Wir antworten innerhalb eines Werktags mit einem festen Angebot, und gebucht ist nichts, bis ihr bestätigt.",
    "Self-service": "Selbstbedienung",
    "Staffed bar": "Bar mit Crew",
    "bar": "Bar",
    "runner": "Runner",
    "on the card": "auf der Karte",
    "Tell us about the event.": "Erzählt uns vom Event.",
    "Occasion": "Anlass",
    "Guests": "Gäste",
    "Service": "Service",
    "Duration": "Dauer",
    "Drinks": "Drinks",
    "Menu": "Karte",
    "Workshop": "Workshop",
    "Music": "Musik",
    "Where": "Ort",
    "Extras": "Extras",
    "Date and venue": "Datum und Adresse",
    "Contact": "Kontakt",
    "Your quote": "Euer Angebot",
    "Step": "Schritt",
    "of": "von",
    "Continue": "Weiter",
    "Back": "Zurück",
    "See what it costs": "Was es kostet",
    "Send the request": "Anfrage senden",
    "Sent": "Gesendet",
    "What are we pouring for?": "Wofür schenken wir aus?",
    "How many people?": "Wie viele Leute?",
    "How should it be served?": "Wie soll ausgeschenkt werden?",
    "How long is the bar open?": "Wie lange ist die Bar offen?",
    "How much is on you?": "Wie viel geht auf euch?",
    "Build the card.": "Stellt die Karte zusammen.",
    "Want a cocktail workshop before the party?": "Lust auf einen Cocktailworkshop vor der Party?",
    "Sound?": "Sound?",
    "Indoor or outdoor?": "Drinnen oder draußen?",
    "Anything else?": "Noch etwas?",
    "When and where exactly?": "Wann und wo genau?",
    "Who do we write back to?": "An wen schreiben wir zurück?",
    "Here is what it comes to.": "Das kommt dabei heraus.",
    "Pick the closest one. It only shapes our suggestions, nothing is locked.": "Nehmt das, was am ehesten passt. Es prägt nur unsere Vorschläge, festgelegt ist nichts.",
    "A rough number is fine. You can change it later.": "Eine ungefähre Zahl reicht. Ihr könnt sie später ändern.",
    "Both roll in on castors. The difference is who pours.": "Beides rollt auf Rollen an. Der Unterschied ist, wer ausschenkt.",
    "Service hours only. We arrive two hours early and clear within one hour.": "Nur die Ausschankzeit. Wir sind zwei Stunden vorher da und bauen innerhalb einer Stunde ab.",
    "Every cocktail is made from a CORC base. Pick three to five.": "Jeder Cocktail entsteht aus einer CORC Base. Wählt drei bis fünf.",
    "Every cocktail is made from a CORC base. Pick two to five, one dispenser each.": "Jeder Cocktail entsteht aus einer CORC Base. Wählt zwei bis fünf, pro Sorte ein Spender.",
    "Forty five minutes, hands on, before guests arrive or as the opening act. Your people shake their own, then the bar takes over.": "Fünfundvierzig Minuten zum Mitmachen, vor dem Eintreffen der Gäste oder als Auftakt. Eure Leute shaken selbst, danach übernimmt die Bar.",
    "The bar runs fine without it. These are the two ways to add it.": "Die Bar läuft auch ohne. Das sind die zwei Wege, Sound dazuzunehmen.",
    "Outdoors we bring a canopy for the bar and for the booth. We only need to know about power.": "Draußen bringen wir ein Zelt für die Bar und für die Booth mit. Wir müssen nur wissen, wie es mit Strom aussieht.",
    "All optional. Pick as many as you like, or none.": "Alles optional. Nehmt so viel oder so wenig ihr wollt.",
    "If the date is not fixed yet, leave it open and tell us in the message.": "Wenn das Datum noch nicht fest steht, lasst es offen und schreibt es uns in die Nachricht.",
    "We answer within one working day with a fixed quote. Nothing is booked until you confirm it.": "Wir antworten innerhalb eines Werktags mit einem festen Angebot. Gebucht ist nichts, bis ihr bestätigt.",
    "An estimate from the choices you made. We confirm it as a fixed quote within one working day, and nothing is booked until you say so.": "Eine Schätzung aus euren Angaben. Innerhalb eines Werktags bestätigen wir sie als festes Angebot, und gebucht ist nichts, bis ihr es sagt.",
    "Company event": "Firmenevent",
    "Summer party, year end, client evening, team offsite": "Sommerfest, Jahresabschluss, Kundenabend, Team Offsite",
    "Private celebration": "Private Feier",
    "Birthday, anniversary, house party": "Geburtstag, Jubiläum, Houseparty",
    "Wedding": "Hochzeit",
    "Reception and evening": "Empfang und Abend",
    "Conference and trade fair": "Konferenz und Messe",
    "Booth, networking hour, side event": "Stand, Networking Stunde, Side Event",
    "Special event": "Special Event",
    "Launch, opening, shoot, showroom, press night": "Launch, Eröffnung, Shoot, Showroom, Pressabend",
    "Bartender behind a bar": "Barkeeper hinter der Bar",
    "Our bar rolls in, our crew mixes to order. The full card, alcohol free included.": "Unsere Bar rollt an, unsere Crew mixt auf Zuruf. Die ganze Karte, alkoholfrei inklusive.",
    "Self-service station": "Selbstbedienungsstation",
    "A steel table with dispensers. Pre-mixed cocktails, your guests pour their own.": "Ein Edelstahltisch mit Spendern. Vorgemixte Cocktails, eure Gäste schenken selbst aus.",
    "Self-service is for up to 60 guests. Above that a bartender pours.": "Selbstbedienung geht bis 60 Gäste. Darüber schenkt ein Barkeeper aus.",
    "Self-service suits up to 60 guests. One of our hosts stays at the station to keep it stocked and to check ages.": "Selbstbedienung passt bis 60 Gäste. Eine Person von uns bleibt an der Station, füllt nach und kontrolliert das Alter.",
    "One bartender serves up to 60 guests comfortably.": "Ein Barkeeper bedient bis zu 60 Gäste entspannt.",
    "At": "Bei",
    "we bring": "bringen wir",
    "bartender": "Barkeeper",
    "bartenders": "Barkeeper",
    "and a runner": "und einen Runner",
    "Above 180 guests, write it in the last step and we will plan a second bar with you.": "Über 180 Gäste schreibt es im letzten Schritt dazu, dann planen wir mit euch eine zweite Bar.",
    "3 hours": "3 Stunden",
    "4 hours": "4 Stunden",
    "5 hours": "5 Stunden",
    "6 hours or more": "6 Stunden oder mehr",
    "Reception, after work, conference hour": "Empfang, After Work, Konferenzstunde",
    "The usual evening": "Der normale Abend",
    "Dinner plus party": "Dinner und Party",
    "Tell us in the last step": "Sagt es uns im letzten Schritt",
    "Apéro": "Apéro",
    "Reception, conference hour, short evening": "Empfang, Konferenzstunde, kurzer Abend",
    "Evening": "Abend",
    "The standard party": "Die normale Party",
    "Late": "Late",
    "Dinner and dancing": "Dinner und Tanzen",
    "Cash bar": "Cash Bar",
    "No allowance, guests pay per drink": "Kein Kontingent, Gäste zahlen pro Drink",
    "per guest": "pro Gast",
    "about": "ca.",
    "cocktails": "Cocktails",
    "guests": "Gäste",
    "guests.": "Gäste.",
    "For": "Für",
    "Set the number myself": "Zahl selbst festlegen",
    "Total cocktails for the night.": "Cocktails insgesamt für den Abend.",
    "Your line on unused drinks goes here.": "Euer Satz zu nicht getrunkenen Drinks steht hier.",
    "Fresh · Herbal · Bright": "Frisch · Kräutrig · Klar",
    "Gin, basil, lemon, lime, orange": "Gin, Basilikum, Zitrone, Limette, Orange",
    "Juicy · Rounded · Lively": "Saftig · Rund · Lebendig",
    "Pink gin, strawberry, mint, lemon, lime, orange": "Pink Gin, Erdbeere, Minze, Zitrone, Limette, Orange",
    "Tropical · Vibrant · Smooth": "Tropisch · Lebhaft · Weich",
    "Tequila, passion fruit, strawberry, lemon, lime": "Tequila, Maracuja, Erdbeere, Zitrone, Limette",
    "Deep · Spiced · Velvety": "Tief · Würzig · Samtig",
    "Gin, raspberry, cinnamon, lemon, orange": "Gin, Himbeere, Zimt, Zitrone, Orange",
    "Exotic · Zesty · Crisp": "Exotisch · Spritzig · Klar",
    "Vodka, mate tea, yuzu, lemon, orange, ginger": "Wodka, Mate Tee, Yuzu, Zitrone, Orange, Ingwer",
    "Bitter · Citrus · Light": "Bitter · Zitrus · Leicht",
    "Aperol, prosecco, soda": "Aperol, Prosecco, Soda",
    "Sweet · Sharp · Bright": "Süß · Herb · Klar",
    "Limoncello, prosecco, soda": "Limoncello, Prosecco, Soda",
    "Aperitifs": "Aperitifs",
    "Aperol Spritz and Limoncello Spritz, poured at the bar": "Aperol Spritz und Limoncello Spritz, an der Bar ausgeschenkt",
    "Beer": "Bier",
    "Bottled beer at the bar, 0.5 l": "Flaschenbier an der Bar, 0,5 l",
    "Alcohol free": "Alkoholfrei",
    "Every base also works with tonic, soda or mate tea as a mocktail": "Jede Base funktioniert auch mit Tonic, Soda oder Mate Tee als Mocktail",
    "Guests pay per bottle.": "Gäste zahlen pro Flasche.",
    "Beer is priced like the cocktails, straight at the bar.": "Bier wird wie die Cocktails direkt an der Bar bezahlt.",
    "Beer is billed separately.": "Bier wird separat abgerechnet.",
    "It sits outside your cocktail allowance and goes in blocks of twenty bottles, quoted before the event. Every unopened bottle is credited back.": "Es liegt außerhalb eures Cocktail Kontingents und läuft in Blöcken zu zwanzig Flaschen, vorab angeboten. Jede ungeöffnete Flasche wird gutgeschrieben.",
    "aperitifs": "Aperitifs",
    "beer": "Bier",
    "MENU": "KARTE",
    "Yes, add a workshop": "Ja, Workshop dazu",
    "Before guests arrive, or as the opening act": "Vor dem Eintreffen der Gäste oder als Auftakt",
    "No, straight to the bar": "Nein, direkt an die Bar",
    "How many people take part? Up to twenty.": "Wie viele machen mit? Bis zwanzig.",
    "Workshop for": "Workshop für",
    "No workshop": "Kein Workshop",
    "No music from us": "Keine Musik von uns",
    "You handle sound": "Ihr kümmert euch um den Sound",
    "Speakers and playlist": "Boxen und Playlist",
    "A pair of speakers beside the bar, your genres all night": "Zwei Boxen neben der Bar, eure Genres den ganzen Abend",
    "DJ booth and resident DJ": "DJ Booth und Resident DJ",
    "Live house and techno, the sound Berlin is known for": "House und Techno live, der Sound für den Berlin bekannt ist",
    "How the night runs.": "So läuft der Abend.",
    "The resident plays up to three hours of house and techno. Around the set, the playlist runs in the genres you pick.": "Der Resident spielt bis zu drei Stunden House und Techno. Drumherum läuft die Playlist in den Genres, die ihr wählt.",
    "What should the playlist sound like? Pick up to three.": "Wie soll die Playlist klingen? Wählt bis zu drei.",
    "Disco": "Disco",
    "House": "House",
    "Mediterranean": "Mediterran",
    "Afro and Latin": "Afro und Latin",
    "Pop classics": "Pop Klassiker",
    "R&B and hip-hop": "R&B und Hip Hop",
    "Need another live sound?": "Braucht ihr einen anderen Live Sound?",
    "What would you want live?": "Was hättet ihr gern live?",
    "Soul and funk, Spanish, a live sax": "Soul und Funk, Spanisch, ein Live Saxofon",
    "We come back within one working day with a name, a price and an honest yes or no.": "Wir melden uns innerhalb eines Werktags mit einem Namen, einem Preis und einem ehrlichen Ja oder Nein.",
    "Anything we should keep off the floor?": "Gibt es etwas, das nicht laufen soll?",
    "One line is enough. A song with history, a track the room will not forgive.": "Eine Zeile reicht. Ein Song mit Geschichte, ein Track, den der Raum nicht verzeiht.",
    "Indoor": "Drinnen",
    "Venue, office, hall, apartment": "Location, Büro, Halle, Wohnung",
    "Outdoor": "Draußen",
    "Garden, terrace, courtyard, rooftop": "Garten, Terrasse, Hof, Dach",
    "Power on site?": "Strom vor Ort?",
    "Yes": "Ja",
    "No": "Nein",
    "Not sure": "Unsicher",
    "A canopy over the bar and over the DJ booth comes with every outdoor booking. You do not have to ask for it.": "Ein Zelt über der Bar und über der DJ Booth gehört zu jeder Outdoor Buchung. Ihr müsst nicht danach fragen.",
    "Videographer": "Videograf",
    "A short film of the night, delivered within a week": "Ein kurzer Film vom Abend, innerhalb einer Woche",
    "Extra drinks": "Zusätzliche Drinks",
    "Blocks of 25 beyond the package": "25er Blöcke über das Paket hinaus",
    "Late hour": "Verlängerung",
    "Each hour past the booked time": "Jede Stunde über die gebuchte Zeit hinaus",
    "None": "Keine",
    "Date": "Datum",
    "Bar opens": "Bar öffnet",
    "We can get in from": "Wir können rein ab",
    "Venue or address": "Location oder Adresse",
    "Name, street, floor": "Name, Straße, Etage",
    "Date open": "Datum offen",
    "The earliest date we can take is": "Das früheste Datum, das wir nehmen können, ist der",
    "We need a week to order, prep and staff the bar.": "Wir brauchen eine Woche zum Bestellen, Vorbereiten und Besetzen der Bar.",
    "We need to be inside two hours before the bar opens, so": "Wir müssen zwei Stunden vor Öffnung der Bar drin sein, also",
    "at the latest. Setup does not count against your bar time.": "spätestens. Der Aufbau zählt nicht zu eurer Barzeit.",
    "Name": "Name",
    "Company": "Firma",
    "Optional": "Optional",
    "Email": "E-Mail",
    "Phone": "Telefon",
    "Anything else we should know": "Gibt es sonst etwas, das wir wissen sollten",
    "Your details": "Eure Daten",
    "Estimate, net": "Schätzung, netto",
    "What you pay, net": "Was ihr zahlt, netto",
    "incl. VAT": "inkl. MwSt.",
    "Your guests pay for their own drinks, from": "Eure Gäste zahlen ihre Drinks selbst, von",
    "to": "bis",
    "a glass.": "pro Glas.",
    "quoted separately": "separat angeboten",
    "On request": "Auf Anfrage",
    "from": "ab",
    "net": "netto",
    "More than one bar": "Mehr als eine Bar",
    "We quote this one by hand": "Das rechnen wir von Hand",
    "cocktails is past what a single two metre counter can pour in an evening. For this we plan a second bar station with its own crew, so the queue never becomes the evening. Send the request and we come back with a number.": "Cocktails sind mehr, als ein einzelner Zwei Meter Tresen an einem Abend ausschenken kann. Dafür planen wir eine zweite Bar Station mit eigener Crew, damit die Schlange nicht zum Abend wird. Schickt die Anfrage und wir melden uns mit einer Zahl.",
    "The band covers the small things we only know once we see the room.": "Die Spanne deckt die Kleinigkeiten ab, die wir erst kennen, wenn wir den Raum gesehen haben.",
    "This estimate holds for fourteen days.": "Diese Schätzung gilt vierzehn Tage.",
    "and the full summary plus our rate card lands in your inbox within a minute.": "und die vollständige Übersicht samt Preisliste liegt innerhalb einer Minute in eurem Postfach.",
    "Package": "Paket",
    "bar time": "Barzeit",
    "spirits and liqueurs included": "Spirituosen und Liköre inklusive",
    "Extra bar time": "Zusätzliche Barzeit",
    "Everything stays open, the crew stays on": "Alles bleibt offen, die Crew bleibt da",
    "Dispensers, ice, garnish, glassware and the drinks, up to 40 guests": "Spender, Eis, Garnitur, Gläser und die Drinks, bis 40 Gäste",
    "Cash bar setup": "Cash Bar Aufbau",
    "Bar, crew and kit. Your guests pay per drink.": "Bar, Crew und Equipment. Eure Gäste zahlen pro Drink.",
    "Minimum bar turnover": "Mindestumsatz an der Bar",
    "If the bar takes less than that, we invoice the difference.": "Nimmt die Bar weniger ein, stellen wir die Differenz in Rechnung.",
    "DJ and sound system": "DJ und Soundsystem",
    "Booth, speakers and our resident": "Booth, Boxen und unser Resident",
    "more hour": "weitere Stunde",
    "more hours": "weitere Stunden",
    "Cocktail workshop": "Cocktailworkshop",
    "people, forty five minutes": "Personen, fünfundvierzig Minuten",
    "Event video": "Eventvideo",
    "A short film of the night, within a week": "Ein kurzer Film vom Abend, innerhalb einer Woche",
    "Extra drinks, one block of 25": "Zusätzliche Drinks, ein Block à 25",
    "Each further block at the same rate": "Jeder weitere Block zum selben Satz",
    "One hour past the booked time": "Eine Stunde über die gebuchte Zeit hinaus",
    "Guests pay": "Gäste zahlen",
    "a bottle at the bar": "pro Flasche an der Bar",
    "Billed separately in blocks of twenty, quoted before the event. Unopened bottles are credited back.": "Wird separat in Zwanzigerblöcken abgerechnet, vorab angeboten. Ungeöffnete Flaschen werden gutgeschrieben.",
    "Included": "Inklusive",
    "Not included": "Nicht inklusive",
    "Space we need": "Platz den wir brauchen",
    "Outdoors": "Draußen",
    "Setup time": "Auf und Abbau",
    "Payment": "Zahlung",
    "Cancellation": "Stornierung",
    "Bar counter, bartenders, glassware, ice, spirits and liqueurs, CORC premixes, fresh garnishes, setup and teardown.": "Bartresen, Barkeeper, Gläser, Eis, Spirituosen und Liköre, CORC Premixe, frische Garnituren, Auf und Abbau.",
    "The station, glass dispensers, ice, garnish, glassware, the CORC premixes, a host at the table, setup and teardown.": "Die Station, Glasspender, Eis, Garnitur, Gläser, die CORC Premixe, eine Person von uns am Tisch, Auf und Abbau.",
    "This estimate does not cover the venue&rsquo;s own permit or its music licensing obligations.": "Nicht abgedeckt sind die Genehmigung der Location und ihre Pflichten bei der Musiklizenzierung.",
    "Beer is quoted separately, in blocks of twenty bottles.": "Bier wird separat angeboten, in Blöcken zu zwanzig Flaschen.",
    "Roughly 2 &times; 1.5 m, one power socket, access to water, a doorway wide enough for the counter. The counter is 2 m wide and runs two queues.": "Etwa 2 &times; 1,5 m, eine Steckdose, Zugang zu Wasser, eine Tür breit genug für den Tresen. Der Tresen ist 2 m breit und bedient zwei Schlangen.",
    "Roughly 3 &times; 1 m for the station, one power socket and a doorway wide enough for a 2.8 m table on castors.": "Etwa 3 &times; 1 m für die Station, eine Steckdose und eine Tür breit genug für einen 2,8 m Tisch auf Rollen.",
    "At this size we also need a prep table nearby.": "In dieser Größe brauchen wir zusätzlich einen Vorbereitungstisch in der Nähe.",
    "A canopy over the bar comes with the booking.": "Ein Zelt über der Bar gehört zur Buchung.",
    "A canopy over the bar and over the DJ booth comes with the booking.": "Ein Zelt über der Bar und über der DJ Booth gehört zur Buchung.",
    "Power on site is not confirmed, so we will come back to you about a generator.": "Strom vor Ort ist nicht bestätigt, deshalb melden wir uns wegen eines Generators.",
    "We are in two hours before the bar opens and clear within one hour after. It does not count against your bar time.": "Wir sind zwei Stunden vor Öffnung der Bar da und innerhalb einer Stunde danach wieder raus. Das zählt nicht zu eurer Barzeit.",
    "50 % deposit on confirmation, the balance after the event. Business clients receive an invoice with VAT listed separately.": "50 % Anzahlung bei Bestätigung, der Rest nach dem Event. Geschäftskunden erhalten eine Rechnung mit ausgewiesener MwSt.",
    "Free up to 21 days before. 50 % between 21 and 7 days. Full price within the final 7 days.": "Kostenlos bis 21 Tage vorher. 50 % zwischen 21 und 7 Tagen. Voller Preis in den letzten 7 Tagen.",

    "up to four hours": "bis vier Stunden",
    "The drinks are in that price.": "Die Getränke sind da drin.",
    "Every price here is net. VAT comes on top.": "Alle Preise hier sind netto. Die MwSt. kommt obendrauf.",
    "Past four hundred cocktails we run a second bar, and we quote that one by hand.": "Ab vierhundert Cocktails stellen wir eine zweite Bar, und die kalkulieren wir von Hand.",
    "bar service for": "Barservice für",
    "over": "über",
    "Booth, speakers and the resident for": "Booth, Boxen und unser Resident für",
    "Each further hour": "Jede weitere Stunde",
    "Your": "Eure",
    "Up to": "Bis",
    "people": "Personen",
    "Each further person": "Jede weitere Person"
  };
  function tr(k) { return (LANG === 'de' && DE[k]) ? DE[k] : k; }
  function loc() { return LANG === 'de' ? 'de-DE' : 'en-GB'; }


  /* ===================== what it costs ===================== */
  // Net euros, straight off the CORC rate card.
  var RATE = {
    tiers: [
      { id:'S',  max:100, net:1000, hour:150, block:250, time:4 },
      { id:'M',  max:180, net:1400, hour:200, block:200, time:4 },
      { id:'L',  max:280, net:1950, hour:250, block:175, time:4 },
      { id:'XL', max:400, net:2500, hour:300, block:160, time:5 }
    ],
    self:600, selfTime:4, cashSetup:300, cashHour:150,
    speakers:300, dj:900, djTime:4, djHour:150,
    workshop:800, workshopBase:10, workshopHead:60, video:350, vat:0.19
  };
  function eur(v) { return v.toLocaleString(loc()) + ' €'; }
  function round50(v) { return Math.round(v / 50) * 50; }

  // Each step can price its own decision, so nothing is a surprise at the end.
  // These read the same rate card quote() does; they never add up a running total.
  function hoursOf() { return parseInt(S.duration, 10) || 0; }
  function tierOf(d) { for (var i = 0; i < RATE.tiers.length; i++) if (d <= RATE.tiers[i].max) return RATE.tiers[i]; return null; }
  function perOf(id) { for (var i = 0; i < PACKS.length; i++) if (PACKS[i].id === id) return PACKS[i].per; return 0; }
  function drinksPrice(d) {                       // bar service, net, for that many cocktails
    var t = tierOf(d); if (!t) return null;
    var h = hoursOf();
    return t.net + (h > t.time ? (h - t.time) * t.hour : 0);
  }
  function djPrice() { return RATE.dj + RATE.djHour * Math.max(0, (hoursOf() || RATE.djTime) - RATE.djTime); }
  // the base covers a table of ten; past that each pair of hands costs the same again
  function workshopPrice() { return RATE.workshop + RATE.workshopHead * Math.max(0, S.workshopPeople - RATE.workshopBase); }
  function blockPrice() { var t = tierOf(totalDrinks()); return t ? t.block : 250; }
  function hourPrice() { var t = tierOf(totalDrinks()); return t ? t.hour : RATE.cashHour; }

  // writes, updates or clears the price in a card's corner
  function priceTag(node, text, label) {
    var t = node.querySelector('.cf-eur');
    if (!text) { if (t) node.removeChild(t); node.classList.remove('hasEur'); return; }
    if (!t) { t = el('<span class="cf-eur"></span>'); node.appendChild(t); }
    if (label === undefined) label = 'net';
    t.innerHTML = esc(text) + (label ? '<em>' + esc(tr(label)) + '</em>' : '');
    node.classList.add('hasEur');
  }

  function quote() {
    var q = { lines:[], net:0, over:false, notes:[] };
    function add(label, net, sub, soft) { q.lines.push({ label:label, net:net, sub:sub, soft:soft }); q.net += net || 0; }
    var hours = parseInt(S.duration, 10) || 4, self = S.service === 'self', tier = null;

    if (self) {
      add(tr('Self-service station') + ', ' + hours + ' h', RATE.self,
          tr('Dispensers, ice, garnish, glassware and the drinks, up to 40 guests'));
    } else if (S.pack === 'cash') {
      add(tr('Cash bar setup') + ', ' + hours + ' h', RATE.cashSetup, tr('Bar, crew and kit. Your guests pay per drink.'));
      q.notes.push(tr('Minimum bar turnover') + ' ' + eur(hours >= 6 ? 600 : 450) + '. ' +
                   tr('If the bar takes less than that, we invoice the difference.'));
    } else {
      var d = totalDrinks();
      for (var i = 0; i < RATE.tiers.length; i++) if (d <= RATE.tiers[i].max) { tier = RATE.tiers[i]; break; }
      if (!tier) { q.over = true; return q; }
      add(tr('Package') + ' ' + tier.id + ' · ' + d + ' ' + tr('cocktails'), tier.net,
          S.guests + ' ' + tr('guests') + ', ' + tier.time + ' h ' + tr('bar time') + ', ' + crewOf() + ' ' +
          tr(crewOf() > 1 ? 'bartenders' : 'bartender') + (runnersOf() ? ' ' + tr('and a runner') : '') +
          ', ' + tr('spirits and liqueurs included'));
      if (hours > tier.time)
        add(tr('Extra bar time') + ', ' + (hours - tier.time) + ' h', tier.hour * (hours - tier.time),
            tr('Everything stays open, the crew stays on'));
    }

    if (S.music === 'speakers')
      add(tr('Speakers and playlist'), RATE.speakers, tr('A pair of speakers beside the bar, your genres all night'));
    if (S.music === 'dj') {
      var extraDj = Math.max(0, hours - RATE.djTime);
      add(tr('DJ and sound system') + ', ' + RATE.djTime + ' h', RATE.dj, tr('Booth, speakers and our resident'));
      if (extraDj) add('DJ, ' + extraDj + ' ' + tr(extraDj > 1 ? 'more hours' : 'more hour'), RATE.djHour * extraDj);
    }
    if (S.workshop === 'yes') add(tr('Cocktail workshop'), workshopPrice(), S.workshopPeople + ' ' + tr('people, forty five minutes'));
    if (S.extras.indexOf('video') > -1) add(tr('Event video'), RATE.video, tr('A short film of the night, within a week'));
    if (S.extras.indexOf('drinks') > -1)
      add(tr('Extra drinks, one block of 25'), (tier ? tier.block : 250), tr('Each further block at the same rate'));
    if (S.extras.indexOf('late') > -1)
      add(tr('Late hour'), (tier ? tier.hour : RATE.cashHour), tr('One hour past the booked time'));

    if (S.beers) q.lines.push({ label:tr('Beer'), net:null, soft:true,
      sub: S.pack === 'cash' ? tr('Guests pay') + ' ' + eur(PRICE.beer) + ' ' + tr('a bottle at the bar')
                             : tr('Billed separately in blocks of twenty, quoted before the event. Unopened bottles are credited back.') });

    q.low = round50(q.net * 0.95); q.high = round50(q.net * 1.05);
    return q;
  }

  // the practical part, filtered to what this evening actually involves
  function facts() {
    var hours = parseInt(S.duration, 10) || 4, self = S.service === 'self', f = [];
    f.push(['Included', tr(self
      ? 'The station, glass dispensers, ice, garnish, glassware, the CORC premixes, a host at the table, setup and teardown.'
      : 'Bar counter, bartenders, glassware, ice, spirits and liqueurs, CORC premixes, fresh garnishes, setup and teardown.')]);
    var not = tr('This estimate does not cover the venue&rsquo;s own permit or its music licensing obligations.');
    if (S.beers) not += ' ' + tr('Beer is quoted separately, in blocks of twenty bottles.');
    f.push(['Not included', not]);
    f.push(['Space we need', tr(self
      ? 'Roughly 3 &times; 1 m for the station, one power socket and a doorway wide enough for a 2.8 m table on castors.'
      : 'Roughly 2 &times; 1.5 m, one power socket, access to water, a doorway wide enough for the counter. The counter is 2 m wide and runs two queues.')
        + (!self && totalDrinks() > 280 ? ' ' + tr('At this size we also need a prep table nearby.') : '')]);
    if (S.where === 'outdoor')
      f.push(['Outdoors', tr(S.music === 'dj' ? 'A canopy over the bar and over the DJ booth comes with the booking.'
                                              : 'A canopy over the bar comes with the booking.')
        + (S.power && S.power !== 'Yes' ? ' ' + tr('Power on site is not confirmed, so we will come back to you about a generator.') : '')]);
    f.push(['Setup time', tr('We are in two hours before the bar opens and clear within one hour after. It does not count against your bar time.')]);
    f.push(['Payment', tr('50 % deposit on confirmation, the balance after the event. Business clients receive an invoice with VAT listed separately.')]);
    f.push(['Cancellation', tr('Free up to 21 days before. 50 % between 21 and 7 days. Full price within the final 7 days.')]);
    return f;
  }

  /* ===================== panel ===================== */
  var elSteps = document.getElementById('steps'), elRail = document.getElementById('rail'),
      elCrumbs = document.getElementById('crumbs'), elSend = document.getElementById('send'),
      elTag2 = document.getElementById('octag'),
      elTag = document.getElementById('stagetag');

  function paintRail() {
    elRail.innerHTML = STEPS.map(function (s, i) {
      return '<span class="' + (i < idx ? 'on' : i === idx ? 'now' : '') + '"></span>';
    }).join('');
  }
  function paintBar() {
    var bits = [];
    if (S.occasion) bits.push(pick(OCCASIONS, S.occasion));
    bits.push(S.guests + ' ' + tr('guests'));
    if (S.duration) bits.push(S.duration + ' h');
    if (S.service) bits.push(tr(S.service === 'self' ? 'Self-service' : 'Staffed bar'));
    if (S.service === 'bar') bits.push('1 ' + tr('bar') + ', ' + crewOf() + ' ' + tr(crewOf()>1?'bartenders':'bartender') + (runnersOf()?' + ' + tr('runner'):''));
    if (S.pack === 'cash') bits.push(tr('Cash bar'));
    else if (S.pack || S.customDrinks) bits.push(totalDrinks() + ' ' + tr('cocktails'));
    if (S.menu.length) bits.push(S.menu.length + ' ' + tr('on the card'));
    if (S.workshop === 'yes') bits.push(tr('Workshop'));
    if (S.music && S.music !== 'none') bits.push(pick(MUSIC, S.music));
    if (S.where) bits.push(pick(WHERE, S.where));
    if (S.extras.indexOf('video') > -1) bits.push(tr('Videographer'));
    elCrumbs.innerHTML = bits.length ? '<b>' + esc(bits[0]) + '</b>' + bits.slice(1).map(function (b) { return ' · ' + esc(b); }).join('') : tr('Tell us about the event.');
    if (!sent) elSend.textContent = tr('Send the request');
    elSend.disabled = sent || !(S.name && S.email && idx === STEPS.length - 1);
    elTag.textContent = tr(STEPS[idx].label);
    paintTag();
  }
  function paint() {
    if (S.guests > 60 && S.service === 'self') S.service = 'bar';
    elSteps.innerHTML = '';
    for (var i = 0; i < idx; i++) (function (i) {
      var b = el('<button class="cf-done" type="button"><span class="cf-lbl">' + esc(tr(STEPS[i].label)) + '</span><span class="cf-val">' + esc(STEPS[i].sum()) + '</span></button>');
      b.addEventListener('click', function () { idx = i; paint(); pushScene(); });
      elSteps.appendChild(b);
    })(i);
    var s = STEPS[idx];
    var m = el('<div class="cf-step"><div class="cf-eyebrow">' + tr('Step') + ' ' + (idx+1) + ' ' + tr('of') + ' ' + STEPS.length + '</div><h2>' +
                esc(tr(s.title)) + '</h2><p class="cf-sub">' + esc(tr(typeof s.sub === 'function' ? s.sub() : s.sub)) + '</p></div>');
    elSteps.appendChild(m);
    s.body(m);
    if (idx > 0) {
      var back = el('<button class="cf-btn cf-ghost" type="button" style="margin-top:14px;margin-left:10px">' + tr('Back') + '</button>');
      back.addEventListener('click', function () { idx--; paint(); pushScene(); });
      m.appendChild(back);
    }
    paintRail(); paintBar();
    elSteps.scrollTop = Math.max(0, m.offsetTop - 8);
  }
  function next() {
    if (idx < STEPS.length - 1) idx++;
    reached = Math.max(reached, idx);
    paint(); pushScene();
  }
  // the sign only lights once there is an occasion to put on it
  function paintTag() {
    if (!S.occasion) { elTag2.innerHTML = ''; elTag2.dataset.v = ''; return; }
    var name = pick(OCCASIONS, S.occasion);
    if (elTag2.dataset.v === name) return;
    elTag2.dataset.v = name;
    elTag2.innerHTML = '<span class="cf-frame"><b>' + esc(name) + '</b></span>';
    var f = elTag2.querySelector('.cf-frame'), r = f.getBoundingClientRect(), h = '', x, y;
    for (x = 9; x < r.width - 4; x += 13) h += '<i style="left:' + x + 'px;top:-1.75px"></i><i style="left:' + x + 'px;bottom:-1.75px"></i>';
    for (y = 9; y < r.height - 4; y += 13) h += '<i style="top:' + y + 'px;left:-1.75px"></i><i style="top:' + y + 'px;right:-1.75px"></i>';
    f.insertAdjacentHTML('beforeend', h);
  }

  elSend.addEventListener('click', function () {
    sent = true;
    elSend.textContent = tr('Sent');
    elSend.disabled = true;
  });

  function measure() {
    var p = document.getElementById('probe'), K = 1000, L0 = layout();
    if (!ITEMS.length) { LEN = []; p.innerHTML = ''; return; }
    p.innerHTML = ITEMS.map(function (it, i) {
      return '<text id="pn' + i + '" font-family="Archivo Variable" font-size="' + (L0.name*K) + '" font-weight="400" letter-spacing="' + (L0.name*L0.nameTR*K) + '">' +
             esc(tr(it.name).toUpperCase()) + '</text>';
    }).join('');
    LEN = ITEMS.map(function (it, i) { return document.getElementById('pn' + i).getComputedTextLength() / K; });
    p.innerHTML = '';
  }

  (document.fonts ? document.fonts.ready : Promise.resolve()).then(function () {
    syncMenu(false); paint(); go({}, SHOT.plot);
  });
}
