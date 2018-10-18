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
  console.log(`Connected to ${MQTT_Settings.client}:${config.mqtt.port}`);

  setInterval(() => {
    client.publish(`${MQTT_Settings.baseTopic}/info`, "New rpi-zero-w-sensor-state");

    const dhtData = dhtSensor();
    client.publish(`${MQTT_Settings.baseTopic}/dht`, JSON.stringify(dhtData), {}, (err) => {
      if (err) {
        console.error(`
          Error publishing: ${MQTT_Settings.baseTopic}/dht:
            ${err.toString()}
        `);
      }
    });
  }, config.sensors.defaultPollingInterval);
});
