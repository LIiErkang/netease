const defaultState = {
	songlists: [],
	currentDisplay: ''
}

export default function user(state = defaultState, action) {
	const { data, type } = action

	switch (type) {
		case 'setDetailState':
			data.forEach(({ key, value }) => state[key] = value)

			return Object.assign([], state)

		default:
			return state
	}
}
