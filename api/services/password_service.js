const bcrypt = require("bcryptjs");

module.exports = {
  hashAndSalt(plainPassword) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(plainPassword, salt);
  }
};
