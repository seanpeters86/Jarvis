var affixList = {
  "0": {
    "affix4": "Teeming",
    "affix7": "Skittish",
    "affix10": "Fortified"
  },
  "1": {
    "affix4": "Raging",
    "affix7": "Necrotic",
    "affix10": "Fortified"
  },
  "2": {
    "affix4": "Bolstering",
    "affix7": "Overflowing",
    "affix10": "Tyrannical"
  },
  "3": {
    "affix4": "Sanguine",
    "affix7": "Volcanic",
    "affix10": "Fortified"
  },
  "4": {
    "affix4": "Teeming",
    "affix7": "Necrotic",
    "affix10": "Tyrannical"
  },
  "5": {
    "affix4": "Raging",
    "affix7": "Volcanic",
    "affix10": "Tyrannical"
  },
  "6": {
    "affix4": "Bolstering",
    "affix7": "Skittish",
    "affix10": "Fortified"
  },
  "7": {
    "affix4": "Sanguine",
    "affix7": "Overflowing",
    "affix10": "Tyrannical"
  }
};

function getWeekNumber(d) {
    d = new Date(+d);
    d.setHours(0,0,0,0);
    d.setDate(d.getDate() + 4 - (d.getDay()||7));
    var yearStart = new Date(d.getFullYear(),0,1);
    var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
    return weekNo;
}

var affixes = "This weeks' affixes are: " + affixList[getWeekNumber(new Date()) % 8].affix4 + " (+4) , " + affixList[getWeekNumber(new Date()) % 8].affix7 + " (+7), and " + affixList[getWeekNumber(new Date()) % 8].affix10 + " (+10). ";
