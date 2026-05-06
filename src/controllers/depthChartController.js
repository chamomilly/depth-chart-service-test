/**
 * DepthChartController
 *
 * Handles HTTP request/response concerns and delegates
 * all business logic to DepthChartService.
 * 
 * NOTE: Kiro helped me setup this file and write the addPlayer function as I have limited backend experience
 * I wrote the rest of the functions leveraging what Kiro wrote
 * 
 */

const service = require('../services/depthChartService');

/**
 * POST /depthchart/:position
 *
 * Body: { number: number, name: string, position?: string, depth?: number }
 *
 * Adds a player to the depth chart at a given position.
 * If depth is omitted the player is appended to the end.
 * Everyone at or below the given depth shifts down by one.
 */
function addPlayer(req, res) {
    const { position } = req.params;
    const { number, name, position: playerPosition, depth } = req.body;

    if (number === undefined || !name) {
        return res.status(400).json({ error: 'number and name are required' });
    }

    const parsedNumber = parseInt(number, 10);
    if (isNaN(parsedNumber)) {
        return res.status(400).json({ error: 'number must be a valid integer' });
    }

    const parsedDepth = depth !== undefined ? parseInt(depth, 10) : undefined;

    const player = { number: parsedNumber, name, position: playerPosition || position };
    const updatedChart = service.addPlayerToDepthChart(position, player, parsedDepth);

    return res.status(201).json({ position, depthChart: updatedChart });
}

/**
 * DELETE /depthchart/:position
 *
 * Body: { number: number, name?: string }
 *
 * Removes a player from the depth chart for a given position.
 * Returns the removed player, or 404 if not found.
 */
function removePlayer(req, res) {
    const { position } = req.params;
    const { number, name } = req.body;

    if (number === undefined) {
        return res.status(400).json({ error: 'number is required' });
    }

    const parsedNumber = parseInt(number, 10);
    if (isNaN(parsedNumber)) {
        return res.status(400).json({ error: 'number must be a valid integer' });
    }

    const removed = service.removePlayerFromDepthChart(position, { number: parsedNumber, name });

    if (!removed) {
        return res.status(404).json({
            error: `Player #${parsedNumber} not found in position ${position}`,
        });
    }

    return res.status(200).json({ removed });
}

/**
 * GET /depthchart
 *
 * Returns the full depth chart for every position with resolved player objects.
 */
function getDepthChart(req, res) {
    const chart = service.getFullDepthChart();
    return res.status(200).json({ depthChart: chart });
}

/**
 * POST /depthchart/:position/backups
 *
 * Body: { number: number, name?: string }
 *
 * Returns all players ranked below the given player at the position.
 * Returns an empty list if the player has no backups or is not in the depth chart.
 */
function getBackups(req, res) {
    const { position } = req.params;
    const { number, name } = req.body;

    if (number === undefined) {
        return res.status(400).json({ error: 'number is required' });
    }

    const parsedNumber = parseInt(number, 10);
    if (isNaN(parsedNumber)) {
        return res.status(400).json({ error: 'number must be a valid integer' });
    }

    const backups = service.getBackups(position, { number: parsedNumber, name });
    return res.status(200).json({ position, player: { number: parsedNumber, name }, backups });
}

module.exports = {
    addPlayer,
    removePlayer,
    getDepthChart,
    getBackups,
};
