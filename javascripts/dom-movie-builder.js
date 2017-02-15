"use strict";

//this file will build the movie cards and push them to the dom

let $ = require('jquery');
let Handlebars = require('hbsfy/runtime');



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
