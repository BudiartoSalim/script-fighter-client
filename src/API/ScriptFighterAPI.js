import axios from 'axios'

export default axios.create({
  baseURL: 'https://script-fighter-server.herokuapp.com'
})