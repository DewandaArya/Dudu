const Discord = require(`discord.js`);
const { SlashCommandBuilder } = require('@discordjs/builders');
const { prefix, preRCMd } = require('../../config')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Get some help.'),
    async execute(client, interaction) {
        const slashCommands = client.slashcommands.map(x => {
          return {
            name: x.data.name,
            description: x.data.description,
          };
        });
        
			const slashCommandsString = slashCommands.map(x => `</${x.name}:0>: ${x.description}`).join('\n');
			const commands = client.commands.map(x => x.name).join(`, `);
        
        const message = new Discord.MessageEmbed()
            .setTitle(`Total Commands: ${client.commands.size}`)
            .setDescription(commands)
            .setFooter(`My prefix is ${prefix}`)

        const slash = new Discord.MessageEmbed()
            .setTitle(`Slash Commands`)
            .setDescription(`Total Slash Command: ${client.slashcommands.size}\n${slashCommandsString}\n`)
          .setFooter(`Requested by ${interaction.user.tag}`)
        
        await interaction.reply({ embeds: [message, slash] })
    },
};
