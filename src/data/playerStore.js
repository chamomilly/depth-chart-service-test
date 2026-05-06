/**
 * playerStore.js
 *
 * In-memory player registry for the 2022 Tampa Bay Buccaneers.
 * Keyed by jersey number. Players with number 00 use a unique string key.
 *
 * Source: https://www.ourlads.com/nfldepthcharts/depthchart/TB (as of 02/02/2022)
 * 
 * Data set was processed and populated by Kiro
 */

const players = {
    // ── Offense ────────────────────────────────────────────────────────────────
    12: { number: 12, name: 'Brady, Tom', position: 'QB' },
    11: { number: 11, name: 'Gabbert, Blaine', position: 'QB' },
    2: { number: 2, name: 'Trask, Kyle', position: 'QB' },

    7: { number: 7, name: 'Fournette, Leonard', position: 'RB' },
    27: { number: 27, name: 'Jones II, Ronald', position: 'RB' },
    21: { number: 21, name: 'Vaughn, Ke\'Shawn', position: 'RB' },
    25: { number: 25, name: 'Bernard, Giovani', position: 'RB' },

    13: { number: 13, name: 'Evans, Mike', position: 'WR' },
    1: { number: 1, name: 'Darden, Jaelon', position: 'WR' },
    10: { number: 10, name: 'Miller, Scott', position: 'WR' },
    19: { number: 19, name: 'Borregales, Jose', position: 'WR' }, // jersey shared — Borregales is FUT/PK; slot 19 on LWR is Miller
    18: { number: 18, name: 'Johnson, Tyler', position: 'WR' },
    16: { number: 16, name: 'Perriman, Breshad', position: 'WR' },
    15: { number: 15, name: 'Grayson, Cyril', position: 'WR' },
    14: { number: 14, name: 'Godwin, Chris', position: 'WR' }, // IR

    80: { number: 80, name: 'Howard, OJ', position: 'TE' },
    84: { number: 84, name: 'Brate, Cameron', position: 'TE' },
    87: { number: 87, name: 'Gronkowski, Rob', position: 'TE' },

    76: { number: 76, name: 'Smith, Donovan', position: 'OL' },
    72: { number: 72, name: 'Wells, Josh', position: 'OL' },
    74: { number: 74, name: 'Marpet, Ali', position: 'OL' },
    60: { number: 60, name: 'Leverett, Nick', position: 'OL' },
    66: { number: 66, name: 'Jensen, Ryan', position: 'OL' },
    70: { number: 70, name: 'Hainsey, Robert', position: 'OL' },
    65: { number: 65, name: 'Cappa, Alex', position: 'OL' },
    64: { number: 64, name: 'Stinnie, Aaron', position: 'OL' },
    78: { number: 78, name: 'Wirfs, Tristan', position: 'OL' },

    // ── Defense ────────────────────────────────────────────────────────────────
    93: { number: 93, name: 'Suh, Ndamukong', position: 'DE' },
    96: { number: 96, name: 'McLendon, Steve', position: 'DT' },
    92: { number: 92, name: 'Gholston, William', position: 'DE' },
    50: { number: 50, name: 'Vea, Vita', position: 'NT' },
    56: { number: 56, name: 'Nunez-Roches, Rakeem', position: 'NT' },

    90: { number: 90, name: 'Pierre-Paul, Jason', position: 'OLB' },
    98: { number: 98, name: 'Nelson, Anthony', position: 'OLB' },
    58: { number: 58, name: 'Barrett, Shaquil', position: 'OLB' },
    9: { number: 9, name: 'Tryon, Joe', position: 'OLB' },
    49: { number: 49, name: 'Gill, Cam', position: 'OLB' },

    45: { number: 45, name: 'White, Devin', position: 'ILB' },
    51: { number: 51, name: 'Minter, Kevin', position: 'ILB' },
    54: { number: 54, name: 'David, Lavonte', position: 'ILB' },
    52: { number: 52, name: 'Britt, KJ', position: 'ILB' },
    48: { number: 48, name: 'Stuard, Grant', position: 'ILB' },

    24: { number: 24, name: 'Davis, Carlton', position: 'CB' },
    43: { number: 43, name: 'Cockrell, Ross', position: 'CB' },
    23: { number: 23, name: 'Murphy-Bunting, Sean', position: 'CB' },
    35: { number: 35, name: 'Dean, Jamel', position: 'CB' },
    30: { number: 30, name: 'Delaney, Dee', position: 'CB' },
    29: { number: 29, name: 'Desir, Pierre', position: 'CB' },

    31: { number: 31, name: 'Winfield Jr., Antoine', position: 'S' },
    32: { number: 32, name: 'Edwards, Mike', position: 'S' },
    33: { number: 33, name: 'Whitehead, Jordan', position: 'S' },
    26: { number: 26, name: 'Adams, Andrew', position: 'S' },

    // ── Special Teams ──────────────────────────────────────────────────────────
    8: { number: 8, name: 'Pinion, Bradley', position: 'P' },
    3: { number: 3, name: 'Succop, Ryan', position: 'K' },
    97: { number: 97, name: 'Triner, Zach', position: 'LS' },

    // ── Reserves / IR ─────────────────────────────────────────────────────────
    39: { number: 39, name: 'Riley, Curtis', position: 'S' },
    5: { number: 5, name: 'Sherman, Richard', position: 'CB' },
    61: { number: 61, name: 'Hutcherson, Sadarius', position: 'OL' },
    73: { number: 73, name: 'Stanley, Donell', position: 'OL' },
    79: { number: 79, name: "O'Connor, Patrick", position: 'TE' },
};

module.exports = players;
