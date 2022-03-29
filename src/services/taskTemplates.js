import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/tasktemplates'

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const res = await axios.post(baseUrl, newObject, config)
  return res.data
}

const taskTemplateService = { getAll, create, setToken }

export default taskTemplateService