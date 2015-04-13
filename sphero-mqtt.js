var oSphero = require('./lib/o-sphero')
  , listener = require('./lib/listener')

  , spheroMqtt = {}

function SpheroMqtt (port, client, topic) {
  this.sphero = oSphero.newSphero(port)
  this.listener = listener.newListener(client, topic, this.sphero)
}

SpheroMqtt.prototype = { 
  start: function startSphero () {
    this.sphero.start()
  }
}

module.exports = SpheroMqtt