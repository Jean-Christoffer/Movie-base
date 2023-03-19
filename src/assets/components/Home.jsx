import {useEffect,useState} from 'react'
import {key} from './key.jsx'
import ImageCarousel from './ImageCarousel.jsx'
import {Typography, Box, Container} from '@mui/material';
import useFetch from "./useFetch.jsx";
import UpcomingMovies from './Upcoming.jsx';
import Loader from'./Loader.jsx'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import 'swiper/css/bundle';
export default function Movies(){
    let randomPage = Math.floor(Math.random() * 10) + 1;
    let random = randomPage.toString()
    console.log(random)
    const [data,setData] = useState([])
    const [upComing, setUpComing] = useState([])
    const { get,loading } = useFetch(`https://api.themoviedb.org/3/`)

    useEffect(()=>{
        Promise.all([
            get(`trending/movie/day?api_key=${key}`),
            get(`movie/upcoming?api_key=${key}&language=en-US&page=${random}`)
        ])
        .then(([trendingData, upComingData]) =>{
            setData(trendingData.results)
            setUpComing(upComingData.results)
        })
        .catch(error => console.log(error))
    },[])

    return (
        <>
            <Container sx={{display:'flex',mt:5, justifyContent:{xs:'center', md:'space-around'}, flexDirection:{xs:'column', md:'row'}, alignItems:{xs:'center',md:'flex-start'} }}>

                <Box sx={{width:{xs:'100%', md:'700px'}, position:'relative' }} >
                    <Typography variant={'h4'} component='h1' sx={{ color:'#dba506', textAlign:{xs:'center', md:'left'}, marginLeft:{xs:0, md:0}}}>Trending</Typography>
                    {loading ? <Loader/> :
                    <Swiper
                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                    navigation
                    pagination={{ clickable: true }}
                    scrollbar={{ draggable: true }}
                    spaceBetween={50}
                    slidesPerView={1}
                    onSlideChange={() => console.log('slide change')}
                    onSwiper={(swiper) => console.log(swiper)}
                                           >
                      {data.map((movie) => <SwiperSlide key={movie.id} ><ImageCarousel key={movie.id} details={movie} /></SwiperSlide>)}
                   
                    </Swiper> }
                </Box>
                <Box>
                <Typography variant='h4' component='h2'  sx={{ color:'#dba506', textAlign:{xs:'center', md:'left'}, marginLeft:1, mb: {md:1, xs:0}, mt:{xs:5, md:0}}}>Upcoming Movies</Typography>
                <Box p={1} maxHeight={500}  sx={{ overflowY:'scroll',position:'relative',mt:1.5}}>
                
                {loading ? <Loader/> : upComing.map(movie => <UpcomingMovies key={movie.id} details= {movie} />)}
                </Box>
                </Box>

            </Container>
        </>
    )
}
 