const { MessageAttachment } = require('discord.js');
const Welcomer = require('../../Structures/Welcomer');
const Client = require('discord.js');

module.exports = {
  name: "guildMemberAdd",
  once: false,
  /**
   * @param {Client} client
   */
  async execute(member) {
		const image = new Welcomer()
			.setBackground("https://media.discordapp.net/attachments/1061294773278879794/1089328450722091018/WelcomeGray_font_MConverter.eu.gif")
      .setGIF(true)
      .setAvatar(member.user.displayAvatarURL({ format: "png" }))
      .setName(member.user.username)
      .setDiscriminator(member.user.discriminator)
			.setBlur(2)

    // 57ms
		const channel = await member.guild.channels.cache.find(x => x.name.includes(`welcome`))
		const rC = await member.guild.channels.cache.find(x => x.name.includes(`rules`));
		let c = `Welcome to the server, ${member}! Please make sure to read the ${rC}`; // The name of the channel you want to find
		
		if (!rC) {
			console.log(`Channel with name includes "Rules" not found in guild "${member.guild.name}"`);
			c = `Welcome to ${member.guild.name}, ${member}!`;
		} else {
			console.log(`Found channel with name includes "Rules" in guild "${member.guild.name}"`);
			c = c;
		};

    return channel?.send({
			content: c,
        files: [ new MessageAttachment(await image.generate(), "welcome.gif") ]
    })
	}
};