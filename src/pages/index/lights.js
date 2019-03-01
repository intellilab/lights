const WIDTH = 5;
const HEIGHT = 5;

function rand(min, max) {
  return Math.floor(min + (max - min + 1) * Math.random());
}

class Lights {
  constructor(width = WIDTH, height = HEIGHT) {
    this.width = width;
    this.height = height;
    this.reset();
  }

  reset() {
    const { width, height } = this;
    let on = rand(5, width * height * 0.6);
    this.remain = on;
    const total = width * height;
    this.cells = Array.from({ length: total }, (_, index) => {
      const value = Math.random() < on / (total - index);
      if (value) on -= 1;
      return {
        index,
        value,
      };
    });
  }

  matrix() {
    const { width, height } = this;
    return Array.from(
      { length: height },
      (_1, i) => Array.from({ length: width }, (_2, j) => this.cells[i * width + j]),
    );
  }

  turn(row, col) {
    const index = col == null ? row : row * WIDTH + col;
    const related = [index - WIDTH, index, index + WIDTH];
    if (index % WIDTH) related.push(index - 1);
    if ((index + 1) % WIDTH) related.push(index + 1);
    related.forEach((i) => {
      const cell = this.cells[i];
      if (cell) {
        cell.value = !cell.value;
        this.remain += cell.value ? 1 : -1;
      }
    });
  }
}

export default Lights;
