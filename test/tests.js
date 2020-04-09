const { expect } = chai;

describe("BlockGrid", function () {
  "use strict";
  const blockGrid = new BlockGrid();

  let block =
    blockGrid.grid[Math.floor(Math.random() * MAX_X)][
      Math.floor(Math.random() * MAX_Y)
    ];

  describe("clearBlock", () => {
    it("should turn the block white", () => {
      expect(block.colour.toString()).not.to.equal("white");
      blockGrid.clearBlock(block);
      expect(block.colour.toString()).to.equal("white");
    });

    it("should be idempotent", () => {
      let numberOfCalls = Math.floor(Math.random() * 5);
      for (let i = 0; i < numberOfCalls; i++) {
        blockGrid.clearBlock(block);
      }
      expect(block.colour.toString()).to.equal("white");
    });
  });

  describe("removeBlock", () => {
    it("makes the block not clickable", () => {
      expect(block.clickable).to.be.true;
      blockGrid.removeBlock(block);
      expect(block.clickable).to.be.false;
    });
    it("is idempotent", () => {
      let numberOfCalls = Math.floor(Math.random() * 5);
      for (let i = 0; i < numberOfCalls; i++) {
        blockGrid.removeBlock(block);
      }
      expect(block.clickable).to.be.false;
    });
  });

  describe("getNeighbours", () => {
    it("returns the neighbours to either side and above", () => {
      const centralBlock = blockGrid.grid[5][5];
      const neighbours = [
        blockGrid.grid[5][6],
        blockGrid.grid[5][4],
        blockGrid.grid[4][5],
        blockGrid.grid[6][5],
      ];
      expect(blockGrid.getNeighbours(centralBlock)).to.have.members(neighbours);
    });

    it("returns correct results for corner blocks", () => {
      const cornerBlock = blockGrid.grid[0][0];
      const neighbours = [blockGrid.grid[1][0], blockGrid.grid[0][1]];
      expect(blockGrid.getNeighbours(cornerBlock)).to.have.members(neighbours);
    });
    it("returns correct results for blocks on the edges", () => {
      const edgeBlock = blockGrid.grid[5][0];
      const neighbours = [
        blockGrid.grid[6][0],
        blockGrid.grid[4][0],
        blockGrid.grid[5][1],
      ];
      expect(blockGrid.getNeighbours(edgeBlock)).to.have.members(neighbours);
    });
  });
});
