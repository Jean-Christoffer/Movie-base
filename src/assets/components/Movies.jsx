import useFetch from "./useFetch.jsx";
import {key} from './key.jsx'
import {Typography, Box, Container} from '@mui/material';
import Loader from './Loader.jsx'
import {useEffect,useState} from 'react'
import TopRated from './TopRated.jsx'
export default function Movies(props){
    const { get,loading } = useFetch(`https://api.themoviedb.org/3/`)
    const [data, setData] = useState([])
    const [page, setPage] = useState(1)
    useEffect(()=>{
        Promise.all([
            get(`movie/top_rated?api_key=${key}&language=en-US&page=${page}`),
            
        ])
        .then(([data]) =>{
            console.log(data.results.sort((a,b) =>  b.vote_count - a.vote_count))
            setData(data.results)
            
        })
        .catch(error => console.log(error))
    },[])

    return(
        <>
        <Container>
        {data.map(movie => <TopRated  key={movie.id} details={movie} />)}
        </Container>
        </>
    )
}