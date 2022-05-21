const db = require("../config/db");

class _Class {  

  getAll() {
    const sql = db.format("SELECT * FROM users");
    return db.execute(sql);
  }
  getById({ id = "" }) {
    const sql = db.format("SELECT * FROM users WHERE users.userid = ?", [id]);
    return db.execute(sql);
  }

  filter({page,pagesize,keyword}){
    //const sql = db.format("SELECT * FROM  users WHERE username like ? LIMIT ?,?", ['%'+keyword+'%',(page-1)*pagesize,pagesize]);
    const sql = db.format("SELECT * FROM  users WHERE username like ? LIMIT ?,?", ['%'+keyword+'%',(page-1)*pagesize,pagesize]);
    return db.query(sql);
  }

  countfilter({keyword}) {
    const sql = db.format("SELECT count(*) as value FROM users WHERE username like ?",['%'+keyword+'%']);
    return db.execute(sql);
  }

  getUserroleById({ id }) {
    const sql = db.format("SELECT userroles.userid,roles.* FROM userroles LEFT JOIN roles ON userroles.roleid=roles.roleid WHERE userid=?", [id]);
    return db.execute(sql);
  }  

  getallusersroles(){
    const sql = db.format("select userroles.userid,roles.* from userroles left join roles on userroles.roleid = roles.roleid");
    return db.execute(sql);
  }
  
  create({ datas }) {
    const sql = db.format("INSERT INTO users SET ?", [datas]);
	  console.log(sql);
    return db.query(sql);
  }
  update({ id, datas }) {
    const sql = db.format("UPDATE users SET ? WHERE userid=?", [datas, id]);
    return db.query(sql);
  }
  delete({ id }) {
    const sql = db.format("DELETE FROM users WHERE userid=?", [id]);
    return db.execute(sql);
  }


  test(){
    const sql = db.format("SELECT users.*,roles.roleid,roles.rolecode,roles.rolename from users left join userroles on users.userid=userroles.userid left join roles on userroles.roleid=roles.roleid");
    return db.execute(sql);
  } 
}//class

const ClassModel = new _Class();
module.exports = ClassModel;
