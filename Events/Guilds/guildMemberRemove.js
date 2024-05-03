const Discord = require(`discord.js`);
const { MessageEmbed } = require('discord.js');
const client = require('../../index.js');
const Client = require("discord.js");

module.exports = {
  name: "guildMemberRemove",
  once: false,
  /**
   * @param {Client} client
   */
  async execute(member) {
		// 57ms
		const channel = await member.guild.channels.cache.find(x => x.name.includes(`goodbye`))
		const embed = new MessageEmbed()
			.setColor('#5f27cd')
			.setTitle('__**<:community:1069189840752615435> Member left.**__')
			.setDescription(`> __**${member.displayName}**__ just leaving __**${member.guild.name}**__!\n> We are now have only __**${member.guild.memberCount}**__ members.`)
			.setImage('https://upload.wikimedia.org/wikipedia/commons/a/a0/Alto%27s_Adventure_animation_-_07_Kicker.gif')
			
		return channel?.send({ embeds: [embed] });
	}
};