const express = require("express");
const app = express();
const dotenv = require("dotenv");

dotenv.config();
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("home", {
    name: "arsh",
  });
});

app.listen(`${process.env.PORT}`, () => {
  console.log(`Server --> http://localhost:${process.env.PORT}`);
});
