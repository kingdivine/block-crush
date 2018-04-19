'use strict';

const COLOURS = ['red', 'green', 'blue', 'yellow'];
const MAX_X = 10;
const MAX_Y = 10;

class Block {
  constructor (x, y) {
    this.x = x;
    this.y = y;
    this.colour = COLOURS[Math.floor(Math.random() * COLOURS.length)];
    this.clickable = true;
  }
}

class BlockGrid {
  constructor () {
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
    const {x, y, colour} = block;
    const id = `block_${x}x${y}`;

    blockEl.id = id;
    blockEl.className = 'block';
    blockEl.style.background = block.colour;
  }
  getNeighbours(block){
    /*
    how do you get all neighbours of a given block given its coordinates
    */
  }

  getSameColourNeighbours(block){
    /*
    how do you get only same color blocks?
    */

  }

  render(grid=document.querySelector('#gridEl')) {
    let el = grid.cloneNode(false);
    grid.parentNode.replaceChild(el, grid);
    for (let x = 0; x < MAX_X; x++) {
      const id = 'col_' + x;
      const colEl = document.createElement('div');
      colEl.className = 'col';
      colEl.id = id;
      el.appendChild(colEl);

      for (let y = MAX_Y - 1; y >= 0; y--) {
        const block = this.grid[x][y];
        const blockEl = document.createElement('div'); 

        if(block.clickable) {
          blockEl.addEventListener('click', (evt) => this.blockClicked(evt, block));    
        }              

        colEl.appendChild(blockEl);
        this.redrawBlock(blockEl, block);
      }
    }

    return this;
  }

  blockClicked (e, block) {
    /*
    what happens on each block click before you re-render?
    what happens to each column of blocks?
    */
    this.render();
  }
}

window.addEventListener('DOMContentLoaded', () => new BlockGrid().render());
