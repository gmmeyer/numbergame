exports.response = function(rtm, event, lastNumber) {
  if (event.subtype === 'message_changed') {
    console.log("edited message", event)
    return
  }

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

  if (!text) {
    console.log('an invalid message', event)
    return
  }

  if (text.includes('\u200f')) {
    return
  }

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

  var num = parseInt(text)
  if (!isNaN(num)) {
    num++
    console.log("sending a message", num, "for event", event);
    var msg = `${num}`;
    if (msg.length != text.length) {
      if (num !== 1000) {
        console.log("it's not the same length, some kind of error", msg, event)
        return
      }
    }
    if (num <= 0) {
      console.log("it's below zero, some kind of error", msg, event);
      return;
    }
    if (num < lastNumber) {
      console.log("it's below the last number, some kind of error", msg, event);
      return;
    }

    (async () => {
      const reply = await rtm.sendMessage(msg, event.channel);
      console.log("sending a message", reply);
    })()

    return num;
  } else {
    console.log("cannot parse message", event)
  }
}
