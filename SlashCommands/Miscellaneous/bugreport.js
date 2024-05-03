const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageAttachment } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('bugreport')
    .setDescription('Report a bug to the bot owner.')
    .addStringOption(option => 
        option
			.setName('bug')
      .setDescription('Describe the bug you encountered.')
      .setRequired(true))
    .addAttachmentOption(option =>
        option
			.setName('screenshot')
      .setDescription('Include a screenshot?')
			.setRequired(false)),
  async execute(client, interaction) {
    const bug = interaction.options.getString('bug');
		const attachment = interaction.options.getAttachment(`screenshot`);
		const file = new MessageAttachment(attachment);
    const ownerId = '967627633603002428';
		const owner = await client.users.fetch(ownerId);

    await owner.send({ content: `**New Bug Report** from ${interaction.user}: ${bug}`, files: [file] });
    await interaction.reply({ content: 'Bug report has been sent!', ephemeral: true });
  },
};
