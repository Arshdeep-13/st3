const getdb = require("../config/connection.js");
const bcrypt = require("bcrypt");

const func = (req, res) => {
  res.render("login.ejs");
};
const handler = async (req, res) => {
  try {
    const db = getdb();

    if (!db) {
      res.send("Could not connect to database");
    }

    const data = await db
      .collection("sessions")
      .find({ email: req.body.email })
      .toArray();
    if (data.length > 0) {
      const isValid = await bcrypt.compare(req.body.password, data[0].password);
      if (isValid) {
        req.session.isAuth = true;
        res.send({
          message: "Successful login",
          session: req.session,
        });
      } else {
        res.send("Invalid details");
      }
    } else {
      res.send("could not find user");
    }
  } catch (error) {
    res.send(error.message);
  }
};

module.exports = { func, handler };
