const db = require("../db");
const Produce = require("../models/produce");

function mapRowToProduce(row) {
  return new Produce(
    row.id,
    row.name,
    row.imagePath,
    row.type,
    row.description,
    row.priceInDollar,
    row.weightUnit
  );
}

module.exports = {
  async fetchProduces() {
    return new Promise((resolve, reject) => {
      const sql =
        "SELECT id, name, imagePath, type, description, priceInDollar, weightUnit FROM produces";
      db.query(sql, (err, rows) => {
        if (rows) {
          const produces = [];
          for (let i = 0; i < rows.length; i++) {
            produces.push(mapRowToProduce(rows[i]));
          }
          resolve(produces);
        } else {
          resolve(err);
        }
      });
    });
  },
  async fetchProduce(id) {
    return new Promise((resolve, reject) => {
      const sql =
        "SELECT id, name, imagePath, type, description, priceInDollar, weightUnit FROM produces WHERE id = ?";
      db.query(sql, [id], (err, rows) => {
        if (rows && rows[0]) {
          const row = rows[0];
          const produce = mapRowToProduce(row);
          resolve(produce);
        } else {
          resolve(undefined);
        }
      });
    });
  },
  async insertProduce(produce) {
    return new Promise((resolve, reject) => {
      const sql =
        "INSERT INTO produces(name, imagePath, type, description, priceInDollar, weightUnit) VALUES(?, ?, ?, ?, ?, ?)";
      db.query(
        sql,
        [
          produce.name,
          produce.imagePath,
          produce.type,
          produce.description,
          produce.priceInDollar,
          produce.weightUnit
        ],
        (err, rows) => {
          if (rows) {
            resolve();
          } else {
            reject(err);
          }
        }
      );
    });
  },
  async deleteProduce(id) {
    return new Promise((resolve, reject) => {
      const sql = "DELETE FROM produces WHERE id = ?";
      db.query(sql, [id], (err, result) => {
        resolve();
      });
    });
  }
};
