import { useParams } from "react-router-dom"
import useFetch from "./useFetch.jsx";
import {key} from './key.jsx'
import {Typography, Box, Container, Paper,Button} from '@mui/material';
import {useState,useEffect} from 'react'
import Loader from './Loader.jsx'
export default function Details(){
    const params = useParams()
    const { get,loading } = useFetch(`https://api.themoviedb.org/3/`)

    const [data, setData] = useState({})
    const [trailer, setTrailer] = useState([])

    const [releaseDate, setReleaseDate] = useState('')
    const [runTime, setRunTime] = useState()
    const[officialTrailer, setOfficialTrailer] = useState('')
    const [genres, setGenres] = useState([])

    useEffect(() => {
        Promise.all([
            get(`movie/${params.id}?api_key=${key}&language=en-US`),
            get(`movie/${params.id}}/videos?api_key=${key}&language=en-US`)
        ])
        .then(([movieData, trailerData]) => {
            setData(movieData);
            setTrailer(trailerData.results);
        })
        .catch(error => console.log(error))
    }, [params.id])

    console.log(data)

    useEffect(()=>{
        if(data.release_date){
            setReleaseDate(data.release_date.substring(0,4))
        }
        if(data.runtime){
            const hours = Math.floor(data.runtime / 60)
            const minutes =  data.runtime % 60;
            const formatedTime = `${hours}H ${minutes}`
            setRunTime(formatedTime)
        }
        if(data.genres){
            setGenres(data.genres)
        }
    },[data])

   useEffect(()=>{
    let found
    if(trailer){
     found = trailer.find(movieTrailer => movieTrailer.type === 'Trailer')
    }
    if(found){
        setOfficialTrailer(found.key)
    }
   },[trailer])

    return(
        <>
        <Container>
            <Typography sx={{ color:'white' }} variant="h3" component={'h1'}>{data.name ?? data.original_title}</Typography>
            <Typography  sx={{ color:'#dba506' }}>{releaseDate} : {runTime} </Typography>
            <Box sx={{ display:'flex', flexDirection:{xs:'column', md:'row'}, mt:2 }}>
                <Box  sx={{ width:{xs:'100%', md:'320px'},position:'relative' }} >
                    {loading && <Loader/>}
                    <img src={`http://image.tmdb.org/t/p/w500/${data.poster_path}` ?? '/imdb.png'} className='bear-img' />
                </Box>
                <Box sx={{ width:'100%', position:'relative' }}>
                    {loading && <Loader/>}
                    <iframe className="iframe" src={`https://www.youtube.com/embed/${officialTrailer}`}
                    allow="accelerometer; clipboard-write; encrypted-media;  picture-in-picture"
                    allowFullScreen></iframe>
                </Box>
            </Box>
            <Container sx={{ mt:2 }}>
               <Box sx={{display:'flex', gap:'20px', mb:2 }}>
                    {genres.map(genre => <Typography sx={{ color:'#dba506' }}>{genre.name}</Typography>)}
                </Box>
                <Typography>{data.overview}</Typography> 
            </Container>
        </Container>
        </>
    )
}