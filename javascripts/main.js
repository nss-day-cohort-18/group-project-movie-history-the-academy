"use strict";

let $ = require('jquery'),
    db = require("./db-interaction"),
    templates = require("./dom-movie-builder"),
    user = require("./user"),
    api = require("./api-interaction.js");

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

        // Hide or show divs
		$("#searchbar").val("");
		$(".hidden-div").hide();
		$("#search-results").show();
		$("#current-list-visible").html("My Movie Search");

        // Declare variables to receive search results
        var firebaseMovies = [];
        var searchedMovies = [];

        // Look for instances of the searched string in the database
        db.searchFirebase(input)
        .then( function(firebaseResults){
            firebaseMovies = firebaseResults;
        });

        // Search for instances of the string using the API
        api.searchFor(input)
        .then( function(apiResult){
            searchedMovies = apiResult.results;
        })
        // Then find duplicates among the two arrays of movies
        .then( function(){
            console.log("Searched: ", searchedMovies);
            console.log("Found: ", firebaseMovies);
            findDuplicates(searchedMovies, firebaseMovies);
        });
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



// Finds duplicates among movies searched in (1) The Api and (2) Firebase
function findDuplicates(searchedMovies, firebaseMoviesFound){
    var i, j;


    console.log("[FIND] Searched: ", searchedMovies);
    console.log("[FIND] DB: ", firebaseMoviesFound);

    var combinedMoviesToShow = searchedMovies;


    for(i = 0; i < searchedMovies.length; i++){
        for(j = 0; j < firebaseMoviesFound.length; j++){
            if(searchedMovies[i].id === firebaseMoviesFound[j].id){
                // Id the DB movie(s) are already in the search results:
                console.log("DUPLICATE!!: ", searchedMovies[i].title);
                // Do nothing
            }else{
                // If the DB movies are NOT included in the search results:
                // DO NOTHING
            }
        }
    }
    console.log("FINAL MOVIES THAT WILL POPULATE THE DOM (upon hitting enter):\n", combinedMoviesToShow);
}


