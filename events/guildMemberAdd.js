const mogiri = require("../commands/mogiri").mogiri;

module.exports = {
	name: 'guildMemberAdd',
	async execute(member) {
		mogiri(member);

		// サーバー内のメンバー一覧を走査する
		member.guild.members.cache.forEach(m => mogiri(m));
	},
};