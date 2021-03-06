const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.header("auth-token") || req.query.token;
  console.log(token);
  if (!token) return res.status(401).send("Access Denied");

  try {
    const isTokenVerify = jwt.verify(token, process.env.TOKEN_SECRET);

    req.user = isTokenVerify;
    next();
  } catch (error) {
    res.status(400).send("Invalid Token");
  }
};
