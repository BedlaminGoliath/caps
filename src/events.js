const  chance = require("chance")();

const { EventEmitter } = require("events")

const events = new EventEmitter();

module.exports={ events, chance}