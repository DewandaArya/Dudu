const { MessageEmbed } = require("discord.js");
const Database = require("@replit/database");
const db = new Database();

module.exports = {
  name: "work",
  description: "Work to get free coins from your boss.",
  aliases: ["job"],
  run: async (client, message, args) => {
    let workingCheck = await db.get(`workCheck_${message.author.id}`);
    let cooldown = 3600000;

    if (workingCheck !== null && cooldown - (Date.now() - workingCheck) > 0) {
      const { default: ms } = await import("pretty-ms") 
      let timeLeft = ms(cooldown - (Date.now() - workingCheck));

      message.reply(`You've already worked bruh... Come back after __${timeLeft}__`);
    } else {
      let messageChoosed = Math.floor(Math.random() * 2) + 1;
      let msg;

      if (messageChoosed === 1) {
        msg = `Your boss see's you hard working and he gaved you`;
      };
      if (messageChoosed === 2) {
        msg = `Your boss caught you playing games! For that, he did not gaved you any money. Sad.`;
      };

      let works = ["Engineer", "Cheff", "Scientist", "Content Creator", "Streamer", "Teacher", "Epok Gamer", "Gamer", "Pilot", "Police", "F.B.I.", "Janitor", "Musician", "Soldier", "Programmer", "Developer", "Model", "Designer", "Game Creator", "Flight Attendant", "Guard", "Farmer", "Baby Sitter"];

      if (msg === `Your boss see's you hard working and he gaved you`) {
        let currentBalance = await db.get(`wallet_${message.author.id}`);
        let reward = Math.floor(Math.random() * 15000) + 7500;

        let workEmbed = new MessageEmbed()
          .setTitle(message.author.username)
          .setDescription(`${msg} ${reward} for that! Nice!\nYou worked as a **${works[Math.floor(Math.random() * works.length)]}**`)
          .setFooter({ text: message.createdTimestamp() });
        message.reply({ embeds: [workEmbed] });

        await db.set(`wallet_${message.author.id}`, currentBalance + reward);
        await db.set(`workCheck_${message.author.id}`, Date.now());
      };
      
      if (msg === `Your boss caught you playing games! For that, he did not gaved you any money. Sad.`) {
        let workEmbed = new MessageEmbed()
          .setTitle("Work Command")
          .setDescription(`you claimed **${reward.toLocaleString()}**`)
          .setFooter({ text: message.createdTimestamp() });
        message.reply({ embeds: [workEmbed] });

        await db.set(`workCheck_${message.author.id}`, Date.now());
      };
    };
  }
};