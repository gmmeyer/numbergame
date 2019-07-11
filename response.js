const slack = require('./slack')
const rtm = slack.rtm
const web = slack.web

const numbersGame = process.env.NUMBERSGAME

var lastNumber = require('./cache').lastNumber

var addToCache = require('./cache').addToCache

exports.response = function(event) {

  if (!validEvent(event)) {
    return
  }

  var text = parseEvent(event)

  if (!isValid(text)) {
    console.log('an invalid message', event)
    return
  }

  text = fixText(text)

  var num = parseInt(text)

  if (!isNaN(num)) {
    num++
    console.log("sending a message", num, "for event", event);
    var msgText = `${num}`;

    if (!validMsg(msgText, text, num, event)) {
      return
    }

    (async () => {
      var msg = {
        channel: numbersGame,
        text: msgText,
        as_user: true
      }
      const reply = await web.chat.postMessage(msg, event.channel);
      console.log("sending a message", reply);

      addToCache(num, event.client_msg_id, reply.ts)
    })()

    return num;
  } else {
    console.log("cannot parse message", event, "text:", text)
  }
}

function isValid(text) {
  if (!text) {
    return false
  }

  if (text.includes('\u200f')) {
    return false
  }

  return true
}

function fixText(text) {
  if (text.includes('*')) {
    text = text.replace(/\*/g, '')
  }
  if (text.includes('_')) {
    text = text.replace(/_/g, '')
  }

  text = text.replace(/\s/g, '')
  // zero width space
  text = text.replace(/­/g, '')
  text = text.replace(/‏/g, '')
  text = text.replace(/\./g, '')
  text = text.replace(/-/g, '')
  text = text.replace(/\\/g, '')

  text = text.replace(/[^\x00-\x7F]/g, "");
  text = text.replace(/\(/g, "")
  text = text.replace(/\)/g, "")

  return text
}

function parseEvent(event) {
  var text = ''
  if (event.message) {
    if (typeof event.message === 'string') {
      text = event.message
    } else {
      if (event.message.text) {
        text = event.message.text
      }
    }
  } else if (event.text) {
    if (typeof event.text === 'string') {
      text = event.text
    }
  }

  return text
}

function validEvent(event) {
  if (event.subtype === 'message_changed') {
    console.log("edited message", event)
    return false
  }

  if (event.subtype === 'message_replied') {
    console.log("replied message", event)
    return false
  }


  return true
}

function validMsg(msg, text, num, event) {
  if (msg.length != text.length) {
    if (num !== 1000) {
      console.log("it's not the same length, some kind of error", msg, event)
      return false
    }
  }
  if (num <= 0) {
    console.log("it's below zero, some kind of error", msg, event);
    return false
  }
  if (lastNumber) {
    if (num < lastNumber) {
      console.log("it's below the last number, some kind of error", msg, event);
      return false
    }
    if (num > lastNumber + 5) {
      return false
    }
  }

  return true
}
