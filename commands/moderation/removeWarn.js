const { Command } = require("discord.js-commando")

module.exports = class removewarn extends Command { 
  constructor(client){
    super(client, {
      name: "removewarn", 
      description: "Remove a warn by it's case ID", 
      memberName: "removewarn", 
      group: "moderation",
      guildOnly: true, 
      aliases: ["rw"], 
      args: [{
        type: "integer", 
        prompt: "Which case number?", 
        key: "caseID", 
        min: 1
      }]
    })
  }

  async run(msg, { caseID }) {

    const warns = await this.client.dbs.warnings.findOne({dbID: msg.guild.id})

    if(!warns) return msg.say(`There are no warnings for this server`)

    const findWarning = warns.warnings.find(w => w.caseID === caseID)
    if(!findWarning) return msg.say(`There is no warning with that case ID`)

    warns.warnings = warns.warnings.filter(w => w.caseID !== caseID)

    warns.save().catch(err => console.log(err))

    return msg.say(`Warning removed`)
    

    

  }

}