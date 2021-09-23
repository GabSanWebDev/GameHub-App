import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { postVideogame, getGenres } from '../actions/index'
import { useDispatch, useSelector } from 'react-redux';
import styles from '../Styles/VideogameCreate.module.css';
import videoback from '../media/videoback.mp4'

function validate(input) {
    let errors = {};
    if (!input.name) {
        errors.name = 'Required';
    } 
     if (!input.description) {
        errors.description = 'Required';
    }
      if (!input.released) {
        errors.released = 'Required';
    }
     if (!input.rating) {
        errors.rating = 'Required';
    }
    // if(!input.name || !input.description || !input.released || !input.rating) {
    //     errors = 'Required Field'
    // }
    return errors
}



export default function VideoGameCreate() {
    const dispatch = useDispatch();
    const history = useHistory();
    const genres = useSelector((state) => state.genres)
    const [errors, setErrors] = useState({});


    const [input, setInput] = useState({
        name: "",
        description: "",
        released: "",
        rating: "",
        platforms: [],
        image: "",
        genres: []
    })
    console.log(input)

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }
    function handleCheck(e) {

            setInput({
                ...input,
                rating: e.target.value
            })
            

            setErrors(validate({
                ...input,
                rating: e.target.value

            }))


    }

    function handleSelect(e) {
        setInput({
            ...input,
            genres: [...input.genres, e.target.value]
        })
    }
    function handleSelectPlatform(e) {
        setInput({
            ...input,
            platforms: [...input.platforms, e.target.value]
        })
    }

    function handleDelete(g) {
        setInput({
            ...input,
            genres: input.genres.filter(genre => genre !== g)
        })
    }
    function handleDeleteP(p) {
        setInput({
            ...input,
            platforms: input.platforms.filter(plat => plat !== p)
        })
    }

    function handleSubmit(e) {
        if(input.name === "" || input.description === "" || input.rating === "" || input.released === ""){
            e.preventDefault()
            alert("Please complete all required fields")
        } else{

            e.preventDefault()
            // console.log(input)
            dispatch(postVideogame(input))
            alert("Videogame successfully created");
            setInput({
                name: "",
                description: "",
                released: "",
                rating: "",
                platforms: [],
                image: "",
                genres: []
            })
            history.push('/home');  
        }
            
    }

    useEffect(() => {
        dispatch(getGenres())
    }, [dispatch]);

    return (
        <div className={styles.container}>
            <div className={styles.navbar}>

                <Link to='/home' className={styles.link}><h1 className={styles.logo}>Game<span className={styles.logo2}>Hub</span></h1></Link>
                <Link to='/home'><button className={styles.btn}>Previous Stage</button></Link>

            </div>

            <video autoPlay loop muted className={styles.video}>
                <source src={videoback} type="video/mp4" /> 
                {/* video con menor resolucion */}
            </video>
            <div className={styles.father}>
                

                <form className={styles.form} onSubmit={(e) => handleSubmit(e)} >
                    <div className={styles.title}>
                    <h1>Create your Videogame</h1>

                    </div>


                         <div className={styles.son}> 
                            <label className={styles.label}>Name:</label>
                            <input
                                className={styles.input}
                                type="text"
                                placeholder="Enter your Videogame Name..."
                                value={input.name}
                                name="name"
                                onChange={(e) => handleChange(e)}
                            />
                            {errors.name && (
                                <p className={styles.error}>{errors.name}</p>
                            )}
                         </div>


                        <div className={styles.son}> 
                            <label className={styles.label}>Rating:</label>
                            <div className={styles.ratings}>
                            <label >
                                <input
                                    
                                    type="checkbox"
                                    value="1"
                                    name="1"
                                    onChange={(e) => handleCheck(e)}
                                />1⭐</label>
                            <label>
                                <input

                                    type="checkbox"
                                    value="2"
                                    name="2"
                                    onChange={(e) => handleCheck(e)}
                                />2⭐</label>
                            <label>
                                <input

                                    type="checkbox"
                                    value="3"
                                    name="3"
                                    onChange={(e) => handleCheck(e)}
                                />3⭐</label>
                            <label>
                                <input

                                    type="checkbox"
                                    value="4"
                                    name="4"
                                    onChange={(e) => handleCheck(e)}
                                />4⭐</label>
                            <label>
                                <input

                                    type="checkbox"
                                    value="5"
                                    name="5"
                                    onChange={(e) => handleCheck(e)}
                                />5⭐</label>
                            </div>
                            {errors.rating && (
                                <p className={styles.error}>{errors.rating}</p>
                            )}
                         </div>

                         <div className={styles.sonGenre}> 
                            <label className={styles.labelGenre}>Platforms:</label>
                            {/* <input
                            className={styles.input}
                                type="text"
                                placeholder="Enter your Platforms..."
                                value={input.platform}
                                name="platform"
                                onChange={(e) => handleChange(e)}/>  */}
                                 <select className={styles.selectGenre} onChange={(e) => handleSelectPlatform(e)}>
                                <option>Select Platforms...</option>
                                <option value="PC" name="PC">PC</option>
                                <option value="iOS" name="PC">iOS</option>
                                <option value="Linux" name="PC">Linux</option>
                                <option value="Android" name="PC">Android</option>
                                <option value="Play Station 5" name="Play Station 5">Play Station 5</option>
                                <option value="Xbox Series X" name="Xbox Series X">Xbox Series X</option>
                                <option value="Nintendo Switch" name="Nintendo Switch">Nintendo Switch</option>
                                <option value="Play Station 4" name="Play Station 4">Play Station 4</option>
                                <option value="Xbox One" name="Xbox One">Xbox One</option>
                                <option value="Nintendo Wii U" name="Nintendo Wii U">Nintendo Wii U</option>
                                <option value="Play Station 3" name="Play Station 3">Play Station 3</option>
                                <option value="Xbox 360" name="Xbox 360">Xbox 360</option>
                                <option value="Nintendo Wii" name="Nintendo Wii">Nintendo Wii</option>
                                </select>
                                {input.platforms.map(plat =>
                                <div className={styles.platform} key={plat}>
                                    <button className={styles.btnGenre}  onClick={() => handleDeleteP(plat)}>x</button>
                                    <p>{plat}</p> 
                                 </div>
                            )} 
                        </div>

                         <div className={styles.sonGenre}> 
                            <label className={styles.labelGenre}>Genres:</label>
                            <select className={styles.selectGenre} onChange={(e) => handleSelect(e)}>
                                <option>Select Genres...</option>
                                {genres.map((g) => (
                                    <option key={g.id} value={g.name}>{g.name}</option>
                                ))}
                            </select>
                            {input.genres.map(g =>
                                <div className={styles.genre} key={g}>
                                    <button className={styles.btnGenre}  onClick={() => handleDelete(g)}>x</button>
                                    <p>{g}</p>
                                </div>
                            )}
                            
                        </div>
                        <div className={styles.son}> 
                            <label className={styles.label}>Release Date:</label>
                            <input
                            placeholder="Enter the Release Date..."
                                type="text"
                                className={styles.input}
                                value={input.released}
                                name="released"
                                onChange={(e) => handleChange(e)}
                            />
                            {errors.released && (
                                <p className={styles.error}>{errors.released}</p>
                            )}
                        </div>
                        <div className={styles.son}> 
                            <label className={styles.label}>Image:</label>
                            <input
                            placeholder="Enter the Image URL..."
                            className={styles.input}
                                type="text"
                                value={input.image}
                                name="image"
                                onChange={(e) => handleChange(e)}
                            />
                        </div> 
                    {/* </div>  */}

                    <div className={styles.son}> 
                            <label className={styles.label}>Description:</label>
                            <textarea
                            placeholder="Enter a Description..."
                                type="text"
                                className={styles.textarea}
                                value={input.description}
                                name="description"
                                onChange={(e) => handleChange(e)}
                            />
                            {errors.description && (
                                <p className={styles.error}>{errors.description}</p>
                            )}
                       </div>
                    


                     <button className={styles.btn}  type="submit">Create</button>
                </form>
            </div>
        </div>
    )

}