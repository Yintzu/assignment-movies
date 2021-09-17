import axios from 'axios'

axios.defaults.baseURL = 'https://api.themoviedb.org/3/'
const apiKey = 'api_key=8a54a59cd3fff3a4add0e3d39cd06f43'

//Functions for the home page
export const getTrending = (timeWindow) => {
    return axios.get(`/trending/movie/${timeWindow}?${apiKey}`)
}

export const getTopRated = () => {
    return axios.get(`/movie/top_rated?${apiKey}`)
}

export const getNowPlaying = () => {
    return axios.get(`/movie/now_playing?${apiKey}`)
}
//---------------------------


export const getMovie = id => {
    return axios.get(`/movie/${id}?${apiKey}`)
}

export const getMovies = page => {
    return axios.get(`/discover/movie?page=${page}&${apiKey}`)
}

export const getMoviesWithGenres = (genres, page) => {
    return axios.get(`/discover/movie?with_genres=${genres}&page=${page}&${apiKey}`)
}

export const getSimilarMovies = id => {
    return axios.get(`/movie/${id}/similar?${apiKey}`)
}

export const getGenres = () => {
    return axios.get(`/genre/movie/list?${apiKey}`)
}

export const searchMovies = (query, page) => {
    if (!query) return
    return axios.get(`/search/movie?query=${query}&page=${page}&${apiKey}`)
}

export const getCast = id => {
    return axios.get(`/movie/${id}/credits?${apiKey}`)
}

export const getPerson = id => {
    return axios.get(`/person/${id}?${apiKey}`)
}

export const getKnownFor = id => {
    return axios.get(`/discover/movie?with_cast=${id}&${apiKey}`)
}
