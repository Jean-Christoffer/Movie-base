import {Typography, Box, Paper} from '@mui/material';
import { Link } from "react-router-dom";
import StarIcon from '@mui/icons-material/Star';

export default function TopRated(props){
    const {details, rank} = props
    return(
        <>
            <Paper sx={{ display:'flex', alignItems:'center',mb:0.5,p:0 }}>
                <Box sx={{ width:'90px' }}>
                    <img src={`http://image.tmdb.org/t/p/w500/${details.poster_path}`} className='toprated'/>
                </Box>
                <Typography sx={{ ml:1 }}>{rank}.{`\u00A0`}</Typography>
                <Box sx={{ display:'flex',gap:'5px', alignItems:'center'}}>
                    <Link className='top-rated-title' to={`/details/${details.id}`}>{details.original_title ?? details.name}</Link>
                    <Typography variant='subtitle'>({details.release_date.substring(0,4)})</Typography>

                </Box>
                <Box  sx={{ display:'flex' }}>
                    <StarIcon sx={{ color:'#dba506' }} />
                    <Typography sx={{ fontWeight:'bold' }}>{details.vote_average}</Typography>
                </Box>
            </Paper>
        </>
    )
}