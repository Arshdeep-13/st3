const express = require("express");
const app = express();
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const route = require("./routes/route.js");
const Session = require("express-session");

dotenv.config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.use(
  Session({
    secret: "abc",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      httpOnly: true,
      secure: false,
    },
  })
);
app.use(route);

app.listen(`${process.env.PORT}`, () => {
  console.log(`server --> http://localhost:${process.env.PORT}`);
});
