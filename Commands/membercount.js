exports.run = (client, message, args, Discord) => {
 let embed = new Discord.MessageEmbed()
 .setColor("#fca4a4")
 .setAuthor(`Member Count of ${message.guild}`, message.guild.iconURL({ dynamic: true }))
 .setTitle("Members")
 .setDescription (`Total: ${message.guild.members.cache.size}\n Humans: ${message.guild.members.cache.filter(member => !member.user.bot).size}\nBots: ${message.guild.members.cache.filter(member => member.user.bot).size}`, true)
 .setThumbnail(message.guild.iconURL({ dynamic: true }))
 .setFooter(`Requested by ${message.author.username}`)

message.reply({ embeds: [embed] })
};

exports.name = "membercount";
exports.aliases = [`memcount`, `memc`, `mc`];