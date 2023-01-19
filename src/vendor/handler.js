const { chance, EVENT_NAMES } = require("../utils");
const { io }= require("socket.io-client");

const events = io("ws://localhost:3333");
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


module.exports = { acknowledgeDelivery,
  sendPickup,
  events, };


