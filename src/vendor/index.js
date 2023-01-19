const { chance, EVENT_NAMES } = require("../utils");
const { acknowledgeDelivery, sendPickup, events } = require("./handler");

// the individual function that sets up that channel
// when ready this generates a signal that consists of the delivery from the sendpickup function
// this gets called every few seconds and calls itself.

function startVendor() {
  events.on(EVENT_NAMES.delivered, acknowledgeDelivery);
  console.log("Vendor Ready!");

  function ready() {
    sendPickup();

    setTimeout(ready, chance.integer({ min: 750, max: 2000 }));
  }
  ready();
}

startVendor();
