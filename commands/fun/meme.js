const { Command } = require("discord.js-commando")
const { memeAsync } = require("memejs")

module.exports = class meme extends Command { 
  constructor(client) { 
    super(client, {
      name: "meme", 
      description: "Get a random meme from Reddit (NSFW)",
      memberName: "meme", 
      group: "fun", 
      nsfw: true, 
      args: [{
        type: "string", 
        prompt: "Which subreddit? (Type random for a random subreddit)", 
        key: "subreddit", 
        parse: s => s.toLowerCase(), 
        default: 'random'
      }]
    })
  }
  async run(msg, { subreddit }) {

    if(subreddit === 'random'){

      memeAsync().then(meme => {
        msg.say(meme.url)
      }).catch(err => {
        console.log(err)
        return msg.say(`Unable to find meme. Try again later!`)
      })
      
    }else{
      memeAsync(`${subreddit}`).then(meme => {
        msg.say(meme.url)
      }).catch(err => {
        console.log(err)
        return msg.say(`Unable to find meme. Try again later!`)
      })
    }

  }
}