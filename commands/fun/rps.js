const { Command } = require("discord.js-commando")
const { MessageEmbed } = require("discord.js")

module.exports = class rps extends Command { 
  constructor(client) {
    super(client, { 
      name: "rps", 
      description: "Play a game of Rock Paper Scissors against the bot", 
      memberName: "rps", 
      group: "fun",
      throttling: { // Recomened to avoid API spam
        usages: 2,
        duration: 3 
      },
      args: [{
        type: "string", 
        prompt: "`Rock` `Paper` or `Scissors`?", 
        key: "choice", 
        parse: c => c.toLowerCase(), 
        oneOf: ["rock", "paper", "scissors"]
      }]
    })
  }
  async run(msg, { choice }) { 

    const possibles = ['rock', 'paper', 'scissors']
    let botsChoice = possibles[Math.round(Math.random() * (possibles.length - 1 ))]

    let embed = new MessageEmbed()
    .setAuthor(msg.author.username, msg.author.displayAvatarURL({ dynamic: true }))
    .setTitle(`Rock Paper Scissors`)
    .setTimestamp()
    .setFooter(this.client.user.username, this.client.user.displayAvatarURL())

    let result = 'lost'

    if(choice === botsChoice) result = 'draw'
    if(choice == 'rock' && botsChoice == 'scissors') result = 'won'
    if(choice == 'paper' && botsChoice == 'rock') result = 'won'
    if(choice == 'scissors' && botsChoice == 'paper') result = 'won'

    
   const colours = {
     won: "GREEN", 
     draw: "ORANGE",
     lost: "RED"
   }

   const emojis = {
     rock: "🗿", 
     paper: "📄", 
     scissors: "✂"
   }

    embed.setDescription(`You: ${emojis[choice]} | ${emojis[botsChoice]} :Bot\n
    Result: ${result.toUpperCase()}`)
    embed.setColor(colours[result])

    msg.say(embed).catch(err => console.log(err))




  
   

  }
}