const mogiri = require("../commands/mogiri").mogiri;

module.exports = {
	name: 'guildMemberAdd',
	async execute(member) {
		mogiri(member);
	},
};