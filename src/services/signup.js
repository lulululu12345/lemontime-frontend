import axios from 'axios'
const baseUrl = '/api/users'

const signup = async (credentials) => {
  const res = await axios.post(baseUrl, credentials)
  return res.data
}

export default { signup }