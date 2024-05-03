const fs = require("fs")
const Discord = require("discord.js")
const { REST } = require("@discordjs/rest") 
const { Routes } = require("discord-api-types/v9")
const clientId = require(`../config`).cId;
const slashcommands = []

fs.readdirSync(`./SlashCommands`).forEach(subfolder => {
  
const slashcommandsFiles = fs.readdirSync(`./SlashCommands/${subfolder}`).filter(file => file.endsWith('js'));

for (const file of slashcommandsFiles) {
  const slash = require(`../SlashCommands/${subfolder}/${file}`)
  slashcommands.push(slash.data.toJSON())
   }
})

const rest = new REST({ version: "9" }).setToken(process.env.TOKEN)

module.exports = async function createSlash(){
  try{
    await rest.put(
      Routes.applicationCommands(clientId), {
        body: slashcommands
      }
    )
      require("colors")
      { console.log ("╔═════════════════════════════════╗".brightGreen) }
      { console.log ("║                                 ║".brightGreen) }
      { console.log ("║      Slash commands ready!.     ║".brightGreen) }
      { console.log ("║                                 ║".brightGreen) }
      { console.log ("╚═════════════════════════════════╝".brightGreen) }
  } catch(e) {
    console.error(e)
  }
}