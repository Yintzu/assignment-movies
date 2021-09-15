import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from 'react-query'
import { image500 } from '../utilities/HelperFunctions'
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

const HomePageList = ({ timeWindowButton, title, getFunction }) => {
    //Handles the week/day button for trending. Does not render if passed null.
    const [timeWindow, setTimeWindow] = useState(timeWindowButton)

    const { data } = useQuery([`${title}`, timeWindow], () => getFunction(timeWindow))

    return (
        <div className="mb-5">
            <div className="d-flex justify-content-between mb-3">
                <h2 style={{textTransform: 'capitalize'}}>{title}</h2>
                {timeWindow &&
                    <Button
                        variant="warning"
                        style={{ textTransform: 'capitalize', minWidth: '8rem' }}
                        onClick={() => setTimeWindow(prev => prev === 'week' ? 'day' : 'week')}>
                        {timeWindow}
                    </Button>
                }
            </div>
            <Row>
                {data && data.data.results.map((result, i) => (
                    <Col xs={6} sm={4} md={2} key={i} className="mb-4">
                        <Link to={`/movies/${result.id}`} >
                            <Card>
                                <Card.Img src={image500(result.poster_path)} />
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default HomePageList
