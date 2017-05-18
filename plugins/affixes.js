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

module.exports = {
  get_affixes: function() {
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
      return[affix,nextAffix];
    }
    catch(err) {
      console.log(err);
    }
  }
};
