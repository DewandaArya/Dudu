let config = require('../config');

module.exports.run = (client, message, args) => {
	let nicks = args.join(` `);
	if(nicks.length > 32) return message.channel.send('The nickname cannot be more than 32 characters.');
	if(nicks.length < 1) return message.channel.send(`The nickname cannot be less than 1 characters.`);
	// Replace 'guild' with the Guild object for the guild the member is in
	// Replace 'userID' with the ID of the member you want to change the nickname of
	// Fetch a single member
		message.guild.members.fetch(config.clientId)
			.then(member => {
				// Change the nickname of the member
				member.setNickname(nicks)
					.then(() => message.reply(`Changed nickname to '${nicks}'`))
					.catch(console.error);
			})
			.catch(console.error);
};

exports.name = 'setbotnick';