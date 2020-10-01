"use strict";

import { UP, RIGHT, DOWN, LEFT, EMIT_MOVE, EMIT_NEW_GAME } from "./constants";

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
  events.emit(EMIT_MOVE, { direction: UP });
});
Mousetrap.bind("right", () => {
  events.emit(EMIT_MOVE, { direction: RIGHT });
});
Mousetrap.bind("down", () => {
  events.emit(EMIT_MOVE, { direction: DOWN });
});
Mousetrap.bind("left", () => {
  events.emit(EMIT_MOVE, { direction: LEFT });
});
Mousetrap.bind("enter", () => {
  events.emit(EMIT_NEW_GAME);
});
Mousetrap.bind("space", () => events.emit(EMIT_NEW_GAME));

export default events;
