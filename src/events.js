const { EventEmitter } = require("events")
const  chance = require("chance")();

const events = new EventEmitter();

const EVENT_NAMES = {
    pick: 'pickup',
    delivered: 'delivered',
};

module.exports={ events, chance, EVENT_NAMES };