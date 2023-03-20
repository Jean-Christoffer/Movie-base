import {Typography, Box, Paper} from '@mui/material';
import { Link } from "react-router-dom";
export default function TopRated({details}){
    return(
        <>
            <Paper sx={{ display:'flex', alignItems:'center',justifyContent:'space-between',mb:0.5,p:0 }}>
                <Box sx={{ width:'100px' }}>
                    <img src={`http://image.tmdb.org/t/p/w500/${details.poster_path}`} className='toprated'/>
                </Box>
                
                <Box sx={{ display:'flex' }}>
                    <Link to={`/details/${details.id}`}>{details.original_title ?? details.name}</Link>
                    <Typography>({details.release_date})</Typography>
                </Box>
            </Paper>
        </>
    )
}