import { validateResourcesForm } from "../utils/helper.js";
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

const addResource = async (req, res) => {
  const fromData = req.body;
  const sql = "INSERT INTO resources SET ?";

  const validationResult = validateResourcesForm(fromData);

  if (!validationResult.success) {
    return res.status(400).json({ error: validationResult.error });
  }

  try {
    const [results] = await connection.query(sql, [fromData]);

    res.status(201).json({ message: "Resource Created" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteResource = async (req, res) => {
  const resourceId = req.params.id;

  const sql = "DELETE FROM resources WHERE resources.id = ?";

  try {
    const [results] = await connection.query(sql, [resourceId]);

    if (results.affectedRows === 0) {
      res
        .status(404)
        .json({ message: `No record with id ${resourceId} found` });
    }

    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateResource = async (req, res) => {
  const resourceId = req.params.id;

  if (
    !req.body.skill_id ||
    !req.body.title ||
    !req.body.url ||
    !req.body.format ||
    !req.body.difficulty
  ) {
    return res.status(400).send({ message: "Please include necessary field" });
  }

  const { created_at } = req.body;

  const sql = "UPDATE resources SET ? WHERE resources.id = ?";

  try {
    const [results] = await connection.query(sql, [resourceId, created_at]);

    if (results.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: `No record with ID ${resourceId} found` });
    }

    res.status(201).json({ message: "Resource Updated" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { getResource, addResource, deleteResource, updateResource };
