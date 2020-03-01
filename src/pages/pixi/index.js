import * as PIXI from 'pixi.js';
import Lights from '#/common/lights';
import './style.css';

const WIDTH = 5;
const HEIGHT = 5;
const lights = new Lights(WIDTH, HEIGHT);
const config = {
  colors: [
    0x34495e, // off
    0x2ecc71, // on
  ],
};
const app = new PIXI.Application({
  antialias: true,
  resizeTo: window,
});
document.body.append(app.view);

const text = new PIXI.Text('关灯睡觉', {
  fill: 0xffff10,
  align: 'center',
});
text.anchor.set(0.5);
app.stage.addChild(text);

const message = new PIXI.Text(`还剩${lights.remain}盏灯`, {
  fill: 0xffff80,
  align: 'center',
});
message.anchor.set(0.5);
app.stage.addChild(message);

const container = new PIXI.Container();

for (let i = 0; i < WIDTH * HEIGHT; i += 1) {
  const graphics = new PIXI.Graphics();
  graphics.index = i;
  graphics.interactive = true;
  graphics.mouseover = handleMouseOver;
  graphics.mouseout = handleMouseOut;
  graphics.click = handleTap;
  graphics.tap = handleTap;
  container.addChild(graphics);
}

app.stage.addChild(container);

function layout() {
  text.x = window.innerWidth / 2;
  text.y = 40;
  message.x = window.innerWidth / 2;
  message.y = 100;
  config.cellSize = Math.min(100, (window.innerWidth - 32) / 5.05);
  config.cellRadius = config.cellSize / 5;
  config.cellGap = config.cellSize / 20;
  container.children.forEach(paintCell);
  container.x = (window.innerWidth - container.width) / 2;
  container.y = (window.innerHeight - container.height) / 2;
}

function paintCell(cell) {
  cell.x = (config.cellSize + config.cellGap) * (cell.index % 5);
  cell.y = (config.cellSize + config.cellGap) * Math.floor(cell.index / 5);
  const on = lights.cells[cell.index].value;
  cell
  .clear()
  .beginFill(config.colors[+on])
  .drawRoundedRect(0, 0, config.cellSize, config.cellSize, config.cellRadius)
  .endFill();
  cell.filters = on ? [] : [new PIXI.filters.BlurFilter(2)];
}

function handleMouseOver() {
  this.hoverred = true;
  paintCell(this);
}

function handleMouseOut() {
  this.hoverred = false;
  paintCell(this);
}

function handleTap() {
  lights.turn(this.index)
  .forEach(i => {
    paintCell(container.children[i]);
  });
  message.text = `还剩${lights.remain}盏灯`;
}

layout();
window.addEventListener('resize', layout);
