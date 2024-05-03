const { SlashCommandBuilder } = require('@discordjs/builders');
const Database = require('@replit/database');

const db = new Database();

module.exports = {
  data: new SlashCommandBuilder()
    .setName('prefix')
    .setDescription('Set or view the bot prefix')
    .addStringOption(option =>
      option
        .setName('new_prefix')
        .setDescription('The new prefix')
        .setRequired(false)
    ),
  async execute(client, interaction) {
    const newPrefix = interaction.options.getString('new_prefix');
    const guildId = interaction.guildId;
    
    if (newPrefix) {
      // User has provided a new prefix, set it
      await db.set(`prefix_${guildId}`, newPrefix);
      await interaction.reply(`The new prefix has been set to\` ${newPrefix} \`.`);
    } else {
      // User did not provide a new prefix, retrieve from database or use default prefix
      const prefix = await db.get(`prefix_${guildId}`);
			
      await interaction.reply(`The current prefix is\` ${prefix} \`.`);
    }
  },
};
