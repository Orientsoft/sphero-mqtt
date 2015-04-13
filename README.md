Sphero-MQTT
===========
This node.js module controls [Sphero][1] with commands sent via MQTT,
using the [Cylon-sphero][2] and the [mqtt][3] module.

Usage
-----
To create a Sphero-MQTT instance, use:

	var spheroMqtt = require('../sphero-mqtt')
	var mySpheroMqtt = new spheroMqtt(port, client, topic)

with parameters:

> *port*: the port connects to your sphero  
> *client*: the MQTT broker to receive commands from  
> *topic*: topic to subscribe for receiving commands

Commands
--------
All message from the MQTT broker are in the form of JSON, the action 
attribute specifies the actual command the Sphero need to carry out.
available commands are documented below.

	{
		'name': YOUR_DEVICE_NAME,
		'time': TIMESTAMP,
		'dev': 'sphero',
		'type': 'action',
		'action': {...}
	}

### forward

The forward command makes the sphero to roll along the current heading
at certain speed, the sphero will stop according to the **MotionTimeout**
setting of the sphero.

Command:

	{
		'name': 'forward',
		'speed': speed
	}
Parameters:

> *speed*: the rolling speed of the sphero, an interger between 0 and 255

### backward

The backward command makes the sphero to roll on the opposite direction
of the current heading.

Command:

	{
		'name': 'backward',
		'speed': speed
	}

Parameters:

> *speed*: the rolling speed of the sphero, an interger between 0 and 255

### rotate

The rotate command asks the sphero to rotate according to current heading,
the heading after rotating will be the new heading of the sphero.

Command:

	{
		'name': 'rotate',
		'angle': angle
	}

Parameters:

> *angle*: the rotating angle, an interger between -180 and 180. Use angle
> from 0 to 180 to rotate clockwise, and use angle from -180 to 0 to rotate
> anti-clockwise.

### roll

The roll command makes the sphero roll without changing the base heading

Command:

	{
		'name': 'roll',
		'speed': speed,
		'heading': heading
	}

Parameters:

> *speed*: the rolling speed of the sphero, an interger between 0 and 255
> *heading*: the heading direction of the sphero, interger between 0 and
> 359

### stop

The stop command asks the sphero to stop, and break to zero speed.

Command:

	{
		'name': 'stop'
	}

[1]: http://www.gosphero.com/
[2]: https://github.com/hybridgroup/cylon-sphero
[3]: https://www.npmjs.com/package/mqtt