const { RTMClient } = require('@slack/rtm-api')
const token = process.env.SLACK_TOKEN

const rtm = new RTMClient(token)


exports.rtm = rtm
