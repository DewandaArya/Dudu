const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('status')
        .setDescription('Displays the current status of the bot.'),
    async execute(client, interaction) {
        // Get bot uptime in seconds
        const uptimeInSeconds = Math.floor(process.uptime());

        // Get bot uptime in minutes and seconds
        const minutes = Math.floor(uptimeInSeconds / 60);
        const seconds = uptimeInSeconds % 60;

        // Create status message embed
        const statusEmbed = new MessageEmbed()
            .setTitle('Bot Status')
            .setColor('GREEN')
            .addField('Uptime', `${minutes}m ${seconds}s`)
            .addField('Ping', `${Math.round(client.ws.ping)}ms`);

        await interaction.reply({ embeds: [statusEmbed] });
    },
};
