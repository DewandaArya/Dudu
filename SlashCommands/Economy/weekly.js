const { SlashCommandBuilder } = require('@discordjs/builders');
const Database = require("@replit/database");
let db = new Database();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('weekly')
		.setDescription('Claim your weekly reward!'),
	async execute(client, interaction) {
		const check = await db.get(`weeklyCheck_${interaction.user.id}`);
		const timeout = 604800000;
		if (check !== null && timeout - (Date.now() - check) > 0) {
			const { default: ms } = await import("pretty-ms");
			const timeLeft = ms(timeout - (Date.now() - check));
			await interaction.reply(`You have already claimed your weekly prize idiot... Come back after ${timeLeft} bro...`);
		} else {
			let reward = Math.floor(Math.random() * 1000) + 7000;
			let currentBalance = await db.get(`wallet_${interaction.user.id}`);
			await interaction.reply(`GG! You claimed ${reward.toLocaleString()} as your weekly reward!`);
			await db.set(`wallet_${interaction.user.id}`, currentBalance + reward);
			await db.set(`weeklyCheck_${interaction.user.id}`, Date.now());
		}
	},
};
