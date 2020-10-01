"use strict";

import { IDLE, ENDED } from "./constants";

import canvas from "./html.js";
import Snake from "./snake";

const gridWidth = 30;
const context = canvas.getContext("2d");
const s = new Snake(context, canvas.width, canvas.height, gridWidth);
const textMarginLeft = 20;
const textHeight = 50;
const textWidth = canvas.width - textMarginLeft * 2;

let highScore = 0;
let time;

const render = () => {
  const now = new Date().getTime();
  const dt = now - (time || now);
  time = now;

  context.fillStyle = "#eee";
  context.fillRect(0, 0, canvas.width, canvas.height);

  s.update(dt);
  s.render();

  context.fillStyle = "#999";
  context.font = "32px sans-serif";
  switch (s.getState()) {
    case IDLE:
      context.fillText(
        "Press return/enter to start a new game",
        textMarginLeft,
        textHeight,
        textWidth
      );
      break;

    case ENDED:
      context.fillText("GAME OVER!", textMarginLeft, textHeight, textWidth);
      context.fillText(
        "Press return/enter to start a new game",
        textMarginLeft,
        textHeight * 2,
        textWidth
      );
      if (s.getScore() > 0 && s.getScore() >= highScore) {
        highScore = s.getScore();
        context.fillText(
          "Congratulations, new high score: " + highScore,
          textMarginLeft,
          textHeight * 3, // eslint-disable-line
          textWidth
        );
      } else {
        context.fillText(
          "You scored " +
            s.getScore() +
            " points. Your high score is " +
            highScore,
          textMarginLeft,
          textHeight * 3, // eslint-disable-line
          textWidth
        );
      }
      break;

    default:
      context.fillText(s.getScore(), textMarginLeft, textHeight, textWidth);
      requestAnimationFrame(render);
      break;
  }
};

requestAnimationFrame(render);

import controls from "./controls";

controls.on("move", (dir) => {
  s.setDir(dir);
});
controls.on("new_game", () => {
  s.newGame();
  requestAnimationFrame(render);
});
