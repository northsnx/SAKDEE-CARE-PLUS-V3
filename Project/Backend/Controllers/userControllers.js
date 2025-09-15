const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const nodemailer = require("nodemailer");

// creact category
exports.creactUser = async (req, res) => {
  try {
    const fromData = req.body;
    // check name
    if (!fromData.name) {
      return res.json({ message: 'Name is required' })
    }
    // check email
    if (!fromData.email) {
      return res.json({ message: 'Email is required' })
    }
    const existingUser = await prisma.user.findUnique({
      where: { email: fromData.email }
    });

    if (existingUser) {
      if (existingUser.isVerified) {
        return res.status(400).json({ message: "Email already exists" });
      } else {
        await prisma.user.delete({ where: { email: fromData.email } })
      }
    }
    // check password
    if (!fromData.password) {
      return res.json({ message: 'Password is required' })
    }

    const hashdPassword = await bcrypt.hash(fromData.password, 10);

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 1 * 60 * 1000); // 1 นาที


    const addUser = await prisma.user.create({
      data: {
        name: fromData.name,
        email: fromData.email,
        password: hashdPassword,
        otp,
        otpExpires,
      }
    });
    const transporter = nodemailer.createTransport({
      service: "gmail",  // หรือ SMTP อื่น
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: `"MyApp" <${process.env.EMAIL_USER}>`,
      to: fromData.email,
      subject: "Verify your account",
      text: `Your OTP code is: ${otp}`,
    });
    res.status(200).json({ message: "User created. Please verify OTP." });
    const { password, ...userWithoutPassword } = addUser;

    res.status(200).json({ message: 'addUser Success', data: userWithoutPassword });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'err:',
      error: err.message,
      stack: err.stack
    });
  }
};

exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (user.isVerified) {
      return res.status(400).json({ message: "User already verified" });
    }

    if (new Date() > user.otpExpires) {
      await prisma.user.delete({ where: { email } });
      return res.status(400).json({ message: "OTP expired, please register again" }); // หมดอายุลบ user ทิ้งเลย
    }

    if (user.otp !== otp || new Date() > user.otpExpires) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    await prisma.user.update({
      where: { email },
      data: { isVerified: true, otp: null, otpExpires: null }
    });

    res.status(200).json({ message: "Account verified successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error", error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // check email & compare password 
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    if (!user.isVerified) {
      return res.status(400).json({ message: "Please verify your account first" });
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    // creact jwt
    const token = jwt.sign(
      { user_id: user.user_id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "10m" }
    )
    const { password: _, ...userWithoutPassword } = user;
    res.status(200).json({
      message: "Login success",
      token,
      user: userWithoutPassword,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'err:',
      error: err.message,
      stack: err.stack,
    });
  }
}

exports.getAllUsers = async (req, res) => {
  try {
    // ดึง user ทั้งหมดจาก DB
    const users = await prisma.user.findMany({
      select: {
        user_id: true,
        name: true,
        email: true,
        isVerified: true,
        created_at: true,
        role: true,

      },
      orderBy: { created_at: "desc" },
    });

    res.status(200).json({
      message: "Get all users success",
      data: users,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "err:",
      error: err.message,
      stack: err.stack,
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // เช็คว่ามี user จริงไหม
    const user = await prisma.user.findUnique({
      where: { user_id: parseInt(id) },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // ลบ user
    await prisma.user.delete({
      where: { user_id: parseInt(id) },
    });

    res.status(200).json({
      message: "User deleted successfully",
      deletedUser: {
        user_id: user.user_id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "err:",
      error: err.message,
      stack: err.stack,
    });
  }
};


