const express = require('express');
const router = express.Router();

const { moniterClimate } = require('../Controllers/climateControllers')
const auth = require("../middlewares/authMiddleware");


router.get('/climate', auth , moniterClimate);



module.exports = router; 