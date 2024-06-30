import express from "express";
import todoRoutes from "./todo/routes";

const app = express();

app.use(express.json());

app.use("/api", todoRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
