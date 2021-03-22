const { Command } = require("discord.js-commando")
const { MessageEmbed } = require("discord.js")

module.exports = class balance extends Command { 
  constructor(client) {
    super(client, {
      name: "balance", 
      description: "View your balance", 
      group: "economy", 
      memberName: "balance", 
      aliases: ["bal"]
    })
  }

  async run(msg) {

    const economyConfig = this.client.settings.economyConfig
    if(!economyConfig.enabled) return msg.say(`Economoy disabled`)
    
    const profile = await this.client.dbs.profile.findOne({ userID: msg.author.id })

    if(!profile){
      this.client.functions.newEcoProfile(this.client, msg.author, msg)
    }else{
      return msg.say(new MessageEmbed()
      .setAuthor(msg.author.username, msg.author.displayAvatarURL({ dynaic: true }))
      .setTitle(`Your balance is: ${profile.balance} ${economyConfig.currencyName}`)
      .setColor("RANDOM")
      .setTimestamp()
      .setFooter(this.client.user.username, this.client.user.displayAvatarURL({dynaic: true})))
    }

  }

}