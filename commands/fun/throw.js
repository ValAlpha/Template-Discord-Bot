const { Command } = require("discord.js-commando")
const { MessageEmbed } = require("discord.js")

module.exports = class throw_command extends Command { 
  constructor(client){
    super(client, {
      name: "throw", 
      description: "Throw a random item at someone", 
      memberName: "throw", 
      group: "fun", 
      args: [{
        type: "member", 
        prompt: "At who?", 
        key: "user"
      }]
    })
  }
  async run(msg, { user }){

    const settings = this.client.settings
    const throwConfig = settings.throwConfig

    if(!throwConfig.enabled) return msg.say(`This command is disabled`)
    if(throwConfig.throwables.length < 1) return msg.say(`There's nothing to throw!`)

    return msg.say(`<@${msg.author.id}> threw ${throwConfig.throwables[Math.floor(Math.random() * throwConfig.throwables.length)]} at <@${user.id}>!`)
    .catch(err => console.log(err))
  }
}