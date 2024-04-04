const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/weatherController');

/**
 * @swagger
 * /weather/province/{province}:
 *   get:
 *     summary: Get the latest weather data for a specific province
 *     parameters:
 *       - in: path
 *         name: province
 *         required: true
 *         schema:
 *           type: string
 *         description: The name of the province
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal server error
 */
router.get('/weather/province/:province', weatherController.getWeatherByProvince);

/**
 * @swagger
 * /weather/history:
 *   get:
 *     summary: Get historical weather data
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal server error
 */
router.get('/weather/history', weatherController.getHistoricalData);

module.exports = router;
