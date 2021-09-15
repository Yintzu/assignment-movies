import React from 'react'
import HomePageList from '../components/HomePageList'
import { getNowPlaying, getTopRated, getTrending } from '../services/tmdbAPI'

const HomePage = () => {

    return (
        <div>
            <h1 className="pb-4">Home</h1>
            <HomePageList title={"trending"} timeWindowButton={"week"} getFunction={getTrending}/>
            <HomePageList title={"top rated"} timeWindowButton={null} getFunction={getTopRated}/>
            <HomePageList title={"now playing"} timeWindowButton={null} getFunction={getNowPlaying}/>
        </div>
    )
}

export default HomePage
