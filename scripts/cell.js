class Cell {
	constructor(x, y, size) {
		this.position = createVector(x, y)
		this.size = size
		this.filled = false
		this.mover = new Mover(this.position.x, this.position.y, settings.mover.mass, settings.mover.radius)
		this.attractor = {}

	}
	display() {
		push()
		noFill()
		stroke(220)
		circle(this.position.x, this.position.y, this.size)
		pop()
		if(this.filled){
			const layer = settings.layers ? this.attractor.layer : settings.flattenLayer
			
			if(settings.layers == true){
				this.attractor.layer.push()
				this.attractor.layer.rectMode(RADIUS);
				this.attractor.layer.noStroke()
				this.attractor.color.setAlpha(255)
				this.attractor.layer.fill(this.attractor.color)
				this.attractor.layer.square(this.position.x, this.position.y, this.size/2)
				
				// this.attractor.color.setAlpha(255/4)
				// this.attractor.layer.fill(this.attractor.color)
				// this.attractor.layer.square(this.position.x, this.position.y, this.size/2 + this.size/6)
				// this.attractor.color.setAlpha(255/2)
				// this.attractor.layer.fill(this.attractor.color)
				// this.attractor.layer.square(this.position.x, this.position.y, this.size/2 + this.size/8)

				this.attractor.layer.pop()
			}
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
				cell.difficulty = this.difficulty
				newCells.push(cell)
			}
			
		}
		return newCells
	}
}