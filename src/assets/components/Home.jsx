import {useEffect,useState} from 'react'
import {key} from './key.jsx'
import ImageCarousel from './ImageCarousel.jsx'
import {Typography, Box, Container} from '@mui/material';
import useFetch from "./useFetch.jsx";
import UpcomingMovies from './Upcoming.jsx';
import Loader from './Loader.jsx'
import Latest from './Latest.jsx'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore,{Autoplay, Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import 'swiper/css/bundle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
// Add this CSS to the top of your Movies component

SwiperCore.use([Navigation,Autoplay, Pagination, Scrollbar, A11y]);
export default function Movies(){
    const { get,loading } = useFetch(`https://api.themoviedb.org/3/`)
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  
    let slidesPerView = 4;
    let space = 50
  
    if (isMobile) {
      slidesPerView = 1.5;
      space = 30
    } else if (isTablet) {
      slidesPerView = 2.5;
      
    }

    const [data,setData] = useState([])
    const [upComing, setUpComing] = useState([])
    const [popular, setPopular] = useState([])
    

    useEffect(()=>{
        Promise.all([
            get(`trending/movie/day?api_key=${key}`),
            get(`movie/upcoming?api_key=${key}&language=en-US&page=1`),
            get(`movie/popular?api_key=${key}&language=en-US&page=1`)
        ])
        .then(([trendingData, upComingData, popularData]) =>{
            setData(trendingData.results)
            setUpComing(upComingData.results)
            setPopular(popularData.results)
            
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
                    modules={[Navigation,Autoplay, Pagination, Scrollbar, A11y]}
                    navigation
                    autoplay={{
                        "delay": 4500,
                        "disableOnInteraction": false
                      }}
                    pagination={{ clickable: true }}
                    scrollbar={{ draggable: true }}
                    spaceBetween={50}
                    slidesPerView={1}
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

            <Container sx={{ mb:2, mt:3 }} >
                {loading && <Loader/>}
                <Typography  variant='h4' component='h2' sx={{ ml:0.5,color:'#dba506',mb: {md:1, xs:0} }}>Popular</Typography>
                    <Swiper

                    modules={[Navigation, Scrollbar, A11y]}
                    navigation
                    spaceBetween={space}
                    slidesPerView={slidesPerView}
                                           >
                      {popular.map((movie) => <SwiperSlide key={movie.id} ><Latest key={movie.id} details={movie} /></SwiperSlide>)}
                   
                    </Swiper> 
            </Container>
        </>
    )
}
 