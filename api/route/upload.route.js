const express = require("express");
const router = express.Router();
const uploadController = require("../controller/upload.controller");
const { authJwt } = require("../middleware/auth");

router.post("/upload", uploadController.upload);
router.get("/files", uploadController.getListFiles);
router.get("/files/:name", uploadController.download);

module.exports = router;
