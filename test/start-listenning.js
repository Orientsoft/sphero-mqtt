// var oSphero = require('./o-sphero')
//   , listener = require('./listener')

// var mySphero = oSphero.newSphero('COM4')
//   , myListener = listener.newListener('mqtt://test.mosquitto.org', 'orient-sphero', mySphero)

// mySphero.start()
// after((4).seconds(), function () {
//   mySphero.setBackLED('on')
// })

var spheroMqtt = require('../sphero-mqtt')
  , fs = require('fs')
  , port = '/dev/rfcomm1'
  , client = 'mqtt://voyager.orientsoft.cn:11883'
  , topic = 'dualshock-sphero'
  , option = { username: '21fe3fd0-cd17-11e4-9bb2-33d0ff29c2d5'
             , password: '04426a6fdd5f759e8fd0ddcbbeaf86bd9f6ce2a9'
             }

var mySpheroMqtt = new spheroMqtt(port, client, topic)

mySpheroMqtt.start()
after((5).seconds(), function () {
  mySpheroMqtt.sphero.setBackLED('on')
  var opts = {
        // n: int, divisor of the max sampling rate, 400 hz/s
        // n = 40 means 400/40 = 10 data samples per second,
        // n = 200 means 400/200 = 2 data samples per second
        n: 200,
        // m: int, number of data packets buffered before passing to the stream
        // m = 10 means each time you get data it will contain 10 data packets
        // m = 1 is usually best for real time data readings.
        m: 1,
        // pcnt: 1 -255, how many packets to send.
        // pcnt = 0 means unlimited data Streaming
        // pcnt = 10 means stop after 10 data packets
        pcnt: 0,
      }

  mySpheroMqtt.sphero.sphero.setDataStreaming(["locator"], opts)
  ws = fs.createWriteStream('locator.txt')
  mySpheroMqtt.sphero.on('data', function (data) {
    // console.log(data.toString())
    ws.write(data.toString()+'\n')
  })

})

