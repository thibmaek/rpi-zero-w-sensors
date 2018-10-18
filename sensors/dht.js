const dht = require(`node-dht-sensor`);
const { MQTT_Settings } = require(`../`);

exports.getSensorData = () => {
  const { temperature, humidity  } = dht.read();
  const response = {
    humidity: humidity.toFixed(0),
    temperature: temperature.toFixed(0),
  };

  console.log(`[Sensor: DHT]`, response);
  return response;
};

exports.publishTopic = (client, data) => {
  client.publish(`${MQTT_Settings.baseTopic}/dht`, JSON.stringify(data), {}, err => {
    if (err) {
      console.error(`
        Error publishing: ${MQTT_Settings.baseTopic}/dht:
          ${err.toString()}
      `);
    }
  });

  client.publish(`${MQTT_Settings.baseTopic}/dht/temperature`, `${data.temperature}`, {}, err => {
    if (err) {
      console.error(`
        Error publishing: ${MQTT_Settings.baseTopic}/dht/temperature:
          ${err.toString()}
      `);
    }
  });

  client.publish(`${MQTT_Settings.baseTopic}/dht/humidity`, `${data.humidity}`, {}, err => {
    if (err) {
      console.error(`
        Error publishing: ${MQTT_Settings.baseTopic}/dht/humidity:
          ${err.toString()}
      `);
    }
  });
};
