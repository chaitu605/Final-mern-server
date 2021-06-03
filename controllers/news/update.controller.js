exports.update = (req, res) => {
  const db = require("../../models");
  const News = db.News;
  const id = req.params.id;

  if (!req.body) {
    res.status(500).send({
      message: `Data to update cannot be Empty`,
    });
  }
  News.findByIdAndUpdate(id, req.body, {
    useFindAndModify: false,
  })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Data with ${id}`,
        });
      } else
        res.send({
          message: `Updated Sucessfully`,
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Some Error Occured!`,
      });
    });
};
