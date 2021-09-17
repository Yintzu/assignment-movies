import React, { useEffect } from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { getCast, getMovie, getSimilarMovies } from '../services/tmdbAPI'
import { image500, imageFull } from '../utilities/HelperFunctions'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import Card from 'react-bootstrap/esm/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import MovieCard from '../components/MovieCard'
import { useStore } from '../contexts/StoreContextProvider'
import Alert from 'react-bootstrap/esm/Alert'

const MovieDetailsPage = () => {
    const { id } = useParams()
    const { addToHistory } = useStore()

    const { data, isError, error, isLoading } = useQuery(['movie', id], () => getMovie(id))
    const { data: castData } = useQuery(['cast', id], () => getCast(id))
    const { data: similarData } = useQuery(['similar', id], () => getSimilarMovies(id))

    //Adds movie ID and poster path to history (and then local storage) that's all we need really.
    useEffect(() => {
        if (data) addToHistory({id: data.data.id, poster_path: data.data.poster_path})
    }, [data])

    const renderCast = ({ data }) => {
        return data.cast.slice(0, 12).map((person, i) => (
            <Col xs={6} sm={4} md={3} lg={2} key={i} className="mb-4">
                <Link to={`/person/${person.id}`} style={{ textDecoration: 'none' }}>
                    <Card>
                        <Card.Img variant="top" src={image500(person.profile_path)} />
                        <Card.Body style={{ textAlign: 'center', color: 'var(--bs-dark)' }}>
                            {person.name}
                        </Card.Body>
                    </Card>
                </Link>
            </Col>
        ))
    }

    return (
        <>
            {isLoading &&
                <h1 className="text-center">Loading...</h1>
            }
            {isError &&
                <Alert variant="danger" className="text-center"><strong>Error:</strong> {error.message}</Alert>
            }
            {data &&
                <>
                    <Row>
                        <Col xs={12} md={6} className="mb-4">
                            <Image src={imageFull(data.data.poster_path)} alt="" fluid />
                        </Col>
                        <Col xs={12} md={6}>
                            <h1>{data.data.title}</h1>
                            <p style={{ fontStyle: 'italic', fontSize: '1.5rem' }}>{data.data.tagline}</p>
                            <p>{data.data.overview}</p>
                            <p>Release date: {data.data.release_date}</p>
                            <p>Run time: {data.data.runtime}min</p>
                            <p>Genres: {data.data.genres.map((genre) => `${genre.name}`).join(', ')}.</p>
                            <h2>Production companies:</h2>
                            <ListGroup>
                                {data.data.production_companies.map((company, i) => (
                                    <ListGroup.Item key={i}>
                                        {company.name}
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </Col>
                    </Row>
                    <Row className="mt-4">
                        <h2>Cast:</h2>
                        {castData && renderCast(castData)}
                    </Row>
                    <Row className="mt-4">
                        <h2>Similar movies:</h2>
                        {similarData && similarData.data.results.map((movie, i) => (
                            <MovieCard movieId={movie.id} posterPath={movie.poster_path} key={i} />
                        ))}
                    </Row>
                </>
            }
        </>
    )
}

export default MovieDetailsPage
