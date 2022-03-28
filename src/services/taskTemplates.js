import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/tasktemplates'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  console.log('config', config);

  const res = await axios.post(baseUrl, newObject, config)
  return res.data
}

const taskTemplateService = { create, setToken }

export default taskTemplateService