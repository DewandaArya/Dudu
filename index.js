// Beginning
const express = require("express");
const app = express();
const config = require(`./config`);
const Database = require("@replit/database")
const db = new Database()

app.listen(3000, () => {
	console.clear()
	console.log(`Hello ${process.env.USERNAME || 'World'}!\nNode ${process.version}`)
});

app.get("/", (req, res) => {
	res.send(`
 <style>
 body { background: #332a00; }
 </style>
 
   <a href="https://top.gg/bot/1000443920116891760">
    <img src="https://top.gg/api/widget/1000443920116891760.svg">
  </a>
   `);
});

const Discord = require('discord.js');
// Discord.Constants.DefaultOptions.ws.properties.$browser = "Discord Android"
const client = new Discord.Client({
	intents: [
		Discord.Intents.FLAGS.GUILDS,
		Discord.Intents.FLAGS.GUILD_MESSAGES,
		`GUILD_MEMBERS`
	],
	partials: [
		'MESSAGE',
		'CHANNEL',
		'REACTION'
	],
	allowedMentions: ['users'],
	ws: {
  		properties: {
    			$browser: "Discord Android"
    		}
  	}
});

module.exports = client;

client.snipes = new Map() //create a new map
client.commands = new Discord.Collection();
client.slashcommands = new Discord.Collection(); 

["Slash", "command_handler", "Events"].forEach(handler => {
	require(`./Structures/${handler}`)(client);
});
//           12345678901111                12345678901111
console.log(`—————————————— Slash Commands ——————————————`);

const fs = require(`fs`);
fs.readdirSync(`./SlashCommands`).forEach(subfolder => {
	const slashcommandsFiles = fs.readdirSync(`./SlashCommands/${subfolder}`).filter(file => file.endsWith('js'));
	
	for (const file of slashcommandsFiles) {
  		const slash = require(`./SlashCommands/${subfolder}/${file}`);
  			console.log(`Slash Commands - ${file} loaded.`);
  				client.slashcommands.set(slash.data.name, slash);
  	};
});

client.login(process.env.TOKEN); // Ending
// Diagnose API Errors
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Promise Rejection:\n", err);
});
process.on("unhandledException", (err) => {
  console.error("Unhandled Promise Exception:\n", err);
});
process.on("unhandledExceptionMonitor", (err) => {
  console.error("Unhandled Promise Exception (Monitor):\n", err);
});
process.on("multipleResolves", (type, promise, reason) => {
  console.error("Multiple Resolves:\n", type, promise, reason);
});