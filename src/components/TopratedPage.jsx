import useFetch from "./useFetch.jsx";

import {Typography, Box, Container,Paper,Button} from '@mui/material';
import Loader from './Loader.jsx'
import {useEffect,useState} from 'react'
import TopRated from './TopRatedCard.jsx'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';


export default function Movies(){
    const { get,loading } = useFetch(`https://api.themoviedb.org/3/`)
    const [data, setData] = useState([])


    const [sortedData, setSortedData] = useState([])
    const [sort, setSort] = useState('rating')
    const [isAscending, setIsAscending] = useState(true);
    const [ranks, setRanks] = useState({})
 
    useEffect(() => {
        const totalPages = 5;
        let promises = [];
        for (let page = 1; page <= totalPages; page++) {
          promises.push(get(`movie/top_rated?api_key=${import.meta.env.VITE_API_KEY}&language=en-US&page=${page}`));
        } 
        Promise.all(promises)
          .then(results => {
            let movies = [];
            results.forEach(result => {
              movies = [...movies, ...result.results];
            });
            setData(movies);
          })
          .catch(error => console.log(error));
      }, []);

    useEffect(() => {
        if (sort !== '') {
          let sorted = [...data]; 
          sorted.sort((a, b) => {
            if (sort === 'votes') {
              return  (b.vote_count - a.vote_count);
            } else if (sort === 'rating') {
              return  (b.vote_average - a.vote_average);
            } else if (sort === 'popularity') {
              return  (b.popularity - a.popularity);
            }
            return 0; 
          });
          setSortedData(isAscending ? sorted : sorted.reverse());
         
        }
      }, [data, sort, isAscending]);

      function handleAscending(){
        setIsAscending(prevState => !prevState)
      }


    return(
        <>
        <Container>
            
            <Paper sx={{ mt:2, mb:2 }}>
                <Typography variant="h6" component='h1' sx={{ p:1 }}>
                 Top 100 Movies
                </Typography>
                <Typography variant="subtitle2" component='p' sx={{ p:1 }}>
                Showing Top 100 movies as rated by regular TMDB voters.
                </Typography>
                <Box sx={{ display:'flex', alignItems:'center' }}>
                <Typography variant="subtitle2" component='p' sx={{ p:1 }}>
                    Showing {data.length} Titles
                </Typography>
                <FormControl sx={{ m: 1, minWidth: 120}} size="small">
                <InputLabel id="Sort">Sort</InputLabel>
                    <Select
                        labelId="demo-select-small"
                        id="demo-select-small"
                        value={sort}
                        label='Sort'
                        onChange={(e)=> setSort(e.target.value)}

                    >
                        <MenuItem value={'rating'}>Rating</MenuItem>
                        <MenuItem value={'votes'}>Votes</MenuItem>
                        <MenuItem value={'popularity'}>Popularity</MenuItem>
                    </Select>
                </FormControl>
                <Button onClick={handleAscending}><ArrowDownwardIcon /> <ArrowUpwardIcon/></Button>
                </Box>
            </Paper>
        {loading && <Loader/>}
        {sortedData.map((movie,index) => {

          return <TopRated key={movie.id} details={movie} rank={index + 1} />
        })}
        </Container>
        </>
    )
}