const express = require('express');
const router = express.Router();
const {vistaAutos} = require('../controller/controller.js');

/* GET home page. */
router.get('/', vistaAutos);

module.exports = router;
