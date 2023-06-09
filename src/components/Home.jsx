import {useEffect,useState} from 'react'

import ImageCarousel from './ImageCarousel.jsx'
import MovieCardsHome from './MoveCardHome.jsx';
import useFetch from "./useFetch.jsx";
import Loader from './Loader.jsx'
import FavoriteIcon from '@mui/icons-material/Favorite';

import {Typography, Box, Container} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { EffectCards } from "swiper";
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore,{Autoplay, Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import 'swiper/css/bundle';

SwiperCore.use([Navigation,Autoplay, Pagination, Scrollbar, A11y,EffectCards]);

export default function Movies({handleFavorite}){
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
            get(`trending/movie/day?api_key=${import.meta.env.VITE_API_KEY}`),
            get(`movie/upcoming?api_key=${import.meta.env.VITE_API_KEY}&language=en-US&page=1`),
            get(`movie/popular?api_key=${import.meta.env.VITE_API_KEY}&language=en-US&page=1`),

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
            <Container
             sx={{display:'flex',mt:5, justifyContent:{xs:'center', md:'space-around'},
             flexDirection:{xs:'column', md:'row'}, alignItems:{xs:'flex-start',md:'flex-start'} }}>
                <Box sx={{width:{xs:'100%', md:'700px'}, position:'relative' }} >
                    <Typography variant={'h4'} component='h1' sx={{ color:'#dba506', textAlign:{xs:'center', md:'left'}, marginLeft:{xs:0, md:0}}}>Trending</Typography>
                    {loading ? <Loader/> :
                    <Swiper
                    modules={[Navigation,Autoplay, Scrollbar, A11y]}
                    navigation
                    
                    autoplay={{
                        "delay": 4500,
                        "disableOnInteraction": false
                      }}

                    scrollbar={{ draggable: true }}
                    spaceBetween={50}
                    slidesPerView={1}
                    slidesPerGroup={1}
                    loop
                                           >
                      {data.map((movie) => <SwiperSlide key={movie.id} ><ImageCarousel key={movie.id} details={movie} /></SwiperSlide>)}
                   
                    </Swiper> }
                </Box>
     
                    <Typography variant='h4' component='h2'  sx={{ color:'#dba506',width:'100%', textAlign:'center', display:{xs:'block',md:'none'},
                     marginLeft:{xs:0, md:1}, mb: {md:1, xs:1}, mt:{xs:5, md:0}}}>Upcoming movies</Typography>
                   <Box sx={{width:{ xs:'210px',md:'300px'},heigth:'100px'}}>
                   <Typography variant='h4' component='h2'  sx={{ color:'#dba506', textAlign:{xs:'center', md:'left'}, display:{xs:'none',md:'block'},
                     marginLeft:{xs:0, md:1}, mb: {md:1, xs:1}, mt:{xs:5, md:0}}}>Upcoming movies</Typography>  
                    <Swiper  
                        effect={"cards"}
                        grabCursor={false}
                        modules={[EffectCards]}
                        className="mySwiper"
                                                            >
                        { upComing.map(movie =><SwiperSlide key={movie.id}  ><MovieCardsHome  handleFavorite={handleFavorite} key={movie.id} details= {movie} /></SwiperSlide>)}
                                
                    </Swiper>

                    </Box> 


            </Container>
            
            <Container sx={{ mb:2, mt:3 }} >
                {loading && <Loader/>}
                <Typography  variant='h4' component='h2' sx={{ ml:0.5,color:'#dba506',mb: {md:1, xs:1},textAlign:{xs:'center', md:'left'} }}>Popular</Typography>
                    <Swiper  
                    modules={[Navigation, Scrollbar, A11y]}
                    navigation
                    spaceBetween={space}
                    slidesPerView={slidesPerView}
                                           >
                      {popular.map((movie) => <SwiperSlide key={movie.id} ><MovieCardsHome key={movie.id} details={movie} /></SwiperSlide>)}
                   
                    </Swiper> 
            </Container>


        </>
    )
}
 