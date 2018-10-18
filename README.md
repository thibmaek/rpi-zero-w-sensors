# Getting started

Make sure you have Node installed on your Raspberry Pi. This project was developed against a Raspberry Pi Zero W (because of it's small form factor), but should be perfect for Raspberry Pi B+ and up.

1. If your sensors require native binaries, run those steps first. There are npm run tasks for installing all available sensors (e.g `npm run install:dbcm2835` to install DHT binary)
2. `npm install` to install dependencies
3. `npm start` to quickly start the MQTT server on port 3000
4. You can define env variables in `env.json`

There is a basic systemd service provided which you can manually copy or install in the correct location with `npm run install:systemd-service`.
Then just reload, enable & start the service with `systemctl`.

## Publications

Set `mqtt.homeassistant` to true in env.json to have topics prefixed with 'homeassistant'.

- __DHT__: `rpi-zero-w-sensors/dht`, `rpi-zero-w-sensors/dht/temperature`, `rpi-zero-w-sensors/dht/humidity`
