import React from 'react'
import Button from 'react-bootstrap/Button'

const Pagination = ({ page, setPage, isPreviousData, hasMore }) => {

    const width = {
        minWidth: '7rem'
    }

    return (
        <div className="d-flex justify-content-between">
            <Button
                onClick={() => setPage(currentPage => Math.max(currentPage - 1, 1))}
                disabled={page === 1}
                style={width}>
                Previous
            </Button>

            <span>Page: {page}</span>

            <Button
                onClick={() => { if (!isPreviousData && hasMore) setPage(currentPage => currentPage + 1) }}
                disabled={isPreviousData || !hasMore}
                style={width}>
                Next
            </Button>
        </div>
    )
}

export default Pagination
