"use strict";

const COLOURS = ["#6b5b95", "#feb236", "#d64161", "#ff7b25"];
const WHITE = ["white"];
const MAX_X = 10;
const MAX_Y = 10;

class Block {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.colour = COLOURS[Math.floor(Math.random() * COLOURS.length)];
    this.clickable = true;
  }
}

class BlockGrid {
  constructor() {
    this.grid = [];

    for (let x = 0; x < MAX_X; x++) {
      const col = [];
      for (let y = 0; y < MAX_Y; y++) {
        col.push(new Block(x, y));
      }

      this.grid.push(col);
    }

    return this;
  }

  redrawBlock(blockEl, block) {
    const { x, y, colour } = block;
    const id = `block_${x}x${y}`;

    blockEl.id = id;
    blockEl.className = "block";
    blockEl.style.background = block.colour;
  }

  clearBlock(block) {
    block.colour = WHITE;
  }

  removeBlock(block) {
    block.colour = WHITE;
    block.clickable = false;
  }

  getNeighbours(block) {
    let neighbours = [];
    const { x, y } = block;

    x - 1 >= 0 ? neighbours.push(this.grid[x - 1][y]) : {};
    x + 1 < MAX_X ? neighbours.push(this.grid[x + 1][y]) : {};
    y - 1 >= 0 ? neighbours.push(this.grid[x][y - 1]) : {};
    y + 1 < MAX_Y ? neighbours.push(this.grid[x][y + 1]) : {};

    return neighbours.filter((neighbour) => neighbour.clickable === true);
  }

  getSameColourNeighbours(block) {
    if (
      this.getNeighbours(block).filter(
        (neighbour) => neighbour.colour === block.colour
      ).length === 0
    ) {
      return [];
    }

    let sameColourNeighbours = [];
    let parent = this;
    let ogColour = block.colour;

    function recurse(block) {
      parent.clearBlock(block);
      sameColourNeighbours.push(block);
      let neighbours = parent.getNeighbours(block);
      neighbours.forEach((neighbour) => {
        if (neighbour.colour === ogColour) {
          recurse(neighbour);
        }
      });
    }

    recurse(block);
    return sameColourNeighbours;
  }

  reorderColumn(block) {
    let colours = [];
    for (let y = 0; y < MAX_Y; y++) {
      if (this.grid[block.x][y].colour !== WHITE) {
        colours.push(this.grid[block.x][y].colour);
      }
    }
    for (let y = 0; y < MAX_Y; y++) {
      if (y < colours.length) {
        this.grid[block.x][y].colour = colours[y];
      } else {
        this.removeBlock(this.grid[block.x][y]);
      }
    }
  }

  render(grid = document.querySelector("#gridEl")) {
    let el = grid.cloneNode(false);
    grid.parentNode.replaceChild(el, grid);
    for (let x = 0; x < MAX_X; x++) {
      const id = "col_" + x;
      const colEl = document.createElement("div");
      colEl.className = "col";
      colEl.id = id;
      el.appendChild(colEl);

      for (let y = MAX_Y - 1; y >= 0; y--) {
        const block = this.grid[x][y];
        const blockEl = document.createElement("div");

        if (block.clickable) {
          blockEl.addEventListener("click", (evt) =>
            this.blockClicked(evt, block)
          );
        }

        colEl.appendChild(blockEl);
        this.redrawBlock(blockEl, block);
      }
    }

    return this;
  }

  blockClicked(e, block) {
    let sameColourNeighbours = this.getSameColourNeighbours(block);
    sameColourNeighbours.forEach((sameColourNeighbour) => {
      this.reorderColumn(sameColourNeighbour);
    });
    this.render();
  }
}

window.addEventListener("DOMContentLoaded", () => new BlockGrid().render());
