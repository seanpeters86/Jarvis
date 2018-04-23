/*
File: Jarvis.js
Author: Sean Peters
Created: 06/22/2016
Description: Main Bot File
Version: 3.0.0
*/
var express = require('express')
var app = express()
const Discord = require("discord.js");
const bot = new Discord.Client();
var Twitter = require('twitter');
var fs = require('fs');
var request = require('request');
var prettyjson = require("prettyjson");
var rp = require('request-promise');
var debug = true;
var raw = false;

var discordKey = process.env.DISCORD_KEY;
var wclkey = process.env.WCL_KEY;
var battlenetkey = process.env.BATTLE_NET_KEY;

var commands = require("./plugins/commands");
var twitter_stream = require("./plugins/twitter_stream");
var armory = require("./plugins/armory");
var wcl = require("./plugins/wcl");
var affixes = require("./plugins/affixes");
var artifacts = require("./plugins/artifacts");
var videos = require("./plugins/videos");
var guides = require("./plugins/guides");
var admin = require("./plugins/admin");
var wqs = require("./plugins/wqs");

bot.on("ready", () => {
	bot.user.setGame("Discord.JS");
	tweet = twitter_stream.get_tweet();
	if (tweet) {
    console.log(tweet);
		bot.sendMessage(tweet[0], tweet[1]);
	}
	if (debug) {
		console.log("Bot is online");
		var data = "Online.";
		request.post('https://discordapp.com/api/webhooks/311306144041926657/roiY7k2oiAuDikTMKs8aiseqFzvKjZnf9epD9cH-Di4MfVuSJOlll016a5G1UIS3dRFe', {form: {content: data}});
	}
});

// begin main bot
bot.on('message', message => {
	var input = message.content.toUpperCase();
	if (message.channel.type == 'text') {
		var roles = message.channel.guild.roles;
		var channels = message.channel.guild.channels;
		var server = message.channel.guild.id;
	}
	var user = message.author;
	var role;
	var parsed = message.content.split(" ");
	var parsedReg = input.split(" ");
	var arthas = "226510296221483008";
	var exiledpower = "170037904842817537";
	var publik = "338380273416798208";
	var guildchat = "170037904842817537";
	var dev = "180011389115564032";
	/*
	*****************************
	COMMANDS.JS
	*****************************
	*/
	// Basic Text Loop
	if (commands.responses[input] && server == exiledpower && !(user.bot)) {
		message.channel.send(commands.responses[input]);
	}
	// Arthas
	else if (commands.responsesArthas[input] && server == arthas && !(user.bot)) {
		message.channel.send(commands.responsesArthas[input])
	}
	// publik
	else if (commands.responsesPublik[input] && server == publik && !(user.bot)) {
		message.channel.send(commands.responsesPublik[input])
	}
	// Send File Loop
	else if (commands.responsesFiles[input] && !(user.bot)) {
		message.channel.send({files:[commands.responsesFiles[input]]});
	}
	// Replies Loop
	else if (commands.responseReplies[input] && !(user.bot)) {
		message.reply(commands.responseReplies[input]);
	}
	// Includes Removal
	else if (commands.includesBanned.some(function(v) {
			return input.indexOf(v) >= 0;
		}) && !(user.bot)) {
		message.delete();
		try {
			message.member.send("This language: ```" + input + "``` is not allowed in this server.")
		} catch (err) {
			console.log(err);
		}
	}
	// @here test
	else if ((input.startsWith("!HERE") || input.startsWith("@HERE")) && ((message.channel.id == "230827366740393984") || (message.channel.id == "180011389115564032"))) {
		sayObject = admin.get_channel(channels, roles, parsed);
		console.log(sayObject[1]);
		if (bot.memberHasRole(user, sayObject[1])) {
			try {
				message.channel.send(sayObject[1]);
			} catch (err) {
				message.member.send(err);
			}
		}
		var newMessage = "@here" + message.content.slice(5);
		message.channel.send(newMessage);
	}
	// DLC
	else if (input.startsWith("!DLC")) {
		if (parsedReg[1]) {
			value = parsedReg[1];
		} else {
			value = admin.random(628);
		}
		image = "http://darklegacycomics.com/comics/" + value + ".jpg";
		try {
			message.channel.send({files:[image]});
		} catch (err) {
			console.log(err);
			message.channel.send("Unknown error occured, make sure you typed in the value correctly (comicNumber is optional): ```!dlc\n!dlc comicNumber```");
		}
	}
	// fistmas
	else if (input === "!FISTMAS" && server != publik) {
		message.channel.send({files:[commands.fistmas[admin.random(3)]]});
	}
	// Salt
	else if (input === "!SALT") {
		message.channel.send({files:[commands.salt[admin.random(7)]]});
	}
	// Wrecked
	else if (input === "!REKT" || input === "!WRECKED") {
		message.channel.send({files:[commands.rekt[admin.random(7)]]});
	}
	// Lore
	else if (input === "!LORE") {
		message.channel.send({files:[commands.lore[admin.random(22)]]});
	}
	// get discord servers
	else if (input.startsWith("!SERVER")) {
		if (commands.servers[parsedReg[1]]) {
			message.reply(commands.servers[parsedReg[1]]);
		} else {
			message.delete();
			try {
				message.member.send("The server `" + parsedReg[1] + "` does not exist, or I'm not sure where to find it.");
			} catch (err) {
				console.log(err);
			}
		}
	}
	// Prints out list of commands in Discord
	else if (input.startsWith("!HELP") || input === "?JARVIS") {
		if (!(input.endsWith("-P"))) {
			message.delete();
			try {
				message.member.send(commands.help);
			} catch (err) {
				console.log(err);
			}
		} else {
			message.channel.send({files:["http://i.imgur.com/mISkWv2.png"]});
		}
	}
	// Affixes
	/*
	*****************************
	AFFIXES.JS
	*****************************
	*/
	// Affixes
	else if (input === "!AFFIXES") {
		var affix = affixes.get_affixes();
		try {
			message.channel.send(affix[0] + affix[1] + "\nFor more check out: <https://mythicpl.us/>");
		} catch (err) {
			message.channel.send("Weekly Affixes: <https://mythicpl.us/> \n");
		}
	}
	/*
	*****************************
	ARTIFACTS.JS
	*****************************
	*/
	// artifact helper
	else if (input === "?ARTIFACT" && server != publik) {
		message.channel.send("By using \n```!artifact CLASS SPEC```\n you can get the artifact path graphic sent. Class options are DK, DH, Druid, Hunter, Mage, Monk, Paladin, Priest, Rogue, Shaman, Warlock, or Warrior.");
	}
	// artifact power guide
	else if (input.startsWith("!ARTIFACT") && server != publik) {
		var artifact = artifacts.get_artifact(parsedReg);
		if (artifact) {
			message.channel.send({files:[artifact]});
		} else {
			message.delete();
			try {
				message.member.send("Could not find an artifact weapon for Spec: `" + parsedReg[2] + "` Class: `" + parsedReg[1] + "`. Make sure you spelled it correctly.");
			} catch (err) {
				console.log(err);
			}
		}
	}
	/*
	*****************************
	VIDEO.JS
	*****************************
	*/
	// Video helper
	else if (input.startsWith("?BOSS") || input.startsWith("?VIDEO") && server != publik) {
		message.channel.send("By using !BOSS or !VIDEO simply follow it with the boss name or the video you wish to search my database for.");
	}
	// Kill Videos
	else if (input.startsWith("!BOSS") || input.startsWith("!VIDEO") && server != publik) {
		var video = videos.get_video(parsedReg);
		if (video) {
			message.channel.send(video);
		} else {
			message.delete();
			try {
				message.member.send("Cannot find the video, `" + parsedReg[1] + "`, you requested. By using !BOSS or !VIDEO simply follow it with the boss name or the video you wish to search my database for.");
			} catch (err) {
				console.log(err);
			}
		}
	}
	/*
	*****************************
	GUIDES.JS
	*****************************
	*/
	// !guide helper
	else if (input.startsWith("?GUIDE") && server != publik) {
		message.channel.send("By using !GUIDE you can query my database for class/general guides from across the web. An example would be '!guide priest shadow' to get a guide for shadow priests.");
	}
	// guides
	else if (input.startsWith("!GUIDE") && server != publik) {
		var guide = guides.get_guide(parsedReg);
		if (guide) {
			message.channel.send(guide);
		} else {
			message.delete();
			try {
				message.member.send("Could not find a guide for Spec: `" + parsedReg[2] + "` Class: `" + parsedReg[1] + "`. Make sure you spelled it correctly.");
			} catch (err) {
				console.log(err);
			}
		}
	}
	/*
	******************************
	ADMIN.JS
	******************************
	*/
	// !addrole Role
	else if ((input.startsWith("!ADDROLE") || input.startsWith("!ADD") || input.startsWith("!JOIN")) && !(message.channel.isPrivate) && server != publik) {
		role = admin.get_role(parsed, roles);
		if (role) {
			message.member.addRole(role);
			message.reply("Added " + parsed[1] + " role.");
		} else {
			message.delete();
			try {
				message.member.send("Role does not exist, or you do not have permission to add that role. Available roles: " + "```" + commands.channelRoles + "```" + "```" + commands.classes + "```")
			} catch (err) {
				console.log(err);
			}
		}
	}
	// !removerole Developers
	else if ((input.startsWith("!REMOVEROLE") || input.startsWith("!REMOVE") || input.startsWith("!RM")) && !(message.channel.isPrivate) && server != publik) {
		role = admin.get_role(parsed, roles);
		if (role) {
			message.member.removeRole(role);
			message.reply("Removed " + parsed[1] + " role.");
		} else {
			message.delete();
			try {
				message.member.send("Role does not exist, or you do not have permission to remove that role. Available roles: " + "```" + commands.channelRoles + "```" + "```" + commands.classes + "```")
			} catch (err) {
				console.log(err);
			}
		}
	}
	// !say channel message
	else if (input.startsWith("!SAY") && !(message.channel.isPrivate) && server != publik) {
		// sayObject = [channel, role, data]
		sayObject = admin.get_channel(channels, roles, parsed);
		if (bot.memberHasRole(user, sayObject[1])) {
			try {
				bot.sendMessage(sayObject[0], sayObject[2]);
			} catch (err) {
				message.member.send(err);
			}
		} else {
			message.delete();
			try {
				message.member.send("You don't have valid permissions to do that.");
			} catch (err) {
				console.log(err);
			}
		}
	}
	/*
	*****************************
	WCL.JS
	*****************************
	*/
	else if (input === "?RANKING" && server != publik) {
		message.reply("By using !ranking PLAYERNAME BOSSNAME [-h] you can check WCL parses for that characters rankings. Simply add -h to the end to check HPS rankings instead of DPS.");
	}
	// ranking
	else if (input.startsWith("!RANKING") && server != publik) {
		/// wclObject = [uri, encounter, bossname]
		var wclObject = wcl.get_object(parsed, parsedReg, input);
		var options = {
			uri: wclObject[0],
			json: true
		};
		rp(options)
			.then(function(rank) {
				if (typeof wclObject[1] !== "undefined") {
					var rankObject = wcl.get_rank(rank, wclObject[2], input, parsed);
          var art = wcl.get_art(rank,rankObject[8]);
          // rankObject = [charName,rank,total,bossname,spec,class,metric,difficulty,encounter]
          var percent = Math.round((1-(parseInt(rankObject[1])/parseInt(rankObject[2]))) * 100);
          message.channel.send({embed: {
            color: art[0],
            author: {
              name: rankObject[0].charAt(0).toUpperCase() + rankObject[0].slice(1),
              icon_url: art[2]
            },
            fields: [
              {
                name: 'Boss',
                value: rankObject[7] + " " + rankObject[3]
              },
              {
                name: 'Type',
                value: rankObject[4] + " " + rankObject[5] + " " + rankObject[6]
              },
              {
                name: 'Rank',
                value: rankObject[1] + " out of " + rankObject[2] + ": **" + percent + "** percentile."
              }
            ],
            timestamp: new Date(),
            footer: {
              icon_url: art[1],
              text: 'Pulled from WCL'
            }
          }});
				} else {
					message.delete();
					try {
						message.member.send("Error processing request. Please try again. Check Typos and make sure you are using the ```!ranking character bossname``` format.\n```" + message.content + "```");
					} catch (err) {
						console.log(err);
					}
				}
			})
			.catch(function(err) {
				message.delete();
				try {
					message.member.send("Error processing request. Please try again. Check Typos and make sure you are using the ```!ranking character bossname``` format.\n```" + message.content + "```");
				} catch (err) {
					console.log(err);
				}
			});
	} else if (input === "?ARMORY" && server != publik) {
		message.channel.send("By using `!armory charname value` you can search things via the WoW Armory. Current options include: \n`mythics`: lookup amount of mythic dungeons completed.");
	}
	/*
	*****************************
	ARMORY.JS
	*****************************
	*/
	else if (input.startsWith("!ARMORY") && server != publik) {
		var character = encodeURIComponent(parsedReg[1]);
    var mythicPlus, mythics, charName, art;
		if (parsedReg[2] === "MYTHICS") {
			// achievements fields
			var url = "https://us.api.battle.net/wow/character/Arthas/" + character + "?fields=achievements&locale=en_US&apikey=" + battlenetkey;
			var options = {
				uri: url,
				json: true
			};
			rp(options)
				.then(function(char) {
					if (char.statusCode != 404) {
            charName = `${prettyjson.render(char.name)}`;
						mythicPlus = armory.get_mythic_plus(char);
            // statistics fields
            url = "https://us.api.battle.net/wow/character/Arthas/" + character + "?fields=statistics&locale=en_US&apikey=" + battlenetkey;
            var options = {
              uri: url,
              json: true
            };
            rp(options)
              .then(function(char) {
                if (char.statusCode != 404) {
                  mythics = armory.get_mythics(char);
                  art = armory.get_art(char);
                  message.channel.send({embed: {
                    color: art[0],
                    author: {
                      name: charName,
                      icon_url: "https://render-us.worldofwarcraft.com/character/" + `${prettyjson.render(char.thumbnail)}`
                    },
                    fields: [
                      {
                        name: 'Mythic Dungeons',
                        value: mythics
                      },
                      {
                        name: 'Mythic+ Dungeons',
                        value: mythicPlus
                      }
                    ],
                    timestamp: new Date(),
                    footer: {
                      icon_url: art[1],
                      text: 'Pulled from Armory'
                    }
                  }});
                } else {
                  message.delete();
									try {
										message.member.send("I could not find an armory profile for " + parsedReg[1]);
									} catch (err) {
										console.log(err);
									}
                }
              })
              .catch(function(err) {
                message.delete();
								try {
									message.member.send("Character not found on Arthas-US. Please try again.");
								} catch (err) {
									console.log(err);
								}
              });
					} else {
						message.delete();
						try {
							message.member.send("I could not find an armory profile for " + parsedReg[1]);
						} catch (err) {
							console.log(err);
						}
					}
				})
				.catch(function(err) {
					message.delete();
					try {
						message.member.send("Character not found on Arthas-US. Please try again.");
					} catch (err) {
						console.log(err);
					}
				});
		} else {
			message.delete();
			try {
				message.member.send("Invalid option. Format should be: ```!armory character mythics``` You entered: ```" + message.content + "```");
			} catch (err) {
				console.log(err);
			}
		}
	}
	// WoWProgress Link
	else if (input === "!WOWPROGRESS" && server == exiledpower) {
		message.channel.send("Here is the link to the EP WoWProgress Page: <http://www.wowprogress.com/guild/us/arthas/Exiled+Power>");
		var url = "http://www.wowprogress.com/guild/us/arthas/Exiled+Power/json_rank";
		request({
			method: 'GET',
			uri: url,
			json: true
		}, (error, response, body) => {
			if (!error && response.statusCode == 200) {
				var json_rank = response.body;
				message.channel.send("Exiled Power is currently ranked " + `${prettyjson.render(json_rank.world_rank)}` + " in the world and " + `${prettyjson.render(json_rank.realm_rank)}` + " on Arthas.");
			} else {
				message.channel.send("I could not find a ranking for Exiled Power on WoWProgress for the current tier.");
			}
		});
	}
	/*
	*****************************
	INCLUDES
	*****************************
	*/
	else if (input.includes("FUCK YOU JARVIS") || input.includes("FUCK YOU, JARVIS")) {
		var random = Math.floor((Math.random() * 3));
		var fucker = ["Why would you say that!?", "Well I don't think that was appropriate.", "Fuck you too, silly human. Have you seen your logs recently? (They suck lol)"];
		message.reply(fucker[random]);
	}
	// GoT Stuff
	else if (input.includes("WHAT IS DEAD MAY NEVER DIE")) {
		message.channel.send({files:["http://media2.popsugar-assets.com/files/thumbor/8JmtgAwoUtycNcKiKMY626mWtf8/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2016/05/24/864/n/1922283/4b3606df5ff39bb7_tumblr_m52wvwqwBQ1qb9ftxo1_500/i/House-Greyjoy-What-Dead-May-Never-Die.gif"]});
	} else if (input.includes("WINTER IS COMING")) {
		message.channel.send({files:["https://media.makeameme.org/created/Brace-yourself-Winter.jpg"]});
	} else if (input.includes("YOU KNOW NOTHING")) {
		message.channel.send({files:["http://i.imgur.com/FBC3qtM.gif"]});
	} else if (input.includes("HOLD THE DOOR")) {
		message.channel.send({files:["http://gif4share.com/wp-content/uploads/2016/06/hold-the-door-game-of-thrones.gif"]});
	} else if (input.includes("VALAR MORGHULIS")) {
		message.channel.send({files:["https://media.giphy.com/media/c1oP0AunRfP7a/giphy.gif"]});
	} else if (input.includes("CURE FOR BEING A CUNT")) {
		message.channel.send({files:["http://media.timeout.com/blogimages/wp-content/uploads/2014/04/tumblr_mqcs3h2O9C1rsudrjo1_500.gif"]});
	}
	// GAMES
	else if (input === "!GAMES" && server == exiledpower) {
		bot.channels.get(guildchat).send({files:["http://i.imgur.com/nBAiPz0.gif"]});
		bot.channels.get(guildchat).send("Doesn't matter what games you play, remember to record your footage :rainbow:");
	}
	// do you need an adult
	else if (input.includes("I NEED AN ADULT")) {
		message.reply("Me too.");
	}
	// fuckin ø Ø
	else if (input.includes("Ø") && !(user.bot) && server != publik) {
		message.reply("I hate that stupid o. Can we use real letters please?");
	}
	// command not found, but prefix given
	else if (input.startsWith("!")) {
		//if (server != publik || (server == publik && !(commands.responsesBot.contains(input)))) {
		if (server != publik || (server == publik && (commands.responsesBot.indexOf(input) == -1))) {
			message.delete();
			try {
				message.member.send("I'm sorry, but I don't recognize...\n\n```" + message + "```\n...as a command pattern. Try using !help or ?commandname to get assistance.");
			} catch (err) {
				console.log(err);
			}
		}
	}
});
bot.login(discordKey).then(success).catch(err);

function success(token) {
	console.log("Successful login with token");
}

function err(error) {
	console.log("Insuccessful login with token");
	process.exit(0);
}

if (raw) {
  bot.on("debug", (m) => console.log("[debug]", m));
  bot.on("raw", (m) => console.log("[raw]", m));
}
bot.on("warn", (m) => console.log("[warn]", m));
bot.on("error", (m) => console.log("[error]", m));

bot.on('guildMemberAdd', member => {
	var arthas = "226510296221483008";
	var exiledpower = "170037904842817537";
	var publik = "338380273416798208";
	try {
		member.send("Welcome to the server. Check out the #welcome channel for more info, or type in !help in any of the channels.");
	} catch (err) {
		console.log(err);
	}
	// userid = member.id;
	// username = member.name;
	// if (server.id == exiledpower) {
	// 	console.log(data)
	// 	request.post('https://discordapp.com/api/webhooks/310917891765567498/j_RkPcgv_RCjiriivvZiK5036WXF6BiFAApO8V412BqV5lLGyV2gBZktRlsCJijjNtEH', {form: {content: data}});
	// } else {
	// 	console.log(data)
	// 	request.post('https://discordapp.com/api/webhooks/310917891765567498/j_RkPcgv_RCjiriivvZiK5036WXF6BiFAApO8V412BqV5lLGyV2gBZktRlsCJijjNtEH', {form: {content: data}});
	// }
});

// bot.on('disconnected', err => {
// 	console.log("Bot disconnected");
//   console.log(err);
// 	process.exit(0);
// });

bot.on('disconnect', err => {
	console.log("Bot disconnected");
  console.log(err);
	process.exit(0);
});

bot.on('error', err => {
	console.log("Bot errored out");
  console.log(err);
	process.exit(0);
});

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

app.get('/', function(request, response) {
	response.send('Hello World!')
})

app.listen(app.get('port'), function() {
	console.log("Node app is running at localhost:" + app.get('port'))
})
