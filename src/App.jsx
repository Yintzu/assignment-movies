import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Container from 'react-bootstrap/esm/Container'
import Navigation from './components/Navigation'
import HomePage from './pages/HomePage'
import MovieDetailsPage from './pages/MovieDetailsPage'
import SearchPage from './pages/SearchPage'
import PersonDetailsPage from './pages/PersonDetailsPage'
import GenresPage from './pages/GenresPage'
import HistoryPage from './pages/HistoryPage'
import NotFoundPage from './pages/NotFoundPage'
import './App.scss'

function App() {

  return (
    <div className="App" style={{background: 'var(--bs-light)'}}>
      <Navigation />
      <Container className="py-4">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/search" component={SearchPage} />
          <Route exact path="/movies/:id" component={MovieDetailsPage} />
          <Route exact path="/person/:id" component={PersonDetailsPage} />
          <Route exact path="/genres" component={GenresPage} />
          <Route exact path="/history" component={HistoryPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </Container>
    </div>
  )
}

export default App
