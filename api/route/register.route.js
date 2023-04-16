const express = require("express");
const router = express.Router();
const registerController = require("../controller/register.controller");
const { authJwt } = require("../middleware/auth");

// Read
router.get("/registers",/*authJwt.verifyToken,*/registerController.filter);
router.get("/registers/current",/*authJwt.verifyToken,*/registerController.current);
router.get("/register/approve/:register_id",/*authJwt.verifyToken,*/ registerController.approve);
// Create
router.post("/register", /*authJwt.verifyToken,*/ registerController.create);
router.post("/register/approves", /*authJwt.verifyToken,*/ registerController.approves);
// Update
router.put("/register/:id", /*authJwt.verifyToken,*/ registerController.update);
// Delete
router.delete("/register/:id", /*authJwt.verifyToken,*/ registerController.delete);
// Upload
router.post("/register/upload",/*authJwt.verifyToken,*/registerController.upload);




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
router.post("/register/upload", upload.single('file'), (req, res, next) => {
    res.status(200).json({file:req.file.filename,detail:req.body.detail});
})
*/





module.exports = router;
