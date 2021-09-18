import React from 'react'
import HomePageList from '../components/HomePageList'
import TopFilm from '../components/TopFilm'
import { getNowPlaying, getTopRated, getTrending } from '../services/tmdbAPI'

const HomePage = () => {
    return (
        <>
            <h1 className="pb-4">Home</h1>
            <TopFilm/>
            <HomePageList title={"trending"} timeWindowButton={"week"} getFunction={getTrending} />
            <HomePageList title={"top rated"} timeWindowButton={null} getFunction={getTopRated} />
            <HomePageList title={"now playing"} timeWindowButton={null} getFunction={getNowPlaying} />
        </>
    )
}

export default HomePage
