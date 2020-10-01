"use strict";

import { UP, RIGHT, DOWN, LEFT } from "./constants";

import EventEmitter from "eventemitter3";
const events = new EventEmitter();

import Mousetrap from "mousetrap";

Mousetrap.bind("up", () => {
  events.emit("move", UP);
});
Mousetrap.bind("right", () => {
  events.emit("move", RIGHT);
});
Mousetrap.bind("down", () => {
  events.emit("move", DOWN);
});
Mousetrap.bind("left", () => {
  events.emit("move", LEFT);
});
Mousetrap.bind("enter", () => {
  events.emit("new_game");
});
Mousetrap.bind("space", () => events.emit("new_game"));

export default events;
