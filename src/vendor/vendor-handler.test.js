jest.mock("socket.io-client");
const io = require("socket.io-client");
io.mockImplementation(()=>{
    return {
        on: jest.fn(),
        emit: jest.fn(),
    }
});

const { EVENT_NAMES } = require('../utils');
const { toTest: { events, acknowledgeDelivery, sendPickup } } = require("../vendor/handler");

describe("test vender handler", ()=> {
    beforeAll(()=>{
        jest.useFakeTimers();
    });

    afterAll(()=>{
        jest.clearAllTimers();
    });

    test("vender sends pickup event", ()=>{
        sendPickup();

        expect(events.emit).toHaveBeenCalledWith(EVENT_NAMES.pickup, expect.objectContaining({
            store: expect.stringContaining(""),
            orderId: expect.stringMatching(/[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}[0-9A-F]{4}-[0-9A-F]{12}/i)
        }));
    });

    test("test vendor knowledge of delivery", ()=> {
        const orderId = "1234";
        const logMock = jest.spyOn(console.log, "log");

        acknowledgeDelivery(orderId);

        expect(logMock).toHaveBeenCalledWith("Venor thanks you for the delivery", orderId);
    });

})