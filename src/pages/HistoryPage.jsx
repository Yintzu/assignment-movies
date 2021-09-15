import React from 'react'
import Row from 'react-bootstrap/esm/Row'
import MovieCard from '../components/MovieCard'
import { useStore } from '../contexts/StoreContextProvider'

const HistoryPage = () => {
    const { movieHistory } = useStore()
    return (
        <div>
            <h1 className="pb-4">Your 10 last visited movies:</h1>
            <Row>
                {movieHistory && movieHistory.map((movie, i) => (
                    <MovieCard movieId={movie.id} posterPath={movie.poster_path} key={i} />
                ))}
            </Row>
        </div>
    )
}

export default HistoryPage
