var mqtt    = require('mqtt')

var listener = {}

listener.newListener = function createListener (client, topic, sphero) {
  listener.client = mqtt.connect(client)
  listener.topic = topic
  listener.client.on('connect', function () {
    listener.client.subscribe(topic)
  })
    
  listener.sphero = sphero
  listener.client.on('message', function messageHandler (topic, content) {
    if (topic !== listener.topic) return

    var command = JSON.parse(content.toString())
    if (typeof command !== 'undefined') {
      console.log('command: ', command)
      var action = command.action
      if (typeof action !== 'undefined')
        sphero.excute(action)
      else
        console.log('action attribute not found')
    }
    else
      console.log('invalid json string')
  })
}

module.exports = listener