"use strict";

let $ = require('jquery'),
    db = require("./db-interaction"),
    templates = require("./dom-movie-builder"),
    user = require("./user");
user.logOut();

$( document ).ready(function() {
// Hides buttons and divs until logged in
  $(".select-button").hide();
  $(".hidden-div").hide();
});
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
    $(".select-button").show();
    $("#current-list-visible").html("My Movies");

  });
});

$("#logout").click(function(){
  console.log("clicked log out");
  user.logOut();
  $(".select-button").hide();
  $(".hidden-div").hide();
  $("#current-list-visible").html("");
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




// Listener for the search box
$("#searchbar").keypress(function(e) {
	showSearch(e);
});

// When searching and pressing enter, hides all Divs then shows the My Searched Movie DIV
// and adds which current list you are looking at in h2
function showSearch(e) {
	if (e.keyCode == '13') {
		let input = $("#searchbar").val();
		$("#searchbar").val("");
		console.log("Input: ", input);
		$(".hidden-div").hide();
		$("#search-results").show();
		$("#current-list-visible").html("My Movie Search");
	}
}

// Listeners on buttons to add backgrounds to active button and hides other associated
// Divs while showing DIV associated with that button
$(".select-button").click(function(event) {
	$(".hidden-div").hide();
  if (event.currentTarget.id === "search-results-btn") {
		$("#current-list-visible").html("My Movie Search");
		$("#search-results").show();
  }
  if (event.currentTarget.id === "unwatched-btn"){
		$("#current-list-visible").html("My Unwatched Movies");
		$("#my-movies").show();
  }
  if (event.currentTarget.id === "watched-btn") {
		$("#current-list-visible").html("My Watched Movies");
		$("#my-watched-movies").show();
	}
	if (event.currentTarget.id === "favorites-btn") {
		$("#current-list-visible").html("My Favorites");
		$("#favorites").show();
	}
});
