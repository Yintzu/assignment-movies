import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { getGenres, getMoviesWithGenres } from '../services/tmdbAPI'
import InputGroup from 'react-bootstrap/InputGroup'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import MovieCard from '../components/MovieCard'
import Pagination from '../components/Pagination'
import { useHistory } from 'react-router'

const GenresPage = () => {
    const history = useHistory()

    const [selectedGenres, setSelectedGenres] = useState([])
    const [page, setPage] = useState(1)
    const { data: genres } = useQuery(['genres'], () => getGenres())
    const { data, isPreviousData } = useQuery(['genres', [selectedGenres, page]], () => getMoviesWithGenres(selectedGenres.join(','), page))

    // useEffect(() => {
    //     if (selectedGenres.length > 0) {
    //         history.push(`/genres?genres=${selectedGenres.join(',')}&page=${page}`)
    //     } else {
    //         history.push(`/genres?page=${page}`)
    //     }
    // }, [selectedGenres])

    const handleCheckbox = (e) => {
        //If checking a box, add genre to array. If unchecking, filter it out.
        if (e.target.checked) {
            setPage(1)
            setSelectedGenres(prev => [...prev, e.target.id])
        } else {
            setPage(1)
            setSelectedGenres(prev => prev.filter(item => item !== e.target.id))
        }
    }

    return (
        <>
            <Row className="mb-4 mx-auto" style={{ maxWidth: '900px' }}>
                {genres && genres.data.genres.map((genre, i) => (
                    <Col xs={6} md={4} lg={3} key={i}>
                        <InputGroup className="justify-content-center flex-nowrap">
                            <InputGroup.Checkbox id={genre.id} onChange={(e) => handleCheckbox(e)} />
                            <InputGroup.Text style={{ width: '100%' }}>
                                <Form.Label htmlFor={genre.id} className="my-0">{genre.name}</Form.Label>
                            </InputGroup.Text>
                        </InputGroup>
                    </Col>
                ))}
            </Row>
            <Row>
                {data && data.data.results.map((movie, i) => (
                    <MovieCard key={i} posterPath={movie.poster_path} movieId={movie.id} />
                ))}
            </Row>
            <Pagination page={page} setPage={setPage} isPreviousData={isPreviousData} hasMore={data?.data.page < data?.data.total_pages} />
        </>
    )
}

export default GenresPage
