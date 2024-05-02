const bcrypt = require("bcrypt");
const fs = require("fs");

const registerFunc = async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);
  req.body.password = hashPassword;

  let arr = fs.readFileSync("../backend/database/users.json", "utf-8");
  arr = JSON.parse(arr);

  arr.push(req.body);
  fs.writeFileSync("../backend/database/users.json", JSON.stringify(arr));

  res.redirect("http://127.0.0.1:5500/learning/frontend/home.html");
};

module.exports = { registerFunc };
