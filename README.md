# Getting started

Make sure you have Node installed on your Raspberry Pi. This project was developed against a Raspberry Pi Zero W (because of it's small form factor), but should be perfect for Raspberry Pi B+ and up.

1. If your sensors require native binaries, run those steps first. There are npm run tasks for installing all available sensors (e.g `npm run install:dbcm2835` to install DHT binary)
2. `npm install` to install dependencies
3. `npm start` to quickly start the MQTT server on port 3000
4. You can define env variables in `env.json`

There is a basic systemd service provided which you can manually copy or install in the correct location with `npm run install:systemd-service`.
Then just reload, enable & start the service with `systemctl`.

## Subscribing to a topic

When you have started the relay, subscribe to either one of the topics in Publications below or use a wildcard to see what data gets published:

```console
# Using mosquitto and a local broker in this example
$ mosquitto_sub -h localhost -p 1883 -u test -P test -t "rpi-zero-w-sensors/#"

# Using mosquitto and Home Assistant in this example
$ mosquitto_sub -h hassio.local -p 1883 -u test -P test -t "homeassistant/rpi-zero-w-sensors/#"
```

## Publications

Set `mqtt.homeassistant` to true in env.json to have topics prefixed with 'homeassistant'.

- __DHT__: `rpi-zero-w-sensors/dht`, `rpi-zero-w-sensors/dht/temperature`, `rpi-zero-w-sensors/dht/humidity`
