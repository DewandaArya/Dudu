const Discord = require("discord.js");
// const googleIt = require("googleit");

exports.run = async(client, message) => {
const args = message.content.slice(''.length).trim().split(/ +/);
 args.shift().toLowerCase().split(' ')[0];
const embed = new Discord.MessageEmbed()
 .setTitle("**Here is what I found!!**")
 .setColor("YELLOW")
 .setFooter(`Requested by : ${message.author.tag}`)
 .setTimestamp()
  googleIt({'query': args.join(' ')}).then(results => {
 results.forEach(function(item, index) { 
 embed.addField((index + 1) + ": " + item.title, "<" + item.link + ">");
 });
 
 message.channel.send({ embeds: [embed] })
 }).catch(e => {
 // any possible errors that might have occurred (like no Internet connection)
 });
 };

exports.name = "gogole";