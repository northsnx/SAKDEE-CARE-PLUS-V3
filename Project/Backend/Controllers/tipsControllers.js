const { PrismaClient } = require('@prisma/client');
const { connect } = require('../Routers/newRouter');
const { uploadImage } = require("../Service/uploadService");
const { image } = require('../utils/cloudinary');
const prisma = new PrismaClient();

exports.createTips = async (req, res) => {
    try {
        const { title, content } = req.body;
        let imageUrl = null;

        if (req.file) {
            imageUrl = await uploadImage(req.file);
        }
        const addTips = await prisma.tips.create({
            data: {
                title,
                content,
                images: imageUrl
                    ? {
                        create: [
                            {
                                url: imageUrl
                            }
                        ]
                    }
                    : undefined
            },
            include: { images: true }
        });
        res.status(200).json({ message: "creactTips Success", data: addTips });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "err:", error: err.message });
    }
}

exports.getAllTipe = async (req, res) => {
    try {
        const getAlltipe = await prisma.tips.findMany({
            include: { images: true }
        })
        res.status(200).json({ message: "getAll Tips Success", data: getAlltipe })
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "err:", error: err.message });
    }
}
exports.getTipeId = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const gettipByid = await prisma.tips.findUnique({
            where: { tips_id: id },
            include: { images: true }
        })
        res.status(200).json({ message: "getTips Id Success", data: gettipByid })
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "err:", error: err.message });
    }
}