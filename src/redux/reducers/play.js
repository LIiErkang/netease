const defaultState = {
	singer: [],
	albumId: '',
	songTitle: '',
	image: '',
	audio: '',
	id: '',
	album: '',

	liked: false,
	isPlaying: false,

	lyric: []
}

export default function user(state = defaultState, action) {
	const { data, type } = action

	switch (type) {
		case 'setPlayState':
			data.forEach(({ key, value }) => state[key] = value)

			return Object.assign([], state)

		default:
			return state
	}
}
