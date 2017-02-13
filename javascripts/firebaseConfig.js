"use strict";
let firebase = require("firebase/app"),
    fb = require("./fb-getter"),
    fbData = fb();
require("firebase/auth");
require("firebase/database");
var config = {
  apiKey: fbData.apiKey,
  databaseURL: fbData.databaseURL,
  authDomain: fbData.authDomain
};
// firebase.initializeApp(config);
module.exports = firebase;