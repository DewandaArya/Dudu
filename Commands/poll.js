const config = require(`../config`);

exports.run = (client, message, args) => {
	let sentence = args.join(" ");
	if (!sentence) return message.reply(`Correct Usage\` Example: ${config.prefix}poll test? \``);
	message.channel.send(`**${message.member.nickname}** Asks: **${sentence}**`).then(msg => {
		msg.react("✅");
		msg.react("❎");
	}).then(() => {
		message.delete(2000);
	});
};

exports.name = "poll"