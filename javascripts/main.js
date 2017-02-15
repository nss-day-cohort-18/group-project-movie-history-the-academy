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
    var idArray = Object.keys(movieData.results);//putting all the keys (in this case, movie names) from the movie list on firebase
    idArray.forEach(function(key){
      movieData[key].id = key;//this function is getting all of movie ids that are tied to the movie names, preparing the info to be sent into the function that will make the movie list
    });
    console.log("movie object with id", movieData);
    templates.createHTML(movieData);//this is a function on the dom-movie-builder file. 
  });
}
// loadMoviesToDOM(); //<--Move to auth section after adding login btn
function loadUserMovies(argument) {
    let currentUser = user.getUser();//setting the currentUser info to a variable of the same name
    db.getMovies(currentUser);//running the user info through the getMovies function, gets all movies out of firebase that are tied to this user's uid
    console.log("currentUser", currentUser);
}

// Send newSong data to db then reload DOM with updated song data
$(document).on("click", ".save_new_btn", function() {
  console.log("click save new movie");
  let movieObj = buildMovieObj();
  db.addMovie(movieObj)
  .then(function(movieID){
    loadUserMovies(); //<--Move to auth section after adding login btn
  });
});

// Remove song then reload the DOM w/out new song
$(document).on("click", ".delete-btn", function() {
  console.log("clicked the delete movie", $(this).data("delete-id"));
  let movieID = $(this).data("delete-id");
  db.deleteMovie(movieID)
  .then(()=>{
    loadMoviesToDOM();
  });
});
// $("#view-songs").click(function(){
//   $(".uiContainer--wrapper").html("");
//   loadMoviesToDOM();
// });
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
// Load the new movie form
$("#add-movie").click(function() {
  console.log("clicked add movie");
  var movieForm = templates.movieForm()
  .then(function(songForm) {
    $(".uiContainer--wrapper").html(movieForm);
  });
});

//this is the beginning of the function to run a api search on the enter key
var something = document.getElementById('searchbar');
something.addEventListener('keyup', EnterSearch);
function EnterSearch(event) {
  if (event.keyCode === 13){
    var searchResult = document.getElementById('searchbar').value;
    console.log("searchResult", searchResult);
    loadMoviesToDOM(searchResult);
  }
}





