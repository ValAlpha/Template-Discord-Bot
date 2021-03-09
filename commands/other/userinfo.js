<<<<<<< HEAD
const { Command } = require("discord.js-commando")
const { MessageEmbed } = require("discord.js")

const moment = require("moment")
require("moment-duration-format")

module.exports = class userinfo extends Command {
  constructor(client){
    super(client, {
      name: "userinfo", 
      description: "View info on mentioned user", 
      group: "other", 
      memberName: "userinfo", 
      aliases: ["ui"], 
      guildOnly: true, 
      args: [{
        type: "member", 
        prompt: "Which user would you like to lookup?", 
        key: "user"
      }]
    })
  }
  async run(msg, { user }) {

    const userRoles = user.roles.cache.filter(r => r.id !== msg.guild.id).sort((a, b) => b.position - a.position).map(role => `<@&${role.id}>`).join(' | ') || `None`

    msg.say(new MessageEmbed()
    .setAuthor(user.user.username, user.user.displayAvatarURL({dynamic: true}))
    .setTitle(`User Info For ${user.user.username}`)
    .setDescription(`
    • Tag: ${user.user.tag}
    • ID: ${user.user.id}
    • Bot: ${user.user.bot}
    • Created At: ${moment(user.user.createdAt).format('lll')}
    • Joined At: ${moment(user.joinedAt).format('lll')}

    •Roles: 
    ${userRoles}
    `)
    .setThumbnail(user.user.displayAvatarURL({dynamic: true}))
    .setColor("RANDOM")
    .setTimestamp()
    .setFooter(`Requested By: ${msg.author.username}`, msg.author.displayAvatarURL({dynamic: true})))

  }
=======
const { Command } = require("discord.js-commando")
const { MessageEmbed } = require("discord.js")

const moment = require("moment")
require("moment-duration-format")

module.exports = class userinfo extends Command {
  constructor(client){
    super(client, {
      name: "userinfo", 
      description: "View info on mentioned user", 
      group: "other", 
      memberName: "userinfo", 
      aliases: ["ui"], 
      guildOnly: true, 
      args: [{
        type: "member", 
        prompt: "Which user would you like to lookup?", 
        key: "user"
      }]
    })
  }
  async run(msg, { user }) {

    const userRoles = user.roles.cache.filter(r => r.id !== msg.guild.id).sort((a, b) => b.position - a.position).map(role => `<@&${role.id}>`).join(' | ') || `None`

    msg.say(new MessageEmbed()
    .setAuthor(user.user.username, user.user.displayAvatarURL({dynamic: true}))
    .setTitle(`User Info For ${user.user.username}`)
    .setDescription(`
    • Tag: ${user.user.tag}
    • ID: ${user.user.id}
    • Bot: ${user.user.bot}
    • Created At: ${moment(user.user.createdAt).format('lll')}
    • Joined At: ${moment(user.joinedAt).format('lll')}

    •Roles: 
    ${userRoles}
    `)
    .setThumbnail(user.user.displayAvatarURL({dynamic: true}))
    .setColor("RANDOM")
    .setTimestamp()
    .setFooter(`Requested By: ${msg.author.username}`, msg.author.displayAvatarURL({dynamic: true})))

  }
>>>>>>> d6770e679d72e479ce8d5c142ef388afded45623
}