const dht = require(`node-dht-sensor`);

exports.getSensorData = () => {
  const { temperature, humidity  } = dht.read();
  const response = {
    humidity: humidity.toFixed(0),
    temperature: temperature.toFixed(0),
  };

  console.log(`[Sensor: DHT]`, response);
  return response;
};

exports.publishTopic = (client, data) =>
  mqttSettings => {
    /**
     * Publish the complete response to the /dht subtopic
     */
    client.publish(`${mqttSettings.baseTopic}/dht`, JSON.stringify(data), {}, err => {
      if (err) {
        console.error(`
          Error publishing: ${mqttSettings.baseTopic}/dht:
            ${err.toString()}
        `);
      }
    });

    /**
     * Publish the temperature to the /dht/temperature subtopic
     */
    client.publish(`${mqttSettings.baseTopic}/dht/temperature`, `${data.temperature}`, {}, err => {
      if (err) {
        console.error(`
          Error publishing: ${mqttSettings.baseTopic}/dht/temperature:
            ${err.toString()}
        `);
      }
    });

    /**
     * Publish the humidity to the /dht/humidity subtopic
     */
    client.publish(`${mqttSettings.baseTopic}/dht/humidity`, `${data.humidity}`, {}, err => {
      if (err) {
        console.error(`
          Error publishing: ${mqttSettings.baseTopic}/dht/humidity:
            ${err.toString()}
        `);
      }
    });
  };
