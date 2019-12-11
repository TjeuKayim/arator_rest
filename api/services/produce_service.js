const produceRepo = require("../data/repo/produce_repo");
const validator = require("validator");
const WeightUnit = require("../data/models/weight_unit");

const MAX_DESCRIPTION_LENGTH = 500;
const MAX_NAME_LENGTH = 30;
const MAX_TYPE_LENGTH = MAX_NAME_LENGTH;

function validateProduce(produce) {
  if (
    typeof produce.priceInDollar !== "number" ||
    produce.priceInDollar < 0 ||
    produce.priceInDollar > 10000
  ) {
    throw new Error(`Please specify a valid price.`);
  }
  if (!validator.isLength(produce.name, { min: 1, max: MAX_NAME_LENGTH })) {
    throw new Error(
      `Please fill in a produce name (no longer than ${MAX_NAME_LENGTH} characters)`
    );
  }
  if (
    !validator.isLength(produce.description, { max: MAX_DESCRIPTION_LENGTH })
  ) {
    throw new Error(
      `The produce description can't be longer than ${MAX_DESCRIPTION_LENGTH} characters.`
    );
  }
  if (!validator.isLength(produce.type, { max: MAX_TYPE_LENGTH })) {
    throw new Error(
      `The produce type can't be longer than ${MAX_TYPE_LENGTH} characters.`
    );
  }
  validateWeightUnit(produce.weightUnit);
}

function validateWeightUnit(produceWeightUnit) {
  const weightUnits = Object.keys(WeightUnit);

  for (let weightUnit of weightUnits) {
    if (weightUnit === produceWeightUnit) {
      return;
    }
  }
  throw new Error(
    "Weight unit must be one of the following: " + weightUnits.join(", ")
  );
}

module.exports = {
  async getProduce(id) {
    return produceRepo.fetchProduce(id);
  },
  async getProduces() {
    return produceRepo.fetchProduces();
  },
  async deleteProduce(id) {
    return produceRepo.deleteProduce(id);
  },
  async addProduce(produce) {
    validateProduce(produce);
    return produceRepo.insertProduce(produce);
  }
};
