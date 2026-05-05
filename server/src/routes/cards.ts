const cardsController = require('../controllers/cards');
const express = require("express");
const router = express.Router();

router.get("/", cardsController.getCards);

router.post("/", cardsController.createCard);

router.get("/:id", cardsController.getCardById);

router.delete("/:id", cardsController.deleteCardById);

module.exports = router;