const Client = require("discord.js");
const Discord = require("discord.js");
const config = require('../../config');
const client = require('../../index');

//snipe map
module.exports = {
  name: "messageDelete",
  once: false,
  /**
   * @param {Client} client
   */
  async execute(message, channel) {
	  client.snipes.set(message.channel.id, { //get the channel of message
		  content: message.content, //snipe the message that was deleted
		  author: message.author.id, //get the message author the the deleted message
		  image: message.attachments.first() ? message.attachments.first().proxyURL: null
	  })
  }
};