const checkParticipant = require("../commands/mogiri").checkParticipant;

module.exports = {
	name: 'messageCreate',
	async execute(message) {
		if (checkParticipant(message.content)) {
			message.member.roles.add(process.env.participantRoleId);
			console.log("Grant role to " + message.member.user.username);
		}
	},
};