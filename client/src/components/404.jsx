import React from 'react';
import {Link} from 'react-router-dom';
import sonicNotFoundError from '../media/sonicNotFound.gif';
import styles from '../Styles/NotFound.module.css';


export default function NotFound(){
    return (
        <div className={styles.container}>
            <img src={sonicNotFoundError} className={styles.image} type="gif" alt="image404" />
            <h2 className={styles.text}>Sorry, Page Not Found</h2>
            <Link to='/home'><button className={styles.btn}>Previous Stage</button></Link>

        </div>
    )
}