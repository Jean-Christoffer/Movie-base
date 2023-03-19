import {Typography, Box, Paper} from '@mui/material';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import {Link} from 'react-router-dom'
export default function Latest({details}){
    return(
        <>

            <Paper sx={{display:'flex',flexDirection:'column', alignItems:'center',m:1, p:1, bgcolor:'#191919',width:'220px',height:'250px', textAlign:'center' }}>
                <Typography variant='subtitle2' component='p' sx={{color:'white', mb:0.5 }}>{details.original_title ?? details.title}</Typography>

                    <Box sx={{width:'100px'}}>
                        <img src={`http://image.tmdb.org/t/p/w500/${details.poster_path}`} className='caro-img' />
                    </Box>
                    <Stack spacing={1}>
                        <Rating name="half-rating-read"  size="small" value={details.vote_average / 2} precision={0.5} readOnly />
                    </Stack>
                    <Box sx={{ mt:'auto' }}>
                        <Link className='details-cta cta-up' to={`details/${details.id}`}>Details</Link>
                    </Box>
 
            </Paper>

        </>
    )
}