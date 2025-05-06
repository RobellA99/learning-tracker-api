import connection from "../utils/mysql.js";

const getCategories = async (_req, res) => {
  const sql = "SELECT * FROM categories";

  try {
    const [results] = await connection.query(sql);

    if (!results.length) {
      return res.status(404).json({ message: "No category listed in DB" });
    }

    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { getCategories };
