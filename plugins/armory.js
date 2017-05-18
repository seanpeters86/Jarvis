var fs = require('fs');
var request = require('request');
var prettyjson = require("prettyjson");

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
