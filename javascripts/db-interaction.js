"use strict";
// This module has no knowledge of the DOM, or where the data goes after it is fetched from Firebase.
// It is only concerned with getting and setting data in the db
let $ = require('jquery'),
    firebase = require("./firebaseConfig");
// ****************************************
// DB interaction using Firebase REST API
// ****************************************
//get user

function getMovies(user) {//this function grabs all the movies that belong to the user name, this is done by the orderBy = etc
// callout to external data base
//promise
return new Promise(function(resolve,reject){
  $.ajax({
    url:`"https://music-history-boiler-plate.firebaseio.com/songs.json?orderBy="uid"$equalTo="${user}"`//need to update this url with the correct firebase for this project
  }).done(function(movieData){
    resolve(movieData);
  });
});
}
function addMovie(movieFormObj) {//this function adds a movie selection back onto the movie.json that is on the firebase database
  console.log("addMovie", movieFormObj);
  return new Promise(function(resolve, reject){
    $.ajax({
      url:"https://music-history-boiler-plate.firebaseio.com/songs.json",//need to update this url with the correct firebase for this project
      type:'POST',
      data: JSON.stringify(movieFormObj),
      dataType: 'json'
    }).done(function(movieID){
      resolve(movieID);
    }).fail(function(error){
      reject(error);
    });
  });
}
// POST - Submits data to be processed to a specified resource. Takes one parameter.
function deleteMovie(movieID) {
    return new Promise(function(resolve, reject) {
        $.ajax({
            url: `https://music-history-fb486.firebaseio.com/songs/${movieID}.json`,//need to update this url with the correct firebase for this project
            method: "DELETE",
        }).done(()=>{
            resolve();
        });
    });
}
function getMovie(movieID) {
  return new Promise(function(resolve, reject){
    $.ajax({
      url: `https://music-history-fb486.firebaseio.com/songs/${movieID}.json`,//need to update this url with the correct firebase for this project
    }).done(function(movieData){
      resolve(movieData);
    }).fail(function(error){
      reject(error);
    });
  });
}
// GET - Requests/read data from a specified resource
// PUT - Update data to a specified resource. Takes two parameters.

module.exports = {
  getMovies,
  addMovie,
  getMovie,
  deleteMovie,
};