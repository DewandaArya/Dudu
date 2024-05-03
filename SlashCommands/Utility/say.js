const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('say')
        .setDescription('Say a message with the bot.')
			.addStringOption(o => o.setName(`string`).setDescription(`What to say`).setRequired(true)),
	  async execute(interaction) {
			await interaction.channel.send(interaction.options.getString(`string`))
			.then(interaction.reply({ content: `Message Sent.`, ephemeral: true }))
		},
};