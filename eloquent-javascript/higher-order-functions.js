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

// II. Every
function every(array, predicate) {
	if (!array.length) return true
	if (!predicate(array.shift())) return false
	return every(array, predicate)
}

// TESTS
assert(every([ 1, 2, 3 ], function (value) {
	return value > 0
}))
assert(!every([ 1, 2, 3 ], function (value) {
	return value > 1
}))
assert(!every([ 3, 1, 2 ], function (value) {
	return value > 1
}))

// III. Some
function some(array, predicate) {
	if (!array.length) return false
	if (predicate(array.shift())) return true
	return some(array, predicate)
}

// TESTS
assert(some([ 1, 2, 3 ], function (value) {
	return value > 0
}))
assert(some([ -1, 2, 3 ], function (value) {
	return value < 0
}))
assert(!some([ 1, 2, 3 ], function (value) {
	return value < 0
}))
