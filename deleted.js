const slack = require('./slack')
const rtm = slack.rtm
const web = slack.web

const utils = require('./utils')

const numbersGame = utils.getChannel()

var lastNumber = require('./cache').lastNumber

var getFromCacheByOriginalId = require('./cache').getFromCacheByOriginalId
var deleteFromCache = require('./cache').deleteFromCache

exports.deleted = function(event) {

  if (event.subtype != 'message_deleted') {
    console.log("not a deleted message", event)
    return
  } else {
    console.log("a deleted message", event)
  }

  var originalId = parseEvent(event)
  if (!originalId) {
    return
  }

  var data = getFromCacheByOriginalId(originalId)
  if (!data) return
  var originalNumber = data.originalNumber
  var number = data.number
  var id = data.id
  var ts = data.ts

  if (!ts) {
    console.log('no time stamp', data)
    return
  }

  (async () => {
    web.chat.delete({
      channel: numbersGame,
      ts: ts,
      as_user: true,
    })
      .then(function(reply) {
        deleteFromCache(number)
        console.log("deleted a message", reply);
      })
      .catch(function(e) {
        console.log("error deleting a message", e)
      })
  })()
}

function parseEvent(event) {
  if (event.previous_message) {
    if (event.previous_message.client_msg_id) {
      return event.previous_message.client_msg_id
    }
  }
}
