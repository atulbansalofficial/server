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
  //validation
  //   if (!req.body.email) {
  //     res.status(400);
  //     return res.json({ error: "email is required..." });
  //   }
  //validation end only for email
  console.log(req.body);
  const user = {
    id: students.length + 1,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    phone: req.body.phone,
  };
  students.push(user);

  res.json(user);
});

app.put("/api/students/:id", (req, res) => {
  let id = req.params.id;
  let first_name = req.body.first_name;
  let last_name = req.body.last_name;
  let email = req.body.email;
  let phone = req.body.phone;

  let index = students.findIndex((student) => {
    return student.id == Number.parseInt(id);
  });

  console.log(id, req.body, index);

  if (index >= 0) {
    let std = students[index];
    std.first_name = first_name;
    std.last_name = last_name;
    std.email = email;
    std.phone = phone;
    res.json(std);
  } else {
    res.status(404);
    res.end();
  }
});
app.delete("/api/students/:id", (req, res) => {
  let id = req.params.id;

  let index = students.findIndex((student) => {
    return student.id == Number.parseInt(id);
  });

  if (index >= 0) {
    let std = students[index];
    students.splice(index, 1);
    res.json(std);
  } else {
    res.status(404);
  }
});
