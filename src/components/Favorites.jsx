import {useState,useEffect} from 'react'
import MovieCardsHome from './MoveCardHome';
import useFetch from "./useFetch.jsx";
import {Typography, Box, Container} from '@mui/material';
//{favMovies && favMovies.map(movie => <MovieCardsHome key={movie.id} details={movie} />)}

export default function Favorites(props){
    const {get} = useFetch(`https://api.themoviedb.org/3/`)
    const {movieIds} = props
    const [favMovies, setFavMovies] = useState(JSON.parse(localStorage.getItem('movieList')) || [])
    useEffect(()=>{
        let promises = []
        
        if(movieIds.length > 0){
            for(let i = 0; i < movieIds.length; i ++){
                promises.push(get(`movie/${movieIds[i]}?api_key=${import.meta.env.VITE_API_KEY}&language=en-US`))
               
            }
            Promise.all(promises)
            .then( result => {
                setFavMovies(result)
                
    
            })
            .catch(error => console.log(error))    
        }


    },[])
    
    useEffect(()=>{
        if(favMovies.length > 0){
            localStorage.setItem('movieList', JSON.stringify(favMovies))
        }
 
    },[favMovies])

    return(
        <>
        <Typography component='h1' variant='h2'>{favMovies.length > 0 ? 'Your Favorites' : 'No favorites'}</Typography>
        <Container sx={{ display:'flex', flexWrap:'wrap', gap:'30px', mt:5   }}>
            
            {favMovies && favMovies.map(movie => <MovieCardsHome key={movie.id} details={movie} />)}
        </Container>
        </>
    )

}