import axios from 'axios'
import userToken from './userToken'
const baseUrl = 'http://localhost:3001/api/users'

const remove = async () => {
  const config = { 
    headers: { Authorization: userToken.token }, 
  }
  
  const res = await axios.delete(`${baseUrl}/`, config)
  return res.data
}

export default { remove }