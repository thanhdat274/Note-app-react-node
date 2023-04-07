const { expressjwt: expressJwt } = require("express-jwt");

export const requireSignin = expressJwt({
  algorithms: ["HS256"],
  secret: "123456",
  requestProperty: "auth", // req.auth
});