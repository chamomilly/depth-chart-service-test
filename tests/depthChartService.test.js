/**
 * Basic unit tests for depthChartService
 *
 * Note: The service is a singleton, so state persists between tests.
 * In a production setup, you'd refactor it to a class or add a reset() function.
 */

const service = require('../src/services/depthChartService');

describe('DepthChartService', () => {
    test('addPlayerToDepthChart adds a player to the end when depth is omitted', () => {
        const result = service.addPlayerToDepthChart(
            'TEST_POS',
            { number: 99, name: 'Test Player' }
        );

        expect(result).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ number: 99, name: 'Test Player' })
            ])
        );
    });

    test('getBackups returns players ranked below the given player', () => {
        // Add three players to a test position
        service.addPlayerToDepthChart('QB_TEST', { number: 1, name: 'Player One' }, 0);
        service.addPlayerToDepthChart('QB_TEST', { number: 2, name: 'Player Two' }, 1);
        service.addPlayerToDepthChart('QB_TEST', { number: 3, name: 'Player Three' }, 2);

        const backups = service.getBackups('QB_TEST', { number: 1 });

        expect(backups).toHaveLength(2);
        expect(backups[0].number).toBe(2);
        expect(backups[1].number).toBe(3);
    });
});
