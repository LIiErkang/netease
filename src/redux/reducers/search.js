const defaultState = {
	songs: [],
	currentSearch: ''
}

export default function user(state = defaultState, action) {
	const { data, type } = action

	switch (type) {
		case 'setSearchState':
			data.forEach(({ key, value }) => state[key] = value)

			return Object.assign([], state)

		default:
			return state
	}
}
