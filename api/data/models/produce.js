module.exports = class Produce {
  constructor(
    id,
    name,
    imagePath,
    type,
    description,
    priceInDollar,
    weightUnit
  ) {
    this.id = id;
    this.name = name;
    this.imagePath = imagePath;
    this.type = type;
    this.description = description;
    this.priceInDollar = priceInDollar;
    this.weightUnit = weightUnit;
  }
};
