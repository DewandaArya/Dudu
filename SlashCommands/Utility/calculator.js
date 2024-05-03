const { SlashCommandBuilder } = require('@discordjs/builders');
const simpledjs = require("simply-djs")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('calculator')
        .setDescription('Replies with Calculator Embed!'),
    async execute(interaction) {
			simpledjs.calculator(interaction, {
				embedcolor: "Gold"
			});
        // await interaction.reply('Pong!');
    },
};