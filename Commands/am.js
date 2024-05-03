const { MessageEmbed } = require("discord.js");
const moment = require("moment");

exports.run = async (client, message, args, Discord) => {
	const { default: fetch } = await import("node-fetch");
	let query = args.join(' ');
	
	if (!query) query = await awaitMessages(message);
	if (!query) return;
	
	const embed = new MessageEmbed()
		.setColor(0xde2c2c)
		.setTitle(`There is ${query}`)
		.setDescription('No description.')
		.addField('❯', `⟨«‹`, true)
  
	message.reply({ embeds: [embed] });
};

// ∆
async function awaitMessages(message) {
let responce;

const filter = (user) => {
return user.author.id === message.author.id;

};

message.channel.send('**What do you want to search for?** \nType `cancel` to cancel the command.');

await message.channel.awaitMessages(filter, { max: 1, time: 120000, errors: ['time'] })

.then((msg) => {
const firstMsg = msg.first();

if (firstMsg.content.toLowerCase() === 'cancel') return firstMsg.react('👍');

responce = firstMsg.content;
})
.catch(() => {
message.channel.send('Welp.. you took too long, cancelling the command.');

});

return responce;
};
// ∆