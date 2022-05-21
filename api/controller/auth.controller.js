const authModel = require("../model/auth.model");
const bcrypt = require("bcrypt");
const config = require("../config/auth.config");
const jwt = require("jsonwebtoken");

exports.tokenSignin = (req, res) => {
  var _token = req.body.token;
  //console.log(_token);
  const _secret = config.appSecret;
  jwt.verify(_token, _secret, function (err, decoded) {
    if (err) {
      console.log(err.name);
      return res.status(401).send(err.name);
    }
    let _decode = jwt.decode(_token);
    //---Authorized----
    let token = jwt.sign({ username: _decode.username }, config.secret, {
      expiresIn: config.jwtExpiration,
    });
    res.status(200).json({
      //id: user.userid,
      username: _decode.username,
      //email: user.email,
      //roles: authorities,
      access_token: token,
      //refreshToken: refreshToken,
    });
  });
};

// verifyadtoken(ad_access_token) return
// signinADToken(ad_access_token) แปะ TOKEN ไปกับ HEADER แล้วเรียก /me

exports.signin = async (req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  authModel
    .findUsername(username)
    .then(([row]) => {
      console.log(row);
      if (row.length === 0) {
        return res.status(404).send({ message: "Not found User!" });
      }
      let [user] = row;
      let passwordIsValid = bcrypt.compareSync(password || "", user.password);
      if (!passwordIsValid) {
        return res.status(401).send({
          message: "Invalid Password!",
        });
      }
      //---Authorized----
      let token = jwt.sign({ userid: user.id }, config.secret, {
        expiresIn: config.jwtExpiration,
      });
      res.status(200).json({
        //id: user.userid,
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
}; //signin

exports.me = (req, res) => {
  var token = req.headers["x-access-token"];
  try {
    const _decode = jwt.verify(token, config.secret);
    authModel
      .findUsername(_decode.username)
      .then((row) => {
        res.status(200).send(row);
      })
      .catch((error) => {
        res.status(401).send(error);
      });
  } catch (err) {
    res.status(401).send(err);
  }
};