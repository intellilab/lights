const WIDTH = 5;
const HEIGHT = 5;

function rand(min, max) {
  return Math.floor(min + (max - min + 1) * Math.random());
}

export default class Lights {
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

  turn(index) {
    const { width } = this;
    const related = [
      index - width,
      index,
      index + width,
      index % width ? index - 1 : -1,
      (index + 1) % width ? index + 1 : -1,
    ].filter(i => this.cells[i]);
    related.forEach((i) => {
      const cell = this.cells[i];
      cell.value = !cell.value;
      this.remain += cell.value ? 1 : -1;
    });
    return related;
  }
}
