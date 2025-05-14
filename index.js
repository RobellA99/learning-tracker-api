import express from "express";
import cors from "cors";
import "dotenv/config";
import skillsRoutes from "./routes/skillsRoutes.js";

const PORT = process.env.PORT || 5050;

const app = express();
app.use(express.json());

app.use(cors({ origin: process.env.FRONT_END_URL }));

app.get("/", (_req, res) => {
  res.send("App is running...");
});

app.use("/skills", skillsRoutes);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
