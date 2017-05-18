var Twitter = require('twitter');
var fs = require('fs');
var request = require('request');
var prettyjson = require("prettyjson");

var cachedtweet;
var currenttweet;

var client = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN_KEY,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

module.exports = {
  get_tweet: function() {
    var channel, content = "";
    var tweet = [channel, content];
    client.stream('statuses/filter', {follow: '753346461849354240,27171880,174307074,365528029,2420931980,3065618342', filter_level: 'low', language: 'en'}, function(stream){
      console.log("Stream Started");
      stream.on('data', function(tweet){
        if(tweet.user.name == undefined){ var name = tweet.user.screen_name; } else { var name = tweet.user.name; }
        if ((name.startsWith("Exiled") || name.startsWith("MMO-Champion") || name.startsWith("BlizzardCS")) &&  !(tweet.text.startsWith("@") || tweet.text.startsWith("RT") || tweet.text.startsWith("**Current Wait Times**"))) {
          currenttweet = tweet.text;
          console.log(tweet.text);
          if (currenttweet !== cachedtweet) {
            cachedtweet = currenttweet;
            return ["170037904842817537", "```*" + name + "* @" + tweet.user.screen_name + " - " + tweet.text + "```"];
          }
        }
      });
      stream.on('error', function(error) {
        console.log("Twitter Error");
      });
    });
  }
};
