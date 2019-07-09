const { RTMClient } = require('@slack/rtm-api')
const token = process.env.SLACK_TOKEN
const numbersGame = process.env.NUMBERSGAME
const me = process.env.ME

const utils = require('./utils')

const rtm = new RTMClient(token)

// this is a nasty hack
var lastNumber = 0

// Attach listeners to events by type. See: https://api.slack.com/events/message
rtm.on('message', async (event) => {
  if (event.channel !== numbersGame) {
    return
  }
  if (event.user === me) {
    console.log("it's me!", event)
    return
  }

  n = utils.response(rtm, event, lastNumber)
  if (n) {
    lastNumber = n;
  }

});

(async () => {
  await rtm.start();
})()
