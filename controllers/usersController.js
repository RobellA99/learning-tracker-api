import connection from "../utils/mysql.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import "dotenv/config";
import {
  validateUsersLoginForm,
  validateUsersRegisterForm,
} from "../utils/helper.js";

const SALT_ROUNDS = 10;

const registerUser = async (req, res) => {
  const formData = req.body;
  const sql = "INSERT INTO users SET name = ?, email = ?, password = ?";

  const validationResult = validateUsersRegisterForm(formData);

  if (!validationResult.success) {
    return res.status(400).json({ error: validationResult.error });
  }

  try {
    const hashedPassword = await bcrypt.hash(formData.password, SALT_ROUNDS);

    const [results] = await connection.query(sql, [
      req.body.name,
      req.body.email,
      hashedPassword,
    ]);

    res.status(201).json({ message: "Created User" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  const formData = req.body;
  const sql = "SELECT * FROM users WHERE email = ?";

  const validationResult = validateUsersLoginForm(formData);

  if (!validationResult.success) {
    return res.status(400).json({ error: validationResult.error });
  }

  try {
    const [user] = await connection.query(sql, [req.body.email]);

    const result = await bcrypt.compare(req.body.password, user[0].password);

    if (!result) {
      return res
        .status(403)
        .json({ message: "Username/Password combination is incorrect" });
    }

    const token = jwt.sign(
      {
        id: user[0].id,
        sub: user[0].email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "12h" }
    );

    res.json({ authToken: token });
  } catch (error) {
    res.status(400).json({ message: "User not found" });
  }
};

const getUser = async (req, res) => {
  const sql = "SELECT * FROM users WHERE id = ?";

  try {
    const [results] = await connection.query(sql, req.token.id);

    res.json(results[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { registerUser, loginUser, getUser };
