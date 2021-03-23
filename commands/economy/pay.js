const { Command } = require("discord.js-commando")

module.exports = class pay extends Command { 
  constructor(client) {
    super(client, {
      name: "pay", 
      description: "Gift currency to another user", 
      memberName: "pay", 
      group: "economy", 
      aliases: ['give', 'gift'],
      guildOnly: true, 
      args: [{
        type: "member", 
        prompt: "Who are you paying?", 
        key: "user"
      }, {
        type: "integer", 
        prompt: "How much?", 
        key: "amount", 
        min: 1
      }]
    })
  }

  async run(msg, { user, amount }) {

    if(user.user.bot) return msg.reply(`You can't pay bots!`)
    if(user.id === msg.author.id) return msg.reply(`You can't pay yourself!`)

    const payeeProfile = await this.client.dbs.profile.findOne({userID: user.id})
    if(!payeeProfile) return msg.reply(`This person doesn't want your currency right now!`)

    const economyConfig = this.client.settings.economyConfig
    
    const profile = await this.client.dbs.profile.findOne({userID: msg.author.id})
    if(!profile) {

      let P = await this.client.functions.newEcoProfile(this.client, msg.author)
      
      if(P.balance < amount) return msg.reply(`You don't have enough to do this!`)

      P.balance -= amount
      payeeProfile.balance += amount

      P.save().catch(err => console.log(err))
      payeeProfile.save().catch(err => console.log(err))

      return msg.say(`<@${msg.author.id}> has paid <@${user.id}> ${amount} ${economyConfig.currencyName}`)
    }else{

      if(profile.balance < amount) return msg.reply(`You don't have enough to do this!`)
      profile.balance -= amount
      payeeProfile.balance += amount

      profile.save().catch(err => console.log(err))
      payeeProfile.save().catch(err => console.log(err))

      return msg.say(`<@${msg.author.id}> has paid <@${user.id}> ${amount} ${economyConfig.currencyName}`)
    }

  }

}