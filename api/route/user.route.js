const express = require("express");
const router = express.Router();
const userController = require("../controller/user.controller");
const { authJwt } = require("../middleware/auth");

// router.route("/").get((req,res)=>{
//     console.log("User api....");
//     res.send("User api...")
// })

// Get all user
router.get("/users",userController.filter);
//router.get("/users", /*authJwt.verifyToken,*/userController.listallUser);
// Get all role data
//router.get("/user/roles",/*authJwt.verifyToken,*/ userController.listallRole);
// Get user by id
//router.get("/user/findmeauth", authJwt.verifyToken, userController.findMeAuth);
//router.get("/user/isregistered",authJwt.verifyToken, userController.isregistered);

//router.get("/user/info",authJwt.verifyToken,userController.getUserInfo);
router.get("/user/:id",/*authJwt.verifyToken,*/ userController.getById);
//router.get("/user/:id/roles",/*authJwt.verifyToken,*/ userController.getUserRole);




// Create new user
router.post("/user", /*authJwt.verifyToken,*/ userController.create);
//router.post("/user/addrole",/*authJwt.verifyToken,*/ userController.addUserRole);


// Update user
router.put("/user/:id", /*authJwt.verifyToken,*/ userController.update);
// Delete user
router.delete("/user/:id", /*authJwt.verifyToken,*/ userController.delete);

//router.post("/user/:userid/role/:roleid", /*authJwt.verifyToken,*/ userController.addUser);

module.exports = router;
