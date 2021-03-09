const { Command } = require("discord.js-commando")
const { MessageEmbed } = require("discord.js")

const moment = require("moment")
require("moment-duration-format")

module.exports = class serverinfo extends Command {
  constructor(client){
    super(client, {
      name: "serverinfo", 
      description: "View information on the server", 
      memberName: "serverinfo",
      group: "other", 
      guildOnly: true, 
      aliases: ["si"]
    })
  }
  async run(msg){

    const guild = msg.guild

    const roles = guild.roles.cache.filter(r => r.id !== msg.guild.id).sort((a, b) => b.position - a.position).map(role => `<@&${role.id}>`).join(' | ')

    const emojis = guild.emojis.cache.map(e => e.toString()).join(' ')
    
    const humanCount = msg.guild.members.cache.filter(m => !m.user.bot).map(u => u).length
    const botCount = msg.guild.memberCount - humanCount

    msg.say(new MessageEmbed()
    .setAuthor(this.client.user.username, this.client.user.displayAvatarURL({dynamic: true}))
    .setTitle(`Server info ${guild.name}`)
    .setDescription(`
    • ID: ${guild.id}
    • Owner: <@${guild.owner.id}>
    • Created At: ${moment(guild.createdAt).format('lll')}
    • Region: ${guild.region}
    • Member Count: (Cached)
    - Humans: ${humanCount}
    - Bots: ${botCount}
    
    • Channels: 
    - Text: ${guild.channels.cache.filter(c => c.type === 'text').size}
    - Voice: ${guild.channels.cache.filter(c => c.type === 'voice').size}
    
    • Roles 
    - Role Count: ${guild.roles.cache.size - 1}
    - List:
    ${roles}

    Emojis: 
    ${emojis}
    `)
    .setThumbnail(msg.guild.iconURL({dynamic: true}))
    .setColor("RANDOM")
    .setTimestamp()
    .setFooter(`Requested By: ${msg.author.username}`, msg.author.displayAvatarURL({dynamic: true})))

  }
}