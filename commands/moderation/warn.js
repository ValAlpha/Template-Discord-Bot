const { Command } = require("discord.js-commando")
const { MessageEmbed } = require("discord.js")

module.exports = class warn extends Command { 
  constructor(client){
    super(client, {
      name: "warn", 
      description: "Warn a user", 
      memberName: "warn", 
      group: "moderation",
      guildOnly: true, 
      args: [{
        type: "member", 
        prompt: "Who are you warning?",
        key: "user"
      }, {
        type: "string", 
        prompt: "For what reason?", 
        key: "reason", 
        default: "No reason provided"
      }]
    })
  }

  async run(msg, { user, reason }){

    if(!msg.member.hasPermission('KICK_MEMBERS')) return msg.say(`You do not have permission to use this command`)
    if(user.id === msg.author.id) return msg.say(`Why would you warn yourself?`)
    if(user.id === this.client.user.id) return msg.say(`Please don't warn me!`)
    if(user.bot) return msg.say(`You can not warn bots`)

    const settings = require("../../settings.json")
    const warnLogs = settings.warnLogs

    const warns = await this.client.dbs.warnings.findOne({dbID: msg.guild.id})

    if(!warns){
      new this.client.dbs.warnings({
        dbID: msg.guild.id, 
        warnings: [{ caseID: 1, user: user.id, reason, moderator: msg.author.id }], 
        warnCount: 1
      }).save().catch(err => console.log(err))

      msg.say(`User has been warned`).catch(() => {})
    }else{

      warns.warnings.push({ caseID: (warns.warnCount + 1), user: user.id, reason, moderator: msg.author.id })
      warns.warnCount++
      warns.save().catch(err => console.log(err))

      msg.say(`User has been warned`).catch(() => {})
    }   
    
    user.send(new MessageEmbed()
    .setTitle(`You have been warned in __**${msg.guild.name}**__`)
    .setDescription(`Reason: 
    \`\`\`${reason}\`\`\``)
    .setTimestamp())
    .catch(() => {})

    if(warnLogs.enabled){
      msg.guild.channels.cache.get(warnLogs.channelID)
      .send(new MessageEmbed()
      .setTitle(`Warning`)
      .setDescription(`
      User: <@${user.id}> (**${user.id}**)
      Moderator: <@${msg.author.id}>
      
      Reason: 
      \`\`\`${reason}\`\`\``)
      .setTimestamp()
      .setFooter(this.client.user.username, this.client.user.displayAvatarURL({dynamic: true})))
      .catch(() => {})
    }

  }
} 