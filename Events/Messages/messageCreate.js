const Discord = require(`discord.js`);
const { Util } = require(`discord.js`);
const Client = require('discord.js');
const config = require(`../../config`)
const { afk } = require("../../Collections/afk.js");
const moment = require("moment");
const Database = require("@replit/database");
let db = new Database();

let maxStickMessageCount = 10
let count = 0
let channel = ""
let stickyContent = ""
let lastStickyMessage = ""

module.exports = {
	name: "messageCreate",
	once: false,
	/**
	 * @param {Client} client
	 */
	async execute(message) {
		client = message.client;
		if (message.author.id === config.cId) return;

		let prefix = await db.get(`prefix_${message.guild.id}`);
		
		if(prefix == null) {
			prefix = config.prefix;
		} else {
			prefix = prefix
		};

		if (message.content.startsWith(prefix) || message.channel.type === 'dm') {
			const args = message.content.slice(prefix.length).trim().split(/ +/g);
			const commandName = args.shift().toLowerCase(); // convert to lowercase
			const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

			if (!command) return
			message.channel.sendTyping()
				.then(() => command.run(client, message, args, Discord))
				.catch(async error => {
					const errorMessage = `
  Error Name: ${error.name}
  Error Message: ${error.message}
  Stack Trace: ${error.stack}
  File Name: ${error.fileName || 'N/A'}
  Line Number: ${error.lineNumber || 'N/A'}
  Column Number: ${error.columnNumber || 'N/A'}
`;

					await message.channel.send(errorMessage)
				});

			const user = await client.users.fetch(config.ownId);
			const dmChannel = await user.createDM();
			const e = new Discord.MessageEmbed()
				.setThumbnail(client.user.displayAvatarURL())
				.setColor('RANDOM')
				.setTimestamp()
				.setTitle(`${commandName}.js ran.`)
				.addField('Kanal', `${message.channel || 'DMs'}`)
				.addField('User', message.author.tag);

			dmChannel.sendTyping()
				.then(() => dmChannel.send({ embeds: [e] }))
				.catch(e => dmChannel.send(e));
		};

		if (stickyContent && channel === message.channel.id) {
			count++
			if (count === maxStickMessageCount) {
				await lastStickyMessage.delete()
				lastStickyMessage = await message.channel.send(stickyContent)
				count = 0
			}
		};
		if (message.content.toLowerCase().startsWith(config.preRCMd + "stick")) {
			if (!message.member.permissions.has("KICK_MEMBERS")) return;
			let contentToStick = message.content.split(" ").slice(1).join(" ")
			if (!contentToStick) return message.channel.send("Must provide a message to stick!")
			try {
				stickyContent = contentToStick
				channel = message.channel.id
				lastStickyMessage = await message.channel.send(stickyContent)
				count = 0
				await message.delete()
			} catch (err) {
				console.log(err)
				message.channel.send("Oops. An error occured!")
			}
		};
		if (message.content.toLowerCase().startsWith(config.preRCMd + "unstick")) {
			stickyContent = ""
			lastStickyMessage = ""
			channel = ""
			message.channel.send("Successfully removed the message!")
		};

		// ∆ \\
		if (message.channel.name.includes(`dgc`) && !message.author.bot) {
			let c = await client.channels.cache.find(c => c.name.includes(message.channel.name))
				
			if(c) {
				await c.createWebhook('Snek', {
							avatar: 'https://i.imgur.com/mI8XcpG.jpg',
							reason: 'Needed a cool new Webhook'
						})
							.then(async w => {
								await w.send({
									content: message.content,
									username: message.author.username,
									avatarURL: message.author.avatarURL()
								})
									.then(async () => {
										await w.delete();
									});
							})
							.catch(e => message.reply(`Error\n${e}`));
					};
				};
		// ∆ \\

		if (message.channel.name === `cn` && (message.author.id === config.ownId || message.author.id === config.pId)) {
			let arg = message.content.trim().split(` `);
			message.reply(`【` + arg[0] + `】╎` + message.content.slice(arg[0].length + 1));
			// message.reply("¨˜ˆ”°⍣~•✡⊹٭„¸ " + message.content + " ¸„٭⊹✡•~⍣°”ˆ˜¨");
		};

    if(message.content === "rps") {
      if (!message.member.permissions.has('MANAGE_CHANNELS')) {
      return message.reply("You don't have permission to manage channels.");
    }

    const guild = message.guild;
    const channels = guild.channels.cache;

    // Loop through each channel in the guild and reset its permissions to default
    channels.forEach(async (channel) => {
      try {
        await channel.permissionOverwrites.edit(guild.roles.everyone, { // Reset to default for @everyone role
          VIEW_CHANNEL: null,
          SEND_MESSAGES: null,
          // Add more permissions here as needed...
        });

        message.channel.send(`Permissions for channel ${channel.name} reset to default.`);
      } catch (error) {
        console.error(`Error resetting permissions for channel ${channel.name}: ${error.message}`);
        message.channel.send(`Error resetting permissions for channel ${channel.name}.`);
      }
    });
  };
		
		if(message.channel.id === "1099006493124214854" && message.content.toLowerCase().includes("d")) {
			const { Permissions } = require('discord.js');
				let role = message.guild.roles.cache.find(r => r.id === "1099886073116643378")
					
			await message.member.roles.add(role)
				.then( async() => {
					console.log(`Denied ${message.member.user.tag}'s ability to send messages in ${channel.name} channel.`);
					await message.reply(`RIP ${message.member.nickname || message.author.username}`);
				})
				.catch(console.error);
		};

		if (message.content.includes(`welcome`) || message.content.includes(`goodbye`)) {
			message.react(`👋🏻`);
		};

		// Extract all the emojis from the message content
		const emojis = message.content.match(/<a?:\w+:\d+>/g);
		// If there are no emojis, return
		if (!emojis) return;
		// Loop through all the emojis and react to the message using those emojis
		for (const emoji of emojis) {
			const parsedEmoji = Util.parseEmoji(emoji);
			if (parsedEmoji.id) {
				// Guild emoji
				await message.react(parsedEmoji.id);
			} else {
				// Unicode emoji
				await message.react(parsedEmoji.name);
			};
		};

		if (message.content.startsWith("<@1000443920116891760>")) {
			message.reply("\nType` /help `for Help")
		};

		//- Start of AFK Code -\\
		const memberMentioned = message.mentions.members.first();
		if (memberMentioned) {
			const data = afk.get(memberMentioned.id);

			if (data) {
				const [timestamp, authorsMessage] = data;
				const timeAgo = moment(timestamp).fromNow();

				const afkEmbed = new Discord.MessageEmbed()
					.setTitle(`${memberMentioned.user.tag} is currently afk :D`)
					.setDescription(`Hey, ${memberMentioned} is currently afk (${timeAgo})... just wait a minute`)
					.addField("AFK:", `${memberMentioned}`, true)
					.addField("Their Message:", `${authorsMessage}`, true)
					.addField("Time ago:", `${timeAgo}`, true)
					.setColor("#525254")
					.setTimestamp()
					.setFooter({ text: "Imagine, trolling someone you're afk." });
				message.reply({ embeds: [afkEmbed] });
			};
		};

		const getData = afk.get(message.author.id)

		if (getData) {
			if (message.content.includes(config.prefix + `afk`)) return;
			message.reply(`Oh, you back ${message.member}! removing your afk…`).then(() => {
				setTimeout(() => {
					afk.delete(message.author.id).then(() => {
						message.reply(`I removed your afk.`)
					})
				}, 500);
			});
		};
		//- End of AFK Code -\\

		if (message.content.indexOf(config.preRCMd + `reverse`) === 0) {
			message.channel.sendTyping();
			var text = message.content.substring(8);
			var reversed = '';
			var i = text.length;
			while (i > 0) {
				reversed += text.substring(i - 1, i);
				i--;
			};

			await message.channel.send(reversed);
			await message.delete();
		};
	}
};