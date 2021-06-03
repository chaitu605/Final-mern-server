module.exports = (app) => {
  const Add = require("../controllers/news/add.controller");
  const FindAll = require("../controllers/news/findAll.controller");
  const FindOne = require("../controllers/news/findOne.controller");
  const Update = require("../controllers/news/update.controller");
  const Delete = require("../controllers/news/delete.controller");

  var router = require("express").Router();

  //add router
  router.post("/", Add.add);

  //findall
  router.get("/", FindAll.findAll);

  //findone
  router.get("/:id", FindOne.findOne);

  //update
  router.put("/:id", Update.update);

  //delete
  router.delete("/:id", Delete.delete);

  app.use("/api/news", router);
};
