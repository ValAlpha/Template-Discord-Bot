const { Command } = require("discord.js-commando")

module.exports = class dm extends Command { 
  constructor(client) { 
    super(client, {
      name: "dm",
      description: "DM a user using the bot", 
      memberName: "dm", 
      group: "moderation", 
      guildOnly: true, 
      args: [{
        type: "user", 
        prompt: "Which user?", 
        key: "user"
      }, {
        type: "string", 
        prompt: "What's the message?", 
        key: "message"
      }]
    })
  }
  async run(msg, { user, message }) {

    if(!msg.member.hasPermission('BAN_MEMBERS')) return msg.say(`You don't have permission to use this command`)
    if(user.bot) return msg.say(`You can't message bots`)

    user.send(message).catch(err => msg.say(`This user's DMs are off!`))

  }
}