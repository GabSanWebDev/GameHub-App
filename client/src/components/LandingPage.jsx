import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getVideogames } from '../actions';
import videoback from '../media/videoback.mp4'
import styles from '../Styles/LandingPage.module.css'

export default function LandingPage() {
    const dispatch = useDispatch();
    useEffect(() => dispatch(getVideogames()), [dispatch])

    return (
        <div className={styles.containerLanding}>

            <video autoPlay loop muted className={styles.video}>
            <source src={videoback} type="video/mp4" />
            </video>
            <div>
            <div>
            <h1 className={styles.title}>Game<span className={styles.span}>Hub</span></h1>
            </div>
            <div>
            <Link to='/home'>
                <button className={styles.startBtn}>Start Game</button>
            </Link>
            </div>
            </div>

        </div>
    )
}