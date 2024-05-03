const Client = require("discord.js"); const { MessageEmbed } = require("discord.js");
const config = require("../../config.json")

module.exports = {
  name: "guildCreate",
  once: false,
  /**
   * @param {Client} client
   */
  async execute(guild) {
	  let channelToSend;
	  
	  guild.channels.cache.forEach((channel) => {
		  if (
			  channel.type === "text" &&
			  !channelToSend &&
				channel.permissionsFor(guild.me).has("SEND_MESSAGES")
		  )
			  channelToSend = channel;
	  });
	  
	  if (!channelToSend) return;
		console.log((channelToSend.name).join(`, `));
	  
	  let embed = new MessageEmbed()
		  .setAuthor(guild.name, guild.iconURL({ dynamic: true }))
		  .setDescription(
			  "Thanks for inviting me my default prefix is` " + config.prefix + " `and ill be happy to help out in this server."
		  )
		  .setColor("GOLD")
		  .setTimestamp()
		  
	  channelToSend.send({embeds: [embed]})
  }
};