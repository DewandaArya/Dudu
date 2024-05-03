// Sure, here's the code for the Unban slash command:
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unban')
        .setDescription('Unban a user from the server.')
        .addStringOption(option =>
            option.setName('user')
                .setDescription('The user to unban. Must be in format `username#1234`.')
                .setRequired(true)
        ),
    async execute(client, interaction) {
        if (!interaction.member.permissions.has('BAN_MEMBERS')) {
            return interaction.reply({
                content: 'You do not have the permission to unban a user.',
                ephemeral: true
            });
        }

        const user = interaction.options.getString('user');

        const bans = await interaction.guild.bans.fetch();
        const target = bans.find(ban => `${ban.user.username}#${ban.user.discriminator}` === user);
        if (!target) {
            return interaction.reply({
                content: 'The specified user is not banned from this server.',
                ephemeral: true
            });
        }

        try {
            await interaction.guild.members.unban(target.user.id);
            interaction.reply({
                content: `Successfully unbanned ${target.user.username}#${target.user.discriminator}!`,
                ephemeral: true
            });
        } catch (error) {
            console.log(error);
            interaction.reply({
                content: 'An error occurred while processing the command. Please try again later.',
                ephemeral: true
            });
        }
    },
};

// Note that you'll need to replace the placeholder `client` variable if you're using it in your bot. Also, make sure to define the permissions for this command in your server.