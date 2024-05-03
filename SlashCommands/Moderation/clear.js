const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('clear')
		.setDescription('Clears the Chat History!')
		.addNumberOption((option) =>
			option
				.setName(`amount`)
				.setDescription(`The Number of Messages to be Cleared (Leave it Blank to Clear 25 Messages)`)
				.setRequired(false)
		),
	async execute(client, interaction) {
		let a = interaction.options.getNumber(`amount`) || 25;

		if (a > 100)
			return interaction.reply(`I Can't Clear more than 100 Messages at once!`);

		let msg = await interaction.deferReply({
				ephemeral: true,
				fetchReply: true,
			})
			.then(async () => {
				await interaction.channel.bulkDelete(a, true)
					.then(async (ms) => {
						let sm = `Sucessfully Cleared ${ms.size} Messages!`;

						if (a < ms.size) {
							await interaction.editReply({ content: sm + `(filtered)` });
						} else {
							await interaction.editReply(sm);
						};
					})
					.catch( async(err) => {
						console.error(err);
						
						await interaction.editReply(`An error occurred while trying to clear the messages. Please try again.`);
					});
			})
			.catch( async(err) => {
				console.error(err);
				
				await interaction.reply(`An error occurred while trying to send the clearing message. Please try again.`);
			});
	},
};
