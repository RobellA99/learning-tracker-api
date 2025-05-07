import connection from "../utils/mysql.js";

const getResource = async (_req, res) => {
  const sql = "SELECT * FROM resources";

  try {
    const [results] = await connection.query(sql);

    if (!results.length) {
      return res.status(404).json({ message: "No resources found" });
    }

    res.json(results);
  } catch (error) {}
  res.status(500).json({ error: error.message });
};

export { getResource };
