const db = require("../config/db");

class _Class {  

  getAll() {
    const sql = db.format("SELECT * FROM user");
    return db.execute(sql);
  }
  getById({ id = "" }) {
    const sql = db.format("SELECT * FROM user WHERE user.user_id = ?", [id]);
    return db.execute(sql);
  }

  filter({page,pagesize,keyword}){
    console.log('filter');
    //const sql = db.format("SELECT * FROM  user WHERE username like ? LIMIT ?,?", ['%'+keyword+'%',(page-1)*pagesize,pagesize]);
    const sql = db.format("SELECT * FROM  user WHERE ( username like ? or displayname like ? ) LIMIT ?,?", ['%'+keyword+'%','%'+keyword+'%',(page-1)*pagesize,pagesize]);
    return db.query(sql);
  }

  countfilter({keyword}) {
    console.log('countfilter');
    const sql = db.format("SELECT count(*) as value FROM user WHERE ( username like ? or displayname like ? )",['%'+keyword+'%','%'+keyword+'%']);
    return db.execute(sql);
  }

  getUserroleById({ id }) {
    const sql = db.format("SELECT userrole.user_id,role.* FROM userrole LEFT JOIN role ON userrole.role_id=role.role_id WHERE user_id=?", [id]);
    return db.execute(sql);
  }  

  getalluserrole(){
    const sql = db.format("select userrole.user_id,role.* from userrole left join role on userrole.role_id = role.role_id");
    return db.execute(sql);
  }
  
  create({ datas }) {
    const sql = db.format("INSERT INTO user SET ?", [datas]);
	  console.log(sql);
    return db.query(sql);
  }
  update({ id, datas }) {
    const sql = db.format("UPDATE user SET ? WHERE user_id=?", [datas, id]);
    return db.query(sql);
  }
  delete({ id }) {
    const sql = db.format("DELETE FROM user WHERE user_id=?", [id]);
    return db.execute(sql);
  }


  test(){
    const sql = db.format("SELECT user.*,role.role_id,role.rolecode,role.rolename from user left join userrole on user.user_id=userrole.user_id left join role on userrole.role_id=role.role_id");
    return db.execute(sql);
  } 
}//class

const ClassModel = new _Class();
module.exports = ClassModel;
