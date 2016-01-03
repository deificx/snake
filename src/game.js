"use strict";

import {
	IDLE,
	ENDED,
} from './constants';

import AnimationFrame from 'animation-frame';
import canvas from './html.js';
import Snake from './snake';

var animationFrame = new AnimationFrame();
var gridWidth = 30;
var context = canvas.getContext('2d');
var s = new Snake(context, canvas.width, canvas.height, gridWidth);
var time;
var highScore = 0;
var textMarginLeft = 20;
var textHeight = 50;
var textWidth = canvas.width - textMarginLeft * 2;
var render = () => {
	var now = new Date().getTime();
	var dt = now - (time || now);
	time = now;

	context.fillStyle = '#eee';
	context.fillRect(0,0,canvas.width,canvas.height);

	s.update(dt);
	s.render();

	context.fillStyle = "#999";
	context.font = "32px sans-serif";
	switch (s.getState()) {
	case IDLE:
		context.fillText("Press return/enter to start a new game", textMarginLeft, textHeight, textWidth);
		break;
	case ENDED:
		context.fillText("GAME OVER!", textMarginLeft, textHeight, textWidth);
		context.fillText("Press return/enter to start a new game", textMarginLeft, textHeight * 2, textWidth);
		if (s.getScore() > 0 && s.getScore() >= highScore) {
			highScore = s.getScore();
			context.fillText(
				"Congratulations, new high score: " + highScore,
				textMarginLeft,
				textHeight * 3, // eslint-disable-line
				textWidth);
		} else {
			context.fillText(
				"You scored " + s.getScore() + " points. Your high score is " + highScore,
				textMarginLeft,
				textHeight * 3, // eslint-disable-line
				textWidth);
		}
		break;
	default:
		context.fillText(s.getScore(), textMarginLeft, textHeight, textWidth);
		animationFrame.request(render);
		break;
	}
};

animationFrame.request(render);

import controls from './controls';

controls.on('move', (dir) => { s.setDir(dir); });
controls.on('new_game', () => {
	s.newGame();
	animationFrame.request(render);
});
