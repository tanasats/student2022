const db = require("../config/db");

class _class { 

  getAll() {
    let sql = db.format("SELECT * FROM activitys");
    return db.execute(sql);
  }
  getById({id = ""}) {
    let sql = db.format("SELECT * FROM activitys WHERE activityid = ?", [id]);
    return db.execute(sql);
  }
  filter({page,pagesize,keyword}){
    let sql = db.format("SELECT * FROM  activitys WHERE activityname like ? LIMIT ?,?", ['%'+keyword+'%',(page-1)*pagesize,pagesize]);
    return db.query(sql);
  }
  countfilter({keyword}) {
    let sql = db.format("SELECT count(*) as value FROM activitys WHERE activityname like ?",['%'+keyword+'%']);
    return db.execute(sql);
  }

  create({ datas }) {
    let sql = db.format("INSERT INTO activitys SET ?", [datas]);
	  console.log(sql);
    return db.query(sql);
  }
  update({ id, datas }) {
    let sql = db.format("UPDATE activitys SET ? WHERE activityid=?", [datas, id]);
    return db.query(sql);
  }
  delete({ id }) {
    let sql = db.format("DELETE FROM activitys WHERE activityid=?", [id]);
    return db.execute(sql);
  }

}//class

let ClassModel = new _class();
module.exports = ClassModel;
