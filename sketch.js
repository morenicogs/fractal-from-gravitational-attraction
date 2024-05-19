
// const attractors = []

let prevGrid
function setup() {
  	createCanvas(windowWidth, windowHeight);
  	settings.grid = new Grid(settings.size)
	  setupTriangleAttractors(25,150)
	frameRate(60)

	settings.background = createGraphics(width, height)
	if(!settings.layers) settings.flattenLayer = createGraphics(width, height)
	settings.background.background(40)

	createPane()
}

function draw() {
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
			
			for (const activeCell of settings.grid.activeCells) {
				activeCell.mover.update()
				activeCell.mover.display()

				for (const attractor of settings.attractors) {
				
					const attracted = attractor.attract(activeCell.mover)
					if(!attracted) {
						
						settings.grid.fillActiveCell(attractor, activeCell)
						settings.grid.newActiveCell()
						break
					}
				}
			}
			// settings.grid.activeCell.mover.update()
			// settings.grid.activeCell.mover.display()

			// for (const attractor of settings.attractors) {
				
			// 	const attracted = attractor.attract(settings.grid.activeCell.mover)
			// 	if(!attracted) {
					
			// 		settings.grid.fillActiveCell(attractor, settings.grid.activeCell)
			// 		settings.grid.newActiveCell()
			// 		break
			// 	}
			// }
			
		}
	}

	if(settings.mode == "direct"){
		
		for (const activeCell of settings.grid.activeCells) {
			let found = false
			let count = 0 
			do{
				activeCell.mover.update()
				for (const attractor of settings.attractors) {
					const attracted = attractor.attract(activeCell.mover)
					if(!attracted) {
						settings.grid.fillActiveCell(attractor, activeCell)
						settings.grid.newActiveCell()
						found = true
						break
					}
				}
			} while(!found)

			}
		// 	settings.grid.mover.update()

		// 	for (const attractor of settings.attractors) {
				
		// 		const attracted = attractor.attract(settings.grid.mover)
		// 		if(!attracted) {
					
		// 			settings.grid.fillActiveCell(attractor, settings.grid.activeCell)
		// 			settings.grid.newActiveCell()
		// 			found = true
		// 			break
		// 		}
				
		// 	}

		// 	if(count > 5000) {
		// 		console.log("5000")
		// 		const attractor = settings.grid.mover.closestAttractor(settings.attractors)
		// 		settings.grid.fillActiveCell(attractor)
		// 		settings.grid.newActiveCell()
		// 		found = true
				
		// 	}

		// 	count++
			
		// } while(!found)
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

	settings.attractors.push(new Attractor(p1.x, p1.y, mass, 40, "#D300C5"))
	settings.attractors.push(new Attractor(p2.x, p2.y, mass, 40, "#FF0069"))
	settings.attractors.push(new Attractor(p3.x, p3.y, mass, 40, "#7638FA"))
	// settings.attractors.push(new Attractor(width/2, height/2, mass/2, 20 , "#FF7A00"))



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
			// a.layer.drawingContext.imageSmoothingEnabled = true
			settings.background.image(a.layer, 0, 0)
			// a.layer.save(name + "_" + i + ".png")
		})

		settings.attractors.forEach(a => a.layer = createGraphics(width, height))
	} else {
		settings.background.image(settings.flattenLayer, 0, 0)
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
	settings.attractors.push(new Attractor(p4.x, p4.y, mass, 20 , "#7638FA"))
	settings.attractors.push(new Attractor(p3.x, p3.y, mass, 20 , "#D300C5"))
	settings.attractors.push(new Attractor(p2.x, p2.y, mass*1.01, 20 , "#FF0069"))

	settings.attractors.push(new Attractor(p1.x, p1.y, mass*0.98, 20 , "#FFD600"))

	settings.attractors.push(new Attractor(width/2, height/2, mass, 20 , "#FF7A00"))
}

function setupSpecialAttractors(mass, radius) {
	const ratio =  height/width

	const pointM = {
		x: width/2,
		y: height/2,
		color: color("#FFD600"),
		mass: mass*1.5,
		size: 20
	}
	
	const point1 = {
		x: width/2,
		y: height/4,
		color: color("#FF7A00"),
		mass: mass * 3,
		size: 20
	}
	const point2 = {
		x: 3*width/4,
		y: height/2,
		color: color("#FF0069"),
		mass: mass,
		size: 20
	}
	const point3 = {
		x: width/2,
		y: 3*height/4,
		color: color("#D300C5"),
		mass: mass * 3,
		size: 20
	}
	const point4 = {
		x: width/4,
		y: height/2,
		color: color("#7638FA"),
		mass: mass,
		size: 20
	}
	colorMode(HSB)
	const point1M2 = {
		x: (point1.x + point2.x + pointM.x)/3,
		y: (point1.y + point2.y + pointM.y)/3,
		color: lerpColor(point1.color, point2.color, 0.5),
		mass: (point1.mass + point2.mass + pointM.mass)/6,
		size: 15
	}
	const point2M3 = {
		x: (point2.x + point3.x + pointM.x)/3,
		y: (point2.y + point3.y + pointM.y)/3,
		color: lerpColor(point2.color, point3.color, 0.5),
		mass: (point2.mass + point3.mass+ pointM.mass)/6,
		size: 15
	}
	const point3M4 = {
		x: (point3.x + point4.x + pointM.x)/3,
		y: (point3.y + point4.y + pointM.y)/3,
		color: lerpColor(point3.color, point4.color, 0.5),
		mass: (point3.mass + point4.mass+ pointM.mass)/6,
		size: 15
	}
	const point4M1 = {
		x: (point1.x + point4.x + pointM.x)/3,
		y: (point1.y + point4.y + pointM.y)/3,
		color: lerpColor(point1.color, point4.color, 0.5),
		mass: (point1.mass + point4.mass+ pointM.mass)/6,
		size: 15
	}

	


	settings.attractors.push(new Attractor(point1.x, point1.y, point1.mass, point1.size , point1.color.toString()))

	settings.attractors.push(new Attractor(point2.x, point2.y, point2.mass, point2.size , point2.color.toString()))
	settings.attractors.push(new Attractor(point3.x, point3.y, point3.mass, point3.size , point3.color.toString()))
	settings.attractors.push(new Attractor(point4.x, point4.y, point4.mass, point4.size ,point4.color.toString()))

	// settings.attractors.push(new Attractor(pointM.x, pointM.y, pointM.mass, pointM.size ,pointM.color.toString()))
	settings.attractors.push(new Attractor(point1M2.x, point1M2.y, point1M2.mass, point1M2.size ,point1M2.color.toString()))
	settings.attractors.push(new Attractor(point2M3.x, point2M3.y, point2M3.mass, point2M3.size ,point2M3.color.toString()))
	settings.attractors.push(new Attractor(point3M4.x, point3M4.y, point3M4.mass, point3M4.size ,point3M4.color.toString()))
	settings.attractors.push(new Attractor(point4M1.x, point4M1.y, point4M1.mass, point4M1.size ,point4M1.color.toString()))
}