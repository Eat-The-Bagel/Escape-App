const router = require('express').Router();
const characterRoutes = require('./characterRoutes.js');
const interactionRoutes = require('./interactionRoutes');
const locationRoutes = require('./locationRoutes');
const userRoutes = require('./user-routes');

router.use('/characters', characterRoutes);
router.use('/interactions', interactionRoutes);
router.use('/locations', locationRoutes);
router.use('/users', userRoutes);

module.exports = router;