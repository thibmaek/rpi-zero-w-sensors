const dht = require(`node-dht-sensor`);
const { mqttSettings } = require(`../index.js`);

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
  client.publish(`${mqttSettings.baseTopic}/dht`, JSON.stringify(data), {}, err => {
    if (err) {
      console.error(`
        Error publishing: ${mqttSettings.baseTopic}/dht:
          ${err.toString()}
      `);
    }
  });

  client.publish(`${mqttSettings.baseTopic}/dht/temperature`, `${data.temperature}`, {}, err => {
    if (err) {
      console.error(`
        Error publishing: ${mqttSettings.baseTopic}/dht/temperature:
          ${err.toString()}
      `);
    }
  });

  client.publish(`${mqttSettings.baseTopic}/dht/humidity`, `${data.humidity}`, {}, err => {
    if (err) {
      console.error(`
        Error publishing: ${mqttSettings.baseTopic}/dht/humidity:
          ${err.toString()}
      `);
    }
  });
};
