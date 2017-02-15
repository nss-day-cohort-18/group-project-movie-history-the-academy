"use strict";

//this file will build the movie cards and push them to the dom

let $ = require('jquery');
let Handlebars = require('hbsfy/runtime');
let user = require("./user.js");


function addSearched(movieData) {
    console.log('addSearched initiated');
    console.log('movieData.length = ', movieData.length);
    for (var i = 0; i < movieData.length; i++) {
        console.log('movieData[i] = ', movieData[i]);
        $("#suggested-movies").append(
                                        `<section id="card-${movieData[i]}" class="card-wrapper col-xs-4" >
                                            <div class="innerCard" style="border: 2px solid black">
                                                <h3 class="movie-header">${movieData[i].title}</h3>
                                                <h4 class="movie-year">${movieData[i].year}</h4>
                                                <img src="${movieData[i].posterURL}" height="200" >
                                                <h5>${movieData[i].actors}</h5>
                                                <button type="button" class="add-to-my-movies" value="${movieData[i].title}">I want to see this movie</button>
                                                <button type="button" class="add-to-my-watched-movies" value="add-to-my-watched-movies">I seen this movie</button>
                                            </div>
                                        </section>`);
    }
    // $(".add-to-my-watched-movies").click(addToWatched);
    $(".add-to-my-movies").click(addToMyMovies);
}


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
