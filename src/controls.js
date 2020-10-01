"use strict";

import { UP, RIGHT, DOWN, LEFT } from "./constants";

class EventEmitter {
  constructor() {
    this.element = window.document.createElement("a");
  }

  emit(name, detail = {}) {
    this.element.dispatchEvent(new window.CustomEvent(name, { detail }));
  }

  on(name, handler) {
    this.element.addEventListener(name, (event) => {
      handler(event.detail);
    });
  }
}

const events = new EventEmitter();

import Mousetrap from "mousetrap";

Mousetrap.bind("up", () => {
  events.emit("move", { direction: UP });
});
Mousetrap.bind("right", () => {
  events.emit("move", { direction: RIGHT });
});
Mousetrap.bind("down", () => {
  events.emit("move", { direction: DOWN });
});
Mousetrap.bind("left", () => {
  events.emit("move", { direction: LEFT });
});
Mousetrap.bind("enter", () => {
  events.emit("new_game");
});
Mousetrap.bind("space", () => events.emit("new_game"));

export default events;
