const jwt = require("jsonwebtoken");
const secrets = require("../util/secrets");
const tokenJwtCheck = require("express-jwt");

module.exports = {
  generateUserToken(user) {
    const token = jwt.sign(
      { JWT_SECRET: secrets.JWT_SECRET },
      process.env.JWT_SECRET
    );
    return token;
  },
  guard() {
    return tokenJwtCheck({ secret: process.env.JWT_SECRET });
  }
};
