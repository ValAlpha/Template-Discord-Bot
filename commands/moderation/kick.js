const { Command } = require("discord.js-commando")

module.exports = class kick extends Command { 
  constructor(client) {
    super(client, {
      name: 'kick', 
      description: 'Kick', 
      group: 'moderation', 
      memberName: 'kick',
      guildOnly: true, 
      userPermissions: ['KICK_MEMBERS'],
      args: [{
        type: 'member', 
        prompt: 'Who?', 
        key: 'user'
      }, {
        type: 'string', 
        prompt: 'reason', 
        key: 'reason',
        default: 'No reason provided'
      }]
    })
  }
  async run(msg, { user, reason }) {

   
    if(!msg.member.hasPermission('KICK_MEMBERS')) return msg.say(`You don't have permission to use this command`)
    if(msg.author.id === user.id) return msg.say(`Why would you kick yourself?`)
    if(user.id === this.client.user.id) return msg.say(`Please don't kick me! 😢`)
    if(user.hasPermission('KICK_MEMBERS')) return msg.say('I can not kick this user')
    if(!msg.guild.me.hasPermission('KICK_MEMBERS')) return msg.say(`I need the \`Kick Members\` permission to do this!`)

    user.kick().catch(err => console.log(err))

    return msg.say(`${user.user.username}#${user.user.discriminator} has been kicked`)
    
    


  }
}