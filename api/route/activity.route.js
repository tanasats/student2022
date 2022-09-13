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
// Upload
router.post("/activity/upload",/*authJwt.verifyToken,*/activityController.upload);




/*
//Upload file
const multer = require('multer');
// Multer File upload settings
const DIR = './uploads';
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, fileName)
  }
})
// Multer Mime Type Validation
var upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));//-->status=500, {Error:"Only .png .jpg and jpg format allowed!"}
    }
  }
});
router.post("/activity/upload", upload.single('file'), (req, res, next) => {
    res.status(200).json({file:req.file.filename,detail:req.body.detail});
})
*/





module.exports = router;
