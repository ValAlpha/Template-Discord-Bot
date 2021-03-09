const { MessageEmbed } = require("discord.js")

const messageDelete = (client => {
  client.on('messageUpdate', async (msg) => {

    if(msg.author.bot) return

    const settings = client.settings
    if(!settings.messageLogs) return

    let oldContent = msg.content
    let newContent = msg.reactions.message.content

    if(oldContent === newContent) return

    client.channels.cache.get(settings.messageLogs).send(new MessageEmbed()
    .setAuthor(client.user.username, client.user.displayAvatarURL({dynamic: true}))
    .setTitle(`Message Edited`)
    .setDescription(`
    A message by <@${msg.author.id}> was edited
    
    • Before: \`\`\`${oldContent}\`\`\`
    
    • After: \`\`\`${newContent}\`\`\``)
    .setColor("RANDOM")
    .setTimestamp()).catch(err => console.log(err))
  })
})

>>>>>>> d6770e679d72e479ce8d5c142ef388afded45623
module.exports = messageDelete