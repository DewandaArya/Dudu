const { MessageEmbed } = require('discord.js');
const { prefix } = require('../config');
const Database = require('@replit/database');
const db = new Database();

module.exports = {
 name: "shop",
 description: "shop ",
 category: "economy",
 run: async (client, message, args) => {
 let PREFIX;
 let fetched = await db.get(`PREFIX_${message.guild.id}`);

 if (fetched === null) {
 PREFIX = prefix
 } else {
 PREFIX = fetched
 }
 
 let embed = new MessageEmbed()
 .setDescription(`**UNDER MAINTENTANCE** `)
 .setColor('#00FF00')
 message.channel.send({embeds: [embed] })
 }
};