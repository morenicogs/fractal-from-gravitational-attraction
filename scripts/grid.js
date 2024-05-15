class Grid {
	constructor(tileSize){
		this.tileSize = tileSize
		this.cells = []
		this.createGrid(tileSize)

	}

	createGrid(tileSize){
		const gridSizeRatio =  height/width
		const cols = Math.ceil(width / tileSize)
		const rows = Math.ceil(cols *  gridSizeRatio)
	
		const offset = createVector(((cols * tileSize) - width)/2, ((rows * tileSize) - height)/2)
	
		for (let r = 0; r < rows; r++) {
			for (let c = 0; c < cols; c++) {
				const x = (c * tileSize) - offset.x
				const y = (r * tileSize) - offset.y
				const cell = new Cell(x + (tileSize/2), y + (tileSize/2), tileSize)
				this.cells.push(cell)
			}
			
		}
	}

	displayCells(){
		this.cells.forEach( c => c.display())
	}
}