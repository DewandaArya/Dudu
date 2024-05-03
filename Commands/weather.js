const { MessageEmbed } = require(`discord.js`);
const weather = require(`weather-js`);

exports.run = async(client, message, args) => {
	weather.find({search: args.join(` `), degreeType: `C`}, function (error, result) {
		if(error) return message.reply(`Something Went Wrong, Try Again Later!`)
			
		let l = new MessageEmbed()
			.setTitle(`Please specify a location.`)
			.setColor(`PURPLE`)
			if(!args[0]) return message.channel.send({embeds: [l]});
		
		let Ul = new MessageEmbed()
			.setTitle(`Invalid location.`)
			.setColor(`PURPLE`)
			if(result === undefined || result.length === 0) return message.channel.send({embeds: [Ul]})
				
		let current = result[0].current;
		let location = result[0].location;
		
		message.channel.send(`Getting Weather Info…`).then(m => {
setTimeout(() => {
			
			const Weather = new MessageEmbed()
			  .setAuthor(`Current weather for ${current.observationpoint}`)
			  .setThumbnail(current.imageUrl)
			  .setDescription(`**${current.skytext}**`)
			  .addField(`Timezone`, `UTC ${location.timezone}`, true)
			  .addField(`Degree Type`, `Celcius`, true)
			  .addField(`Temperature`, `${current.temperature}°`, true)
			  .addField(`Wind`, `${current.winddisplay}`, true)
			  .addField(`Feels Like`, `${current.feelslike}°`, true)
			  .addField(`Humidity`, `${current.humidity}%`, true)
			  .setColor(`GOLD`)
			  
			  m.edit({embeds: [Weather]})
		  }, 456);
	  })
	})
};

exports.name = "weather";