const { Command } = require("discord.js-commando")
const { MessageEmbed } = require("discord.js")

module.exports = class afk extends Command { 
  constructor(client) {
    super(client, {
      name: "afk", 
      description: "Prepend [afk] to your server nickname", 
      memberName: "afk", 
      group: "other", 
      guildOnly: true
    })
  }
  async run(msg) {

    if(!msg.guild.me.hasPermission('MANAGE_NICKNAMES')) return msg.say(`I don't have permission to manage nicknames`)
    let user = msg.guild.members.cache.get(msg.author.id)


    if(user.nickname.includes('[AFK]')) return msg.say(`You're already marked as AFK`)

    user.setNickname(`[AFK] ${msg.author.username}`).then(msg.reply(`Ok, I've now marked you as AFK!`)).catch(err => msg.say(`I was unable to update your nickname.\nThis could be because your roel is higher than mine!`))

    

  }
}