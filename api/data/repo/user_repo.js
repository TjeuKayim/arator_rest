const db = require("../db");
const User = require("../models/user");

module.exports = {
  async fetchUser(email) {
    return new Promise((resolve, reject) => {
      const sql =
        "SELECT email, password, mobile_number FROM users WHERE email = ?";
      db.query(sql, [email], (err, rows) => {
        if (rows && rows[0]) {
          const result = rows[0];
          const user = new User(
            result.email,
            result.password,
            result.mobileNumber
          );
          resolve(user);
        } else {
          reject(err);
        }
      });
    });
  },
  async insertUser(user) {
    return new Promise((resolve, reject) => {
      const sql =
        "INSERT INTO users(email, password, mobile_number) VALUES(?,?,?)";
      db.query(
        sql,
        [user.email, user.password, user.phoneNumber],
        (err, rows) => {
          if (!err) {
            resolve();
          } else {
            if (err.code === "ER_DUP_ENTRY") {
              reject(new Error("The chosen email is already in use."));
            } else {
              reject(err);
            }
          }
        }
      );
    });
  },
  async fetchUsers() {
    return new Promise((resolve, reject) => {
      const sql = "SELECT email, password, mobile_number FROM users";
      db.query(sql, (err, rows) => {
        const users = [];
        if (rows) {
          for (let i = 0; i < rows.length; i++) {
            const row = rows[i];
            users.push(new User(row.email, row.password, row.mobile_number));
          }
          resolve(users);
        } else {
          reject(new Error("Couldn't fetch users"));
        }
      });
    });
  }
};
