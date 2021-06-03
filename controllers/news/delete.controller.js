exports.delete = (req, res) => {
  const db = require("../../models");
  const News = db.News;

  const id = req.params.id;
  //Delete data from mongodb
  News.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot Delete Data with ID ${id}`,
        });
      } else res.send({ message: "Deleted Sucessfully" });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some Error Occured!",
      });
    });
};
