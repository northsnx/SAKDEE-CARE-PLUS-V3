const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Haversine formula
function calcDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI/180) * Math.cos(lat2 * Math.PI/180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)));
}

exports.getNearbyShops = async (req, res) => {
  try {
    const { lat, lon } = req.query;
    if (!lat || !lon) {
      return res.status(400).json({ message: "lat & lon are required" });
    }

    const shops = await prisma.laundryShop.findMany();

    const result = shops.map(shop => ({
      id: shop.laundryShop_id,
      name: shop.name,
      latitude: shop.latitude,
      longitude: shop.longitude,
      icon: shop.iconUrl || "https://cdn.example.com/default-logo.png", // เพิ่ม field icon ไว้โชว์บน map
      distance: calcDistance(lat, lon, shop.latitude, shop.longitude).toFixed(2)
    }));

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// GET /shops/:id
exports.getShopById = async (req, res) => {
  try {
    const shop = await prisma.laundryShop.findUnique({
      where: { laundryShop_id: parseInt(req.params.id) },
      include: { machines: true }
    });

    if (!shop) {
      return res.status(404).json({ message: "Shop not found" });
    }

    // นับเครื่องซักผ้าว่าง/ไม่ว่าง
    const totalMachines = shop.machines.length;
    const availableMachines = shop.machines.filter(m => m.status === "available").length;

    const result = {
      id: shop.laundryShop_id,
      name: shop.name,
      address: shop.address,
      distance: "2.0", // mock ไว้ก่อน ถ้าจะคำนวณจริงต้องส่ง lat/lon มาด้วย
      totalMachines,
      availableMachines,
      machines: shop.machines
    };

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// POST /shops
exports.createShop = async (req, res) => {
  try {
    const { name, address, latitude, longitude, iconUrl, machines } = req.body;

    if (!name || !latitude || !longitude) {
      return res.status(400).json({ message: "name, latitude, longitude are required" });
    }

    const shop = await prisma.laundryShop.create({
      data: {
        name,
        address,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        iconUrl: iconUrl || null,
        machines: {
          create: machines?.map(m => ({
            type: m.type,
            sizeKg: m.sizeKg,
            status: m.status || "available"
          })) || []
        }
      },
      include: { machines: true }
    });

    res.status(201).json({
      message: "Shop created successfully",
      data: shop
    });
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
