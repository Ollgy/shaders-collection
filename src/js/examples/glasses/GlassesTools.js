export class Glasses {
  grid = {
    step: 0,
    width: 0,
    height: 0
  }
  center;
  radius;
  constructor(texture) {
    this.center = { x: 0.5, y: 0.5 };
    this.radius = 0.2;
    texture && this.updateGrid(texture);
    document.addEventListener("keydown", ev => {
      switch (ev.key) {
        case "ArrowLeft":
          this.updateCenter({ x: Math.max(0, this.center.x - this.grid.step), y: this.center.y });
          break;
        case "ArrowRight":
          this.updateCenter({ x: Math.min(1, this.center.x + this.grid.step), y: this.center.y });
          break;
        case "ArrowUp":
          this.updateCenter({ x: this.center.x, y: Math.min(1, this.center.y + this.grid.step) });
          break;
        case "ArrowDown":
          this.updateCenter({ x: this.center.x, y: Math.max(0, this.center.y - this.grid.step) });
          break;
      }
    })
  }

  updateGrid(texture) {
    this.grid = {
      step: 1 / texture.source.data.naturalWidth * 3,
      width: texture.source.data.naturalHeight,
      height: texture.source.data.naturalHeight
    }
  }

  updateCenter(center) {
    this.center = center;
  }

  updateRadius(radius) {
    this.radius = radius;
  }
}
