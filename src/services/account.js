import axios from 'axios'
import userToken from './userToken'
const baseUrl = '/api/users'

const remove = async () => {
  const config = { 
    headers: { Authorization: userToken.token }, 
  }
  
  const res = await axios.delete(`${baseUrl}/`, config)
  return res.data
}

const verifyUser = (code) => {
  return axios.get(`${baseUrl}/${code}`)
    .then(res => {
      return res.data
    })
}

const forgotPassword = async (email) => {
  const res = await axios.put(`/api/account`, email)
}

const passwordReset = async (password, resetToken) => {
  const res = await axios.put(`/api/account/${resetToken}`, password)
  return res.data
}

export default { remove, verifyUser, forgotPassword, passwordReset }