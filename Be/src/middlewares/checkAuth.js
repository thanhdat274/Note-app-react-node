const { expressjwt: expressJwt } = require("express-jwt");

exports.requireSignin = expressJwt({
  algorithms: ["HS256"],
  secret: "123456",
  requestProperty: "auth", // req.auth
});