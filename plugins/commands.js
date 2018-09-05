var admin = require("./admin");

var classes = ["Mage", "Death", "Druid", "Hunter", "Demon", "Monk", "Paladin", "Priest", "Rogue", "Shaman", "Warlock", "Warrior"];
var channelRoles = ["Developers", "Healers", "Theorycrafting", "Overwatch", "HoTs", "DJ"];
var channelList = ["memes", "developers", "music", "raiding", "guild-chat", "senior-raiders", "officers", "overwatch", "theorycrafting", "welcome", "healing", "hunters", "hots"];
var planfortheweek = "Time to kill Elisande! We will be extending to work on her this week.";

exports.classes = classes;
exports.channelRoles = channelRoles;
exports.channelList = channelList;
exports.fistmas = ["Fistmas is bad kids. Remember that one time Kelsø jumped off the edge on Cenarius? That was Fistmas. http://i.imgur.com/099eVi0.jpg", "Fistmas is bad kids. Remember that one time Moonkin stood in every Volcanic? That was Fistmas. http://i.imgur.com/SZ42W7V.png", "Here's your EP styled Fistmas http://i.imgur.com/KlI0zGc.png"];
exports.salt = ["http://i.imgur.com/Igir7HF.png", "http://i.imgur.com/mzfz7vf.jpg", "https://images.rapgenius.com/44f0fc58fb3a86b3c7cc19cfaab2bf1a.612x612x1.jpg", "https://cdn.meme.am/instances/500x/51800528.jpg", "http://ct.fra.bz/ol/fz/sw/i40/2/4/8/frabz-salt-salt-everywhere-898ce5.jpg", "http://www.relatably.com/m/img/high-level-meme/3972715.jpg", "http://static1.gamespot.com/uploads/original/1333/13335885/2874659-2341208346-ibzFa.gif"];
exports.rekt = ["https://cdn.meme.am/instances/500x/47131303.jpg", "https://cdn.meme.am/instances/500x/50087032.jpg", "https://media.giphy.com/media/opY7SoUTNU3ao/giphy.gif", "http://i.imgur.com/6mbJFvA.jpg", "http://s2.quickmeme.com/img/94/941350454edd1fd9e446160102a2a51b3a7a2394dcfcb40caa9c96d60c9ea94e.jpg", "http://img.lum.dolimg.com/v1/images/ralph-headretina_f6ef0c9b.jpeg", "https://cdn.meme.am/instances/400x/52466269.jpg"];
exports.lore = ["http://i.imgur.com/d4tjQQJ.jpg", "http://i.imgur.com/tbwv6GX.png", "http://i.imgur.com/P2F5bWn.jpg", "http://i.imgur.com/tKNosl0.png", "http://i.imgur.com/TeIzUNt.png", "http://i.imgur.com/G8KLi3L.png", "http://i.imgur.com/lH4laAS.jpg", "http://i.imgur.com/3IgAUMT.jpg", "http://i.imgur.com/ZoKRvOX.png", "http://imgur.com/qugE1Hd", "http://i.imgur.com/Y1oULOj.png", "http://i.imgur.com/ONucxNF.png", "http://i.imgur.com/dEe9rGv.png", "http://i.imgur.com/Qfx2M5y.png", "http://i.imgur.com/8pKvL0X.jpg", "http://i.imgur.com/7K08VQg.png", "http://i.imgur.com/xxrNi8P.png", "http://i.imgur.com/OGhjNNR.png", "http://i.imgur.com/0luga5w.png", "http://i.imgur.com/Kp4SNIc.png", "http://i.imgur.com/mIV7Vmv.png", "http://i.imgur.com/TuHyl0N.jpg"];
exports.responsesBot = ["!ADDONS","!ARMORY","!ARTIFACT","!DISCORD","!DK","!DPS","!GUIDE","!LEGENDARIES","!MACROS","!MAGE","!MAGICSIM","!PLAYLIST","!POLL","!PRIEST","!RELICS","!ROGUE","!TOS","!TRINKETS","!UI","!WA","!WARLOCK","!WCL","!WEIGHTS","!YOUTUBE"]


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
	"!POLITICS": "Make Arthas great again. Don't talk about politics. http://i.imgur.com/fOJGF0Q.png",
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
	"#AMISITTING": "Here is the roster: <https://goo.gl/kkGVNt>",
	"#ITSRANDOM": "It's never random. Molo is a cheater.",
	"!ADDONS": "Legion Addon list:\nAuto Turn In: <https://mods.curse.com/addons/wow/autoturnin>\nWorld Quest Tracker: <https://mods.curse.com/addons/wow/world-quest-tracker>\nWorld Quest List: <https://mods.curse.com/addons/wow/world-quests-list>\nCharacter Stat Sheet: <https://mods.curse.com/addons/wow/dejacharacterstats>\nHandyNotes Tracker: <https://mods.curse.com/addons/wow/handynotes_legionrarestreasures>",
	"!AUDIT": "Here is the audit spreadsheet:\nMains: <https://wowaudit.com/us/arthas/exiled-power>\nAlts: <https://wowaudit.com/us/arthas/exiled-power/2>",
	"!BALANCE": "As of " + balance[0] + " the balance is: **" + balance[1] + "**",
	"!CASH": "As of " + balance[0] + " the balance is: **" + balance[1] + "**",
	"!CODE": "Here is the link to my public source code: <https://github.com/seanpeters86/Jarvis>",
	"!CODEC": "Here is the link for the Video Codec/Exporting Guide + Handbrake: <https://docs.google.com/document/d/1yUhICx-zh16jSX5IF2ReI_CbY39rDArHn2qxI6JprTQ/edit?usp=sharing>",
	"!COLIN": "https://www.youtube.com/watch?v=PkOcm_XaWrw",
	"!COMMAND": planfortheweek,
	"!CONSUMABLES": "Here is the cheat sheet for consumables: <https://docs.google.com/spreadsheets/d/1xFxvryNFfbYRhmhZAPZs4zfa4S6KgoL42aivMFUZxP0/edit?usp=sharing>",
	"!COOKIE": "https://www.youtube.com/watch?v=PkOcm_XaWrw",
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
	"!INVITE": "Here is the invite link: https://discord.gg/rs7VfHY",
	"!INVITE ARTHAS": "Here is the invite link for the Arthas Discord: https://discord.gg/sqDuZth",
	"!ISHAVI": "https://www.youtube.com/watch?v=PkOcm_XaWrw",
	"!ISSUES": "All suggestions/issues for Jarvis should be filled out here: https://github.com/seanpeters86/Jarvis/issues",
	"!KROSUS": "Soaking assignments for Mythic Krosus: <https://docs.google.com/spreadsheets/d/1xDUtMT_vIWvIkq3P9jLE8iaGn4GC_SQjsGL61q_FD60/edit#gid=0>",
	"!LOGS": "Here is the link to the EP Logs: <https://www.warcraftlogs.com/guild/reports-list/75984/>",
	"!MONEY": "As of " + balance[0] + " the balance is: **" + balance[1] + "**",
	"!MUSIC": "Here's our Plug.DJ channel: https://plug.dj/exiledpower",
	"!PIPELINE": "<https://docs.google.com/spreadsheets/d/1sViRs20RzGfe9-mR2TipW5U0oDUJreh7SDI4mysjums/edit?usp=sharing>",
	"!PLAN": planfortheweek,
	"!PLANFORTHEWEEK": planfortheweek,
	"!PLUGDJ": "Here's our Plug.DJ channel: https://plug.dj/exiledpower",
	"!POLITICS": "Make Exiled Power great again. Don't talk about politics. http://i.imgur.com/fOJGF0Q.png",
	"!QUESTION IS CODY GOOD AT PLAYING HUNTER?": "Nope",
	"!RANDOM": "It's never random. Molo is a cheater.",
	"!ROSTER": "Here is the roster: <https://goo.gl/kkGVNt>",
	"!SCHEDULE": "<https://docs.google.com/spreadsheets/d/1sViRs20RzGfe9-mR2TipW5U0oDUJreh7SDI4mysjums/edit?usp=sharing>",
	"!SOURCE": "Here is the link to my public source code: <https://github.com/seanpeters86/Jarvis>",
	"!STATS": "Here is the stat weights/priorities sheet: <https://docs.google.com/document/d/1gIOSfzrSHCd_j_ZUXl0gasuLprjCqzR5hgaVasX7ow4/edit?usp=sharing>",
	"!STAYCLASSY": "The following are the race/class combos we still need:\nTauren(Priest)\nTrolls(Warlock)\nUndead(Hunter)\nGoblins(DK, Rogue, Warlock, Priest)\nPandaren(Mage, Priest)",
	"!TOOLKIT": "Here is the video toolkit: <https://www.dropbox.com/sh/3ly14sy3k4633j3/AADgUuFn8rP3ZwDC6P_Tyqoaa?dl=0>",
	"!TOMB": "Here is the document for ToS boss strats: <https://docs.google.com/document/d/16WugrU4q2zhn2OZrMIsXCs9xBlB_uLr-BffjQNa5KIQ/edit?usp=sharing>",
	"!TOS": "Here is the document for ToS boss strats: <https://docs.google.com/document/d/16WugrU4q2zhn2OZrMIsXCs9xBlB_uLr-BffjQNa5KIQ/edit?usp=sharing>",
	"!UTILITY": "Here is the Legion Defensive/Utility Spell List: <https://docs.google.com/spreadsheets/d/1x6m0C6zJHVsEh63bgUgkQBKyLnkxYGeK3LM5JiVESzY/edit?usp=sharing>",
	"!WARCRAFTLOGS": "Here is the link to the EP Logs: <https://www.warcraftlogs.com/guild/reports-list/75984/>",
	"!WCL": "Here is the link to the EP Logs: <https://www.warcraftlogs.com/guild/reports-list/75984/>",
	"!WEBSITE": "Check out dat website: http://www.exiledpower.com",
	"!WEIGHTS": "Here is the stat weights/priorities sheet: <https://docs.google.com/document/d/1gIOSfzrSHCd_j_ZUXl0gasuLprjCqzR5hgaVasX7ow4/edit?usp=sharing>",
	"!YOUTUBE": "Here's our youtube channel: https://www.youtube.com/channel/UClDUcIXf0USA_WRRuFsmfCw"
};

exports.responsesPublik = {
	"!CODE": "Here is the link to my public source code: <https://github.com/seanpeters86/Jarvis>",
	"!GITHUB": "Here is the link to my public source code: <https://github.com/seanpeters86/Jarvis>",
	"!GIT": "Here is the link to my public source code: <https://github.com/seanpeters86/Jarvis>",
	"HELLO JARVIS": "Hello! Good to be back.",
	"!INVITE": "Here is the invite link: https://discord.gg/bHfbMdb",
	"!ISSUES": "All suggestions/issues for Jarvis should be filled out here: https://github.com/seanpeters86/Jarvis/issues",
	"!SOURCE": "Here is the link to my public source code: <https://github.com/seanpeters86/Jarvis>"
};

exports.responseReplies = {
	"THANKS JARVIS": "Anytime",
	"THANKS, JARVIS": "Anytime"
};
exports.includesBanned = ["COON", "FAG", "RETARD", "NIGGA", "NIGGER", "DYKE"];

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

exports.servers = {
	"AMR": "https://discord.gg/RuJN9xP",
	"API": "https://discord.gg/WtyHkza",
	"ARTHAS": "https://discord.gg/sqDuZth",
	"ASKMRROBOT": "https://discord.gg/RuJN9xP",
	"DEATH": "https://discord.gg/acherus \n https://discord.gg/AyW5RUW",
	"DEMON": "https://discord.gg/taNDycY",
	"DH": "https://discord.gg/taNDycY",
	"DISCORD": "https://discord.gg/WtyHkza",
	"DK": "https://discord.gg/acherus \n https://discord.gg/AyW5RUW",
	"DRUID": "https://discord.gg/0dWu0WkuetF87H9H",
	"EP": "https://discord.gg/Sd6wRfb",
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
	"WCL": "https://discord.gg/3752GVf"
};

exports.help = "You can now message Jarvis directly! Most things will work (other than channel specific stuff).\n \
    *Some commands you can also do ?COMMANDNAME to get more help!*\n \
    **List of Commands:**\n \
    If you need some Fantasy = **!FANTASY**\n \
    What are this weeks' affixes? = **!AFFIXES**\n \
    To get WoWProgress Ranking = **!WOWPROGRESS**\n \
    To get WarcraftLogs Page = **!WCL**\n \
    Get Source Code = **!GITHUB**\n \
    Have an issue/suggestion? = **!ISSUE**\n \
    Is it random? = **!RANDOM**\n \
    Discord invite Link = **!INVITE**\n \
    YouTube Link = **!YOUTUBE**\n \
    Weekly Roster Link = **!ROSTER**\n \
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
    To get WCL Ranking [optional features incluide P for public, T for tanking and H for healing] = **!RANKING CHARACTERNAME BOSSNAME [-P] [-T] [-H]** i.e. **!RANKING Daenall Archimonde -P -H**";
