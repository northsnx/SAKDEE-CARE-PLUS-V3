const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.creatCare = async (req, res) => {
    try {

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "err:", error: err.message });
    }
}

