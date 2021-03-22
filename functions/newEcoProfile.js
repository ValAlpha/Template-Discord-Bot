const { MessageEmbed } = require("discord.js")

const newProfile = async (client, user, msg) => {

  const economyConfig = client.settings.economyConfig
  const currency = economyConfig.currencyName || "coins"
  const starterBalance = economyConfig.starterBalance || 100

    new client.dbs.profile({
      userID: user.id,
      balance: starterBalance
    }).save()
      .catch(err => console.log(err))

    return msg.say(new MessageEmbed()
    .setAuthor(user.username, user.displayAvatarURL({ dynaic: true }))
    .setTitle(`Your balance is: ${starterBalance} ${currency}`)
    .setColor("RANDOM")
    .setTimestamp()
    .setFooter(client.user.username, client.user.displayAvatarURL({dynaic: true})))
  
}

module.exports = newProfile
