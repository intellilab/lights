const WIDTH = 5;
const HEIGHT = 5;

class Lights {
  constructor() {
    this.initialize();
  }
  initialize() {
    this.cells = [];
    let on = this.lightsOn = this.rand(5, WIDTH * HEIGHT * .6);
    for (let left = WIDTH * HEIGHT; left --;) {
      const value = Math.random() < on / (left + 1);
      value && on --;
      this.cells.unshift({
        index: left,
        value,
      });
    }
  }
  rand(min, max) {
    return ~~((max - min + 1) * Math.random() + min);
  }
  cell(row, col) {
    return this.cells[row * WIDTH + col];
  }
  get width() {
    return WIDTH;
  }
  get height() {
    return HEIGHT;
  }
  turn(row, col) {
    const index = col == null ? row : row * WIDTH + col;
    const related = [index - WIDTH, index, index + WIDTH];
    if (index % WIDTH) related.push(index - 1);
    if ((index + 1) % WIDTH) related.push(index + 1);
    related.forEach((i) => {
      const cell = this.cells[i];
      if (cell) {
        if (cell.value = !cell.value) {
          this.lightsOn ++;
        } else {
          this.lightsOn --;
        }
      }
    });
  }
}

export default Lights;
