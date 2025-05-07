import connection from "../utils/mysql.js";

const getGoals = async (_req, res) => {
  const sql = "SELECT * FROM goals";

  try {
    const [results] = await connection.query(sql);

    if (!results.length) {
      return res.status(404).json({ message: "No goals found" });
    }

    res.json(results);
  } catch (error) {}
  res.status(500).json({ error: error.message });
};

export { getGoals };
