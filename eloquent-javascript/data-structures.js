#!/usr/bin/env node

/*global require*/
var assert = require('assert')

// I. A list (linked list)
// e.g. var list = { value: 1, rest: { value: 2, rest: null }

// Non-recursive (loop) implementation
function arrayToList(array) {
	var list = null

	array.reverse().forEach(function (element) {
		list = prepend(list, element)
	})

	return list
}

// Recursive implementation
function rArrayToList(array) {
	if (!array.length) return null
	return {
		value: array.shift(),
		rest: rArrayToList(array)
	}
}

function listToArray(list) {
	function listToArrayHelper(list, array) {
		array.push(list.value)

		if (!list.rest) return array
		return listToArrayHelper(list.rest, array)
	}

	if (!list) return [];
	return listToArrayHelper(list, [])
}

function prepend(list, element) {
	return {
		value: element,
		rest: list
	}
}

function nth(list, index) {
	if (!list) return undefined
	if (index === 0) return list.value
	return nth(list.rest, --index)
}

// TESTS
var list = {
	value: 1,
	rest: {
		value: 2,
		rest: {
			value: 3,
			rest: null
		}
	}
}

// arrayToList
assert.deepEqual(arrayToList([]), null)
assert.deepEqual(arrayToList([1, 2, 3]), list)
assert.deepEqual(rArrayToList([]), null)
assert.deepEqual(rArrayToList([1, 2, 3]), list)

// listToArray
assert.deepEqual(listToArray(null), [])
assert.deepEqual(listToArray(list), [1, 2, 3])

// prepend
assert.deepEqual(prepend(list, 1), {
	value: 1,
	rest: list
})

// nth
assert.equal(nth(list, 0), 1)
assert.equal(nth(list, 1), 2)
assert.equal(nth(list, 2), 3)
assert.equal(nth(list, 3), undefined)

// II. Deep comparison
function deepEqual(a, b) {
	if (typeof a !== 'object' ||
		typeof b !== 'object' ||
		a === null || b === null) return a === b

	if (Object.keys(a).length !== Object.keys(b).length) return false

	for (var key in a) {
		if (!deepEqual(a[key], b[key])) return false
	}

	return true
}

// TESTS
assert(deepEqual(1, 1))
assert(!deepEqual(1, '1'))
assert(deepEqual('1', '1'))
assert(deepEqual(null, null))
assert(!deepEqual(null, false))
assert(deepEqual(true, true))
assert(deepEqual([], []))
assert(deepEqual([1, 2, '3'], [1, 2, '3']))
assert(deepEqual({ a: 1, b: 2 }, { b: 2, a: 1 }))
assert(deepEqual([1, { a: 1, b: 2 }, '3'], [1, { a: 1, b: 2 }, '3']))
assert(deepEqual({ a: { b: { c: false } } }, { a: { b: { c: false} } }))
assert(!deepEqual({ a: { b: { c: false } } }, { a: { c: { b: false} } }))
assert(!deepEqual({ a: { b: { c: 5 } } }, { a: { b: null } }))
assert(!deepEqual({ a: { b: { c: 5 } } }, { a: { b: { d: 5 } } }))
