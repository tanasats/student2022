const db = require("../config/db");

class _class { 

  getAll() {
    const sql = db.format("SELECT * FROM activitys");
    return db.execute(sql);
  }
  getById({id = ""}) {
    const sql = db.format("SELECT * FROM activitys WHERE activityid = ?", [id]);
    return db.execute(sql);
  }
  filter({page,pagesize,keyword}){
    const ref1 = "(SELECT refcode,refvalue FROM sysreference WHERE reftable='activitys' and refcolumn='statuscode')";
    const sql = db.format("SELECT activitys.*,ref1.refvalue as statusvalue FROM  activitys LEFT JOIN "+ref1+" ref1 ON activitys.statuscode=ref1.refcode WHERE activityname like ? LIMIT ?,?", ['%'+keyword+'%',(page-1)*pagesize,pagesize]);
    console.log(sql);
    return db.query(sql);
  }
  countfilter({keyword}) {
    const sql = db.format("SELECT count(*) as value FROM activitys WHERE activityname like ?",['%'+keyword+'%']);
    return db.execute(sql);
  }

  create({ datas }) {
    const sql = db.format("INSERT INTO activitys SET ?", [datas]);
	  console.log(sql);
    return db.query(sql);
  }
  update({ id, datas }) {
    const sql = db.format("UPDATE activitys SET ? WHERE activityid=?", [datas, id]);
    return db.query(sql);
  }
  delete({ id }) {
    const sql = db.format("DELETE FROM activitys WHERE activityid=?", [id]);
    return db.execute(sql);
  }

}//class

const ClassModel = new _class();
module.exports = ClassModel;
