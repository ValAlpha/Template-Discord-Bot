const { CommandoClient } = require("discord.js-commando")
const { join } = require("path") 
const { MessageEmbed, WebhookClient, ClientUser } = require("discord.js")
const { config } = require("dotenv")
config()        

       const client = new CommandoClient({ 
        commandPrefix: '.',
        owner:"",
        invite: "",
        messageCacheLifetime: 60,
        messageCacheMaxSize: 30,
        fetchAllMembers: false, 
        messageSweepInterval: 60,
        restTimeOffset: 0,
        http: {
            host: `https://discord.com`,
            api: `https://discord.com/api`
        },
        ws: {
            intents: [
                "GUILD_MESSAGES",
                "GUILD_MEMBERS",
                "GUILDS",
                "DIRECT_MESSAGES",
                "DIRECT_MESSAGE_REACTIONS",
                "GUILD_MESSAGE_REACTIONS"
            ]
        }
    });

client.registry
    .registerDefaultTypes()
    .registerGroups([ 
        ['moderation', 'Moderation'],
        ['info', 'Info'],
        ['other', 'Other']
    ])
    .registerDefaultGroups()
    .registerDefaultCommands({
        unknownCommand: false,
        help: false
    })

.registerCommandsIn(join(__dirname, 'commands'));

let folders = [
    "owner",
];

for (const folder of folders) {
    client.registry.registerCommandsIn(join(__dirname, `commands/${folder}/`));
}

global.servers = {};

client.settings = require("./settings.json")
client.events = {
    messageDelete: require("./events/messageDelete"), 
    messageUpdate: require("./events/messageUpdate")
}


client.once('ready', async () => {

  console.log(`Client | (Connected)`)
  
    client.user.setPresence({
        activity: {
            name: 'Boop',
            type: 'WATCHING'
        }
    })
})

// client.events.messageDelete(client)
client.events.messageUpdate(client)

client.on("commandError", (cmd, error, msg, args, fromPatter, result) => {
    console.log(`${cmd.name} - (Error)`, error.stack)
});

client.on(`error`, (err) => {
if (err === undefined || err === "undefined") return null;
if(!err) return null;
if(!err.stack) return null;
if(err.stack === "undefined") return null;
   let ignoreErrors = [
    `DiscordAPIError: Unknown Message`,
    `DiscordAPIError: Missing Permissions`,
    `DiscordAPIError: Missing Access`,
    `DiscordAPIError: Unknown Channel`,
    `DiscordAPIError: Cannot send messages to this user`,
    "DiscordAPIError: Cannot execute action on a DM channel"
], there = [];
for (const ignore of ignoreErrors){
    if(err.stack.includes(ignore)) there.push(true);
};
if(there.length !== 0) return null;
});

client.login(process.env.TOKEN).catch((err) => {
    console.log(`Client Login Issue\n`, err.stack);
})