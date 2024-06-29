import express from "express";

const app = express();

app.use(express.json());

app.get("/todos", console.log);
app.post("/todos", console.log);
app.patch("/todos", console.log);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
