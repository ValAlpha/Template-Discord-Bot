const antiAd = async client => {

  client.on('message', async msg => {

    if(!msg.content.includes('discord.gg/')) return

    if(!msg.guild.me.hasPermission('MANAGE_GUILD')) return

    const fetchInvites = await msg.guild.fetchInvites()
    const invites = fetchInvites.map(i => i.code)

    for (const invite of invites) {
      if(!msg.content.includes(invite)){
        setTimeout(() => msg.delete().catch(() => {}), 1000)
        msg.reply(`please do not advritise other Discord servers here!`)
      }
    }
  })
}

module.exports = antiAd