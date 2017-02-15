"use strict";

let $ = require('jquery'),
    db = require("./db-interaction"),
    templates = require("./dom-movie-builder"),
    user = require("./user");
user.logOut();
// Using the REST API
function loadMoviesToDOM(searchResult) {
  console.log("Where the movies at??");
  db.getMovies(searchResult)
  .then((movieData)=>{//movieData comes from the getMovies function, by the resolution of the Promise
    console.log("got data", movieData);
    var idArray = Object.keys(movieData);//putting all the keys (in this case, movie names) from the movie list on firebase
    idArray.forEach(function(key){
      console.log("MovieData[i]: ", movieData[key]);
      movieData[key].id = key;//this function is getting all of movie ids that are tied to the movie names, preparing the info to be sent into the function that will make the movie list
    });
    console.log("movie object with id", movieData);

    // NEED TO POPULATE DOM HERE

  });
}



$("#auth-btn").click(function(){
  console.log("clicked auth");
  user.logInGoogle()
  .then(function(results){
    console.log("result from login", results.user.uid);
    user.setUser(results.user.uid);
  });
});

$("#logout").click(function(){
  console.log("clicked log out");
  user.logOut();
  // loadMoviesToDOM();
});


// Helper functions for forms stuff. Nothing related to Firebase
// Build a movie obj from form data.
function buildMovieObj() {//this function needs work, but I don't want to mess with it quite yet
    let movieObj = {
    title: $("#form--title").val(),
    artist: $("#form--artist").val(),
    album: $("#form--album").val(),
    year: $("#form--year").val()
  };
  return movieObj;
}




//this is the beginning of the function to run a api search on the enter key

$("#searchbar").on('keyup', EnterSearch);
function EnterSearch(event) {
  if (event.keyCode === 13){
    var searchResult = document.getElementById('searchbar').value;
    console.log("searchResult", searchResult);
    loadMoviesToDOM(searchResult);
  }
}





