"use strict";

import { IDLE, ENDED, EMIT_MOVE, EMIT_NEW_GAME } from "./constants";

import canvas from "./html.js";
import Snake from "./snake";
import textRenderer from "./textRenderer";

const gridWidth = 30;
const s = new Snake(canvas, gridWidth);

const renderText = textRenderer(canvas);

let highScore = 0;
let time;

const render = () => {
  const now = new Date().getTime();
  const dt = now - (time || now);
  time = now;

  s.update(dt);
  s.render();

  switch (s.getState()) {
    case IDLE:
      renderText({
        text: "Press return/enter to start a new game",
      });
      break;

    case ENDED:
      renderText({ text: "GAME OVER!" });
      renderText({ text: "Press return/enter to start a new game", line: 2 });
      if (s.getScore() > 0 && s.getScore() >= highScore) {
        renderText({
          text: `Congratulations, new high score: ${s.getScore()}`,
          line: 3,
        });
      } else {
        renderText({
          text: `You scored ${s.getScore()} points. Your high score is ${highScore}`,
          line: 3,
        });
      }
      break;

    default:
      renderText({
        text: s.getScore(),
      });
      requestAnimationFrame(render);
      break;
  }
};

requestAnimationFrame(render);

import controls from "./controls";

controls.on(EMIT_MOVE, ({ direction }) => {
  s.setDir(direction);
});
controls.on(EMIT_NEW_GAME, () => {
  s.newGame();
  requestAnimationFrame(render);
});
