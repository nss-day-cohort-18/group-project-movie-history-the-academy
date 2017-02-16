'use strict';


let $ = require('jquery'); // Might not be necesary
var firebase = require("./firebaseConfig");

// Gets all movies with specified UID
// function getMovies(user){
//  return new Promise(function(resolve, reject){
//    $.ajax({
//      url: `https://movie-history-6e707.firebaseio.com?orderBy="uid"&equalTo="${user}"`,
//      type: "GET"
//    }).done(function(movieData){
//      console.log("GETMOVIES(): ", movieData);
//      resolve(movieData);
//    }).fail( function(error){
//      console.log("ERROR");
//      reject(error);
//    });
//  });
// }

function getMovies(){
  return new Promise(function(resolve, reject){
    $.ajax({
      // url: `https://movie-history-6e707.firebaseio.com?orderBy="uid"&equalTo="${user}"`
      url: `https://movie-history-6e707.firebaseio.com/movies.json`,
      type: "GET"
    }).done( function(movieData){
      resolve(movieData);
    }).fail( function(error){
      console.log("ERROR");
      reject(error);
    });
  });
}


// Adds a movie (with a UID)
function addMovie(movieObject){
  console.log("Adding Song: ", movieObject);

  return new Promise(function(resolve, reject){
    $.ajax({
      url: `https://movie-history-6e707.firebaseio.com`,
      type: "POST",
      data: JSON.stringify(movieObject),
      dataType: "json"
    }).done( function(movieID){
      resolve(movieID);
    });
  });
}

// Deletes a movie using the movie's UID
function deleteMovie(movieID){
  return new Promise( function(resolve, reject){
    $.ajax({ 
      url: `https://movie-history-6e707.firebaseio.com/movies/${movieID}.json`,
      method: "DELETE"
    }).done( function(){
      resolve();
    });
  });
}


function searchFirebase(searchString){
    return new Promise(function(resolve, reject){
        var foundMovies = [];
        $.ajax({
            // url: `https://movie-history-6e707.firebaseio.com?orderBy="uid"&equalTo="${user}"`
            url: `https://movie-history-6e707.firebaseio.com/movies.json`,
            type: "GET"
        }).done( function(movieData){
            for(var i = 0; i < movieData.length; i++){
                if(movieData[i].title.includes(searchString)){
                    foundMovies.push(movieData[i]);
                }
            }
            resolve(foundMovies);
        }).fail( function(error){
            console.log("ERROR");
            reject(error);
        });
    });
}

module.exports = {getMovies, addMovie, deleteMovie, searchFirebase};