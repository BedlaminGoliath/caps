const { events, EVENT_NAMES } = require('../events');
const { handlePickup } = require('./handler');

function startDriver() {
  console.log('Driver is ready!');

  events.on(EVENT_NAMES.pickup, handlePickup);
}

module.exports = { startDriver };