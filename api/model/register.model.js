const db = require("../config/db");

class _class { 

  //async 
  create({ datas }){
    // console.log(datas);
    // const [ [_register_count], [[_receive_count]] ] = await Promise.all([
    //   this.register_user_count(datas.activity_id)
    // ,this.activity_quota(datas.activity_id)
    // ]);

    // console.log(_register_count);
    // console.log(_receive_count);

    // if(_receive_count.value<_register_count.value){
      const sql = db.format("INSERT INTO register set ?",[datas]);
      return db.execute(sql);
    // }else{
    //   return [{"message":"Full quota!!","quota":_receive_count,"registered":_register_count}];
    // }
     
  }

  approve(register_id){
    const sql = db.format("UPDATE register SET register_status=1 WHERE register_id=?",register_id)
    return db.query(sql);
  }
  approves(register_id_array){
    const sql = db.format("UPDATE register SET register_status=1 WHERE register_id in ("+ register_id_array.join(",")+");");
    console.log(sql);
    return db.execute(sql);
  }

  activity_quota(activity_id){
      const sql = db.format("SELECT activity_receive as value FROM  activity WHERE activity_id=?",[activity_id]);
      return db.query(sql);
  }
  register_user_count(activity_id){
    const sql = db.format("SELECT count(*) as value FROM register WHERE activity_id=?",[activity_id]);
    return db.query(sql);
  }


/*
  getAll() {
    const sql = db.format("SELECT * FROM activity");
    return db.execute(sql);
  }
  getById({id = ""}) {
    const sql = db.format("SELECT * FROM activity WHERE activity_id = ?", [id]);
    return db.execute(sql);
  }
  filter({page,pagesize,keyword}){
    const ref1 = "(SELECT refcode,refvalue FROM sysreference WHERE reftable='activity' and refcolumn='activity_register_statuscode')";
    const sql = db.format("SELECT activity.*,ref1.refvalue as activity_statusvalue FROM  activity LEFT JOIN "+ref1+" ref1 ON activity.activity_statuscode=ref1.refcode WHERE activity_name like ? LIMIT ?,?", ['%'+keyword+'%',(page-1)*pagesize,pagesize]);
    console.log(sql);
    return db.query(sql);
  }
  current({page,pagesize}){  //activity_statuscode=1  (เปิด)
    const ref1 = "(SELECT refcode,refvalue FROM sysreference WHERE reftable='activity' and refcolumn='activity_statuscode')";
    const sql = db.format("SELECT activity.*,ref1.refvalue as activity_statusvalue FROM  activity LEFT JOIN "+ref1+" ref1 ON activity.activity_statuscode=ref1.refcode WHERE activity_statuscode like ? LIMIT ?,?", [1,(page-1)*pagesize,pagesize]);
    console.log(sql);
    return db.query(sql);
  }
  countfilter({keyword}) {
    const sql = db.format("SELECT count(*) as value FROM activity WHERE activity_name like ?",['%'+keyword+'%']);
    return db.execute(sql);
  }
  countCurrent({keyword}) {
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
  updatePoster({id,filename,caption}){
    const sql = db.format("UPDATE activity set activity_poster=?,activity_caption=? where activity_id=?",[filename,caption,id]);
    console.log(sql);
    return db.execute(sql);
  }
*/


}//class

const ClassModel = new _class();
module.exports = ClassModel;
