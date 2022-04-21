import axios from 'axios'
import userToken from './userToken'
const baseUrl = '/api/tasktemplates'

// let token = null

const getAll = async () => {
  const config = {
    headers: { Authorization: userToken.token },
  }
  const res = await axios.get(baseUrl, config)
  return res.data
}

// const setToken = newToken => {
//   token = `bearer ${newToken}`
// }

const create = async newObject => {
  const config = {
    headers: { Authorization: userToken.token },
  }

  const res = await axios.post(baseUrl, newObject, config)
  return res.data
}

const remove = async (id) => {
  const config = {
    headers: { Authorization: userToken.token },
  }
  const res = await axios.delete(`${baseUrl}/${id}`, config)
  return res.data
}

const taskTemplateService = { getAll, create, remove/*, setToken */ }

export default taskTemplateService