// let token = null

const setToken = newToken => {
  userToken.token = `bearer ${newToken}`
}

const userToken = {
  token: null,
  setToken
}

export default userToken