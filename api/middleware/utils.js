exports.trimmer = function (req, res, next) {
  //console.log(req.body);
  if (req.body) {
    for (const [key, value] of Object.entries(req.body)) {
      if (typeof value === "string") {
        req.body[key] = value.trim();
      }
    }
  }
  next();
};
exports.debugShowURL = function (req, res, next) {
  console.log(req.method.toUpperCase() +' '+req.protocol + "://" + req.get("host") + req.originalUrl);
  next();
};
