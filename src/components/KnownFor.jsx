import React from 'react'
import { useQuery } from 'react-query'
import { getKnownFor } from '../services/tmdbAPI'
import Row from 'react-bootstrap/esm/Row'
import MovieCard from './MovieCard'

const KnownFor = ({ id }) => {
    const { data: knownForData } = useQuery(['personKnownFor', id], () => getKnownFor(id))

    return (
        <Row className="mt-4">
            <h2 className="mb-4">Known for:</h2>
            {knownForData && knownForData.data.results.map((movie, i) => (
                <MovieCard movieId={movie.id} posterPath={movie.poster_path} key={i}/>
            ))}
        </Row>
    )
}

export default KnownFor
