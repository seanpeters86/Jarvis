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

module.exports = {
  get_artifact: function(parsedReg) {
    try {
      var classList = {
          "DK": dk[parsedReg[2]], "DRUID": druid[parsedReg[2]], "HUNTER": hunter[parsedReg[2]], "MAGE": mage[parsedReg[2]], "MONK": monk[parsedReg[2]], "PALADIN": paladin[parsedReg[2]], "PRIEST": priest[parsedReg[2]], "ROGUE": rogue[parsedReg[2]], "SHAMAN": shaman[parsedReg[2]], "WARLOCK": warlock[parsedReg[2]], "WARRIOR": warrior[parsedReg[2]], "DH": dh[parsedReg[2]]
      };
      return classList[parsedReg[1]];
    }
    catch(err){
      console.log(err);
    }
  }
};
