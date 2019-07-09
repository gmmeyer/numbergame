const { RTMClient } = require('@slack/rtm-api')
const token = process.env.SLACK_TOKEN
const numbersGame = process.env.TEST_CHANNEL
const me = process.env.ME

const utils = require('./utils')


const rtm = new RTMClient(token)

// Attach listeners to events by type. See: https://api.slack.com/events/message
rtm.on('message', async (event) => {
  if (event.channel !== numbersGame) {
    return
  }

  utils.response(rtm, event)

});

(async () => {
  await rtm.start();
})()
