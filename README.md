
# Discord Bot Template built with JavaScript

## What is this project?
This is a bare bones example Discord bot that's easy to use and easy to expand on. 
This is perfect for those who are new to creating Discord bots.

## What is included?
### Commands
 - [ ] Moderation
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

- [ ] Info
- Server Info
- User Info

- [ ] Fun
- Advice 
- Chuck Norris
- gif

- [ ] Other
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
11. Copy the connection string. It will look something like this: 
“`mongodb+srv://TemplateBot:<password>@cluster0.pf4nz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority“`
12. Inside our code editor create a file called `.env` and inside type the following: 
`MongoDB=""`
Inside of the quotes paste your connection srting
**Replacing `<password>` with your database user password** and changing `myFirstDatabase` to something more appropriate
