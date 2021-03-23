const { Command } = require("discord.js-commando")

module.exports = class gamble extends Command { 
  constructor(client) {
    super(client, {
      name: "gamble", 
      description: "Gamble an ammount for a 50-50 chance of winning your bet amount", 
      memberName: "gamble", 
      group: "economy", 
      args: [{
        type: "integer", 
        prompt: "How much do you want to gamble?", 
        key: "amount", 
        min: 1
      }]
    })
  }
  async run(msg, { amount }) {

    const profile = await this.client.dbs.profile.findOne({userID: msg.author.id})

    let possible = ['win', 'lose']
    let result = possible[Math.floor(Math.random() * possible.length)]

    if(!profile) {

      let P = await this.client.functions.newEcoProfile(this.client, msg.author)
      const balance = P.balance 

      if(amount > balance) return msg.reply(`You don't have enough to gamble this much!`)

      if(result === 'lose') {
        let newBal = balance - amount
        newBal <= 0 ? P.balance = 0 : P.balance = newBal
        P.save().catch(err => console.log(err))
        msg.reply(`You lost`)
      }else{
        P.balance += amount
        P.save().catch(err => console.log(err))
        msg.say(`You won`)
      }
    }else{
      if(result === 'lose') {
        let newBal = profile.balance - amount
        newBal <= 0 ? profile.balance = 0 : profile.balance = newBal
        profile.save().catch(err => console.log(err))
        msg.reply(`You lost`)
      }else{
        profile.balance += amount
        profile.save().catch(err => console.log(err))
        msg.say(`You won`)
      }
    }
  }
}