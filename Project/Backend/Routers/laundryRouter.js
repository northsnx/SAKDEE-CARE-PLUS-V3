const express = require("express");
const router = express.Router();
const { getNearbyShops, getShopById , createShop } = require("../Controllers/laundryControllers");


// list ร้านซักผ้า (ใกล้ user)
router.get("/shops/nearby", getNearbyShops);

// detail ร้านซักผ้า (กดเข้าไปที่ marker)
router.get("/shops/:id", getShopById);

// เพิ่มร้านซักผ้าใหม่
router.post("/shops", createShop);

module.exports = router;
