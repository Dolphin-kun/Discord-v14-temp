const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Ping値を計測します'),
  
	async execute(client, interaction) {
    await interaction.reply({ content: `計算中`, ephemeral: true });
		await interaction.editReply({ content: `Pong! APIレイテンシ : ${Math.round(client.ws.ping)}ms 🛰️`, ephemeral: true });
	},
};
