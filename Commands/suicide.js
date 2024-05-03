const Discord = require("discord.js");

exports.run = async(client, message, args) => {
  let embed = new Discord.MessageEmbed()
    .setTitle("Suicide (fun) command")
    .setDescription(`rip ${message.author.username}.`)
    .setTimestamp()
    .setColor('RANDOM')
    .setAuthor(message.author.username, message.author.displayAvatarURL())
    .setThumbnail(client.user.displayAvatarURL())
    
  message.reply({ embeds: [embed] }).then(m => {
    m.react('😢')
  })
}; // ends

exports.name = "suicide"