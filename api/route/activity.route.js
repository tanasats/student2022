const express = require("express");
const router = express.Router();
const activityController = require("../controller/activity.controller");
const { authJwt } = require("../middleware/auth");

// Read
router.get("/activitys",/*authJwt.verifyToken,*/activityController.filter);
router.get("/activity/:id",/*authJwt.verifyToken,*/ activityController.getById);
// Create
router.post("/activity", /*authJwt.verifyToken,*/ activityController.create);
// Update
router.put("/activity/:id", /*authJwt.verifyToken,*/ activityController.update);
// Delete
router.delete("/activity/:id", /*authJwt.verifyToken,*/ activityController.delete);

module.exports = router;
