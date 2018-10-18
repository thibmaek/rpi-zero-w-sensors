const mqtt = require('mqtt');

const config = require('./env.json');
const initializeSensors = require('./lib/initializeSensors');
const dhtSensor = require('./routes/sensors/dht');

initializeSensors();

const MQTT_Settings = {
  get baseTopic() {
    if(config.mqtt.homeassistant) {
      return `homeassistant/zero-w-sensors`;
    }

    return "zero-w-sensors";
  },

  get client() {
    return `mqtt://${config.mqtt.broker}`;
  }
}

const client = mqtt.connect(MQTT_Settings.client, {
  password: config.mqtt.password,
  port: config.mqtt.port,
  username: config.mqtt.user,
});

client.on('connect', () => {
  console.log(`Connected to ${MQTT_Settings.client}`);

  setInterval(() => {
    const dhtData = dhtSensor();
    client.publish(`${MQTT_Settings.baseTopic}/dht`, JSON.stringify(dhtData));
  }, config.sensors.defaultPollingInterval);
});
