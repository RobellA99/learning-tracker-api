import connection from "../utils/mysql.js";
import { validateGoalsForm } from "../utils/helper.js";

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

const addGoals = async (req, res) => {
  const formData = req.body;
  const sql = "INSERT INTO goals SET ?";

  const validationResult = validateGoalsForm(formData);

  if (!validationResult.success) {
    return res.status(400).json({ error: validationResult.error });
  }

  try {
    const [results] = await connection.query(sql, [formData]);

    res.status(201).json({ message: "Goal Created" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { getGoals, addGoals };
