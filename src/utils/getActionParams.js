export default function getActionParams(data) {
	const params = Object.keys(data).map(key => {
		return { key, value: data[key] }
	})

	return params
}
