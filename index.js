const { RTMClient } = require('@slack/rtm-api')
const token = process.env.SLACK_TOKEN
const numbersGame = process.env.NUMBERSGAME
const me = process.env.ME

const response = require('./response')

const rtm = new RTMClient(token)

// Attach listeners to events by type. See: https://api.slack.com/events/message
rtm.on('message', async (event) => {
  if (event.channel !== numbersGame) {
    return
  }
  if (event.user === me) {
    console.log("it's me!", event)
    return
  }

  response.response(rtm, event)

});

(async () => {
  console.log('starting the rtm server')
  await rtm.start();
})()
