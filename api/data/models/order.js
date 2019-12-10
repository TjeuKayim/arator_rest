module.exports = class Order {
  constructor(products = [], buyer, seller) {
    this.products = products;
    this.buyer = buyer;
    this.seller = seller;
  }
};
