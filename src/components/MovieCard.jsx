import React from 'react'
import { Link } from 'react-router-dom'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/esm/Card'
import { image500 } from '../utilities/HelperFunctions'

const MovieCard = ({movieId, posterPath}) => {
    return (
        <Col xs={6} sm={4} lg={2} className="mb-4">
            <Link to={`/movies/${movieId}`}>
                <Card>
                    <Card.Img src={image500(posterPath)}/>
                </Card>
            </Link>
        </Col>
    )
}

export default MovieCard