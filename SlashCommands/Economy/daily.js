const { SlashCommandBuilder } = require('@discordjs/builders');
const Database = require('@replit/database');
const db = new Database();

module.exports = {
  data: new SlashCommandBuilder()
    .setName('daily')
    .setDescription('Claim your daily reward!'),
  async execute(client, interaction) {
    const check = await db.get(`dailyCheck_${interaction.user.id}`);
    const timeout = 86400000;
    if (check !== null && timeout - (Date.now() - check) > 0) {
      const { default: ms } = await import('pretty-ms');
      const timeLeft = ms(timeout - (Date.now() - check));
      await interaction.reply(`You have already claimed your daily prize, come back after ${timeLeft}`);
    } else {
      let reward = Math.floor(Math.random() * 456) + 567;
      let currency = '<:currency:1009437584063213640>';
      let currentBalance = await db.get(`wallet_${interaction.user.id}`);
      await interaction.reply(`GG! You claimed ${reward.toLocaleString()}${currency} as your daily reward! Come back tomorrow!`);
      await db.set(`wallet_${interaction.user.id}`, currentBalance + reward);
      await db.set(`dailyCheck_${interaction.user.id}`, Date.now());
    }
  },
};
