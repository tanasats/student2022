const db = require("../config/db");

class _userClass { 



  getUser() {
    let sql = db.format("SELECT * FROM users");
    return db.execute(sql);
  }
  delete({ id }) {
    let sql = db.format("DELETE FROM users WHERE userid=?", [id]);
    return db.execute(sql);
  }




  findById({ id = "" }) {
    let sql = db.format("SELECT * FROM USER WHERE user.id = ?", [id]);
    return db.execute(sql);
  }
  findByEmail({ email = "" }) {
    let sql =  db.format("SELECT * FROM USER WHERE user.email = ?", [email]);
    return db.execute(sql);
  }
  userByRole({ id = "" }) {
    let sql = db.format("SELECT * FROM userrole WHERE userrole.roleid = ?", [id]);
    return db.execute(sql);
  }
  addUser({ datas }) {
    let sql = db.format("INSERT INTO USER SET ?", [datas]);
	console.log(sql);
    return db.query(sql);
  }
  updateUser({ id, datas }) {
    let sql = db.format("UPDATE USER SET ? WHERE id=?", [datas, id]);
    return db.query(sql);
  }
  deleteUser({ id }) {
    let sql = db.format("DELETE FROM USER WHERE id=?", [id]);
    return db.execute(sql);
  }
  listallRole() {  
	  console.log("listallrow");
    let sql = db.format("SELECT * FROM role");
    return db.execute(sql);
  }
  addUserRole({userid,roleid}){
	let sql = db.format("INSERT INTO userrole (userid,roleid) VALUES(?,?)",[userid,roleid]);
	console.log(sql);
	return db.execute(sql);
  }
  addUserRoles({userid,roleid}){
	let sql = db.format("INSERT INTO userrole (userid,roleid) VALUES(?,?)",[userid,roleid]);
	return db.execute(sql);
  }  
  getuserrole({userid}){
	  let sql = db.format("SELECT * FROM userrole LEFT JOIN role ON userrole.roleid=role.id WHERE userrole.userid=? ORDER BY userrole.roleid",[userid]);
	  console.log(sql);
	  return db.execute(sql);
  }
  findMeAuth({authaccount}){
	  let sql = db.format("SELECT * FROM user WHERE authaccount=?",[authaccount]);
	  console.log(sql);
	  return db.execute(sql);
  }
  isregistered({authaccount}){
	  let sql = db.format("SELECT * FROM user WHERE authaccount=?",[authaccount]);
	  console.log(sql);
	  return db.execute(sql);
  }  
  getUserInfo({authaccount}){
	let sql = db.format("select * from user left join userrole on user.id=userrole.userid left join role on userrole.roleid=role.id where authaccount=?",[authaccount]);
	console.log(sql);
	return db.execute(sql);
  }
  
  
  
}//class

let userClassModel = new _userClass();
// export instance of class
module.exports = userClassModel;
