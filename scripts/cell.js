class Cell {
	constructor(x, y, size) {
		this.position = createVector(x, y)
		this.size = size
		this.filled = false
		this.attractor = {}

	}
	display() {
		push()
		noFill()
		stroke(220)
		circle(this.position.x, this.position.y, this.size)
		pop()
		if(this.filled){
			const layer = settings.layers ? this.attractor.layer : settings.background
			layer.push()
			
			
			layer.rectMode(RADIUS);
			layer.noStroke()
			this.attractor.color.setAlpha(255)
			layer.fill(this.attractor.color)
			layer.square(this.position.x, this.position.y, this.size/2)

			layer.pop()
		}
	}

	split(n) {
		const newCells = []
		const newTileSize = this.size/n
		for (let r = 0; r < n; r++) {
			for (let c = 0; c < n; c++) {
				const x = (c * newTileSize) + this.position.x
				const y = (r * newTileSize) + this.position.y
				const cell = new Cell(x - (newTileSize/2), y - (newTileSize/2), newTileSize)
				newCells.push(cell)
			}
			
		}
		return newCells
	}
}