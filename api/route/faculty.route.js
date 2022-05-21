const express = require("express");
const router = express.Router();
const facultyController = require("../controller/faculty.controller");
const { authJwt } = require("../middleware/auth");

// Read
router.get("/facultys",/*authJwt.verifyToken,*/facultyController.filter);
router.get("/faculty/:id",/*authJwt.verifyToken,*/ facultyController.getById);
// Create
router.post("/faculty", /*authJwt.verifyToken,*/ facultyController.create);
// Update
router.put("/faculty/:id", /*authJwt.verifyToken,*/ facultyController.update);
// Delete
router.delete("/faculty/:id", /*authJwt.verifyToken,*/ facultyController.delete);

module.exports = router;
