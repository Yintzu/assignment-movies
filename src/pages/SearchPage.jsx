import React, { useEffect, useRef } from 'react'
import Button from 'react-bootstrap/esm/Button'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Alert from 'react-bootstrap/Alert'
import { useQuery } from 'react-query'
import { StringParam, withDefault, NumberParam, useQueryParams } from 'use-query-params'
import { searchMovies } from '../services/tmdbAPI'
import Pagination from '../components/Pagination'
import MovieCard from '../components/MovieCard'

const SearchPage = () => {
    const searchRef = useRef()

    const [query, setQuery] = useQueryParams({ q: withDefault(StringParam, ""), page: withDefault(NumberParam, 1) })

    const { data, isPreviousData } = useQuery(['movies', [query.q, query.page]], () => searchMovies(query.q, query.page))

    useEffect(() => {
        searchRef.current.focus()
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        setQuery({ q: searchRef.current.value, page: 1 })
    }

    const handleClear = (e) => {
        e.preventDefault()
        searchRef.current.value = ""
        setQuery({ q: "", page: 1 })
    }

    return (
        <>
            <Form className="d-flex mb-4" onSubmit={(e) => handleSubmit(e)}>
                <Form.Control type="text" placeholder="Search..." ref={searchRef} />
                <Button type="submit" className="mx-2">Search</Button>
                <Button variant="danger" onClick={(e) => handleClear(e)}>Clear</Button>
            </Form>
            {query.q === "" &&
                <Alert variant="warning">
                    Please enter a search value of at least 1 character.
                </Alert>
            }

            {/* Show no results alert if nothing matches, othewise loop out the results) */}
            {data && data.data.results.length === 0 ?
                <Alert variant="warning">No results matched your search.</Alert> :
                <Row>
                    {data && data.data.results.map((movie, i) => (
                        <MovieCard movieId={movie.id} posterPath={movie.poster_path} key={i} />
                    ))}
                </Row>
            }


            {data && data.data.results.length > 0 && query.q.length > 0 &&
                <Pagination page={query.page} setPage={setQuery} isPreviousData={isPreviousData} hasMore={data?.data.page < data?.data.total_pages} />
            }
        </>
    )
}

export default SearchPage
