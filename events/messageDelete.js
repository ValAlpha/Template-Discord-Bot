// const { MessageEmbed } = require("discord.js")

// const messageDelete = (client => {
//   client.on('messageDelete', async (msg) => {

//     //! Check for audit log

//     const auditLogs = await msg.guild.fetchAuditLogs({limit: 1})
//     const log = auditLogs.entries.first()

//     console.log(log)
    
//     const settings = client.settings
//     if(!settings.messageLogs) return

    
//     msg.guild.channels.cache.get(settings.messageLogs).send(new MessageEmbed()
//     .setAuthor(client.user.username, client.user.displayAvatarURL({dynamic: true}))
//     .setTitle(`Message Deleted`)
//     .setDescription(``)
//     .setColor("RANDOM")
//     .setFooter(`Deleted by: `))

//   })
// })
// module.exports = messageDelete