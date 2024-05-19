class Grid {
	constructor(tileSize){
		this.tileSize = tileSize
		this.cells = []
		this.createGrid(tileSize)
		this.filledCellsCount = 0
		this.countMax = 0
		this.countMin = Infinity

		this.activeCells = []
		this.activeMovers = []

		this.amountActive = settings.amount
		for (let i = 0; i < this.amountActive; i++) {
			this.newActiveCell()
			// this.amountActive++
		}
		// this.newActiveCell()
		// this.newActiveCell()
		// this.newActiveCell()
		// this.newActiveCell()
		// this.newActiveCell()
		// this.newActiveCell()
		// this.newActiveCell()
		// this.newActiveCell()
		// this.newActiveCell()
		// this.newActiveCell()
		// this.newActiveCell()


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

		this.cols = cols
		this.rows = rows
	}

	displayCells(){
		this.cells.forEach( c => c.display())
	}

	fillActiveCell(attractor, cell) {
		cell.attractor = attractor
		cell.filled = true
		cell.difficulty = cell.mover.count

		cell.display()
		
		// this.activeCell = {}
		this.filledCellsCount++
		
		// TODO Refactor to array
		removeItemFromArray(cell, this.activeCells)
	}

	newActiveCell(){
		if(this.filledCellsCount + this.activeCells.length < this.cells.length) {
			// this.activeCell = this.cells[this.filledCellsCount]
			// this.mover = new Mover(this.activeCell.position.x, this.activeCell.position.y, 50, 10)

			// TODO Refractor to array
			const newActiveCell = this.cells[this.filledCellsCount+this.activeCells.length]
			// const newActiveMover = new Mover(newActiveCell.position.x, newActiveCell.position.y, 15, 10)
			this.activeCells.push(newActiveCell)
			// this.activeMovers.push(newActiveMover)
			

		} else {
			if(this.activeCells.length == 0) {
				saveGridResults(this.tileSize)
				this.splitCells(2)
			}
			
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
		// this.amountActive = this.cells.length < 150 ? this.cells.length : 150

		for (let i = 0; i < this.amountActive; i++) {
			this.newActiveCell()
			
		}

	}
}