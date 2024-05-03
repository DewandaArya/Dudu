const Database = require("@replit/database");
let db = new Database();

module.exports.run = (client, message, args, Discord) => {
	db.list("wallet").then(m => {
		console.log(m);
	});
	// message.reply()
};

exports.name = "baltop";