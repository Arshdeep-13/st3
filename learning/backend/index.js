const express = require("express");
const app = express();
const Route = require("./routes/route.js");
const bodyParser = require("body-parser");
const expressSession = require("express-session");
const cors = require("cors");

const port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  expressSession({
    secret: "this is me",
    saveUninitialized: false,
    resave: false,
    cookie: {
      secure: false,
      // httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);
app.use(cors());
app.use(Route);

app.listen(3000, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
