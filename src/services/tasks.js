import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/tasks'

const getAll = () => {
  return axios.get(baseUrl)
}

const create = newObject => {
  return axios.post(baseUrl, newObject)
}

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
}

const remove = (id) => {
  console.log(id)
  return axios.delete(`${baseUrl}/${id}`)
}

const taskService = { getAll, create, update, remove }

export default taskService