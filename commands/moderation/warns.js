const { Command } = require("discord.js-commando")
const { MessageEmbed } = require("discord.js")
const { RichDisplay } = require("great-commando")

module.exports = class warns extends Command {
  constructor(client) {
    super(client, {
      name: "warns",
      description: "View a user's warns",
      group: "moderation",
      memberName: "warns",
      guildOnly: true,
      args: [{
        type: "user",
        prompt: "Which user?",
        key: "user"
      }]
    })
  }

  async run(msg, { user }) {

    const warns = await this.client.dbs.warnings.findOne({ dbID: msg.guild.id })
    if (!warns) return msg.say(`There are no warnings in this server`)

    const userWarns = warns.warnings.filter(u => u.user === user.id)
    if (userWarns.length == 0) return msg.say(`This user has no wernings`)

    let mappedWarns = userWarns.map(w => `• ${w.caseID} | Moderator <@${w.moderator}>\n ${w.reason}`).join('\n\n')

    if (userWarns.length > 5) {
      
    const chunking = (array, chunkSize) => {
      let arr = [];
      for (let i = 0; i < array.length; i += chunkSize)
        arr.push(array.slice(i, i + chunkSize));
      return arr;
    };
    let chunks = chunking(userWarns, 5);
    
    let e = new MessageEmbed().setTitle(`Warnings for ${user.tag}`).setAuthor(this.client.user.tag, this.client.user.displayAvatarURL({ dynamic: true }))
    let display = new RichDisplay(e)

    chunks.forEach(arr => {
      display.addPage(e => e.setDescription(arr.map(w => `• ${w.caseID} | Moderator <@${w.moderator}>\n ${w.reason}`).join('\n\n')))
    })

    display.setFooterPrefix('Here are all of the commands you can use. Page: ')
    display.run(await msg.channel.send(`Loading...`), { filter: (reaction, user) => user.id === msg.author.id })
    } else {

      msg.say(new MessageEmbed()
        .setAuthor(this.client.user.username, this.client.user.displayAvatarURL({ dynamic: true }))
        .setTitle(`Warnings for ${user.tag}`)
        .setDescription(mappedWarns)
        .setTimestamp()
        .setFooter(`Requested by: ${msg.author.tag}`))

    }
  }
}