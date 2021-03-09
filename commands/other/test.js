<<<<<<< HEAD
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
  async run(msg) {

    

  }
=======
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
  async run(msg) {

    

  }
>>>>>>> d6770e679d72e479ce8d5c142ef388afded45623
}