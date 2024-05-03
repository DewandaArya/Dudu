const Discord = require("discord.js");
const Database = require(`@replit/database`);
let db = new Database();
let config = require("../config.json");

exports.run = (client, message, args) => {
	let g = client.guilds.cache.size;
	db.get("msg").then(value => {
		let e = new Discord.MessageEmbed()
			.setAuthor(message.author.tag, message.author.displayAvatarURL())
			.setTitle("Add to Server")
			.setURL(config.iL)
			.setDescription(`Made by <@967627633603002428>\nI've been on ${g} Servers, invite me to your Discord Server or your friends Discord Server to make it +1 :D`)
			.setFooter(`Requested by ${message.author.username}`)
			.setColor("#29AJX")
			.setThumbnail(client.user.displayAvatarURL())
			.setTimestamp()
			.addField(`Also a message from my best Discord friend, <@942744000622886933>`, value)
			message.reply({ embeds: [e] })
	});
};

exports.name = "invite"