const facultyModel = require("../model/faculty.model");

exports.filter = async(req,res) => {
  try{
    let page = parseInt( req.query.page )||1;
    let pagesize=parseInt( req.query.pagesize )||10;
    let keyword= req.query.keyword||'';
    const [[_results], [[_count]]] = await Promise.all([
      facultyModel.filter({page:page,pagesize:pagesize,keyword:keyword}),
      facultyModel.countfilter({keyword:keyword})
    ]);
    return res.status(200).json(
      {
        currentpage:page,
        totalpage:Math.ceil(_count.value/pagesize),
        pagesize:pagesize,
        itemscount:_count.value,
        items:_results
      }
    )
  }catch(error){
    console.log(error);
    res.status(400).json(error);
  }
}

exports.getById = (req, res) => {
  facultyModel
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
    facultyModel
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
    facultyModel
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
  if (req.body.facultyname) {
    console.log("data:", datas);
    facultyModel
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