var mqtt = require('mqtt')

var client = mqtt.connect('mqtt://voyager.orientsoft.cn:11883')
var topic = 'orient-sphero'

var commandForward = {'name': 'forward', 'speed': 90}
var commandLeft = {'name':'rotate', 'angle':-30}
var commandRight = {'name': 'rotate', 'angle':30}
var commandStop = {'name' : 'stop'}

function forward () {
  var data = {}
  data.type = 'action'
  data.action = commandForward
  client.publish(topic, JSON.stringify(data))
}

function left () {
  var data = {}
  data.type = 'action'
  data.action = commandLeft
  client.publish(topic, JSON.stringify(data))
}

function right () {
  var data = {}
  data.type = 'action'
  data.action = commandRight
  client.publish(topic, JSON.stringify(data))
}

function stop () {
  var data = {}
  data.type = 'action'
  data.action = commandStop
  client.publish(topic, JSON.stringify(data))
}

var stdin = process.openStdin(); 
require('tty').setRawMode(true);    

stdin.on('keypress', function (chunk, key) {
  // process.stdout.write('Get Chunk: ' + chunk + '\n');
  if (key && key.name == 'w') forward();
  if (key && key.name == 'a') left();
  if (key && key.name == 'd') right();
  if (key && key.name == 's') stop();
  if (key && key.ctrl && key.name == 'c') process.exit();
});