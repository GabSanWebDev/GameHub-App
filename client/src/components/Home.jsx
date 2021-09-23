import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getVideogames, filterGamesByRating, filterCreatedGames, orderByName, filterGamesByGenre, sortGamesByRating } from '../actions';
import VgCard from './Card';
import Paged from './Paged';
import SearchBar from './Searchbar';
import styles from '../Styles/Home.module.css';
import notFound from '../media/notFound.png'
import sonicSpin from '../media/sonicSpin.gif'



export default function Home() {

    const dispatch = useDispatch();//mapDispatchtoProps
    const allVideogames = useSelector((state) => state.videogames);//mapStateToProps
    const [order, setOrder] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [vgPerPage] = useState(16);  //cambio para quitar el warning [vgPerPage, setVgPerPage]
    const indexOfLastVideogame = currentPage * vgPerPage; //15
    const indexOfFirstVideogame = indexOfLastVideogame - vgPerPage; //0
    const currentVideoGame = allVideogames.slice(indexOfFirstVideogame, indexOfLastVideogame)
    // // console.log(order)
    const paged = (pageNumber) => {
        setCurrentPage(pageNumber);
    }


    useEffect(() => {
        dispatch(getVideogames())

    }, [dispatch])

    function handleClick(e) {
        e.preventDefault();
        dispatch(getVideogames());
    }

    function handleSortRating(e) {
        dispatch(sortGamesByRating(e.target.value));
        setCurrentPage(1);
        setOrder(`Ordered ${e.target.value}`);
    }

    function handleFilterCreated(e) {
        dispatch(filterCreatedGames(e.target.value));
        setCurrentPage(1);
    }

    function handleSort(e) {
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setCurrentPage(1);
        setOrder(`Ordered ${e.target.value}`);
    }
    function handleFilterRating(e) {
        e.preventDefault();
        dispatch(filterGamesByRating(e.target.value));
    }

    function handleFilterGenre(e) {
        dispatch(filterGamesByGenre(e.target.value));
        setCurrentPage(1);
    }

    return (
        <div style={styles.body}>
            <div>
                <SearchBar />     
            </div>

            <div className={styles.filterBar}>

                <select className={styles.selectInit} onChange={e => { handleSort(e) }}>
                    <option className={styles.option} >Sort by Name</option>
                    <option value="asc">A-Z</option>
                    <option value="desc">Z-A</option>
                </select>
                <select className={styles.select} onChange={e => { handleSortRating(e) }}>
                    <option className={styles.option}>Sort by Rating</option>
                    <option value="btw"> Best to Worse </option>
                    <option value="wtb"> Worse to Best </option>
                </select>
                <select className={styles.select} onChange={e => { handleFilterRating(e) }}>
                    <option  value="all" className={styles.option}>Filter by Rating</option>
                    <option value="all"> All Games </option>
                    <option value="1"> 1⭐ Games </option>
                    <option value="2"> 2⭐ Games </option>
                    <option value="3"> 3⭐ Games </option>
                    <option value="4"> 4⭐ Games </option>
                    <option value="5"> 5⭐ Games </option>
                </select>
                <select className={styles.select} onChange={e => { handleFilterCreated(e) }}>
                    <option className={styles.option}>Filter by Origin</option>
                    <option value="all">All games</option>
                    <option value="apig">Api games</option>
                    <option value="dbg">Database games</option>
                </select>

                <select className={styles.select} onChange={e => { handleFilterGenre(e) }}>
                    <option value='all' className={styles.option}>Any Genre</option>
                    <option value='Action'>Action</option>
                    <option value='Adventure'>Adventure</option>
                    <option value='Arcade'>Arcade</option>
                    <option value='Board Games'>Board Games</option>
                    <option value='Card'>Card</option>
                    <option value='Casual'>Casual</option>
                    <option value='Educational'>Educational</option>
                    <option value='Family'>Family</option>
                    <option value='Fighting'>Fighting</option>
                    <option value='Indie'>Indie</option>
                    <option value='Massively Multiplayer'>Massively Multiplayer</option>
                    <option value='Platformer'>Platformer</option>
                    <option value='Puzzle'>Puzzle</option>
                    <option value='Racing'>Racing</option>
                    <option value='RPG'>RPG</option>
                    <option value='Shooter'>Shooter</option>
                    <option value='Simulation'>Simulation</option>
                    <option value='Sports'>Sports</option>
                    <option value='Strategy'>Strategy</option>
                </select>

                <button className={styles.selectFin} onClick= {(e) => handleClick(e) }>
                    Remove Filters
                </button>
            </div>
            <div>
                <Paged vgPerPage={vgPerPage} allVideogames={allVideogames.length} paged={paged} />
            </div>

                <div className={styles.container}>
                    {
                        currentVideoGame.length > 0 ? currentVideoGame.map(v =>
                            <VgCard status="VgCard" key={v.id} rating={v.rating} id={v.id} name={v.name} image={v.img ? v.img : notFound} genre={v.genres ? v.genres.map((v, index) => <p key={index}>{v}</p>) : 'N/A'} />

                        ) : <div className={styles.sonicContainer}>
                        <img src={sonicSpin} className={styles.sonic} type="gif" alt="Loading..." />
                        <h3 className={styles.sonicText}>Loading at Sonic Speed</h3>
                        </div>
                    }
                </div>
                <div className={styles.copyright}>Copyright&copy; 2021 - App Made By Gabriel Sanchez - All rights reserved.</div>

        </div>
    )
}
