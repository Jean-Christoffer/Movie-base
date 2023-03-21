import useFetch from "./useFetch";
import {key} from './key.jsx'
import {useState, useEffect} from 'react'
import {Typography, Box,Paper,Container} from '@mui/material';
import GenreCard from "./GenreCard.jsx";
export default function MoviesByGenre(){
const {get, loading} = useFetch(`https://api.themoviedb.org/3/`)
const [movieList, setMovieList] = useState([])
const [genre,setGenre] = useState([])
console.log(genre)
    useEffect(()=>{
        Promise.all([
            get(`/discover/movie?api_key=${key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=Action&with_watch_monetization_types=flatrate`),
            get(`genre/movie/list?api_key=${key}&language=en-US`)
        ])
        
        .then(([movieData, genreData]) => {
            setMovieList(movieData.results)
            setGenre(genreData.genres)
        })
        .catch(error => console.log(error))
    },[])
    return(
        <>
        <Container sx={{ display:'flex', flexWrap:'wrap', gap:'10px' }}>
            {genre.map(genres => <GenreCard key={genres.id} details={genres}/> )}
        </Container>
        </>
    )
}