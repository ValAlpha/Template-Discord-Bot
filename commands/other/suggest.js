const { Command } = require("discord.js-commando")
const { MessageEmbed } = require("discord.js")

module.exports = class suggest extends Command { 
  constructor(client){
    super(client, {
      name: "suggest", 
      description: "Post an embeded suggestion with the 👍 & 👎 reactions added to the message", 
      memberName: "suggest", 
      group: "other", 
      guildOnly: true, 
      args: [{
        type: "string", 
        prompt: "What is the suggestion?", 
        key: "suggestion"
      }]
    })
  }
  async run(msg, { suggestion }){


    const settings = this.client.settings
    const suggestionConfig = settings.suggestions

    let embed = new MessageEmbed()
    .setAuthor(this.client.user.username, this.client.user.displayAvatarURL({dynamic: true}))
    .setTitle(`New suggestion`)
    .setDescription(suggestion)
    .setTimestamp()
    .setFooter(`Suggested by: ${msg.author.tag}`)

    if(suggestionConfig.enabled && suggestionConfig.channelID){
      msg.guild.channels.cache.get(suggestionConfig.channelID)
    .send(embed)
    .then(m => {
      m.react('👍')
      m.react('👎')
    }).catch(err => console.log(err))
    }else{
      msg.say(embed)
      .then(m => {
        m.react('👍')
        m.react('👎')
      }).catch(err => console.log(err))
    }
    
  }
}