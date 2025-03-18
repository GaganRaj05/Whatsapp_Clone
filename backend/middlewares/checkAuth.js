const jsonwebtoken = require("jsonwebtoken");

function checkAuth(req, res, next) {
  try {
    const token = req.cookies.jwt;
    if (!token) return res.status(201).json("Login to use the features of whatsapp");
    const checkToken = jsonwebtoken.verify(token, process.env.JWT_SECRET);
    console.log(checkToken)
    if (!checkToken) return res.status(401).json("Do not tamper with token, please re-login");
    req.user_id = checkToken.id;
    next();
  } catch (err) {
    if (err instanceof jsonwebtoken.TokenExpiredError) {
      return res.status(401).json("Token has expired, please re-login");
    } else if (err instanceof jsonwebtoken.JsonWebTokenError) {
      return res.status(401).json("Invalid token, please re-login");
    } else {
      console.error("Authentication error:", err);
      return res.status(500).json("Some error occurred, please try again later");
    }
  }
}
module.exports = checkAuth;
