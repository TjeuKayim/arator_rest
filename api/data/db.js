const mysql = require("mysql");
const secrets = require("../util/secrets");

const connection = mysql.createConnection({
  host: secrets.DB_HOST,
  port: "3306",
  user: secrets.DB_USER,
  password: secrets.DB_PASSWORD,
  database: secrets.DB_NAME
});

connection.connect();

module.exports = connection;
