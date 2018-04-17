# liri-node-app

## What is Liri?

Liri is a node based application run in the command line. It allows users to: 
* Pull recent tweets from their Twitter
* Search Spotify for a song and its relevant information
* Search OMDB (Open Movie Database) for a movie and pull its information
* Log and store the information pulled in one convenient location

## How to use Liri

#### Liri requires the user to have a .env file set up with their Twitter and Spotify keys loaded in order to access these accounts for the individual user.

The .env file should be structured like below:
##### Spotify API keys

SPOTIFY_ID=your-spotify-id
SPOTIFY_SECRET=your-spotify-secret

##### Twitter API keys

TWITTER_CONSUMER_KEY=your-twitter-consumer-key
TWITTER_CONSUMER_SECRET=your-twitter-consumer-secret
TWITTER_ACCESS_TOKEN_KEY=your-access-token-key
TWITTER_ACCESS_TOKEN_SECRET=your-twitter-access-token-secret


When run in the command line, Liri will prompt the user for an action to perform, and then any subsequent prompts to complete the request.

All information returned is shown in the terminal and also logged to a log.txt file for easy access and persistence.

#### Liri's design and maintenance by Kristian Fidrych @ kristianfidrych@gmail.com