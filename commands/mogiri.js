const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('mogiri')
		.setDescription('mogiri command'),
	async execute(interaction) {
		interaction.guild.members.cache.forEach(m => mogiri(m));
		interaction.reply('done.');
	},
	checkParticipant,
	mogiri
};

/**
 * ロールを付与する
 * @param {GuildMember} member : 付与対象のメンバー
 */
function mogiri(member) {
	// 既に付与済みであれば処理をスキップする
	if (member.roles.cache.has(process.env.participantRoleId)) return;

	if (checkParticipant(member.user.username)) {
		member.roles.add(process.env.participantRoleId);
		console.log("Grant role to " + member.user.username);
	}
	if (checkParticipant(member.nickname)) {
		member.roles.add(process.env.participantRoleId);
		console.log("Grant role to " + member.nickname);
	}
}

/**
 * 
 * @param {String} name 
 * @returns 付与対象であればtrue
 */
function checkParticipant(name) {
	if (!name) return false;
	if (name.match(/.*To2-\d{5}.*/)) return true;
}