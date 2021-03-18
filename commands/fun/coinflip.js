const { Command } = require("discord.js-commando")
const { MessageEmbed } = require("discord.js")

module.exports = class coinflip extends Command { 
  constructor(client){
    super(client, {
      name: "coinflip", 
      description: "Heads or Tails", 
      group: "fun", 
      memberName: "coinflip", 
      throttling: {
        usages: 2, 
        duration: 3
      }
    })
  }
  async run(msg){
    let possible = ['Heads', 'Tails']
    let result = possible[Math.round(Math.random() * (possible.length - 1))]


    msg.say(new MessageEmbed()
    .setAuthor(msg.author.username, msg.author.displayAvatarURL({dynamic: true}))
    .setDescription(`${result}`)
    .setColor("RANDOM")
    .setTimestamp()
    .setFooter(this.client.user.username, this.client.user.displayAvatarURL({dynamic: true})))
    .catch(err => console.log(err))
  }
}