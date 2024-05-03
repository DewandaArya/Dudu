const Discord = require("discord.js");
let config = require("../config.json")

exports.run = (client, message, args, Discord) => {
  let e = new Discord.MessageEmbed()
  .setTitle(`DewandaArya`)
.setURL(config.ytL)
.setDescription(`The list of my friends YouTube channel`)
    .setColor("RED")
    .setTimestamp()
  .addField(`Payu`, `Click [here](https://youtube.com/@Payu0001)`)
	.addField('Sarevo', `Click [this](https://youtube.com/@Sarevo)`)
	.addField(`The`, `Click [it](https://youtube.com/@TheFoulerINA)`)
	.addField(`Daniel`, `Never [Sub](https://youtube.com/@crystalgamestudio)`)
    
  message.channel.send({ embeds: [e] })
}; // ends

exports.name = "yt"