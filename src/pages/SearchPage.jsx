import React, { useEffect, useState, useRef } from 'react'
import { useHistory, useLocation } from 'react-router'
import Button from 'react-bootstrap/esm/Button'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Alert from 'react-bootstrap/Alert'
import { useQuery } from 'react-query'
import { searchMovies } from '../services/tmdbAPI'
import Pagination from '../components/Pagination'
import MovieCard from '../components/MovieCard'

const SearchPage = () => {
    const history = useHistory()
    const location = useLocation()
    const searchRef = useRef()
    let queryString = new URLSearchParams(location.search)

    //States load in query params on mounting to survive hard reload.
    const [page, setPage] = useState(parseInt(queryString.get('page') ?? 1))
    const [searchValue, setSearchValue] = useState(queryString.get('q') ?? "")

    const { data, isPreviousData } = useQuery(['movies', [searchValue, page]], () => searchMovies(searchValue, page))

    useEffect(() => {
        if (searchValue) {
            history.push(`/search?q=${searchValue}&page=${page || 1}`)
        } else {
            history.push("/search")
        }
    }, [page, searchValue])

    // useEffect(() => {
    //     setPage(parseInt(queryString.get('page')))
    //     console.log("location" , location);
    // }, [location])

    useEffect(() => {
        searchRef.current.focus()
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        setSearchValue(searchRef.current.value)
        setPage(1)
    }

    const handleClear = (e) => {
        e.preventDefault()
        setSearchValue("")
        searchRef.current.value = ""
        setPage(1)
    }

    return (
        <div>
            <Form className="d-flex mb-4" onSubmit={(e) => handleSubmit(e)}>
                <Form.Control type="text" placeholder="Search..." ref={searchRef} />
                <Button type="submit" className="mx-2">Search</Button>
                <Button variant="danger" onClick={(e) => handleClear(e)}>Clear</Button>
            </Form>
            {searchValue.length < 1 &&
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


            {data && data.data.results.length > 0 && searchValue.length > 0 &&
                <Pagination page={page} setPage={setPage} isPreviousData={isPreviousData} hasMore={data?.data.page < data?.data.total_pages} />
            }
        </div>
    )
}

export default SearchPage
