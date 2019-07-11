const { RTMClient } = require('@slack/rtm-api')
const token = process.env.SLACK_TOKEN
const me = process.env.ME

const utils = require('./utils')
const numbersGame = utils.getChannel()

const response = require('./response')
const deleted = require('./deleted')

const rtm = new RTMClient(token)

// Attach listeners to events by type. See: https://api.slack.com/events/message
rtm.on('message', async (event) => {
  if (event.channel !== numbersGame) {
    return
  }

  if (!utils.isTestEnv()) {
    if (event.user === me) {
      console.log("it's me!", event)
      return
    }
  }

  response.response(event)
  deleted.deleted(event)

});

(async () => {
  console.log('starting the rtm server')
  await rtm.start();
})()
