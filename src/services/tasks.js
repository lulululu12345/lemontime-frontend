import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/tasks'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  return axios.get(baseUrl)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const res = await axios.post(baseUrl, newObject, config)
  return res.data
}

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
}

const remove = (id) => {
  console.log(id)
  return axios.delete(`${baseUrl}/${id}`)
}

const taskService = { getAll, create, update, remove, setToken }

export default taskService