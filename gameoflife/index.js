// cell [ x, y ]
// world [ [ x, y ], [ x, y ] ]

// Get the live neighbours of a cell
function liveNeighbours(world, cell) {
	return world
}

// Get the next state of a cell
function transition(world, cell) {
	let liveNeighbours = liveNeighbours(world, cell)

	if (liveNeighbours.length < 2 || liveNeighbours.length > 3) {
		return null
	}

	if (liveNeighbours.length === 3) {
		cell.isAlive = true
	}

	return cell
}

// Populate the world with relevant dead cells
function includeDeadCells(world) {}

// main

// Pretty print the world
export function draw(world) {
	return 'not implemented yet!'
}

// Get the next state of the world
export function tick(world) {
	let expandedWorld = includeDeadCells(world)

	let nextWorld = expandedWorld
		.map(transition.bind(null, expandedWorld))
		.filter()

	return nextWorld
}

// let world = [ [0, 1], [1, 0], [1, 1] ]
