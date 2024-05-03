const { SlashCommandBuilder } = require('@discordjs/builders');
const { google } = require('googleapis');
const { MessageEmbed } = require('discord.js');
const youtube = google.youtube({
  version: 'v3',
  auth: process.env.YOUTUBE_API_KEY,
});

module.exports = {
  data: new SlashCommandBuilder()
    .setName('youtube')
    .setDescription('Search for videos or channels on YouTube')
    .addStringOption(option => option.setName('query').setDescription('The search query').setRequired(true))
    .addStringOption(option => option.setName('type').setDescription('The type of result to search for (video or channel)').setRequired(false)),
  async execute(client, interaction) {
    const query = interaction.options.getString('query');
    const type = interaction.options.getString('type') || 'video';

    const { data } = await youtube.search.list({
      part: 'id,snippet',
      q: query,
      type: type,
      maxResults: 5,
    });
    const results = data.items;
    if (results.length === 0) {
      return interaction.reply('No results found!');
    }

    const embed = new MessageEmbed()
      .setTitle(`Search results for "${query}" on YouTube`)
      .setColor('RED');

    results.forEach((result) => {
      const { title, channelTitle, thumbnails } = result.snippet;
      const id = result.id.videoId || result.id.channelId; // Extract the correct ID based on the result type
      const url = `https://www.youtube.com/${type === 'channel' ? 'channel/' : 'watch?v='}${id}`;

      embed.addField(title, `Channel: ${channelTitle}\n${url}`)
           .setThumbnail(thumbnails.default.url);
    });

    interaction.reply({ embeds: [embed] });
  },
};
