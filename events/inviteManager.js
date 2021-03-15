const { MessageEmbed } = require("discord.js")

const inviteManager = (client => {

  const settings = client.settings

  client.on('inviteCreate', async invite => {

    if(settings.inviteManager.enabled && settings.inviteManager.channelID){
      invite.guild.channels.cache.get(settings.inviteManager.channelID).send(new MessageEmbed()
      .setAuthor(client.user.username, client.user.displayAvatarURL({dynamic: true}))
      .setTitle(`Invte Created`)
      .setDescription(`
      Created By: <@${invite.inviter.id}>
      Link: https://discord.gg/${invite.code}`)
      .setColor("GREEN")
      .setTimestamp())
      .catch(() => {})
    }
  })

  client.on('inviteDelete', async invite => {

    if(settings.inviteManager.enabled && settings.inviteManager.channelID){
      invite.guild.channels.cache.get(settings.inviteManager.channelID).send(new MessageEmbed()
      .setAuthor(client.user.username, client.user.displayAvatarURL({dynamic: true}))
      .setTitle(`Invte Deleted`)
      .setDescription(`
      Link: https://discord.gg/${invite.code}`)
      .setColor("RED")
      .setTimestamp())
      .catch(() => {})
    }
  })
})

module.exports = inviteManager