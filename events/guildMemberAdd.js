const mogiri = require("../commands/mogiri");

module.exports = {
	name: 'guildMemberAdd',
	async execute(member) {
		mogiri(member);
	},
};