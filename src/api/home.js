import request from '@api/request'

import { stringify } from '@utils/query'

async function getPlayList({ limit = 10, offset = 0 }) {
	return await request(`/top/playlist${stringify({ limit, offset })}`)
}

export { getPlayList }
