const express = require('express');
const datepicker = require('./datepicker');
const gallery = require('./gallery');
const admin = require('./admin');
const router = express.Router();

router.get('/', (_, res) => res.status(200).json({ message: 'Welcome to API!' }));
router.use('/gallery', gallery);
router.use('/datepicker', datepicker);
router.use('/admin', admin);

module.exports = router;