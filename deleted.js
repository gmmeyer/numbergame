const numbersGame = process.env.NUMBERSGAME

var lastNumber = require('./cache').lastNumber

var getFromCacheByOriginalId = require('./cache').getFromCacheByOriginalId
var deleteFromCache = require('./cache').deleteFromCache

exports.deleted = function(rtm, event) {

  if (event.subtype != 'message_deleted') {
    console.log("not a deleted message", event)
    return
  }

  var originalId = parseEvent(event)
  if (!originalId) {
    return
  }

  var data = getFromCacheByOriginalId(originalId)
  var originalNumber = data.originalNumber
  var number = data.number
  var id = data.id
  var ts = data.ts

  if (!ts) {
    return
  }

  (async () => {
    const reply = await web.chat.delete({
      channel: numbersGame,
      ts: ts,
      as_user: true,
    });
    console.log("deleted a message", reply);
    deleteFromCache(number)
  })()
}

function parseEvent(event) {
  if (event.previous_message) {
    if (event.previous_message.client_msg_id) {
      return event.previous_message.client_msg_id
    }
  }
}
