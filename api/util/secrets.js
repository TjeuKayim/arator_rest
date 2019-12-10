const dotenv = require("dotenv");
const fs = require("fs");

if (fs.existsSync(".env")) {
  dotenv.config({ path: ".env" });
}
const DB_HOST = process.env["DB_HOST"];

if (!DB_HOST) {
  console.log("Please create an .env file with db credentials");
  process.exit(1);
}

module.exports = {
  ENVIRONMENT: process.env.NODE_ENV,
  DB_USER: process.env["DB_USER"],
  DB_HOST,
  DB_PASSWORD: process.env["DB_PASSWORD"],
  DB_NAME: process.env["DB_NAME"]
};
