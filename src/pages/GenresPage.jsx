import React, { useEffect, useRef } from 'react'
import { useQuery } from 'react-query'
import { getGenres, getMoviesWithGenres } from '../services/tmdbAPI'
import InputGroup from 'react-bootstrap/InputGroup'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import MovieCard from '../components/MovieCard'
import Pagination from '../components/Pagination'
import { useQueryParams, withDefault, ArrayParam, NumberParam } from 'use-query-params'

//Shows all genres if no boxes are ticked, otherwise shows only the genres that are selected.
const GenresPage = () => {
    const boxParentRef = useRef()

    const [query, setQuery] = useQueryParams({ genres: withDefault(ArrayParam, []), page: withDefault(NumberParam, 1) })

    const { data: genres } = useQuery(['genres'], () => getGenres())
    const { data, isPreviousData } = useQuery(['genres', [query.genres, query.page]], () => getMoviesWithGenres(query.genres.join(','), query.page))

    //useEffect to make sure genres is fetched (and by extension rendered) properly before manipulating elements.
    //This is so the checkboxes match the url query params on a hard reload.
    useEffect(() => {
        if (genres) {
            const boxList = boxParentRef.current.querySelectorAll(".checkbox")

            boxList.forEach(box => query.genres.includes(box.id) ? box.checked = true : box.checked = false)
        }
    }, [genres])

    const handleCheckbox = (e) => {
        //If checking a box, add genre to query params. If unchecking, filter it out.
        if (e.target.checked) {
            setQuery({ genres: [...query.genres, e.target.id], page: 1 })
        } else {
            setQuery({ genres: [query.genres.filter(item => item != e.target.id)], page: 1 })
        }
    }

    return (
        <>
            <Row className="mb-4 mx-auto" style={{ maxWidth: '900px' }} ref={boxParentRef}>
                {genres && genres.data.genres.map((genre, i) => (
                    <Col xs={6} md={4} lg={3} key={i}>
                        <InputGroup className="justify-content-center flex-nowrap">
                            <InputGroup.Checkbox id={genre.id} className="checkbox" onChange={(e) => handleCheckbox(e)} />
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
            <Pagination page={query.page} setPage={setQuery} isPreviousData={isPreviousData} hasMore={data?.data.page < data?.data.total_pages} />
        </>
    )
}

export default GenresPage
