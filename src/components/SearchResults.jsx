import {Typography, Box, Container,Paper,Button} from '@mui/material';
import Loader from './Loader.jsx'
import {useEffect,useState} from 'react'
import useFetch from "./useFetch.jsx";
import {key} from './key.jsx'
import { useLocation } from 'react-router-dom';
import TopRated from './TopRated.jsx';
export default function SearchResults(props){
    const {details} = props
    const {get,loading} = useFetch(`https://api.themoviedb.org/3/`)
    const location = useLocation()
    const [query, setQuery] = useState('')
    const [searchData, setSearchData] = useState([])

    console.log(location.state.query)
    useEffect(()=>{
        get(`search/movie?api_key=${key}&language=en-US&query=${location.state.query}&page=1&include_adult=false`)
        .then(data=> setSearchData(data.results))
        .catch(error => console.log(error))
    },[location])
    return(
        <>  

            {searchData === undefined ? 'no results found' :
            searchData.map(movie => <TopRated key={movie.id} details={movie} />) }
        </>
    )
}