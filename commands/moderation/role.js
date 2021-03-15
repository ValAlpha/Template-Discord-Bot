const { Command } = require("discord.js-commando")
const { MessageEmbed } = require("discord.js")

module.exports = class role extends Command {
  constructor(client) {
    super(client, {
      name: "role",
      description: "Add/Remove a role from a user",
      memberName: "role",
      group: "moderation",
      guildOnly: true,
      args: [{
        type: "member",
        prompt: "Which user?",
        key: "user"
      }, {
        type: "role",
        prompt: "Which role?",
        key: "role"
      }]
    })
  }

  async run(msg, { user, role }) {

    if (!msg.member.hasPermission('MANAGE_ROLES')) return msg.say(`You don't have permission to use this command`)
    if (!msg.guild.me.hasPermission('MANAGE_ROLES')) return msg.say(`I need the \`Manage Roles\` permission to do this!`)

    let embed = new MessageEmbed()
      .setAuthor(this.client.user.username, this.client.user.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setFooter(`Updated by: ${msg.author.tag}`)


    if (user.roles.cache.has(role.id)) {
      let res = await user.roles.remove(role.id).catch(err => null)
      if (!res) return msg.say(`I was unable to remove the role from ${user.user.tag}`).catch(console.log)
      embed.setTitle('Role Removed')
      embed.setDescription(`<@${user.user.id}> - <@&${role.id}>`)
      msg.say(embed).catch(err => console.log(err))
    } else {
      let res = await user.roles.add(role.id).catch(err => null)
      if (!res) return msg.say(`I was unable to add the role to ${user.user.tag}`).catch(console.log)
      embed.setTitle('Role Added')
      embed.setDescription(`<@${user.user.id}> + <@&${role.id}>`)
      msg.say(embed).catch(err => console.log(err))
    }

  }
}