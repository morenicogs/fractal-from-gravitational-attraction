class Mover {
	constructor(x, y, m, r) {
		this.position = createVector(x, y)
		this.mass = m
		this.radius = r
		this.count = 0
		this.hitcount = 0
		this.vel = createVector(0,0)
		this.acc = createVector(0,0)
		this.G = 9.81

		this.applyPendulumForce()

		// this.layer = createGraphics(width, height)
	}

	display() {
		// this.layer.push()
		// const c = color(220)
		// c.setAlpha(128/3)
		// this.layer.fill(c)
		// c.setAlpha(255/2)
		// this.layer.stroke(c)
		// this.layer.strokeWeight(this.radius * 0.2)
		// this.layer.circle(this.position.x, this.position.y, this.radius)
		// this.layer.pop()
		// this.G = 9.81
		// image(this.layer, 0, 0)

		const c = color(220)
		fill(c)
		noStroke()
		circle(this.position.x, this.position.y, this.radius)

	}

	update(){
		this.vel.add(this.acc);
   		this.position.add(this.vel);
    	this.acc.set(0, 0);
		if(this.count == 1250){
			const noise = p5.Vector.random2D()
			noise.mult(5)
			this.position.add(noise);
			this.applyPendulumForce()

			// this.count = 0
			// noLoop()
		}
		
		if(this.count > 6000) {
			// this.vel.set(0,0)
			// this.acc.set(3,3)
			const noise = p5.Vector.random2D()
			
			this.position.add(noise);
			// this.position.add(noise);
			// this.position.add(noise);
			// this.applyPendulumForce()
			this.count = 5000

			// console.log("2500 error")
		}

		// if(this.count > 2500 && this.count < 2550) {
		// 	this.vel.set(0,0)
		// 	this.acc.set(0,0)
		// 	const noise = p5.Vector.random2D()
			
		// 	this.position.add(noise);
		// 	this.position.add(noise);
		// 	this.position.add(noise);
		// 	this.applyPendulumForce()
		// 	// this.count = 0

		// 	// console.log("2500 error")
		// }
		this.count++
		
	}

	applyForce(force) {
		this.applyPendulumForce()
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

	applyPendulumForce(){
		const force  = createVector(width/2 - this.position.x, height/2 - this.position.y)
		const lengthString = Math.hypot(width/2, height/2)
		const dist = Math.min(Math.hypot(width/2 - this.position.x, height/2 - this.position.y), lengthString)
		const strength = Math.round(Math.asin(dist/lengthString) * this.G * this.mass / 10000)*10000
		// console.log(strength)
		// console.log(force)
		force.setMag(strength)
		this.acc.add(force)
	}
}