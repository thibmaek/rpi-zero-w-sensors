# Getting started

Make sure you have Node installed on your Raspberry Pi. This project was developed against a Raspberry Pi Zero W (because of it's small form factor), but should be perfect for Raspberry Pi B+ and up.

1. If your sensors require native binaries, run those steps first. There are npm run tasks for installing all available sensors (e.g `npm run install:dbcm2835` to install DHT binary)
2. `npm install` to install dependencies
3. `npm start` to quickly start the Express server on port 3000
4. You can define env variables in `env.json`
5. You can optionally run this server together with an aRest dashboard

There is a basic systemd service provided which you can manually copy or install in the correct location with `npm run install:systemd-service`.
Then just reload, enable & start the service with `systemctl`.

## Routes

* `/sensor/dht` will get the temperature (C°) & humidity (%) from a DHT sensor

  ```json
  {
    "temperature": 25,
    "humidity": 40,
  }
  ````
