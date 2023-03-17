import {useEffect,useState} from 'react'
import {key} from './key.jsx'
import ImageCarousel from './ImageCarousel.jsx'
import Carousel from 'react-material-ui-carousel'
import {Typography, Box, Container} from '@mui/material';
import useFetch from "./useFetch.jsx";
import UpcomingMovies from './Upcoming.jsx';
import Grid2 from '@mui/material/Unstable_Grid2';

export default function Movies(){

    const [data,setData] = useState([])
    const [upComing, setUpComing] = useState([])
    const { get } = useFetch(`https://api.themoviedb.org/3/`)

    useEffect(()=>{
        get(`trending/all/day?api_key=${key}`)
        .then(data => setData(data.results))
        .catch(error => console.log(error))
    },[])

    useEffect(()=>{
        get(`movie/upcoming?api_key=${key}&language=en-US&page=1`)
        .then(data => setUpComing(data.results))
        .catch(error => console.log(error))
    },[])
    console.log(upComing)
    return (
        <>
            <Container sx={{display:'flex',mt:5, justifyContent:{xs:'center', md:'space-around'}, flexDirection:{xs:'column', md:'row'}, alignItems:{xs:'center',md:'flex-start'} }}>

                <Box sx={{width:{xs:'100%', md:'400px'} }} >
                    <Typography variant={'h4'} component='h1' sx={{ color:'#dba506', textAlign:{xs:'center', md:'left'}, marginLeft:{xs:0, md:2}}}>Trending</Typography>
                    <Carousel sx={{bgcolor:'rgb(0, 0, 0)', width:'100%' } } navButtonsAlwaysVisible={true}>
                        
                        {data.map(movie => <ImageCarousel key={movie.id} details={movie} />)}
                    </Carousel>
                </Box>
                <Box>
                <Typography variant='h4' component='h2'  sx={{ color:'#dba506', textAlign:{xs:'center', md:'left'}, marginLeft:2, mb: {md:1, xs:0}, mt:{xs:5, md:0}}}>Upcoming Movies</Typography>
                <Box p={2} maxHeight={650}  sx={{ overflowY:'scroll'}}>
                
                {upComing.map(movie => <UpcomingMovies key={movie.id} details= {movie} />)}
                </Box>
                </Box>

            </Container>
        </>
    )
}
 