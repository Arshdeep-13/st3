const getDb = require("../config/connection.js");
const bcrypt = require("bcrypt");

const func = (req, res) => {
  res.render("register.ejs");
};

const handler = async (req, res) => {
  try {
    const db = getDb();
    if (!db) {
      throw new Error("Database not initialized");
    }

    console.log(req.body);

    const data = await db
      .collection("sessions")
      .find({ email: req.body.email })
      .toArray();

    if (data.length > 0) {
      res.send("user already exists");
    } else {
      await db.collection("sessions").insertOne({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
      });
      res.send("user registered successfully");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = { func, handler };
