require("dotenv").config();
var Spotify = require("node-spotify-api");
var Twitter = require("twitter");
var request = require("request");
var keys = require("./key.js");
var inquirer = require("inquirer");
var fs = require("fs");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

inquirer.prompt([
    {
        type: "list",
        name: "command",
        message: "What would you like to do?",
        choices: ["my-tweets", "spotify-this-song", "movie-this", "do-what-it-says"]
    }
]).then(function (response) {
    switch (response.command) {
        case "my-tweets":
            myTweets();
            break;
        case "spotify-this-song":
            inquirer.prompt([
                {
                    type: "input",
                    name: "song",
                    message: "What song?"
                }
            ]).then(function (song) {
                var userSong = song.song;
                spotifySong(userSong);
            });
            break;
        case "movie-this":
            inquirer.prompt([
                {
                    type: "input",
                    name: "movie",
                    message: "What movie?"
                }
            ]).then(function (movie) {
                var userMovie = movie.movie;
                movieThis(userMovie);
            });
            break;
        case "do-what-it-says":
            doWhatItSays();
            break;
    };
});

function myTweets() {
    var params = { screen_name: 'panda_gamal' };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (error) {
            console.log(error);
        } else {
            for (var i=0; i<tweets.length; i++) {
                console.log("Panda_Gamal: " + tweets[i].text + "\nTweet Created: " + tweets[i].created_at);
            }
        }
    });
}

function spotifySong(song) {

}

function movieThis(movie) {

}

function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        console.log(data);
        spotifySong(data);
    });
};