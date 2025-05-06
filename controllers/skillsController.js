import connection from "../utils/mysql.js";

const getSkillsByCategory = async (req, res) => {
  const { category_id } = req.query;

  if (!category_id) {
    return res.status(400).json({ message: "Category is required" });
  }

  const sql =
    "SELECT s.name, c.name AS category_name FROM skills AS s JOIN categories AS c ON s.category_id = c.id WHERE c.name = ?";

  try {
    const [results] = await connection.query(sql, [category_id]);

    if (!results.length) {
      return res.status(404).json({ message: "No skills found" });
    }

    res.json(results);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getSkillsByResource = async (req, res) => {
  const { title } = req.query;

  if (!title) {
    return res.status(400).json({ message: "Resource is required" });
  }
  const sql =
    "SELECT s.name, r.title AS resource_name FROM skills AS s JOIN resources AS r ON s.id = r.skill_id WHERE r.title = ?";

  try {
    const [results] = await connection.query(sql, [title]);

    if (!results.length) {
      return res.status(404).json({ message: "No skills found" });
    }

    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { getSkillsByCategory, getSkillsByResource };
