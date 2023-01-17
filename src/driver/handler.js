const { events, EVENT_NAMES, chance } = require("../events");

events.on("pickup", handlePickup);

function deliver(orderId) {
  console.log("DRIVER: picked up", orderId);
  events.emit( EVENT_NAMES.delivered, orderId);
}

function handlePickup(event) {
  console.log("driver received a pickup event", event.orderId);
  setTimeout(() => {
    deliver(event.orderId), chance.integer({ min: 500, max: 1000 });
  });
}

function startDriver() {
  console.log("Driver Ready!");

  events.on(EVENT_NAMES.pickup, handlePickup);
}

module.exports = {
  startDriver,
  toTest: {
    deliver,
    handlePickup,
  },
};
