                      const { Command } = require("discord.js-commando")
const { MessageEmbed } = require("discord.js")

module.exports = class mute extends Command {
  constructor(client) {
    super(client, {
      name: "mute",
      description: "Mute a user",
      group: "moderation",
      memberName: "mute",
      guildOnly: true,
      args: [{
        type: "member",
        prompt: "Which user?",
        key: "user"
      }, {
        type: "integer",
        prompt: "For how long?",
        key: "time"
      }, {
        type: "string",
        prompt: "For what reason?",
        key: "reason",
        default: "No reason provided"
      }]
    })
  }
  async run(msg, { user, time, reason }) {

    if (!msg.member.hasPermission('KICK_MEMBERS')) return msg.say(`You don't have permission to use this command`)
    if (msg.author.id === user.id) return msg.say(`Why would you mute yourself?`)
    if (user.id === this.client.user.id) return msg.say(`Please don't mute me! 😢`)
    if (user.hasPermission('KICK_MEMBERS')) return msg.say('I can not mute this user')
    if (!msg.guild.me.hasPermission('KICK_MEMBERS')) return msg.say(`I need the \`Kick Members\` permission to mute members!`)

    const settings = this.client.settings
    const muteConfig = settings.muteConfig
    const punishmentLogs = settings.punishmentLogs

    if (!muteConfig.enabled) return msg.say(`This command is disabled`)

    let muteRole = msg.guild.roles.cache.get(muteConfig.roleID) || msg.guild.roles.cache.find(r => r.name.toLowerCase() === muteConfig.roleName)

    let userDMEmbed = new MessageEmbed()
      .setAuthor(this.client.user.username, this.client.user.displayAvatarURL({ dynamic: true }))
      .setTimestamp()

    let logEmbed = new MessageEmbed()
      .setAuthor(this.client.user.username, this.client.user.displayAvatarURL({ dynamic: true }))
      .setTimestamp()

    if (!muteRole) {
      msg.guild.roles.create({
        data: {
          name: muteConfig.roleName,
          color: "#6A7E25",
          hoist: true,
          mentionable: false,
          permissions: 0
        },
        reason: `Couldn't find mute role`
      })
        .then(role => {
          const currentRoles = user.roles.cache

          user.roles.remove(currentRoles)
          user.roles.add(role)

          msg.say(new MessageEmbed()
            .setDescription(`<@${user.id}> has been muted`))

          if (punishmentLogs.enabled && punishmentLogs.channelID) {

            logEmbed.setDescription(`
            User: <@${user.id}> (**${user.id}**)
            Moderator: <@${msg.author.id}>
            Length: ${time} minutes
            Reason: \`\`\`${reason}\`\`\``).setColor("RED").setTitle(`User Muted`)

            msg.guild.channels.cache.get(punishmentLogs.channelID)
              .send(logEmbed).catch(err => console.log(err))
          }

          userDMEmbed.setDescription(`You have been muted in ${msg.guild.name}
          Length: ${time} minutes\n\nReason: \`\`\`${reason}\`\`\``).setColor("RED").setTitle(`Muted`)
          user.send(userDMEmbed).catch(err => console.log(err))

          setTimeout(() => {
            user.roles.remove(role)
            user.roles.add(currentRoles)

            if (punishmentLogs.enabled && punishmentLogs.channelID) {

              logEmbed.setDescription(`User: <@${user.id}> (**${user.id}**)`).setColor("GREEN").setTitle(`User Unmuted`)
              msg.guild.channels.cache.get(punishmentLogs.channelID)
                .send(logEmbed).catch(err => console.log(err))
            }

            userDMEmbed.setDescription(`You have been unmuted in ${msg.guild.name}`).setColor("GREEN").setTitle(`Unmuted`)
            user.send(userDMEmbed).catch(err => console.log(err))

          }, time * 60000)

        })
        .catch(err => console.log(err))

    } else {

      const currentRoles = user.roles.cache

      user.roles.remove(currentRoles)
      user.roles.add(muteRole)

      msg.say(new MessageEmbed()
        .setDescription(`<@${user.id}> has been muted`))

      if (punishmentLogs.enabled && punishmentLogs.channelID) {

        logEmbed.setDescription(`
            User: <@${user.id}> (**${user.id}**)
            Moderator: <@${msg.author.id}>
            Length: ${time} minutes
            Reason: \`\`\`${reason}\`\`\``).setColor("RED").setTitle(`User Muted`)

        msg.guild.channels.cache.get(punishmentLogs.channelID)
          .send(logEmbed).catch(err => console.log(err))
      }

      userDMEmbed.setDescription(`You have been muted in ${msg.guild.name}
          Length: ${time} minutes\n\nReason: \`\`\`${reason}\`\`\``).setColor("RED").setTitle(`Muted`)
      user.send(userDMEmbed).catch(err => console.log(err))

      setTimeout(() => {
        user.roles.remove(muteRole)
        user.roles.add(currentRoles)

        if (punishmentLogs.enabled && punishmentLogs.channelID) {

          logEmbed.setDescription(`User: <@${user.id}> (**${user.id}**)`).setColor("GREEN").setTitle(`User Unmuted`)
          msg.guild.channels.cache.get(punishmentLogs.channelID)
            .send(logEmbed).catch(err => console.log(err))
        }

        userDMEmbed.setDescription(`You have been unmuted in ${msg.guild.name}`).setColor("GREEN").setTitle(`Unmuted`)
        user.send(userDMEmbed).catch(err => console.log(err))

      }, time * 60000)

    }

  }
}