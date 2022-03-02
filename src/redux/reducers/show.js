const defaultState = {
	controlBar: true,
	loginDialog: false
}

export default function user(state = defaultState, action) {
	const { data, type } = action

	switch (type) {
		case 'setShowState':
			data.forEach(({ key, value }) => state[key] = value)

			return Object.assign([], state)

		default:
			return state
	}
}
