const express = require("express");
const router = express.Router();
const Produce = require("../data/models/produce");
const produceService = require("../services/produce_service");
const tokenService = require("../services/token_service");

router.post("/", tokenService.guard(), async (req, res) => {
  const produce = new Produce(
    req.body.id,
    req.body.name,
    req.body.imagePath,
    req.body.type,
    req.body.description,
    req.body.priceInDollar,
    req.body.weightUnit
  );

  try {
    await produceService.addProduce(produce);
    res.status(201).json({
      message: `Produce created`
    });
  } catch (err) {
    res.json({ message: `Failed to add produce, reason: ${err.message}` });
  }
});

/* Get all produce */
router.get("/", async (req, res) => {
  try {
    const produces = await produceService.getProduces();
    res.json(produces);
  } catch (err) {
    res.json({ message: `Failed to add produce, reason: ${err.message}` });
  }
});

/* Get produce by id */
router.get("/:produceId", async (req, res) => {
  try {
    const produce = await produceService.getProduce(req.params.produceId);
    res.json(produce);
  } catch (err) {
    res.json({ message: `Failed to add produce, reason: ${err.message}` });
  }
});

/* Delete produce by id */
router.delete("/:produceId", tokenService.guard(), async (req, res) => {
  try {
    const produce = await produceService.deleteProduce(req.params.produceId);
    res.status(204).json(produce);
  } catch (err) {
    res.json({ message: `Failed to add produce, reason: ${err.message}` });
  }
});

module.exports = router;
