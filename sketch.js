
// const attractors = []

let prevGrid
function setup() {
  	createCanvas(windowWidth, windowHeight);
  	settings.grid = new Grid(64)
	  setupWindowAttractors(10,250)
	frameRate(60)

	settings.background = createGraphics(width, height)
	if(!settings.layers) settings.flattenLayer = createGraphics(width, height)
	settings.background.background(40)
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