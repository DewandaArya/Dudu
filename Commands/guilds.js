const Discord = require("discord.js");
let config = require("../config.json")

exports.run = async(client, message, args) => {
  if(message.author.id === config.ownId) {
  let list = client.guilds.cache.map(g => g.name).join('\n');
  const e = new Discord.MessageEmbed()
    .setTitle(`Total Guilds: ${client.guilds.cache.size}`)
    .setDescription(`__${list}__`)
    
  message.reply({ embeds: [e] })
  } else {
    message.reply('Dewan only.')
  }
}; // ends

exports.name = "guilds"