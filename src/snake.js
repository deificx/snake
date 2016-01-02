"use strict";

import {
	UP,
	RIGHT,
	DOWN,
	LEFT,
	IDLE,
	STARTED,
	ENDED,
	SCORE_INCREASE,
} from './constants';

function Snake(ctx, width, height, gridWidth) {
	this.c = ctx;
	this.width = width;
	this.height = height;

	this.grid = {
		w:gridWidth,
		h:Math.round(gridWidth / width * height),
	};
	this.state = IDLE;
	this.radius = Math.round(width / gridWidth) / 2;

	this.apple = {
		x:null,
		y:null,
	};
	this.position = {
		x:null,
		y:null,
	};
	this.direction = null;
	this.score = 0;

	this.snake = [];
	this.wait = 300;
	this.cooldown = 300;
}

Snake.prototype.newGame = function() {
	var apple = this.randomPos();

	this.snake = [];
	this.snake.push({
		x:this.grid.w/2,
		y:this.grid.h/2,
	});
	this.snake.push({
		x:this.snake[0].x+1,
		y:this.snake[0].y,
	});
	this.snake.push({
		x:this.snake[0].x+2,
		y:this.snake[0].y,
	});

	this.position = this.snake[0];
	this.randomDir();

	while (this.collision(apple)) {
		apple = this.randomPos();
	}
	this.apple = apple;

	this.score = 0;
	this.state = STARTED;
};

Snake.prototype.setDir = function(dir) {
	this.direction = dir;
};

Snake.prototype.getState = function() {
	return this.state;
};

Snake.prototype.getScore = function() {
	return this.score;
};

Snake.prototype.randomDir = function() {
	var cases = 3;
	switch (Math.floor(Math.random() * cases)) {
	case 0:
		this.direction = UP;
		return UP;
	case 1:
		this.direction = LEFT;
		return LEFT;
	case 2:
		this.direction = DOWN;
		return DOWN;
	default:
		this.direction = null;
		return null;
	}
};

Snake.prototype.randomPos = function() {
	return {
		x: Math.round(Math.random()*this.grid.w),
		y: Math.round(Math.random()*this.grid.h),
	};
};

Snake.prototype.collision = function(pos) {
	var i;
	for (i = 0; i < this.snake.length; i++) {
		if (pos.x === this.snake[i].x && pos.y === this.snake[i].y) {
			return true;
		}
	}
	return false;
};

Snake.prototype.update = function(dt) {
	var move = Object.assign({}, this.position);
	var apple;

	this.wait = this.wait - dt;

	if (this.wait > 0 || this.state !== STARTED) {
		return;
	}

	this.wait = this.cooldown;

	switch (this.direction) {
	case UP:
		move.y = move.y - 1;
		break;
	case RIGHT:
		move.x = move.x + 1;
		break;
	case DOWN:
		move.y = move.y + 1;
		break;
	case LEFT:
		move.x = move.x - 1;
		break;
	default:
		break;
	}

	if (move.x === this.apple.x && move.y === this.apple.y) {
		apple = this.randomPos();
		while (this.collision(apple)) {
			apple = this.randomPos();
		}
		this.apple = apple;
		this.snake.unshift(move);
		this.position = move;
		this.score = this.score + SCORE_INCREASE;
		if (this.score < 200) {
			this.cooldown = 300 - this.score;
		}
	} else if (this.collision(move)) {
		this.state = ENDED;
	} else {
		this.snake.pop();
		this.snake.unshift(move);
		this.position = move;
	}
};

Snake.prototype.render = function() {
	var i;
	var d;
	var offsetX;
	var offsetY;

	if (this.state === IDLE) {
		return;
	}

	this.c.fillStyle = '#333';

	for (i = 0; i < this.snake.length; i++) {
		offsetX = 0;
		offsetY = 0;
		if (this.state === IDLE) {
			if (i === 0) {
				d = this.direction;
			} else if (this.snake[i-1].y < this.snake[i].y) {
				d = UP;
			} else if (this.snake[i-1].x > this.snake[i].x) {
				d = RIGHT;
			} else if (this.snake[i-1].y > this.snake[i].y) {
				d = DOWN;
			} else {
				d = LEFT;
			}
			switch (d) {
			case UP:
				offsetY = 1 / this.grid.h * this.height * this.wait / this.cooldown;
				break;
			case RIGHT:
				offsetX = 1 / this.grid.w * this.width * this.wait / this.cooldown * -1;
				break;
			case DOWN:
				offsetY = 1 / this.grid.h * this.height * this.wait / this.cooldown * -1;
				break;
			default:
				offsetX = 1 / this.grid.w * this.width * this.wait / this.cooldown;
			}
		}
		this.c.beginPath();
		this.c.arc(
			this.snake[i].x / this.grid.w * this.width + offsetX,
			this.snake[i].y / this.grid.h * this.height + offsetY,
			this.radius,
			0,
			Math.PI * 2);
		this.c.closePath();
		this.c.fill();
	}

	this.c.fillStyle = '#f00';
	this.c.beginPath();
	this.c.arc(
		this.apple.x / this.grid.w * this.width,
		this.apple.y / this.grid.h * this.height,
		this.radius,
		0,
		Math.PI * 2);
	this.c.closePath();
	this.c.fill();
};

module.exports = Snake;
