exports.run = async(client, message, args, Discord) => {
	let c = message.channel;
	let a = args[0] || 25;
	
	if(a > 100) {
		message.reply(`You can't Clear 100 Messages at once! (Discord Limit)`)
			return;
	};
	
	try {
		message.channel.bulkDelete(a, true)
			.then(async m => {
				if(m.size < a) {
					c.send(`Successfully Cleared ***${m.size}*** messages. (filtered)`)
					.then( async m => await m.delete(3000));
				} else {
					c.send(`Successfully Cleared ***${a}*** messages.`)
					.then( async m => await m.delete(3000));
				};
			});
	} catch (error) {
		console.error(error);
		message.reply(`Something went wrong!\n${error}`);
	}
};

exports.name = `clear`;