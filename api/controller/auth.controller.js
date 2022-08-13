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

// app_signin  
// return {message:"0"} when Not found username in app database.
// return {message:"1"} when Found username in app database but invalid password.
exports.signin = async (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  authModel
    .findUsername(username)
    .then(([row]) => {
      console.log(row);
      if (row.length === 0) {
        //return res.status(404).send({message: "Not found User!" });
        return res.status(404).send({message: "0"});
      }
      let [user] = row;  
      let passwordIsValid =  bcrypt.compareSync(password || "", user.password);
      //console.log('password is valid:',passwordIsValid);
      if (!passwordIsValid) {
        return res.status(401).send({message:'1'}); //has username but invalid password
      }

      //---Authorized----
      let token = jwt.sign({ username: user.username }, config.secret, {
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
    console.log('access_token_decode:',_decode);
    authModel
      .findUsername(_decode.username)
      .then(([row]) => {
        //console.log("numrow:", row.length);
        console.log("app_user_info:",row);
        if (!row.length){
          return res
            .status(401)
            .json({ message: _decode.username + " not found !!" });
        }
        return res.status(200).send(row);
      })
      .catch((error) => {
        return res.status(401).send(error);
      });
  } catch (err) {
    return res.status(401).send(err);
  }
};

// ทำการลงทะเบียน โดยรับข้อมูล user จาก AD พร้อมทั้งกำหนด role
exports.register = async (req, res) => {
  //console.log(req.body);
  var datas = {
    username: req.body.username,
    password: req.body.password,
    usertype: req.body.usertype,
    studentcode: req.body.studentcode,
    displayname: req.body.fullname,
    faculty_name: req.body.faculty,
  };
  if (datas.password) {
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    datas.password = await bcrypt.hash(datas.password, salt);
  }
  await authModel.get_faculty_id(req.body.faculty).then(([[row]])=>{
    console.log('faculty:',row);
    datas.faculty_id = row.faculty_id;
  });
  //console.log('userinfo:',datas);
  authModel
    .register({ datas })
    .then(([row]) => {
      //console.log("register:", row);
      //console.log("insertId:", row.insertId);

      if (datas.usertype == "student") {
        console.log("try to add stuent role");
        authModel
          .addRole(row.insertId,1)
          .then(([row]) => {
            console.log('addrole response:',row);
            return res.status(200).send({message:'User registered'});
          })
          .catch((err) => {
            console.log(err);
            return res.status(401).send({message:'add student role error :'+err});
          });
      }


    })
    .catch((err) => {
      console.log("err register:", err);
      return res.status(401).send(err);
    });
  //res.status(200).send("test");
};

