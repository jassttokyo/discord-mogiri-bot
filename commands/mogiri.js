const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('mogiri')
		.setDescription('mogiri command'),
	async execute(interaction) {
		mogiri();
	},
};

function mogiri() {
	//Do mogiri
}