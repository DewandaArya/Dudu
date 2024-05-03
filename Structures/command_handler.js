const fs = require("fs");

module.exports = (client) => {
	const commands = fs
		.readdirSync("./Commands")
		.filter((file) => file.endsWith(".js"));
	
	for (file of commands) {
		const commandName = file.split(".")[0];
		const command = require(`../Commands/${commandName}`);
		
		client.commands.set(commandName, command);
	};
	
	console.log(`Successfully loaded ${client.commands.size} commands`);
};
