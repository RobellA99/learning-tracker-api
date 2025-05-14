import { validateCategoriesForm } from "../utils/helper.js";
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

const addCategories = async (req, res) => {
  const formData = req.body;
  const sql = "INSERT INTO categories SET ?";

  const validationResult = validateCategoriesForm(formData);

  if (!validationResult.success) {
    return res.status(400).json({ error: validationResult.error });
  }

  try {
    const [results] = await connection.query(sql, [formData]);
    res.status(201).json({ message: "Category created" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteCategories = async (req, res) => {
  const categoryId = req.params.id;

  const sql = "DELETE FROM categories WHERE categories.id = ?";

  try {
    const [results] = await connection.query(sql, [categoryId]);

    if (results.affectedRows === 0) {
      res
        .status(404)
        .json({ message: `No record with ID ${categoryId} found` });
    }

    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateCategories = async (req, res) => {
  const categoryId = req.params.id;

  if (!req.body.name) {
    return res.status(400).send({ message: "Please include a name" });
  }

  const sql = "UPDATE categories SET ? WHERE categories.id = ?";

  try {
    const [results] = await connection.query(sql, [categoryId]);

    if (results.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: `No record with ID ${categoryId} found` });
    }

    res.json({ message: "Category updated" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { getCategories, addCategories, deleteCategories, updateCategories };
