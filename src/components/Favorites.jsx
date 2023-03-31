import {useState,useEffect} from 'react'
import MovieCardsHome from './MoveCardHome';
import useFetch from "./useFetch.jsx";
import {Typography, Container} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function Favorites(props){
    const {get} = useFetch(`https://api.themoviedb.org/3/`)
    const {movieIds, setMovieIds} = props
    const [favMovies, setFavMovies] = useState(JSON.parse(sessionStorage.getItem('movieList')) || [])
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

        sessionStorage.setItem('movieList', JSON.stringify(favMovies))
        
 
    },[favMovies])
    function handleRemoveFav(e){
        let id = Number.parseInt(e.currentTarget.value)
        let idString = e.currentTarget.value

        let foundId = movieIds.find(id => id === idString)
        let newIdList = movieIds.filter(id => id !== foundId)
        setMovieIds(newIdList)

        let foundMovie = favMovies.find(movie => movie.id === id)
        let newList = favMovies.filter(movie => movie !== foundMovie)
        setFavMovies(newList)   
    }

    return(
        <>

            <Typography component='h1' variant='h3' sx={{ textAlign:'center',m:1,width:'100%'} }>{favMovies.length > 0 ? 'Your Favorites' : 'No favorites'}</Typography>
            <Container sx={{ display:'flex', flexWrap:'wrap', gap:'30px', mt:1,justifyContent:'center'  }}>
                {favMovies && favMovies.map(movie => <MovieCardsHome
                handleRemoveFav={handleRemoveFav}
                removeFav={true}
                fav={<FavoriteIcon fontSize='small' sx={{ pointerEvents: 'none' }} />}
                key={movie.id} details={movie} />)}
            </Container>

        </>
    )

}