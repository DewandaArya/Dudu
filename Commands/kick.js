exports.run = (client, message, args) => {
	const member = message.mentions.members.first()
 if (!member) return message.channel.send('You need to mention a user/provide an ID')
 if (!message.member.permissions.has('KICK_MEMBERS')) return message.channel.send('You lack the required permissions')
 if (member.permissions.has('KICK_MEMBERS') || member.permissions.has('BAN_MEMBERS')) return message.channel.send('This user seems to be a moderator')

 try {
 member.kick().then(() => {
 message.channel.send(`Kicked ${member}`)
 })
 } catch (err) {
 console.log(err)
 message.channel.send('Oops, something went wrong ')
 }
}
  
exports.name = "kick"