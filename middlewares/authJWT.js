const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const { user } = require("../models");

const db = require("../models");

const User = db.user;
const Role = db.role;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No Token Provided",
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized",
      });
    }
    req.userid = decoded.id;
  });
};

isAdmin = (req, res, next) => {
  User.findByID(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({
        message: err,
      });
    }
  });
  Role.find(
    {
      _id: { sin: user.roles },
    },
    (err, roles) => {
      if (err) {
        res.status(500).send({
          message: err,
        });
      }
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }
      res.status(403).send({
        message: "Requies Admin Role",
      });
    }
  );
};
isModerator = (req, res, next) => {
  User.findByID(req.userId).exec((err, user) => {
    if (err) {
      req.status(500).send({
        message: err,
      });
    }

    Role.find(
      {
        _id: { sin: user.roles },
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({
            message: err,
          });
        }
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "moderator") {
            next();
            return;
          }
        }
        res.status(403).send({
          message: "Requies Moderator Role",
        });
      }
    );
  });
};

const authJWT = {
  verifyToken,
  isAdmin,
  isModerator,
};
module.exports = authJWT;
