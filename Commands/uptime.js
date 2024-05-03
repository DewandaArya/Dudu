exports.run = (client, message, args) => {
  message.reply(`I have been online for ~${Math.round(client.uptime/1000/60)} minutes.`)
};

exports.name = "uptime";