var fs = require('fs');
var request = require('request');
var prettyjson = require("prettyjson");

var wclkey = process.env.WCL_KEY;

var encounter, bossname, spec, playerclass;
var raidid = 10; // Emerald Nightmare id = 10, NH = 11, ToV = 12
var partition = 2; // Partition should almost always be set to 1, Pre-Patch/7.2 is 2

function classConvert(playerclass) {
    var classList = {1: "Death Knight", 2: "Druid", 3: "Hunter", 4: "Mage", 5: "Monk", 6: "Paladin", 7: "Priest", 8: "Rogue", 9: "Shaman", 10: "Warlock", 11: "Warrior", 12: "Demon Hunter"};
    if (classList[playerclass]) {
       return classList[playerclass];
    } else {
        return "WTF";
    }
}

function specConvert(playerclass, spec) {
    var dk = {1: "Blood", 2: "Frost", 3: "Unholy"};
    var druid = {1: "Balance", 2: "Feral", 3: "Guardian", 4: "Restoration"};
    var hunter = {1: "Beast Mastery", 2: "Marksmanship", 3: "Survival"};
    var mage = {1: "Arcane", 2: "Fire", 3: "Frost"};
    var monk = {1: "Brewmaster", 2: "Mistweaver", 3: "Windwalker"};
    var paladin = {1: "Holy", 2: "Protection", 3: "Retribution"};
    var priest = {1: "Discipline", 2: "Holy", 3: "Shadow"};
    var rogue = {1: "Assassination", 2: "Combat", 3: "Subtlety", 4: "Outlaw"};
    var shaman = {1: "Elemental", 2: "Enhancement", 3: "Restoration"};
    var warlock = {1: "Affliction", 2: "Demonology", 3: "Destruction"};
    var warrior = {1: "Arms", 2: "Fury", 3: "Protection", 4: "Gladiator"};
    var dh = {1: "Havoc", 2: "Vengence"};
    var classList = {1: dk[spec], 2: druid[spec], 3: hunter[spec], 4: mage[spec], 5: monk[spec], 6: paladin[spec], 7: priest[spec], 8: rogue[spec], 9: shaman[spec], 10: warlock[spec], 11: warrior[spec], 12: dh[spec]};
    if (classList[playerclass]) {
      return classList[playerclass];
    } else {
      return "WTF";
    }
}

module.exports = {
  ranking: function(parsed, parsedReg, input, user, message) {
    var char = encodeURIComponent(parsed[1]);
    switch (parsedReg[2]) {
        case "SKORPYRON":
        case "SKORPADRON":
        case "SKORP":
            raidid = 11;
            encounter = 1849;
            bossname = "Skorpyron";
            break;
        case "CHRONOMATIC":
        case "ANOMALY":
            raidid = 11;
            encounter = 1865;
            bossname = "Chronomatic Anomaly";
            break;
        case "TRILLIAX":
            raidid = 11;
            encounter = 1867;
            bossname = "Trilliax";
            break;
        case "SPELLBLADE":
        case "ALURIEL":
            raidid = 11;
            encounter = 1871;
            bossname = "Spellblade Aluriel";
            break;
        case "TICHONDRIUS":
        case "TICH":
            raidid = 11;
            encounter = 1862;
            bossname = "Tichondrius";
            break;
        case "STAR":
        case "AUGUR":
        case "ETRAEUS":
            raidid = 11;
            encounter = 1863;
            bossname = "Star Augur Etraeus";
            break;
        case "KROSUS":
            raidid = 11;
            encounter = 1842;
            bossname = "Krosus";
            break;
        case "BOTANIST":
        case "TELARN":
        case "TEL'ARN":
        case "HIGH":
            raidid = 11;
            encounter = 1886;
            bossname = "High Botanist Tel'arn";
            break;
        case "ELISANDE":
        case "MAGISTRIX":
        case "GRAND":
            raidid = 11;
            encounter = 1872;
            bossname = "Grand Magistrix Elisande";
            break;
        case "GULDANK":
        case "GUL'DAN":
        case "GULDAN":
            raidid = 11;
            encounter = 1866;
            bossname = "Gul'dan";
            break;
        case "ODYN":
            raidid = 12;
            encounter = 1958;
            bossname = "Odyn";
            break;
        case "GUARM":
            raidid = 12;
            encounter = 1962;
            bossname = "Guarm";
            break;
        case "HELYA":
            raidid = 12;
            encounter = 2008;
            bossname = "Helya";
            break;
        case "NYTHENDRA":
            raidid = 10;
            encounter = 1853;
            bossname = "Nythendra";
            break;
        case "IL'GYNOTH":
        case "IL":
        case "ILGYNOTH":
        case "TREE":
        case "HEART":
            raidid = 10;
            encounter = 1873;
            bossname = "Il'gynoth, Heart of Corruption";
            break;
        case "ELERETHE":
        case "RENFERAL":
        case "ELE":
            raidid = 10;
            encounter = 1876;
            bossname = "Elerethe Renferal";
            break;
        case "URSOC":
        case "BEAR":
            raidid = 10;
            encounter = 1841;
            bossname = "Ursoc";
            break;
        case "DRAGONS":
        case "DARGONS":
            raidid = 10;
            encounter = 1854;
            bossname = "Dragons of the Nightmare";
            break;
        case "CENARIUS":
            raidid = 10;
            encounter = 1877;
            bossname = "Cenarius";
            break;
        case "XAVIUS":
            raidid = 10;
            encounter = 1864;
            bossname = "Xavius";
            break;
    }
    if (input.includes("-H")) {
        var uri = "https://www.warcraftlogs.com:443/v1/rankings/character/" + char + "/Arthas/US?zone=" + raidid + "&encounter=" + encounter + "&metric=hps&partition=" + partition + "&api_key=" + wclkey;
    } else {
        var uri = "https://www.warcraftlogs.com:443/v1/rankings/character/" + char + "/Arthas/US?zone=" + raidid + "&encounter=" + encounter + "&metric=dps&partition=" + partition + "&api_key=" + wclkey;
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
            if (input.includes("-H")) {
              return parsed[1] + " ranked " + `${prettyjson.render(rank[0].rank)}` + " out of " + `${prettyjson.render(rank[0].outOf)}` + " on " + bossname + " for all " + specparsed + " " + classparsed + "s in HPS";
            } else {
              return parsed[1] + " ranked " + `${prettyjson.render(rank[0].rank)}` + " out of " + `${prettyjson.render(rank[0].outOf)}` + " on " + bossname + " for all " + specparsed + " " + classparsed + "s in DPS";
            }
        } else {
          return "Character or rank not found";
        }
    });
  }
}
