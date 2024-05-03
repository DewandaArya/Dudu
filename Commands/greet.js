exports.run = async(client, message, args) => {
	let member = message.mentions.members.first();
	if (!member) return;
	
	message.channel.send(`Hello, ${member.displayName}!`);
};

exports.name = `greet`