
const { Server } = require("socket.io");
const { EVENT_NAMES } = require("./utils");
const io = new Server(3333)

const Queue = require('./queue');
const driverqueue = new Queue();
const vendorQueue = new Queue();



// startDriver();
// startVendor();

// needs a queue of things that need to be picked up
// vendor: pickup request to hub, hub puts it in queue
// Driver: Ready to pickup
// HUBL: here is dequeued pickup
// Driver: Delivered!2

function startEventServer(){
    io.on("connection",(socket)=>{

        socket.on("enqueue driver", ()=>{
            console.log("enqueue driver after delivery")
            driverqueue.enqueue(socket)
        });
        socket.on("new Driver", ()=>{
            console.log("new driver connection", socket.id);
            driverqueue.enqueue(socket)
        })

    // BUSY WORK! whenever the hub gets a pickup or delivery event, send it to everyone
    socket.on(EVENT_NAMES.delivered, (delivered)=>{
        console.log("HUB delivered", delivered);
        io.to("general").emit(EVENT_NAMES.delivered,delivered);
    });

    socket.on(EVENT_NAMES.pickup, (pickup)=>{
        vendorQueue.enqueue(pickup);

        if(driverqueue.front!== null){

            console.log("HUB pickup", pickup);
            io.emit(EVENT_NAMES.pickup, pickup);
        }
    });

});
    console.log("everything is started")
}
startEventServer();