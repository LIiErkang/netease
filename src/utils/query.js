export function stringify(params = false, flag = true) {
	if (!params) return

	let string = ''

	Object.keys(params).forEach(key => {
		const param = `${key}=${params[key]}`

		string += string === '' ? param : `&${param}`
	})

	return flag ? '?' + string : string
}

export function parser(string = false) {
	if (!string) return

	const paramsObj = string.split('?')[1].split('&').map(item => {
		const [key, value] = item.split('=')

		return { [key]: value }
	})

	const params = {}

	paramsObj.forEach(item => {
		Object.keys(item).forEach(key => params[key] = item[key])
	})

	return params
}
