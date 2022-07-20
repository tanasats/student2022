const express = require("express");
const router = express.Router();
const actorganizationController = require("../controller/actorganization.controller");
const { authJwt } = require("../middleware/auth");

// Read
router.get("/actorganizations",/*authJwt.verifyToken,*/actorganizationController.filter);
router.get("/actorganization/:id",/*authJwt.verifyToken,*/ actorganizationController.getById);
// Create
router.post("/actorganization", /*authJwt.verifyToken,*/ actorganizationController.create);
// Update
router.put("/actorganization/:id", /*authJwt.verifyToken,*/ actorganizationController.update);
// Delete
router.delete("/actorganization/:id", /*authJwt.verifyToken,*/ actorganizationController.delete);

module.exports = router;
