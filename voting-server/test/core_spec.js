import { expect } from 'chai'
import { List, Map, fromJS } from 'immutable'
import { setEntries, next, vote } from '../src/core'

describe('core application logic', () => {
	describe('setEntries', () => {
		it('adds the entries to the state', () => {
			const initialState = Map()
			const entries = List.of('Trainspotting', '28 Days Later')
			const nextState = setEntries(initialState, entries)

			expect(nextState).to.equal(Map({
				entries: List.of('Trainspotting', '28 Days Later')
			}))
		})

		it('converts entries to an immutable collection', () => {
			let state = Map()
			let entries = ['Trainspotting', '28 Days Later']
			let nextState = setEntries(state, entries)

			expect(nextState).to.equal(Map({
				entries: List.of('Trainspotting', '28 Days Later')
			}))
		})
	})

	describe('next', () => {
		it('takes the next two entries under vote', () => {
			let state = Map({
				entries: List.of(
					'Trainspotting',
					'Sunshine',
					'Hero'
				)
			})
			let nextState = next(state)

			expect(nextState).to.equal(Map({
				entries: List.of('Hero'),
				vote: Map({
					pair: List.of(
						'Trainspotting',
						'Sunshine'
					)
				})
			}))
		})
	})

	describe('vote', () => {
		it('creates a tally for the voted entry', () => {
			let state = fromJS({
				vote: {
					pair: ['Trainspotting', '28 Days Later']
				},
				entries: []
			})

			let nextState = vote(state, 'Trainspotting')

			console.log(nextState)

			expect(nextState).to.equal(fromJS({
				vote: {
					pair: ['Trainspotting', '28 Days Later'],
					tally: {
						'Trainspotting': 1
					}
				},
				entries: []
			}))
		})

		it('adds to existing tally for the voted entry', () => {
			let state = fromJS({
				vote: {
					pair: ['Trainspotting', '28 Days Later'],
					tally: {
						'Trainspotting': 3,
						'28 Days Later': 2
					}
				},
				entries: []
			})

			let nextState = vote(state, 'Trainspotting')

			expect(nextState).to.equal(fromJS({
				vote: {
					pair: ['Trainspotting', '28 Days Later'],
					tally: {
						'Trainspotting': 4,
						'28 Days Later': 2
					}
				},
				entries: []
			}))
		})
	})
})
