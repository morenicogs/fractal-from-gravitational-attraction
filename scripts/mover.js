class Mover {
	constructor(x, y, m, r) {
		this.position = createVector(x, y)
		this.mass = m
		this.radius = r
		this.count = 0
		this.vel = createVector(0,0)
		this.acc = createVector(0,0)

		this.layer = createGraphics(width, height)

	}

	display() {
		this.layer.push()
		const c = color(20)
		c.setAlpha(128/3)
		this.layer.fill(c)
		c.setAlpha(255/2)
		this.layer.stroke(c)
		this.layer.strokeWeight(this.radius * 0.2)
		this.layer.circle(this.position.x, this.position.y, this.radius)
		this.layer.pop()

		image(this.layer, 0, 0)

	}

	update(){
		this.vel.add(this.acc);
   		this.position.add(this.vel);
    	this.acc.set(0, 0);
		if(this.count == 1250){
			const noise = p5.Vector.random2D()
			noise.mult(5)
			this.acc.add(noise);
			// this.count = 0
			// noLoop()
		}
		this.count++
		
	}

	applyForce(force) {
		const accForce = p5.Vector.div(force, this.mass)
		this.acc.add(accForce)
	}

	closestAttractor(attractors) {
		let dist = 5000
		let closestAtt
		attractors.forEach(a => {
			const distAtt = Math.hypot(this.position.x - a.position.x, this.position.y - a.position.y)
			if(distAtt < dist) {
				dist = distAtt
				closestAtt = a
			}
		});

		return closestAtt
	}
}