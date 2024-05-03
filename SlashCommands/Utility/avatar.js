const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('avatar')
    .setDescription("Displays user's avatar")
    .addUserOption(option => option.setName('user').setDescription('Select a user')),

  async execute(client, interaction) {
    const user = interaction.options.getUser('user') || interaction.user;

    const embed = new MessageEmbed()
      .setTitle(`${user.username}'s Avatar`)
      .addField('PNG', `[Link](${user.displayAvatarURL({ size: 4096, dynamic: true, format: "png" })})`, true)
      .addField('JPG', `[Link](${user.displayAvatarURL({ size: 4096, dynamic: true, format: "jpg" })})`, true)
      .addField('WEBP', `[Link](${user.displayAvatarURL({ size: 4096, dynamic: true, format: "webp" })})`, true)
      .setImage(user.displayAvatarURL({ size: 4096, dynamic: true }))
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
