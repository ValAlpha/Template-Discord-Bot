const { Command } = require("discord.js-commando")
const { MessageEmbed } = require("discord.js")

module.exports = class purge extends Command { 
  constructor(client){
    super(client, {
      name: "purge", 
      description: "Bulk delete up to 100 messages", 
      group: "other", 
      memberName: "purge", 
      guildOnly: true, 
      args: [{
        type: "integer", 
        prompt: "How many?\nMin: 1\nMax: 100", 
        key: "amount"
      }]
    })
  }
  async run(msg, { amount }) {

    if(!msg.member.hasPermission('MANAGE_MESSAGES')) return msg.say(`You don't have permission to use this command`)
    if(!msg.guild.me.hasPermission('MANAGE_MESSAGES')) return msg.say(`I need the \`Manage Messages\` permission to do this!`)

    msg.channel.bulkDelete(amount, true).then(msgs => {
    
      let ammountDeleted = msgs.size
      msg.say(`Deleted ${ammountDeleted} messages`)

      const settings = this.client.settings
      if(!settings.messageLogs) return

        msg.guild.channels.cache.get(settings.messageLogs).send(new MessageEmbed()
        .setAuthor(this.client.user.username, this.client.user.displayAvatarURL({dynamic: true}))
        .setTitle(`Bulk Delete`)
        .setDescription(`
        Moderator: <@${msg.author.id}>
        Number of messages deleted: ${ammountDeleted}

        Deleted in <#${msg.channel.id}>`)
        .setColor("RANDOM")
        .setTimestamp()).catch(() => {})
    }).catch(err => console.log(err))

    



  } 
}