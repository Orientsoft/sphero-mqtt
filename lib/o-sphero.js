var cylon = require('cylon')


var oSphero = {}

oSphero.newSphero = function createNewSphero (port) {
  var newSph = {}

  newSph.isReady = false

  newSph.robot = cylon.robot({
    connections: {
      sphero: { adaptor: 'sphero', port: port }
    },
    devices: {
      sphero: { driver: 'sphero' }
    },
    // initiation when start() is called
    work: function (me) {
      newSph.isReady = true
      me.sphero.setStabilization(true)
      me.sphero.detectCollisions()
      me.sphero.setColor('green')
      me.sphero.stop()
    }
  })

  newSph.sphero = newSph.robot.devices.sphero

  newSph.start = function startSphero () {
    if (newSph.isReady)
      console.log('Sphero already started')
    else
      newSph.robot.start()
  }

  newSph.on = function setEventHandler (event, handler) {
    newSph.sphero.on(event, handler)
  }

  newSph.setColor = function setLEDCollor (color) {
    if (newSph.isReady)
      newSph.sphero.setColor(color)
    else
      console.log("Sphero is not ready. Can't set color")
  }

  newSph.getSpeed = function getSpeed () {
      return (newSph.sphero.readLocator)
  }

  newSph.roll = function rollSphero (speed, heading, state) {
    newSph.sphero.roll(speed, heading, state)
  }

  newSph.setBackLED = function setBackLED (option) {
    switch (option) {
      case 'on' :
        console.log('tail light on')
        newSph.sphero.setBackLED(192)
        break;
      case 'off' :
        console.log('tail light off')
        newSph.sphero.setBackLED(0)
        break;
      default:
        console.log('wrong option')
        break;
    }
  }
  
  newSph.heading = 0

  newSph.rotate = function spheroRotate (angle) {
    newSph.sphero.setHeading((360 + angle)%360)
    newSph.heading = (360 + angle)%360
  }

  newSph.excute = function spheroExcuteCommand (command) {
    switch (command.name) {
      case 'rotate':
        newSph.rotate(command.angle)
        break;
      case 'forward':
        newSph.roll(command.speed, newSph.heading, 1)
        break;
      case 'stop':
        newSph.sphero.stop()
        break;
      case 'backward':
        newSph.roll(command.speed, (newSph.heading + 180)%360, 1)
        newSph.heading = (newSph.heading + 180)%360
        break;
      case 'roll':
        newSph.roll(command.speed, command.heading)
        break;
      default:
        console.log('wrong command')
        break;
    }
  }

  return newSph
}

module.exports = oSphero
