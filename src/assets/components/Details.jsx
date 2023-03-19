import { useParams } from "react-router-dom"
import useFetch from "./useFetch.jsx";
import {key} from './key.jsx'
import {Typography, Box, Container, Paper,Button} from '@mui/material';
import {useState,useEffect} from 'react'
import Loader from './Loader.jsx'
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import 'swiper/css/bundle';

export default function Details(){
    const params = useParams()
    const { get,loading } = useFetch(`https://api.themoviedb.org/3/`)

    const [data, setData] = useState({})
    const [trailer, setTrailer] = useState([])
    const [credits, setCredits] = useState({})
    const [images, setImages] = useState([])
    console.log(trailer)
    const [releaseDate, setReleaseDate] = useState('')
    const [runTime, setRunTime] = useState()
    const[officialTrailer, setOfficialTrailer] = useState('')
    const [genres, setGenres] = useState([])


    const [writers, setWrites] = useState([])
    const [director, setDirector] = useState([])


    useEffect(() => {
        Promise.all([
            get(`movie/${params.id}?api_key=${key}&language=en-US`),
            get(`movie/${params.id}/videos?api_key=${key}&language=en-US`),
            get(`movie/${params.id}/credits?api_key=${key}&language=en-US`),
            get(`movie/${params.id}/images?api_key=${key}`)
        ])
        .then(([movieData, trailerData, creditsData, imageData]) => {
            setData(movieData);
            setTrailer(trailerData.results);
            setCredits(creditsData)
            setImages(imageData.backdrops)
        })
        .catch(error => console.log(error))
    }, [params.id])

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
        let writers
        let director
        if(credits.crew){
            writers = credits.crew.filter(person => person.job === 'Writer')
            director = credits.crew.filter(person => person.job === 'Director')
           
        }
        if(writers){
            setWrites(writers)
        }
        if(director){
            setDirector(director)
        }

    },[credits])

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
        <Container sx={{ mt:2 }}>
            <Typography sx={{ color:'white' }} variant="h3" component={'h1'}>{data.name ?? data.original_title}</Typography>
            <Typography  sx={{ color:'#dba506' }}>{releaseDate} : {runTime} </Typography>
            <Box sx={{ display:'flex', flexDirection:{xs:'column', md:'row'}, mt:2 }}>
                <Box  sx={{ width:{xs:'100%', md:'320px'},position:'relative' }} >
                    {loading && <Loader/>}
                    <img src={`http://image.tmdb.org/t/p/w500/${data.poster_path}` ?? '/imdb.png'} className='bear-img' />
                </Box>
                <Box sx={{ width:'100%', height:{xs:'350px', md:'auto'}, position:'relative' }}>
                    {loading && <Loader/>}
                    <iframe className="iframe" src={`https://www.youtube.com/embed/${officialTrailer}`}
                    allow="accelerometer; clipboard-write; encrypted-media;  picture-in-picture"
                    allowFullScreen></iframe>
                </Box>
            </Box>

            <Container sx={{ mt:2, bgcolor:'#191919', p:1,borderRadius:'5px' }}>
               <Box sx={{display:'flex', gap:'20px', mb:1 }}>
                    {genres.map((genre,index) => <Typography key={index} sx={{ color:'#dba506' }}>{genre.name}</Typography>)}
                </Box>
                { data.vote_average ?  <Stack sx={{ mb:1 }} spacing={1}>
                   <Rating name="half-rating-read" size="medium" value={data.vote_average / 2} precision={0.5} readOnly
                    
                    /> 
                </Stack> :  <Typography sx={{ mb:1,fontWeight:'bold' }} >No rating yet</Typography>}

                <Typography sx={{ mb:0.1,fontWeight:'bold' }}>Overview:</Typography>
                <Typography >{data.overview}</Typography>

                <Box sx={{ display:'flex',fontWeight:'bold',mt:1 }}>
                    Writers:{`\u00A0`}
                    {writers.slice(0, -1).map((writer, index) => (
                        <Typography key={index}>{writer.name}{`\u00A0`} - {`\u00A0`}</Typography>
                    ))}
                    {writers.length > 0 && (
                        <Typography>{writers[writers.length - 1].name}</Typography>
                    )}
                    </Box>

                    <Box sx={{ display:'flex',fontWeight:'bold',mt:1 }}>
                    Directors:{`\u00A0`}
                    {director.slice(0, -1).map((director, index) => (
                        <Typography key={index}>{director.name}{`\u00A0`} - {`\u00A0`}</Typography>
                    ))}
                    {director.length > 0 && (
                        <Typography>{director[director.length - 1].name}</Typography>
                    )}
                    </Box>

            </Container>
            {images.length > 0 &&
            <Container sx={{mb:2, mt:2, bgcolor:'#191919', p:1,borderRadius:'5px', width:'100%' }} >
            <Box>
                <Typography variant="h4" sx={{ mb:1 }} component={'h2'}>Photos</Typography>
            </Box>
       
            <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                navigation
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                spaceBetween={50}
                slidesPerView={3}

                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
                >
                {images.map((image,index) => <SwiperSlide key={index} ><img className="swiper-img" src={`http://image.tmdb.org/t/p/w500/${image.file_path}`}/></SwiperSlide>)}

            </Swiper>

        </Container> }
            
        </Container>
        </>
    )
}