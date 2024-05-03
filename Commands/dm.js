exports.run = (client, message, args, Discord) => {
	const user = message.mentions.users.first() || client.users.cache.get(args[0]);
	const msg = message.content.slice(member.id.length).trim();
	
	if(!user) return message.reply('Provide a user!');
	if(!msg) return message.reply('What do you want to send to them?');
			
	message.delete();
  user.send(msg);
};

exports.name = "dm";
exports.aliases = [`w`, `msg`, `whisper`];
