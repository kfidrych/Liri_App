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
        choices: ["Read my Tweets", "Spotify a Song", "Pull Movie Information", "Do What It Says"]
    }
]).then(function (response) {
    switch (response.command) {
        case "Read my Tweets":
            myTweets();
            break;
        case "Spotify a Song":
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
        case "Pull Movie Information":
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
        case "Do What It Says":
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
            for (var i = 0; i < tweets.length; i++) {
                var logTweetText = ("\nPanda_Gamal: " + tweets[i].text + "\nTweet Created: " + tweets[i].created_at + "\n");
                console.log(logTweetText);
                fs.appendFile("log.txt", "['Command: my-tweets', '" + logTweetText + "']\n", function (err) {
                    if (err) throw err;
                })
            }
        }
    });
};

function spotifySong(song) {
    if (song === "") {
        spotify
            .request('https://api.spotify.com/v1/tracks/3DYVWvPh3kGwPasp7yjahc')
            .then(function (data) {
                var logSpotifyText = ("\nArtist: " + data.artists[0].name +
                    "\nSong title: " + data.name +
                    "\nAlbum name: " + data.album.name +
                    "\nURL Preview: " + data.preview_url + "\n"
                );
                console.log(logSpotifyText);
                fs.appendFile("log.txt", "['Command: spotify-this-song', '" + logSpotifyText + "']\n", function (err) {
                    if (err) throw err;
                })
            })
            .catch(function (err) {
                console.error('Error occurred: ' + err);
            });
    } else {
        spotify
            .search({ type: 'track', query: song })
            .then(function (response) {
                var info = response.tracks.items;
                var logSpotifyText = ("\nArtist: " + info[0].artists[0].name +
                    "\nSong title: " + info[0].name +
                    "\nAlbum name: " + info[0].album.name +
                    "\nURL Preview: " + info[0].preview_url + "\n"
                );
                console.log(logSpotifyText);
                fs.appendFile("log.txt", "['Command: spotify-this-song', '" + logSpotifyText + "']\n", function (err) {
                    if (err) throw err;
                })
            })
            .catch(function (err) {
                console.log(err);
            });
    }
};

function movieThis(movie) {
    var movieName = "";
    if (movie === "") {
        movieName = "Mr+Nobody";
    } else {
        movieName = String(movie);
    }
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
    request(queryUrl, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var info = JSON.parse(body);
            var logMovieText = ("\nMovie Title: " + info.Title +
                "\nYear Released: " + info.Year +
                "\nIMDB Rating: " + info.imdbRating +
                "\nRotten Tomatoes Rating: " + info.Ratings[1].Value +
                "\nCountry Produced: " + info.Country +
                "\nLanguage: " + info.Language +
                "\nPlot: " + info.Plot +
                "\nActors: " + info.Actors + "\n"
            );
            console.log(logMovieText);
            fs.appendFile("log.txt", "['Command: movie-this', '" + logMovieText + "']\n", function (err) {
                if (err) throw err;
            })
        }
    });
};

function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        console.log(data);
        fs.appendFile("log.txt", "['Command: do-what-it-says', '" + data + "']\n", function (err) {
            if (err) throw err;
        })
        spotifySong(data);
    });
};