class Grid {
	constructor(tileSize){
		this.tileSize = tileSize
		this.cells = []
		this.createGrid(tileSize)
		this.filledCellsCount = 0
		this.newActiveCell()

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

	fillActiveCell(attractor) {
		this.activeCell.attractor = attractor
		this.activeCell.filled = true
		this.activeCell.difficulty = Math.round(2*this.mover.count/100)
		this.activeCell.display()
		this.activeCell = {}
		this.filledCellsCount++
	}

	newActiveCell(){
		if(this.filledCellsCount < this.cells.length) {
			this.activeCell = this.cells[this.filledCellsCount]
			const moverR = Math.min(Math.max(this.tileSize*0.25, 5), 50)
			this.mover = new Mover(this.activeCell.position.x, this.activeCell.position.y, 75, 10)
		} else {
			saveGridResults(this.tileSize)
			// this.tileSize = this.tileSize/2
			// this.filledCellsCount = 0
			// settings.speed += 2
			// this.newActiveCell()
			this.splitCells(2)
		}
		
	}

	splitCells(n) {
		const oldCells = [...this.cells]
		// oldCells.sort((a,b) => a.difficulty - b.difficulty)
		this.tileSize = this.tileSize/n
		this.cells = []
		oldCells.forEach(c => {
			const newCell = c.split(n)
			this.cells.push(...newCell)
		})

		this.filledCellsCount = 0
		this.newActiveCell()

	}
}