const wordFilter = async (client, msg) => {

  const settings = client.settings
  const filterList = settings.wordFilter.filterList

  for (const word of filterList){
    if(msg.content.toLowerCase().includes(word)){
      setTimeout(() => msg.delete().catch(() => {}), 1000)
      return msg.reply(`You said one or more blocked words. Please watch what you say`)
    }
  }
}

module.exports = wordFilter