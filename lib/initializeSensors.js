const dht = require('node-dht-sensor');

module.exports = () => {
  try {
    dht.initialize(11, 4);
  } catch(e) {
    console.error('Exception occured:', e);
  }
}
