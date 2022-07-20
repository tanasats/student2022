const db = require("../config/db");

class _class { 

  getAll() {
    const sql = db.format("SELECT * FROM activity");
    return db.execute(sql);
  }
  getById({id = ""}) {
    const sql = db.format("SELECT * FROM activity WHERE activity_id = ?", [id]);
    return db.execute(sql);
  }
  filter({page,pagesize,keyword}){
    const ref1 = "(SELECT refcode,refvalue FROM sysreference WHERE reftable='activity' and refcolumn='activity_statuscode')";
    const sql = db.format("SELECT activity.*,ref1.refvalue as activity_statusvalue FROM  activity LEFT JOIN "+ref1+" ref1 ON activity.activity_statuscode=ref1.refcode WHERE activity_name like ? LIMIT ?,?", ['%'+keyword+'%',(page-1)*pagesize,pagesize]);
    console.log(sql);
    return db.query(sql);
  }
  countfilter({keyword}) {
    const sql = db.format("SELECT count(*) as value FROM activity WHERE activity_name like ?",['%'+keyword+'%']);
    return db.execute(sql);
  }

  create({ datas }) {
    const sql = db.format("INSERT INTO activity SET ?", [datas]);
	  console.log(sql);
    return db.query(sql);
  }
  update({ id, datas }) {
    const sql = db.format("UPDATE activity SET ? WHERE activity_id=?", [datas, id]);
    return db.query(sql);
  }
  delete({ id }) {
    const sql = db.format("DELETE FROM activity WHERE activity_id=?", [id]);
    return db.execute(sql);
  }

}//class

const ClassModel = new _class();
module.exports = ClassModel;
