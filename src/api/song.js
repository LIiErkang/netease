import request from '@api/request'

import { stringify } from '@utils/query'

async function getSong(id) {
	const result = await request(`/song/url${stringify({ id })}`)

	return result
}

async function getSinger({ id, offset = 0, limit = 30 }) {
	const result = await request(`/artist/songs${stringify({ id, offset, limit })}`)

	return result
}

async function getAlbum(id) {
	const result = await request(`/album${stringify({ id })}`)

	return result
}

async function getLyric(id) {
	const result = await request(`/lyric${stringify({ id })}`)

	return result
}

export { getSong, getSinger, getAlbum, getLyric }
