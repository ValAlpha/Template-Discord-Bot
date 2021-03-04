const { Command } = require("discord.js-commando")
const { MessageEmbed } = require("discord.js")


module.exports = class test extends Command {
  constructor(client) { 
    super(client, {
      name: "test", 
      description: "test cmd",  
      guildOnly: true, 
      memberName: "test", 
      group: "other", 
    })
  }
  async run(msg, { user }) {

  }
}