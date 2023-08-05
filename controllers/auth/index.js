const register = require("./register");
const login = require("./login");
const logout = require("./logout");
const getCurrent = require("./getCurrent");
const updateSubscription = require("./updateSubscription");
const updateAvatar = require("./updateAvatar");
const verifyEmail = require("./verifyEmail");
const reverifyEmail = require("./reverifyEmail");

module.exports = {
  register,
  verifyEmail,
  reverifyEmail,
  login,
  getCurrent,
  logout,
  updateSubscription,
  updateAvatar,
};