const { events, chance, EVENT_NAMES } = require("../events");


// Vendor sends pickup event for a store
// the pickup function that creates our object and emits that signa; that says "pickup for delivery"
function sendPickup() {
  const event = {
    store: chance.city(),
    orderId: chance.guid(),
    customer: chance.name(),
    address: chance.address(),
  };
  console.log("Vendor asking for pickup!", event);
  events.emit(EVENT_NAMES.pickup, event);
}
 
function acknowledgeDelivery(orderId) {
  console.log("Vendor thank you for the delivery", orderId);
}

// the individual function that sets up that channel
// when ready this generates a signal that consists of the delivery from the sendpickup function
// this gets called every few seconds and calls itself.
function startVendor() {
  events.on( EVENT_NAMES.delivered, acknowledgeDelivery);
  console.log("Vendor Ready!");

  function ready() {
    sendPickup();

    setTimeout(ready, chance.integer({ min: 750, max: 2000 }));
  }
  ready();
}

module.exports = { startVendor,
   toTest:{
    acknowledgeDelivery,
    sendPickup
   }  };
