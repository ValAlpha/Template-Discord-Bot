const { MessageEmbed } = require("discord.js")

const joinLeave = (client => {
  
  const settings = client.settings

  if(!settings.joinLeaveLog.enabled) return
  if(!settings.joinLeaveLog.channelID) return


  
  client.on('guildMemberAdd', async user => {

    client.channels.cache.get(settings.joinLeaveLog.channelID)
    .send(new MessageEmbed()
    .setTitle(`User Joined`)
    .setDescription(settings.joinLeaveLog.joinMessage.replace('@user', user.user.tag).replace('@guildName', user.guild.name))
    .setColor("GREEN")
    .setTimestamp()
    .setFooter(client.user.username, client.user.displayAvatarURL({dynamic: true})))
    .catch(err => console.log(err))

  }) 

  client.on('guildMemberRemove', async user => {

    client.channels.cache.get(settings.joinLeaveLog.channelID)
    .send(new MessageEmbed()
    .setTitle(`User Left`)
    .setDescription(settings.joinLeaveLog.leaveMessage.replace('@user', user.user.tag))
    .setColor("RED")
    .setTimestamp()
    .setFooter(client.user.username, client.user.displayAvatarURL({dynamic: true})))
    .catch(err => console.log(err))
    
  })  

})

module.exports = joinLeave