import React from 'react'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { Link, NavLink } from 'react-router-dom'


const Navigation = () => {
    return (
        <Navbar bg="dark" variant="dark" expand="md">
            <Container>
                <Link to="/" className="navbar-brand">Movie App</Link>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <NavLink exact to="/" className="nav-link">Home</NavLink>
                        <NavLink to="/genres" className="nav-link">Genres</NavLink>
                        <NavLink to="/search" className="nav-link">Search</NavLink>
                        <NavLink to="/history" className="nav-link">History</NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Navigation
