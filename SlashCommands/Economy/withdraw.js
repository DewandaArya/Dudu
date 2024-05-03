const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const Database = require("@replit/database")
let db = new Database()

module.exports = {
    data: new SlashCommandBuilder()
        .setName('withdraw')
        .setDescription('Withdraw money from your bank account.')
        .addIntegerOption(option => option.setName('amount').setDescription('The amount of money to withdraw.'))
        .addStringOption(option => option.setName('user').setDescription('The user to withdraw from.').setRequired(false)),
    async execute(client, interaction) {
        let amount = interaction.options.getInteger('amount');
        let target = interaction.options.getUser('user') || interaction.user;
        let balance = await db.get(`wallet_${target.id}`)
        let bank = await db.get(`bank_${target.id}`)
        let total = balance + bank;
        let currency = '<:rupiah:1081586530079997962>';

        if (balance === null) balance = 0
        if (bank === null) bank = 0
        if (total === null) total = 0

        if (!amount) {
            return interaction.reply({ content: "You have to provide a money to withdraw idiot..." });
        } else if (isNaN(amount)) {
            return interaction.reply({ content: "Its not a real money bruh..." });
        } else if (amount > bank) {
            return interaction.reply({ content: "How many money would you withdraw? You have none! LOL!" });
        } else if (amount <= 0) {
            return interaction.reply({ content: "You can't withdraw negative money! You idiot!" });
        } else if (amount > 1000000000) {
            return interaction.reply({ content: "You can't withdraw more than 1,000,000,000!" });
        } else if (amount > 0 && amount <= bank) {
            await db.set(`wallet_${target.id}`, balance + amount)
            await db.set(`bank_${target.id}`, bank - amount)
            let withdrawEmbed = new MessageEmbed()
                .setTitle(`Withdraw Successful!`)
                .setDescription(`You have successfully withdrawn ${currency}${amount.toLocaleString()} from your bank account!`)
                .setColor("GREEN")
            return interaction.reply({ embeds: [withdrawEmbed] });
        } else {
            return interaction.reply({ content: "Something went wrong while processing your request! Please try again later." });
        }
    }
}
