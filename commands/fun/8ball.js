const { Command } = require("discord.js-commando")
const { MessageEmbed } = require("discord.js")

module.exports = class eightBall extends Command { 
  constructor(client) {
    super(client, {
      name: "8ball", 
      description: "Ask the 8ball a question if you seek its wisdom", 
      memberName: "8ball", 
      group: "fun", 
      aliases: ["8b"], 
      args: [{
        type: "string", 
        prompt: "What do you want to ask?", 
        key: "question"
      }]
    })
  }
  async run(msg, { question }){

    const settings = this.client.settings
    const eightBallConfig = settings.eightBallConfig

    if(!eightBallConfig.enabled) return msg.say(`This command is disabled`)
    if(eightBallConfig.answers.length < 1) return msg.say(`There are no configured replies`)

    const answer = eightBallConfig.answers[Math.floor(Math.random() * eightBallConfig.answers.length)]

    msg.say(new MessageEmbed()
    .setAuthor(this.client.user.username, this.client.user.displayAvatarURL({dynamic: true}))
    .setTitle(`Magic 8 Ball`)
    .setDescription(`Question: ${question}
    
    Answer: 
    \`\`\`${answer}\`\`\``)
    .setColor("RANDOM")
    .setTimestamp()
    .setFooter(`Requested by: ${msg.author.username}`))

  }
}