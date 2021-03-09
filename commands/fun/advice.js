const { Command } = require("discord.js-commando")
const { MessageEmbed } = require("discord.js")
const superagent = require("superagent")

module.exports = class advice extends Command {
  constructor(client) {
    super(client, {
      name: "advice",
      description: "Search for or recice random advice",
      group: "fun",
      memberName: "advice",
      nsfw: true,
      args: [{
        type: "string",
        prompt: "What are you searching for?",
        key: "query",
        default: "none"
      }]
    })
  }
  async run(msg, { query }) {
    switch (query) {
      case "none": {
        superagent.get("https://api.adviceslip.com/advice")
          .then(res => {
            let data = JSON.parse(res.text).sli
            msg.say(new MessageEmbed()
              .setAuthor(this.client.user.username, this.client.user.displayAvatarURL({ dynamic: true }))
              .setTitle("Advice")
              .setDescription(data.advice)
              .setColor("RANDOM")
              .setTimestamp()
              .setFooter(`Requested by: ${msg.author.tag} | Advice ID: ${data.id}`))
              .catch(err => console.log(err))
          }).catch(err => console.log(err))
      }
        break
      default: {
        let searchTerm = query.replace(' ', '+')
        superagent.get(`https://api.adviceslip.com/advice/search/${searchTerm}`)
          .then(res => {
            let slips = JSON.parse(res.text).slips
            let data
            try {
              data = slips[Math.round(Math.random() * slips.length)]
            } catch (err) {
              return msg.say(`I couldn't find advice for you. 😥\nTry a different query?`)
            }
            msg.say(new MessageEmbed()
              .setAuthor(this.client.user.username, this.client.user.displayAvatarURL({ dynamic: true }))
              .setTitle("Advice")
              .setDescription(data.advice)
              .setColor("RANDOM")
              .setTimestamp()
              .setFooter(`Requested by: ${msg.author.tag} | Advice ID: ${data.id}`))
              .catch(err => console.log(err))
          }).catch(err => console.log(err))
      }
    }
  }
}