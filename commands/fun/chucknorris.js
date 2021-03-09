const { Command } = require("discord.js-commando")
const { MessageEmbed } = require("discord.js")
const superagent = require("superagent")

module.exports = class chucknorris extends Command {
  constructor(client){
    super(client, {
      name: "chucknorris", 
      description: "Recieve a Chuck Norris fact randomly or by category", 
      group: "fun", 
      memberName: "chucknorris", 
      aliases: ["cn"], 
      nsfw: true,
      args: [{
        type: "string", 
        prompt: "Which category (Leave blank for random fact)", 
        key: "query", 
        default: "random"
      }]
    })
  }
  async run(msg, { query }){

    //! Add throttling

    const getGroups = await superagent.get(`https://api.chucknorris.io/jokes/categories`)
    const groups = getGroups.body

    if(query !== "random"){
      
      let fact = await superagent.get(`https://api.chucknorris.io/jokes/random?category=${query.toLowerCase()}`)

      msg.say(new MessageEmbed()
      .setAuthor(this.client.user.username, this.client.user.displayAvatarURL({dynamic: true}))
      .setTitle(`__Chuck Norris Fact__`)
      .setDescription(`${fact.body.value}`)
      .setColor("RANDOM")
      .setThumbnail(fact.body.icon_url)
      .setTimestamp()
      .setFooter(`Requested by: ${msg.author.tag}`))
      .catch(err => console.log(err))

      if(!groups.includes(query.toLowerCase())){
        msg.say(new MessageEmbed()
      .setAuthor(this.client.user.username, this.client.user.displayAvatarURL({dynamic: true}))
      .setTitle(`\`\`\`${query}\`\`\` isn't a valid category`)
      .setDescription(`**The valid categories are**: 
      ${groups.map(g => `• ${g}`).join('\n')}`)
      .setColor("RANDOM")
      .setTimestamp()
      .setFooter(`Requested by: ${msg.author.tag}`))
      .catch(err => console.log(err))
      }

    }else{
      
      let fact = await superagent.get(`https://api.chucknorris.io/jokes/random`)

      msg.say(new MessageEmbed()
      .setAuthor(this.client.user.username, this.client.user.displayAvatarURL({dynamic: true}))
      .setTitle(`__Chuck Norris Fact__`)
      .setDescription(`${fact.body.value}`)
      .setColor("RANDOM")
      .setThumbnail(fact.body.icon_url)
      .setTimestamp()
      .setFooter(`Requested by: ${msg.author.tag}`))
      .catch(err => console.log(err))

    }

  }
}