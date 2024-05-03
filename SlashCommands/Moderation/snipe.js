const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require(`@discordjs/builders`);

module.exports = {
    data: new SlashCommandBuilder()
        .setName('snipe')
        .setDescription('Snipe the latest deleted message'),
    async execute(client, interaction) {
        const msg = client.snipes.get(interaction.channelId); //find the deleted message in the interaction channel
        if (!msg) return interaction.reply("Didn't find any deleted messages."); //if there is no deleted message, reply with this message

        const embed = new MessageEmbed()
            .setDescription(`**Snipe in <#${interaction.channelId}>**\n\n` + `Message by: ` + `*<@${msg.author}>*` + `\nContent: \n` + msg.content)
            .setTimestamp()
            .setColor(`RANDOM`);

        if (msg.image) embed.setImage(msg.image); //if the deleted message has image, then set the image in the embed to it
        await interaction.reply({ embeds: [embed] });
    },
};
