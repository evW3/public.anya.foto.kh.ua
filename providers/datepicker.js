const express = require('express');
const { DatepickerController } = require('../controllers/Datepicker');
const Token = require('../middleware/Token');

const router = express.Router();

router.post('/', DatepickerController.getBusy);

router.put('/', Token.verify, DatepickerController.setBusy);

router.delete('/', Token.verify, DatepickerController.deleteBusy);

module.exports = router;