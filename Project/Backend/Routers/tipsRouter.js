const express = require('express');
const multer = require("multer");
const router = express.Router();

const upload = multer({ dest: "uploads/" });
const auth = require("../middlewares/authMiddleware");

const { createTips, getAllTipe, getTipeId } = require('../Controllers/tipsControllers');


// POST method 
router.post('/tips', upload.single("image"), createTips); // done

// GET method 
router.get('/tips', getAllTipe); // done
router.get('/tips/:id', getTipeId); // done




module.exports = router; 