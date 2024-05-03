const { SlashCommandBuilder } = require('@discordjs/builders');
const { afk } = require('./../../Collections/afk.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('afk')
        .setDescription('Set your status if you want to be afk.')
        .addStringOption(option =>
            option.setName('message')
                .setDescription('The message to show as your AFK status.')),
    async execute(client, interaction) {
        const authorsMessage = interaction.options.getString('message') || 'No message provided.';

			console.log(afk);

        await interaction.reply('Setting your AFK...');

        setTimeout(() => {
            afk.set(interaction.user.id, [Date.now(), authorsMessage]).then(() => {
                interaction.editReply(`Done setting your AFK to **${authorsMessage}**.`);
            }).catch((err) => {
                console.error(err);
                interaction.editReply('There was an error while setting your AFK.');
            });
        }, 500);
    },
    category: 'utility'
};
