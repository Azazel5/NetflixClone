import axios from 'axios'

const axe = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
})

export default axe 