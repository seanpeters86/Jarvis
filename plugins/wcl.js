var fs = require('fs');
var request = require('request');
var prettyjson = require("prettyjson");

var wclkey = process.env.WCL_KEY;

var encounter, bossname, spec, playerclass;
var raidid = 10; // Emerald Nightmare id = 10, NH = 11, ToV = 12
var partition = 2; // Partition should almost always be set to 1, Pre-Patch/7.2 is 2

var result;

var difficultyList = {
	1: "LFR",
	2: "Flex",
	3: "Normal",
	4: "Heroic",
	5: "Mythic"
};

function classConvert(playerclass) {
	var classList = {
		1: "Death Knight",
		2: "Druid",
		3: "Hunter",
		4: "Mage",
		5: "Monk",
		6: "Paladin",
		7: "Priest",
		8: "Rogue",
		9: "Shaman",
		10: "Warlock",
		11: "Warrior",
		12: "Demon Hunter"
	};
	if (classList[playerclass]) {
		return classList[playerclass];
	} else {
		return "WTF";
	}
}

function specConvert(playerclass, spec) {
	var dk = {
		1: "Blood",
		2: "Frost",
		3: "Unholy"
	};
	var druid = {
		1: "Balance",
		2: "Feral",
		3: "Guardian",
		4: "Restoration"
	};
	var hunter = {
		1: "Beast Mastery",
		2: "Marksmanship",
		3: "Survival"
	};
	var mage = {
		1: "Arcane",
		2: "Fire",
		3: "Frost"
	};
	var monk = {
		1: "Brewmaster",
		2: "Mistweaver",
		3: "Windwalker"
	};
	var paladin = {
		1: "Holy",
		2: "Protection",
		3: "Retribution"
	};
	var priest = {
		1: "Discipline",
		2: "Holy",
		3: "Shadow"
	};
	var rogue = {
		1: "Assassination",
		2: "Combat",
		3: "Subtlety",
		4: "Outlaw"
	};
	var shaman = {
		1: "Elemental",
		2: "Enhancement",
		3: "Restoration"
	};
	var warlock = {
		1: "Affliction",
		2: "Demonology",
		3: "Destruction"
	};
	var warrior = {
		1: "Arms",
		2: "Fury",
		3: "Protection",
		4: "Gladiator"
	};
	var dh = {
		1: "Havoc",
		2: "Vengence"
	};
	var classList = {
		1: dk[spec],
		2: druid[spec],
		3: hunter[spec],
		4: mage[spec],
		5: monk[spec],
		6: paladin[spec],
		7: priest[spec],
		8: rogue[spec],
		9: shaman[spec],
		10: warlock[spec],
		11: warrior[spec],
		12: dh[spec]
	};
	if (classList[playerclass]) {
		return classList[playerclass];
	} else {
		return "WTF";
	}
}

var classList = {
	1: "Death Knight",
	2: "Druid",
	3: "Hunter",
	4: "Mage",
	5: "Monk",
	6: "Paladin",
	7: "Priest",
	8: "Rogue",
	9: "Shaman",
	10: "Warlock",
	11: "Warrior",
	12: "Demon Hunter"
};

var classList = {
	1: "http://wow.zamimg.com/images/wow/icons/large/classicon_deathknight.jpg",
	2: "http://wow.zamimg.com/images/wow/icons/large/classicon_druid.jpg",
	3: "http://wow.zamimg.com/images/wow/icons/large/classicon_hunter.jpg",
	4: "http://wow.zamimg.com/images/wow/icons/large/classicon_mage.jpg",
	5: "http://wow.zamimg.com/images/wow/icons/large/classicon_monk.jpg",
	6: "http://wow.zamimg.com/images/wow/icons/large/classicon_paladin.jpg",
	7: "http://wow.zamimg.com/images/wow/icons/large/classicon_priest.jpg",
	8: "http://wow.zamimg.com/images/wow/icons/large/classicon_rogue.jpg",
	9: "http://wow.zamimg.com/images/wow/icons/large/classicon_shaman.jpg",
	10: "http://wow.zamimg.com/images/wow/icons/large/classicon_warlock.jpg",
	11: "http://wow.zamimg.com/images/wow/icons/large/classicon_warrior.jpg",
	12: "http://wow.zamimg.com/images/wow/icons/large/classicon_demonhunter.jpg"
};

var classColors = {
	11: "13081710",
	6: "16092346",
	3: "11261043",
	8: "16774505",
	7: "16777215",
	1: "12853051",
	9: "28894",
	4: "6933744",
	10: "9732809",
	5: "65430",
	2: "16743690",
	12: "10694857"
};

var bossList = {
	// Nighthold
	1849: "http://wow.zamimg.com/images/wow/icons/large/achievement_thenighthold_skorpyron.jpg",
	1865: "http://wow.zamimg.com/images/wow/icons/large/achievement_thenighthold_chromaticanomaly.jpg",
	1867: "http://wow.zamimg.com/images/wow/icons/large/achievement_thenighthold_trillax.jpg",
	1871: "http://wow.zamimg.com/images/wow/icons/large/achievement_thenighthold_spellbladealuriel.jpg",
	1862: "http://wow.zamimg.com/images/wow/icons/large/achievement_thenighthold_tichondrius.jpg",
	1863: "http://www.wowhead.com/icon=1413861/achievement-thenighthold-starauguretraeus",
	1842: "http://wow.zamimg.com/images/wow/icons/large/achievement_thenighthold_krosus.jpg",
	1886: "http://wow.zamimg.com/images/wow/icons/large/achievement_thenighthold_highbotanisttelam.jpg",
	1872: "http://wow.zamimg.com/images/wow/icons/large/achievement_thenighthold_grandmagistrixelisande.jpg",
	1866: "http://wow.zamimg.com/images/wow/icons/large/achievement_thenighthold_guldan.jpg",
	// Tomb of Sargeras
	2032: "http://wow.zamimg.com/images/wow/icons/large/achievement_boss_pitinfernal.jpg",
	2048: "http://wow.zamimg.com/images/wow/icons/large/achievement_boss_jailers.jpg",
	2036: "http://wow.zamimg.com/images/wow/icons/large/achievement_boss_nagabruteboss.jpg",
	2037: "http://wow.zamimg.com/images/wow/icons/large/achievement_boss_seawitch.jpg",
	2050: "http://wow.zamimg.com/images/wow/icons/large/achievement_boss_councilsentinel.jpg",
	2054: "http://wow.zamimg.com/images/wow/icons/large/achievement_boss_soulengine.jpg",
	2052: "http://wow.zamimg.com/images/wow/icons/large/achievement_boss_maidenofgrief.jpg",
	2038: "http://wow.zamimg.com/images/wow/icons/large/achievement_boss_titanconstructshell.jpg",
	2051: "http://wow.zamimg.com/images/wow/icons/large/achievement_boss_kiljaeden2.jpg",
	// Argus
	2076: "http://wow.zamimg.com/images/wow/icons/large/achievement_boss_argus_felreaver.jpg",
	2074: "http://wow.zamimg.com/images/wow/icons/large/achievement_boss_argus_hound.jpg",
	2070: "http://wow.zamimg.com/images/wow/icons/large/achievement_boss_argus_maleeredar.jpg",
	2075: "http://wow.zamimg.com/images/wow/icons/large/achievement_boss_argus_eonar.jpg",
	2064: "http://wow.zamimg.com/images/wow/icons/large/achievement_boss_argus_femaleeredar.jpg",
	2082: "http://wow.zamimg.com/images/wow/icons/large/achievement_boss_argus_bountyhunter.jpg",
	2088: "http://wow.zamimg.com/images/wow/icons/large/achievement_boss_argus_titanbuilder.jpg",
	2069: "http://wow.zamimg.com/images/wow/icons/large/achievement_boss_argus_varimathras.jpg",
	2073: "http://wow.zamimg.com/images/wow/icons/large/achievement_boss_argus_shivan.jpg",
	2063: "http://wow.zamimg.com/images/wow/icons/large/achievement_boss_argus_aggramar.jpg",
	2092: "http://wow.zamimg.com/images/wow/icons/large/achievement_boss_argus_worldsoul.jpg"
}

module.exports = {
	get_object: function(parsed, parsedReg, input) {
		var char = encodeURIComponent(parsed[1]);
		switch (parsedReg[2]) {
			case "GAROTHI":
			case "WORLDBREAKER":
			case "GAROTHIWORLDBREAKER":
			case "GW":
				raidid = 17;
				encounter = 2076;
				bossname = "Garothi Worldbreaker";
				partition = 1;
				break;
			case "HOUNDS":
			case "HOS":
			case "HOUNDSOFSARGERAS":
				raidid = 17;
				encounter = 2074;
				bossname = "Hounds of Sargeras";
				partition = 1;
				break;
			case "WARCOUNCIL":
			case "COUNCIL":
			case "WAR":
				raidid = 17;
				encounter = 2070;
				bossname = "War Council";
				partition = 1;
				break;
			case "EONAR":
			case "LIFEBINDER":
			case "EONARTHELIFEBINDER":
				raidid = 17;
				encounter = 2075;
				bossname = "Eonar, the Lifebinder";
				partition = 1;
				break;
			case "PORTALKEEPERHASABEL":
			case "PORTAL":
			case "KEEPER":
			case "HASABEL":
				raidid = 17;
				encounter = 2064;
				bossname = "Portal Keeper Hasabel";
				partition = 1;
				break;
			case "IMONAR":
			case "SOULHUNTER":
			case "IMONARTHESOULHUNTER":
				raidid = 17;
				encounter = 2082;
				bossname = "Imonar the Soulhunter";
				partition = 1;
				break;
			case "KINGAROTH":
			case "KIN'GAROTH":
				raidid = 17;
				encounter = 2088;
				bossname = "Kin'garoth";
				partition = 1;
				break;
			case "VARIMATHRAS":
				raidid = 17;
				encounter = 2069;
				bossname = "Varimathras";
				partition = 1;
				break;
			case "COVEN":
			case "SHIVARRA":
			case "COVENOFSHIVARRA":
				raidid = 17;
				encounter = 2073;
				bossname = "The Coven of Shivarra";
				partition = 1;
				break;
			case "AGGRAMAR":
				raidid = 17;
				encounter = 2063;
				bossname = "Aggramar";
				partition = 1;
				break;
			case "ARGUS":
			case "UNMAKER":
				raidid = 17;
				encounter = 2092;
				bossname = "Argus the Unmaker";
				partition = 1;
				break;
			case "GOROTH":
				raidid = 13;
				encounter = 2032;
				bossname = "Goroth";
				partition = 1;
				break;
			case "DEMONIC":
			case "DEMONICINQUISITION":
			case "DI":
				raidid = 13;
				encounter = 2048;
				bossname = "Demonic Inquisition";
				partition = 1;
				break;
			case "HARJATAN":
				raidid = 13;
				encounter = 2036;
				bossname = "Harjatan";
				partition = 1;
				break;
			case "MISTRESS":
			case "SASSZ'INE":
			case "MISTRESSSASSZ'INE":
				raidid = 13;
				encounter = 2037;
				bossname = "Misstress Sassz'ine";
				partition = 1;
				break;
			case "SISTERS":
			case "SISTERSOFTHEMOON":
				raidid = 13;
				encounter = 2050;
				bossname = "Sisters of the Moon";
				partition = 1;
				break;
			case "DESOLATE":
			case "HOST":
			case "DESOLATEHOST":
			case "DH":
				raidid = 13;
				encounter = 2054;
				bossname = "The Desolate Host";
				partition = 1;
				break;
			case "MAIDEN":
			case "MAIDENOFVIGILANCE":
				raidid = 13;
				encounter = 2052;
				bossname = "Maiden of Vigilance";
				partition = 1;
				break;
			case "AVATAR":
			case "FALLEN":
			case "FALLENAVATAR":
				raidid = 13;
				encounter = 2038;
				bossname = "Fallen Avatar";
				partition = 1;
				break;
			case "KJ":
			case "KIL'JAEDEN":
			case "KILJAEDEN":
				raidid = 13;
				encounter = 2051;
				bossname = "Kil'jaeden";
				partition = 1;
				break;
			case "SKORPYRON":
			case "SKORPADRON":
			case "SKORP":
				raidid = 11;
				encounter = 1849;
				bossname = "Skorpyron";
				partition = 3;
				break;
			case "CHRONOMATIC":
			case "ANOMALY":
				raidid = 11;
				encounter = 1865;
				bossname = "Chronomatic Anomaly";
				partition = 3;
				break;
			case "TRILLIAX":
				raidid = 11;
				encounter = 1867;
				bossname = "Trilliax";
				partition = 3;
				break;
			case "SPELLBLADE":
			case "ALURIEL":
				raidid = 11;
				encounter = 1871;
				bossname = "Spellblade Aluriel";
				partition = 3;
				break;
			case "TICHONDRIUS":
			case "TICH":
				raidid = 11;
				encounter = 1862;
				bossname = "Tichondrius";
				partition = 3;
				break;
			case "STAR":
			case "AUGUR":
			case "ETRAEUS":
				raidid = 11;
				encounter = 1863;
				bossname = "Star Augur Etraeus";
				partition = 3;
				break;
			case "KROSUS":
				raidid = 11;
				encounter = 1842;
				bossname = "Krosus";
				partition = 3;
				break;
			case "BOTANIST":
			case "TELARN":
			case "TEL'ARN":
			case "HIGH":
				raidid = 11;
				encounter = 1886;
				bossname = "High Botanist Tel'arn";
				partition = 3;
				break;
			case "ELISANDE":
			case "MAGISTRIX":
			case "GRAND":
				raidid = 11;
				encounter = 1872;
				bossname = "Grand Magistrix Elisande";
				partition = 3;
				break;
			case "GULDANK":
			case "GUL'DAN":
			case "GULDAN":
				raidid = 11;
				encounter = 1866;
				bossname = "Gul'dan";
				partition = 3;
				break;
		}
		if (input.includes("-H")) {
			var uri = "https://www.warcraftlogs.com:443/v1/rankings/character/" + char + "/Arthas/US?zone=" + raidid + "&encounter=" + encounter + "&metric=hps&partition=" + partition + "&api_key=" + wclkey;
		} else {
			var uri = "https://www.warcraftlogs.com:443/v1/rankings/character/" + char + "/Arthas/US?zone=" + raidid + "&encounter=" + encounter + "&metric=dps&partition=" + partition + "&api_key=" + wclkey;
		}
		return [uri, encounter, bossname];
	},
	get_rank: function(rank, bossname, input, parsed) {
		difficulty = parseInt(`${prettyjson.render(rank[0].difficulty)}`)
		spec = parseInt(`${prettyjson.render(rank[0].spec)}`);
		playerclass = parseInt(`${prettyjson.render(rank[0].class)}`);
		var classparsed = classConvert(playerclass);
		var specparsed = specConvert(playerclass, spec);
		var difficultyparsed = difficultyList[difficulty];
		if (input.includes("-H")) {
			// rankObject = [charName,rank,total,bossname,spec,class,metric,difficulty]
			return [parsed[1],`${prettyjson.render(rank[0].rank)}`,`${prettyjson.render(rank[0].outOf)}`,bossname,specparsed,classparsed,"HPS",difficultyparsed,encounter];
			//return parsed[1] + " ranked " + `${prettyjson.render(rank[0].rank)}` + " out of " + `${prettyjson.render(rank[0].outOf)}` + " on " + bossname + " for all " + specparsed + " " + classparsed + "s in HPS for " + difficultyparsed + " difficulty.";
		} else {
			return [parsed[1],`${prettyjson.render(rank[0].rank)}`,`${prettyjson.render(rank[0].outOf)}`,bossname,specparsed,classparsed,"DPS",difficultyparsed,encounter];
			//return parsed[1] + " ranked " + `${prettyjson.render(rank[0].rank)}` + " out of " + `${prettyjson.render(rank[0].outOf)}` + " on " + bossname + " for all " + specparsed + " " + classparsed + "s in DPS for " + difficultyparsed + " difficulty.";
		}
	},
	get_art: function(rank,encounter) {
		// [color,icon]
		return [classColors[parseInt(`${prettyjson.render(rank[0].class)}`)],classList[parseInt(`${prettyjson.render(rank[0].class)}`)],bossList[encounter]];
	}
};
