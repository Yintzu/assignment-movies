import defImg from '../utilities/defimg.jpg'

export const image500 = (path) => {
    if (!path) return defImg
    return `https://image.tmdb.org/t/p/w500${path}`
}
export const imageFull = (path) => {
    if (!path) return defImg
    return `https://image.tmdb.org/t/p/original${path}`
}

// export const imageCast = (path) => `https://image.tmdb.org/t/p/w185${path}`

