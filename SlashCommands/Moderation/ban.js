// Sure, I can help you with that. Here's the code for a v13 Slash command that bans a member
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Bans a user.')
        .addUserOption(option =>
					option
					.setName('user')
					.setDescription('The user to ban.')
					.setRequired(true)
											),
    async execute(client, interaction) {
        const userToBan = interaction.options.getUser('user');
        
        if (interaction.member.permissions.has('BAN_MEMBERS')) {
            try {
                await interaction.guild.members.ban(userToBan.id)
									.then( async() => {
										await interaction.reply(`${userToBan.tag} has been banned.`);
									});
            } catch (error) {
                console.error(error);
                await interaction.reply('There was an error trying to ban that user.');
            }
        } else {
            await interaction.reply('You do not have the permissions to ban members.');
        }
    },
};

// Just replace "ban" and "Bans a user." with the appropriate command name and description. You can also change the error messages or customize the command further if you like.