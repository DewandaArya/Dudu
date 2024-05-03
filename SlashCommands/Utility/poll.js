const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('poll')
        .setDescription('Replies with Poll!')
			.addStringOption(o =>
				o
				.setName(`question`)
				.setDescription(`What you want to ask`)
				.setRequired(true)),
    async execute(client, interaction) {
			let questions = interaction.options.getString(`question`);
        await interaction.reply({ content: `___${interaction.member.nickname || interaction.user.username}___ Asks: ***${questions}***`, fetchReply: true })
					.then((m) => {
						m.react(`✅`)
							m.react(`❎`)
					})
			.catch(console.error);
    },
};