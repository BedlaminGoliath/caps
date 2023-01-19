const { startDriver } = require("./driver/index")
const { startVendor } = require("./vendor/index")
const { Server } = require ("socket.io");

const io = new Server(3333)

startDriver();
startVendor();

console.log("everything is started")
