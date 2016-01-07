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
		this.wait = COOLDOWN;
		this.cooldown = COOLDOWN;
	}

	newGame() {
		this.snake = [];
		this.snake.push({
			x:Math.round(this.grid.w/2),
			y:Math.round(this.grid.h/2),
		});
		this.snake.push(this.snake[0]);
		this.snake.push(this.snake[0]);

		this.position = this.snake[0];
		this.randomDir();

		this.placeApple();

		this.score = 0;
		this.state = STARTED;
		this.wait = COOLDOWN;
		this.cooldown = COOLDOWN;
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

	collision(pos) {
		var i;
		for (i = 0; i < this.snake.length; i++) {
			if (pos.x === this.snake[i].x && pos.y === this.snake[i].y) {
				return true;
			}
		}
		return false;
	}

	randomPos() {
		return {
			x: Math.floor(Math.random()*this.grid.w),
			y: Math.floor(Math.random()*this.grid.h),
		};
	}

	placeApple() {
		var apple = this.randomPos();
		while (this.collision(apple)) {
			apple = this.randomPos();
		}
		this.apple = apple;
	}

	move(move, same) {
		this.position = move;
		if (same) {
			this.snake.pop();
		}
		this.snake.unshift(move);
		this.snake[0].from = this.directionDiff(this.snake[1], this.snake[0]);
		this.snake[1].from = this.directionDiff(this.snake[2], this.snake[1]);
		this.snake[1].to = this.directionDiff(this.snake[0], this.snake[1]);
	}

	update(dt) {
		var move = Object.assign({}, this.position);

		this.wait = this.wait - dt;

		if (this.wait > 0) {
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
			this.score = this.score + SCORE_INCREASE;
			if (this.score < SCORE_CAP) {
				this.cooldown = COOLDOWN - this.score;
			}
			this.placeApple();
			this.move(move, false);
		} else if (this.collision(move)) {
			this.wait = 0;
			this.state = ENDED;
		} else {
			this.move(move, true);
		}
	}

	directionDiff(a, b) {
		if (Math.abs(a.x - b.x) > 1 || Math.abs(a.y - b.y) > 1) {
			if (a.x < b.x) {
				return RIGHT;
			} else if (a.x > b.x) {
				return LEFT;
			} else if (a.y < b.y) {
				return DOWN;
			}
			return UP;
		} else {
			if (a.x < b.x) {
				return LEFT;
			} else if (a.x > b.x) {
				return RIGHT;
			} else if (a.y < b.y) {
				return UP;
			}
			return DOWN;
		}
	}

	render() {
		var i;
		var percentage = (this.cooldown - this.wait) / this.cooldown * 2;
		var entering = this.wait > this.cooldown / 2;
		var offsetX;
		var offsetY;

		if (this.state === IDLE) {
			return;
		}

		this.c.strokeStyle = '#ccc';
		for (i = 1; i < this.grid.w; i++) {
			this.c.moveTo(this.radius * 2 * i, 0);
			this.c.lineTo(this.radius * 2 * i, this.height);
		}
		for (i = 1; i < this.grid.h; i++) {
			this.c.moveTo(0, this.radius * 2 * i);
			this.c.lineTo(this.width, this.radius * 2 * i);
		}
		this.c.stroke();

		this.c.fillStyle = '#f00';
		this.c.beginPath();
		this.c.arc(
			this.apple.x * this.radius * 2 + this.radius,
			this.apple.y * this.radius * 2 + this.radius,
			this.radius,
			0,
			Math.PI * 2);
		this.c.closePath();
		this.c.fill();

		this.c.fillStyle = '#333';

		for (i = 0; i < this.snake.length; i++) {
			offsetX = 0;
			offsetY = 0;
			if (entering) {
				switch (this.snake[i].from) {
				case UP:
					offsetY = this.radius * percentage - this.radius;
					break;
				case DOWN:
					offsetY = this.radius * percentage * -1 + this.radius;
					break;
				case LEFT:
					offsetX = this.radius * percentage - this.radius;
					break;
				case RIGHT:
					offsetX = this.radius * percentage * -1 + this.radius;
					break;
				}
			} else {
				switch (this.snake[i].to || this.direction) {
				case UP:
					offsetY = this.radius * percentage * -1 + this.radius;
					break;
				case DOWN:
					offsetY = this.radius * percentage - this.radius;
					break;
				case LEFT:
					offsetX = this.radius * percentage * -1 + this.radius;
					break;
				case RIGHT:
					offsetX = this.radius * percentage - this.radius;
					break;
				}
			}

			this.c.beginPath();
			this.c.arc(
				this.snake[i].x * this.radius * 2 + offsetX + this.radius,
				this.snake[i].y * this.radius * 2 + offsetY + this.radius,
				this.radius,
				0,
				Math.PI * 2);
			this.c.closePath();
			this.c.fill();
		}
	}
}
