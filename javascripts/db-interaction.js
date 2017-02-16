'use strict';


let $ = require('jquery'); // Might not be necesary
var firebase = require("./firebaseConfig");
var user = require("./user.js");

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

function getMovies(searchResult){
  console.log('searchResult = ', searchResult);
  return new Promise(function(resolve, reject){
    $.ajax({
      // url: `https://movie-history-6e707.firebaseio.com?orderBy="uid"&equalTo="${user}"`
      url: `https://api.themoviedb.org/3/search/movie?api_key=56696d263700546dd8f63b84a5e3d534&query=${searchResult}`,
      type: "GET"
    }).done( function(movieData){
      // var movies = Object.values("movieData");
      resolve(movieData);
    }).fail( function(error){
      console.log("ERROR");
      reject(error);
    });
  });
}


// function that adds movie to the database
function addToMyMovies() {
    console.log('you clicked I want to see this movie');
    var currentCard = $(event.currentTarget);
    console.log('url:', currentCard.siblings("img").attr("src"));
    var currentUser = user.getUser();
    var myMovie = {
        "title": currentCard.siblings("h3").html(),
        "year": currentCard.siblings("h4").html(),
        "actors": currentCard.siblings("h5").html(),
        "userID": currentUser,
        "rating": "",
        "posterURL": currentCard.siblings("img").attr("src")
    };
    return new Promise (function(resolve, reject) {
        $.ajax({
            url: "https://movie-history-6e707.firebaseio.com/movies.json",
            type: "POST",
            data: JSON.stringify(myMovie),
            dataType: "json"
        }).done(function(movie) {
            resolve(movie);
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
        var tempMovie;
        $.ajax({
            // url: `https://movie-history-6e707.firebaseio.com?orderBy="uid"&equalTo="${user}"`
            url: `https://movie-history-6e707.firebaseio.com/movies.json`,
            type: "GET"
        }).done( function(movieData){
            for(var i = 0; i < movieData.length; i++){
              tempMovie = movieData[i].title.toLowerCase();
                if(tempMovie.includes(searchString)){
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

function getAllMovies(){
  return new Promise(function(resolve, reject){
    $.ajax({
      // url: `https://movie-history-6e707.firebaseio.com?orderBy="uid"&equalTo="${user}"`
      url: `https://movie-history-6e707.firebaseio.com/movies.json`,
      type: "GET"
    }).done( function(movieData){
        var movies = Object.values(movieData);
        resolve(movies);
    }).fail( function(error){
      console.log("ERROR");
      reject(error);
    });
  });
}

module.exports = {getMovies, addToMyMovies, deleteMovie, searchFirebase, getAllMovies};

