"use strict";

import {
	UP,
	RIGHT,
	DOWN,
	LEFT,
} from './constants';

import EventEmitter from 'eventemitter3';

var events = new EventEmitter();

import keypress from '../lib/keypress';

const listener = new keypress.Listener();

listener.simple_combo('up', () => {
	events.emit('move', UP);
});

listener.simple_combo('right', () => {
	events.emit('move', RIGHT);
});

listener.simple_combo('down', () => {
	events.emit('move', DOWN);
});

listener.simple_combo('left', () => {
	events.emit('move', LEFT);
});

listener.simple_combo('enter', () => {
	events.emit('new_game');
});

module.exports = events;
