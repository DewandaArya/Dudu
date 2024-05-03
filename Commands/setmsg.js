const config = require("../config.json");
const Database = require(`@replit/database`);
const db = new Database();

exports.run = (client, message, args) => {
	if(message.author.id === `942744000622886933`) {
	const msg = args.join(" ") || "No message provided.";
	db.set("msg", msg).then(() => {
		message.reply("Done setting the message in the` " + config.prefix + "invite `command to **" + `${msg}**`)
	});
	} else {
		message.reply(`Only <@942744000622886933> can use this command :D`)
	};
};