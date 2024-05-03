const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Displays the bot\'s latency.'),
    async execute(client, interaction) {
        // Get the bot's ping
        const ping = Date.now() - interaction.createdTimestamp;

        // Get the API latency
        const apiPing = Math.round(client.ws.ping);

        // Determine latency level based on ping
        let latencyLevel = '';
        let emoji = '';
        if (ping < 100) {
            latencyLevel = 'Fast';
            emoji = '🟢';
        } else if (ping < 200) {
            latencyLevel = 'Medium';
            emoji = '🟡';
        } else {
            latencyLevel = 'Slow';
            emoji = '🔴';
        }

        // Create ping message embed
        const pingEmbed = new MessageEmbed()
            .setTitle('Ping')
            .setColor('GOLD')
            .addField('Latency', `${ping}ms`, true)
            .addField('API Latency', `${apiPing}ms`, true)
            .addField('Latency Level', `${emoji}${latencyLevel}`);

        await interaction.reply({ embeds: [pingEmbed] });
    },
};
