const { EVENT_NAMES, chance } = require("../utils");
const { io }= require("socket.io-client");

const events = io("ws://localhost:3333")

events.on("pickup", handlePickup);


function deliver(orderId) {
  console.log("DRIVER: picked up", orderId);
  events.emit( EVENT_NAMES.delivered, orderId);
  events.emit("enqueue driver");
}

function handlePickup(event) {
  console.log("driver received a pickup event", event.orderId);
  events.emit("in-transit")
  setTimeout(
    () => {
    deliver(event.orderId), 
    chance.integer({ min: 500, max: 1000 });
  });
}




module.exports = {
    deliver,
    handlePickup,
    events,
}
