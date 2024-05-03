const Discord = require('discord.js')
	
module.exports.run = async (client, message, args) => {
	// if(!client.member.permissions.has("MANAGE_NICKNAMES")) return message.reply("I dont have perms!")
	if(client.guild.me.permissions.has("MANAGE_NICKNAMES")) {
		const person = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
		let nicks = args.join(` `)
			if(nicks.length < 1) return message.reply('The nickname cannot be less than 1 characters')
				if(nicks.length > 32) return message.reply('The nickname cannot be more than 32 characters')
					person.setNickname(nicks).then(() => {
						message.reply(`Successfully changed ${person}\'s nickname to **${nicks}**`)
					})
	} else {
		message.reply("I can't change your anme")
	}
};

exports.name = "setnick"