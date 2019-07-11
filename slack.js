const { RTMClient } = require('@slack/rtm-api')
const { WebClient } = require('@slack/client')
const token = process.env.SLACK_TOKEN

const rtm = new RTMClient(token)
const web = new WebClient(token)

exports.rtm = rtm
exports.web = web
