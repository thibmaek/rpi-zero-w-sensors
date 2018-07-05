const express = require('express');

const config = require('./env.json');
const initializeSensors = require('./lib/initializeSensors');
const dhtSensor = require('./routes/sensors/dht');

const app = express();
initializeSensors();

if (config.arest.enabled) {
  const aRest = require('pi-arest')(app);
  aRest.set_id(config.arest.id);
  aRest.set_name(config.arest.name);
  aRest.connect();
}

app.get('/sensor/dht', (_, res) => {
  const response = dhtSensor();
  return res.json(response);
});

const server = app.listen(config.port, () => {
  console.log('Listening on port %d', server.address().port);
});
