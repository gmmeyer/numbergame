exports.getChannel = function() {
  var numbersGame = process.env.NUMBERSGAME
  var testChannel = process.env.TEST_CHANNEL

  if (process.env.TEST) {
    return testChannel
  }

  return numbersGame
}

exports.isTestEnv = function() {
  if (process.env.TEST) {
    return true
  }
  return false
}
