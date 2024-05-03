const { SlashCommandBuilder } = require('@discordjs/builders');
const cheerio = require('cheerio');
const request = require('request');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('image')
        .setDescription('Searches for an image on Dogpile.')
        .addStringOption(option =>
					option
					.setName('query')
					.setDescription('The search query.')
					.setRequired(true)
												),
    async execute(client, interaction) {
        const search = interaction.options.getString('query');
        
			if (!search) return await interaction.reply("Please provide a search query!");

        const options = {
            url: "http://results.dogpile.com/serp?qc=images&q=" + search,
            method: "GET",
            headers: {
                "Accept": "text/html",
                "User-Agent": "Chrome"
            }
        };

        request(options,
            async function (error, response, responseBody) {
                if (error) {
                    return;
                }

                $ = cheerio.load(responseBody);

                const links = $('.image a.link');
                const urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr('href'));
                console.log(urls);
                if (!urls.length) {
                    return await interaction.reply('No results found!');
                }

                interaction.reply( urls[~~(Math.random() * 5)] );
            });
    },
};