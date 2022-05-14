const acttypeModel = require("../model/acttype.model");

exports.xfilter = (req, res) => {
  console.log(req.body);
  acttypeModel
    .getAll()
    .then(([row]) => {
      let datas=row;
      console.log(datas);

      let result={
        "metadata":{
          "page":1
        },
        "datas":row
      }
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};


exports.filter = async(req,res) => {
  //console.log('body',req.body);
  //console.log('query',req.query);
  try{
    let page= parseInt( req.query.page );
    let pagesize=parseInt( req.query.pagesize );
    let keyword=req.query.keyword;
  
    const [[_results], [[_count]]] = await Promise.all([
      acttypeModel.filter({page:page,pagesize:pagesize,keyword:keyword}),
      acttypeModel.countfilter({keyword:keyword})
    ]);
    //console.log("_result:",_results);
    //console.log("_count:",_count.value);
    //console.log(_count.value/pagesize); 
    return res.status(200).json(
      {
        currentpage:page,
        totalpage:Math.ceil(_count.value/pagesize),
        pagesize:pagesize,
        currentcount:_count.value,
        datas:_results
      }
    )
  }catch(error){
    console.log(error);
    res.status(400).json(error);
  }
}

exports.getById = (req, res) => {
  acttypeModel
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
    acttypeModel
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
    acttypeModel
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
  console.log(req.body);
  const datas = req.body;
  datas.cdate = new Date();
  datas.mdate = new Date();
  if (req.body.acttypename) {
    console.log("data:", datas);
    acttypeModel
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