const { Command } = require("discord.js-commando")
const { MessageEmbed } = require("discord.js")

module.exports = class announce extends Command {
  constructor(client) {
    super(client, {
      name: "announce",
      description: "Announce a message to a specific channel. Choose from embed or standard message", 
      group: "moderation", 
      memberName: "announce", 
      guildOnly: true,
      args: [{
        type: "channel", 
        prompt: "Which channel?", 
        key: "channel"
      },{
        type: "string", 
        prompt: "Shall I make this an embed? yes/no", 
        key: "choice", 
        oneOf: ["yes", "no"],
        parse: c => c.toLowerCase()
      }, {
        type: "string", 
        prompt: "What shall the message be?", 
        key: "message"
      }]
    })
  }
  async run(msg, { channel, choice, message }) {

    if(!channel.permissionsFor(msg.guild.me).has(["SEND_MESSAGES"])) return msg.say(`I need permission to send messages in that channel`)

    if(!msg.member.hasPermission('MANAGE_MESSAGES')) return msg.say(`You don't have permission to use this command`)

    if(!channel.permissionsFor(msg.author).has(["SEND_MESSAGES"])) return msg.say(`You don't have permission to send messages in that channel`)

    switch(choice) {
      case "yes" : {

       channel.send(new MessageEmbed()
       .setAuthor(msg.author.username, msg.author.displayAvatarURL({dynamic: true}))
       .setTitle(`**__ANNOUNCEMENT__**`)
       .setDescription(message)
       .setColor("RANDOM")
       .setTimestamp()
       .setFooter(`Sent by: ${msg.author.tag}`))
       .catch(err => console.log(err))

      }
      break
      case "no" : {
        channel.send(message).catch(err => console.log(err))
      }
      break
    }

    
  }
}