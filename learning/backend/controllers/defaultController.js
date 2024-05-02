const defaultFunc = (req, res) => {
  res.send("hi");
};
const protectedFunc = (req, res) => {
  res.send("protected");
};

module.exports = { defaultFunc, protectedFunc };
