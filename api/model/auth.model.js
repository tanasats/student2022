const db = require("../config/db");
const bcrypt = require("bcrypt");

class _Class {

  signin(username, password) {
    let sql = db.format("SELECT * FROM users WHERE username=? AND password=?", [
      username,
      password,
    ]);
    return db.execute(sql);
  }

  findAdUsername(username){
    let sql = db.format("SELECT * FROM users WHERE adusername=?", [username]);
    return db.execute(sql);
  }

  findUsername(username) {
    let sql = db.format("SELECT * FROM users WHERE username=?", [username]);
    return db.execute(sql);
  }
} //class

let ClassModel = new _Class();
module.exports = ClassModel;
