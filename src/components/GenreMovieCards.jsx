import {Typography, Box, Paper} from '@mui/material';
import { Link } from "react-router-dom";
import StarIcon from '@mui/icons-material/Star';
export default function GenreMoviesCards(props){
    const {details} = props
    return(
        <>
            <Paper sx={{ bgcolor:'#f5f5f5',color:'black', display:'flex',flexDirection:{xs:'column', md:'row'}, maxWidth:'620px',p:1}}>
                <Box sx={{ width:'65px' }}>
                    <img className='genreimg' src={`http://image.tmdb.org/t/p/w500/${details.poster_path}`} />
                </Box>
                <Box sx={{ width:'100%', p:1 }}>
                    <Box sx={{ display:'flex' }}>
                        <Typography>
                            <Link className='top-rated-title genreLink' to={`/details/${details.id}`}>{details.original_title ?? details.name}</Link>
                        </Typography>
                        <Typography  variant='subtitle'>{`\u00A0`}({details.release_date.substring(0,4)})</Typography>                    
                    </Box>


                    <Box sx={{ display:'flex',alignItems:'center',gap:'5px' }}>
                        <StarIcon sx={{ color:'#dba506' }}  />
                        <Typography sx={{ fontWeight:'bold' }}>{details.vote_average === 0 ? 'No rating yet' : details.vote_average }</Typography>
                    </Box>
                    <Typography variant='body1' sx={{ fontSize:'12px',mt:0.5 }}>{details.overview ?? ''}</Typography>
                    <Typography variant='body2' sx={{ mt:0.5,fontWeight:'bold' }}>Votes: {details.vote_count === 0 ? 'No votes yet' : details.vote_count }</Typography>
                </Box>
            </Paper>
        </>
    )
}