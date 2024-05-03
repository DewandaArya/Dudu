// Sure, here's the converted code in Slash Command format:

const { SlashCommandBuilder } = require('@discordjs/builders');
const Docs = require(`discord.js-docs`);
const max = 1024;

module.exports = {
  data: new SlashCommandBuilder()
    .setName('docs')
    .setDescription('Search the Discord.JS documentation.')
    .addStringOption(option => 
        option
			.setName('query')
			.setDescription('The query to search for.')
      .setRequired(true))
		.addStringOption(o =>
			o
			.setName(`branch`)
			.setDescription(`The branch to search for.`)
			.setRequired(false)),
  async execute(client, interaction) {
		const branch = interaction.options.getString(`branch`) || `stable`;
    const text = interaction.options.getString('query');
    const doc = await Docs.fetch(branch);
    const results = await doc.resolveEmbed(text);

		const replaceDisco = (str) =>
			str
			.replace(/docs\/docs\/disco/g, `docs/discord.js/${branch}`)
			.replace(/ \(disco\)/g, '');

    if (!results) {
      return interaction.reply('Could not find that documentation.');
    };

    const string = replaceDisco(JSON.stringify(results));
    const embed = JSON.parse(string);
    
        embed.author.url = `https://discord.js.org/#/docs/discord.js/${branch}/general/welcome`;
        
        const extra =
            '\n\nView more here: ' +
            /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
            .exec(embed.description)[0]
            .split(')')[0]

    for (const field of embed.fields || []) {
      if (field.value.length >= max) {
        field.value = field.value.slice(0, max);

        const split = field.value.split(' ');
        let joined = split.join(' ');

        while (joined.length >= max - extra.length) {
          split.pop();
          joined = split.join(' ');
        };

        field.value = joined + extra;
      };

      if (
        embed.fields &&
        embed.fields[embed.fields.length - 1].value.startsWith('[View source')
      ) {
        embed.fields.pop();
            };
        };

    return interaction.reply({ embeds: [embed] });
  },
};