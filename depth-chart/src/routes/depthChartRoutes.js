/**
 * Depth Chart Routes
 *
 * Wires URL patterns to controller methods.
 * No business logic lives here.
 */

const { Router } = require('express');
const controller = require('../controllers/depthChartController');

const router = Router();

// Get the full depth chart for every position
router.get('/', controller.getDepthChart);

// Add a player to a position
router.post('/:position', controller.addPlayer);

// Remove a player from a position
router.delete('/:position', controller.removePlayer);

// Get all backups for a player at a position
router.post('/:position/backups', controller.getBackups);

module.exports = router;
