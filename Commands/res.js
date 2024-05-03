exports.run = (client, message, args) => {
  if(message.author.id === "967627633603002428") {
  let arg = message.content.slice(5)
    if (!arg) return message.channel.send("No Input")
      require("child_process").exec(arg, (err, stdout, stderr, res) => {
        if (err) return message.channel.send(`A error occured:\n${err}`);
        message.channel.send(stdout + "\nres:\n" + res);
        message.reply(arg)
      })
  } else {
    message.reply("Owner only.")
  }
};