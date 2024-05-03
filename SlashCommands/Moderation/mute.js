const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mute')
        .setDescription('Mute some Members!')
        .addUserOption(option => option.setName('user').setDescription('The user to mute').setRequired(true))
        .addStringOption(o => o.setName('reason').setDescription('The reason for Muting').setRequired(false)),
    async execute(client, interaction) {
			if (!interaction.member.permissions.has("MUTE_MEMBERS")) return interaction.reply({ content: "You need MUTE_MEMBERS permission to use this command", ephemeral: true });

        let role = interaction.guild.roles.cache.find(role => role.name.includes("Muted"));
        let member = interaction.options.getMember('user');
        let reason = interaction.options.getString('reason') || 'No reason provided.';

        if (!role) return interaction.reply({ content: "This server doesn't have a Muted role", ephemeral: true });
        if (!member) return interaction.reply({ content: "You didn't mention the user to mute or the user was not found", ephemeral: true });
        if (member.roles.cache.has(role.id)) return interaction.reply({ content: "That user is already muted", ephemeral: true });
        if (member.id === interaction.member.id) return interaction.reply({ content: "You cannot mute yourself", ephemeral: true });

        try {
            await member.roles.add(role);
            await interaction.reply({ content: `Successfully muted ${member} with reason: ${reason}`, ephemeral: false });
        } catch (error) {
            await interaction.reply({ content: "Error muting user", ephemeral: true });
        }
    },
};
