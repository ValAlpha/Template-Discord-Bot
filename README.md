[![Hits](http://hits.dwyl.com/ValAlpha/TemplateBot.svg)](http://hits.dwyl.com/ValAlpha/TemplateBot) 
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://GitHub.com/Naereen/StrapDown.js/graphs/commit-activity) 
<img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/ValAlpha/TemplateBot?style=social"> 
<img alt="GitHub forks" src="https://img.shields.io/github/forks/ValAlpha/TemplateBot?style=social"> 
<img alt="Discord" src="https://img.shields.io/discord/695521627085209640"> 
<img alt="GitHub issues" src="https://img.shields.io/github/issues/ValAlpha/TemplateBot"> 

# Discord Bot Template built with JavaScript

## What is this project?
This is a bare bones example Discord bot that's easy to use and easy to expand on. 
This is perfect for those who are new to creating Discord bots.

## What is included?
### Commands
### Moderation
 - Announce
 - Ban
 - Clear Warns
 - Kick
 - Purge
 - Remove Warn
 - Role add/remove
 - Unban
 - Warn
 - Warns

### Info
- Server Info
- User Info

### Fun
- Advice 
- Chuck Norris
- gif

### Other
- Report
- Suggest

### Events
- Invite Manager
- Join/Leave
- Message Delete
- Message Update

### Utilities
- Word Filter
- Anti Advertisement

---

## What do I need to use this repo?
- A basic understanding of JavaScript is fundamental
- A basic understanding of [Discord.js](https://www.npmjs.com/package/discord.js) and [Discord.commando](https://www.npmjs.com/package/discord.js-commando) is ideal but not necessary
- A basic understanding of [MongoDB](mongodb.com) and [Mongoose](https://www.npmjs.com/package/mongoose) is ideal but not necessary
---

## Creating a MongoDB account

 1. Go to [MongoDB](https://account.mongodb.com/account/register)
 2. Fill out your details and click `sign up`
 3. Fill in your `Organization name` and `Project Name`. 
 Select `JavaScript` as your proffered language and click `continue`
 4. For this example we will use the `FREE` cluster option on the right
 5. Leave everything as default and change the cluster name if you wish
 6. Click `Create Cluster` (This may take a few minutes)
 7. On the left-hand side click `Network Access` and click `Add IP Address` and enter `0.0.0.0/0` and click `confirm`
 8. On the left-hand side click `Database Access` and click `Add New Database User`. Create a username and password and click `Add User` 
 **Remember this password.**
 9. On the left-hand side click `Clusters` and click `Connect`
 Click on the *second* option `Connect Your Application` 
10. Ensure the `Driver` is `node.js` and the `version` is `3.6 or later`
11. Copy the connection string. It will look something like this: <br>
`mongodb+srv://TemplateBot:<password>@cluster0.pf4nz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
12. Inside our code editor create a file inside the root of the project called `.env` and inside type the following: 
`MongoDB=""`
Inside of the quotes paste your connection srting
**Replacing `<password>` with your database user password** and changing `myFirstDatabase` to something more appropriate
---
## Creating a Discord bot client
1.  Go to the [Discord dev portal](discord.com/developers/applications)
2. Click `New Application` on the top-right
3. Give it a name and click `Create`
4. On the left-hand side click `bot` and click `add bot`
This tells Discord you want this account to be a `bot account`
5. Under `Privileged Gateway Intents` ensure `SERVER MEMBERS INTENT` is enabled. Please note, Once your bot surpasses 100 servers your bot will need to be [verified]() in order to use this intent.
6. On the left-hand side click `OAuth2` and under `scopes` check `bot`
7. Under `bot permissions` check the following:
- View Audit Log
- Manage Server
- Manage Roles
- Manage Channels
- Kick Members
- Ban Members
- View Channels
- Send Messages
- Manage Messages
- Embed Links
- Read Message History
- Add Reactions

Alternatively just check the `Admin` permission **`Not Recommended`**

8. Under `Scopes` an invite url has been generated with the required scopes.
Use this to invite the bot to your guild. 
9. On the left-hand side click `bot` and copy the `TOKEN`
It is important that you keep this secret. NEVER share this with anyone you do no trust.
10. Inside the `.env` file we created in `Step 12` under your MONGODB connection string add `TOKEN=`
Please note, we do not use quotes  `""` for here.
11. Paste your bot token after the `=` and save.
---
## Getting the bot online
1. Assuming you have followed all steps above we are ready to bring the bot to life.
2. Open up your terminal inside of your code editor and type `npm install`. 
This will install all packages from `package.json`
3. Once this is done type `nodemon bot.js` and boom, It's alive!
---
## What if I have an issue?

You can reach me (VAL#0001) on my [Discord Server](https://discord.gg/RswMYNwp9c)

## How do I host/keep the bot online 24/7
There are plenty of tutorials on YouTube for this.
You are welcome to contact me for help and I will guide you through it but I will not explain it here.
