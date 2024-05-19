const pane = new Tweakpane.Pane()
// const settings = {
// 	scene: {
// 		width: windowWidth,
// 		height: windowHeight,
// 		fps: 60
// 	}
// }

const settings = {
	attractors: [],
	background: {},
	grid: {},
	size: 128,
	speed: 1,
	amount: 1,
	mode: "sequential",
	layers: true,
	flattenLayer: {},
	minHitCount: 0,
	mover: {
		mass: 1,
		radius: 5
	}
}

function removeItemFromArray(item, array) {
	const itemIndex = array.indexOf(item)
	array.splice(itemIndex, 1)
}

function down() {
	noLoop()
	settings.attractors.forEach((a, i) => {
		a.layer.save(name + "_" + i + ".png")
	})
}

function createPane(){
	const gridPane = pane.addFolder({
		title: "Grid"
	})
	gridPane.addInput(settings, "size", {
		step: 1,
	})
	gridPane.addInput(settings, "speed", {
		step: 1,
	})
	gridPane.addInput(settings, "amount", {
		step: 1,
	})

	gridPane.addInput(settings, "mode", {
		options: {
			direct: "direct",
			sequential: "sequential"
		},
	})
	gridPane.addButton({
		title: "Reset Grid"
	}).on("click", () => {
		resetGrid()

	})
	createAttractorsPane(gridPane)


}

function createAttractorsPane(gridPane){
	const attractorPane = gridPane.addFolder({
		title: "attractor"
	})
	const myPages = []

	settings.attractors.forEach((a,i) => {
		const adjI = i + 1
		myPages.push({title: "A_" + adjI})
	})

	const tab = attractorPane.addTab({pages: myPages})

	settings.attractors.forEach((a,i) => {
		const attrSettings = {
			color: a.color.toString('#rrggbb'),
			position: {x: a.position.x - width/2, y: a.position.y - height/2}
		}
		tab.pages[i].addInput(attrSettings, "color")
			.on("change", (ev) => a.color = color(ev.value))
		tab.pages[i].addInput(attrSettings, "position", {
			x: {min:-width/2, max: width/2},
			y: {min: -height/2, max: height/2}
		})
			.on("change", (ev) => a.position = createVector(ev.value.x + width/2, ev.value.y + height/2))
		tab.pages[i].addInput(a, "mass", {
			min: 0
		})
		tab.pages[i].addInput(a, "radius", {
			min: 0
		})
	})
}

function resetGrid(){
	settings.grid = new Grid(settings.size)
	settings.attractors.forEach(a => a.layer = createGraphics(width, height))
	settings.background.background(40)
}