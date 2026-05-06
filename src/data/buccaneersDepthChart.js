/**
 * buccaneersDepthChart.js
 *
 * Seed depth chart for the 2022 Tampa Bay Buccaneers.
 * Each key is a position; each value is an ordered array of jersey numbers
 * (index 0 = starter, ascending = backups).
 *
 * Source: https://www.ourlads.com/nfldepthcharts/depthchart/TB (as of 02/02/2022)
 * 
 * Data set was processed and populated by Kiro
 */

const depthChart = {
    // ── Offense ────────────────────────────────────────────────────────────────
    QB: [12, 11, 2],
    RB: [7, 27, 21, 25],
    LWR: [13, 1, 10],
    RWR: [18, 16, 15],

    LT: [76, 72],
    LG: [74, 60],
    C: [66, 70],
    RG: [65, 64],
    RT: [78, 72],

    TE: [87, 80, 84],   // Gronkowski listed as TE1 on the chart

    // ── Defense ────────────────────────────────────────────────────────────────
    LDE: [93, 96],
    NT: [50, 56],
    RDE: [92, 96],

    LOLB: [90, 98],
    LILB: [45, 51],
    RILB: [54, 52, 48],
    ROLB: [58, 9, 49],

    LCB: [24, 43],
    SS: [31, 32],
    FS: [33, 26],
    RCB: [23, 35, 30, 29],

    // ── Special Teams ──────────────────────────────────────────────────────────
    PT: [8],
    PK: [3],
    LS: [97],
    H: [8],
    KO: [8],
    PR: [1],
    KR: [1, 18],
};

module.exports = depthChart;
