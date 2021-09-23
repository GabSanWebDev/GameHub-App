import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../Styles/Card.module.css';


export default function VgCard({name, image, genre, id, rating}){
    return (
        <div key={id} className={styles.card}>
            <Link className={styles.link} to={'/videogame/' + id}>
            <div >
            <img className={styles.cardImage} src={image} alt="videogame_image" type="image/png" width="280" height="250"/>
            </div>
            <div >
            <h3 className={styles.cardName}>{name}</h3>
            </div>
            <h3 className={styles.rating}>Rating:  {rating}⭐</h3>
            <div>
            <h3 className={styles.cardText}>{genre}</h3>
            </div>
            </Link>
        </div>
    )
}