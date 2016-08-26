/*
File: Jarvis.js
Author: Sean Peters
Created: 06/22/2016
Description: Main Bot File
Version: 1.1.0
*/

var Discord = require("discord.js");
var bot = new Discord.Client();
var Twitter = require('twitter');
var fs = require('fs');
var request = require('request');
var prettyjson = require("prettyjson");

function classConvert(playerclass) {
    switch (playerclass) {
        case 1:
            return "Death Knight";
            break;
        case 2:
            return "Druid";
            break;
        case 3:
            return "Hunter";
            break;
        case 4:
            return "Mage";
            break;
        case 5:
            return "Monk";
            break;
        case 6:
            return "Paladin";
            break;
        case 7:
            return "Priest";
            break;
        case 8:
            return "Rogue";
            break;
        case 9:
            return "Shaman";
            break;
        case 10:
            return "Warlock";
            break;
        case 11:
            return "Warrior";
            break;
        case 12:
            return "Demon Hunter";
            break;
        default:
            return "WTF";
            break;
    }
}

function specConvert(playerclass, spec) {
    switch (playerclass) {
        case 1:
            switch (spec) {
                case 1:
                    return "Blood";
                    break;
                case 2:
                    return "Frost";
                    break;
                case 3:
                    return "Unholy";
                    break;
                default:
                    return "WTF";
                    break;
            }
            break;
        case 2:
            switch (spec) {
                case 1:
                    return "Balance";
                    break;
                case 2:
                    return "Feral";
                    break;
                case 3:
                    return "Guardian";
                    break;
                case 4:
                    return "Restoration";
                    break;
                default:
                    return "WTF";
                    break;
            }
            break;
        case 3:
            switch (spec) {
                case 1:
                    return "Beast Mastery";
                    break;
                case 2:
                    return "Marksmanship";
                    break;
                case 3:
                    return "Survival";
                    break;
                default:
                    return "WTF";
                    break;
            }
            break;
        case 4:
            switch (spec) {
                case 1:
                    return "Arcane";
                    break;
                case 2:
                    return "Fire";
                    break;
                case 3:
                    return "Frost";
                    break;
                default:
                    return "WTF";
                    break;
            }
            break;
        case 5:
            switch (spec) {
                case 1:
                    return "Brewmaster";
                    break;
                case 2:
                    return "Mistweaver";
                    break;
                case 3:
                    return "Windwalker";
                    break;
                default:
                    return "WTF";
                    break;
            }
            break;
        case 6:
            switch (spec) {
                case 1:
                    return "Holy";
                    break;
                case 2:
                    return "Protection";
                    break;
                case 3:
                    return "Retribution";
                    break;
                default:
                    return "WTF";
                    break;
            }
            break;
        case 7:
            switch (spec) {
                case 1:
                    return "Discipline";
                    break;
                case 2:
                    return "Holy";
                    break;
                case 3:
                    return "Shadow";
                    break;
                default:
                    return "WTF";
                    break;
            }
            break;
        case 8:
            switch (spec) {
                case 1:
                    return "Assassination";
                    break;
                case 2:
                    return "Combat";
                    break;
                case 3:
                    return "Subtlety";
                    break;
                case 4:
                    return "Outlaw";
                    break;
                default:
                    return "WTF";
                    break;
            }
            break;
        case 9:
            switch (spec) {
                case 1:
                    return "Elemental";
                    break;
                case 2:
                    return "Enhancement";
                    break;
                case 3:
                    return "Restoration";
                    break;
                default:
                    return "WTF";
                    break;
            }
            break;
        case 10:
            switch (spec) {
                case 1:
                    return "Affliction";
                    break;
                case 2:
                    return "Demonology";
                    break;
                case 3:
                    return "Destruction";
                    break;
                default:
                    return "WTF";
                    break;
            }
            break;
        case 11:
            switch (spec) {
                case 1:
                    return "Arms";
                    break;
                case 2:
                    return "Fury";
                    break;
                case 3:
                    return "Protection";
                    break;
                case 4:
                    return "Gladiator";
                    break;
                default:
                    return "WTF";
                    break;
            }
            break;
        case 12:
            switch (spec) {
                case 1:
                    return "Havoc";
                    break;
                case 2:
                    return "Vengence";
                    break;
                default:
                    return "WTF";
                    break;
            }
            break;
        default:
            return "WTF";
            break;
    }
}

// begin main bot
bot.on("message", function(message) {
    var input = message.content.toUpperCase();
    var server = message.channel.server;
    if (!(message.channel.isPrivate)) {
        var roles = message.channel.server.roles;
        var channels = message.channel.server.channels;
    }
    var user = message.author;
    var role;
    var encounter;
    var bossname;
    var spec;
    var playerclass;
    var parsed = message.content.split(" ");
    var parsedReg = input.split(" ");
    var channel;
    var reserved;
    // Emerald Nightmare id = 10, Hellfire Citadel = 8
    var raidid = 8;
    // Partition should almost always be set to 1, Pre-Patch is 2
    var partition = 2;
    var planfortheweek = "Get ready for Legion Launch on Tuesday. You can do ```!countdown Legion``` to see how much longer we have. Dungeon groups for the first 3 weeks are posted on the second sheet of the roster.";
    // Begin Command list
    // Hello Jarvis
    if (input === "HELLO JARVIS") {
        bot.reply(message, "Hello! Good to be back.");
    }
    // Fuck You Jarvis
    else if (input.includes("FUCK YOU JARVIS") || input.includes("FUCK YOU, JARVIS")) {
        var random = Math.floor((Math.random() * 3) + 1);
        if (random == 1) {
            bot.reply(message, "Why would you say that!?");
        } else if (random == 2) {
            bot.reply(message, "Well I don't think that was appropriate.");
        } else {
            bot.reply(message, "Fuck you too, silly human. Have you seen your logs recently? (They suck lol)");
        }
    }
    // Thanks Jarvis
    else if (input.includes("THANKS JARVIS") || input.includes("THANKS, JARVIS") || input.includes("THANK YOU, JARVIS") || input.includes("THANK YOU JARVIS")) {
        bot.reply(message, "Anytime.");
    }
    // Good Night Jarvis
    else if (input === "GOOD NIGHT JARVIS") {
        role = roles.get("name", "Officers").id;
        if (bot.memberHasRole(user, role)) {
            bot.reply(message, "Good Night Sir.");
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
    // fuckin ø Ø
    else if (input.includes("Ø") && !(user.bot)) {
        bot.reply(message, "I hate that stupid o. Can we use real letters please?");
    }
    // do you need an adult
    else if (input.includes("I NEED AN ADULT")) {
        bot.reply(message, "Me too");
    }
    // delete test
    /*
    else if (input.includes("HARAMBE") && !(message.channel.isPrivate)) {
        bot.deleteMessage(message);
        bot.sendMessage(user,"Harambe is dead.");
    }
    */
    // salt
    else if (input === "SALT" || input === "!SALT") {
        var random = Math.floor((Math.random() * 7) + 1);
        switch (random) {
            case 1:
                bot.sendFile(message, "http://i.imgur.com/Igir7HF.png");
                break;
            case 2:
                bot.sendFile(message, "http://i.imgur.com/mzfz7vf.jpg");
                break;
            case 3:
                bot.sendFile(message, "https://images.rapgenius.com/44f0fc58fb3a86b3c7cc19cfaab2bf1a.612x612x1.jpg");
                break;
            case 4:
                bot.sendFile(message, "https://cdn.meme.am/instances/500x/51800528.jpg");
                break;
            case 5:
                bot.sendFile(message, "http://ct.fra.bz/ol/fz/sw/i40/2/4/8/frabz-salt-salt-everywhere-898ce5.jpg");
                break;
            case 6:
                bot.sendFile(message, "http://www.relatably.com/m/img/high-level-meme/3972715.jpg");
                break;
            default:
                bot.sendFile(message, "http://static1.gamespot.com/uploads/original/1333/13335885/2874659-2341208346-ibzFa.gif");
        }
    }
    // wrecked
    else if (input.includes("WRECKED") || input.includes("REKT")) {
        var random = Math.floor((Math.random() * 7) + 1);
        switch (random) {
            case 1:
                bot.sendFile(message, "https://cdn.meme.am/instances/500x/47131303.jpg");
                break;
            case 2:
                bot.sendFile(message, "https://cdn.meme.am/instances/500x/50087032.jpg");
                break;
            case 3:
                bot.sendFile(message, "https://media.giphy.com/media/opY7SoUTNU3ao/giphy.gif");
                break;
            case 4:
                bot.sendFile(message, "http://i.imgur.com/6mbJFvA.jpg");
                break;
            case 5:
                bot.sendFile(message, "http://s2.quickmeme.com/img/94/941350454edd1fd9e446160102a2a51b3a7a2394dcfcb40caa9c96d60c9ea94e.jpg");
                break;
            case 6:
                bot.sendFile(message, "http://cdnvideo.dolimg.com/cdn_assets/f6ef0c9bee8be77f5896afb421a04d7586ce7dbe.jpg");
                break;
            default:
                bot.sendFile(message, "https://cdn.meme.am/instances/400x/52466269.jpg");
        }
    }
    // Fantasy GIF
    else if (input === "!FANTASY" || input.includes("CLASS FANTASY")) {
        bot.sendFile(message, "http://i.imgur.com/EMSiUF3.jpg");
    }
    // Pipeline Link
    else if (input === "!PIPELINE" || input === "!SCHEDULE" || input === "!IDEAS") {
        bot.sendMessage(message, "<XXXXXXXXXXX>");
    }
    // Jarvis GIF
    else if (input === "!JARVIS") {
        bot.sendFile(message, "http://31.media.tumblr.com/dea23aa7056d90cdfdacdc2117171e6f/tumblr_mmq33aTgAD1rvvj1ho2_r2_500.gif");
    } else if (input === "!PLAN" || input === "!PLANFORTHEWEEK" || input === "!COMMAND") {
        bot.sendMessage(message, planfortheweek);
    }
    // artifact power guide
    else if (input === "!ARTIFACT") {
        bot.sendMessage(message, "Here is the artifact calculator for Legion: <https://docs.google.com/spreadsheets/d/11xQCzhiVM9gTZkUsu1UNs7z4dpwHpRQSUUZySY7xLv0/edit?usp=sharing>");
    }
    // EN Guide
    else if (input === "!EN" || input === "!EMERALD") {
        bot.sendMessage(message, "Here is the minimalist guide to the Emerald Nightmare <http://i.imgur.com/uVVRhYq.png>");
    }
    // Codec guide
    else if (input === "!CODEC" || input === "!EXPORT" || input === "!EXPORTING" || input === "!PREMEIRE" || input === "!HANDBRAKE" || input === "!CONVERTING" || input === "!CONVERT") {
        bot.sendMessage(message, "Here is the link for the Video Codec/Exporting Guide + Handbrake: <XXXXXXXXXXX>")
    }
    // SHAME
    else if (input === "!SHAME" || input === "SHAME") {
        bot.sendMessage(message, "http://i.imgur.com/FidZknJ.gif");
    }
    // Stay Classy Achieve
    else if (input === "!STAYCLASSY") {
        bot.sendMessage(message, "The following are the race/class combos we still need:\nTauren(Priest)\nTrolls(Warlock)\nUndead(Hunter)\nGoblins(DK, Rogue, Warlock, Priest)\nPandaren(Mage, Priest)");
    }
    // legion lexicon guide
    else if (input === "!LEXICON" || input === "!LEVELING") {
        bot.sendMessage(message, "Here is Soulflayer's leveling/gearing guide for Legion: <https://docs.google.com/spreadsheets/d/1TiiI4huz4NXKfx7PGvvVTyP6xu8VaDNZ4-FEn69mOhc/pubhtml#>");
        bot.sendMessage(message, "Here is Zhengsim's leveling guide for Legion: <https://docs.google.com/spreadsheets/d/1QwcvZmhi4zoe_29RmV_UDoDqLXrFdIBirKBz6ClMo0o/edit#gid=0>");
        bot.sendMessage(message, "Here is Brutall's speed leveling guide for Legion: <https://www.dropbox.com/s/ts5d8wqt6ughbaa/Brutall's%20Speed%20Leveling%20Guide%20for%20Legion%20(Horde).xlsx?dl=0>");
    }
    // WoWProgress Link
    else if (input === "!WOWPROGRESS") {
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
    // Warcraft Logs Link
    else if (input === "!LOGS" || input === "!WCL" || input === "!WARCRAFTLOGS") {
        bot.sendMessage(message, "Here is the link to the EP Logs: <https://www.warcraftlogs.com/guilds/reportslist/75984/>");
    }
    // git repo
    else if (input === "!GITHUB" || input === "!GIT" || input === "!CODE" || input === "!SOURCE") {
        bot.deleteMessage(message);
        bot.sendMessage(message, "Here is the link to my public source code: <https://github.com/seanpeters86/Jarvis>");
    }
    // GITHUB issues
    else if (input === "!ISSUE" || input === "!SUGGESTION" || input === "!FEATURE" || input === "!FEEDBACK") {
        bot.deleteMessage(message);
        bot.sendMessage(message, "All suggestions/issues for Jarvis should be filled out here: https://github.com/seanpeters86/Jarvis/issues")
    }
    // its not random
    else if (input === "!RANDOM" || input === "#ITSRANDOM") {
        bot.sendMessage(message, "It's never random. Molo is a cheater.");
    }
    // creator
    else if (input === "!QUESTION WHO CREATED YOU?" || input === "!CREATOR" || input === "!QUESTION WHO IS YOUR CREATOR?") {
        bot.sendMessage(message, "My creator is the almighty Republic of course. He's pretty swell.");
    }
    // !Is cody good at playing hunter?
    else if (input === "!QUESTION IS CODY GOOD AT PLAYING HUNTER?") {
        bot.reply(message, "Nope");
    }
    // invite link
    else if (input === "!INVITE") {
        bot.sendMessage(message, "Here is the invite link: XXXXXXXXXXX");
    }
    // YouTube Channel
    else if (input === "!YOUTUBE") {
        bot.sendMessage(message, "Here's our youtube channel: https://www.youtube.com/channel/UClDUcIXf0USA_WRRuFsmfCw");
    }
    // Plug.dj
    else if (input === "!MUSIC" || input === "!PLUG" || input === "!DJ" || input === "!PLUG.DJ") {
        bot.sendMessage(message, "Here's our Plug.DJ channel: XXXXXXXXXXX");
    }
    // Website Link
    else if (input === "!WEBSITE") {
        bot.sendMessage(message, "Check out dat website: http://www.exiledpower.com");
    }
    // Prints out the link to the roster in Google Sheets
    else if (input === "!ROSTER" || input === "#AMISITTING?") {
        bot.sendMessage(message, "Here is the roster: <XXXXXXXXXXX>");
    }
    // !game status for Jarvis
    else if (input.startsWith("!GAME") && input.endsWith("-J")) {
        bot.deleteMessage(message);
        bot.setStatus('online', parsed[1]);
    }
    // cheatsheet
    else if (input === "!CHEATSHEET" || input === "!DUNGEONGUIDE") {
        bot.sendMessage(message, "Here is the mythic dungeon Cheat Sheet: <https://docs.google.com/document/d/1_tqb6mbU14BoABc4ApMTFxWMGaZ1KIu-6nuZ83p7tGM/preview>");
    }
    // pre-raid bis sheet
    else if (input === "!BISLIST" || input.startsWith("!PRE-RAID")) {
        bot.sendMessage(message, "Here is the Pre-Raid BiS List: <https://docs.google.com/spreadsheets/d/1Czd_rhHdeN75oLQiXdOxn1w0IqJOvVlSQhmTiaUS3sE/edit#gid=2137413748>");
    }
    // addons
    else if (input === "!ADDONS") {
        bot.sendMessage(message, "Auto Turn In: <https://mods.curse.com/addons/wow/autoturnin>\nWorld Quest Tracker: <https://mods.curse.com/addons/wow/world-quest-tracker>\nWorld Quest List: <	https://mods.curse.com/addons/wow/world-quests-list>\nCharacter Stat Sheet: <https://mods.curse.com/addons/wow/dejacharacterstats>\nHandyNotes Tracker: <https://mods.curse.com/addons/wow/handynotes_legionrarestreasures>");
    }
    // pinned messages 
    else if (input.startsWith("!PINNED")) {
        if (!(input.endsWith("-P"))) {
            bot.deleteMessage(message);
        }
         bot.getPinnedMessages(message.channel, (err, messages) => {
	      if(!err) {
	          for(var message of messages) {
                  var content = message.content;
	              //console.log(content);
                  if (input.endsWith("-P")) {
                      bot.sendMessage(message,content);
                  } else {
                      bot.sendMessage(user,content);
                  }
                  if (!message.content) {
                      bot.sendMessage(user,"No pinned messages in this channel, or I can't find them.");
                  }
	          }
	      } else {
	          console.log("Couldn't fetch pins: " + err);
	      }
	  });
    }
    // countdown helper
    else if (input.startsWith("?COUNTDOWN")) {
        bot.sendMessage(message,"Use !countdown QUERY, with QUERY being something such as Legion or EN");
    }
    // countdown
    else if (input.startsWith("!COUNTDOWN")) {
        var current = new Date();
        switch (parsedReg[1]) {
            case "LEGION":
            case "LAUNCH":
                var countdownName = "Legion";
                var calculated = new Date(2016,7,30,7);
                break;
            case "MYTHIC+":
            case "MYTHICPLUS":
            case "EMERALD":
            case "EN":
                if (parsedReg[2] === "MYTHIC" || parsedReg[3] === "MYTHIC") {
                    var countdownName = "Emerald Nightmare Mythic";
                    var calculated = new Date(2016,8,27,3);
                    break;
                } else {
                    var countdownName = "Emerald Nightmare Normal & Heroic / Mythic+";
                    var calculated = new Date(2016,8,20,3);
                    break;
                }
            default:
                var countdownName = "INVALID";
        }
        var difference = calculated - current;
        var seconds = Math.round((difference)/1000);
        var minutes = Math.round((seconds)/60);
        var hours = Math.round((minutes)/60);
        var days = Math.round((hours)/24);
        if (!(countdownName === "INVALID")){
            bot.sendMessage(message,"Countdown to " + countdownName + "\n" + days + " Days, " + (hours % 24) + " Hours, " + (minutes % 60) + " Minutes, and " + (seconds % 60) + " Seconds.");
        } else {
            bot.sendMessage(message, "Invalid query. Current options are: Legion, Mythic+ and Emerald Nightmare");
        }
        console.log("Days: " + days + " Hours: " + (hours % 24) + " Minutes: " + (minutes % 60) + " Seconds: " + (seconds % 60));
    }
    // lore core
    else if (input === "!LORE" || input === "!LORECORE" || input === "#LORECORE" || input === "#LORE") {
        var random = Math.floor((Math.random() * 22) + 1);
        switch (random) {
            case 1:
                bot.sendFile(message, "http://i.imgur.com/d4tjQQJ.jpg");
                break;
            case 2:
                bot.sendFile(message, "http://i.imgur.com/tbwv6GX.png");
                break;
            case 3:
                bot.sendFile(message, "http://i.imgur.com/P2F5bWn.jpg");
                break;
            case 4:
                bot.sendFile(message, "http://i.imgur.com/tKNosl0.png");
                break;
            case 5:
                bot.sendFile(message, "http://i.imgur.com/TeIzUNt.png");
                break;
            case 6:
                bot.sendFile(message, "http://i.imgur.com/G8KLi3L.png");
                break;
            case 7:
                bot.sendFile(message, "http://i.imgur.com/lH4laAS.jpg");
                break;
            case 8:
                bot.sendFile(message, "http://i.imgur.com/3IgAUMT.jpg");
                break;
            case 9:
                bot.sendFile(message, "http://i.imgur.com/ZoKRvOX.png");
                break;
            case 10:
                bot.sendFile(message, "http://imgur.com/qugE1Hd");
                break;
            case 11:
                bot.sendFile(message, "http://i.imgur.com/Y1oULOj.png");
                break;
            case 12:
                bot.sendFile(message, "http://i.imgur.com/ONucxNF.png");
                break;
            case 13:
                bot.sendFile(message, "http://i.imgur.com/dEe9rGv.png");
                break;
            case 14:
                bot.sendFile(message, "http://i.imgur.com/Qfx2M5y.png");
                break;
            case 15:
                bot.sendFile(message, "http://i.imgur.com/8pKvL0X.jpg");
                break;
            case 16:
                bot.sendFile(message, "http://i.imgur.com/7K08VQg.png");
                break;
            case 17:
                bot.sendFile(message, "http://i.imgur.com/xxrNi8P.png");
                break;
            case 18:
                bot.sendFile(message, "http://i.imgur.com/OGhjNNR.png");
                break;
            case 19:
                bot.sendFile(message, "http://i.imgur.com/0luga5w.png");
                break;
            case 20:
                bot.sendFile(message, "http://i.imgur.com/Kp4SNIc.png");
                break;
            case 21:
                bot.sendFile(message, "http://i.imgur.com/mIV7Vmv.png");
                break;
            default:
                bot.sendFile(message, "http://i.imgur.com/TuHyl0N.jpg");
        }
    }
    // Video helper
    else if (input.startsWith("?BOSS") || input.startsWith("?VIDEO")) {
        bot.sendMessage(message, "By using !BOSS or !VIDEO simply follow it with the boss name or the video you wish to search my database for.");
    }
    // Kill Videos
    else if (input.startsWith("!BOSS") || input.startsWith("!VIDEO")) {
        switch (parsedReg[1]) {
            case "NYTHENDRA":
                bot.sendMessage(message, "Video not posted yet!");
                break;
            case "IL'GYNOTH":
            case "IL":
            case "ILGYNOTH":
                bot.sendMessage(message, "Video not posted yet!");
                break;
            case "ELERETHE":
            case "RENFERAL":
            case "ELE":
                bot.sendMessage(message, "Video not posted yet!");
                break;
            case "URSOC":
                bot.sendMessage(message, "Video not posted yet!");
                break;
            case "DRAGONS":
            case "DARGONS":
                bot.sendMessage(message, "Video not posted yet!");
                break;
            case "CENARIUS":
                bot.sendMessage(message, "Video not posted yet!");
                break;
            case "XAVIUS":
                bot.sendMessage(message, "Video not posted yet!");
                break;
            case "ARCHIMONDE":
                bot.sendMessage(message, "https://www.youtube.com/watch?v=Jkt1iId7Xbc");
                break;
            case "MANNY":
            case "MANNOROTH":
                bot.sendMessage(message, "https://www.youtube.com/watch?v=b7mTPw0pv20");
                break;
            case "XHUL'HORAC":
            case "XHUL":
                bot.sendMessage(message, "https://www.youtube.com/watch?v=N2aSgC4DlIU");
                break;
            case "TYRANT":
                bot.sendMessage(message, "https://www.youtube.com/watch?v=wHUKGvI6U2Y");
                break;
            case "FEL":
            case "LORD":
                bot.sendMessage(message, "https://www.youtube.com/watch?v=d0C92xy1fts");
                break;
            case "ISKAR":
                bot.sendMessage(message, "https://www.youtube.com/watch?v=9iIAlJQ3Fws");
                break;
            case "SOCRETHAR":
            case "SOC":
                bot.sendMessage(message, "https://www.youtube.com/watch?v=cbO6Ri4XqlA");
                break;
            case "GOREFIEND":
            case "GORE":
                bot.sendMessage(message, "https://www.youtube.com/watch?v=OYOQ6ahRAc4");
                break;
            case "KILROGG":
                bot.sendMessage(message, "https://www.youtube.com/watch?v=37hyWu503zo");
                break;
            case "COUNCIL":
                bot.sendMessage(message, "https://www.youtube.com/watch?v=89wK24T2lK8");
                break;
            case "KORMROK":
            case "KORM":
                bot.sendMessage(message, "https://www.youtube.com/watch?v=KAnECqXw11c");
                break;
            case "REAVER":
                bot.sendMessage(message, "https://www.youtube.com/watch?v=8exVgQfHAaA");
                break;
            case "ASSAULT":
                bot.sendMessage(message, "https://www.youtube.com/watch?v=FBKpYBYkZ5w");
                break;
            case "HANS":
            case "FRANZ":
                bot.sendMessage(message, "https://www.youtube.com/watch?v=dCbk8OamUow");
                break;
            case "OREO":
            case "OREGORGER":
                bot.sendMessage(message, "https://www.youtube.com/watch?v=F8xwKWEci_I");
                break;
            case "GRUUL":
                bot.sendMessage(message, "https://www.youtube.com/watch?v=zYs9iKxrUGU");
                break;
            case "BEASTLORD":
            case "DARMAC":
                bot.sendMessage(message, "https://www.youtube.com/watch?v=n3Jr61veZkQ");
                break;
            default:
                bot.reply(message, "Boss/Video name not recognized");
        }
    }
    // ?addrole helper 
    else if (input.startsWith("?ADDROLE") || input.startsWith("?ADD")) {
        bot.sendMessage(message, "To get added into a channel type '!add channelName' where channel name is a valid name (case matters!). The options are: Pokemon, Healers, Theorycrafting, and Overwatch.");
    }
    // !addrole Role
    else if ((input.startsWith("!ADDROLE") || input.startsWith("!ADD") || input.startsWith("!JOIN")) && !(message.channel.isPrivate)) {
        //bot.sendMessage(message,parsed[1]); // send message that contains the roleid
        // Check of role matches the class list
        if (parsed[1] == "Mage" || parsed[1] == "Death" || parsed[1] == "Druid" || parsed[1] == "Hunter" || parsed[1] == "Demon" || parsed[1] == "Monk" || parsed[1] == "Paladin" || parsed[1] == "Priest" || parsed[1] == "Rogue" || parsed[1] == "Shaman" || parsed[1] == "Warlock" || parsed[1] == "Warrior") {
            role = roles.get("name", "Officers").id; //get roll id of Officer/Admin role
            // Check if member is an Officer/Admin
            if (bot.memberHasRole(user, role)) {
                if (parsed[1] == "Death") {
                    parsed[1] = "Death Knight";
                }
                if (parsed[1] == "Demon") {
                    parsed[1] = "Demon Hunter";
                }
                role = roles.get("name", parsed[1]).id; // get roleid of class
                bot.addMemberToRole(user, role);
                bot.reply(message, "You are now a " + parsed[1] + "!");
            } else { // if not an officer/admin
                bot.reply(message, "Class does not exist, or you do not have permission to add that role.");
            }
            // Check if role matches channel list
        } else if (parsed[1] == "Developers" || parsed[1] == "Music" || parsed[1] == "Pokemon" || parsed[1] == "Healers" || parsed[1] == "Theorycrafting" || parsed[1] == "Overwatch") {
            role = roles.get("name", parsed[1]).id; // get roleid of channel
            bot.addMemberToRole(user, role);
            bot.reply(message, "Added you to the " + parsed[1] + " channel!");
        } else { // if role does not exist
            bot.reply(message, "Role does not exist.");
        }
    }
    // ?removerole helper
    else if ((input.startsWith("?REMOVEROLE") || input.startsWith("?REMOVE") || input.startsWith("?RM")) && !(message.channel.isPrivate)) {
        bot.sendMessage(message, "To remove yourself from a channel type '!remove channelName' where channel name is a valid name (case matters!). The options are: Pokemon, Healers, Theorycrafting, and Overwatch.");
    }
    // !removerole Developers
    else if ((input.startsWith("!REMOVEROLE") || input.startsWith("!REMOVE") || input.startsWith("!RM")) && !(message.channel.isPrivate)) {
        if (parsed[1] == "Mage" || parsed[1] == "Death" || parsed[1] == "Druid" || parsed[1] == "Priest" || parsed[1] == "Hunter" || parsed[1] == "Demon" || parsed[1] == "Monk" || parsed[1] == "Paladin" || parsed[1] == "Rogue" || parsed[1] == "Shaman" || parsed[1] == "Warlock" || parsed[1] == "Warrior") {
            role = roles.get("name", "Officers").id;
            if (bot.memberHasRole(user, role)) {
                if (parsed[1] == "Death") {
                    parsed[1] = "Death Knight";
                }
                if (parsed[1] == "Demon") {
                    parsed[1] = "Demon Hunter";
                }
                role = roles.get("name", parsed[1]).id;
                bot.removeMemberFromRole(user, role);
                bot.reply(message, "You are no longer a " + parsed[1] + "!");
            } else {
                bot.reply(message, "Class does not exist, or you cannot remove that role.");
            }
        } else if (parsed[1] == "Developers" || parsed[1] == "Music" || parsed[1] == "Pokemon" || parsed[1] == "Healers" || parsed[1] == "Theorycrafting" || parsed[1] == "Overwatch") {
            role = roles.get("name", parsed[1]).id;
            bot.removeMemberFromRole(user, role);
            bot.reply(message, "Removed you from " + parsed[1] + "!");
        } else {
            bot.reply(message, "Role does not exist, or you cannot remove that role.");
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
            bot.reply(message, "You don't have valid permissions to do that.");
        }
    }
    // !guide helper
    else if (input.startsWith("?GUIDE")) {
        bot.sendMessage(message, "By using !GUIDE you can query my database for class/general guides from across the web. An example would be '!guide shadowpriest' to get a guide for shadow priests.");
    }
    // get guide links by class/spec 
    else if (input.startsWith("!GUIDE")) {
        switch (parsedReg[1]) {
            case "BLOODDK":
            case "BLOODDEATHKNIGHT":
                bot.reply(message, "Here is the guide for Blood Death Knights: <https://docs.google.com/document/d/1rNeybQ76QKKQ2k5NXoErhG6bfijHo8O1FPHuqxR54JE/edit>");
                break;
            case "HOLYPRIEST":
                bot.reply(message, "Here is the guide for Holy Priests: <https://www.automaticjak.com/guides/holy>");
                break;
            case "DISCPRIEST":
            case "DISCIPLINEPRIEST":
                bot.reply(message, "Here are the guides for Discipline Priests: <https://docs.google.com/document/d/1NbsDtJLVZqNc87jFzt-6WlPL02JOYmwppS1INtjVQTw/pub>\n<https://docs.google.com/document/d/1bYJ1KgX6cO6qHEoCVRTvsc0TCOYkQ_GUwUKd2672Ntg/pub>\n<https://www.automaticjak.com/guides/discipline>");
                break;
            case "SPRIEST":
            case "SHADOWPRIEST":
                bot.reply(message, "Here is the guide for Shadow Priests: <https://howtopriest.com/viewtopic.php?f=19&t=8402>");
                break;
            case "ELEMENTALSHAMAN":
            case "ELESHAMAN":
                bot.reply(message, "Here is the guide for Elemental Shamans: <http://www.wowhead.com/guides/classes/shaman/elemental/overview>");
                break;
            default:
                bot.reply(message, "Class guide does not exist in my database, or I'm not sure where to find it.");
        }
    }
    // !WA helper
    else if (input.startsWith("?WA")) {
        bot.sendMessage(message, "By using !WA you can query my database for class/general Weak Auras from WAGO.io. An example would be '!wa rogue' to get weakauras for rogues.");
    }
    // get WA category links 
    else if (input.startsWith("!WA")) {
        switch (parsedReg[1]) {
            case "WAGO":
                bot.reply(message, "<https://wago.io/>");
                break;
            case "GENERAL":
                bot.reply(message, "<https://wago.io/categories/general>");
                break;
            case "DEATH":
            case "DK":
                bot.reply(message, "<https://wago.io/categories/classes/death-knight>");
                break;
            case "DEMON":
            case "DH":
                bot.reply(message, "<https://wago.io/categories/classes/demon-hunter>");
                break;
            case "DRUID":
                bot.reply(message, "<https://wago.io/categories/classes/druid>");
                break;
            case "HUNTER":
            case "HUNTARD":
                bot.reply(message, "<https://wago.io/categories/classes/hunter>");
                break;
            case "PALADIN":
            case "PALY":
                bot.reply(message, "<https://wago.io/categories/classes/paladin>");
                break;
            case "PRIEST":
                bot.reply(message, "<https://wago.io/categories/classes/priest>");
                break;
            case "ROGUE":
                bot.reply(message, "<https://wago.io/categories/classes/rogue>");
                break;
            case "SHAMAN":
            case "SHAMMY":
                bot.reply(message, "<https://wago.io/categories/classes/shaman>");
                break;
            case "MAGE":
                bot.reply(message, "<https://wago.io/categories/classes/mage>");
                break;
            case "MONK":
                bot.reply(message, "<https://wago.io/categories/classes/monk>");
                break;
            case "WARLOCK":
            case "LOCK":
                bot.reply(message, "<https://wago.io/categories/classes/warlock>");
                break;
            case "WARRIOR":
                bot.reply(message, "<https://wago.io/categories/classes/warrior>");
                break;
            case "RAID":
                bot.reply(message, "<https://wago.io/categories/roles/raid-lead>");
                break;
            case "DPS":
            case "DAMAGE":
                bot.reply(message, "<https://wago.io/categories/roles/damage>");
                break;
            case "HEALS":
            case "HEALER":
                bot.reply(message, "<https://wago.io/categories/roles/healing>");
                break;
            case "TANK":
                bot.reply(message, "<https://wago.io/categories/roles/tanking>");
                break;
            case "EN":
            case "NIGHTMARE":
            case "EMERALD":
                bot.reply(message, "<https://wago.io/categories/pve/emerald-nightmare>");
                break;
            default:
                bot.reply(message, "Category does not exist, or I'm not sure where to find it.");
        }
    }
    // !server helper
    else if (input.startsWith("?SERVER")) {
        bot.sendMessage(message, "By using !server you can query my database for discord channel invite links. An example would be '!server rogue' to get the inite link for the rogue discord.");
    }
    // get discord servers
    else if (input.startsWith("!SERVER")) {
        switch (parsedReg[1]) {
            case "WA":
                bot.reply(message, "https://discord.me/wa2");
                break;
            case "HEALING":
                bot.reply(message, "https://discord.gg/wDemsxV");
                break;
            case "DEATH":
            case "DK":
                bot.reply(message, "https://discord.gg/0ez1cFfUH3ingV96");
                break;
            case "DEMON":
            case "DH":
                bot.reply(message, "https://discord.gg/0enuZ4FBFluNZH1r");
                break;
            case "DRUID":
                bot.reply(message, "https://discord.gg/0dWu0WkuetF87H9H");
                break;
            case "HUNTER":
            case "HUNTARD":
                bot.reply(message, "https://discord.gg/yqer4BX");
                break;
            case "PALADIN":
            case "PALY":
                bot.reply(message, "https://discord.gg/0dvRDgpa5xZHFfnD");
                break;
            case "PRIEST":
                bot.reply(message, "https://discord.gg/0f1Ta8lT8xXXEAIY");
                break;
            case "ROGUE":
                bot.reply(message, "https://discord.gg/0h08tydxoNhfDVZf");
                break;
            case "SHAMAN":
            case "SHAMMY":
                bot.reply(message, "https://discord.gg/0VcupJEQX0HuE5HH");
                break;
            case "MAGE":
                bot.reply(message, "https://discord.gg/0gLMHikX2aZ23VdA");
                break;
            case "MONK":
                bot.reply(message, "https://discord.gg/0dkfBMAxzTmggsPH");
                break;
            case "WARLOCK":
            case "LOCK":
                bot.reply(message, "https://discord.gg/0onXDymd9Wpc2CEu");
                break;
            case "WARRIOR":
                bot.reply(message, "https://discord.gg/0pYY7932lTH4FHW6");
                break;
            case "AMR":
            case "ASKMRROBOT":
                bot.reply(message, "https://discord.gg/RuJN9xP");
                break;
            case "WCL":
            case "WARCRAFTLOGS":
            case "WARCRAFT":
                bot.reply(message, "https://discord.gg/3752GVf");
                break;
            case "DISCORD":
            case "API":
                bot.reply(message, "https://discord.gg/WtyHkza");
                break;
            default:
                bot.reply(message, "Channel does not exist, or I'm not sure where to find it.");
        }
    }
    // ranking help
    else if (input === "?RANKING") {
        bot.reply(message, "By using !ranking PLAYERNAME BOSSNAME [-h] you can check WCL parses for that characters rankings. Simply add -h to the end to check HPS rankings instead of DPS.");
    }
    // ranking
    else if (input.startsWith("!RANKING")) {
        bot.deleteMessage(message);
        var char = encodeURIComponent(parsed[1]);
        /*
        switch(parsedReg[2]) {
            case "NYTHENDRA":
                encounter = 1853;
                bossname = "Nythendra";
                break;
            case "IL'GYNOTH":
            case "IL":
            case "ILGYNOTH":
                encounter = 1873;
                bossname = "Il'gynoth, Heart of Corruption";
                break;
            case "ELERETHE":
            case "RENFERAL":
            case "ELE":
                encounter = 1876;
                bossname = "Elerethe Renferal";
                break;
            case "URSOC":
                encounter = 1841
                bossname = "Ursoc";
                break;
            case "DRAGONS":
            case "DARGONS":
                encounter = 1854;
                bossname = "Dragons of the Nightmare";
                break;
            case "CENARIUS":
                encounter = 1877;
                bossname = "Cenarius";
                break;
            case "XAVIUS":
                encounter = 1864;
                bossname = "Xavius";
                break;
        }
        */
        switch (parsedReg[2]) {
            case "HELLFIRE":
            case "ASSAULT":
            case "HFA":
                encounter = 1778;
                bossname = "Hellfire Assault";
                break;
            case "REAVER":
            case "IRON":
            case "IR":
                encounter = 1785;
                bossname = "Iron Reaver";
                break;
            case "KORMROK":
                encounter = 1787;
                bossname = "Kormrok";
                break;
            case "COUNCIL":
                encounter = 1798;
                bossname = "Hellfire High Council";
                break;
            case "KILROGG":
                encounter = 1786;
                bossname = "Kilrogg Deadeye";
                break;
            case "GOREFIEND":
            case "GORE":
                encounter = 1783;
                bossname = "Gorefiend";
                break;
            case "ISKAR":
            case "MOTHERFUCKER":
            case "CODYSFAV":
            case "CODYSFAVORITE":
                encounter = 1788;
                bossname = "Shadow-Lord Iskar";
                break;
            case "FEL":
            case "ZAKUUN":
                encounter = 1777;
                bossname = "Fel Lord Zakuun";
                break;
            case "XHUL":
                encounter = 1800;
                bossname = "Xhul'horac";
                break;
            case "SOC":
            case "SOCRETHAR":
                encounter = 1794;
                bossname = "Socrethar";
                break;
            case "TYRANT":
                encounter = 1784;
                bossname = "Tyrant Velhari";
                break;
            case "MANNY":
            case "MANNOROTH":
                encounter = 1795;
                bossname = "Mannoroth";
                break;
            case "ARCHI":
            case "ARCHIMONDE":
                encounter = 1799;
                bossname = "Archimonde";
                break;
            default:
                encounter = 0;
                bossname = "WTF";
                break;
        }
        if (input.endsWith("-H")) {
            var uri = "https://www.warcraftlogs.com:443/v1/rankings/character/" + char + "/Arthas/US?zone=" + raidid + "&encounter=" + encounter + "&metric=hps&partition=" + partition + "&api_key=XXXXXXXXXXX";
        } else if (input.endsWith("-T")) {
            var uri = "https://www.warcraftlogs.com:443/v1/rankings/character/" + char + "/Arthas/US?zone=" + raidid + "&encounter=" + encounter + "&metric=krsi&partition=" + partition + "&api_key=XXXXXXXXXXX";
        } else {
            var uri = "https://www.warcraftlogs.com:443/v1/rankings/character/" + char + "/Arthas/US?zone=" + raidid + "&encounter=" + encounter + "&metric=dps&partition=" + partition + "&api_key=XXXXXXXXXXX";
        }
        request({
            method: 'GET',
            uri: uri,
            json: true
        }, (error, response, body) => {
            if (!error && response.statusCode == 200 && (encounter != 0) && body.length > 0) {
                var rank = response.body;
                spec = parseInt(`${prettyjson.render(rank[0].spec)}`);
                playerclass = parseInt(`${prettyjson.render(rank[0].class)}`);
                var classparsed = classConvert(playerclass);
                var specparsed = specConvert(playerclass, spec);
                // krsi for tanks
                if (input.endsWith("-H")) {
                    bot.sendMessage(user, parsed[1] + " ranked " + `${prettyjson.render(rank[0].rank)}` + " out of " + `${prettyjson.render(rank[0].outOf)}` + " on " + bossname + " for all " + specparsed + " " + classparsed + "s in HPS");
                } else if (input.endsWith("-T")) {
                    bot.sendMessage(user, parsed[1] + " ranked " + `${prettyjson.render(rank[0].rank)}` + " out of " + `${prettyjson.render(rank[0].outOf)}` + " on " + bossname + " for all " + specparsed + " " + classparsed + "s in Tanking (KRSI)");
                } else {
                    bot.sendMessage(user, parsed[1] + " ranked " + `${prettyjson.render(rank[0].rank)}` + " out of " + `${prettyjson.render(rank[0].outOf)}` + " on " + bossname + " for all " + specparsed + " " + classparsed + "s in DPS");
                }
            } else {
                bot.sendMessage(user, "I could not find a ranking for " + parsed[1] + " on " + parsed[2] + ". Check query and try again. Silly Human.");
            }
        });
    }
    // Prints out list of commands in Discord
    else if (input === "!HELP" || input === "?JARVIS") {
        bot.deleteMessage(message);
        //bot.sendMessage(message, "You can now message Jarvis directly! Most things will work (other than channel specific stuff).\nList of Commands:\n Kill Vidoes = !BOSS BOSSNAMEHERE or !VIDEO VIDEONAMEHERE\n Website Link = !website\n Weekly Roster = !roster\n Plug.DJ = !music\n Discord invite = !invite\n Add/Remove Channel Roles = !add [or !remove] CHANNEL (CHANNEL = Healers, Theorycrafting, Overwatch)\n WoW Discord Links = !SERVER searchterms\n Get Source Code = !GITHUB\n Have an issue/suggestion? = !issue\n WCL = !WCL\n WoWProgress = !WOWPROGRESS\n Artifact Power Guide = !Artifact\n Legion Leveling Lexicon = !Lexicon\n Random Lore Facts = !Lore\n Guide Links = !guide SPECCLASS\nWAGO Class Links = !wa CLASSNAME");
        bot.sendFile(message, "http://i.imgur.com/fZtddS1.png");
    }
    // command not found
    else if (input.startsWith("!") && !((input.startsWith("!ROSIE") || input.startsWith("!HELP -R") || input.startsWith("!GAME -R") || input === "!GITHUB -R" || input === "!GIT -R" || input === "!CODE -R" || input === "!SOURCE -R" || input === "!ISSUE -R" || input === "!SUGGESTION -R" || input === "!FEATURE -R" || input === "!FEEDBACK -R" || input === "?TWITTER" || input === "?ROSIE"))) {
        bot.deleteMessage(message);
        bot.sendMessage(user, "I'm sorry, but I don't recognize " + message + " as a command pattern. Try using !help or ?commandname to get assistance.");
    }
});
bot.loginWithToken("XXXXXXXXXXX");

bot.on("disconnect", function() {
    console.log("Bot disconnected");
    bot.loginWithToken("XXXXXXXXXXX");
});
