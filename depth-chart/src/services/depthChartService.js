/**
 * DepthChartService
 *
 * Manages in-memory depth chart state, seeded with the
 * 2022 Tampa Bay Buccaneers roster on startup.
 *
 * Internal shape:
 *   players:    { [number]: Player }   — registry of all known players
 *   depthChart: { [position]: number[] } — ordered jersey-number arrays per position
 */

const Player = require('../models/player');
const seedPlayers = require('../data/playerStore');
const seedDepthChart = require('../data/buccaneersDepthChart');

// ── Initialise in-memory stores from seed data ────────────────────────────────

// Build Player instances from the plain seed objects
const players = {};
for (const [key, p] of Object.entries(seedPlayers)) {
    players[key] = new Player(p.number, p.name, p.position);
}

// Deep-copy the seed depth chart so mutations don't affect the original
const depthChart = {};
for (const [position, roster] of Object.entries(seedDepthChart)) {
    depthChart[position] = [...roster];
}

// ── Helpers ───────────────────────────────────────────────────────────────────

/**
 * Resolve an array of jersey numbers to Player objects.
 * Numbers with no matching player entry are silently skipped.
 *
 * @param {number[]} numbers
 * @returns {Player[]}
 */
function resolvePlayers(numbers) {
    return numbers.map((n) => players[n]).filter(Boolean);
}

// ── Service functions ─────────────────────────────────────────────────────────

/**
 * Adds a player to the depth chart at a given position 
 * Adding a player without a position_depth would add them to the end of the depth chart at that position
 * The added player would get priority. Anyone below that player in the depth chart would get moved down a 
 * [positionDepth] 
 *
 * @param {string} position         - ie "QB"
 * @param {Player} player          - {layer entry
 * @param {number} [positionDepth]  - insertion index
 * @returns {Player[]} Updated depth chart for the position (resolved Player objects)
 */
function addPlayerToDepthChart(position, player, positionDepth) {

    // early exit
    if (!position || player == null) return [];

    const number = player.number;

    // use the player's own position field if provided, otherwise fall back to the depth chart position
    players[number] = new Player(number, player.name, player.position || position);

    if (!depthChart[position]) {
        depthChart[position] = [];
    }

    const roster = depthChart[position];

    // remove any existing entry for this player at this position to avoid duplicates
    // a player can appear on multiple position charts simultaneously (ie Wells at LT and RT)
    const existing = roster.indexOf(number);
    if (existing !== -1) roster.splice(existing, 1);

    // insert player at [depth]; negative depth falls through to push
    if (positionDepth != null && positionDepth >= 0 && positionDepth <= roster.length) {
        roster.splice(positionDepth, 0, number);
    } else {
        // if depth isn't provided, add player last
        roster.push(number);
    }

    return resolvePlayers(roster);
}

/**
 * Remove a player from a position.
 *
 * @param {string} position - ie "QB"
 * @param {Player} player   - Player entry
 * @returns {Player|null} The removed player object, or null if not found
 */
function removePlayerFromDepthChart(position, player) {
    if (!depthChart[position] || player == null) return null;

    const roster = depthChart[position];
    const index = roster.indexOf(player.number);

    if (index === -1) return null;

    roster.splice(index, 1);

    // note - we don't want to remove the player from the players registry 
    // as they might play multiple positions

    return players[player.number] || null;
}

/**
 * Print out the full depth chart with every position on the team and every player within the Depth Chart 
 *
 * @returns {Player[]}
 */
function getFullDepthChart() {
    const resolved = {};
    for (const [position, roster] of Object.entries(depthChart)) {
        resolved[position] = resolvePlayers(roster);
    }
    return resolved;
}

/**
 * For a given player and position, we want to see all players that are “Backups”, those with a lower position_depth
 * An empty list should be returned if the given player has no Backups
 * An empty list should be returned if the given player is not listed in the depth chart at that position
 *
 * @param {string} position - e.g. "QB"
 * @param {Player} player   - Player entry
 * @returns {Player[]} All players ranked below the given player, or [] if none / not found
 */
function getBackups(position, player) {

    // early exists - if nothing in the depth chart at that position return empty list
    if (position.isEmpty || player == null) return [];
    if (!depthChart[position]) return [];

    const roster = depthChart[position];
    const index = roster.indexOf(player.number);

    // if player is not listed at that position, return empty list
    if (index === -1) return [];

    // if player has no backups, no players will be found 
    return resolvePlayers(roster.slice(index + 1));
}

module.exports = {
    addPlayerToDepthChart,
    removePlayerFromDepthChart,
    getFullDepthChart,
    getBackups,
};
