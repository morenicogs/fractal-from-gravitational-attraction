let grid
function setup() {
  createCanvas(windowWidth, windowHeight);
  grid = new Grid(50)

}

function draw() {
  	background(20);

// createGrid(50)

	grid.displayCells()
}