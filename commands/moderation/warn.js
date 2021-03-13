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
    const warnLogConfig = settings.warnLogs

    const warns = await this.client.dbs.warnings.findOne({dbID: msg.guild.id})
    const warnCount = warns.warningCount

    if(!warns){
      new this.client.dbs.warnings({
        dbID: msg.guild.id,
        users: [
          {
            userID: user.id, 
            warnings: [{
              warnID: 1, 
              reason, 
              moderator: msg.author.id
            }]
          }
        ], 
        warningCount: 1
      }).save().catch(err => console.log(err))

      user.send(new MessageEmbed()
      .setTitle(`Warning`)
      .setDescription(`You have been warned in ${msg.guild.name}
      Reason:
      \`\`\`${reason}\`\`\``)
      .setColor("RED")
      .setTimestamp()
      .setFooter(this.client.user.username, this.client.user.displayAvatarURL({dynamic: true})))
      .catch(err => {
        if(err) msg.say(`Unable to DM the user but the warning has successfully been logged`)
      })
    }else{
      let dbUser = warns.users.find(u => u.userID === user.id)
      if(!dbUser){
        warns.users.push({
          userID: user.id, 
            warnings: [{
              warnID: warnCount + 1, 
              reason, 
              moderator: msg.author.id
            }]
        })
        warns.warningCount ++

        warns.save().catch(err => console.log(err))
      }else{
        dbUser.warnings.push({
          warnID: warnCount + 1, 
          reason, 
          moderator: msg.author.id
        })

        warns.warningCount ++

        warns.markModified('users')
        warns.save().catch(err => console.log(err))
      }
    }

    if(warnLogConfig.enabled){
      msg.guild.channels.cache.get(warnLogConfig.channelID).send(new MessageEmbed()
      .setAuthor(this.client.user.username, this.client.user.displayAvatarURL({dynamic: true}))
      .setTitle(`User Warned`)
      .setDescription(`
      User: <@${user.id}> (**${user.id}**)
      Moderator: <@${msg.author.id}>
      
      Reason: 
      \`\`\`${reason}\`\`\``)
      .setColor("RED")
      .setTimestamp()
      .setFooter(`Case ID: ${warnCount+1}`))
      .catch(err => console.log(err))
    }

    msg.say(`User warned`)
    .catch(err => console.log(err))

  }

} 