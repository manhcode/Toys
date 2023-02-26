const express = require("express");
const toyController = require("../controllers/toyController");

const router = express.Router();
router.get("/toys", toyController.getAllToy);
router.post("/toys", toyController.createToy);
router.patch("/toys/:toyId", toyController.updateToy);
router.delete("/toys/:toyId", toyController.deleteToy);

module.exports = router;
