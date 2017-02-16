"use strict";

//this file will build the movie cards and push them to the dom

let $ = require('jquery');
let Handlebars = require('hbsfy/runtime');
let user = require("./user.js");
let db = require("./db-interaction.js");

// function that adds cards for the movies that match the search term
function showSearch(movieData) {
    $("#search-results").html("");
    console.log('showSearch initiated');
    // console.log('movieData.length = ', movieData.results.length);
    var moviesArray = movieData.results;
    for (var i = 0; i < moviesArray.length; i++) {
        // console.log('moviesArray[i] = ', moviesArray[i]);
        $("#search-results").append(
                                    `<section id="card-${moviesArray[i].id}" class="card-wrapper col-xs-4" >
                                        <div class="innerCard" style="border: 2px solid black">
                                            <h3 class="movie-header">${moviesArray[i].title}</h3>
                                            <h4 class="movie-year">${moviesArray[i].release_date.slice(0, 4)}</h4>
                                            <img src="https://image.tmdb.org/t/p/w500${moviesArray[i].poster_path}" height="200" >
                                            <h5>No actors listed</h5>
                                            <button type="button" class="add-to-my-movies" value="${moviesArray[i].title}">I want to see this movie</button>
                                            <div class="stars">
                                              <form action="">
                                                <h6>Rate to add to watched movie list:</h6>
                                                <input class="star star-1 radio_item" value="1" id="star-1" type="radio" name="star"/>
                                                <label class="star star-1 label_item" title="1 Star" for="star-1">1★</label>
                                                <input class="star star-2 radio_item" value="2" id="star-2" type="radio" name="star"/>
                                                <label class="star star-2 label_item" title="2 Stars" for="star-2">2★</label>
                                                <input class="star star-3 radio_item" value="3" id="star-3" type="radio" name="star"/>
                                                <label class="star star-3 label_item" title="3 Stars" for="star-3">3★</label>
                                                <input class="star star-4 radio_item" value="4" id="star-4" type="radio" name="star"/>
                                                <label class="star star-4 label_item" title="4 Stars" for="star-4">4★</label>
                                                <input class="star star-5 radio_item" value="5" id="star-5" type="radio" name="star"/>
                                                <label class="star star-5 label_item" title="5 Stars" for="star-5">5★</label>
                                                <input class="star star-6 radio_item" value="6" id="star-6" type="radio" name="star"/>
                                                <label class="star star-6 label_item" title="6 Stars" for="star-6">6★</label>
                                                <input class="star star-7 radio_item" value="7" id="star-7" type="radio" name="star"/>
                                                <label class="star star-7 label_item" title="7 Stars" for="star-7">7★</label>
                                                <input class="star star-8 radio_item" value="8" id="star-8" type="radio" name="star"/>
                                                <label class="star star-8 label_item" title="8 Stars" for="star-8">8★</label>
                                                <input class="star star-9 radio_item" value="9" id="star-9" type="radio" name="star"/>
                                                <label class="star star-9 label_item" title="9 Stars" for="star-9">9★</label>
                                                <input class="star star-10 radio_item" value="10" id="star-10" type="radio" name="star"/>
                                                <label class="star star-10 label_item" title="10 Stars" for="star-10">10★</label>
                                              </form>
                                            </div>
                                        </div>
                                    </section>`);
    }
    // $(".add-to-my-watched-movies").click(addToWatched);
    $(".add-to-my-movies").click(db.addToMyMovies);
}

// Helper functions for forms stuff. Nothing related to Firebase
// Build a movie obj from form data.
// function buildMovieObj() {//this function needs work, but I don't want to mess with it quite yet
//     let movieObj = {
//     title: $("#form--title").val(),
//     artist: $("#form--artist").val(),
//     album: $("#form--album").val(),
//     year: $("#form--year").val()
//   };
//   return movieObj;
// }


// function createHTML(searchResult) {
// 	var movieTemplate = document.getElementById('movie-cards').innerHTML;
// 	var compiledTemplate = Handlebars.compile(movieTemplate);
// 	var newGeneratedHTML = compiledTemplate(searchResult);
// 	console.log("movieTemplate", movieTemplate);

// 	//the next two lines of code put the result of the template into the empty div that the user will see
// 	var movieContainer = document.getElementById('movie-container');
// 	movieContainer.innerHTML = newGeneratedHTML;

// }


//probably need to use the first part of the below link for grabbing the poster from the api
//https://image.tmdb.org/t/p/w500/kqjL17yufvn9OVLyXYpvtyrFfak.jpg

module.exports = {showSearch};
