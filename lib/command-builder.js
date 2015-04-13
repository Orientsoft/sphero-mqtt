var commandBuilder = {}

commandBuilder.forward = function buildForward (speed) {
  var command = buildCommonCommand()
  command.action.name = 'forward'
  command.action.speed = speed
  return JSON.stringify(command)
}

commandBuilder.right

function buildCommonCommand (name) {
  var command = {}
  // command.name = name
  command.dev = 'sphero'
  command.time = (new Date()) / 1
  command.type = 'action'
  command.action = {}
  return command
}

console.log(commandBuilder.forward(90))