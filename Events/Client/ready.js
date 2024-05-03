const Database = require("@replit/database");
const Client = require("discord.js")
const Discord = require(`discord.js`);
const fs = require('fs');
const { RainbowRole } = require("djs-rainbow");
const guildId = '967662653000519690';
const channelIdToUpdate = '1006046361260667000';
const inviteChannelId = '1043041642929721364';
let previousData = '';
let first = `1104223208569311396`;
let db = new Database();

module.exports = {
  name: "ready",
  once: true,
  /**
   * @param {Client} client
   */
  async execute(client) {
		db.list().then(keys => {
			console.log(keys);
			client.channels.cache.get("1056913639820501064").send(`\`\`\`js\n${keys}\`\`\``);
		});
		
		let c = client.channels.cache.size;
    let u = client.users.cache.size;
    let g = client.guilds.cache.size;
		
		console.log(`Ready to serve in ${c} channels on ${g} servers, for a total of ${u} users.`);

		const statuses = [`Minecraft with ${u} viewers!`, `C418 - Sweden`, `the Clock`, `Minecraft | /help`, `${g} Servers along with ${u} Peoples!`];
		const types = ['STREAMING', 'LISTENING', 'WATCHING', 'PLAYING', 'COMPETING'];
		const userStatuses = ['online', 'idle', 'dnd', 'invisible'];

		setInterval(() => {
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    const randomType = types[Math.floor(Math.random() * types.length)];
    const randomUserStatus = userStatuses[Math.floor(Math.random() * userStatuses.length)];
    client.user.setActivity(randomStatus, { type: randomType });
    client.user.setStatus(randomUserStatus);
		}, 6 * 60 * 1000);

		let cj = client.channels.cache.get(`1085164821407879168`);
		const formattedDate = client.readyAt.toLocaleDateString('en-US', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric'
		});
		
		let readyAte = new Discord.MessageEmbed()
		.setTitle(`Client Restarted`)
		.setDescription(`${client.user.tag} just Restarted at ${formattedDate}`)
		
		cj.send({ embeds: [readyAte] });
		
		const guild = client.guilds.cache.get(guildId);
		const channelToUpdate = guild.channels.cache.get(channelIdToUpdate);
		const inviteChannel = guild.channels.cache.get(inviteChannelId);
		
		let invite = (await inviteChannel.fetchInvites()).find(inv => inv.channel.id === inviteChannelId);
		
		if (!invite) {
			invite = await inviteChannel.createInvite({
				maxUses: 0 // set to 0 for unlimited uses
				});
		}
		
		channelToUpdate.setName(`${invite.url.replace(`https://`, ``)} (${invite.uses} uses)`);
		
		client.on('inviteCreate', handleInviteEvent);
		client.on('inviteDelete', handleInviteEvent);
		client.on('inviteUpdate', handleInviteEvent);
		
		function handleInviteEvent(oldInvite, newInvite) {
			if (newInvite.channel.id === inviteChannelId) {
			invite = newInvite;
				channelToUpdate.setName(`${invite.url.replace(`https://`, ``)} (${invite.uses} uses)`);
			};
		};
	}
};