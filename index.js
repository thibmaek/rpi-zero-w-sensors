const mqtt = require(`mqtt`);

const config = require(`./env.json`);
const initializeSensors = require(`./lib/initializeSensors`);
const dht = require(`./sensors/dht`);

try {
  initializeSensors();
} catch (err) {
  console.error(`Could not initialize sensors because the following error occured:`, err.toString());
}

const MQTT_Settings = {
  get baseTopic() {
    if (config.mqtt.homeassistant) {
      return `homeassistant/zero-w-sensors`;
    }

    return `rpi-zero-w-sensors`;
  },

  get client() {
    return `mqtt://${config.mqtt.broker}`;
  },
};
exports.MQTT_Settings = MQTT_Settings;

const client = mqtt.connect(MQTT_Settings.client, {
  password: config.mqtt.password,
  port: config.mqtt.port,
  username: config.mqtt.user,
});

client.on(`connect`, () => {
  console.log(`Connected to ${MQTT_Settings.client}:${config.mqtt.port}`);

  setInterval(() => {
    const dhtData = dht.getSensorData();
    dht.publishTopic(client, dhtData);
  }, config.sensors.defaultPollingInterval);
});
