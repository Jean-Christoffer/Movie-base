import {Typography, Container} from '@mui/material';
import Loader from './Loader.jsx'
import {useEffect,useState} from 'react'
import useFetch from "./useFetch.jsx";

import { useLocation } from 'react-router-dom';
import TopRated from './TopRatedCard.jsx';

export default function SearchResults(props){
    const {details} = props
    const {get,loading} = useFetch(`https://api.themoviedb.org/3/`)
    const location = useLocation()
    const [query, setQuery] = useState('')
    const [searchData, setSearchData] = useState([])


    useEffect(()=>{
        get(`search/movie?api_key=${import.meta.env}&language=en-US&query=${location.state.query}&page=1&include_adult=false`)
        .then(data=> setSearchData(data.results))
        .catch(error => console.log(error))
    },[location])
    return(
        <>  
        <Container sx={{ mt:1,mb:1 }}>
            {loading && <Loader/>}
            <Typography sx={{ mb:1 }} component='h1' variant='h5'>Showing {searchData.length} search results for "{location.state.searchInput}"</Typography>
            {searchData === undefined ? 'no results found' :
            searchData.map(movie => <TopRated loading={loading}
                loaderSpinner={<Loader/>} key={movie.id} details={movie} />) }
        </Container>
        </>
    )
}