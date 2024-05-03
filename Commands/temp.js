const Database = require("@replit/database");
let db = new Database();

exports.run = async (client, message, args, Discord) => {
	db.list(message.content.trim().slice(6)).then(gs => {
		message.reply(`\`\`\`js\n${gs}\`\`\``);
	});
};

exports.name = "tempe";