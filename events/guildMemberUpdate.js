const mogiri = require("../commands/mogiri");

module.exports = {
	name: 'guildMemberUpdate',
	async execute(member) {
		mogiri(member);
	},
};