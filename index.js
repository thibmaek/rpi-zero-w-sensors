const mqtt = require(`mqtt`);

const config = require(`./env.json`);
const initializeSensors = require(`./lib/initializeSensors`);
const dht = require(`./sensors/dht`);

try {
  initializeSensors();
} catch (err) {
  console.error(`Could not initialize sensors because the following error occured:`, err.toString());
}

const mqttSettings = {
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
exports.mqttSettings = mqttSettings;

const client = mqtt.connect(mqttSettings.client, {
  password: config.mqtt.password,
  port: config.mqtt.port,
  username: config.mqtt.user,
});

client.on(`connect`, () => {
  console.log(`Connected to ${mqttSettings.client}:${config.mqtt.port}`);

  setInterval(() => {
    const dhtData = dht.getSensorData();
    dht.publishTopic(client, dhtData);
  }, config.sensors.defaultPollingInterval);
});
