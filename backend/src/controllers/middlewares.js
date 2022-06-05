const jwt = require("jsonwebtoken");
exports.tokenVerify = (req, res, next) => {
  const authdata = req.headers.authorization.split(" ")[1];
  const user = jwt.verify(authdata, process.env.SECRET_KEY);
  req.user = user;
  next();
};
