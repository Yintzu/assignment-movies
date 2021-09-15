import React from 'react'
import { useQuery } from 'react-query'
import { getKnownFor } from '../services/tmdbAPI'
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'
import Card from 'react-bootstrap/esm/Card'
import { image500 } from '../utilities/HelperFunctions'
import { Link } from 'react-router-dom'

const KnownFor = ({ id }) => {
    const { data: knownForData } = useQuery(['personKnownFor', id], () => getKnownFor(id))

    return (
        <Row className="mt-4">
            <h2 className="mb-4">Known for:</h2>

            {knownForData && knownForData.data.results.map((movie, i) => (
                <Col xs={6} lg={3} key={i}>
                    <Link to={`/movies/${movie.id}`}>
                        <Card>
                            <Card.Img variant="top" src={image500(movie.poster_path)} />
                            <Card.Body>
                                {movie.name}{movie.title}
                            </Card.Body>
                        </Card>
                    </Link>
                </Col>
            ))}
        </Row>
    )
}

export default KnownFor
