class Attractor {
	constructor(x, y, m, r, c) {
		this.position = createVector(x, y)
		this.mass = m
		this.radius = r
		this.color = color(c)
		this.layer = createGraphics(width, height)
		this.G = 9.81
	}

	display() {
		push()
		const strokeColor = color("white")
		strokeColor.setAlpha(128)
		stroke(strokeColor)
		strokeWeight(this.radius * 0.1)

		this.color.setAlpha(255)
		fill(this.color)
		circle(this.position.x, this.position.y, this.radius)
		pop()
	}

	attract(mover) {
		const force = createVector(this.position.x - mover.position.x, this.position.y - mover.position.y)
		const distance = Math.hypot(this.position.x - mover.position.x, this.position.y - mover.position.y)
		const threshold = (this.radius)

		if(distance >= threshold) {
			const min = this.radius + mover.radius
			const max = height
			const adjustedDistance = Math.min(Math.max(distance, min), max)
			const strength = this.G * (this.mass * mover.mass) / (Math.pow(adjustedDistance,2))
			force.setMag(strength)
			mover.applyForce(force)
			return true
		} else {
			return false
		}
	}
}