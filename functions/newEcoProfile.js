const newProfile = async (client, user, msg) => {

  const economyConfig = client.settings.economyConfig
  const starterBalance = economyConfig.starterBalance || 100

    let newProfile = new client.dbs.profile({
      userID: user.id,
      balance: starterBalance
    }).save().catch(err => console.log(err))

    return newProfile
}

module.exports = newProfile
