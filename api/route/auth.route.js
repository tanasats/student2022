const express = require("express");
const router = express.Router();
const authController = require("../controller/auth.controller");
const { authJwt } = require("../middleware/auth");

// router.route("/").get((req,res)=>{
//     console.log("User api....");
//     res.send("User api...")
// })

// Get all user
router.post("/auth/signin",authController.signin);
//router.get("/users", /*authJwt.verifyToken,*/userController.listallUser);
router.post("/auth/tokensignin",authController.tokenSignin);
router.get("/auth/me",authController.me);

module.exports = router;
