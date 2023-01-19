const { EVENT_NAMES } = require("../utils");
const { handlePickup, events } = require("./handler");

function startDriver() {
  console.log("Driver is ready!");

  events.on(EVENT_NAMES.pickup, handlePickup);
}

startDriver();
