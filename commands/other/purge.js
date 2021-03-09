<<<<<<< HEAD
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
        prompt: "How many?\nMin: 2\nMax: 100", 
        key: "amount", 
        min: 2, 
        max: 100
      }]
    })
  }
  async run(msg, { amount }) {

    if(!msg.member.hasPermission('MANAGE_MESSAGES')) return msg.say(`You don't have permission to use this command`)
    if(!msg.guild.me.hasPermission('MANAGE_MESSAGES')) return msg.say(`I need the \`Manage Messages\` permission to do this!`)

    let msgs = await msg.channel.messages.fetch({ limit: amount })
    let filtered = msgs.filter(m => !m.pinned)

    msg.channel.bulkDelete(filtered, true).then(msgs => {

      msg.say(`Bulk deleted ${msgs.size} messages!`)

      const settings = this.client.settings
      if(settings.messageLogs){
        msg.guild.channels.cache.get(settings.messageLogs).send(new MessageEmbed()
        .setAuthor(this.client.user.username, this.client.user.displayAvatarURL({dynamic: true}))
        .setTitle(`Bulk Delete`)
        .setDescription(`
        Moderator: <@${msg.author.id}>
        Number of messages deleted: ${msgs.size}

        Deleted in <#${msg.channel.id}>`)
        .setColor("RANDOM")
        .setTimestamp()).catch(() => {})
      }
    }).catch(err => console.log(err))

  } 
=======
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
        prompt: "How many?\nMin: 2\nMax: 100", 
        key: "amount", 
        min: 2, 
        max: 100
      }]
    })
  }
  async run(msg, { amount }) {

    if(!msg.member.hasPermission('MANAGE_MESSAGES')) return msg.say(`You don't have permission to use this command`)
    if(!msg.guild.me.hasPermission('MANAGE_MESSAGES')) return msg.say(`I need the \`Manage Messages\` permission to do this!`)

    let msgs = await msg.channel.messages.fetch({ limit: amount })
    let filtered = msgs.filter(m => !m.pinned)

    msg.channel.bulkDelete(filtered, true).then(msgs => {

      msg.say(`Bulk deleted ${msgs.size} messages!`)

      const settings = this.client.settings
      if(settings.messageLogs){
        msg.guild.channels.cache.get(settings.messageLogs).send(new MessageEmbed()
        .setAuthor(this.client.user.username, this.client.user.displayAvatarURL({dynamic: true}))
        .setTitle(`Bulk Delete`)
        .setDescription(`
        Moderator: <@${msg.author.id}>
        Number of messages deleted: ${msgs.size}

        Deleted in <#${msg.channel.id}>`)
        .setColor("RANDOM")
        .setTimestamp()).catch(() => {})
      }
    }).catch(err => console.log(err))

  } 
>>>>>>> d6770e679d72e479ce8d5c142ef388afded45623
}