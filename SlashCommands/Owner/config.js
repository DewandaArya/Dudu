const Discord = require(`discord.js`);
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('config')
        .setDescription('⚠️Owner only!'),
    async execute(interaction) {
const database = require("../../config");
			if(interaction.user.id === database.ownId) {
				// Loop through the JSON database
  // Convert the database object into an array
  const dataArray = Object.entries(database);
const e = new Discord.MessageEmbed()
      .setColor('RANDOM')
      .setTitle(`config.json`)
  // Loop through the data array
  dataArray.forEach(([name, message]) => {
    //
    // Create a new Discord message
      e.addField(name, message, true)

    // Send the message to the Discord channel
  });
				interaction.reply({embeds: [e]});
				} else {
					await interaction.reply(`Only my Owner can use this command.`);
				};
    },
};