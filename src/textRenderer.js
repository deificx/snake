export default function textRenderer(canvas) {
  const context = canvas.getContext("2d");
  const textMarginLeft = 20;
  const textHeight = 50;
  const textWidth = canvas.width - textMarginLeft * 2;

  return function ({ line = 1, text }) {
    context.fillStyle = "#999";
    context.font = "32px sans-serif";
    context.fillText(text, textMarginLeft, textHeight * line, textWidth);
  };
}
