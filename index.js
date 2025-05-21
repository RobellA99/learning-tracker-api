import express from "express";
import cors from "cors";
import "dotenv/config";
import skillsRoutes from "./routes/skillsRoutes.js";
import goalsRoutes from "./routes/goalsRoutes.js";
import resourcesRoutes from "./routes/resourcesRoutes.js";
import categoriesRoutes from "./routes/categoriesRoutes.js";

const PORT = process.env.PORT || 5050;

const app = express();
app.use(express.json());

app.use(cors({ origin: process.env.FRONT_END_URL }));

app.get("/", (_req, res) => {
  res.send("App is running...");
});

app.use("/skills", skillsRoutes);
app.use("/goals", goalsRoutes);
app.use("/resources", resourcesRoutes);
app.use("/categories", categoriesRoutes);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
