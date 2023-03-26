import useFetch from "./useFetch";

import {useState, useEffect} from 'react'
import {Typography, Box,Paper,Container,Button} from '@mui/material';
import GenreCard from "./GenreCard.jsx";
import GenreMovieCards from "./GenreMovieCards.jsx";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function MoviesByGenre(){
const {get, loading} = useFetch(`https://api.themoviedb.org/3/`)
const [movieList, setMovieList] = useState([])
const [genre,setGenre] = useState([])
const [sortedMovies, setSortedMovies] = useState([])

const [genreValue, setGenreValue] = useState('')
const [page, setPage] = useState(1)
const [title, setTitle] = useState('')


function handleGenreValue(e){
    setGenreValue(prevVal => {
        prevVal = e.currentTarget.value
        return prevVal
    })
}
function handleSelect(e){
    setGenreValue(prevVal => {
        prevVal = e.target.value
        return prevVal
    })
}
    useEffect(()=>{
        Promise.all([
            get(`/discover/movie?api_key=${import.meta.env}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreValue}&with_watch_monetization_types=flatrate`),
            get(`genre/movie/list?api_key=${import.meta.env}&language=en-US`)
        ])
        
        .then(([movieData, genreData]) => {
            setMovieList(movieData.results)
            setGenre(genreData.genres)
        })
        .catch(error => console.log(error))
    },[genreValue,page])

    let genreList = genre.map(genres => <GenreCard handleClick={handleGenreValue} key={genres.id} details={genres}/> )
    let genreMovies = sortedMovies.map(movies => <GenreMovieCards key={movies.id} details={movies}/>)

    function handlePageIncrement(){
        setPage(prevVal=>{
            prevVal ++
            return prevVal
        })
    }
    function handlePageDecrement(){
        setPage(prevVal => {
            if(prevVal > 1){
                prevVal --
            }
            return prevVal
        })
    }

    
    useEffect(()=>{
        let title 
        if(genre !== []){
            let genreCopy = [...genre]

            genreCopy.filter(name =>{
                
                if(name.id === Number.parseInt(genreValue)){
                    title = name.name
                }
                setTitle(title)
                console.log(title)
            })
        }

    },[genreValue])

    useEffect(()=>{
        if(movieList !== []){
            let sorted = [...movieList]
            sorted.sort((a,b)=>{
              return  b.vote_average - a.vote_average
            })
            setSortedMovies(sorted)
        }
    },[movieList])

    return(
        <>
        
        
        <Container maxWidth="md" sx={{p:1,background:'white',borderRadius:2, display:'flex', flexDirection:'column',mt:5,mb:5}}>
            <Typography variant='h4' component='h1' sx={{ color:'black' }}>{title}</Typography>
        {genreValue &&
            <Box>
                <FormControl sx={{ m: 1, minWidth: 80 }}>
                    <InputLabel id="demo-simple-select-autowidth-label">Genre</InputLabel>
                    <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={genreValue}
                    onChange={handleSelect}
                    autoWidth
                    label="Genre"
                    >
                    {genre.map(menuItem => <MenuItem key={menuItem.id} value={menuItem.id}>{menuItem.name}</MenuItem>)}
                    </Select>
                </FormControl>
            </Box>}
        <Box sx={{display:'flex', flexWrap:'wrap', gap:'10px',justifyContent:'center',alignItems:'center',mt:5  }}>
            {genreValue === '' && genreList }
            {genreValue && genreMovies}


        </Box>
        
            {genreValue && <Box sx={{ display:'flex', justifyContent:'space-around',m:1 }}>
                <Button disabled={page === 1} sx={{ color:'black',fontWeight:'bold' }} onClick={handlePageDecrement}>Previous</Button>
                <Button sx={{ color:'black',fontWeight:'bold' }} onClick={handlePageIncrement}>Next</Button> 
            </Box>}
        </Container>
        </>
    )
}