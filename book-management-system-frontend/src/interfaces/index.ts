import axios from 'axios'

const axiosInstance = axios.create({
	baseURL: 'http://localhost:3000/',
	timeout: 3000,
})

export async function register(username: string, password: string) {
	return await axiosInstance.post('/user/register', {
		username,
		password,
	})
}
