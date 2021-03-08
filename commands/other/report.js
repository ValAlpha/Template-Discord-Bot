const { Command } = require("discord.js-commando")
const { MessageEmbed } = require("discord.js")

module.exports = class report extends Command { 
  constructor(client){
    super(client, {
      name: "report", 
      description: "Report a user to the server moderators",
      group: "other",
      memberName: "report", 
      guildOnly: true, 
      args: [{
        type: "member", 
        prompt: "Who are you reporting?",
        key: "user"
      }, {
        type: "string", 
        prompt: "What's the reason?", 
        key: "reason"
      }]
    })
  }

  async run(msg, { user, reason }){

    const settings = await this.client.settings
    if(!settings.reportLogs) return msg.say(`This feature isn't enabled`)

    let logChannel = msg.guild.channels.cache.get(settings.reportLogs)

    // Ensure the bot has the `MANAGE MESSAGES` permission
    setTimeout(() => msg.delete().catch(() => {}), 2000)

    msg.author.send(`Your report has been sent to the server moderators`).catch(err => console.log(err))

    logChannel.send(new MessageEmbed()
    .setAuthor(this.client.user.username, this.client.user.displayAvatarURL({dynamic: true}))
    .setTitle(`New Report`)
    .setDescription(`
    Reported User: ${user.user.tag}
    Reported By: ${msg.author.tag}
    Channel: <#${msg.channel.id}>
    Reason: 
    \`\`\`${reason}\`\`\``)
    .setColor("BLUE")
    .setTimestamp()).catch(err => console.log(err))

  }

}