const dht = require('node-dht-sensor');

module.exports = () => {
  const { temperature, humidity  } = dht.read();
  const response = {
    temperature: temperature.toFixed(0),
    humidity: humidity.toFixed(0)
  }

  console.log("[Sensor: DHT]", response);
  return response;
}
