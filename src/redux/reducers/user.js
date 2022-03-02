const defaultState = {
	login: false
}

export default function user(state = defaultState, action) {
	const { data, type } = action

	switch (type) {
		case 'setUserState':
			state[data.key] = data.value
			return Object.assign([], state)

		default:
			return state
	}
}
