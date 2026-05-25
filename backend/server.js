import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(
  "mongodb+srv://username:password@cluster.mongodb.net/todoDB"
);

const Todo = mongoose.model(
  "Todo",
  new mongoose.Schema({
    text: String,
  })
);

app.get("/todos", async (req, res) => {
  const todos = await Todo.find();

  res.json(todos);
});

app.post("/todos", async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
  });

  res.json(todo);
});

app.delete("/todos/:id", async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);

  res.json({
    message: "Deleted",
  });
});

app.listen(5000, () => {
  console.log("Server Running");
});