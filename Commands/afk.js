const { afk } = require("../Collections/afk.js");

module.exports = {
  name: "afk",
  description: "Set your status if you want to be afk.",
  run: async (client, message, args) => {
	  const authorsMessage = args.join(" ") || "No message provided.";

	  message.reply(`Setting your afk…`).then(() => {
		  setTimeout(() => {
			  afk.set(message.author.id, [Date.now(), authorsMessage]).then(() => {
				  message.reply(`Done setting your afk to **${authorsMessage}**.`)
			  })
		  }, 500);
	  })
  },
};