module.exports = (mongoose) => {
  //Schema is Defination of document
  var schema = mongoose.Schema(
    {
      title: String,
      news: String,
      published: String,
      author: String,
    },
    {
      timestamps: true,
    }
  );
  //convert _id to id
  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const News = mongoose.model("news", schema);
  return News;
};
