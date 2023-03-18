import {useEffect,useState} from 'react'
import {key} from './key.jsx'
import ImageCarousel from './ImageCarousel.jsx'
import Carousel from 'react-material-ui-carousel'
import {Typography, Box, Container} from '@mui/material';
import useFetch from "./useFetch.jsx";
import UpcomingMovies from './Upcoming.jsx';
import Loader from'./Loader.jsx'

export default function Movies(){

    const [data,setData] = useState([])
    const [upComing, setUpComing] = useState([])
    const { get,loading } = useFetch(`https://api.themoviedb.org/3/`)

    useEffect(()=>{
        Promise.all([
            get(`trending/movie/day?api_key=${key}`),
            get(`movie/upcoming?api_key=${key}&language=en-US&page=2`)
        ])
        .then(([trendingData, upComingData]) =>{
            setData(trendingData.results)
            setUpComing(upComingData.results)
        })
        .catch(error => console.log(error))
    },[])
    console.log(upComing)
    return (
        <>
            <Container sx={{display:'flex',mt:5, justifyContent:{xs:'center', md:'space-around'}, flexDirection:{xs:'column', md:'row'}, alignItems:{xs:'center',md:'flex-start'} }}>

                <Box sx={{width:{xs:'100%', md:'700px'}, position:'relative' }} >
                    <Typography variant={'h4'} component='h1' sx={{ color:'#dba506', textAlign:{xs:'center', md:'left'}, marginLeft:{xs:0, md:2}}}>Trending</Typography>
                    {loading ? <Loader/> : <Carousel sx={{bgcolor:'rgb(0, 0, 0)', width:'100%' } } navButtonsAlwaysVisible={true}>
                        {data.map(movie => <ImageCarousel key={movie.id} details={movie} />)}
                    </Carousel>}
                </Box>
                <Box>
                <Typography variant='h4' component='h2'  sx={{ color:'#dba506', textAlign:{xs:'center', md:'left'}, marginLeft:2, mb: {md:1, xs:0}, mt:{xs:5, md:0}}}>Upcoming Movies</Typography>
                <Box p={1} maxHeight={550}  sx={{ overflowY:'scroll',position:'relative'}}>
                
                {loading ? <Loader/> : upComing.map(movie => <UpcomingMovies key={movie.id} details= {movie} />)}
                </Box>
                </Box>

            </Container>
        </>
    )
}
 