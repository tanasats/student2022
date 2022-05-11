const userModel = require("../model/user.model");
//const bcrypt = require("bcrypt");

exports.filter = (req,res) => {
  //console.log(req);
  userModel
    .getUser()
    .then(([row]) =>{
      res.status(200).json(row);
    })
    .catch((error) => {
      res.status(500).send(error);
    })
}

exports.create = async (req, res) => {
  const datas = req.body;
  //datas.fullname = req.body.fullname;
  datas.cdate = new Date();
  datas.mdate = new Date();
  if (req.body.authaccount) {
    if (datas.password) {
      const saltRound = 10;
      const salt = await bcrypt.genSalt(saltRound);
      datas.password = await bcrypt.hash(datas.password, salt);
    }
	console.log('data: ',datas);
    userModel
      .addUser({ datas: datas }) 
      .then(([row]) => {
		  console.log('addUser() result:',row);
		  console.log('insertId: ',row.insertId);
		  if(datas.authtype && datas.authtype=='student'){
			 userModel.addUserRole({userid:row.insertId,roleid:1})  
			 .then(([row1]) => {
				res.status(200).json(row1); 
			 })
			 .catch((error) => {
				res.status(400).send(error);
			 })
			 .finally(() => { })
		  }else{
			res.status(200).json(row);
		  }
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


exports.create = async (req, res) => {
  const datas = req.body;
  //datas.fullname = req.body.fullname;
  datas.cdate = new Date();
  datas.mdate = new Date();
  if (req.body.authaccount) {
    if (datas.password) {
      const saltRound = 10;
      const salt = await bcrypt.genSalt(saltRound);
      datas.password = await bcrypt.hash(datas.password, salt);
    }
	console.log('data: ',datas);
    userModel
      .addUser({ datas: datas }) 
      .then(([row]) => {
		  console.log('addUser() result:',row);
		  console.log('insertId: ',row.insertId);
		  if(datas.authtype && datas.authtype=='student'){
			 userModel.addUserRole({userid:row.insertId,roleid:1})  
			 .then(([row1]) => {
				res.status(200).json(row1); 
			 })
			 .catch((error) => {
				res.status(400).send(error);
			 })
			 .finally(() => { })
		  }else{
			res.status(200).json(row);
		  }
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
	console.log('getuserrole() userid=',req.params.id);
if (req.params.id) 
  {	
	userModel
	.getuserrole({userid: req.params.id})
	.then(([row])=>{
		res.status(200).json(row);
	})
	.catch((error) => {
		console.log(error);
		res.status(400).send(error);
	});
  } else {
    res.status(400).send("Invalid request parameter");
  }	
}

// find samAccountName in activitydb.user.authaccount
// samAccountName it has in Token
// verifytoken middleware it add samAccountName in to res.userId
exports.findMeAuth = (req,res) => {
	console.log(req.userId);
	if(!req.userId){
		res.status(400).send("invalid request token parameter");
	}
	userModel
	.findMeAuth({authaccount: req.userId})
	.then(([row]) => {
		res.status(200).json(row); 
	})
	.catch((error) => {
		console.log(error);
		res.status(400).send(error);
	})
}

exports.isregistered = (req,res) => {
	console.log(req.userId);
	if(!req.userId){
		res.status(400).send("invalid request token parameter");
	}
	userModel
	.isregistered({authaccount: req.userId})
	.then(([row]) => {
		res.status(200).json(row); 
	})
	.catch((error) => {
		console.log(error);
		res.status(400).send(error);
	})
}


exports.addUserRole = (req,res) => {
	if(!(req.body.userid && req.body.roleid)){
		res.status(400).send("invalid request parameter");
	}else{
		userModel
		.addUserRole({userid:req.body.userid,roleid:req.body.roleid})
		.then(([row]) =>{
			res.status(200).json(row);
		}).
		catch((error) => {
			console.log(error);
			res.status(400).send(error);
		})
	}
} 

exports.getUserInfo = (req,res) => {
	console.log('getUserInfo() authaccount=',req.userId);
	if(!req.userId){
		res.status(400).send("invalid request parameter");
	}else{
		userModel
		.getUserInfo({authaccount: req.userId})
		.then(([row]) => {
			res.status(200).json(row); 
		})
		.catch((error) => {
			console.log(error);
			res.status(400).send(error);
		})
	}
}
