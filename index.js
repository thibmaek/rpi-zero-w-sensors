const mqtt = require(`mqtt`);

const project = require(`./package.json`);
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
      return `homeassistant/${project.name}`;
    }

    return project.name;
  },

  get client() {
    return `mqtt://${config.mqtt.broker}`;
  },
};

const client = mqtt.connect(mqttSettings.client, {
  password: config.mqtt.password,
  port: config.mqtt.port,
  username: config.mqtt.user,
});

client.on(`connect`, () => {
  console.log(`Connected to ${mqttSettings.client}:${config.mqtt.port}`);

  setInterval(() => {
    const dhtData = dht.getSensorData();
    dht.publishTopic(client, dhtData)(mqttSettings);
  }, config.sensors.defaultPollingInterval);
});
