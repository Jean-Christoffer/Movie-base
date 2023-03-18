import { useParams } from "react-router-dom"
import useFetch from "./useFetch.jsx";
import {key} from './key.jsx'
import {Typography, Box, Container, Paper,Button} from '@mui/material';
import {useState,useEffect} from 'react'
export default function Details(){
    const params = useParams()
    const { get } = useFetch(`https://api.themoviedb.org/3/`)

    const [data, setData] = useState({})
    const [trailer, setTrailer] = useState({})

    const [releaseDate, setReleaseDate] = useState('')
    const [runTime, setRunTime] = useState()
    useEffect(()=>{
        get(`movie/${params.id}?api_key=${key}&language=en-US`)
        .then(data => setData(data))
        .catch(error => console.log(error))
    },[])

    useEffect(()=>{
        get(`movie/${params.id}}/videos?api_key=${key}&language=en-US`)
        .then(data => setTrailer(data.results))
        .catch(error => console.log(error))
    },[])

    useEffect(()=>{
        if(data.release_date){
            setReleaseDate(data.release_date.substring(0,4))
        }
    },[data])

    useEffect(()=>{
        if(data.runtime){
            const hours = Math.floor(data.runtime / 60)
            const minutes =  data.runtime % 60;
            const formatedTime = `${hours}H ${minutes}`
            setRunTime(formatedTime)
        }
    },[data])


    console.log(trailer)

    return(
        <>
        <Container>
            <Typography sx={{ color:'white' }} variant="h3" component={'h1'}>{data.name ?? data.original_title}</Typography>
            <Typography>{releaseDate} : {runTime} </Typography>
            <Paper sx={{ display:'flex', flexDirection:{xs:'column', md:'row'}, mt:2 }}>
                <Box  sx={{ width:{xs:'100%', md:'320px'} }} >
                    <img src={`http://image.tmdb.org/t/p/w500/${data.poster_path}` ?? '/imdb.png'} className='bear-img' />
                </Box>
                <Box sx={{ width:'100%' }}>
                    <iframe className="iframe" src={`https://www.youtube.com/embed/${trailer}`}
                    frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                     allowfullscreen></iframe>
                </Box>
            </Paper>
         
        </Container>
        </>
    )
}