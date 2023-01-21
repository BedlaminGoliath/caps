
const { Server } = require("socket.io");
const { EVENT_NAMES } = require("./utils");
const io = new Server(3333)

// startDriver();
// startVendor();


function startEventServer(){
    // socket describes who is attached to it
    io.on("connection",(socket)=>{
        console.log("have new connection", socket.id);
        socket.join("general");

    

    // BUSY WORK! whenever the hub gets a pickup or delivery event, send it to everyone
    socket.on(EVENT_NAMES.delivered, (delivered)=>{
        console.log("HUB delivered", delivered);
        io.to("general").emit(EVENT_NAMES.delivered,delivered);
    });

    socket.on(EVENT_NAMES.pickup, (pickup)=>{
        console.log("HUB pickup", pickup);
        io.to("general").emit(EVENT_NAMES.pickup, pickup);
    });

});
    console.log("everything is started")
}
startEventServer();