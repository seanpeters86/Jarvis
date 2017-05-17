var classes = ["Mage", "Death", "Druid", "Hunter", "Demon", "Monk", "Paladin", "Priest", "Rogue", "Shaman", "Warlock", "Warrior"];
var channelRoles = ["Developers", "Music", "Healers", "Theorycrafting", "Overwatch", "HoTs", "Memes"];
var channelList = ["memes", "developers", "music", "raiding", "guild-chat", "senior-raiders", "officers", "overwatch", "theorycrafting", "welcome", "healing", "hunters", "hots"];
var planfortheweek = "Time to kill Elisande! We will be extending to work on her this week.";

var balance = [process.env.BALANCE_DATE, process.env.BALANCE];


exports.responsesArthas = {
  "?ADDROLE": "To get your class color added use '!add className' where channel name is a valid name (case matters!). The options are: ```" + classes + "```",
  "?ADD": "To get your class color added use '!add className' where channel name is a valid name (case matters!). The options are: ```" + classes + "```",
  "!ADDONS": "Legion Addon list:\nAuto Turn In: <https://mods.curse.com/addons/wow/autoturnin>\nWorld Quest Tracker: <https://mods.curse.com/addons/wow/world-quest-tracker>\nWorld Quest List: <https://mods.curse.com/addons/wow/world-quests-list>\nCharacter Stat Sheet: <https://mods.curse.com/addons/wow/dejacharacterstats>\nHandyNotes Tracker: <https://mods.curse.com/addons/wow/handynotes_legionrarestreasures>",
  "!ARTHAS": "Hello World",
  "!CODE": "Here is the link to my public source code: <https://github.com/seanpeters86/Jarvis>",
  "!CONSUMABLES": "Here is the cheat sheet for enchants/food/gems: <https://docs.google.com/spreadsheets/d/15flVJkQneUV6ezKmfIOuJRzzOfYvSP7nqX1qtWzXfpM/htmlview?sle=true#gid=0>",
  "!COOKING": "Here is the Legion Cooking Recipes List: <https://docs.google.com/spreadsheets/d/1jqMLjJiXKbGnrRQpekK1ZqcU2F-67epTottR50-3du0/edit#gid=0>",
  "!DEFENSIVES": "Here is the Legion Defensive/Utility Spell List: <https://docs.google.com/spreadsheets/d/1x6m0C6zJHVsEh63bgUgkQBKyLnkxYGeK3LM5JiVESzY/edit?usp=sharing>",
  "!ENCHANTS": "Here is the cheat sheet for enchants/food/gems: <https://docs.google.com/spreadsheets/d/15flVJkQneUV6ezKmfIOuJRzzOfYvSP7nqX1qtWzXfpM/htmlview?sle=true#gid=0>",
  "!FOOD": "Here is the cheat sheet for enchants/food/gems: <https://docs.google.com/spreadsheets/d/15flVJkQneUV6ezKmfIOuJRzzOfYvSP7nqX1qtWzXfpM/htmlview?sle=true#gid=0>",
  "!GEMS": "Here is the cheat sheet for enchants/food/gems: <https://docs.google.com/spreadsheets/d/15flVJkQneUV6ezKmfIOuJRzzOfYvSP7nqX1qtWzXfpM/htmlview?sle=true#gid=0>",
  "!GITHUB": "Here is the link to my public source code: <https://github.com/seanpeters86/Jarvis>",
  "!GIT": "Here is the link to my public source code: <https://github.com/seanpeters86/Jarvis>",
  "HELLO JARVIS": "Hello! Good to be back.",
  "!ISSUES": "All suggestions/issues for Jarvis should be filled out here: https://github.com/seanpeters86/Jarvis/issues",
  "!QUESTION IS CODY GOOD AT PLAYING HUNTER?": "Nope",
  "!ROLE": "To gain access to the DPS, Tanking, or Healer channels please reach out to your guild officers or a server admin. Roles must be assigned to each individual member on a case-by-case basis. Please remember that these channels are meant for constructive conversation and should be limited to discussions revolving around your class and role in the game.",
  "!RULES": "SERVER RULES \n1. Treat everyone with respect regardless of skill level. \n2. There is a zero tolerance policy for hate speak, bullying, harassment of any kind \n3. Always direct questions and comments to the proper channels\n4. Server use is for US Arthas players and friends only\n5. NSFW content is not allowed and will result in a global ban\n6. Discussions around politics, racism, sexism, and religion are not allowed\n7. Spoilers are allowed in #general only.\n8. Self-promotion is only allowed in the #streams-and-promotion channel.\n9. Concerns should be brought to the attention of the officer immediately\n10. Members are required to add a guild tag at the end of their name via the nickname feature",
  "!SOURCE": "Here is the link to my public source code: <https://github.com/seanpeters86/Jarvis>",
  "!STATS": "Here is the stat weights/priorities sheet: <https://docs.google.com/document/d/1gIOSfzrSHCd_j_ZUXl0gasuLprjCqzR5hgaVasX7ow4/edit?usp=sharing>",
  "!WEBSITE": "Check out dat website: http://www.exiledpower.com",
  "!WEIGHTS": "Here is the stat weights/priorities sheet: <https://docs.google.com/document/d/1gIOSfzrSHCd_j_ZUXl0gasuLprjCqzR5hgaVasX7ow4/edit?usp=sharing>",
  "!YOUTUBE": "Here's our youtube channel: https://www.youtube.com/channel/UClDUcIXf0USA_WRRuFsmfCw"
};

exports.responses = {
    "?ADDROLE": "To get added into a channel type '!add channelName' where channel name is a valid name (case matters!). The options are: ```" + channelRoles + "```",
    "?ADD": "To get added into a channel type '!add channelName' where channel name is a valid name (case matters!). The options are: ```" + channelRoles + "```",
    "#AMISITTING": "Here is the roster: <https://docs.google.com/spreadsheets/d/1Clq6mEklsLo5FWLd80D8togXN19MbBhVSci7inhre28/edit#gid=491110509>",
    "#ITSRANDOM": "It's never random. Molo is a cheater.",
    "!ADDONS": "Legion Addon list:\nAuto Turn In: <https://mods.curse.com/addons/wow/autoturnin>\nWorld Quest Tracker: <https://mods.curse.com/addons/wow/world-quest-tracker>\nWorld Quest List: <https://mods.curse.com/addons/wow/world-quests-list>\nCharacter Stat Sheet: <https://mods.curse.com/addons/wow/dejacharacterstats>\nHandyNotes Tracker: <https://mods.curse.com/addons/wow/handynotes_legionrarestreasures>",
    "!AUDIT": "Here is the audit spreadsheet <https://docs.google.com/spreadsheets/d/17vrjNIiPXNUSuRfglGzkNV62GWRaD-LJa88NdVcxXhk/edit?usp=sharing>\nHere is the other audit spreadsheet from Plan: <https://docs.google.com/spreadsheets/d/1JdxmWiqMkA4RRGBSXMhy7sCdMX02qvHD0qt77V-FN10/edit#gid=241918221>",
    "!BALANCE": "As of " + balance[0] + " the balance is: **" + balance[1] + "**",
    "!CASH": "As of " + balance[0] + " the balance is: **" + balance[1] + "**",
    "!CODE": "Here is the link to my public source code: <https://github.com/seanpeters86/Jarvis>",
    "!CODEC": "Here is the link for the Video Codec/Exporting Guide + Handbrake: <https://docs.google.com/document/d/1yUhICx-zh16jSX5IF2ReI_CbY39rDArHn2qxI6JprTQ/edit?usp=sharing>",
    "!COMMAND": planfortheweek,
    "!CONSUMABLES": "Here is the cheat sheet for enchants/food/gems: <https://docs.google.com/spreadsheets/d/15flVJkQneUV6ezKmfIOuJRzzOfYvSP7nqX1qtWzXfpM/htmlview?sle=true#gid=0>",
    "!COOKING": "Here is the Legion Cooking Recipes List: <https://docs.google.com/spreadsheets/d/1jqMLjJiXKbGnrRQpekK1ZqcU2F-67epTottR50-3du0/edit#gid=0>",
    "!DEFENSIVES": "Here is the Legion Defensive/Utility Spell List: <https://docs.google.com/spreadsheets/d/1x6m0C6zJHVsEh63bgUgkQBKyLnkxYGeK3LM5JiVESzY/edit?usp=sharing>",
    "!DRAWING": "Here is the drawing board for EP videos: <https://docs.google.com/document/d/1iKo5CfvR2X-fCaQfzUvI7LJIgwGvs5TYvUJrcEWJC00/edit?usp=sharing>",
    "!ENCHANTS": "Here is the cheat sheet for enchants/food/gems: <https://docs.google.com/spreadsheets/d/15flVJkQneUV6ezKmfIOuJRzzOfYvSP7nqX1qtWzXfpM/htmlview?sle=true#gid=0>",
    "!FOOD": "Here is the cheat sheet for enchants/food/gems: <https://docs.google.com/spreadsheets/d/15flVJkQneUV6ezKmfIOuJRzzOfYvSP7nqX1qtWzXfpM/htmlview?sle=true#gid=0>",
    "!GEMS": "Here is the cheat sheet for enchants/food/gems: <https://docs.google.com/spreadsheets/d/15flVJkQneUV6ezKmfIOuJRzzOfYvSP7nqX1qtWzXfpM/htmlview?sle=true#gid=0>",
    "!GITHUB": "Here is the link to my public source code: <https://github.com/seanpeters86/Jarvis>",
    "!GIT": "Here is the link to my public source code: <https://github.com/seanpeters86/Jarvis>",
    "HELLO JARVIS": "Hello! Good to be back.",
    "!IDEAS": "<https://docs.google.com/spreadsheets/d/1sViRs20RzGfe9-mR2TipW5U0oDUJreh7SDI4mysjums/edit?usp=sharing>",
    "!INVITE": "Here is the invite link: https://discord.gg/0wt0wUFZgL39GHuH",
    "!INVITE ARTHAS": "Here is the invite link for the Arthas Discord: https://discord.gg/sqDuZth",
    "!ISSUES": "All suggestions/issues for Jarvis should be filled out here: https://github.com/seanpeters86/Jarvis/issues",
    "!KROSUS": "Soaking assignments for Mythic Krosus: <https://docs.google.com/spreadsheets/d/1xDUtMT_vIWvIkq3P9jLE8iaGn4GC_SQjsGL61q_FD60/edit#gid=0>",
    "!LOGS": "Here is the link to the EP Logs: <https://www.warcraftlogs.com/guilds/reportslist/75984/>",
    "!MONEY": "As of " + balance[0] + " the balance is: **" + balance[1] + "**",
    "!MUSIC": "Here's our Plug.DJ channel: https://plug.dj/exiledpower",
    "!PIPELINE": "<https://docs.google.com/spreadsheets/d/1sViRs20RzGfe9-mR2TipW5U0oDUJreh7SDI4mysjums/edit?usp=sharing>",
    "!PLAN": planfortheweek,
    "!PLANFORTHEWEEK": planfortheweek,
    "!PLUGDJ": "Here's our Plug.DJ channel: https://plug.dj/exiledpower",
    "!QUESTION IS CODY GOOD AT PLAYING HUNTER?": "Nope",
    "!RANDOM": "It's never random. Molo is a cheater.",
    "!ROSTER": "Here is the roster: <https://docs.google.com/spreadsheets/d/1Clq6mEklsLo5FWLd80D8togXN19MbBhVSci7inhre28/edit#gid=491110509>",
    "!SCHEDULE": "<https://docs.google.com/spreadsheets/d/1sViRs20RzGfe9-mR2TipW5U0oDUJreh7SDI4mysjums/edit?usp=sharing>",
    "!SOURCE": "Here is the link to my public source code: <https://github.com/seanpeters86/Jarvis>",
    "!STATS": "Here is the stat weights/priorities sheet: <https://docs.google.com/document/d/1gIOSfzrSHCd_j_ZUXl0gasuLprjCqzR5hgaVasX7ow4/edit?usp=sharing>",
    "!STAYCLASSY": "The following are the race/class combos we still need:\nTauren(Priest)\nTrolls(Warlock)\nUndead(Hunter)\nGoblins(DK, Rogue, Warlock, Priest)\nPandaren(Mage, Priest)",
    "!UTILITY": "Here is the Legion Defensive/Utility Spell List: <https://docs.google.com/spreadsheets/d/1x6m0C6zJHVsEh63bgUgkQBKyLnkxYGeK3LM5JiVESzY/edit?usp=sharing>",
    "!WARCRAFTLOGS": "Here is the link to the EP Logs: <https://www.warcraftlogs.com/guilds/reportslist/75984/>",
    "!WCL": "Here is the link to the EP Logs: <https://www.warcraftlogs.com/guilds/reportslist/75984/>",
    "!WEBSITE": "Check out dat website: http://www.exiledpower.com",
    "!WEIGHTS": "Here is the stat weights/priorities sheet: <https://docs.google.com/document/d/1gIOSfzrSHCd_j_ZUXl0gasuLprjCqzR5hgaVasX7ow4/edit?usp=sharing>",
    "!YOUTUBE": "Here's our youtube channel: https://www.youtube.com/channel/UClDUcIXf0USA_WRRuFsmfCw"
};

exports.responseReplies = {"THANKS JARVIS": "Anytime",
                       "THANKS, JARVIS": "Anytime"};
exports.banned = ["COON","FAG","RETARD","NIGGA","NIGGER","DYKE"];

exports.responsesFiles = {
    "!FANTASY": "http://i.imgur.com/EMSiUF3.jpg",
    "!JARVIS": "http://31.media.tumblr.com/dea23aa7056d90cdfdacdc2117171e6f/tumblr_mmq33aTgAD1rvvj1ho2_r2_500.gif",
    "!KIEYA": "http://i.imgur.com/B5c2DJT.jpg",
    "!SHAME": "http://i.imgur.com/FidZknJ.gif",
    "!18STACKS": "http://i.imgur.com/cZioXZF.jpg",
    "!SWOPE": "http://i.imgur.com/7Wi93en.png",
    "!TAILSWOPE": "http://i.imgur.com/7Wi93en.png",
    "!THINKING": "https://i.imgur.com/eSsPjos.gif"
};
