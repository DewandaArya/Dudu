const { MessageEmbed } = require("discord.js");
const moment = require("moment")
module.exports = {
 name: "userinfo",
 description: "Information about a user",
 category: "fun",
 run: async (client, message, args) => {
 let user;
if (message.mentions.users.first()) {
 user = message.mentions.users.first();
} else {
 user = message.author;
}
var member = user;


 const embeduserinfo = new MessageEmbed()
 .setColor("RANDOM")
 .setThumbnail(message.author.avatarURL)
 .addField(`${user.tag}`, `${user}`, true)
 .addField("ID:", `${user.id}`, true)
 .addField("Permissions:", `${user.permissions}`, true)
 .addField("Nickname:", `${user.id.displayName}`, true)
 .addField("Status:", `${user.presence.status}`, true)
 .addField("In Server", message.guild.name, true)
 .addField("Game:", `${user.presence.game ? user.presence.game.name : 'None'}`, true)
 .addField("Bot:", `${user.bot}`, true)
 .addField("Joined The Server On:", `${moment.utc(user.joinedAt).format("dddd, MMMM Do YYYY")}`, true)
 .addField("Account Created On:", `${moment.utc(user.createdAt).format("dddd, MMMM Do YYYY")}`, true) 
 .setFooter(`Replying to ${message.author.username}#${msg.author.discriminator}`)
 message.channel.send(embeduserinfo)

 }
 
};