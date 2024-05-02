const bcrypt = require("bcrypt");
const fs = require("fs");

const loginFunc = (req, res) => {
  let arr = fs.readFileSync("../backend/database/users.json", "utf-8");
  arr = JSON.parse(arr);

  const user = arr.find((obj) => obj.email === req.body.email);
  if (!user) {
    res.send("User not found");
  }

  const validPassword = bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return res.send("Invalid password");
  }

  req.session.isAuth = true;
  res.status(200).send({
    message: "Logged in successfully",
    session: req.session,
    success: true,
  });
};

module.exports = { loginFunc };
