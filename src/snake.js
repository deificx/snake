"use strict";

import {
	UP,
	RIGHT,
	DOWN,
	LEFT,
	IDLE,
	STARTED,
	ENDED,
	SCORE_CAP,
	SCORE_INCREASE,
	COOLDOWN,
} from './constants';

export default class Snake {
	constructor(ctx, width, height, gridWidth) {
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
			x: null,
			y: null,
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

	newGame() {
		var apple = this.randomPos();

		this.snake = [];
		this.snake.push({
			x:Math.round(this.grid.w/2),
			y:Math.round(this.grid.h/2),
		});
		this.snake.push({
			x:this.snake[0].x + 1,
			y:this.snake[0].y,
		});
		this.snake.push({
			x:this.snake[0].x + 2,
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
	}

	setDir(dir) {
		this.direction = dir;
	}

	getState() {
		return this.state;
	}

	getScore() {
		return this.score;
	}

	randomDir() {
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
	}

	randomPos() {
		return {
			x: Math.floor(Math.random()*this.grid.w),
			y: Math.floor(Math.random()*this.grid.h),
		};
	}

	collision(pos) {
		var i;
		for (i = 0; i < this.snake.length; i++) {
			if (pos.x === this.snake[i].x && pos.y === this.snake[i].y) {
				return true;
			}
		}
		return false;
	}

	update(dt) {
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
			if (move.y < 0) {
				move.y = this.grid.h - 1;
			}
			break;
		case RIGHT:
			move.x = move.x + 1;
			if (move.x >= this.grid.w) {
				move.x = 0;
			}
			break;
		case DOWN:
			move.y = move.y + 1;
			if (move.y >= this.grid.h) {
				move.y = 0;
			}
			break;
		case LEFT:
			move.x = move.x - 1;
			if (move.x < 0) {
				move.x = this.grid.w - 1;
			}
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
			if (this.score < SCORE_CAP) {
				this.cooldown = COOLDOWN - this.score;
			}
		} else if (this.collision(move)) {
			this.state = ENDED;
		} else {
			this.snake.pop();
			this.snake.unshift(move);
			this.position = move;
		}
	}

	render() {
		var i;

		if (this.state === IDLE) {
			return;
		}

		this.c.fillStyle = '#333';

		// vertical offset === 1 / this.grid.h * this.height * this.wait / this.cooldown;
		for (i = 0; i < this.snake.length; i++) {
			this.c.beginPath();
			this.c.arc(
				this.radius + this.snake[i].x / this.grid.w * this.width,
				this.radius + this.snake[i].y / this.grid.h * this.height,
				this.radius,
				0,
				Math.PI * 2);
			this.c.closePath();
			this.c.fill();
		}

		this.c.fillStyle = '#f00';
		this.c.beginPath();
		this.c.arc(
			this.radius + this.apple.x / this.grid.w * this.width,
			this.radius + this.apple.y / this.grid.h * this.height,
			this.radius,
			0,
			Math.PI * 2);
		this.c.closePath();
		this.c.fill();
	}
}
