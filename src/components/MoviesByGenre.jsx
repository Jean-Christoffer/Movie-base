import useFetch from "./useFetch";
import {key} from './key.jsx'
import {useState, useEffect} from 'react'
import {Typography, Box,Paper,Container,Button} from '@mui/material';
import GenreCard from "./GenreCard.jsx";
import TopRated from "./TopRated.jsx";
export default function MoviesByGenre(){
const {get, loading} = useFetch(`https://api.themoviedb.org/3/`)
const [movieList, setMovieList] = useState([])
const [genre,setGenre] = useState([])

const [genreValue, setGenreValue] = useState('')
const [page, setPage] = useState(1)

function handleGenreValue(e){
    setGenreValue(prevVal => {
        prevVal = e.currentTarget.value
        return prevVal
    })
}
    useEffect(()=>{
        Promise.all([
            get(`/discover/movie?api_key=${key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreValue}&with_watch_monetization_types=flatrate`),
            get(`genre/movie/list?api_key=${key}&language=en-US`)
        ])
        
        .then(([movieData, genreData]) => {
            setMovieList(movieData.results)
            setGenre(genreData.genres)
        })
        .catch(error => console.log(error))
    },[genreValue])


    let genreList = genre.map(genres => <GenreCard handleClick={handleGenreValue} key={genres.id} details={genres}/> )
    let genreMovies = movieList.map(movies => <TopRated key={movies.id} details={movies}/>)
    return(
        <>
        <Container sx={{ display:'flex', flexWrap:'wrap', gap:'10px',justifyContent:'center',alignItems:'center',mt:5 }}>
            {genreValue === '' && genreList }
            {genreValue && genreMovies}
            {genreValue && <Button onClick={()=> setGenreValue('')}>Back</Button>}
        </Container>
        </>
    )
}