import axios from 'axios'
const baseUrl = '/api/login'

const login = async credentials => {
  const res = await axios.post(baseUrl, credentials)
  console.log('the response', res)
  return res.data
}

export default { login }