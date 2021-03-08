const { Command } = require("discord.js-commando")
const { MessageEmbed } = require("discord.js")

module.exports = class unban extends Command {
  constructor(client) {
    super(client, {
      name: "unban", 
      description: "Unban a user", 
      group: "other", 
      guildOnly: true, 
      memberName: "unban", 
      args: [{
        type: "string", 
        prompt: "Who?", 
        key: "user", 
        parse: u => u.toLowerCase()
      }, {
        type: "string", 
        prompt: "Reason?", 
        key: "reason", 
        default: "No reason provided"
      }]
    })
  }
  async run(msg, { user, reason }) {
    
    if(!msg.member.hasPermission('BAN_MEMBERS')) return msg.say(`You don't have permission to use this command`)
    if(!msg.guild.me.hasPermission('BAN_MEMBERS')) return msg.say(`I need the \`Ban Members\` permission to unban members!`)
    
    let banList = await msg.guild.fetchBans().then(list => list.map(u => u))
    let USER = banList.find(u => u.user.id === user || u.user.username.toLowerCase() === user)
    if(!USER) return msg.say(`Couldn't find this user`)
    msg.guild.members.unban(USER.user.id, {reason}).catch(err => console.log(err))
    
    const settings = await this.client.settings
    let logChannel = msg.guild.channels.cache.get(settings.punishmentLogs)

    let embed = new MessageEmbed()
    .setAuthor(this.client.user.username, this.client.user.displayAvatarURL({dynamic: true}))
    .setColor("GREEN")
    .setTitle('User Unbanned')
    .setDescription(`
    User: ${USER.user.tag}
    Moderator: ${msg.author.tag}
    Reason:
    \`\`\`${reason}\`\`\``)
    .setTimestamp()

    if(logChannel) logChannel.send(embed).catch(err => console.log(err))
    
    msg.say(`${USER.user.tag} has been unbanned!`)

    

  }
}