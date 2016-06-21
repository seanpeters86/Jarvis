// Jarvis Discord Bot -- Written by Sean Peters
var Discord = require("discord.js");
var bot = new Discord.Client();
require('String.prototype.startsWith'); // used to parse complicated messages

// username array for !superadd
//var usernames = ["Zurchi","Republic (Sean)"];

// begin main bot
bot.on("message", function(message) {
    // convert message into all upper case and store it in input
    var input = message.content.toUpperCase();
    var server = message.channel.server;
    var roles = message.channel.server.roles;
    var user = message.author;
    var role;
    var roleName = message.content.split(" "); // roleName[0] = "ADDROLE", roleName[1] = "GivenRole"
    // Hello Jarvis
    if (input === "HELLO JARVIS") {
        bot.reply(message, "Hello! Good to be back.");
    }
    // !addrole Role
    else if (input.startsWith("!ADDROLE") || input.startsWith("!ADD")) {
        //bot.sendMessage(message,roleName[1]); // send message that contains the roleid
        // Check of role matches the class list
        if (roleName[1] == "Mage" || roleName[1] == "Death" || roleName[1] == "Druid" || roleName[1] == "Hunter" || roleName[1] == "Demon" || roleName[1] == "Monk" || roleName[1] == "Paladin" || roleName[1] == "Rogue" || roleName[1] == "Shaman" || roleName[1] == "Warlock" || roleName[1] == "Warrior") {
            role = roles.get("name", "Officers").id; //get roll id of Officer/Admin role
            // Check if member is an Officer/Admin
            if (bot.memberHasRole(user, role)) {
                if(roleName[1] == "Death"){
                  roleName[1] = "Death Knight";
                }
                if(roleName[1] == "Demon"){
                  roleName[1] = "Demon Hunter";
                }
                role = roles.get("name", roleName[1]).id; // get roleid of class
                bot.addMemberToRole(user, role);
                bot.reply(message, "You are now a " + roleName[1] + "!");
            } else { // if not an officer/admin
                bot.reply(message, "Class does not exist, or you do not have permission to add that role.");
            }
        // Check if role matches channel list
        } else if (roleName[1] == "Developers" || roleName[1] == "CMs" || roleName[1] == "Healers" || roleName[1] == "Theorycrafting" || roleName[1] == "Overwatch" || roleName[1] == "HBI") {
            role = roles.get("name", roleName[1]).id; // get roleid of channel
            bot.addMemberToRole(user, role);
            bot.reply(message, "Added you to the " + roleName[1] + " channel!");
        } else { // if role does not exist
            bot.reply(message, "Role does not exist.");
        }
    }
    // !removerole Developers
    else if (input.startsWith("!REMOVEROLE") || input.startsWith("!REMOVE") || input.startsWith("!RM")) {
        if (roleName[1] == "Mage" || roleName[1] == "Death" || roleName[1] == "Druid" || roleName[1] == "Hunter" || roleName[1] == "Demon" || roleName[1] == "Monk" || roleName[1] == "Paladin" || roleName[1] == "Rogue" || roleName[1] == "Shaman" || roleName[1] == "Warlock" || roleName[1] == "Warrior") {
            role = roles.get("name", "Officers").id;
            if (bot.memberHasRole(user, role)) {
                if(roleName[1] == "Death"){
                  roleName[1] = "Death Knight";
                }
                if(roleName[1] == "Demon"){
                  roleName[1] = "Demon Hunter";
                }
                role = roles.get("name", roleName[1]).id;
                bot.removeMemberFromRole(user, role);
                bot.reply(message, "You are no longer a " + roleName[1] + "!");
            } else {
                bot.reply(message, "Class does not exist, or you cannot remove that role.");
            }
        } else if (roleName[1] == "Developers" || roleName[1] == "CMs" || roleName[1] == "Healers" || roleName[1] == "Theorycrafting" || roleName[1] == "Overwatch" || roleName[1] == "HBI") {
            role = roles.get("name", roleName[1]).id;
            bot.removeMemberFromRole(user, role);
            bot.reply(message, "Removed you from the " + roleName[1] + "channel!");
        } else {
            bot.reply(message, "Role does not exist, or you cannot remove that role.");
        }
    }
    // Good Night Jarvis
    else if (input === "GOOD NIGHT JARVIS") {
        bot.reply(message, "Good Night Sir.");
    }
    // !Jarvis
    else if (input === "!JARVIS") {
        bot.sendFile(message, "http://31.media.tumblr.com/dea23aa7056d90cdfdacdc2117171e6f/tumblr_mmq33aTgAD1rvvj1ho2_r2_500.gif");
    }
    // invite link
    else if (input === "!INVITE") {
        bot.sendMessage(message, "Here is the invite link: XXXXX");
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
    // Beastlord Kill video
    else if (input === "!YOUTUBE") {
        bot.sendMessage(message, "Here's our youtube channel: https://www.youtube.com/channel/UClDUcIXf0USA_WRRuFsmfCw");
    }
    // Plug.dj
    else if (input === "!MUSIC" || input === "!PLUG" || input === "!DJ" || input === "!PLUG.DJ") {
        bot.sendMessage(message, "Here's our Plug.DJ channel: XXXXX");
    }
    // website
    else if (input === "!WEBSITE") {
        bot.sendMessage(message, "Check out dat website: http://www.exiledpower.com");
    }
    // Roster
    else if (input === "!ROSTER" || input === "#AMISITTING?") {
        bot.sendMessage(message, "Here is the roster: XXXXX");
    }
    // help printer
    else if (input === "!HELP") {
        bot.sendMessage(message, "List of Commands:\n Kill Vidoes = !BossNameHere\n Website Link = !website\n Weekly Roster = !roster\n Plug.DJ = !music\n Discord invite = !invite\n  Add/Remove Channel Roles = !add [or !remove] roleName (roleName = Developers, Healers, Theorycrafting, Overwatch, HBI)");
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
    /*
    // !superadd Zurchi Paladin
    else if(input.startsWith("!SUPERADD")){
      var roleName = message.content.split(" ");
      var server = message.channel.server;
      var roles = message.channel.server.roles;
      if(usernames.indexOf(roleName[1],usernames) > -1){
        var user = message.channel.server.members.get("username",roleName[1]).id;
        bot.sendMessage(message,"Username found!");
      } else {
        bot.sendMessage(message,"Username not found");
      }
      //var role = roles.get("name",roleName[2]).id;
      //bot.addMemberToRole(user,role);
      //bot.reply("Added Paladin to Zurchi");
    }
    */
    // question
    /*
    else if(input.startsWith("!QUESTION")){
      var random = Math.floor((Math.random() * 8) + 1);
      if(random == 1){
        bot.reply(message, "It is certain.");
      }else if(random == 2){
        bot.reply(message, "Without a doubt.");
      }else if(random == 3){
        bot.reply(message, "Most likely.");
      }else if(random == 4){
        bot.reply(message, "Yes.");
      }else if(random == 5){
        bot.reply(message, "No.");
      }else if(random == 6){
        bot.reply(message, "My sources say no.");
      }else if(random == 7){
        bot.reply(message, "Ask again later.");
      }else{
        bot.reply(message, "Very doubtful");
      }
    }
    */
});
bot.loginWithToken("XXXXX");
