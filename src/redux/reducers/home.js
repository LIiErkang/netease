const defaultState = {
	playlists: []
}

export default function user(state = defaultState, action) {
	const { data, type } = action

	switch (type) {
		case 'setHomeState':
			data.forEach(({ key, value }) => state[key] = value)

			return Object.assign([], state)

		default:
			return state
	}
}
