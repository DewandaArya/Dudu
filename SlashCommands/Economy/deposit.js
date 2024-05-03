const { SlashCommandBuilder } = require('@discordjs/builders');
const Database = require('@replit/database');
const Discord = require('discord.js');

let currency = '<:rupiah:1081586530079997962>'
let db = new Database();

module.exports = {
  data: new SlashCommandBuilder()
    .setName('deposit')
    .setDescription('Deposit money to your bank')
    .addIntegerOption(option => option.setName('amount').setDescription('The amount of money to deposit').setRequired(true)),
  async execute(client, interaction) {
    const user = interaction.options.getUser('user') || interaction.user;
    const amount = interaction.options.getInteger('amount');
    if (amount < 1) return interaction.reply('You must deposit at least 1 rupiah');
    let balance = await db.get(`wallet_${interaction.user.id}`)
    let bank = await db.get(`bank_${interaction.user.id}`)
    if (balance === null) balance = 0;
    if (bank === null) bank = 0;
    if (balance < amount) return interaction.reply('You don\'t have enough money to deposit that much');
    await db.set(`wallet_${interaction.user.id}`, balance - amount);
    await db.set(`bank_${user.id}`, bank + amount);
    const embed = new Discord.MessageEmbed()
      .setTitle('Deposit')
      .setDescription(`Deposited ${currency}${amount} to ${user.username}'s bank account`)
      .setColor('RANDOM')
      .setThumbnail(user.displayAvatarURL({ dynamic: true }));
    interaction.reply({ embeds: [embed] });
  }
};
