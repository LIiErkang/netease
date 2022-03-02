const header = { 'Content-Type': 'application/x-www-form-urlencoded', }

export default function request(url, method = 'get', body, headers = { ...header }) {
	const token = window.sessionStorage.getItem('token')

	if (token) headers.Authorization = token

	return new Promise((resolve, reject) => {
		fetch(`http://localhost:3000${url}`, { headers, method, body })
			.then(response => {
				if (response.ok) return response.json()
				else throw new Error()
			})
			.then(result => resolve(result))
			.catch(error => console.log(error))
	})
}
