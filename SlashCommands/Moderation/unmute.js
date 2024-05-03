const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unmute')
        .setDescription('Unmute some Members!')
        .addUserOption(option => option.setName('user').setDescription('The user to unmute').setRequired(true)),
    async execute(client, interaction) {
        if (!interaction.member.permissions.has("MUTE_MEMBERS")) return interaction.reply({ content: "You need MUTE_MEMBERS permission to use this command", ephemeral: true });

        let role = interaction.guild.roles.cache.find(role => role.name.includes("Muted"));
        let member = interaction.options.getMember('user');

        if (!role) return interaction.reply({ content: "This server doesn't have a Muted role", ephemeral: true });
        if (!member) return interaction.reply({ content: "You didn't mention the user to unmute or the user was not found", ephemeral: true });
        if (!member.roles.cache.has(role.id)) return interaction.reply({ content: "That user is not muted", ephemeral: true });

        try {
            await member.roles.remove(role);
            await interaction.reply({ content: `Successfully unmuted ${member}`, ephemeral: false });
        } catch (error) {
            await interaction.reply({ content: "Error unmuting user", ephemeral: true });
        }
    },
};
