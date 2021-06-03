const mongoose = require("mongoose");
const config = require("../config/db.config");

mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.user = require("./user.model");
db.role = require("./roles.model");
db.News = require("./news.model")(mongoose);
db.url = config.url;

db.Roles = ["user", "admin", "moderator"];

module.exports = db;
