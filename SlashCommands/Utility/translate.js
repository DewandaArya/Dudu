const { SlashCommandBuilder } = require('@discordjs/builders');
const translate = require('@iamtraction/google-translate');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('translate')
        .setDescription('Translate text to another language.')
        .addStringOption(option =>
            option.setName('text')
                .setDescription('The text to translate.')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('to')
                .setDescription('The language to translate the text to.')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('from')
                .setDescription('The language to translate the text from.'))
        .addBooleanOption(option =>
            option.setName('detect')
                .setDescription('Whether to detect the language automatically. If set to true, the "from" option will be ignored.'))
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user to mention in the translation message.')),
    async execute(client, interaction) {
        const text = interaction.options.getString('text');
        const to = interaction.options.getString('to');
        const from = interaction.options.getString('from');
        const detect = interaction.options.getBoolean('detect');
        const user = interaction.options.getUser('user');

        const detected = detect ? await translate(text) : null;
        const source = detected ? detected.from.language.iso : from;

        translate(text, { from: source, to: to }).then(result => {
            const translation = result.text;

            const response = user ?
                `${user}, ${text} translates to **${translation}**.` :
                `**${text}** translates to **${translation}**.`;

            interaction.reply(response);
        }).catch(err => {
            console.error(err);
            interaction.reply('There was an error while translating.');
        });
    },
    category: 'utility'
};
