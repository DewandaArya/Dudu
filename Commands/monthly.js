const Database = require("@replit/database")
const db = new Database()

exports.run = async(client, message, args) => {
  const check = await db.get(`monthlyCheck_${message.author.id}`);
  const timeout = 2592000000;
  if (check !== null && timeout - (Date.now() - check) > 0) {
    const { default: ms } = await import("pretty-ms")
    const timeLeft = ms(timeout - (Date.now() - check))
    message.reply(`LOL! You have already claimed your monthly prize! Come back after __${timeLeft}__ bro...`)
  } else {
    let reward = Math.floor(Math.random() * 7000) + 10000;
    let currentBalance = await db.get(`wallet_${message.author.id}`)
    message.reply(`GG! You claimed ${reward.toLocaleString()} as your monthly reward!`)
    await db.set(`wallet_${message.author.id}`, currentBalance + reward)
    await db.set(`monthlyCheck_${message.author.id}`, Date.now())
  }
}

exports.name = "monthly"