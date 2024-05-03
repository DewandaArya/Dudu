const Discord = require("discord.js");
const client = require(`../../index`);

module.exports = {
	name: "interactionCreate",
	once: false,
	/**
	 * @param {Client} client
	 */
	async execute(interaction) {
		if (!interaction.isCommand()) return;
		const command = interaction.client.slashcommands.get(interaction.commandName);
		
		if (!command) return;
		if (interaction.customId === 'select') {
			await interaction.deferUpdate();
			await wait(4000);
			await interaction.editReply({ content: 'Something was selected!', components: [] });
		}
		
		try {
			await command.execute(client, interaction);
		} catch (error) {
			console.error(error);
			
			const errorMessage = `
	 Error Name: ${error.name}
	Error Message: ${error.message}
 Stack Trace: ${error.stack}
 File Name: ${error.fileName || 'N/A'}
 Line Number: ${error.lineNumber || 'N/A'}
 Column Number: ${error.columnNumber || 'N/A'}
 `;
			
			await interaction.reply({ content: `There was an error while executing this command!\n${errorMessage}`, ephemeral: false });
		}
	}
};