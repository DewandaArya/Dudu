const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const Database = require('@replit/database');

let currency = '<:rupiah:1081586530079997962>';
let db = new Database();

module.exports = {
  data: new SlashCommandBuilder()
    .setName('balance')
    .setDescription('Shows your wallet and bank balance')
    .addUserOption(option => 
      option
			.setName('user')
			.setDescription('The user to show the balance for')
			.setRequired(false)
    ),
  async execute(client, interaction) {
    const user = interaction.options.getUser('user') || interaction.user;

    let balance = await db.get(`wallet_${user.id}`);
    let bank = await db.get(`bank_${user.id}`);

    if (balance === null) balance = 0;
    if (bank === null) bank = 0;

    const moneyEmbed = new MessageEmbed()
      .setTitle(`${user.username}'s Balance`)
      .setAuthor(user.username, user.displayAvatarURL())
      .setDescription(`Wallet: ${currency}${balance}\nBank: ${currency}${bank}`)
      .setColor('RANDOM')
      .setThumbnail(user.displayAvatarURL({ dynamic: true }));

    await interaction.reply({ embeds: [moneyEmbed] });
  },
};
