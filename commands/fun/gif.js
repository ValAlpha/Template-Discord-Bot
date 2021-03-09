const { Command } = require("discord.js-commando")
const { MessageEmbed } = require("discord.js")
const superagent = require("superagent")

module.exports = class gif extends Command { 
  constructor(client){
    super(client, {
      name: "gif", 
      description: "Seatch for a gif via GIPHY", 
      group: "fun", 
      memberName: "gif",
      nsfw: true,
      args: [{
        type: "string", 
        prompt: "What gif are you looking for?",
        key: "query",
        parse: q => q.replace(' ', '+')
      }]
    })
  }
  async run(msg, { query }){

    const settings = this.client.settings
    if(!settings.giphyApiKey) return msg.say(`You need to provide a giphy API key`)

    superagent.get(`https://api.giphy.com/v1/gifs/search?q=${query}&api_key=${settings.giphyApiKey}&limit=1`)
    .then(res => {
      
      let gifData = res.body.data[0]

      msg.say(new MessageEmbed()
      .setAuthor(this.client.user.username, this.client.user.displayAvatarURL({dynamic: true}))
      .setTitle(`${query.replace('+', ' ').toUpperCase()}`)
      .setColor("RANDOM")
      .setTimestamp()
      .setImage(`https://media1.giphy.com/media/${gifData.id}/giphy.gif`)
      .setFooter(`Requested by: ${msg.author.tag}`)).catch(err => console.log(err))

    }).catch(err => console.log(err))
    
  }
}