"use strict";

let firebase = require("./firebaseConfig"),
    provider = new firebase.auth.GoogleAuthProvider(),
    currentUser = null;
// function for user, if logged in or not
var logoutBtn = document.getElementById('logout');
var signInBtn = document.getElementById('auth-btn');
firebase.auth().onAuthStateChanged(function(user){
  if (user){
    currentUser = user.uid;
    console.log("currentUser logged in", currentUser);
    logoutBtn.classList.remove('is-hidden');
    signInBtn.classList.add('is-hidden');
  } else {
    currentUser = null;
    console.log("currentUser not logged in!");
    alert("sign in to search movies");
    logoutBtn.classList.add('is-hidden');
    signInBtn.classList.remove('is-hidden');
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