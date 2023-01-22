
const { Server } = require("socket.io");
const { EVENT_NAMES } = require("./utils");
const io = new Server(3333)

// startDriver();
// startVendor();

// needs a queue of things that need to be picked up
// vendor: pickup request to hub, hub puts it in queue
// Driver: Ready to pickup
// HUBL: here is dequeued pickup
// Driver: Delivered!2

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