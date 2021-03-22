const { CommandoClient } = require("discord.js-commando")
const { join } = require("path") 
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
                "GUILD_MESSAGE_REACTIONS",
                "GUILD_INVITES", 
            ]
        }
    });

client.registry
    .registerDefaultTypes()
    .registerGroups([ 
        ['moderation', 'Moderation'],
        ['info', 'Info'],
        ['fun', 'Fun'],
        ['economy', 'Economy'],
        ['other', 'Other']
    ])
    .registerDefaultGroups()
    .registerDefaultCommands({
        unknownCommand: false,
        help: false
    })

.registerCommandsIn(join(__dirname, 'commands'));

let folders = []

for (const folder of folders) {
    client.registry.registerCommandsIn(join(__dirname, `commands/${folder}/`));
}

global.servers = {};

const connectToDatabase = require("./database/mongodb")
connectToDatabase()

client.dbs  = {
    warnings: require("./database/models/warnings"), 
    profile: require("./database/models/economyProfile")
}

client.functions = {
    newEcoProfile: require("./functions/newEcoProfile")
}

client.settings = require("./settings.json")
client.events = {
    messageDelete: require("./events/messageDelete"), 
    messageUpdate: require("./events/messageUpdate"),
    inviteManager: require("./events/inviteManager"), 
    joinLeave: require("./events/joinLeave")
}
client.utils = {
    antiAd: require("./utils/antiAdvertisement")
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
client.events.inviteManager(client)
client.events.joinLeave(client)

client.on('message', async (msg) => {
    if(client.settings.antiAdvertisement.enabled) require("./utils/antiAdvertisement")(client, msg)
    if(client.settings.wordFilter.enabled) require("./utils/wordFilter")(client, msg)
})



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