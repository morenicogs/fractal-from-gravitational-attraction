class Cell {
	constructor(x, y, size) {
		this.position = createVector(x, y)
		this.size = size
		this.filled = false

	}
	display() {
		push()
		noFill()
		stroke(220)
		circle(this.position.x, this.position.y, this.size)
		pop()
	}
}