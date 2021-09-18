import React from 'react'
import Image from 'react-bootstrap/Image'
import topFilm from '../utilities/topfilm.jpg'
import johan from '../utilities/johan.jpg'
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'
import ListGroup from 'react-bootstrap/ListGroup'
import Card from 'react-bootstrap/esm/Card'

const TopFilm = () => {
    return (
        <Row className="mb-5">
            <h2 className="mb-3">Featured Film:</h2>
            <Col sm={12} md={12} lg={12} xl={5} className="mb-4">
                <Image src={topFilm} fluid/>
            </Col>
            <Col sm={12} md={12} lg={12} xl={7}>
                <h2>Return of the Printers</h2>
                <p style={{ fontStyle: 'italic', fontSize: '1.5rem' }}>His relatives kept asking, and he kept blasting.</p>
                <p>Release date: To be announced</p>
                <p>Run time: 133.7min</p>
                <p>
                    In a corrupt post apocalyptic society our hero Johan struggles with the demands of his few surviving family members.
                    At every turn he is fighting off attempts of getting roped into supporting bad startups and fixing home electronics.
                    Join Johan in the greatest action epic of the decade with a struggle that makes hell look like a playground.
                    What will run out first, his sanity or his bullets?
                </p>
                <h3>Production companies:</h3>
                <ListGroup className="mb-3">
                    <ListGroup.Item>The Hive Resistance</ListGroup.Item>
                </ListGroup>
                <h3>Cast:</h3>
                <Card style={{ maxWidth: '200px' }}>
                    <Card.Img variant="top" src={johan} fluid />
                    <Card.Body style={{ textAlign: 'center', color: 'var(--bs-dark)' }}>
                        Johan Nordström
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    )
}

export default TopFilm
