// const pane = new Tweakpane.Pane()
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
	speed: 15,
	amount: 200,
	mode: "sequential",
	layers: true,
	flattenLayer: {},
	minHitCount: 0
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