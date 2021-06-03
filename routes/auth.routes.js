const { verifySignUp } = require("../middlewares");
const signInController = require("../controllers/signIn");
const signUpController = require("../controllers/signUp");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameorEmail,
      verifySignUp.checkRolesExisted,
    ],
    signUpController.signup
  );

  app.post("/api/auth/signin", signInController.signin);
};
