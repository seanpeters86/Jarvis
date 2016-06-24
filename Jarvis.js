/*
File: Jarvis.js
Author: Sean Peters
Created: 06/22/2016
Description: Main Bot File
Version: 0.1.5
*/
var Discord = require("discord.js");
var bot = new Discord.Client();
//require('String.prototype.startsWith'); // used to parse complicated messages

// begin main bot
bot.on("message", function(message) {
    // convert message into all upper case and store it in input
    var input = message.content.toUpperCase();
    var server = message.channel.server;
    var roles = message.channel.server.roles;
    var user = message.author;
    var role;
    var parsed = message.content.split(" "); // parsed[0] = "ADDROLE", parsed[1] = "GivenRole"
    var parsedReg = input.split(" ");
    var channels = message.channel.server.channels;
    var channel;
    var reserved;
    // Hello Jarvis
    if (input === "HELLO JARVIS") {
        bot.reply(message, "Hello! Good to be back.");
    }
    else if (input.startsWith("!GAME")){
      bot.setStatus('online',parsed[1]);
    }
    else if (input.startsWith("!SERVER")){
      switch(parsedReg[1]){
        case "DEATH":
        case "DK":
          bot.reply(message,"XXXXXXXXX");
          break;
        case "DEMON":
        case "DH":
          bot.reply(message,"XXXXXXXXX");
          break;
        case "DRUID":
          bot.reply(message,"XXXXXXXXX");
          break;
        case "HUNTER":
        case "HUNTARD":
          bot.reply(message,"XXXXXXXXX");
          break;
        case "PALADIN":
        case "PALY"
          bot.reply(message,"XXXXXXXXX");
          break;
        case "PRIEST":
          bot.reply(message,"XXXXXXXXX");
          break;
        case "ROGUE":
          bot.reply(message,"XXXXXXXXX");
          break;
        case "SHAMAN":
        case "SHAMMY":
          bot.reply(message,"XXXXXXXXX");
          break;
        case "MAGE":
          bot.reply(message,"XXXXXXXXX");
          break;
        case "MONK":
          bot.reply(message,"XXXXXXXXX");
          break;
        case "WARLOCK":
        case "LOCK":
          bot.reply(message,"XXXXXXXXX");
          break;
        case "WARRIOR":
          bot.reply(message,"XXXXXXXXX");
          break;
        case "AMR":
        case "ASKMRROBOT"
          bot.reply(message,"XXXXXXXXX");
          break;
        case "WCL":
        case "WARCRAFTLOGS":
        case "WARCRAFT":
          bot.reply(message,"XXXXXXXXX");
          break;
        case "DISCORD":
        case "API":
          bot.reply(message,"XXXXXXXXX");
          break;
        default:
          bot.reply(message,"Channel does not exist, or I'm not sure where to find it.");
      }
    }
    // !voice channel file
    else if (input.startsWith("!VOICE") && (parsed[1] === "Guild-Chat" || parsed[1] === "Raiding" || parsed[1] === "Overwatch" || parsed[1] === "PvP" || parsed[1] === "Officers")) {
        channel = channels.get("name", parsed[1]).id;
        role = roles.get("name", "Officers").id;
        if (bot.memberHasRole(user, role)) {
            if (bot.voiceConnection == null) {
                bot.joinVoiceChannel(channel);
                bot.voiceConnection.playfile(parsed[2], {
                    volume: 0.25
                }, function(error, intent) {
                    if (error) console.log(error);
                    intent.on("end", function() {
                        bot.voiceConnection.stopPlaying();
                    });
                });
            }
            bot.leaveVoiceChannel(channel);
        }
    }
    // !say channel message
    else if (input.startsWith("!SAY") && (parsed[1] === "developers" || parsed[1] === "guild-chat" || parsed[1] === "senior-raiders" || parsed[1] === "officers" || parsed[1] === "overwatch" || parsed[1] === "challengemodes" || parsed[1] === "theorycrafting" || parsed[1] === "welcome" || parsed[1] === "healing" || parsed[1] === "mages" || parsed[1] === "hunters" || parsed[1] === "hot-button-issues")) {
        channel = channels.get("name", parsed[1]).id; // get channel id
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
    // !addrole Role
    else if (input.startsWith("!ADDROLE") || input.startsWith("!ADD")) {
        //bot.sendMessage(message,parsed[1]); // send message that contains the roleid
        // Check of role matches the class list
        if (parsed[1] == "Mage" || parsed[1] == "Death" || parsed[1] == "Druid" || parsed[1] == "Hunter" || parsed[1] == "Demon" || parsed[1] == "Monk" || parsed[1] == "Paladin" || parsed[1] == "Rogue" || parsed[1] == "Shaman" || parsed[1] == "Warlock" || parsed[1] == "Warrior") {
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
        } else if (parsed[1] == "Developers" || parsed[1] == "CMs" || parsed[1] == "Healers" || parsed[1] == "Theorycrafting" || parsed[1] == "Overwatch" || parsed[1] == "HBI") {
            role = roles.get("name", parsed[1]).id; // get roleid of channel
            bot.addMemberToRole(user, role);
            bot.reply(message, "Added you to the " + parsed[1] + " channel!");
        } else { // if role does not exist
            bot.reply(message, "Role does not exist.");
        }
    }
    // !removerole Developers
    else if (input.startsWith("!REMOVEROLE") || input.startsWith("!REMOVE") || input.startsWith("!RM")) {
        if (parsed[1] == "Mage" || parsed[1] == "Death" || parsed[1] == "Druid" || parsed[1] == "Hunter" || parsed[1] == "Demon" || parsed[1] == "Monk" || parsed[1] == "Paladin" || parsed[1] == "Rogue" || parsed[1] == "Shaman" || parsed[1] == "Warlock" || parsed[1] == "Warrior") {
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
        } else if (parsed[1] == "Developers" || parsed[1] == "CMs" || parsed[1] == "Healers" || parsed[1] == "Theorycrafting" || parsed[1] == "Overwatch" || parsed[1] == "HBI") {
            role = roles.get("name", parsed[1]).id;
            bot.removeMemberFromRole(user, role);
            bot.reply(message, "Removed you from " + parsed[1] + "!");
        } else {
            bot.reply(message, "Role does not exist, or you cannot remove that role.");
        }
    }
    // Good Night Jarvis
    else if (input === "GOOD NIGHT JARVIS") {
        role = roles.get("name", "Officers").id;
        if (bot.memberHasRole(user, role)) {
          bot.reply(message, "Good Night Sir.");
        }
    }
    // Jarvis GIF
    else if (input === "!JARVIS") {
        bot.sendFile(message, "http://31.media.tumblr.com/dea23aa7056d90cdfdacdc2117171e6f/tumblr_mmq33aTgAD1rvvj1ho2_r2_500.gif");
    }
    // invite link
    else if (input === "!INVITE") {
        bot.sendMessage(message, "Here is the invite link: XXXXXXXXX");
    }
    // Archimonde Kill Video
    else if (input === "!ARCHIMONDE") {
        bot.sendMessage(message, "Here's the kill video for Mythic Archimonde: https://www.youtube.com/watch?v=Jkt1iId7Xbc");
    }
    // Mannoroth Kill video
    else if (input === "!MANNY" || input === "!MANNOROTH") {
        bot.sendMessage(message, "Here's the kill video for Mythic Mannoroth: https://www.youtube.com/watch?v=b7mTPw0pv20");
    }
    // Xhul'Horac Kill video
    else if (input === "!XHUL'HORAC" || input === "!XHUL") {
        bot.sendMessage(message, "Here's the kill video for Mythic Xhul'Horac: https://www.youtube.com/watch?v=N2aSgC4DlIU");
    }
    // Tyrant Kill video
    else if (input === "!TYRANT") {
        bot.sendMessage(message, "Here's the kill video for Mythic Tyrant: https://www.youtube.com/watch?v=wHUKGvI6U2Y");
    }
    // Fel Lord Kill video
    else if (input === "!FEL LORD" || input === "!FEL") {
        bot.sendMessage(message, "Here's the kill video for Mythic Fel Lord: https://www.youtube.com/watch?v=d0C92xy1fts");
    }
    // Iskar Kill video
    else if (input === "!ISKAR") {
        bot.sendMessage(message, "Hey it's @Codiak#2504 favorite!! Mythic Iskar: https://www.youtube.com/watch?v=9iIAlJQ3Fws");
    }
    // Socrethar Kill video
    else if (input === "!SOCRETHAR" || input === "!SOC") {
        bot.sendMessage(message, "Here's the kill video for Mythic Socrethar: https://www.youtube.com/watch?v=cbO6Ri4XqlA");
    }
    // Gorefiend Kill video
    else if (input === "!GOREFIEND" || input === "!GORE") {
        bot.sendMessage(message, "Here's the kill video for Mythic Gorefiend: https://www.youtube.com/watch?v=OYOQ6ahRAc4");
    }
    // Kilrogg Kill video
    else if (input === "!KILROGG") {
        bot.sendMessage(message, "Here's the kill video for Mythic Kilrogg: https://www.youtube.com/watch?v=37hyWu503zo");
    }
    // COUNCIL Kill video
    else if (input === "!COUNCIL" || input === "!HELLFIRE HIGH COUNCIL") {
        bot.sendMessage(message, "Here's the kill video for Mythic Hellfire High Council: https://www.youtube.com/watch?v=89wK24T2lK8");
    }
    // Kormrok Kill video
    else if (input === "!KORMROK" || input === "!KORM") {
        bot.sendMessage(message, "Here's the kill video for Mythic Kormrok: https://www.youtube.com/watch?v=KAnECqXw11c");
    }
    // Reaver Kill video
    else if (input === "!REAVER" || input === "!IRON REAVER") {
        bot.sendMessage(message, "Here's the kill video for Mythic Iron Reaver: https://www.youtube.com/watch?v=8exVgQfHAaA");
    }
    // Assault Kill video
    else if (input === "!ASSAULT" || input === "!HELLFIRE ASSAULT") {
        bot.sendMessage(message, "Here's the kill video for Mythic Hellfire Assault: https://www.youtube.com/watch?v=FBKpYBYkZ5w");
    }
    // Hans Kill video
    else if (input === "!HANS" || input === "!FRANZ" || input === "!HANS'GAR AND FRANZOK") {
        bot.sendMessage(message, "Here's the kill video for Mythic Hans'gar and Franzok: https://www.youtube.com/watch?v=dCbk8OamUow");
    }
    // Oreo Kill video
    else if (input === "!OREO" || input === "!ORE" || input === "!OREGORGER") {
        bot.sendMessage(message, "Here's the kill video for Mythic Oregorger: https://www.youtube.com/watch?v=F8xwKWEci_I");
    }
    // Gruul Kill video
    else if (input === "!GRUUL") {
        bot.sendMessage(message, "Here's the kill video for Mythic Gruul: https://www.youtube.com/watch?v=zYs9iKxrUGU");
    }
    // Beastlord Kill video
    else if (input === "!BEASTLORD" || input === "!BEASTLORD DARMAC") {
        bot.sendMessage(message, "Here's the kill video for Mythic Beastlord Darmac: https://www.youtube.com/watch?v=n3Jr61veZkQ");
    }
    // YouTube Channel video
    else if (input === "!YOUTUBE") {
        bot.sendMessage(message, "Here's our youtube channel: https://www.youtube.com/channel/UClDUcIXf0USA_WRRuFsmfCw");
    }
    // Plug.dj
    else if (input === "!MUSIC" || input === "!PLUG" || input === "!DJ" || input === "!PLUG.DJ") {
        bot.sendMessage(message, "Here's our Plug.DJ channel: https://plug.dj/exiledpower");
    }
    // Website Link
    else if (input === "!WEBSITE") {
        bot.sendMessage(message, "Check out dat website: http://www.exiledpower.com");
    }
    // Prints out the link to the roster in Google Sheets
    else if (input === "!ROSTER" || input === "#AMISITTING?") {
        bot.sendMessage(message, "Here is the roster: XXXXXXXXX");
    }
    // creator
    else if (input === "!QUESTION WHO CREATED YOU?" || input === "!CREATOR" || input === "!QUESTION WHO IS YOUR CREATOR?") {
        bot.sendMessage(message, "My creator is the almighty Republic of course. He's pretty swell.");
    }
    // !Is cody good at playing hunter?
    else if (input === "!QUESTION IS CODY GOOD AT PLAYING HUNTER?") {
        bot.reply(message, "Nope");
    }
    // its not random
    else if (input === "!RANDOM" || input === "#ITSRANDOM") {
        bot.sendMessage(message, "It's never random. Molo is a cheater.");
    }
    // Prints out list of commands in Discord
    else if (input === "!HELP") {
        bot.sendMessage(message, "List of Commands:\n Kill Vidoes = !BossNameHere\n Website Link = !website\n Weekly Roster = !roster\n Plug.DJ = !music\n Discord invite = !invite\n Add/Remove Channel Roles = !add [or !remove] parsed (parsed = Developers, Healers, Theorycrafting, Overwatch, HBI)\n Change 'now playing' = !GAME input\n WoW Discord Links = !SERVER searchterms");
    }
});
bot.loginWithToken("XXXXXXXXX");
