/*eslint curly: [2, "multi-line"]*/

// A list (linked list)
// e.g. var list = { value: 1, rest: { value: 2, rest: { value: 3, rest: null } } }

function arrayToList(array) {
}

function listToArray(list) {
	function listToArrayHelper(list, array) {
		array.push(list.value)
		if (!list.rest) return array
		return listToArrayHelper(list.rest, array)
	}

	listToArrayHelper(list, [])
}

function prepend(list, element) {
	return {
		value: element,
		rest: list
	}
}

function nth(list, index) {
	if (index === 0) return list.value
	return nth(list.rest, --index)
}
