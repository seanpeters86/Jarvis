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
var debug = true;

var wait = require('wait.for');

var discordKey = process.env.DISCORD_KEY;
var wclkey = process.env.WCL_KEY;
var battlenetkey = process.env.BATTLE_NET_KEY;

var commands = require("./plugins/commands");
var twitter_stream = require("./plugins/twitter_stream");
var armory = require("./plugins/armory");
var wcl = require("./plugins/wcl");

bot.on("ready", function() {
    tweet = twitter_stream.get_tweet();
    if (tweet) {
        bot.sendMessage(tweet[0],tweet[1]);
    }
    if(debug){
        console.log("Bot is online");
        var data = "Online.";
        request.post('https://discordapp.com/api/webhooks/311306144041926657/roiY7k2oiAuDikTMKs8aiseqFzvKjZnf9epD9cH-Di4MfVuSJOlll016a5G1UIS3dRFe', {form:{content:data}});
    }
});

var battlenetkey = process.env.BATTLE_NET_KEY;

var affixes = {
    "1": "Raging Volcanic Tyrannical",
    "2": "Teeming Explosive Fortified",
    "3": "Bolstering Grievous Tyrannical",
    "4": "Sanguine Volcanic Fortified",
    "5": "Bursting Skittish Tyrannical",
    "6": "Teeming Quaking Fortified",
    "7": "Raging Necrotic Tyrannical",
    "8": "Bolstering Skittish Fortified"
}


// begin main bot
bot.on("message", function(message) {
    var input = message.content.toUpperCase();
    if (!(message.channel.isPrivate)) {
        var roles = message.channel.server.roles;
        var channels = message.channel.server.channels;
        var server = message.channel.server.id;
    }
    var user = message.author;
    var role, encounter, bossname, spec, playerclass, channel, reserved, mythicPlusValue, mythicValue;
    var parsed = message.content.split(" ");
    var parsedReg = input.split(" ");
    var raidid = 10; // Emerald Nightmare id = 10, NH = 11, ToV = 12
    var partition = 2; // Partition should almost always be set to 1, Pre-Patch/7.2 is 2
    var arthas = "226510296221483008";
    var exiledpower = "170037904842817537";
    // Begin Command list
    // Basic Text Loop
    if (commands.responses[input] && server == exiledpower) {
        bot.sendMessage(message, commands.responses[input]);
    }
    else if (commands.responsesArthas[input] && server == arthas){
      bot.sendMessage(message, commands.responsesArthas[input])
    }
    // Send File Loop
    else if (commands.responsesFiles[input]) {
        bot.sendFile(message, commands.responsesFiles[input]);
    }
    // Replies Loop
    else if(commands.responseReplies[input]){
        bot.reply(message, commands.responseReplies[input]);
    }
    // includes test
    else if (commands.banned.some(function(v) { return input.indexOf(v) >= 0; }) && !(user.bot)) {
      bot.deleteMessage(message);
      bot.sendMessage(user, "This language: ```" + input + "``` is not allowed in this server.")
    }
    // Class Fantasy
    else if (input === "!FANTASY" || input.includes("CLASS FANTASY")) {
        bot.sendFile(message, "http://i.imgur.com/EMSiUF3.jpg");
    }
    // Politics
    else if ((input.includes("POLITICS") || (input.includes("TRUMP")) || (input.includes("DONALD"))) && !(user.bot)) {
        bot.sendMessage(message, "Make Exiled Power great again. Don't talk about politics.");
        bot.sendFile(message, "http://i.imgur.com/fOJGF0Q.png");
    }
    // fistmas
    else if (input === "!FISTMAS") {
        var random = Math.floor((Math.random() * 3));
        var fistmas = ["Fistmas is bad kids. Remember that one time Kelsø jumped off the edge on Cenarius? That was Fistmas.\nhttp://i.imgur.com/099eVi0.jpg", "Fistmas is bad kids. Remember that one time Moonkin stood in every Volcanic? That was Fistmas.\nhttp://i.imgur.com/SZ42W7V.png","Here's your EP styled Fistmas: http://i.imgur.com/KlI0zGc.png"];
        bot.sendMessage(message, fistmas[random]);
    }
    // Fuck You Jarvis
    else if (input.includes("FUCK YOU JARVIS") || input.includes("FUCK YOU, JARVIS")) {
        var random = Math.floor((Math.random() * 3));
        var fucker = ["Why would you say that!?", "Well I don't think that was appropriate.","Fuck you too, silly human. Have you seen your logs recently? (They suck lol)"];
        bot.reply(message, fucker[random]);
    }
    else if (input.includes("DEV-COMMIT")){
      bot.deleteMessage(message);
    }
    // affix
    else if (input === "!AFFIXES") {
      var d = new Date();
      var oneday = 24*60*60*1000;
      var firstDate = new Date(Date.UTC(2017, 0, 31, 15, 0, 0));
      var secondDate = d;
      var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneday)));
      var weeks = Math.floor(diffDays/7);
      var week = (weeks % 8) + 1;
      var nextweek;
      if (week == 8){
          nextweek = 1;
      }
      else {
          nextweek = week + 1;
      }
      try {
        var affix = affixes[week].split(" ");
        var nextAffix = affixes[nextweek].split(" ");
        affix = "This week's affixes are +4: **" + affix[0] + "**, +7: **" + affix[1] + "**, +10: **" + affix[2] + "**";
        nextAffix = "\nNext week's affixes are +4: **" + nextAffix[0] + "**, +7: **" + nextAffix[1] + "**, +10: **" + nextAffix[2] + "**";
        bot.sendMessage(message, affix + nextAffix + "\nFor more check out: https://mythicpl.us/");
        //bot.sendFile(message, "http://i.imgur.com/SzeLZNa.jpg");
      }
      catch(err) {
        console.log(err);
        bot.sendMessage(message, "Weekly Affixes: https://mythicpl.us/ \n");
        //bot.sendFile(message, "http://i.imgur.com/SzeLZNa.jpg");
      }
    }
    // GoT Stuff
    else if (input.includes("WHAT IS DEAD MAY NEVER DIE")) {
        bot.sendFile(message, "http://media2.popsugar-assets.com/files/thumbor/8JmtgAwoUtycNcKiKMY626mWtf8/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2016/05/24/864/n/1922283/4b3606df5ff39bb7_tumblr_m52wvwqwBQ1qb9ftxo1_500/i/House-Greyjoy-What-Dead-May-Never-Die.gif");
    } else if (input.includes("WINTER IS COMING")) {
        bot.sendFile(message, "https://media.makeameme.org/created/Brace-yourself-Winter.jpg");
    } else if (input.includes("YOU KNOW NOTHING")) {
        bot.sendFile(message, "http://i.imgur.com/FBC3qtM.gif");
    } else if (input.includes("HOLD THE DOOR")) {
        bot.sendFile(message, "http://gif4share.com/wp-content/uploads/2016/06/hold-the-door-game-of-thrones.gif");
    }
    // do you need an adult
    else if (input.includes("I NEED AN ADULT")) {
        bot.reply(message, "Me too.");
    }
    // !game status for Jarvis
    else if (input.startsWith("!GAME") && input.endsWith("-J")) {
        bot.deleteMessage(message);
        bot.setStatus('online', parsed[1]);
    }
    // pinned messages
    else if (input.startsWith("!PINNED")) {
        if (!(input.endsWith("-P"))) {
            bot.deleteMessage(message);
        }
        bot.getPinnedMessages(message.channel, (err, messages) => {
            if (!err) {
                for (var message of messages) {
                    var content = message.content;
                    //console.log(content);
                    if (input.endsWith("-P")) {
                        bot.sendMessage(message, content);
                    } else {
                        bot.sendMessage(user, content);
                    }
                    if (!message.content) {
                        bot.sendMessage(user, "No pinned messages in this channel, or I can't find them.");
                    }
                }
            } else {
                console.log("Couldn't fetch pins: " + err);
            }
        });
    }
    // salt
    else if (input === "SALT" || input === "!SALT") {
        var random = Math.floor((Math.random() * 7));
        var salt = ["http://i.imgur.com/Igir7HF.png","http://i.imgur.com/mzfz7vf.jpg","https://images.rapgenius.com/44f0fc58fb3a86b3c7cc19cfaab2bf1a.612x612x1.jpg","https://cdn.meme.am/instances/500x/51800528.jpg","http://ct.fra.bz/ol/fz/sw/i40/2/4/8/frabz-salt-salt-everywhere-898ce5.jpg","http://www.relatably.com/m/img/high-level-meme/3972715.jpg","http://static1.gamespot.com/uploads/original/1333/13335885/2874659-2341208346-ibzFa.gif"];
        bot.sendFile(message, salt[random]);
    }
    // wrecked
    else if (input.includes("WRECKED") || input.includes("REKT")) {
        var random = Math.floor((Math.random() * 7));
        var rekt = ["https://cdn.meme.am/instances/500x/47131303.jpg","https://cdn.meme.am/instances/500x/50087032.jpg","https://media.giphy.com/media/opY7SoUTNU3ao/giphy.gif","http://i.imgur.com/6mbJFvA.jpg","http://s2.quickmeme.com/img/94/941350454edd1fd9e446160102a2a51b3a7a2394dcfcb40caa9c96d60c9ea94e.jpg","http://img.lum.dolimg.com/v1/images/ralph-headretina_f6ef0c9b.jpeg","https://cdn.meme.am/instances/400x/52466269.jpg"];
        bot.sendFile(message, rekt[random]);
    }
    // artifact helper
    else if (input === "?ARTIFACT") {
        bot.sendMessage(message, "By using \n```!artifact CLASS SPEC```\n you can get the artifact path graphic sent. Class options are DK, DH, Druid, Hunter, Mage, Monk, Paladin, Priest, Rogue, Shaman, Warlock, or Warrior.");
    }
    // artifact power guide
    else if (input.startsWith("!ARTIFACT")) {
        var dk = {
            "UNHOLY": "http://static.icy-veins.com/images/wow/unholy-death-knight-artifact.jpg",
            "BLOOD": "http://i.imgur.com/9KakC97.png",
            "FROST": "http://static.icy-veins.com/images/wow/frost-death-knight-artifact.jpg"
        };
        var druid = {
            "BALANCE": "http://i.imgur.com/bubvXrX.png",
            "RESTORATION": "http://i.imgur.com/ZBSWUGB.png", "RESTO": "http://i.imgur.com/ZBSWUGB.png",
            "GUARDIAN": "http://www.theincbear.com/images/ArtifactPaths.png",
            "FERAL": "http://static.icy-veins.com/images/wow/feral-druid-artifact.jpg"
        };
        var hunter = {
            "BM": "http://static.icy-veins.com/images/wow/beast-mastery-hunter-artifact.jpg", "BEAST": "http://static.icy-veins.com/images/wow/beast-mastery-hunter-artifact.jpg",
            "MM": "http://static.icy-veins.com/images/wow/marksmanship-hunter-artifact.jpg", "MARKSMANSHIP": "http://static.icy-veins.com/images/wow/marksmanship-hunter-artifact.jpg",
            "SURVIVAL": "http://static.icy-veins.com/images/wow/survival-hunter-artifact.jpg"
        };
        var mage = {
            "FIRE": "http://i.imgur.com/Aff1Kke.png",
            "ARCANE": "https://cdn.discordapp.com/attachments/209851034657357835/216690880109740033/Arcane-Artifacts-Templates-Branch.png",
            "FROST": "https://cdn.discordapp.com/attachments/209851034657357835/217064942589837312/Frost-Artifacts-Templates.png"
        };
        var monk = {
            "WINDWALKER": "http://www.walkingthewind.com/wp-content/uploads/2016/08/Artifact-CCW.png", "WW": "http://www.walkingthewind.com/wp-content/uploads/2016/08/Artifact-CCW.png",
            "MISTWEAVER": "https://cdn.discordapp.com/attachments/218222107673362432/218222503447887872/circle-path-2.png", "MW": "https://cdn.discordapp.com/attachments/218222107673362432/218222503447887872/circle-path-2.png",
            "BM": "http://i.imgur.com/INQTgmd.png", "BREWMASTER": "http://i.imgur.com/INQTgmd.png"
        };
        var paladin = {
            "HOLY": "http://i.imgur.com/x06h0i7.png",
            "RETRIBUTION": "https://cdn.discordapp.com/attachments/122829094168559617/217313949115219969/IMG_2627.JPG", "RET": "https://cdn.discordapp.com/attachments/122829094168559617/217313949115219969/IMG_2627.JPG",
            "PROT": "http://i.imgur.com/1Rkv3bh.png", "PROTECTION": "http://i.imgur.com/1Rkv3bh.png"
        };
        var priest = {
            "SHADOW": "http://i.imgur.com/geNBd11.png",
            "DISC": "http://i.imgur.com/ibZJ5tP.png", "DISCIPLINE": "http://i.imgur.com/ibZJ5tP.png",
            "HOLY": "http://i.imgur.com/W4UXsdY.png"
        };
        var rogue = {
            "OUTLAW": "http://puu.sh/qKo3P/ecccd6024c.jpg",
            "ASSASSINATION": "http://static.icy-veins.com/images/wow/assassination-rogue-artifact.jpg",
            "SUB": "http://static.icy-veins.com/images/wow/subtlety-rogue-artifact.jpg", "SUBTLETY": "http://static.icy-veins.com/images/wow/subtlety-rogue-artifact.jpg"
        };
        var shaman = {
            "RESTO": "http://static.icy-veins.com/images/wow/restoration-shaman-artifact-casual.jpg", "RESTORATION": "http://static.icy-veins.com/images/wow/restoration-shaman-artifact-casual.jpg",
            "ELE": "http://static.icy-veins.com/images/wow/elemental-shaman-artifact.jpg", "ELEMENTAL": "http://static.icy-veins.com/images/wow/elemental-shaman-artifact.jpg",
            "ENHANCEMENT": "http://static.icy-veins.com/images/wow/enhancement-shaman-artifact.jpg", "ENHANCE": "http://static.icy-veins.com/images/wow/enhancement-shaman-artifact.jpg"
        };
        var warlock = {
            "DEMO": "http://i.imgur.com/1UGnMro.png", "DEMONOLOGY": "http://i.imgur.com/1UGnMro.png",
            "DESTRO": "http://i.imgur.com/SXM457s.jpeg", "DESTRUCTION": "http://i.imgur.com/SXM457s.jpeg",
            "AFF": "http://i.imgur.com/xpYCqFi.png", "AFFLICTION": "http://i.imgur.com/xpYCqFi.png"
        };
        var warrior = {
            "PROT": "https://i.imgur.com/8eCEYYR.png", "PROTECTION": "https://i.imgur.com/8eCEYYR.png",
            "ARMS": "https://i.imgur.com/gPAvS0N.png",
            "FURY": "https://i.imgur.com/JZbh9Ka.png"
        };
        var dh = {
            "HAVOC": "http://i.imgur.com/75pbNRS.jpg",
            "VENGEANCE": "http://static.icy-veins.com/images/wow/vengeance-demon-hunter-artifact.jpg"
        };
        var classList = {
            "DK": dk[parsedReg[2]], "DRUID": druid[parsedReg[2]], "HUNTER": hunter[parsedReg[2]], "MAGE": mage[parsedReg[2]], "MONK": monk[parsedReg[2]], "PALADIN": paladin[parsedReg[2]], "PRIEST": priest[parsedReg[2]], "ROGUE": rogue[parsedReg[2]], "SHAMAN": shaman[parsedReg[2]], "WARLOCK": warlock[parsedReg[2]], "WARRIOR": warrior[parsedReg[2]], "DH": dh[parsedReg[2]]
        };
        if (classList[parsedReg[1]]) {
            bot.sendFile(message, classList[parsedReg[1]]);
        } else {
            bot.deleteMessage(message);
            bot.sendMessage(user, "Could not find an artifact weapon for Spec: `" + parsedReg[2] + "` Class: `" + parsedReg[1] + "`. Make sure you spelled it correctly.");
        }
    }
    // WoWProgress Link
    else if (input === "!WOWPROGRESS" && server == exiledpower) {
        bot.sendMessage(message, "Here is the link to the EP WoWProgress Page: <http://www.wowprogress.com/guild/us/arthas/Exiled+Power>");
        var url = "http://www.wowprogress.com/guild/us/arthas/Exiled+Power/json_rank";
        request({
            method: 'GET',
            uri: url,
            json: true
        }, (error, response, body) => {
            if (!error && response.statusCode == 200) {
                var json_rank = response.body;
                console.log(json_rank);
                bot.sendMessage(message, "Exiled Power is currently ranked " + `${prettyjson.render(json_rank.world_rank)}` + " in the world and " + `${prettyjson.render(json_rank.realm_rank)}` + " on Arthas.");
            } else {
                bot.sendMessage(message, "I could not find a ranking for Exiled Power on WoWProgress for the current tier.");
            }
        });
    }
    // lore core
    else if (input === "!LORE" || input === "!LORECORE" || input === "#LORECORE" || input === "#LORE") {
        var random = Math.floor((Math.random() * 22));
        var lore = ["http://i.imgur.com/d4tjQQJ.jpg","http://i.imgur.com/tbwv6GX.png","http://i.imgur.com/P2F5bWn.jpg","http://i.imgur.com/tKNosl0.png","http://i.imgur.com/TeIzUNt.png","http://i.imgur.com/G8KLi3L.png","http://i.imgur.com/lH4laAS.jpg","http://i.imgur.com/3IgAUMT.jpg","http://i.imgur.com/ZoKRvOX.png","http://imgur.com/qugE1Hd","http://i.imgur.com/Y1oULOj.png","http://i.imgur.com/ONucxNF.png","http://i.imgur.com/dEe9rGv.png","http://i.imgur.com/Qfx2M5y.png","http://i.imgur.com/8pKvL0X.jpg","http://i.imgur.com/7K08VQg.png","http://i.imgur.com/xxrNi8P.png","http://i.imgur.com/OGhjNNR.png","http://i.imgur.com/0luga5w.png","http://i.imgur.com/Kp4SNIc.png","http://i.imgur.com/mIV7Vmv.png","http://i.imgur.com/TuHyl0N.jpg"];
        bot.sendFile(message, lore[random]);
    }
    // Video helper
    else if (input.startsWith("?BOSS") || input.startsWith("?VIDEO")) {
        bot.sendMessage(message, "By using !BOSS or !VIDEO simply follow it with the boss name or the video you wish to search my database for.");
    }
    // Kill Videos
    else if (input.startsWith("!BOSS") || input.startsWith("!VIDEO")) {
        var videos = {
            "ARCHIMONDE": "https://www.youtube.com/watch?v=Jkt1iId7Xbc",
            "MANNY": "https://www.youtube.com/watch?v=b7mTPw0pv20",
            "MANNOROTH": "https://www.youtube.com/watch?v=b7mTPw0pv20",
            "XHUL'HORAC": "https://www.youtube.com/watch?v=N2aSgC4DlIU",
            "XHUL": "https://www.youtube.com/watch?v=N2aSgC4DlIU",
            "TYRANT": "https://www.youtube.com/watch?v=wHUKGvI6U2Y",
            "FEL": "https://www.youtube.com/watch?v=d0C92xy1fts",
            "ISKAR": "https://www.youtube.com/watch?v=9iIAlJQ3Fws",
            "SOCRETHAR": "https://www.youtube.com/watch?v=cbO6Ri4XqlA",
            "GOREFIEND": "https://www.youtube.com/watch?v=OYOQ6ahRAc4",
            "GORE": "https://www.youtube.com/watch?v=OYOQ6ahRAc4",
            "KILROGG": "https://www.youtube.com/watch?v=37hyWu503zo",
            "COUNCIL": "https://www.youtube.com/watch?v=89wK24T2lK8",
            "KORMROK": "https://www.youtube.com/watch?v=KAnECqXw11c",
            "KORM": "https://www.youtube.com/watch?v=KAnECqXw11c",
            "IRON": "https://www.youtube.com/watch?v=8exVgQfHAaA",
            "REAVER": "https://www.youtube.com/watch?v=8exVgQfHAaA",
            "ASSAULT": "https://www.youtube.com/watch?v=FBKpYBYkZ5w",
            "HANS": "https://www.youtube.com/watch?v=dCbk8OamUow",
            "FRANZ": "https://www.youtube.com/watch?v=dCbk8OamUow",
            "OREO": "https://www.youtube.com/watch?v=F8xwKWEci_I",
            "OREGORGER": "https://www.youtube.com/watch?v=F8xwKWEci_I",
            "GRUUL": "https://www.youtube.com/watch?v=zYs9iKxrUGU",
            "BEASTLORD": "https://www.youtube.com/watch?v=n3Jr61veZkQ",
            "DRINK1": "https://www.youtube.com/watch?v=b9yNli7FF5s",
            "DRINK2": "https://www.youtube.com/watch?v=1eyykDPeKME",
            "SIMCRAFT": "https://www.youtube.com/watch?v=HPkB56VWWDU",
            "SIMC": "https://www.youtube.com/watch?v=HPkB56VWWDU",
            "WCL": "https://www.youtube.com/watch?v=91jG59QyN2k",
            "WARCRAFTLOGS": "https://www.youtube.com/watch?v=91jG59QyN2k",
            "PAWN": "https://www.youtube.com/watch?v=EnjnOGBn6qI"
        };
        if (videos[parsedReg[1]]) {
            bot.sendMessage(message, videos[parsedReg[1]]);
        } else {
            bot.deleteMessage(message);
            bot.sendMessage(user, "Cannot find the video, `" + parsedReg[1] + "`, you requested. By using !BOSS or !VIDEO simply follow it with the boss name or the video you wish to search my database for.");
        }
    }
    // !addrole Role
    else if ((input.startsWith("!ADDROLE") || input.startsWith("!ADD") || input.startsWith("!JOIN")) && !(message.channel.isPrivate)) {
        // Check of role matches the class list
        if (classes.indexOf(parsed[1]) != -1) {
                if (parsed[1] == "Death") {
                    parsed[1] = "Death Knight";
                }
                if (parsed[1] == "Demon") {
                    parsed[1] = "Demon Hunter";
                }
                role = roles.get("name", parsed[1]).id; // get roleid of class
                bot.addMemberToRole(user, role);
                bot.reply(message, "You are now a " + parsed[1] + "!");
            // Check if role matches channel list
        } else if (channelRoles.indexOf(parsed[1]) != -1) {
            role = roles.get("name", parsed[1]).id; // get roleid of channel
            bot.addMemberToRole(user, role);
            bot.reply(message, "Added you to the " + parsed[1] + " channel!");
        } else { // if role does not exist
            bot.deleteMessage(message);
            bot.sendMessage(user, parsed[1] + " does not exist. Available roles: " + "```" + channelRoles + "```");
        }
    }
    // ?removerole helper
    else if ((input.startsWith("?REMOVEROLE") || input.startsWith("?REMOVE") || input.startsWith("?RM")) && !(message.channel.isPrivate)) {
        bot.sendMessage(message, "To remove yourself from a channel type '!remove channelName' where channel name is a valid name (case matters!). The options are: HoTs, Music, Healers, Theorycrafting, and Overwatch.");
    }
    // !removerole Developers
    else if ((input.startsWith("!REMOVEROLE") || input.startsWith("!REMOVE") || input.startsWith("!RM")) && !(message.channel.isPrivate)) {
        if (classes.indexOf(parsed[1]) != -1) {
            if (parsed[1] == "Death") {
                parsed[1] = "Death Knight";
            }
            if (parsed[1] == "Demon") {
                parsed[1] = "Demon Hunter";
            }
            role = roles.get("name", parsed[1]).id;
            bot.removeMemberFromRole(user, role);
            bot.reply(message, "You are no longer a " + parsed[1] + "!");
        } else if (channelRoles.indexOf(parsed[1]) != -1) {
            role = roles.get("name", parsed[1]).id;
            bot.removeMemberFromRole(user, role);
            bot.reply(message, "Removed you from " + parsed[1] + "!");
        } else {
            bot.deleteMessage(message);
            bot.sendMessage(user, parsed[1] + " does not exist, or you cannot remove that role. Available roles: " + "```" + channelRoles + "```");
        }
    }
    // !say channel message
    else if (!(message.channel.isPrivate) && input.startsWith("!SAY") && (parsed[1] === "developers" || parsed[1] === "music" || parsed[1] === "raiding" || parsed[1] === "guild-chat" || parsed[1] === "senior-raiders" || parsed[1] === "officers" || parsed[1] === "overwatch" || parsed[1] === "pokemon" || parsed[1] === "theorycrafting" || parsed[1] === "welcome" || parsed[1] === "healing" || parsed[1] === "mages" || parsed[1] === "hunters")) {
        channel = channels.get("name", parsed[1]).id; // get channel id
        console.log("Channel id: " + channel + " for " + parsed[1]);
        role = roles.get("name", "Officers").id;
        reserved = parsed[2];
        for (var i = 3; i < parsed.length; i++) {
            reserved = reserved + " " + parsed[i];
        }
        if (bot.memberHasRole(user, role)) {
            bot.sendMessage(channel, reserved);
        } else {
            bot.deleteMessage(message);
            bot.sendMessage(user, "You don't have valid permissions to do that.");
        }
    }
    // !guide helper
    else if (input.startsWith("?GUIDE")) {
        bot.sendMessage(message, "By using !GUIDE you can query my database for class/general guides from across the web. An example would be '!guide priest shadow' to get a guide for shadow priests.");
    }
    // guides
    else if (input.startsWith("!GUIDE")) {
        var dk = {
            "UNHOLY": "<https://docs.google.com/document/d/1jNy2mY12agytX47xOyg7O30IllXXHKZQL5HlALzUuzI/edit>\n<http://www.wowhead.com/guides/classes/death-knight/unholy/overview>",
            "BLOOD": "<https://docs.google.com/document/d/1rNeybQ76QKKQ2k5NXoErhG6bfijHo8O1FPHuqxR54JE/edit>",
            "FROST": "<http://www.wowhead.com/guides/classes/death-knight/frost/overview>"
        };
        var druid = {
            "BALANCE": "<http://us.battle.net/forums/en/wow/topic/20745626938>\n<https://docs.google.com/document/d/1c6-_akHl_Cja-uwg20Gt8R0f12pcw4_qtVcT7LyZW4A/preview>",
            "RESTORATION": "<http://www.restokin.com/resto-druid-healing-guide/>\n<http://www.wowhead.com/guides/classes/druid/restoration/overview>", "RESTO": "<http://www.restokin.com/resto-druid-healing-guide/>\n<http://www.wowhead.com/guides/classes/druid/restoration/overview>",
            "GUARDIAN": "<http://www.theincbear.com/forums/viewtopic.php?f=9&t=1562>",
            "FERAL": "<http://xanzara.com/xanzarasferalguide.pdf>\n<http://www.wowhead.com/guides/classes/druid/feral/overview>"
        };
        var hunter = {
            "BM": "<http://www.icy-veins.com/wow/beast-mastery-hunter-pve-dps-guide>", "BEAST": "<http://www.icy-veins.com/wow/beast-mastery-hunter-pve-dps-guide>",
            "MM": "<http://www.icy-veins.com/wow/marksmanship-hunter-pve-dps-guide>", "MARKSMANSHIP": "<http://www.icy-veins.com/wow/marksmanship-hunter-pve-dps-guide>",
            "SURVIVAL": "<http://www.icy-veins.com/wow/survival-hunter-pve-dps-guide>"
        };
        var mage = {
            "FIRE": "<https://www.altered-time.com/forum/viewtopic.php?f=4&t=2611>\n<https://www.altered-time.com/forum/viewtopic.php?f=4&t=2553>",
            "ARCANE": "<https://www.altered-time.com/forum/viewtopic.php?f=3&t=2618>",
            "FROST": "<https://www.altered-time.com/forum/viewtopic.php?f=5&t=2621>"
        };
        var monk = {
            "WINDWALKER": "<https://www.wowhead.com/guides/classes/monk/windwalker/overview>\n<http://www.walkingthewind.com/guides/wordy/>", "WW": "<https://www.wowhead.com/guides/classes/monk/windwalker/overview>\n<http://www.walkingthewind.com/guides/wordy/>",
            "MISTWEAVER": "<http://www.wowhead.com/guides/classes/monk/mistweaver/overview>\n<http://www.mistyteahouse.com/mistweaver-guide/>", "MW": "<http://www.wowhead.com/guides/classes/monk/mistweaver/overview>\n<http://www.mistyteahouse.com/mistweaver-guide/>",
            "BM": "<http://www.wowhead.com/guides/classes/monk/brewmaster/overview>\n<http://sunniersartofwar.com/brewmaster/>", "BREWMASTER": "<http://www.wowhead.com/guides/classes/monk/brewmaster/overview>\n<http://sunniersartofwar.com/brewmaster/>"
        };
        var paladin = {
            "HOLY": "<https://www.wowhead.com/guides/classes/paladin/holy/overview>\n<https://sacredshielding.wordpress.com/legion-guide-introduction/>",
            "RETRIBUTION": "<http://www.icy-veins.com/wow/retribution-paladin-pve-dps-guide>\n<http://www.wowhead.com/guides/classes/paladin/retribution/overview>\n<https://www.youtube.com/playlist?list=PLDryqnKrFNn_cI-zwx-Tl7BamKOAlko11>", "RET": "<http://www.icy-veins.com/wow/retribution-paladin-pve-dps-guide>\n<http://www.wowhead.com/guides/classes/paladin/retribution/overview>\n<https://www.youtube.com/playlist?list=PLDryqnKrFNn_cI-zwx-Tl7BamKOAlko11>",
            "PROT": "<http://www.wowhead.com/guides/classes/paladin/protection/overview>", "PROTECTION": "<http://www.wowhead.com/guides/classes/paladin/protection/overview>"
        };
        var priest = {
            "SHADOW": "<https://howtopriest.com/viewtopic.php?f=19&t=8402>",
            "DISC": "<https://docs.google.com/document/d/1NbsDtJLVZqNc87jFzt-6WlPL02JOYmwppS1INtjVQTw/pub>\n<https://docs.google.com/document/d/1bYJ1KgX6cO6qHEoCVRTvsc0TCOYkQ_GUwUKd2672Ntg/pub>\n<https://www.automaticjak.com/guides/discipline>", "DISCIPLINE": "<https://docs.google.com/document/d/1NbsDtJLVZqNc87jFzt-6WlPL02JOYmwppS1INtjVQTw/pub>\n<https://docs.google.com/document/d/1bYJ1KgX6cO6qHEoCVRTvsc0TCOYkQ_GUwUKd2672Ntg/pub>\n<https://www.automaticjak.com/guides/discipline>",
            "HOLY": "<https://www.automaticjak.com/guides/holy>"
        };
        var rogue = {
            "OUTLAW": "<http://roguedpsguide.com/stjerns-legion-rogue-overview/>",
            "ASSASSINATION": "<http://roguedpsguide.com/stjerns-legion-rogue-overview/>",
            "SUB": "<http://roguedpsguide.com/stjerns-legion-rogue-overview/>", "SUBTLETY": "<http://roguedpsguide.com/stjerns-legion-rogue-overview/>"
        };
        var shaman = {
            "RESTO": "<https://www.wowhead.com/guides/classes/shaman/restoration/overview>", "RESTORATION": "<https://www.wowhead.com/guides/classes/shaman/restoration/overview>",
            "ELE": "<http://www.wowhead.com/guides/classes/shaman/elemental/overview>", "ELEMENTAL": "<http://www.wowhead.com/guides/classes/shaman/elemental/overview>",
            "ENHANCEMENT": "<http://www.wowhead.com/guides/classes/shaman/enhancement/overview>", "ENHANCE": "<http://www.wowhead.com/guides/classes/shaman/enhancement/overview>"
        };
        var warlock = {
            "DEMO": "<http://goo.gl/Z0wDcx>\n<http://goo.gl/IZ9dGR>", "DEMONOLOGY": "<http://goo.gl/Z0wDcx>\n<http://goo.gl/IZ9dGR>",
            "DESTRO": "<http://goo.gl/Td6ldu>\n<http://goo.gl/W3VzOd>", "DESTRUCTION": "<http://goo.gl/Td6ldu>\n<http://goo.gl/W3VzOd>",
            "AFF": "<http://goo.gl/puw0Lg>\n<http://goo.gl/7hTC2k>", "AFFLICTION": "<http://goo.gl/puw0Lg>\n<http://goo.gl/7hTC2k>"
        };
        var warrior = {
            "PROT": "<https://goo.gl/uvKVbZ>\n<https://goo.gl/jpzbxg>", "PROTECTION": "<https://goo.gl/uvKVbZ>\n<https://goo.gl/jpzbxg>",
            "ARMS": "<https://goo.gl/ajsZkT>\n<https://goo.gl/7Y841X>",
            "FURY": "<https://goo.gl/4qFqHc>\n<https://goo.gl/NrwZTU>"
        };
        var dh = {
            "HAVOC": "<http://www.wowhead.com/guides/classes/demon-hunter/havoc/overview>",
            "VENGEANCE": "<http://www.wowhead.com/guides/classes/demon-hunter/vengeance/overview>"
        };
        var classList = {
            "DK": dk[parsedReg[2]], "DRUID": druid[parsedReg[2]], "HUNTER": hunter[parsedReg[2]], "MAGE": mage[parsedReg[2]], "MONK": monk[parsedReg[2]], "PALADIN": paladin[parsedReg[2]], "PRIEST": priest[parsedReg[2]], "ROGUE": rogue[parsedReg[2]], "SHAMAN": shaman[parsedReg[2]], "WARLOCK": warlock[parsedReg[2]], "WARRIOR": warrior[parsedReg[2]], "DH": dh[parsedReg[2]]
        };
        if (classList[parsedReg[1]]) {
            bot.sendMessage(message, classList[parsedReg[1]]);
        } else {
            bot.deleteMessage(message);
            bot.sendMessage(user, "Could not find a guide for Spec: `" + parsedReg[2] + "` Class: `" + parsedReg[1] + "`. Make sure you spelled it correctly.");
        }
    }
    // !WA helper
    else if (input.startsWith("?WA")) {
        bot.sendMessage(message, "By using `!WA playername` you can query my database for Weak Auras from WAGO.io/pastebin/etc. An example would be '!wa Publik' to get Publik's WeakAuras.");
    }
    // get WA category links
    else if (input.startsWith("!WA")) {
        var weakauras = {"ALEX": "Here are Daenalls Resto Druid WAs: <https://wago.io/V1kEsJwXz>",
                         "ALÝCE": "Alýce's Holy WAs: <https://wago.io/4yW4iCG_W>\nAlýce's Shadow WAs (More or Less): <https://wago.io/EyUUYYTWG>",
                         "ALYCE": "Alýce's Holy WAs: <https://wago.io/4yW4iCG_W>\nAlýce's Shadow WAs (More or Less): <https://wago.io/EyUUYYTWG>",
                         "ASMADAI": "Asmadai's WAs:\nUnholy: <http://pastebin.com/u/Miniaug>\nFrost: <http://pastebin.com/u/frostelion>",
                         "CHALLCON": "Challcon's WAs: \nIgnore Pain: <https://wago.io/VJQrPJbJG>\nShield Block: <https://wago.io/N1Ub3_ouZ>",
                         "CURSE": "Curse hasn't given me his WeakAuras yet.",
                         "CURSEIMPLAER": "Curse hasn't given me his WeakAuras yet.",
                         "DAENALL": "Here are Daenalls Resto Druid WAs: <https://wago.io/V1kEsJwXz>",
                         "DANKE": "Danke's WA Sets: \nFire: <https://wago.io/Nk2CbIyd->\nArcane: <https://wago.io/EyTcJ9ZYb>\nFrost: <https://wago.io/V1hPMCXYb>",
                         "DEMONSANG": "Demonsang's Havoc Set: <https://wago.io/4kTH1dUFb>",
                         "DONKEY": "Danke's WA Sets: \nFire: <https://wago.io/Nk2CbIyd->\nArcane: <https://wago.io/EyTcJ9ZYb>\nFrost: <https://wago.io/V1hPMCXYb>",
                         "GOOLDAHN": "Gooldahn's WAs: <https://wago.io/4kqcQcXPb>",
                         "KELSØ": "Kelsø's Enhance Set: <http://pastebin.com/ckLHK8tC>",
                         "KELSO": "Kelsø's Enhance Set: <http://pastebin.com/ckLHK8tC>",
                         "KIEYA": "Kieya's Elemental Set: <https://wago.io/EkKc_E-ub>",
                         "KRIPTEK": "Kriptek's set for all rogue specs: <https://wago.io/4kz5FKYPW>",
                         "LUKE": "Challcon's WAs: \nIgnore Pain: <https://wago.io/VJQrPJbJG>\nShield Block: <https://wago.io/N1Ub3_ouZ>",
                         "MAHANA": "Mahana hasn't given me his WeakAuras yet.",
                         "MATTAIAS": "Gooldahn's WAs: <https://wago.io/4kqcQcXPb>",
                         "MIKE": "Moonkin's Set for Balance: <https://wago.io/N14XJo9FZ>",
                         "MOONKIN": "Moonkin's Set for Balance: <https://wago.io/N14XJo9FZ>",
                         "NATE": "Pronate's Arms Set: <https://wago.io/41JIPHJqb>",
                         "PLAN": "Plan's Main Set for all specs: <https://wago.io/4JFBL1vXf>",
                         "PRONATE": "Pronate's Arms Set: <https://wago.io/41JIPHJqb>",
                         "PUBLIK": "Publik's Shadow Set: <https://wago.io/EyUUYYTWG>",
                         "RYAN": "Kieya's Elemental Set: <https://wago.io/EkKc_E-ub>",
                         "SANG": "Demonsang's Havoc Set: <https://wago.io/4kTH1dUFb>",
                         "SEAN": "Here is a link to all of Sean's WAs: <https://wago.io/p/publikpriest>",
                         "STEVE": "Kelsø's Enhance Set: <http://pastebin.com/ckLHK8tC>",
                         "WAKING": "Waking's Hunter Sets: <http://pastebin.com/u/Azortharion>",
                         "WAKINGDEMONZ": "Waking's Hunter Sets: <http://pastebin.com/u/Azortharion>",
                         "XADE": "Xade's Disc WAs: \nDisc Ramp Up: <https://wago.io/4yWfDkDXf>\nDisc Right Bar: <https://wago.io/VyQAU1vQG>\nDisc Left Bar: <https://wago.io/41SiLkD7M>",
                         "XADEFINN": "Xade's Disc WAs: \nDisc Ramp Up: <https://wago.io/4yWfDkDXf>\nDisc Right Bar: <https://wago.io/VyQAU1vQG>\nDisc Left Bar: <https://wago.io/41SiLkD7M>",
                         "ZACH": "Danke's WA Sets: \nFire: <https://wago.io/Nk2CbIyd->\nArcane: <https://wago.io/EyTcJ9ZYb>\nFrost: <https://wago.io/V1hPMCXYb>",
                         "ZURCHI": "Zurchi hasn't given me his WeakAuras yet."};
        if (weakauras[parsedReg[1]]) {
            bot.sendMessage(message, weakauras[parsedReg[1]]);
        } else {
            bot.deleteMessage(message);
            bot.sendMessage(user, "Weak Aura set for `" + parsedReg[1] + "` not found. Contact Publik or the player directly.");
        }
    }
    // !server helper
    else if (input.startsWith("?SERVER")) {
        bot.sendMessage(message, "By using !server you can query my database for discord channel invite links. An example would be '!server rogue' to get the inite link for the rogue discord.");
    }
    // get discord servers
    else if (input.startsWith("!SERVER")) {
        var servers = {"AMR": "https://discord.gg/RuJN9xP",
                       "API": "https://discord.gg/WtyHkza",
                       "ARTHAS": "https://discord.gg/sqDuZth",
                       "ASKMRROBOT": "https://discord.gg/RuJN9xP",
                       "DEATH": "https://discord.gg/0ez1cFfUH3ingV96",
                       "DEMON": "https://discord.gg/taNDycY",
                       "DH": "https://discord.gg/taNDycY",
                       "DISCORD": "https://discord.gg/WtyHkza",
                       "DK": "https://discord.gg/0ez1cFfUH3ingV96",
                       "DRUID": "https://discord.gg/0dWu0WkuetF87H9H",
                       "HEALING": "https://discord.gg/wDemsxV",
                       "HUNTER": "https://discord.gg/yqer4BX",
                       "HUNTARD": "https://discord.gg/yqer4BX",
                       "LOCK": "https://discord.gg/0onXDymd9Wpc2CEu",
                       "MAGE": "https://discord.gg/0gLMHikX2aZ23VdA",
                       "MONK": "https://discord.gg/0dkfBMAxzTkWj21F",
                       "PALADIN": "https://discord.gg/0dvRDgpa5xZHFfnD",
                       "PALY": "https://discord.gg/0dvRDgpa5xZHFfnD",
                       "PRIEST": "https://discord.gg/0f1Ta8lT8xXXEAIY",
                       "ROGUE": "https://discord.gg/0h08tydxoNhfDVZf",
                       "SHAMAN": "https://discord.gg/0VcupJEQX0HuE5HH",
                       "SHAMMY": "https://discord.gg/0VcupJEQX0HuE5HH",
                       "WA": "https://discord.me/wa2",
                       "WARCRAFT": "https://discord.gg/3752GVf",
                       "WARCRAFTLOGS": "https://discord.gg/3752GVf",
                       "WARLOCK": "https://discord.gg/0onXDymd9Wpc2CEu",
                       "WARRIOR": "https://discord.gg/0pYY7932lTH4FHW6",
                       "WCL": "https://discord.gg/3752GVf"};
        if (servers[parsedReg[1]]) {
            bot.reply(message, servers[parsedReg[1]]);
        } else {
            bot.deleteMessage(message);
            bot.sendMessage(user, "The server `" + parsedReg[1] + "` does not exist, or I'm not sure where to find it.");
        }
    }
    // ranking stuffs
    else if (input === "?RANKING") {
        bot.reply(message, "By using !ranking PLAYERNAME BOSSNAME [-h] you can check WCL parses for that characters rankings. Simply add -h to the end to check HPS rankings instead of DPS.");
    }
    // ranking
    else if (input.startsWith("!RANKING")) {
        if (!(input.includes("-P"))) {
            bot.deleteMessage(message);
        }
        var rank = setTimeout(wcl.ranking(parsed, parsedReg, input), 2000);
        //var rank = wcl.ranking(parsed, parsedReg, input);
        console.log(rank);
        if(rank) {
          if (!(input.includes("-P"))) {
              bot.sendMessage(user, rank);
          } else {
              bot.sendMessage(message, rank);
          }
        } else {
          bot.sendMessage("Character or rank not found");
        }
    }
    else if (input === "?ARMORY") {
        bot.sendMessage(message, "By using `!armory charname value` you can search things via the WoW Armory. Current options include: \n`mythics`: lookup amount of mythic dungeons completed\n`anger`: lookup if that char has the Anger of the half giants.");
    }
    // !ARMORY Publik MYTHICS
    // !ARMORY NEWCLASSOMG ANGER
    else if (input.startsWith("!ARMORY")) {
        var character = encodeURIComponent(parsedReg[1]);
        if (parsedReg[2] === "ANGER" || parsedReg[2] === "ANGEROFTHEHALFGIANTS") {
            var url = "https://us.api.battle.net/wow/character/arthas/" + character + "?fields=items&locale=en_US&apikey=" + battlenetkey;
            request({
                method: 'GET',
                uri: url,
                json: true
            }, (error, response, body) => {
                if (!error && response.statusCode == 200) {
                    var char = response.body;
                    var charName = `${prettyjson.render(char.name)}`;
                    if(char.items.finger1.name === "Anger of the Half-Giants" || char.items.finger2.name === "Anger of the Half-Giants"){
                        bot.sendMessage(message, "Yup, you're one lucky SoB, here ya go:");
                        bot.sendFile(message, "http://i.imgur.com/8otzCZl.png");
                    } else {
                        bot.sendMessage(message, "Well. Looks like RNGesus doesn't like you. Take this instead:");
                        bot.sendFile(message, "http://i.imgur.com/kMqridE.png");
                    }
                } else {
                    bot.deleteMessage(message);
                    console.log("Error: ```" + error + "``` Response: ```" + response.statusCode + "``` Body: ```" + body + "``` ");
                    bot.sendMessage(user, "I could not find an armory profile for " + parsedReg[1]);
                }
            });
        }
        else if (parsedReg[2] === "MYTHICS") {
            var url = "https://us.api.battle.net/wow/character/Arthas/" + character + "?fields=achievements&locale=en_US&apikey=" + battlenetkey;
            request({
                method: 'GET',
                uri: url,
                json: true
            }, (error, response, body) => {
                if (!error && response.statusCode == 200) {
                    var char = response.body;
                    var charName = `${prettyjson.render(char.name)}`;
                    var arrayLength = char.achievements.criteria.length;
                    var index2, index5, index10;
                    for (var i = 0; i < arrayLength; i++) {
                        if (char.achievements.criteria[i] == 33096) {
                            index2 = i;
                        }
                        if (char.achievements.criteria[i] == 33097) {
                            index5 = i;
                        }
                        if (char.achievements.criteria[i] == 33098) {
                            index10 = i;
                        }
                    }
                    var plustwo = (`${prettyjson.render(char.achievements.criteriaQuantity[index2])}`);
                    var plusfive = (`${prettyjson.render(char.achievements.criteriaQuantity[index5])}`);
                    var plusten = (`${prettyjson.render(char.achievements.criteriaQuantity[index10])}`);
                    if (!plustwo) {
                        plustwo = "0";
                    }
                    if (!plusfive) {
                        plusfive = "0";
                    }
                    if (!plusten) {
                        plusten = "0";
                    }
                    console.log(charName + " has completed " + plustwo + " mythic+ dungeons.");
                    mythicPlusValue = plustwo;
                    //bot.sendMessage(message, "2+: " + plustwo + " || 5+: " + plusfive + " || 10+: " + plusten);
                    bot.sendMessage(message, charName + " has completed " + mythicPlusValue + " mythic+ dungeons in time.");
                } else {
                    bot.deleteMessage(message);
                    console.log("Error: ```" + error + "``` Response: ```" + response.statusCode + "``` Body: ```" + body + "``` ");
                    bot.sendMessage(user, "I could not find an armory profile for " + parsedReg[1]);
                }
            });
            var url = "https://us.api.battle.net/wow/character/Arthas/" + character + "?fields=statistics&locale=en_US&apikey=" + battlenetkey;
            request({
                method: 'GET',
                uri: url,
                json: true
            }, (error, response, body) => {
                if (!error && response.statusCode == 200) {
                    var char = response.body;
                    var count = 0;
                    var charName = `${prettyjson.render(char.name)}`;
                    // dungeons and raids = 5, legion = 6
                    var arrayLength = char.statistics.subCategories[5].subCategories[6].statistics.length;
                    for (var i = 0; i < arrayLength; i++) {
                        var object = char.statistics.subCategories[5].subCategories[6].statistics[i];
                        //console.log(object);
                        if (object.id == 10880 || object.id == 10883 || object.id == 10886 || object.id == 10889 || object.id == 10892 || object.id == 10895 || object.id == 10898 || object.id == 10901 || object.id == 10904 || object.id == 10907 || object.id == 10910) {
                            count = count + object.quantity;
                        }
                    }
                    console.log(charName + " has completed " + count + " mythic dungeons.");
                    mythicValue = count;
                    bot.sendMessage(message, charName + " has completed " + mythicValue + " mythic dungeons in total.");
                    console.log("Message sent");
                } else {
                    bot.deleteMessage(message);
                    console.log("Error: ```" + error + "``` Response: ```" + response.statusCode + "``` Body: ```" + body + "``` ");
                    bot.sendMessage(user, "I could not find an armory profile for " + parsedReg[1]);
                    return 0;
                }
            });
            console.log("Values found " + mythicPlusValue + " " + mythicValue);
        } else {
            bot.deleteMessage(message);
            bot.sendMessage(user, "Invalid optiton");
        }
    }
    // fuckin ø Ø
    else if (input.includes("Ø") && !(user.bot)) {
        bot.reply(message, "I hate that stupid o. Can we use real letters please?");
    }
    // Prints out list of commands in Discord
    else if (input.startsWith("!HELP") || input === "?JARVIS") {
        if (!(input.endsWith("-P"))) {
            bot.deleteMessage(message);
            bot.sendMessage(user, "You can now message Jarvis directly! Most things will work (other than channel specific stuff).\n \
            *Some commands you can also do ?COMMANDNAME to get more help!*\n \
            **List of Commands:**\n \
            GoT Statements = GoT Gifs/Images\n \
            If you need some Fantasy = **!FANTASY**\n \
            To check the video Pipeline = **!PIPELINE**\n \
            What are this weeks' affixes? = **!AFFIXES**\n \
            Help exporting videos = **!CODEC**\n \
            To get status on Stay Classy Achievement = **!STAYCLASSY**\n \
            Legion Leveling Lexicon = **!Lexicon**\n \
            To get WoWProgress Ranking = **!WOWPROGRESS**\n \
            To get WarcraftLogs Page = **!WCL**\n \
            Get Source Code = **!GITHUB**\n \
            Have an issue/suggestion? = **!ISSUE**\n \
            Is it random? = **!RANDOM**\n \
            Discord invite Link = **!INVITE**\n \
            YouTube Link = **!YOUTUBE**\n \
            Weekly Roster Link = **!ROSTER**\n");
            bot.sendMessage(user, " \
            To get Pinned Messages = **!PINNED**\n \
            Kill Vidoes = **!BOSS BOSSNAMEHERE** or **!VIDEO VIDEONAMEHERE**\n \
            Website Link = **!WEBSITE**\n \
            Weekly Roster = **!ROSTER**\n \
            Plug.DJ = **!MUSIC**\n \
            Class guides = **!GUIDE SPECCLASS** i.e. **!GUIDE SHADOWPRIEST**\n \
            Add/Remove Channel Roles = **!ADD** [or **!REMOVE**] **CHANNEL** (CHANNEL = Healers, Theorycrafting, Overwatch, Music)\n \
            WoW Discord Links = **!SERVER searchterms**\n \
            Random Lore Facts = **!LORE**\n \
            Mythic Dungeon Stats = **!ARMORY CHARNAME MYTHICS**\n \
            To get WCL Ranking [optional features incluide P for public, T for tanking and H for healing] = **!RANKING CHARACTERNAME BOSSNAME [-P] [-T] [-H]** i.e. **!RANKING Daenall Archimonde -P -H**\n \
            WAGO Class Links = **!WA CLASSNAME**");
        } else {
            bot.sendFile(message, "http://i.imgur.com/mISkWv2.png");
        }
    }
    // command not found
    else if (input.startsWith("!")) {
        bot.deleteMessage(message);
        bot.sendMessage(user, "I'm sorry, but I don't recognize...\n\n```" + message + "```\n...as a command pattern. Try using !help or ?commandname to get assistance.");
    }
});
bot.loginWithToken(discordKey).then(success).catch(err);

function success(token){
    console.log("Successful login with token");
}

function err(error){
    console.log("Insuccessful login with token");
    process.exit(0);
}
// http://discordjs.readthedocs.io/en/8.2.0/docs_client.html?highlight=ready
bot.on("debug", (m) => console.log("[debug]", m));
bot.on("warn", (m) => console.log("[warn]", m));
bot.on("error", (m) => console.log("[error]", m));
//bot.on("raw", (m) => console.log("[raw]", m));

bot.on("serverNewMember", function(server,user) {
  var arthas = "226510296221483008";
  var exiledpower = "170037904842817537";
  userid = user.id;
  username = user.name;
  var data = username + " joined " + server.name;
  if (server.id == exiledpower) {
    request.post('https://discordapp.com/api/webhooks/310917891765567498/j_RkPcgv_RCjiriivvZiK5036WXF6BiFAApO8V412BqV5lLGyV2gBZktRlsCJijjNtEH', {form:{content:data}});
  } else if (server.id == arthas) {
    bot.sendMessage(server.channels.admins, username + " joined " + server.name);
  }
  console.log(username + " joined " + server.name);
  //bot.sendMessage(userid, "Welcome to the server! Read the welcome channel pl0x.");
});

bot.on("disconnected", function() {
    console.log("Bot disconnected");
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
