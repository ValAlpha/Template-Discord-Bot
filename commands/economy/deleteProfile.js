const { Command } = require("discord.js-commando")

module.exports = class deleteprofile extends Command { 
  constructor(client) {
    super(client, { 
      name: "deleteprofile", 
      description: "Delete your economy profile", 
      memberName: "deleteprofile", 
      group: "economy", 
      aliases: ['dp'], 
      args: [{
        type: "string",
        prompt: "Are you sure? [yes/no]\n**__This is irreversible!__**", 
        key: "confirmation", 
        parse: c => c.toLowerCase(), 
        oneOf: ['yes', 'no']
      }]
    })
  }

  async run(msg, { confirmation }) {

    if(confirmation === 'no') return msg.reply(`Ok, I won't delete anything!`)

    const profile = await this.client.dbs.profile.findOne({userID: msg.author.id})
    if(!profile) return msg.reply(`You don't have any data to delete!`)

    profile.delete().catch(err => {return msg.say(`There was an error deleting your data!`)})
    return msg.reply(`Ok, Your data has been deleted!`)

  }

}