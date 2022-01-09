const express = require("express");
const students = require("./students");

const app = express();
app.use(express.json());

app.listen(4000, () => {
  console.log(`server listening port 4000`);
});

app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

app.get("/api/students", (req, res) => {
  res.json(students);
});
app.post("/api/students", (req, res) => {
  
  console.log(req.body);
  const user = {
    id: students.length + 1,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
  };
  students.push(user);

  res.json(user);
});
