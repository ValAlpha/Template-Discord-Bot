const { Command } = require("discord.js-commando")
const { MessageEmbed } = require("discord.js")

module.exports = class clearwarms extends Command { 
  constructor(client){
    super(client, {
      name: "clearwarns",
      description: "Clear all server warnings (Requires admin permission)", 
      group: "moderation", 
      memberName: "clearwarms", 
      guildOnly: true, 
      userPermissions: ['ADMINISTRATOR']
    })
  }

  async run(msg) {

    let warns = await this.client.dbs.warnings.findOne({dbID: msg.guild.id})
    if(!warns) return msg.say(`There are no warnings for this server`)

    const settings = this.client.settings
    const warnLogs = settings.warnLogs 

    warns.warnings = []

    warns.save().catch(err => console.log(err))

   if(warnLogs.enabled){
     msg.guild.channels.cache.get(warnLogs.channelID)
     .send(new MessageEmbed()
     .setTitle(`All warnings removed`)
     .setDescription(`Deleted by: <@${msg.author.id}>`)
     .setColor("RED")
     .setTimestamp()
     .setFooter(this.client.user.username, this.client.user.displayAvatarURL({dynamic: true})))
     .catch(err => console.log(err))
   }

    return msg.say(`Deleted all warnings`)


  }
}