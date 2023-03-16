import {useEffect,useState} from 'react'
import {key} from './key.jsx'


export default function Movies(){
    const [data,setData] = useState([])
    useEffect(()=>{
        fetch(`https://api.themoviedb.org/3/movie/550?api_key=${key}`)
        .then(response => response.json())
        .then(data => setData(data))
        .catch(error => console.log(error))
    },[])

    return 
}
