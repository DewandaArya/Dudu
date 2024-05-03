const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const moment = require('moment');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('npm')
    .setDescription('Search for an NPM package')
    .addStringOption(option =>
      option
			.setName('query')
			.setDescription('The search query')
			.setRequired(true)),
  async execute(client, interaction) {
    const query = interaction.options.getString('query');
    const { default: fetch } = await import('node-fetch');
    const res = await fetch(`https://registry.npmjs.com/${encodeURIComponent(query)}`).catch(err => console.log(err));
    
    if (res.status === 404) return interaction.reply('No search results found, maybe try searching for something that exists.');
    
    const body = await res.json();
    const embed = new MessageEmbed()
      .setColor(0xde2c2c)
      .setTitle(body.name)
      .setURL(`https://www.npmjs.com/package/${body.name}`)
      .setDescription(body.description || 'No description.')
      .addField('❯ Version', body['dist-tags'].latest, true)
      .addField('❯ License', body.license || 'None', true)
      .addField('❯ Author', body.author ? body.author.name : '???', true)
      .addField('❯ Creation Date', moment.utc(body.time.created).format('YYYY/MM/DD hh:mm:ss'), true)
      .addField('❯ Modification Date', body.time.modified ? moment.utc(body.time.modified).format('YYYY/MM/DD hh:mm:ss') : 'None', true)
      .addField('❯ Repository', body.repository ? `[View Here](${body.repository.url.split('+')[1]})` : 'None', true)
      .addField('❯ Maintainers', body.maintainers.map(user => user.name).join(', '));
    
    interaction.reply({ embeds: [embed] });
  },
};
