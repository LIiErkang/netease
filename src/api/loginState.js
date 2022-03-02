import request from '@api/request'

import { stringify } from '@utils/query'

async function cellphoneLogin({ phone, captcha }) {
	const result = await request(
		'/login/cellphone',
		'post',
		stringify({ phone, captcha }, false)
	)

	return result
}

async function sendCaptcha(phone) {
	return await request(`/captcha/sent${stringify({ phone })}`)
}

async function getUserAccount(cookie) {
	return await request(`/user/account${stringify({ cookie: encodeURIComponent(cookie) })}`)
}

export { cellphoneLogin, sendCaptcha, getUserAccount }
