const Discord = require("discord.js");

exports.run = async(client, message, args) => {
  let t = args.join(' ');
  let guild = client.guilds.cache.find(g => g.name === args[0])
	  .catch(() => {
		  message.reply(`cannot find that Server`);
	  });
	let channelToSend;
  
  guild.channels.cache.forEach((channel) => {
    if (channel.type === "text" && channelToSend && channel.permissionsFor(guild.me).has("SEND_MESSAGES"))
      channelToSend = channel;
  });

	if(!t) return message.reply(`what to send`); //i  like dudu
	if (!channelToSend) return message.reply(`no channels to send`);

channelToSend.send(t);
  message.reply(`Successfully send the word '${t}' to **${gs}**`);
	console.log(guild);
}; // edns

exports.name = "send";