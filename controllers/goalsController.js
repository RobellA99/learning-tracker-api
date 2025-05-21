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

const addGoal = async (req, res) => {
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

const deleteGoal = async (req, res) => {
  const goalId = req.params.id;

  const sql = "DELETE FROM goals WHERE goals.id - ?";

  try {
    const [results] = await connection.query(sql, [goalId]);

    if (results.affectedRows === 0) {
      res.status(404).json({ message: `No record with Id ${goalId} found` });
    }

    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateGoal = async (req, res) => {
  const goalId = req.params.id;

  if (
    !req.params.user_id ||
    !req.params.skill_id ||
    !req.params.target_date ||
    !req.params.note ||
    !req.params.status
  ) {
    return res.status(400).send({ message: "Please include necessary field" });
  }

  const { created_at } = req.body;

  const sql = "UPDATE goals SET ? WHERE goals.id = ?";

  try {
    const [results] = await connection.query(sql, [goalId, created_at]);

    if (results.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: `No record with ID ${goalId} found` });
    }

    res.status(201).json({ message: "Goal Updated" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { getGoals, addGoal, deleteGoal, updateGoal };
