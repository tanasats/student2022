const userModel = require("../model/user.model");
const bcrypt = require("bcrypt");

exports.filter = async (req, res) => {
  console.time('test');
  try {
    let page = parseInt(req.query.page) || 1;
    let pagesize = parseInt(req.query.pagesize) || 10;
    let keyword = req.query.keyword || "";

    const [ [_users], [[_count]],[_roles] ] = await Promise.all([
      userModel.filter({ page: page, pagesize: pagesize, keyword: keyword }),
      userModel.countfilter({ keyword: keyword }),
      userModel.getalluserrole(),
    ]);

    // prepare hierarchy format 
    const datas = _users.map((user,user_index) => {
      const myroles = _roles.filter((role) => role.user_id==user.user_id);
      user.roles = myroles; //JSON.stringify(myroles);
      return user;
    });
    console.timeEnd('test');
    return res.status(200).json({
      currentpage: page,
      totalpage: Math.ceil(_count.value / pagesize),
      pagesize: pagesize,
      itemscount: _count.value,
      items: datas,
    });
  } catch (error) {
    //console.log(error);
    res.status(400).json(error);
  }
  
};

exports.test = (req,res) =>{
  userModel.test()
    .then(([row]) =>{
      console.log(row);
      const _roles = row.map((element,index,arr)=>{      
        const item = {
          "user_id":element.user_id,
          "roleid":element.roleid,
          "rolecode":element.rolecode,
          "rolename":element.rolename
        };
        return item;
      })
      const _users = row.map((element)=>{
        return {  user_id: element.user_id,
                  username: element.username,
                  displayname:element.displayname,
                  email:element.email,
                  adusername:element.adusername,
                  cdate:element.cdate,
                  mdate:element.mdate
                }
      }).filter((element,index,arr)=>{
        const _user_id = arr.map((element)=>element.user_id);
        //console.log(_user_id.indexOf(element.user_id),index);
        return _user_id.indexOf(element.user_id)===index;
      })     
      const users = _users.map((user)=>{
        const myroles = _roles.filter((role) => role.user_id==user.user_id);
        user.roles = myroles;
        return user;
      })
      res.status(200).json(users);
    })
    .catch((err) =>{
      res.status(400).send(err);
    })
}


exports.getuserrole = (req, res) => {
  if (req.params.id) {
    userModel
      .getUserroleById({ id: req.params.id })
      .then(([row]) => {
        res.status(200).json(row);
      })
      .catch((error) => {
        console.log(error);
        res.status(400).send(error);
      });
  } else {
    res.status(400).send("Invalid request parameter");
  }
};

exports.delete = (req, res) => {
  if (req.params.id) {
    userModel
      .delete({ id: req.params.id })
      .then(([row]) => {
        res.status(200).json(row);
      })
      .catch((error) => {
        console.log(error);
        res.status(400).send(error);
      });
  } else {
    res.status(400).send("Invalid request parameter");
  }
};

exports.update = async (req, res) => {
  const id = req.params.id;
  const datas = req.body;
  if (Object.keys(datas).length === 0) {
    // empty datas
    return res.status(400).send({ message: "Invalid request parameter" });
  }
  if (req.params.id) {
    if (datas.password) {
      const saltRound = 10;
      const salt = await bcrypt.genSalt(saltRound);
      datas.password = await bcrypt.hash(datas.password, salt);
    }
    delete datas.cdate;
    datas.mdate = new Date();
    userModel
      .update({ id: id, datas: datas })
      .then(([row]) => {
        res.status(200).json(row);
      })
      .catch((error) => {
        console.log(error);
        // if (error.message) {
        //   return res.status(400).send({ message: error.message });
        // }
        res.status(400).send(error);
      });
  } else {
    res.status(400).send({ message: "Invalid request parameter" });
  }
};

exports.create = async (req, res) => {
  const datas = req.body;
  datas.cdate = new Date();
  datas.mdate = new Date();
  if (req.body.username) {
    if (datas.password) {
      const saltRound = 10;
      const salt = await bcrypt.genSalt(saltRound);
      datas.password = await bcrypt.hash(datas.password, salt);
    }
    console.log("data:", datas);
    userModel
      .create({ datas: datas })
      .then(([row]) => {
        console.log("create()->result:", row);
        res.status(200).json(row);
      })
      .catch((error) => {
        console.log(error);
        res.status(400).send(error);
      });
  } else {
    res.status(400).send({ message: "Invalid request parameter" });
  }
};

exports.getById = async (req, res) => {
  // userModel
  //   .getById({ id: req.params.id })
  //   .then(([row]) => {
  //     res.status(200).json(row);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //     res.status(400).send(error);
  //   });
    try {
      const id = req.params.id;
      const [ [user],[roles] ] = await Promise.all([
        userModel.getById({id: id}),
        userModel.getUserroleById({id: id}),
      ]);
      // prepare hierarchy format 
      const datas = user.map((user,user_index) => {
        const myroles = roles.filter((role) => role.user_id==user.user_id);
        user.roles = myroles; //JSON.stringify(myroles);
        return user;
      })
      return res.status(200).json(datas);
    } catch (error) {
      //console.log(error);
      res.status(400).json(error);
    }



};

exports.createxx = async (req, res) => {
  const datas = req.body;
  datas.cdate = new Date();
  datas.mdate = new Date();
  if (req.body.username) {
    if (datas.password) {
      const saltRound = 10;
      const salt = await bcrypt.genSalt(saltRound);
      datas.password = await bcrypt.hash(datas.password, salt);
    }
    console.log("data: ", datas);
    userModel
      .create({ datas: datas })
      .then(([row]) => {
        console.log("addUser() result:", row);
        console.log("insertId: ", row.insertId);
      })
      .catch((error) => {
        console.log(error);
        res.status(400).send(error);
      });
  } else {
    res.status(400).send({ message: "Invalid request parameter" });
  }
};

exports.listallUser = (req, res) => {
  //console.log("ip=".req.ip);
  userModel
    .listallUser()
    .then(([row]) => {
      //console.log(row);
      res.status(200).json(row);
    })
    .catch((error) => {
      console.log(error);
      // if (error.message) {
      //   return res.status(400).send({ message: error.message });
      // }
      res.status(400).send(error);
    });
};
exports.listallRole = (req, res) => {
  console.log("xxxx");
  userModel
    .listallRole()
    .then(([row]) => {
      //console.log(row);
      res.status(200).json(row);
    })
    .catch((error) => {
      console.log(error);
      // if (error.message) {
      //   return res.status(400).send({ message: error.message });
      // }
      res.status(400).send(error);
    });
};
exports.findById = (req, res) => {
  userModel
    .findById({ id: req.params.id })
    .then(([row]) => {
      res.status(200).json(row);
    })
    .catch((error) => {
      console.log(error);
      // if (error.message) {
      //   return res.status(400).send({ message: error.message });
      // }
      res.status(400).send(error);
    });
};

exports.updateUser = async (req, res) => {
  const id = req.params.id;
  const datas = req.body;
  if (Object.keys(datas).length === 0) {
    // empty datas
    return res.status(400).send({ message: "Invalid request parameter" });
  }
  if (req.params.id) {
    if (datas.password) {
      const saltRound = 10;
      const salt = await bcrypt.genSalt(saltRound);
      datas.password = await bcrypt.hash(datas.password, salt);
    }
    datas.mdate = new Date();
    userModel
      .updateUser({ id: id, datas: datas })
      .then(([row]) => {
        res.status(200).json(row);
      })
      .catch((error) => {
        console.log(error);
        // if (error.message) {
        //   return res.status(400).send({ message: error.message });
        // }
        res.status(400).send(error);
      });
  } else {
    res.status(400).send({ message: "Invalid request parameter" });
  }
};

exports.getUserRole = (req, res) => {
  console.log("getuserrole() user_id=", req.params.id);
  if (req.params.id) {
    userModel
      .getuserrole({ user_id: req.params.id })
      .then(([row]) => {
        res.status(200).json(row);
      })
      .catch((error) => {
        console.log(error);
        res.status(400).send(error);
      });
  } else {
    res.status(400).send("Invalid request parameter");
  }
};

// find samAccountName in activitydb.user.authaccount
// samAccountName it has in Token
// verifytoken middleware it add samAccountName in to res.user_Id
exports.findMeAuth = (req, res) => {
  console.log(req.user_Id);
  if (!req.user_Id) {
    res.status(400).send("invalid request token parameter");
  }
  userModel
    .findMeAuth({ authaccount: req.user_Id })
    .then(([row]) => {
      res.status(200).json(row);
    })
    .catch((error) => {
      console.log(error);
      res.status(400).send(error);
    });
};

exports.isregistered = (req, res) => {
  console.log(req.user_Id);
  if (!req.user_Id) {
    res.status(400).send("invalid request token parameter");
  }
  userModel
    .isregistered({ authaccount: req.user_Id })
    .then(([row]) => {
      res.status(200).json(row);
    })
    .catch((error) => {
      console.log(error);
      res.status(400).send(error);
    });
};

exports.addUserRole = (req, res) => {
  if (!(req.body.user_id && req.body.roleid)) {
    res.status(400).send("invalid request parameter");
  } else {
    userModel
      .addUserRole({ user_id: req.body.user_id, roleid: req.body.roleid })
      .then(([row]) => {
        res.status(200).json(row);
      })
      .catch((error) => {
        console.log(error);
        res.status(400).send(error);
      });
  }
};

exports.getUserInfo = (req, res) => {
  console.log("getUserInfo() authaccount=", req.user_Id);
  if (!req.user_Id) {
    res.status(400).send("invalid request parameter");
  } else {
    userModel
      .getUserInfo({ authaccount: req.user_Id })
      .then(([row]) => {
        res.status(200).json(row);
      })
      .catch((error) => {
        console.log(error);
        res.status(400).send(error);
      });
  }
};
