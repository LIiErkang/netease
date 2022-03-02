import request from '@api/request'

import { stringify } from '@utils/query'

async function search({ keywords, offset = 1, type = 1, limit = 30 }) {
	const result = await request(`/cloudsearch${stringify({ keywords, limit, offset, type })}`)

	return result
}

export { search }
