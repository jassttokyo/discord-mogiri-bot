const mogiri = require("../commands/mogiri").mogiri;

module.exports = {
	name: 'guildMemberUpdate',
	async execute(member) {
		mogiri(member);
	},
};