exports.run = async(client, message, args) => {
	let v = message.mentions.users.first()
	if(!v) return message.reply(`You need to pong the user you want to hug :D`)
	if(v.user.id === message.author.id) return message.reply(`I dont think you can hug yourself`)
	message.reply(`${message.author} gave ${v} a hug:heart:`)
}

exports.name = `hug`;