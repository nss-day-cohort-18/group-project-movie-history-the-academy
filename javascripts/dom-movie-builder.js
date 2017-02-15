"use strict";

//this file will build the movie cards and push them to the dom

let $ = require('jquery');
let Handlebars = require('hbsfy/runtime');
// function makeMovieList(movieData) {
// 	let $movieDisplay =
// };

//this takes the handlebars template and creates the cards by looping through the api file to list all the search results
//may have to put a loop in here to cut the output of search results.
function createHTML(searchResult) {
	var movieTemplate = document.getElementById('movie-cards').innerHTML;
	var compiledTemplate = Handlebars.compile(movieTemplate);
	var newGeneratedHTML = compiledTemplate(searchResult);
	console.log("movieTemplate", movieTemplate);

	//the next two lines of code put the result of the template into the empty div that the user will see
	var movieContainer = document.getElementById('movie-container');
	movieContainer.innerHTML = newGeneratedHTML;

}


//probably need to use the first part of the below link for grabbing the poster from the api
//https://image.tmdb.org/t/p/w500/kqjL17yufvn9OVLyXYpvtyrFfak.jpg
