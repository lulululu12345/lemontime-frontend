import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/login'

const login = async credentials => {
  const res = await axios.post(baseUrl, credentials)
  console.log('the response', res)
  return res.data
}

export default { login }