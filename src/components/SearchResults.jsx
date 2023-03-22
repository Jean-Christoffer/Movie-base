import {Typography, Box, Container,Paper,Button} from '@mui/material';
import Loader from './Loader.jsx'
import {useEffect,useState} from 'react'
import useFetch from "./useFetch.jsx";
import {key} from './key.jsx'
import { useLocation } from 'react-router-dom';
export default function SearchResults(props){
    const {get,loading} = useFetch(`https://api.themoviedb.org/3/`)
    const location = useLocation()
    const [query, setQuery] = useState('')
    useEffect(()=>{
        get(`search/movie?api_key=${key}&query=${location.state.query}`)
        .then(data=> console.log(data))
        .catch(error => console.log(error))
    },[])

}