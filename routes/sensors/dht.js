const dht = require('node-dht-sensor');

module.exports = () => setInterval(() => {
  const { temperature, humidity  } = dht.read();
  const response = {
    temperature: temperature.toFixed(2),
    humidity: humidity.toFixed(2)
  }

  console.log(response);
  return response;
}, 2000);
