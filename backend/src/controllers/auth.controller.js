const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// SIGNUP
exports.signup = async (req, res) => {
  try {
    const { name, email, password, shopUrl, apiToken } = req.body;

    // Check existing user
    const existing = await prisma.tenant.findUnique({ where: { email } });
    if (existing) return res.status(400).json({ message: "Email already exists" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const tenant = await prisma.tenant.create({
      data: {
        name,
        email,
        password: hashedPassword,
        shopUrl,
        apiToken
      }
    });

    res.json({ message: "Tenant registered successfully", tenant });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

// LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const tenant = await prisma.tenant.findUnique({ where: { email } });
    if (!tenant) return res.status(404).json({ message: "Email not found" });

    const isMatch = await bcrypt.compare(password, tenant.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    // JWT TOKEN
    const token = jwt.sign(
      { tenantId: tenant.id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ message: "Login successful", token, tenantId: tenant.id });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};
