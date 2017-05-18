var fs = require('fs');
var request = require('request');
var prettyjson = require("prettyjson");

var battlenetkey = process.env.BATTLE_NET_KEY;

module.exports = {
  get_mythic_plus: function(char) {
      var charName = `${prettyjson.render(char.name)}`;
      var arrayLength = char.achievements.criteria.length;
      var index2, index5, index10;
      for (var i = 0; i < arrayLength; i++) {
          if (char.achievements.criteria[i] == 33096) {
              index2 = i;
          }
          if (char.achievements.criteria[i] == 33097) {
              index5 = i;
          }
          if (char.achievements.criteria[i] == 33098) {
              index10 = i;
          }
      }
      var plustwo = (`${prettyjson.render(char.achievements.criteriaQuantity[index2])}`);
      var plusfive = (`${prettyjson.render(char.achievements.criteriaQuantity[index5])}`);
      var plusten = (`${prettyjson.render(char.achievements.criteriaQuantity[index10])}`);
      if (!plustwo) {
          plustwo = "0";
      }
      if (!plusfive) {
          plusfive = "0";
      }
      if (!plusten) {
          plusten = "0";
      }
      console.log(charName + " has completed " + plustwo + " mythic+ dungeons.");
      var mythicPlusValue = charName + " has completed " + plustwo + " mythic+ dungeons in time.";
      return mythicPlusValue;
  },
  get_mythics: function(char) {
      var count = 0;
      var charName = `${prettyjson.render(char.name)}`;
      // dungeons and raids = 5, legion = 6
      var arrayLength = char.statistics.subCategories[5].subCategories[6].statistics.length;
      for (var i = 0; i < arrayLength; i++) {
          var object = char.statistics.subCategories[5].subCategories[6].statistics[i];
          if (object.id == 10880 || object.id == 10883 || object.id == 10886 || object.id == 10889 || object.id == 10892 || object.id == 10895 || object.id == 10898 || object.id == 10901 || object.id == 10904 || object.id == 10907 || object.id == 10910) {
              count = count + object.quantity;
          }
      }
      console.log(charName + " has completed " + count + " mythic dungeons.");
      var mythicValue = charName + " has completed " + count + " mythic dungeons.";
      return mythicValue;
  }
};
