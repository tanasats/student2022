const db = require("../config/db");

class _class { 

  getAll() {
    let sql = db.format("SELECT * FROM faculty");
    return db.execute(sql);
  }
  getById({id = ""}) {
    let sql = db.format("SELECT * FROM faculty WHERE facultyid = ?", [id]);
    return db.execute(sql);
  }
  filter({page,pagesize,keyword}){
    let sql = db.format("SELECT * FROM  faculty WHERE facultyname like ? LIMIT ?,?", ['%'+keyword+'%',(page-1)*pagesize,pagesize]);
    return db.query(sql);
  }
  countfilter({keyword}) {
    let sql = db.format("SELECT count(*) as value FROM faculty WHERE facultyname like ?",['%'+keyword+'%']);
    return db.execute(sql);
  }

  create({ datas }) {
    let sql = db.format("INSERT INTO faculty SET ?", [datas]);
	  console.log(sql);
    return db.query(sql);
  }
  update({ id, datas }) {
    let sql = db.format("UPDATE faculty SET ? WHERE facultyid=?", [datas, id]);
    return db.query(sql);
  }
  delete({ id }) {
    let sql = db.format("DELETE FROM faculty WHERE facultyid=?", [id]);
    return db.execute(sql);
  }

}//class

let ClassModel = new _class();
module.exports = ClassModel;
