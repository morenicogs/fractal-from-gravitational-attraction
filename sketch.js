
// const attractors = []

let prevGrid
function setup() {
  	createCanvas(1620, 720);
  	settings.grid = new Grid(192)
	  setupWindowAttractors(300,310)
	frameRate(60)

	settings.background = createGraphics(width, height)
	settings.background.background(220)
}

function draw() {
	smooth()
  	image(settings.background, 0, 0)

// createGrid(50)
	
	// First show the attractor layers
	if(settings.layers) {
		settings.attractors.forEach(a => {
			image(a.layer, 0, 0)
		})
	}
	
	if(settings.mode == "sequential"){
		
		
		for (let i = 0; i < settings.speed; i++) {
			settings.grid.mover.update()
			settings.grid.mover.display()

			for (const attractor of settings.attractors) {
				
				const attracted = attractor.attract(settings.grid.mover)
				if(!attracted) {
					
					settings.grid.fillActiveCell(attractor)
					settings.grid.newActiveCell()
					break
				}
			}
			
		}
	}

	if(settings.mode == "direct"){
		let found = false
		let count = 0 
		do{
			settings.grid.mover.update()

			for (const attractor of settings.attractors) {
				
				const attracted = attractor.attract(settings.grid.mover)
				if(!attracted) {
					
					settings.grid.fillActiveCell(attractor)
					settings.grid.newActiveCell()
					found = true
					break
				}
				
			}

			// if(count > 5000) {
			// 	console.log("5000")
			// 	const attractor = settings.grid.mover.closestAttractor(settings.attractors)
			// 	settings.grid.fillActiveCell(attractor)
			// 	settings.grid.newActiveCell()
			// 	found = true
				
			// }

			count++
			
		} while(!found)
		// settings.grid.mover.display()
			
	}

	

	settings.attractors.forEach( a => {
		a.display()
	})
}

function setupTriangleAttractors(mass, radius) {
	const p1 = {
		x: width/2 + radius * Math.cos(Math.PI * 3/2),
		y: height/2 + radius * Math.sin(Math.PI * 3/2)
	}
	const p2 = {
		x: width/2 + radius * Math.cos(Math.PI * 1/6),
		y: height/2 + radius * Math.sin(Math.PI * 1/6)
	}
	const p3 = {
		x: width/2 + radius * Math.cos(Math.PI * 5/6),
		y: height/2 + radius * Math.sin(Math.PI * 5/6)
	}

	settings.attractors.push(new Attractor(p1.x, p1.y, mass, 50, "#FF520E"))
	settings.attractors.push(new Attractor(p2.x, p2.y, mass, 50, "#3AB6FC"))
	settings.attractors.push(new Attractor(p3.x, p3.y, mass, 50, "#FF288C"))


}

function setupSquareAttractors(mass, radius) {
	const ratio =  height/width
	const p1 = {
		x: width/2 - radius,
		y: height/2 - radius * ratio
	}
	const p2 = {
		x: width/2 + radius,
		y: height/2 - radius * ratio
	}
	const p3 = {
		x: width/2 + radius,
		y: height/2 + radius * ratio
	}
	const p4 = {
		x: width/2 - radius,
		y: height/2 + radius * ratio
	}
	settings.attractors.push(new Attractor(width/2, height/2, mass*0.25, 25, "#C6CFCB"))
	settings.attractors.push(new Attractor(p1.x, p1.y, mass*0.99, 40, "#752FED"))
	settings.attractors.push(new Attractor(p2.x, p2.y, mass*1.01, 40, "#2FEDA4"))
	settings.attractors.push(new Attractor(p3.x, p3.y, mass, 40, "#2fEDE7"))
	settings.attractors.push(new Attractor(p4.x, p4.y, mass, 40, "#ED2FDA"))
}

function saveGridResults(name){
	if(settings.layers) {
	
		settings.attractors.forEach((a, i) => {
			a.layer.drawingContext.imageSmoothingEnabled = true
			settings.background.image(a.layer, 0, 0)
			// a.layer.save(name + "_" + i + ".png")
		})

		settings.attractors.forEach(a => a.layer = createGraphics(width, height))
	}

}

function setupWindowAttractors(mass, radius) {
	const ratio =  height/width
	const p1 = {
		x: width/2,
		y: height/2 - (radius * ratio)
	}
	const p2 = {
		x: width/2 + radius,
		y: height/2
	}
	const p3 = {
		x: width/2,
		y: height/2 + (radius * ratio)
	}
	const p4 = {
		x: width/2 - radius,
		y: height/2
	}
	settings.attractors.push(new Attractor(p4.x, p4.y, mass, 40, "#7638FA"))
	settings.attractors.push(new Attractor(p3.x, p3.y, mass, 40, "#D300C5"))
	settings.attractors.push(new Attractor(p2.x, p2.y, mass*1.01, 40, "#FF0069"))

	settings.attractors.push(new Attractor(p1.x, p1.y, mass*0.99, 40, "#FFD600"))

	settings.attractors.push(new Attractor(width/2, height/2, mass*1.1, 40, "#FF7A00"))
}