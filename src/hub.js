
const { Server } = require("socket.io");
const io = new Server(3333)

// startDriver();
// startVendor();


function startEventServer(){
    io.on("connection",()=>{
        console.log("have new connection");
    });
    
    console.log("everything is started")
}

startEventServer();