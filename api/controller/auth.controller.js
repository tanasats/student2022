const authModel = require("../model/auth.model");
const bcrypt = require("bcrypt");
const config = require("../config/auth.config");
const jwt = require("jsonwebtoken");

exports.findadusername = (req,res) => {
  req.body.username
}

// verifyadtoken(ad_access_token) return 
// signinADToken(ad_access_token) แปะ TOKEN ไปกับ HEADER แล้วเรียก /me 

exports.signin = async (req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  authModel
  .findUsername(username)
  .then( ([row]) =>{
    console.log(row);
    if (row.length===0) {
      return res.status(404).send({ message: "Not found User!" });
    }
    let [user] = row;
      let passwordIsValid = bcrypt.compareSync(password||'',user.password);
      if (!passwordIsValid) {
        return res.status(401).send({
          message: "Invalid Password!",
        });
      }
      //---Authorized----
      let token =  jwt.sign({ userid: user.id }, config.secret, {
        expiresIn: config.jwtExpiration,
      });
      res.status(200).json({
        id: user.userid,
        username: user.username,
        email: user.email,
        //roles: authorities,
        access_token: token,
        //refreshToken: refreshToken,
      });



  })
  .catch((error) => {
    console.log(error);
    res.status(500).send({ message: error });
  });




};
