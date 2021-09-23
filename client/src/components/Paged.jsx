import React from 'react';
import styles from '../Styles/Paged.module.css'

export default function Paged ({vgPerPage, allVideogames, paged}){
    const pageNumbers = []

    for(let i = 0; i < Math.ceil(allVideogames/vgPerPage); i++){
        pageNumbers.push(i+1)
    }
    return (
        <div className={styles.container}>
            
                {pageNumbers && pageNumbers.map(number => (
                    
                        <button key={number} className={styles.btn} onClick={() => paged(number)}>{number}</button>
                  
                ))}
           
        </div>
    )
}