const registerModel = require("../model/register.model");

exports.create = async (req, res) => {
  const user_id = req.body.user_id||undefined;
  const activity_id = req.body.activity_id||undefined;  
  //const datas = req.body;
  //datas.cdate = new Date();
  //datas.mdate = new Date();
  if (user_id && activity_id) {
    //console.log("data:", datas);
    registerModel.create({ datas: {user_id:user_id,activity_id:activity_id }})
      .then(([row]) => {
        console.log("create()->result:", row);
        res.status(200).json(row);
      })
      .catch((error) => {
        console.log(error.message);
        res.status(400).send(error);
      });
  } else {
    res.status(400).send({ message: "Invalid request parameter" });
  }
};


exports.approve = async (req, res) => {
  const register_id = req.params.register_id;
  if (register_id) {
    registerModel.approve(register_id)
      .then(([row]) => {
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

exports.approves = async (req,res) => {
  const register_id = req.body.register_id;
  if(!Array.isArray(register_id)){
    res.status(400).send("Invalid parameter!");
  }else{
    registerModel.approves(register_id)
    .then(([row])=>{
      res.status(200).json(row);
    })
    .catch((error)=>{
      console.log(error);
    });
  }
}











exports.filter = async (req, res) => {
  try {
    let page = parseInt(req.query.page) || 1;
    let pagesize = parseInt(req.query.pagesize) || 10;
    let keyword = req.query.keyword || "";
    const [[_results], [[_count]]] = await Promise.all([
      registerModel.filter({
        page: page,
        pagesize: pagesize,
        keyword: keyword,
      }),
      registerModel.countfilter({ keyword: keyword }),
    ]);
    return res.status(200).json({
      currentpage: page,
      totalpage: Math.ceil(_count.value / pagesize),
      pagesize: pagesize,
      itemscount: _count.value,
      items: _results,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};


exports.current = async (req, res) => {
  try {
    let page = parseInt(req.query.page) || 1;
    let pagesize = parseInt(req.query.pagesize) || 10;
    const [[_results], [[_count]]] = await Promise.all([
      registerModel.current({
        page: page,
        pagesize: pagesize,
      }),
      registerModel.countCurrent({ keyword: '' }),
    ]);
    return res.status(200).json({
      currentpage: page,
      totalpage: Math.ceil(_count.value / pagesize),
      pagesize: pagesize,
      itemscount: _count.value,
      items: _results,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

exports.getById = (req, res) => {
  registerModel
    .getById({ id: req.params.id })
    .then(([row]) => {
      res.status(200).json(row);
    })
    .catch((error) => {
      console.log(error);
      res.status(400).send(error);
    });
};

exports.delete = (req, res) => {
  if (req.params.id) {
    registerModel
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
    delete datas.cdate;
    datas.mdate = new Date();
    registerModel
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

// exports.create = async (req, res) => {
//   console.log(req.body);
//   const datas = req.body;
//   datas.cdate = new Date();
//   datas.mdate = new Date();
//   console.log();
//   if (req.body.register_name) {
//     console.log("data:", datas);
//     registerModel
//       .create({ datas: datas })
//       .then(([row]) => {
//         console.log("create()->result:", row);
//         res.status(200).json(row);
//       })
//       .catch((error) => {
//         console.log(error);
//         res.status(400).send(error);
//       });
//   } else {
//     res.status(400).send({ message: "Invalid request parameter" });
//   }
// };

const uploadFile = require("../middleware/upload");
const { async } = require("rxjs");
exports.upload = async (req, res) => {
  console.log("upload()");
  console.log(req.body);
  console.log(req.files);
  try {
    uploadFile(req, res, function (err) {
      if (err) {
        console.log(err);
        res.status(400).send(err);
        //res.status(401).send("Upload failed!");// เขียน DB ไม่ได้ ต้องกลับไปลบ ไฟล์ออกด้วย
      } else {
        registerModel
          .updatePoster({ 
            id: req.body.id,
            filename: req.file.originalname,
            caption: req.body.caption,
          })
          .then(([row]) => {
            console.log("updatePoster()->result:", row);
            if (row.affectedRows == 1) {
              res
                .status(200)
                .send({
                  message:
                    "Uploaded the file successfully: " + req.file.originalname,
                });
            } else {
              res.status(401).send("Upload failed!"); // เขียน DB ไม่ได้ ต้องกลับไปลบ ไฟล์ออกด้วย
            }
          })
          .catch((error) => {
            console.log(error);
            res.status(400).send(error);
          });
      }
    });


    //await uploadFile(req, res);
    // if (req.file == undefined) {
    //   return res.status(400).send({ message: "Please upload a file!" });
    // }
    // registerModel.updatePoster({id:req.body.id,filename:req.file.originalname,caption:req.body.caption})
    // .then(([row])=>{
    //   console.log("updatePoster()->result:", row);
    //   if(row.affectedRows==1){
    //     res.status(200).send({ message: "Uploaded the file successfully: " + req.file.originalname,  });
    //   }else{
    //     res.status(401).send("Upload failed!");// เขียน DB ไม่ได้ ต้องกลับไปลบ ไฟล์ออกด้วย
    //   }
    // })
    // .catch((error)=>{
    //   console.log(error);
    //   res.status(400).send(error);
    // })

  } catch (err) {
    console.log(`${err}`);
    res.status(500).send({
      message: `${err}`,
    });
  }
};
