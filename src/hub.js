const { startDriver } = require("./driver/handler")
const { startVendor } = require("./vendor/handler")

startDriver();
startVendor();
// setTimeout(()=>{
//     startVendor();
// }, 1500)
console.log("everything is started")
