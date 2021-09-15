import React from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router'
import { getPerson } from '../services/tmdbAPI'
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'
import Image from 'react-bootstrap/esm/Image'
import { imageFull } from '../utilities/HelperFunctions'
import KnownFor from '../components/KnownFor'

const PersonDetailsPage = () => {
    const { id } = useParams()
    const { data } = useQuery(['person', id], () => getPerson(id))

    return (
        <>
            {data &&
                <>
                    <Row>
                        <Col xs={12} md={6} lg={4} className="mb-4">
                            <Image src={imageFull(data.data.profile_path)} alt="" fluid />
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
