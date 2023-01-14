const { events, chance, EVENT_NAMES } = require("../events");


// Vendor sends pickup event for a store
function sendPickup() {
  const event = {
    store: chance.city(),
    orderId: chance.guid(),
    customer: chance.name(),
    address: chance.address(),
  };
  console.log("vendor asking for pickup!", event);
  events.emit(EVENT_NAMES, event);
}

function acknowledgeDelivery(orderId) {
  console.log("Vendor thank you for the delivery", orderId);
}

function startVendor() {
  events.on("delivered", acknowledgeDelivery);
  console.log("Vendor Ready!");

  function ready() {
    sendPickup();

    setTimeout(ready, chance.integer({ min: 750, max: 2000 }));
  }
  ready();
}

module.exports = { startVendor };
