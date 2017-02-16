"use strict";

let $ = require('jquery');
let config = require("./firebaseConfig.js");


function searchFor(searchResult) {

	console.log("searchResult", searchResult);
	return new Promise(function(resolve,reject){
		$.ajax({
	    	url:`https://api.themoviedb.org/3/search/movie?api_key=e891491a45e46c6e7b42d5373e731739&query=${searchResult}`
		}).done(function(movieData){
			console.log("[API] MovieData: ", movieData);
    		resolve(movieData);
  		}).fail( function(error){
  			console.log("API ERRPR");
  			reject(error);
  		});
	});
}

module.exports = {searchFor};