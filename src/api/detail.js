import request from '@api/request'

import { stringify } from '@utils/query'

async function getDetail(id) {
	const result = await request(`/playlist/track/all${stringify({ id })}`)

	return result
}

export { getDetail }
