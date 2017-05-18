var role, channel, data;
var commands = require("./commands");

module.exports = {
	get_role: function(parsed, roles) {
		// Check of role matches the class list
		if (commands.classes.indexOf(parsed[1]) != -1) {
			if (parsed[1] == "Death") {
				parsed[1] = "Death Knight";
			}
			if (parsed[1] == "Demon") {
				parsed[1] = "Demon Hunter";
			}
			role = roles.get("name", parsed[1]).id; // get roleid of class
			return role;
			// Check if role matches channel list
		} else if (commands.channelRoles.indexOf(parsed[1]) != -1) {
			role = roles.get("name", parsed[1]).id; // get roleid of channel
			return role;
			// if role does not exist
		} else {
			return 0;
		}
	},
	get_channel: function(channels, roles, parsed) {
		channel = channels.get("name", parsed[1]).id; // get channel id
		role = roles.get("name", "Officers").id;
		data = parsed[2];
		for (var i = 3; i < parsed.length; i++) {
			data = data + " " + parsed[i];
		}
		return [channel, role, data];
	},
	random: function(ceiling) {
		var random = Math.floor((Math.random() * ceiling));
		return random;
	}
};
