#!/usr/bin/env node

/*global require*/
var assert = require('assert')

// I. Flattening
// Use `reduce` and `concat` to flatten array
function flatten(arrayOrValue) {
	if (!arrayOrValue.reduce) return arrayOrValue

	return arrayOrValue.reduce(function (a, b) {
		return a.concat(flatten(b))
	}, [])
}

// TESTS
assert.deepEqual(flatten([1, 2, 3]), [1, 2, 3])
assert.deepEqual(flatten([1, [2, 3], 4]), [1, 2, 3, 4])
assert.deepEqual(flatten([1, [2, [3, 4], 5], 6, 7]), [1, 2, 3, 4, 5, 6, 7])
assert.deepEqual(flatten([[1, [2, [3, 4], 5]], 6, 7]), [1, 2, 3, 4, 5, 6, 7])
