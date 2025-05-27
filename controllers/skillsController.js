import connection from "../utils/mysql.js";
import { validateSkillsForm } from "../utils/helper.js";

const getSkills = async (req, res) => {
  let sql = "SELECT * FROM skills";
  const params = [];

  if (req.query.category) {
    sql = "SELECT * FROM skills WHERE category = ?";
    params.push(req.query.category);
  }
  if (req.query.resource) {
    sql =
      "SELECT s.* FROM skills s JOIN resources r ON s.id = r.skill_id WHERE r.title = ?";
    params.push(req.query.resource);
  }

  try {
    const [results] = await connection.query(sql, params);

    if (!results.length) {
      return res.status(404).json({ message: "No skills found" });
    }

    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addSkills = async (req, res) => {
  const formData = req.body;
  const sql = "INSERT INTO skills SET ?";

  const validationResult = validateSkillsForm(formData);

  if (!validationResult.success) {
    return res.status(400).json({ error: validationResult.error });
  }

  try {
    const [results] = await connection.query(sql, [formData]);

    res.status(201).json({ message: "Created Skill" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteSkill = async (req, res) => {
  const skillId = req.params.id;

  const sql = "DELETE FROM skills WHERE skills.id = ?";

  try {
    const [results] = await connection.query(sql, [skillId]);

    if (results.affectedRows === 0) {
      res.status(404).json({ message: `No record with ID ${skillId} found` });
    }

    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateSkill = async (req, res) => {
  const skillId = req.params.id;

  if (!req.body.name || !req.body.category_id) {
    return res
      .status(400)
      .send({ message: "Include criteria you want to update" });
  }

  const sql = "UPDATE skills SET ? WHERE skills.id = ?";

  try {
    const [results] = await connection.query(sql, [skillId]);

    if (results.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: `No record with ID ${skillId} found` });
    }

    res.json({ message: "Skill has been updated" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {
  getSkillsByCategory,
  getSkillsByResource,
  getSkills,
  addSkills,
  deleteSkill,
  updateSkill,
};
