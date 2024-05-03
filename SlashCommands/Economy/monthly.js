const { SlashCommandBuilder } = require('@discordjs/builders');
const Database = require("@replit/database");

const db = new Database();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('monthly')
		.setDescription('Claim your monthly reward!'),
	async execute(client, interaction) {
		const check = await db.get(`monthlyCheck_${interaction.user.id}`);
		const timeout = 2592000000;
		if (check !== null && timeout - (Date.now() - check) > 0) {
			const { default: ms } = await import("pretty-ms");
			const timeLeft = ms(timeout - (Date.now() - check));
			await interaction.reply(`LOL! You have already claimed your monthly prize! Come back after ${timeLeft} bro...`);
		} else {
			let reward = Math.floor(Math.random() * 7000) + 10000;
			let currentBalance = await db.get(`wallet_${interaction.user.id}`);
			await interaction.reply(`GG! You claimed ${reward.toLocaleString()} as your monthly reward!`);
			await db.set(`wallet_${interaction.user.id}`, currentBalance + reward);
			await db.set(`monthlyCheck_${interaction.user.id}`, Date.now());
		}
	},
};
