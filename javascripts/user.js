"use strict";
let firebase = require("./firebaseConfig"),
    provider = new firebase.auth.GoogleAuthProvider(),
    currentUser = null;
// function for user, if logged in or not
firebase.auth().onAuthStateChanged(function(user){
  if (user){
    console.log("currentUser logged in", currentUser);
    currentUser = user.uid;
  } else {
    currentUser = null;
    console.log("currentUser not logged in");
  }
});
// function for how to sign in
function logInGoogle() {
return firebase.auth().signInWithPopup(provider);
}
//function to log out
function logOut(){
  return firebase.auth().signOut();
}
// get user id
function getUser(){
  return currentUser;
}
function setUser(val){
  currentUser = val;
}
//sending function from page
module.exports = {logInGoogle, logOut, getUser, setUser};