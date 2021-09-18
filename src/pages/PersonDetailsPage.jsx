import React from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router'
import { getPerson } from '../services/tmdbAPI'
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'
import Image from 'react-bootstrap/esm/Image'
import { imageFull } from '../utilities/HelperFunctions'
import KnownFor from '../components/KnownFor'
import Alert from 'react-bootstrap/esm/Alert'

const PersonDetailsPage = () => {
    const { id } = useParams()
    const { data, isError, error, isLoading } = useQuery(['person', id], () => getPerson(id))
    
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
                        <Col xs={12} md={6} lg={4} className="mb-4">
                            <Image src={imageFull(data.data.profile_path)} fluid />
                        </Col>
                        <Col xs={12} md={6} lg={8}>
                            <h1>{data.data.name}</h1>
                            <p>Birthday: {data.data.birthday}</p>
                            <p>Place of birth: {data.data.place_of_birth}</p>
                            <p>{data.data.biography}</p>
                        </Col>
                    </Row>

                    <KnownFor id={id} />
                </>
            }
        </>
    )
}

export default PersonDetailsPage
