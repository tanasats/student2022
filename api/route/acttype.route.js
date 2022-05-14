const express = require("express");
const router = express.Router();
const acttypeController = require("../controller/acttype.controller");
const { authJwt } = require("../middleware/auth");

// Read
router.get("/acttypes",acttypeController.filter);
router.get("/acttype/:id",/*authJwt.verifyToken,*/ acttypeController.getById);
// Create
router.post("/acttype", /*authJwt.verifyToken,*/ acttypeController.create);
// Update
router.put("/acttype/:id", /*authJwt.verifyToken,*/ acttypeController.update);
// Delete
router.delete("/acttype/:id", /*authJwt.verifyToken,*/ acttypeController.delete);

module.exports = router;
